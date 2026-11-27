.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use a stateful Active Response to isolate a Linux endpoint from the network until the stateful timeout expires.

Isolating a Linux endpoint with active response
=================================================

In this use case, a custom ``quarantine`` active response isolates an Ubuntu endpoint from the network when a finding matches the monitor conditions. The script blocks all inbound, outbound, and forwarded traffic, except the connection to the Wazuh manager and the addresses that you add in the **Extra arguments** field, such as an administration workstation. The active response is stateful, so Wazuh lifts the quarantine when the stateful timeout expires.

Infrastructure
-----------------

Ubuntu 24.04: the endpoint to quarantine. It requires a Wazuh agent enrolled with the Wazuh manager, Python 3 at ``/usr/bin/python3``, and ``iptables``.

Configuration
----------------

Ubuntu endpoint
^^^^^^^^^^^^^^^^^

Perform the following steps to add the quarantine script to the Ubuntu endpoint.

#. Create the ``/var/ossec/active-response/bin/quarantine`` file with the following content:

   .. code-block:: python

      #!/usr/bin/python3
      # Wazuh - Linux quarantine active response (5.x, stateful)
      # Blocks all network traffic on the endpoint except the connection to the
      # Wazuh manager and the addresses given in Extra arguments.
      # This program is free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.

      import datetime
      import ipaddress
      import json
      import re
      import shutil
      import socket
      import subprocess
      import sys

      LOG_FILE = "/var/ossec/logs/active-responses.log"
      OSSEC_CONF = "/var/ossec/etc/ossec.conf"
      DEFAULT_MANAGER_PORT = 1517
      IN_CHAIN = "WAZUH_QUARANTINE_IN"
      OUT_CHAIN = "WAZUH_QUARANTINE_OUT"
      TOOLS = {socket.AF_INET: "iptables", socket.AF_INET6: "ip6tables"}


      def log(msg):
          with open(LOG_FILE, mode="a") as log_file:
              log_file.write(datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
                             + " active-response/bin/quarantine: " + msg + "\n")


      def run(cmd):
          return subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode


      def manager_addresses():
          # Read the manager endpoints and port from the Wazuh agent configuration
          with open(OSSEC_CONF) as conf_file:
              conf = conf_file.read()
          managers = set()
          for block in re.findall(r"<manager>(.*?)</manager>", conf, re.S):
              port_tag = re.search(r"<port>\s*(\d+)\s*</port>", block)
              for endpoint in re.findall(r"<endpoint>\s*(.*?)\s*</endpoint>", block):
                  match = re.match(r"^(?:https?://)?(\[[^\]]+\]|[^:/]+)(?::(\d+))?", endpoint)
                  if not match:
                      continue
                  host = match.group(1).strip("[]")
                  port = int(match.group(2) or (port_tag.group(1) if port_tag else DEFAULT_MANAGER_PORT))
                  for info in socket.getaddrinfo(host, port, proto=socket.IPPROTO_TCP):
                      managers.add((info[0], info[4][0], port))
          return sorted(managers)


      def allowed_addresses(extra_arguments):
          allowed = []
          for value in (extra_arguments or "").split():
              try:
                  allowed.append(ipaddress.ip_network(value, strict=False))
              except ValueError:
                  log("Ignoring invalid address in Extra arguments: " + value)
          return allowed


      def release():
          for tool in TOOLS.values():
              if not shutil.which(tool):
                  continue
              for hook, chain in (("INPUT", IN_CHAIN), ("FORWARD", IN_CHAIN), ("OUTPUT", OUT_CHAIN)):
                  while run([tool, "-D", hook, "-j", chain]) == 0:
                      pass
              for chain in (IN_CHAIN, OUT_CHAIN):
                  run([tool, "-F", chain])
                  run([tool, "-X", chain])


      def quarantine(managers, allowed):
          for family, tool in TOOLS.items():
              if not shutil.which(tool):
                  continue
              rules = [["-N", IN_CHAIN], ["-N", OUT_CHAIN],
                       ["-A", IN_CHAIN, "-i", "lo", "-j", "ACCEPT"],
                       ["-A", OUT_CHAIN, "-o", "lo", "-j", "ACCEPT"]]
              for manager_family, address, port in managers:
                  if manager_family == family:
                      rules.append(["-A", IN_CHAIN, "-s", address, "-p", "tcp", "--sport", str(port), "-j", "ACCEPT"])
                      rules.append(["-A", OUT_CHAIN, "-d", address, "-p", "tcp", "--dport", str(port), "-j", "ACCEPT"])
              for network in allowed:
                  if (network.version == 6) == (family == socket.AF_INET6):
                      rules.append(["-A", IN_CHAIN, "-s", str(network), "-j", "ACCEPT"])
                      rules.append(["-A", OUT_CHAIN, "-d", str(network), "-j", "ACCEPT"])
              rules += [["-A", IN_CHAIN, "-j", "DROP"], ["-A", OUT_CHAIN, "-j", "DROP"],
                        ["-I", "INPUT", "1", "-j", IN_CHAIN], ["-I", "FORWARD", "1", "-j", IN_CHAIN],
                        ["-I", "OUTPUT", "1", "-j", OUT_CHAIN]]
              for rule in rules:
                  if run([tool] + rule) != 0:
                      raise RuntimeError(tool + " " + " ".join(rule) + " failed")


      def send_keys_and_check_message(keys):
          # Send the keys to wazuh-execd, which schedules the disable command
          # and replies "continue" for new keys or "abort" if they are already active
          keys_msg = json.dumps({"version": 1, "origin": {"name": "quarantine", "module": "active-response"},
                                 "command": "check_keys", "parameters": {"keys": keys}})
          print(keys_msg)
          sys.stdout.flush()
          try:
              return json.loads(sys.stdin.readline()).get("command")
          except ValueError:
              return None


      def main():
          try:
              data = json.loads(sys.stdin.readline())
          except ValueError:
              log("Decoding JSON has failed, invalid input format")
              sys.exit(1)

          command = data.get("command")
          if command == "disable":
              release()
              log("Quarantine released")
              sys.exit(0)
          if command != "enable":
              log("Invalid command: " + str(command))
              sys.exit(1)

          if send_keys_and_check_message(["quarantine"]) != "continue":
              log("Quarantine already active, nothing to do")
              sys.exit(0)

          managers = manager_addresses()
          if not managers:
              log("No Wazuh manager address found in " + OSSEC_CONF + ", not quarantining")
              sys.exit(1)
          extra_arguments = data.get("wazuh", {}).get("active_response", {}).get("extra_arguments")
          allowed = allowed_addresses(extra_arguments)

          release()
          try:
              quarantine(managers, allowed)
          except RuntimeError as error:
              release()
              log("Quarantine failed and was rolled back: " + str(error))
              sys.exit(1)
          log("Endpoint quarantined. Allowed: manager " + ", ".join(a + ":" + str(p) for _, a, p in managers)
              + ("; " + ", ".join(str(n) for n in allowed) if allowed else ""))
          sys.exit(0)


      if __name__ == "__main__":
          main()

