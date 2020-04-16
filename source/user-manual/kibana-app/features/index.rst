.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_features:

Features
========

The Wazuh Kibana plugin supplies the view of the Wazuh cluster, Wazuh agents and generated alerts. It provides an elegant, easy-to-use UI to interact with the Wazuh manager through the Wazuh API, showing the relevant information in a convenient way. This section shows how to use the plugin through its different features.

#. `Overview`_
#. `Ruleset`_
#. `Settings`_
#. `Dev tools`_
#. `Reporting`_
#. `Index pattern selector`_
#. `Download as CSV`_
#. `Query configuration`_

.. _kibana_app_overview:

Overview
--------

The Wazuh app is available on the left side of the screen, on the Kibana sidebar. It's organized in four main sections on the top navigation bar, an indicator for the currently selected API and index pattern, and a button to open the Settings page. This section is a brief description of each of these sections, its features and what the user can do with them.

.. thumbnail:: ../../../images/kibana-app/features/app-overview/app-navigation.png
  :align: center
  :width: 100%

.. topic:: Overview

    This is the main Wazuh app section. It provides an overall view of your cluster in its *General* section, where you can visualize all the triggered alerts from a specified time range. On the other sections, such as *PCI DSS* or *Vulnerabilities*, you can find more specific dashboards and charts for different Wazuh capabilities. Take a look at the :ref:`user manual <user_manual>` for more information.

.. topic:: Management

    From this section, you can manage the rules and decoders your Wazuh manager is applying, edit local and centralized configurations, check the server logs, download your reports and see the cluster health.

.. topic:: Agents list

    List all your agents in a single page. Get relevant information about them, such as current version, OS, IP, group, and more. You can refine your search using the bar and the filters above the list, or :ref:`download the list <kibana_download_csv>` using the ``Formatted`` button.

.. thumbnail:: ../../../images/kibana-app/features/app-overview/agents-preview.png
  :align: center
  :width: 100%

.. topic:: Agent tab

    When clicking on an agent from the list, you can open a tab similar to *Overview*, but tailored to the agent. In addition to this, you can quickly switch to a different agent using the autocomplete search bar on the top right corner. You can check the agent connection status, its alerts, group configuration, hardware information, etc.

.. thumbnail:: ../../../images/kibana-app/features/app-overview/agents.png
  :align: center
  :width: 100%

.. topic:: Discover

    You can interactively explore your Wazuh alerts from the *Discover* page. You have access to every alert from your currently selected index pattern. You can submit search queries, filter the search results, and view alerts data. You can also see the number of alerts that match the search query and get field value statistics.

.. thumbnail:: ../../../images/kibana-app/features/app-overview/discover.png
  :align: center
  :width: 100%

.. topic:: Dev tools

    The *Dev tools* tab provides an user interface to interact with the Wazuh API. You can use it to send requests and get a response. Click :ref:`here <kibana_dev_tools>` for more details about this section.

.. topic:: Settings

    The *Settings* page allows you to configure and customize your Wazuh app experience. This section is fully described on its own :ref:`section <kibana_settings>` in the documentation.


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

The *Settings* page allows you to configure and customize your Wazuh app experience. This section is automatically opened the first time you open the app in order to configure your first Wazuh API credentials, so the app can work properly.

API
^^^

This section lists all inserted Wazuh API entries. The star icon indicates the currently used Wazuh API to show information in the Wazuh Kibana plugin. A working API is needed to add or edit an entry. The connection status of each entry can be checked by clicking the ``Check connection`` button found in the ``Action`` column:

.. thumbnail:: ../../../images/kibana-app/features/settings/wazuh-kibana-settings-api.png
  :align: center
  :width: 100%

Extensions
^^^^^^^^^^

Wazuh provides multiple integrations and capabilities to monitor and analyze your hosts. If you're using some of them, you can enable multiple extensions on the app to visualize tailored dashboards, which provide rich and useful information. Some of these extensions are disabled by default because you have to previously enable them on your manager configuration in order to generate alerts.

.. thumbnail:: ../../../images/kibana-app/features/settings/extensions.png
  :align: center
  :width: 100%

Index pattern
^^^^^^^^^^^^^

The index pattern functionality is completely described at the :ref:`kibana_index_pattern` section.

.. thumbnail:: ../../../images/kibana-app/features/settings/pattern.png
  :align: center
  :width: 100%

Configuration
^^^^^^^^^^^^^

You can take a quick look to the full Wazuh app configuration file here. The documentation for the ``wazuh.yml`` file can be found on the :ref:`kibana_config_file` section.

.. thumbnail:: ../../../images/kibana-app/features/settings/configuration.png
  :align: center
  :width: 100%

Logs
^^^^

The Wazuh app stores log information on the ``/usr/share/kibana/optimize/wazuh-logs/wazuhapp-plain.log`` file. These logs can be helpful for troubleshooting purposes. The *Logs* section allows you to check the last 20 log messages along with its date and severity level.

.. thumbnail:: ../../../images/kibana-app/features/settings/logs.png
  :align: center
  :width: 100%

About
^^^^^

This section provides information about your currently installed Wazuh app package, such as version, revision, and installation date. If you want to discover what's new on each app release, you can go to our `Changelog file <https://github.com/wazuh/wazuh-kibana-app/blob/master/CHANGELOG.md>`_ to check it out.

.. thumbnail:: ../../../images/kibana-app/features/settings/about.png
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
- Using ```JSON-formatted parameters``.
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
