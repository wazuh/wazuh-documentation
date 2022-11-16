.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh is capable of detecting an SQL Injection attack from web server logs showing common SQL patterns of attack in a monitored endpoint. Learn more about this in this PoC.

.. _poc_detect_web_attack_sql_injection:

Detecting an SQL Injection attack
=================================

Wazuh is able to detect an `SQL Injection attack <https://portswigger.net/web-security/sql-injection>`_ from web server logs showing patterns like ``select``, ``union``, and other common SQL patterns of attack in a monitored endpoint. The attack can also be detected at a network level if you configure a :ref:`Suricata integration <learning_wazuh_suricata>` to monitor the endpoint's network traffic.


Prerequisites
-------------

- You need an Apache server running on the monitored Ubuntu 20 system.

Configuration
-------------

#. Add the following lines to ``/var/ossec/etc/ossec.conf`` at the Wazuh Ubuntu 20 host. This sets the Linux agent to monitor the access logs of your Apache server.

    .. code-block:: XML

      <localfile>
        <log_format>apache</log_format>
        <location>/var/log/apache2/access.log</location>
      </localfile>

    Optionally, you can install Suricata in the Ubuntu 20 endpoint and configure it to monitor the endpoint's network traffic.
  

#. Restart the Wazuh agent to apply the configuration changes.

    .. code-block:: console

        # systemctl restart wazuh-agent

  
#. Modify the FilesMatch directive at ``/etc/apache2/apache2.conf`` as follow:

    .. code-block:: none

      <FilesMatch ".ht*">
        Require all denied
      </FilesMatch>


Steps to generate the alerts
----------------------------

#. Replace ``<your_web_server_address>`` with the appropriate value and execute the following command from a system external to your Ubuntu 20 endpoint (the attacker).

    .. code-block:: console

      # curl -XGET "http://replace_by_your_ubuntu_web_server_address/?id=SELECT+*+FROM+users";

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

* ``rule.id:31103``

.. note::  
   Child rules of 31103, like 31106, can be triggered depending on the Apache server setup.

.. thumbnail:: ../images/poc/Detecting-an-SQL-Injection-attack.png
          :title: Detecting an SQL Injection attack
          :align: center
          :wrap_image: No