#. Set the permissions and ownership of the script:

   .. code-block:: console

      $ sudo chmod 750 /var/ossec/active-response/bin/quarantine
      $ sudo chown root:wazuh /var/ossec/active-response/bin/quarantine

The script reads the Wazuh manager address and port from the ``<manager>`` block of ``/var/ossec/etc/ossec.conf``, and allows TCP traffic to that address and port, 1517 by default. It also allows the loopback interface and the IP addresses or CIDR ranges in the Extra arguments field, separated by spaces. It drops all other traffic, including SSH connections from other hosts. The script adds its rules to the ``WAZUH_QUARANTINE_IN`` and ``WAZUH_QUARANTINE_OUT`` chains of iptables and ip6tables, and removes them when Wazuh sends the disable command.

Wazuh dashboard
^^^^^^^^^^^^^^^^^

Perform the following steps to configure the active response and the monitor.

#. Create the active response configuration as described in :ref:`Creating an active response <active_response_creating>`, with the following settings:

   +------------------+------------------------+
   | Field            | Value                  |
   +==================+========================+
   | Name             | linux_quarantine_ar    |
   +------------------+------------------------+
   | Executable       | quarantine             |
   +------------------+------------------------+
   | Extra arguments  | <ADMIN_WORKSTATION_IP> |
   +------------------+------------------------+
   | Location         | Local                  |
   +------------------+------------------------+
   | Type             | Stateful               |
   +------------------+------------------------+
   | Stateful timeout | 120                    |
   +------------------+------------------------+

   .. thumbnail:: /images/manual/active-response/isolating-linux-endpoint-create-active-response.png
      :title: Create the linux_quarantine_ar active response
      :alt: Create active response form with the linux_quarantine_ar settings
      :align: center
      :width: 80%

   Replace ``<ADMIN_WORKSTATION_IP>`` with the IP address of a host that must keep access to the endpoint during the quarantine, such as the workstation that you use to investigate it. Leave the field empty to allow only the Wazuh manager. The timeout of 120 seconds suits this test. Set a longer timeout for real incidents.

#. Navigate to **Explore** > **Alerting**, switch to the **Monitors** tab, then click **Create monitor**. Fill in the following parameters:

   +-------------------------+-----------------------------------+
   | Field                   | Value                             |
   +=========================+===================================+
   | Monitor name            | linux_quarantine_ar_monitor       |
   +-------------------------+-----------------------------------+
   | Monitor type            | Active Response monitor           |
   +-------------------------+-----------------------------------+
   | Monitor defining method | Extraction query editor           |
   +-------------------------+-----------------------------------+
   | Frequency               | By interval                       |
   +-------------------------+-----------------------------------+
   | Run every               | 1 Minute(s)                       |
   +-------------------------+-----------------------------------+
   | Index                   | wazuh-findings-v5-system-activity |
   +-------------------------+-----------------------------------+

   .. thumbnail:: /images/manual/active-response/isolating-linux-endpoint-create-monitor.png
      :title: Create the linux_quarantine_ar_monitor monitor
      :alt: Monitor details form for linux_quarantine_ar_monitor
      :align: center
      :width: 80%

