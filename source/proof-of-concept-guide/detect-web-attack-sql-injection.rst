.. _poc_detect_web_attack_sql_injection:

Detecting a web attack - SQL injection
======================================

Wazuh is able to detect a `SQL Injection attack <https://portswigger.net/web-security/sql-injection>`_ from web server logs showing patterns like ``select``, ``union``, and other common SQL patterns of attack in a monitored endpoint.

If Suricata integration is configured to monitor the endpoint's network traffic, the attack can additionally be detected at a network level.

Prerequisites
-------------

- You need an Apache server running on the monitored RHEL 7 agent system.

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

        # curl -XGET "http://${replace_by_your_web_server_address}/?id=SELECT+*+FROM+users";

Querying the alerts
-------------------

Related alerts, based on the web server log analysis, can be found with:

* ``rule.id:31103``

If you have Suricata monitoring the endpoint's traffic you can also query ``data.alert.signature_id:2006445`` for the related Suricata's alerts.

Affected endpoints
------------------

* RHEL 7 agent host
