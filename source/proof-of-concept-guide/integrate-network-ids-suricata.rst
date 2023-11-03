.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh integrates with Suricata, a NIDS that detects threats by monitoring network traffic. Learn more about this in this PoC.

Network IDS integration
=======================

Wazuh integrates with a network-based intrusion detection system (NIDS) to enhance threat detection by monitoring network traffic.

In this use case, we demonstrate how to integrate Suricata with Wazuh. Suricata can provide additional insights into your network's security with its network traffic inspection capabilities.

Infrastructure
--------------

+---------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Endpoint      | Description                                                                                                                                     |
+===============+=================================================================================================================================================+
| Ubuntu 22.04  | This is the endpoint where you install Suricata. In this use case, Wazuh monitors and analyzes the network traffic generated on this endpoint.  |
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Take the following steps to configure Suricata on the Ubuntu endpoint and send the generated logs to the Wazuh server.

#. Install Suricata on the Ubuntu endpoint. We tested this process with version 6.0.8 and it can take some time:

   .. code-block:: console

      $ sudo add-apt-repository ppa:oisf/suricata-stable
      $ sudo apt-get update
      $ sudo apt-get install suricata -y

#. Download and extract the Emerging Threats Suricata ruleset:

   .. code-block:: console

      $ cd /tmp/ && curl -LO https://rules.emergingthreats.net/open/suricata-6.0.8/emerging.rules.tar.gz
      $ sudo tar -xvzf emerging.rules.tar.gz && sudo mv rules/*.rules /etc/suricata/rules/
      $ sudo chmod 640 /etc/suricata/rules/*.rules

#. Modify Suricata settings in the ``/etc/suricata/suricata.yaml`` file and set the following variables:

   .. code-block:: yaml
      :emphasize-lines: 1, 2, 4, 6, 10, 14

      HOME_NET: "<UBUNTU_IP>"
      EXTERNAL_NET: "any"

      default-rule-path: /etc/suricata/rules
      rule-files:
      - "*.rules"

      # Global stats configuration
      stats:
      enabled: no

      # Linux high speed capture support
      af-packet:
        - interface: enp0s3

   ``interface`` represents the network interface you want to monitor. Replace the value with the interface name of the Ubuntu endpoint. For example, ``enp0s3``.

   .. code-block:: console

      # ifconfig
   
   .. code-block:: none
      :class: output
      :emphasize-lines: 1

      enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
              inet 10.0.2.15  netmask 255.255.255.0  broadcast 10.0.2.255
              inet6 fe80::9ba2:9de3:57ad:64e5  prefixlen 64  scopeid 0x20<link>
              ether 08:00:27:14:65:bd  txqueuelen 1000  (Ethernet)
              RX packets 6704315  bytes 1268472541 (1.1 GiB)
              RX errors 0  dropped 0  overruns 0  frame 0
              TX packets 4590192  bytes 569730548 (543.3 MiB)
              TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

#. Restart the Suricata service:

   .. code-block:: console

      $ sudo systemctl restart suricata

#. Add the following configuration to the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. This allows the Wazuh agent to read the Suricata logs file:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>json</log_format>
          <location>/var/log/suricata/eve.json</location>
        </localfile>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Attack emulation
----------------

Wazuh automatically parses data from ``/var/log/suricata/eve.json`` and generates related alerts on the Wazuh dashboard.

Ping the Ubuntu endpoint IP address from the Wazuh server:

.. code-block:: console

   $ ping -c 20 "<UBUNTU_IP>"

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and add the filters in the search bar to query the alerts.

-  ``rule.groups:suricata``

.. thumbnail:: /images/poc/NIDS-suricata-alerts.png
   :title: Network IDS alerts
   :align: center
   :width: 80%

Troubleshooting
---------------

-  **Error log**:

   .. code-block:: none
      :emphasize-lines: 2

      16/9/2022 -- 12:32:16 - <Notice> - all 2 packet processing threads, 4 management threads initialized, engine started.
      16/9/2022 -- 12:32:16 - <Error> - [ERRCODE: SC_ERR_AFP_CREATE(190)] - Unable to find iface eth0: No such device
      16/9/2022 -- 12:32:16 - <Error> - [ERRCODE: SC_ERR_AFP_CREATE(190)] - Couldn't init AF_PACKET socket, fatal error
      16/9/2022 -- 12:32:16 - <Error> - [ERRCODE: SC_ERR_FATAL(171)] - thread W#01-eth0 failed

   **Location**: Suricata log -  ``/var/log/suricata/suricata.log``

   **Resolution**: To solve this issue, check the name of your network interface and configure it accordingly in the ``/etc/sysconfig/suricata`` and ``/etc/suricata/suricata.yaml`` files.