#. Replace the content of the **Define extraction query** field with the following query. It matches the authentication failure findings of the ``qtest-quarantine`` test user, so you can trigger the quarantine safely. For real incidents, use a query that matches only the findings that must isolate the endpoint:

   .. code-block:: json

      {
          "description": "Quarantines the endpoint on a test authentication failure",
          "queries": [
              {
                  "name": "linux_quarantine_ar_query",
                  "query": "user.name:\"qtest-quarantine\"",
                  "tags": []
              }
          ]
      }

   .. thumbnail:: /images/manual/active-response/isolating-linux-endpoint-extraction-query.png
      :title: Define the linux_quarantine_ar_query extraction query
      :alt: Extraction query editor with the linux_quarantine_ar_query query
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters:

   +-------------------+---------------------------------------+
   | Field             | Value                                 |
   +===================+=======================================+
   | Trigger name      | linux_quarantine_ar_trigger           |
   +-------------------+---------------------------------------+
   | Severity level    | 1 (Highest)                           |
   +-------------------+---------------------------------------+
   | Trigger condition | query[name=linux_quarantine_ar_query] |
   +-------------------+---------------------------------------+

   .. thumbnail:: /images/manual/active-response/isolating-linux-endpoint-create-trigger.png
      :title: Create the linux_quarantine_ar_trigger trigger
      :alt: Trigger form for linux_quarantine_ar_trigger with the query[name=linux_quarantine_ar_query] condition
      :align: center
      :width: 80%

#. In the **Actions** subsection, click **Add active response**. Set **Action name** to ``linux_quarantine_ar_action`` and select ``linux_quarantine_ar`` as the **Active response**.

   .. thumbnail:: /images/manual/active-response/isolating-linux-endpoint-create-action.png
      :title: Create the linux_quarantine_ar_action active response action
      :alt: Active response action form for linux_quarantine_ar_action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attack emulation
-------------------

Wait at least one minute after you create the monitor, so that it runs once. Then run the following command on the Ubuntu endpoint. It writes an SSH authentication failure for the ``qtest-quarantine`` user to the system log:

.. code-block:: console

   $ logger -t sshd -p auth.info "Failed password for invalid user qtest-quarantine from 10.200.0.31 port 40103 ssh2"

Visualize the findings
------------------------

The active response can take a few minutes to reach the endpoint. Check the ``/var/ossec/logs/active-responses.log`` file on the Ubuntu endpoint:

.. code-block:: console

   $ sudo grep quarantine /var/ossec/logs/active-responses.log

The command output looks similar to this:

.. code-block:: none
   :class: output

   2026/11/25 04:26:02 active-response/bin/quarantine: Endpoint quarantined. Allowed: manager 192.168.56.120:1517; 192.168.56.119/32
   2026/11/25 04:26:02 active-response/bin/quarantine: Quarantine already active, nothing to do
   2026/11/25 04:28:04 active-response/bin/quarantine: Quarantine released

The authentication failure generates two findings. The second one finds the quarantine already active, so the script doesn't apply it again. While the quarantine is active, connections to other hosts fail, and the Wazuh agent stays connected to the Wazuh manager. Run the following command on the Ubuntu endpoint to list the outbound rules:

.. code-block:: console

   $ sudo iptables -S WAZUH_QUARANTINE_OUT

The command output looks similar to this:

.. code-block:: none
   :class: output

   -N WAZUH_QUARANTINE_OUT
   -A WAZUH_QUARANTINE_OUT -o lo -j ACCEPT
   -A WAZUH_QUARANTINE_OUT -d 192.168.56.120/32 -p tcp -m tcp --dport 1517 -j ACCEPT
   -A WAZUH_QUARANTINE_OUT -d 192.168.56.119/32 -j ACCEPT
   -A WAZUH_QUARANTINE_OUT -j DROP

When the stateful timeout expires, Wazuh sends the disable command and the script removes its rules. Each new matching finding while the quarantine is active restarts the timeout. Restarting the Wazuh agent also lifts the quarantine, as described in :ref:`Types of active response <active_response_types>`. After a manual release, Wazuh still treats the quarantine as active until the timeout expires, so new matching findings don't isolate the endpoint again until then. To lift it earlier by hand, run the following command on the Ubuntu endpoint:

.. code-block:: console

   $ echo '{"command":"disable"}' | sudo /var/ossec/active-response/bin/quarantine

Navigate to **Security operations** > **Incident Response** and switch to the **Responses** tab to see the ``linux_quarantine_ar`` active response that Wazuh sent to the endpoint.

.. thumbnail:: /images/manual/active-response/isolating-linux-endpoint-incident-response.png
   :title: Triggered linux_quarantine_ar active response in Incident Response
   :alt: Incident Response Responses tab showing the triggered linux_quarantine_ar active response
   :align: center
   :width: 80%
