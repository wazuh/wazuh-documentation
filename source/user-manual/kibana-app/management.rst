.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_management:

Management
^^^^^^^^^^

This section provides access to the Wazuh administration tools, status information and reports. The following subsections are available:

#. `Configuration`_
#. `Cluster`_
#. `Groups`_
#. `Logs`_
#. `Reporting`_
#. `Ruleset`_
#. `Status`_


.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-management.png
  :align: center
  :width: 100%

.. _kibana_manager_configuration:

Configuration
-------------

This section provides information about the Wazuh cluster nodes' active configuration in real-time:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-manager-conf.png
  :align: center
  :width: 100%

Most of the elements in the table are clickable, allowing the user to explore each section of the configuration in detail. For example, the current Wazuh manager's cluster configuration can be displayed by selecting the desired Wazuh node and then clicking on the ``Cluster`` section:

.. thumbnail:: ../../images/kibana-app/sections/management/cluster.png
  :align: center
  :width: 100%

For better readability, the configuration can also be displayed in JSON or XML format :

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-configuration-json.png
  :align: center
  :width: 100%

.. _kibana_cluster:

Cluster
-------

This section presents the information about the Wazuh cluster:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-cluster.png
  :align: center
  :width: 100%

It also gives access to detailed information about each Wazuh node:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-cluster-node.png
  :align: center
  :width: 100%

.. _kibana_agent_group:

Groups
------

This section provides access to the Wazuh :ref:`agent groups <grouping-agents>` overview and :ref:`configuration <reference_agent_conf>`. The user can browse, add or delete groups and
also edit the centaralized configuration file ``agent.conf`` for each group available under the *Actions* column:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-groups.png
  :align: center
  :width: 100%

After editing and saving the ``agent.conf`` file, each Wazuh agent belonging to the group will receive and merge the new configration:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-group-conf.png
  :align: center
  :width: 100%

.. _kibana_logs:

Logs
----

This section provides the Wazuh cluster nodes' logs, which can be filtered using the available filters, and tailed using the ``Play realtime`` button:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-logs.png
  :align: center
  :width: 100%

The logs can be downloaded in CSV format by clicking the ``Formatted`` button located on the bottom right corner of the page. The file will be downloaded to the user's computer.

.. _kibana_reporting:

Reporting
---------

This section contains the list of user generated reports in the PDF format for the collected security events presented under the *Overview* and the *Agents* tabs. The reports can be downloaded to a user's computer or deleted:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-reports.png
  :align: center
  :width: 100%

.. _kibana_ruleset:

Ruleset
-------

The :ref:`ruleset <ruleset>` is a key part of Wazuh. It's used by the Wazuh manager to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies or security policy violations.

Ruleset section in the Wazuh Kibana plugin is available under *Management > Ruleset* option. The section is divided into three parts: :ref:`Rules <rules_syntax>`, :ref:`Decoders <decoders_syntax>`, and :ref:`Lists <ruleset_cdb-list>`:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-rules.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-decoders.png
    :align: center
    :width: 100%

 .. group-tab:: Lists

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-lists.png
    :align: center
    :width: 100%

A special search syntax can be used on the bar for filtering rules and decoders, similar to the ``Lucene`` syntax used in Kibana. For example, typing ``group: audit``, creates a filter pill under the search bar. The ``X`` icon removes the filter:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-ruleset-filter.png
  :align: center
  :width: 100%

Clicking on a specific rule or a decoder opens a detail view with the complete information and the table listing related rules or decoders that are defined on the same file:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-rule-details.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-decoder-details.png
    :align: center
    :width: 100%


``Custom rules`` and ``custom decoders`` slide buttons open a sections where the :ref:`custom ruleset <ruleset_custom>` is managed. All the changes to the saved custom ruleset require activating them on the Wazuh manager by clicking ``Restart now`` button:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-custom-rules.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-custom-decoders.png
    :align: center
    :width: 100%

.. _kibana_cluster_status:

Status
------

This section presents the information about the Wazuh cluster nodes. After selecting the node, the user can see which Wazuh deamons are active, general information about the Wazuh node, The Wazuh agents' coverage and the information about the last registered Wazug agent:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-status.png
  :align: center
  :width: 100%
