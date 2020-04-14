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

Ruleset section in the Wazuh Kibana plugin is available under *Management > Ruleset* option. The section is divided into three parts: ``Rules``, ``Decoders``, and ``Lists``. The table allows you to navigate through the rules or decoders, and you can use the search bar to filter.

A special search syntax can be used on the bar for filtering rules and decoders, similar to the *Lucene* syntax used in Kibana. For example, if you type ``group: audit``, it will create a filter pill under the search bar. You can remove the filter clicking on the `X` icon.

.. thumbnail:: ../../../images/kibana-app/features/ruleset/wazuh-kibana-ruleset.png
  :align: center
  :width: 100%

When the user clicks on a rule or decoder, it will open a detail view, where you can find the complete information. In the different sections you can find :ref:`PCI DSS <pci_dss>` or :ref:`GDPR <gdpr>` requirements, :ref:`groups <reference_agent_conf>`, regular expressions, and other details. The user can click on some elements to activate a filter on the previous list.

At the bottom of the page, there's a table of related rules or decoders that are defined on the same file.

.. thumbnail:: ../../../images/kibana-app/features/ruleset/ruleset-detail.png
  :align: center
  :width: 100%

.. _kibana_settings:

Settings
--------

The *Settings* page allows you to configure and customize your Wazuh app experience. This section is automatically opened the first time you open the app in order to configure your first Wazuh API credentials, so the app can work properly.

API
^^^

In this section, you can list all your inserted API credentials. The star icon indicates the currently used API to show information on the app. Each entry has multiple available actions to manage it. Keep in mind that a working API is needed in order to add or edit an entry. Check your API connection status prior to adding them to the app.

.. thumbnail:: ../../../images/kibana-app/features/settings/api.png
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

The *Dev tools* tab provides an user interface to interact with the Wazuh API. You can use it to send requests and get a response. This tab uses your currently selected API from :ref:`kibana_settings`. The interface is split into two panes: *editor pane* and *response pane*.

.. thumbnail:: ../../../images/kibana-app/features/dev-tools/dev-tools.png
  :align: center
  :width: 100%

On the editor pane, you can type API requests in several ways:

- Using *in-line parameters*, just like in a browser.
- Using *JSON-formatted parameters*.
- Combining both in-line and JSON-formatted parameters (the in-line parameter has precedence over the JSON-formatted one).

.. _kibana_reporting:

Reporting
---------

When you're navigating through the *Overview* or *Agents* tabs, you can generate a report of the current section when clicking on the printer icon button, on the top right corner in the interface. These reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted.

.. thumbnail:: ../../../images/kibana-app/features/reporting/generate-report.png
  :align: center
  :width: 100%

The generated reports are available on *Management > Reporting*. From there, you can list them, refresh the list to scan for new generated reports, download or delete them. The reports are generated and downloaded in PDF format to your computer.

.. thumbnail:: ../../../images/kibana-app/features/reporting/list-reports.png
  :align: center
  :width: 100%

.. _kibana_index_pattern:

Index pattern selector
----------------------

The Kibana app lets you select a custom index pattern for the *Overview*, *Agents* and *Discover* tabs, used to run search and analytics against. You can create custom index patterns on Kibana, and select them on the app if they're compatible.

You can select a different index pattern in two ways:

- On the **Settings > Pattern** page.
- On the **top menu bar**. This selector is only enabled if you have more than one compatible index pattern.

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/index-pattern-description.png
  :align: center
  :width: 100%

You can open the *Management > Index Patterns* page on the Kibana interface to manage them, and create even more. Make sure to use ``timestamp`` as the *Time Filter field name* to properly order the alerts by creation date.

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/management-patterns.png
  :align: center
  :width: 100%

.. _kibana_download_csv:

Download as CSV
---------------

You can download the content of Wazuh tables in CSV format. To do this, locate the ``Formatted`` button on the bottom right corner of each table. Once you click on it, the file will be downloaded to your computer.

.. thumbnail:: ../../../images/kibana-app/features/download-csv/download-csv.png
  :align: center
  :width: 100%

.. _kibana_query_configuration:

Query configuration
-------------------

The actual configuration of an agent, or the manager can be queried on demand by clicking on the *Agents* tab or the *Management* tab. From here you will be able to fetch the active configuration in real time.

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/configuration-section.png
  :align: center
  :width: 100%

The image below shows that the agent configuration is synchronized:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/is-sync.png
  :align: center

By clicking on the *Log collection* configuration, the active configuration is shown:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/logcollector-query.png
  :align: center
  :width: 100%

It also has the capability to show the configuration in JSON or XML formats for better readability:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/logcollector-json.png
  :align: center
  :width: 100%

Now for example, if you want to know the current cluster configuration from one of your *Wazuh managers*, click on the *Management > Configuration* tab, select the desired node and then click on the *Cluster* section:

.. thumbnail:: ../../../images/kibana-app/features/query-configuration/cluster.png
  :align: center
  :width: 100%
