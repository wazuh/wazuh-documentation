.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find the most useful Wazuh Common Schema (WCS) fields, grouped by the question they answer (when, where, what, who, and why), with example queries for the Wazuh dashboard.

.. _reference_wcs_key_fields:

Key WCS fields
==============

The Wazuh Common Schema (WCS) defines thousands of fields, but most searches, dashboards, and detection rules rely on a small subset. The tables below list the fields to know first, grouped by the question they answer. You can use them in the search bar of the Wazuh dashboard, for example, in **Threat intelligence** > **Threat Hunting**.

The fields are organized in the following sections:

-  :ref:`When it happened <reference_wcs_key_when>`
-  :ref:`Where it came from <reference_wcs_key_where>`
-  :ref:`What happened <reference_wcs_key_what>`
-  :ref:`Who and what was involved <reference_wcs_key_who>`
-  :ref:`Why it matters <reference_wcs_key_why>`

.. _reference_wcs_key_when:

When it happened
----------------

These fields record when Wazuh received an event and when the activity it describes took place. Use them to filter events and findings by time.

+-----------------+---------------------------------------------------------------------------------------------------------------------+
| Field           | Use it to                                                                                                           |
+=================+=====================================================================================================================+
| ``@timestamp``  | Filter events and findings by the time Wazuh received them. The Wazuh dashboard uses this field for its time range. |
+-----------------+---------------------------------------------------------------------------------------------------------------------+
| ``event.start`` | Search by the time the activity happened, according to the original log.                                            |
+-----------------+---------------------------------------------------------------------------------------------------------------------+

.. _reference_wcs_key_where:

Where it came from
------------------

These fields identify the Wazuh agent, integration, and log location that produced an event. Use them to narrow a search to one endpoint, data source, or log file.

+------------------------------------------+------------------------------------------------------------------------------------+
| Field                                    | Use it to                                                                          |
+==========================================+====================================================================================+
| ``wazuh.agent.name``, ``wazuh.agent.id`` | Find the events of one monitored endpoint.                                         |
+------------------------------------------+------------------------------------------------------------------------------------+
| ``wazuh.agent.groups``                   | Find the events of a group of Wazuh agents.                                        |
+------------------------------------------+------------------------------------------------------------------------------------+
| ``wazuh.integration.name``               | Find the events of one source, such as ``windows``, ``linux``, or ``system-auth``. |
+------------------------------------------+------------------------------------------------------------------------------------+
| ``wazuh.integration.category``           | Find the events of one category, such as ``system-activity``.                      |
+------------------------------------------+------------------------------------------------------------------------------------+
| ``wazuh.protocol.location``              | Find the events read from one file, log channel, or Wazuh agent module.            |
+------------------------------------------+------------------------------------------------------------------------------------+

.. _reference_wcs_key_what:

What happened
-------------

These fields describe the activity that an event records, using the same values across data sources. Use them to find the same kind of activity regardless of the original log format.

+----------------------------------------------------+----------------------------------------------------------------------------------------------------+
| Field                                              | Use it to                                                                                          |
+====================================================+====================================================================================================+
| ``event.kind``, ``event.category``, ``event.type`` | Find events of the same kind across sources, such as all ``authentication`` or ``process`` events. |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``event.outcome``                                  | Separate successful and failed activity, such as failed logons.                                    |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``event.action``, ``event.code``                   | Find a specific action as its source names it, such as a Windows event ID.                         |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``message``                                        | Read a short, human-readable summary of the event.                                                 |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------+
| ``event.original``                                 | Read the original log. You can't search this field.                                                |
+----------------------------------------------------+----------------------------------------------------------------------------------------------------+

.. _reference_wcs_key_who:

Who and what was involved
-------------------------

These fields identify the users, hosts, processes, files, network connections, and registry keys involved in an event. Use them to investigate the activity of a specific user, endpoint, or file.

+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| Field                                                                       | Use it to                                                                                              |
+=============================================================================+========================================================================================================+
| ``user.name``                                                               | Find the activity of a user account.                                                                   |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``host.hostname``                                                           | Find events by the host that the log reports, which can differ from the Wazuh agent that collected it. |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``process.name``, ``process.command_line``, ``process.parent.command_line`` | Investigate the processes that ran and how they started.                                               |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``file.path``, ``file.hash.sha256``                                         | Find activity on a file or a known file hash.                                                          |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``source.ip``, ``destination.ip``, ``destination.port``                     | Investigate network connections.                                                                       |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``dns.question.name``, ``url.full``                                         | Investigate the domains and URLs that an endpoint reached.                                             |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| ``registry.path``                                                           | Investigate changes to the Windows registry.                                                           |
+-----------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+

.. _reference_wcs_key_why:

Why it matters
--------------

These fields are only in findings. They describe the detection rule that matched an event, its severity, and its mapping to MITRE ATT&CK and compliance standards. Use them to prioritize and investigate findings.

+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| Field                                                                                   | Use it to                                                                                           |
+=========================================================================================+=====================================================================================================+
| ``wazuh.rule.title``, ``wazuh.rule.id``                                                 | Identify the detection rule that matched.                                                           |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| ``wazuh.rule.level``                                                                    | Prioritize findings by severity: ``informational``, ``low``, ``medium``, ``high``, or ``critical``. |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| ``wazuh.rule.mitre.technique.id``, ``wazuh.rule.mitre.tactic.name``                     | Map findings to MITRE ATT&CK techniques and tactics.                                                |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| ``wazuh.rule.compliance.*``                                                             | Find findings related to a compliance standard, such as ``wazuh.rule.compliance.pci_dss``.          |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| ``wazuh.threat.enrichments.matched.field``, ``wazuh.threat.enrichments.indicator.name`` | Find events that matched an indicator of compromise (IOC).                                          |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| ``event.doc_id``, ``event.index``                                                       | Open the event that generated the finding.                                                          |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| ``wazuh.event.id``                                                                      | Gather the raw event, the normalized event, and all the findings of the same log.                   |
+-----------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+

Example queries
---------------

The following queries show how to combine these fields in the Wazuh dashboard search bar:

-  High-severity findings from Linux endpoints: ``wazuh.integration.name: linux and wazuh.rule.level: high``
-  Failed authentications on one endpoint: ``wazuh.agent.name: Windows and event.category: authentication and event.outcome: failure``
-  Findings mapped to a MITRE ATT&CK technique: ``wazuh.rule.mitre.technique.id: T1053``
-  Process events that ran PowerShell: ``event.category: process and process.name: powershell.exe``
