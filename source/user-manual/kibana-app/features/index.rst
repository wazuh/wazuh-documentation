.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_features:

Features
========

The Wazuh Kibana plugin supplies the view of the Wazuh cluster, Wazuh agents and generated alerts. It provides an elegant, easy-to-use UI to interact with the Wazuh manager through the Wazuh API, showing the relevant information in a convenient way. This section shows how to use the plugin through its different features.

#. `Discover`_
#. `Monitoring the Wazuh agent`_
#. `Ruleset`_
#. `Settings`_
#. `Dev tools`_
#. `Reporting`_
#. `Index pattern selector`_
#. `Download as CSV`_
#. `Query configuration`_

.. _kibana_discovery:

Discover
--------

This section is available under the ``Discover`` button and allows interactively explore Wazuh alerts from the currently selected index pattern. It is possible to submit search queries, filter the search results, view alerts data, and also, by clicking on the fields on the left side of the window, add columns for a quick value comparison between alerts. The user can see the number of alerts that match the search query and get field value statistics:

.. thumbnail:: ../../../images/kibana-app/features/discover/wazuh-kibana-discover.png
  :align: center
  :width: 100%

.. _kibana_agents:

Monitoring the Wazuh agent
--------------------------

The overall status of all the Wazuh agents belonging to the Wazuh cluster is shown in the section  *Agents*, found through the top menu. The section shows also an interactive table, listing the Wazuh agents and some of their details. The table allows the user to perform operations such as adding a new Wazuh agent, viewing the configuration of an existing Wazuh agent and more:

.. thumbnail:: ../../../images/kibana-app/features/agents/wazuh-kibana-agents.png
  :align: center
  :width: 100%

After selecting a specific Wazuh agent from the list, the user can monitor its security events:

.. thumbnail:: ../../../images/kibana-app/features/agents/wazuh-kibana-agent.png
  :align: center
  :width: 100%

.. _kibana_ruleset:

Ruleset
-------

The :ref:`ruleset <ruleset>` is a key part of Wazuh. It's used by the Wazuh manager to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies or security policy violations.

Ruleset section in the Wazuh Kibana plugin is available under *Management > Ruleset* option. The section is divided into three parts: :ref:`Rules <rules_syntax>`, :ref:`Decoders <decoders_syntax>`, and :ref:`Lists <ruleset_cdb-list>`:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-rules.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-decoders.png
    :align: center
    :width: 100%

 .. group-tab:: Lists

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-lists.png
    :align: center
    :width: 100%

A special search syntax can be used on the bar for filtering rules and decoders, similar to the ``Lucene`` syntax used in Kibana. For example, typing ``group: audit``, creates a filter pill under the search bar. The ``X`` icon removes the filter:

.. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-ruleset-filter.png
  :align: center
  :width: 100%

Clicking on a specific rule or a decoder opens a detail view with the complete information and the table listing related rules or decoders that are defined on the same file:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-rule-details.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-decoder-details.png
    :align: center
    :width: 100%


``Custom rules`` and ``custom decoders`` slide buttons open a sections where the :ref:`custom ruleset <ruleset_custom>` is managed. All the changes to the saved custom ruleset require activating them on the Wazuh manager by clicking ``Restart now`` button:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-custom-rules.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-custom-decoders.png
    :align: center
    :width: 100%



.. _kibana_settings:

Settings
--------

The *Settings* section allows to configure and receive the information about the Wazuh Kibana plugin:

API
^^^

This section lists all inserted Wazuh API entries. The star icon indicates the currently used Wazuh API to show information in the Wazuh Kibana plugin. A working API is needed to add or edit an entry. The connection status of each entry can be checked by clicking the ``Check connection`` button found in the ``Action`` column:

.. thumbnail:: ../../../images/kibana-app/features/settings/wazuh-kibana-settings-api.png
  :align: center
  :width: 100%

.. _kibana_settings_configuration:

Configuration
^^^^^^^^^^^^^

This section presents and allows to edit Wazuh Kibana plugin :ref:`configuration file <kibana_config_file>` located at ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``:

.. thumbnail:: ../../../images/kibana-app/features/settings/wazuh-kibana-settings-config.png
  :align: center
  :width: 100%

Logs
^^^^

