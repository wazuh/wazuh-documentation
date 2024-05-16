.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh dashboard gives you a quick view of your agents, alerts, and cluster. Learn how to configure its features in this section. 
  
.. _dashboard_management:

Dashboard management
========================

The **Dashboard management** section allows you to configure and customize your Wazuh dashboard experience, as well as seeing the generated reports and the application logs.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Dashboards Management
---------------------

Index patterns
^^^^^^^^^^^^^^
In this section, you can see and configure the Index patterns, and creating new ones.

.. thumbnail:: ../../images/kibana-app/features/settings/index-patterns.png
  :align: center
  :width: 100%

Saved objects
^^^^^^^^^^^^^
You can see the saved objects of the application here. You will find the index patterns, the application settings and the custom visualizations and dashboards.

.. thumbnail:: ../../images/kibana-app/features/settings/saved-objects.png
  :align: center
  :width: 100%

Advanced settings
^^^^^^^^^^^^^^^^^
In this section you can configure advanced settings of the Wazuh Dashboard. Here, you can set the appearance to dark mode. 

.. thumbnail:: ../../images/kibana-app/features/settings/advanced-settings.png
  :align: center
  :width: 100%

.. thumbnail:: ../../images/kibana-app/features/settings/dark-mode.png
  :align: center
  :width: 100%


Reporting
---------
Here you can see the reports generated in the different modules, with the ``Generate report`` button.

.. thumbnail:: ../../images/kibana-app/features/settings/reporting.png
  :align: center
  :width: 100%

Server APIs
-----------

In this section, you can list all your inserted API credentials. The star icon indicates the currently used API to show information on the app. Each entry has multiple available actions to manage it. Keep in mind that a working API is needed to add or edit an entry. Check your API connection status before adding them to the app.

.. thumbnail:: ../../images/kibana-app/features/settings/api.png
  :align: center
  :width: 100%

App Settings
-------------

Configuration
^^^^^^^^^^^^^

You can take a quick look at the Wazuh dashboard configuration file here. The documentation for the ``wazuh.yml`` file can be found in the config section.

.. thumbnail:: ../../images/kibana-app/features/settings/configuration.png
  :align: center
  :width: 100%


Miscellaneous
^^^^^^^^^^^^^

You can manually execute the Health check on this section

.. thumbnail:: ../../images/kibana-app/features/settings/miscellaneous.png
  :align: center
  :width: 100%

App Logs
--------

The Wazuh dashboard stores log information on the ``/usr/share/wazuh-dashboard/data/wazuh/logs/wazuhapp.log`` file. These logs can be helpful for troubleshooting purposes. 

.. thumbnail:: ../../images/kibana-app/features/settings/logs.png
  :align: center
  :width: 100%

About
-----

This section provides information about your currently installed Wazuh dashboard package, such as version, revision, and installation date. If you want to discover what's new on each release, you can go to our `Changelog file <https://github.com/wazuh/wazuh-dashboard-plugins/blob/master/CHANGELOG.md>`_ to check it out.

.. thumbnail:: ../../images/kibana-app/features/settings/about.png
  :align: center
  :width: 100%
