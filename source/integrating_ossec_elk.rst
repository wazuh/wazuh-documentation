Integrating OSSEC-ELK Stack
=============================================================

Introduction
^^^^^^^^^^^^^^^^^^^
Welcome to OSSEC-ELK Stack integration guide by Wazuh, throught some simple steps you will set up an entire ELK Stack architecture to monitor, collect, process, index and display your OSSEC Alerts.

.. topic:: Security Compliance: CIS Benchmark and PCI DSS 3.0 Requirements.

   Wazuh development team has release OSSEC-Wazuh 0.1 extended version, we tweak some OSSEC essential funcionalty to full-integrate PCI and CIS security compliance with OSSEC and review them throught Kibana dashboards.

.. note:: This functionalty requires OSSEC-Wazuh version and OSSEC-Wazuh Ruleset, install it at: OSSEC-Wazuh Github.

.. topic:: OSSEC JSON Extension

   Wazuh development team has release OSSEC-Wazuh 0.1 extended version, we have improve OSSEC JSON output logs includings new fields (timestamp, location, groups array, security compliance, rootcheck alerts)

.. note:: This functionalty requires OSSEC-Wazuh version and OSSEC-Wazuh Ruleset, install it at: OSSEC-Wazuh Github.

Logstash
^^^^^^^^^^^^^^^^^^^
Collect and transport data.
Logstash will be on charge of taking our OSSEC alerts files, process and send them to Elasticsearch server.

1. Install Logstash from official source


Logstash-Forwarder
^^^^^^^^^^^^^^^^^^^

Elasticsearch
^^^^^^^^^^^^^^^^^^^

Kibana
^^^^^^^^^^^^^^^^^^^

.. toctree::
   :maxdepth: 2

