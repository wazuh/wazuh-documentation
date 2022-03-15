.. meta::
  :description: Wazuh is capable of detecting an SQL Injection attack from web server logs showing common SQL patterns of attack in a monitored endpoint. Learn more about this in this POC.

.. _poc_detect_web_attack_sql_injection:

Detecting an SQL Injection attack
=================================

Wazuh is able to detect an `SQL Injection attack <https://portswigger.net/web-security/sql-injection>`_ from web server logs showing patterns like ``select``, ``union``, and other common SQL patterns of attack in a monitored endpoint. The attack can also be detected at a network level if you configure a :ref:`Suricata integration <learning_wazuh_suricata>` to monitor the endpoint's network traffic.


Prerequisites
-------------

- You need an Apache server running on the monitored CentOS 8 system.

Configuration
-------------

#. Add the following lines to ``/var/ossec/etc/ossec.conf`` at the Wazuh CentOS 8 host. This sets the Linux agent to monitor the access logs of your Apache server.

    .. code-block:: XML

        <localfile>
        <log_format>apache</log_format>
        <location>/var/log/httpd/access_log</location>
        </localfile>

Optionally, you can install Suricata in the CentOS 8 endpoint and configure it to monitor the endpoint's network traffic.

Steps to generate the alerts
----------------------------

#. Replace ``<your_web_server_address>`` with the appropriate value and execute the following command from a system external to your CentOS 8 endpoint (the attacker).

    .. code-block:: console

        # curl -XGET "http://replace_by_your_web_server_address/?id=SELECT+*+FROM+users";

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

* ``rule.id:31103``


.. thumbnail:: ../images/poc/Detecting-an-SQL-Injection-attack.png
          :title: Detecting an SQL Injection attack
          :align: center
          :wrap_image: No