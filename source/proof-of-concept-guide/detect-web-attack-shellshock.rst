.. _poc_detect_web_attack_shellshock:

Detecting a web attack - Shellshock
===================================

Detect a Shellshock attack from web server logs in a monitored endpoint.

Check :ref:`Wazuh Shellshock Attack documentation <learning_wazuh_shellshock>` for further information.

If Suricata integration is configured to monitor the endpoint's network traffic, the attack can additionally be detected at a network level.

Configuration
-------------

#. Add the following lines to ``/var/ossec/etc/ossec.conf`` at the Wazuh RHEL 7 agent host. This sets the Linux agent to monitor the access logs of your Apache server.

    .. code-block:: XML

        <localfile>
            <log_format>apache</log_format>
            <location>/var/log/httpd/access_log</location>
        </localfile>

Optionally, you can install Suricata in the RHEL 7 agent endpoint and configure it to monitor the endpoint's network traffic.

Steps to generate the alerts
----------------------------

#. Replace ``<your_web_server_address>`` with the appropriate value and execute the following command from a system external to your RHEL7 endpoint (the attacker).

    .. code-block:: console

        # curl -H "User-Agent: () { :; }; /bin/cat /etc/passwd" <your_web_server_address>

Alerts
------

Related alerts, based on the web server log analysis, can be found with:

* ``rule.description:*shellshock*``

If you have Suricata monitoring the endpoint's traffic you can also query ``rule.description:*CVE-2014-6271*`` for the related Suricata's alerts.

Affected endpoints
------------------

* RHEL 7 agent host
