.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh log data collection gathers events with the Logcollector module on the Wazuh agent. Learn how the Wazuh manager normalizes, decodes, and enriches them, and how the Wazuh indexer stores them for rule matching and analysis.

How log data collection works
==============================

The Wazuh agent collects log data, the Wazuh manager normalizes, decodes, and enriches it, and the Wazuh indexer stores it for rule matching and analysis. The Wazuh manager applies decoders to classify incoming events. Wazuh indexes every event that an integration decoder classifies, whether or not a rule matches it. Events that no integration classifies are indexed in ``wazuh-events-v5-unclassified`` only when :ref:`unclassified event storage is enabled <wazuh_indexer_indices_enabling_unclassified_events_storage>`.

The image below illustrates the flow of log data collection and analysis in Wazuh.

.. thumbnail:: /images/manual/log-data-collection/log-data-collection.png
   :title: Log data collection and analysis flow in Wazuh
   :alt: Diagram of the log data flow: the Wazuh agent collects logs, the Wazuh manager decodes and enriches them, the Wazuh indexer runs detectors and rules and stores the events, and the Wazuh dashboard shows the findings.
   :align: center
   :width: 100%

.. note::

   To collect syslog from agentless devices such as firewalls, switches, and routers, relay it through a Linux endpoint that runs a Wazuh agent. See the :ref:`configure rsyslog on a Linux endpoint <configuring_rsyslog_relay>` section for an example.