This section lists the Wazuh Kibana plugin log messages stored on the ``/usr/share/kibana/optimize/wazuh/logs/wazuhapp.log`` file:

.. thumbnail:: ../../../images/kibana-app/features/settings/wazuh-kibana-settings-logs.png
  :align: center
  :width: 100%

About
^^^^^

This section provides information about currently installed Wazuh Kibana plugin package, such as version, revision, and installation date. The changes to each Wazuh Kibana plugin release can be found in the `changelog file <https://github.com/wazuh/wazuh-kibana-app/blob/master/CHANGELOG.md>`_:

.. thumbnail:: ../../../images/kibana-app/features/settings/wazuh-kibana-settings-about.png
  :align: center
  :width: 100%

.. _kibana_dev_tools:

Dev tools
---------

The *Dev tools* tab provides an user interface to interact with the Wazuh API. This tab uses currently selected API from :ref:`Wazuh API configuration <kibana_settings>`. The interface is split into an editor pane and a response pane:

.. thumbnail:: ../../../images/kibana-app/features/dev-tools/wazuh-kibana-dev-tools.png
  :align: center
  :width: 100%

On the editor pane, the API requests can be typed in several ways:

- Using ``in-line parameters``, just like in a browser.
- Using ``JSON-formatted parameters``.
- Combining both in-line and JSON-formatted parameters, where the in-line parameter has precedence over the JSON-formatted one.

.. _kibana_reporting:

Reporting
---------

Under the *Overview* and the *Agents* tabs is an opiton for generating a report of the current section by clicking on the printer icon button, on the top right corner in the interface. The reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/optimize/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted:

.. thumbnail:: ../../../images/kibana-app/features/reporting/wazuh-kibana-reports-generation.png
  :align: center
  :width: 100%

The list of the generated reports is available on *Management > Reporting*, from where they can be downloaded or deleted. The reports are generated in PDF format and downloaded to a user's computer:

.. thumbnail:: ../../../images/kibana-app/features/reporting/wazuh-kibana-reports.png
  :align: center
  :width: 100%

.. _kibana_index_pattern:

Index pattern selector
----------------------

The Wazuh Kibana plugin allows creating custom index patterns on Kibana and, if they are compatible, selecting them in the plugin to run search and analytics against.

Managing an existing index patterns as well as creating a custom index patterns can be done on the *Management > Index Patterns* page on the Kibana interface.
For a new index patterns, to properly order the alerts by creation date, the ``Time Filter field name`` has to be set to ``timestamp``:

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/wazuh-kibana-index-patterns.png
  :align: center
  :width: 100%

The index pattern selector is available on the top menu bar and is enabled only if there are more than one compatible index patterns:

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/wazuh-kibana-index-pattern-selector.png
  :align: center
  :width: 100%

.. _kibana_download_csv:

Download as CSV
---------------

The content of Wazuh tables can be downloaded in CSV format by clicking the Formatted button on the bottom right corner of each table. The file will be downloaded to the user's computer:

.. thumbnail:: ../../../images/kibana-app/features/download-csv/download-csv.png
  :align: center
  :width: 100%

.. _kibana_query_configuration:

Query configuration
-------------------

Wazuh Kibana plugin provides information about the Wazuh managers' and the Wazuh agents' active configuration in real-time. The Wazuh manager's configuration is shown on the *Management > Configuration* page:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/wazuh-kibana-manager-conf.png
  :align: center
  :width: 100%

Most of the elements in the table are clickable, allowing a user to explore each section of the configuration in detail. For example, the current Wazuh manager's cluster configuration can be displayed by selecting the desired node and then clicking on the ``Cluster`` section:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/cluster.png
  :align: center
  :width: 100%

Similarly, each Wazuh agent's configuration can be monitored on *Agents > select the Wazuh agent > Configuration* page. The image below shows that the agent configuration is synchronized:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/wazuh-kibana-agent-sync.png
  :align: center

For example, by clicking on the Wazuh agent's ``Log collection`` section, the detailed active configuration is shown:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/wazuh-kibana-agent-conf-logcollector.png
  :align: center
  :width: 100%

For better readability, the configuration can also be displayed in JSON or XML format :

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/wazuh-kibana-conf-json.png
  :align: center
  :width: 100%
