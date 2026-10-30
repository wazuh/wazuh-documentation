.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Common Schema (WCS) is organized: its modules, the indices and data streams that use it, event categories, index templates and mappings, and field levels and types.

.. _reference_wcs_how_it_works:

How the Wazuh Common Schema works
=================================

The Wazuh Common Schema (WCS) is the data model of the indices that Wazuh writes: events, findings, raw events, inventory states, and metrics. WCS derives from the Elastic Common Schema (ECS) 9.1.0. It keeps the ECS field names and types and adds the fields Wazuh needs, most of them under the ``wazuh`` object. A field keeps its ECS meaning unless its WCS description says otherwise.

WCS modules
-----------

WCS is organized in modules. Each module defines the data model of one type of index. The modules are in the `wcs folder <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WCS_REF|/wcs/>`__ of the ``wazuh-indexer-plugins`` repository, in two groups:

-  `Stateless modules <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WCS_REF|/wcs/stateless>`__: Data streams that store events, findings, and metrics as they happen. The ``stateless/events/main`` module is the base of the events and findings data streams.
-  `Stateful modules <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WCS_REF|/wcs/stateful>`__: State indices that store the latest known state of each monitored endpoint, such as its monitored files, installed packages, and vulnerabilities.

Each module lists its fields in two generated files in its ``docs`` folder:

-  ``fields.csv``: One row per field, with its field set, type, level, an example, and a short description. The :doc:`WCS field reference <wcs-field-reference>` shows these files as tables.
-  ``wcs_flat.yml``: The same fields with their full description.

Indices and data streams
------------------------

WCS applies to every index and data stream that Wazuh writes, from events and findings to inventory states. The following table shows the indices and data streams that use WCS and the module that defines each of them:

+----------------------------------+--------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Index or data stream             | WCS module                     | Content                                                                                                                                                                          |
+==================================+================================+==================================================================================================================================================================================+
| ``wazuh-events-v5-<CATEGORY>``   | ``stateless/events/main``      | Normalized events, one data stream for each category.                                                                                                                            |
+----------------------------------+--------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-findings-v5-<CATEGORY>`` | ``stateless/events/findings``  | Findings that detectors generate when an event matches a detection rule, one data stream for each category.                                                                      |
+----------------------------------+--------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-events-raw-v5``          | ``stateless/events/raw``       | Logs as the Wazuh manager received them, before decoding. Wazuh writes raw events only when the ``engine.index_raw_events`` setting is ``true``. The default value is ``false``. |
+----------------------------------+--------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-active-responses``       | ``stateless/active-responses`` | Active response executions.                                                                                                                                                      |
+----------------------------------+--------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-states-*``               | ``stateful/*``                 | The latest state of each endpoint: file integrity monitoring, system inventory, Security Configuration Assessment (SCA), and vulnerabilities.                                    |
+----------------------------------+--------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

You can learn more about each index in the :doc:`Wazuh indexer indices </user-manual/wazuh-indexer/wazuh-indexer-indices>` documentation. You can enable raw events with the Setup module API, as described in the :doc:`Setup module </user-manual/wazuh-indexer/modules/setup>` documentation.

Categories
----------

Categories group integrations by the type of activity they monitor. Every integration belongs to a category, and the category selects the data streams its events and findings are written to: ``wazuh-events-v5-<CATEGORY>`` and ``wazuh-findings-v5-<CATEGORY>``. The category of an event is in the ``wazuh.integration.category`` field. Wazuh uses the following categories:

-  ``access-management``: Identity and access management services, such as Okta, Keycloak, and JumpCloud.
-  ``applications``: Web servers and business applications, such as Apache HTTP Server, NGINX, and Google Workspace.
-  ``cloud-services``: Cloud platforms and services, such as AWS, Microsoft Azure, Google Cloud, and GitHub.
-  ``network-activity``: Network devices and network traffic, such as Cisco ASA, Fortinet, and pfSense firewalls, and NetFlow.
-  ``security``: Security tools, such as Suricata, Microsoft 365 Defender, and SentinelOne.
-  ``system-activity``: Operating systems and system auditing, such as Linux, Windows, macOS, and auditd.
-  ``other``: Sources that don't fit any other category.
-  ``unclassified``: Events that no integration recognizes. Wazuh indexes them only when the policy enables unclassified events.

You can find example log types for each category in the :doc:`Wazuh Common Schema (WCS) </user-manual/wazuh-indexer/wazuh-common-schema>` section of the Wazuh indexer documentation.

Index templates and mappings
----------------------------

Index templates define how the Wazuh indexer stores and indexes the fields of each data stream. All event categories share one index template definition, and all findings categories share another. The Wazuh indexer Setup module registers one index template for each category from that definition and changes only the index pattern, so every category has the same field mappings. Run the following command on the Wazuh indexer node to list the event templates:

.. code-block:: console

   # curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -X GET "https://<WAZUH_INDEXER_IP>:9200/_index_template/wazuh-events-*"

The index templates map only the fields that WCS defines:

-  The Wazuh indexer rejects a document that contains a field outside the schema. Custom decoders must write only WCS fields. The Wazuh normalization engine removes temporary fields, whose names start with ``_``, before it sends the event to the Wazuh indexer.
-  The Wazuh indexer maps a field the first time a document uses it. The mapping of a backing index therefore lists only the fields that its documents contain so far, not every WCS field.

Field levels and types
----------------------

Each WCS field has a level and a type. The level of a field shows where it comes from:

-  ``core``: ECS fields that are widely used across sources, such as ``@timestamp`` and ``user.name``.
-  ``extended``: ECS fields that cover more specific cases, such as ``file.path``.
-  ``custom``: Fields that WCS adds, such as ``wazuh.integration.name`` and ``agent.groups``.

Most text fields are of type ``keyword``. A query on a ``keyword`` field matches the whole value, so use a wildcard to find a word inside it. The Wazuh indexer stores values longer than 4096 characters but doesn't index them. A few fields, such as ``event.original``, aren't indexed at all: you can read them in the event, but you can't search or aggregate on them.
