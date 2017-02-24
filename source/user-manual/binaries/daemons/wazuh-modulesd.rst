.. _wazuh-modulesd:

wazuh-modulesd
==============

wazuh-modulesd daemon is in charge on manage the correct working of

the different Wazuh modules which are descripted below.

.. topic:: Elastic Stack integration

  It is the combination of three popular Open Source projects for log management, known as Elasticsearch, Logstash and Kibana.

.. topic:: Wazuh Ruleset for OSSEC

  There are OSSEC rules updated and new ones created in order to improve Wazuh functionality and detection capabilities.

.. topic:: RESTful API

  Wazuh RESTful API is a service to control Wazuh Manager using REST requests; that brings new ways to use Wazuh managing agents, checking rootchek or syscheck routines and improving capabilities of large agent deployments.

+---------+--------------------------+
| Options | Descriptions             |
+=========+==========================+
| `-d`_   | Increase debug mode      |
+---------+--------------------------+
| `-f`_   | Run in foreground        |
+---------+--------------------------+
| `-h`_   | Display the help message |
+---------+--------------------------+
| `-t`_   | Test configuration       |
+---------+--------------------------+

``-d``
------

Increase debug mode.

``-f``
------

Run in foreground.

``-h``
------

Display the help message.


``-t``
------

Test configuration.
