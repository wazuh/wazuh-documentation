.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh detects Shellshock attacks. It analyzes web server logs collected from a monitored endpoint. Learn more about this in this PoC.

Detecting a Shellshock attack
=============================

Wazuh is capable of detecting a Shellshock attack by analyzing web server logs collected from a monitored endpoint. In this use case, you set up an Apache web server on the Ubuntu endpoint and simulate a shellshock attack.

Infrastructure
--------------

+---------------+--------------------------------------------------------------------------------------+
| Endpoint      | Description                                                                          |
+===============+======================================================================================+
| Ubuntu 22.04  | Victim endpoint running an Apache 2.4.54 web server.                                 |
+---------------+--------------------------------------------------------------------------------------+
| RHEL 9.0      | This attacker endpoint sends a malicious HTTP request to the victim’s web server.    |
+---------------+--------------------------------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

Perform the following steps to install an Apache web server and monitor its logs with the Wazuh agent.

#. Update local packages and install the Apache web server:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install apache2

#. If a firewall is enabled, modify it to allow external access to web ports. Skip this step if the firewall is disabled:

   .. code-block:: console

      $ sudo ufw app list
      $ sudo ufw allow 'Apache'
      $ sudo ufw status

#. Check that the Apache web server is running:

   .. code-block:: console

      $ sudo systemctl status apache2

#. Add the following lines to the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file. This sets the Wazuh agent to monitor the access logs of your Apache server:

   .. code-block:: xml

      <localfile>
          <log_format>syslog</log_format>
          <location>/var/log/apache2/access.log</location>
      </localfile>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Attack emulation
----------------

#. Replace ``<WEBSERVER_IP_ADDRESS>`` with the Ubuntu IP address and execute the following command from the attacker endpoint:

   .. code-block:: console

      $ sudo curl -H "User-Agent: () { :; }; /bin/cat /etc/passwd" <WEBSERVER_IP_ADDRESS>

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

-  ``rule.description:Shellshock attack detected``
-  If you have Suricata monitoring the endpoint traffic, you can also query ``rule.description:*CVE-2014-6271*`` for the related Suricata alerts.

   .. thumbnail:: /images/poc/shellshock-alerts.png
      :title: Shellshock alerts
      :align: center
      :width: 80%
