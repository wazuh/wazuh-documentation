.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use Active Response to block an SSH brute-force attack in this use case.

Blocking SSH brute-force attack with Active Response
====================================================

Wazuh uses the Active Response module to run scripts or executables on a monitored endpoint, taking action on certain triggers. In this use case, we simulate an SSH brute-force attack against a RHEL endpoint and configure the Active Response module to block the IP address of the attacker endpoint. The goal is to prevent SSH brute force attacks. The Active Response module executes a script to block the IP address of the attacker when rule ``5763 - SSHD brute force trying to get access to the system`` triggers.

Infrastructure
--------------

================ ==============
Endpoint         Description
================ ==============
**Ubuntu 22.04** This is the attacker endpoint that performs a brute-force attack. You must install an SSH client on this endpoint.
**RHEL 9.0**     We perform an SSH brute-force attack against this victim endpoint. You must install an SSH server on this endpoint.
================ ==============

Wazuh server
------------

Wazuh comes with a set of default scripts used in Active Response. These scripts are located in the ``/var/ossec/active-response/bin/`` directory on Linux/Unix endpoints. The ``firewall-drop`` active response script works with Linux/Unix operating systems. It uses iptables to block malicious IP addresses.

#. Open the Wazuh server ``/var/ossec/etc/ossec.conf`` file and verify that a ``<command>`` block called ``firewall-drop`` with the following configuration is present within the ``<ossec_config>`` block:

   .. code-block:: xml

      <command>
        <name>firewall-drop</name>
        <executable>firewall-drop</executable>
        <timeout_allowed>yes</timeout_allowed>
      </command>

   The ``<command>`` block contains information about the action to be executed on the Wazuh agent:

   -  ``<name>``: Sets a name for the command. In this case,  ``firewall-drop``.
   -  ``<executable>``: Specifies the active response script or executable that must run upon a trigger. In this case, it’s the ``firewall-drop`` executable.
   -  ``<timeout_allowed>``: Allows a timeout after a period of time. This tag is set to ``yes`` here, which represents a stateful active response.

   .. note::

      You can create your own custom script to block an IP address or perform any other action.

#. Add the ``<active-response>`` block below to the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <ossec_config>
        <active-response>
          <command>firewall-drop</command>
          <location>local</location>
          <rules_id>5763</rules_id>
          <timeout>180</timeout>
        </active-response>
      </ossec_config>

   -  ``<command>``: Specifies the command to configure. This is the command name ``firewall-drop`` defined in the previous step.
   -  ``<location>``: Specifies where the command executes. Using the ``local`` value means that the command executes on the monitored endpoint where the trigger event occurs.
   -  ``<rules_id>``: The Active Response module executes the command if rule ID ``5763 - SSHD brute force trying to get access to the system`` fires.
   -  ``<timeout>``: Specifies how long the active response action must last. In this use case, the module blocks for 180 seconds the IP address of the endpoint carrying out the brute-force attack.

#. Restart the Wazuh manager service to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Test the configuration
----------------------

Perform the steps below to perform an SSH brute-force attack against the RHEL endpoint.

#. Ping the RHEL endpoint from the Ubuntu endpoint to confirm there is network connectivity between the attacker and the victim endpoints:

   .. code-block:: console

      $ ping <RHEL_IP>

   .. code-block:: none
      :class: output

      PING <RHEL_IP> (<RHEL_IP>) 56(84) bytes of data.
      64 bytes from <RHEL_IP>: icmp_seq=1 ttl=64 time=0.602 ms
      64 bytes from <RHEL_IP>: icmp_seq=2 ttl=64 time=0.774 ms

#. On the Ubuntu endpoint, install Hydra. You need Hydra to execute the brute-force attack:

   .. code-block:: console

      $ sudo apt update && sudo apt install -y hydra

#. On the Ubuntu endpoint, create a text file with 10 random passwords.
#. Run Hydra from the Ubuntu endpoint to execute brute-force attacks against the RHEL endpoint using the command below. Replace ``<RHEL_USERNAME>`` with the username of the RHEL endpoint, ``<PASSWD_LIST.txt>`` with the path to the passwords file created in the previous step, and ``<RHEL_IP>`` with the IP address of the RHEL endpoint:

   .. code-block:: console

      $ sudo hydra -t 4 -l <RHEL_USERNAME> -P <PASSWD_LIST.txt> <RHEL_IP> ssh

   Once the attack ends, you can see on the Wazuh dashboard that rule ID ``5763`` fired.

   .. thumbnail:: /images/manual/active-response/hydra-attack-alert.png      
      :title: SSH brute-force attack alert
      :alt: SSH brute-force attack alert
      :align: center
      :width: 80%

#. Ping the victim endpoint from the attacker within 3 minutes of the attack execution to verify that the Active Response module has blocked the attacker's IP address:

   .. code-block:: console

      $ ping <RHEL_IP>
   
   .. code-block:: none
      :class: output
      :emphasize-lines: 4

      PING 10.0.0.5 (10.0.0.5) 56(84) bytes of data.
      ^C
      --- 10.0.0.5 ping statistics ---
      12 packets transmitted, 0 received, 100% packet loss, time 11000ms

Generating an alert when an active response is fired
----------------------------------------------------

Monitored Linux/Unix endpoints have a log file at ``/var/ossec/logs/active-responses.log`` where Wazuh registers the active response activities. By default, the Wazuh server monitors the Active Response log file. You can find the relevant section in the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file as shown below:

.. code-block:: xml

   <localfile>
     <log_format>syslog</log_format>
     <location>/var/ossec/logs/active-responses.log</location>
   </localfile>

When the active response triggers, a corresponding alert appears on the Wazuh dashboard.

.. thumbnail:: /images/manual/active-response/ar-alert-fired.png
   :title: Active Response alert: Host Blocked by firewall-drop
   :alt: Active Response alert: Host Blocked by firewall-drop
   :align: center
   :width: 80%

The alert appears because rule ID ``651`` is part of the default ``/var/ossec/ruleset/rules/0015-ossec_rules.xml`` rule file on the Wazuh server. If you create a custom active response script, you must add a proper custom rule to analyze the Active Response logs that are generated.