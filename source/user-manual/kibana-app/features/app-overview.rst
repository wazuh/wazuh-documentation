.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_app_overview:

.. meta::
  :description: Learn about how is composed the Wazuh App for Kibana

App overview
============

Once the Wazuh plugin has been installed, the application will be available from the main Kibana menu.

.. note:: When the app is being started in a new session, Health Check is performed to validate for everything that the app needs are working on. This will advise you in case something fails or it is not configured.

Menu
-------

With the application opened, you will find in the upper-left corner the Wazuh menu button that allows you to navigate all the features of the plugin. 

This menu has six principal entries in which the content of the app is grouped:

. From the **Modules** entry, you have access to the dashboards and panels that allow you to analyze and explore the corresponding capabilities of Wazuh.

. From the **Management** entry, you have access to manage and monitor some features and configurations of your Wazuh cluster/manager.

. From the **Agents** entry, you have access to the list of agents that make up your Wazuh environment and manage some features and monitor some statistics about theirs. Also, you can pick up an agent and see all the Modules that the agent applies.

. From the **Tools** entry, you have access to a couple of tools to work directly with the Wazuh API and test your ruleset environment.

. From the **Security** entry, you have access to manage the Role-based Access Control of Wazuh.

. From the **Settings** entry, you have access to configure some features of the Wazuh plugin itself.


Index pattern and API selectors
------------------------------------------

For more complex scenarios, when there is more than one index pattern associated with the Wazuh alerts the app lets you select what of them you want to work. 

Similarly, when the application is connected with more than one Wazuh API or cluster, the app lets you select the desired to work.

.. note::  These selectors will be available only when there is more than one option to pick up.

Common features
==============


There are some common features across all app sections that help you to get a better experience: 

Agent pining
-----------------

When an agent is selected this is pinned across all Modules, letting you explore the different capabilities without moving out from the agent.
Navigating in the modules you have access to pick up or change an agent pinned from the upper-right selector with the label **Explore agent**.

.. note:: You can change the selected agent or unpin it from the app menu too.

Reporting
-------------


All the dashboards and some other sections can generate a report of theirs content. You can do this from the link **Generate report** that you can find in the upper-right corner of the section.

.. note:: You can access all generated reports from the app menu in the **Management / Reporting** entry.


Search bar
--------------

Most modules have a search bar where you can filter the alerts that are showed in the different sections. You can do this with the following features: 

You can perform queries in the most of modules sections in KQL language (link) or Lucene language (link). The query keeps only in the same module.

You can select the time range in several ways. The value keeps for the entire app.

You can operate with field filters. These filters can be pinned so that they keep in the entire application, otherwise, they will only keep in the same module. 

.. note:: The filters can be applied from some visualizations clicking in their values.


Exporting tables
---------------------

Most of the tables in the application have the option to export the content in CSV format. You can do this from the link **Export formatted** over the tables, the CSV file will be downloaded in your browser.

