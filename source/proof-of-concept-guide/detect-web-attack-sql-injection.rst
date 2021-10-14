.. _poc_detect_web_attack_sql_injection:

Detecting a web attack - SQL Injection
======================================

This use case aims to show that Wazuh is able to detect a SQL Injection attack (https://portswigger.net/web-security/sql-injection). Wazuh can detect it by monitoring Apache logs and detect some patterns on it, like some common SQL attacks: ``select``, ``union``, etc...

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

- This use case requires no additional configuration.

Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

From an external host (the attacker), execute curl from a terminal:

    .. code-block:: XML

        curl -XGET "http://${replace_by_your_web_server_address}/?id=SELECT+*+FROM+users";

Alerts
^^^^^^
- For alert based on web server log analysis: rule.id:31103
- For alert based on network traffic analysis (Suricata NIDS): ``data.alert.signature_id:2006445``

Affected endpoint
^^^^^^^^^^^^^^^^^
Linux RHEL