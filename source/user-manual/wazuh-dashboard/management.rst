.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh dashboard gives you a quick view of your agents, alerts, and cluster. Learn how to configure its features in this section. 
  
.. _dashboard_management:

Dashboard management
========================

The **Dashboard management** section allows you to do the following:

-  Configure and customize your Wazuh dashboard experience.

   -  `Dashboards Management`_
   -  `Server APIs`_
   -  `App Settings`_

-  View generated reports.

   -  `Reporting`_

-  Access application logs.

   -  `App Logs`_

Dashboards Management
---------------------

Index patterns
^^^^^^^^^^^^^^

In this section, you can list, configure, and create new index patterns. Index patterns are templates defining data organization for efficient retrieval and analysis.

.. thumbnail:: /images/kibana-app/features/settings/index-patterns.png
   :align: center
   :width: 80%

Saved objects
^^^^^^^^^^^^^

Saved objects of the application include:

-  Index patterns
-  Application settings
-  Custom visualizations and dashboards

.. thumbnail:: /images/kibana-app/features/settings/saved-objects.png
   :align: center
   :width: 80%

Advanced settings
^^^^^^^^^^^^^^^^^

In this section, you can configure advanced settings of the Wazuh Dashboard such as the date format.

.. thumbnail:: /images/kibana-app/features/settings/advanced-settings.png
   :align: center
   :width: 80%

You can also switch the appearance to dark mode within advanced settings.
 
.. thumbnail:: /images/kibana-app/features/settings/dark-mode.png
   :align: center
   :width: 80%

Reporting
---------

Here, you can access the reports generated when clicked **Generate Report** in various modules.

.. thumbnail:: /images/kibana-app/features/settings/reporting.png
   :align: center
   :width: 80%

Server APIs
-----------

In this section, you can see information from all the wazuh servers configured in `/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`. This information includes id, cluster mode, hostname, version, run as mode, as well as connection information such as server host, API port and API connection status. It can also show if there are possible updates for that server. 

.. thumbnail:: /images/kibana-app/features/settings/api.png
   :align: center
   :width: 80%

App Settings
-------------

Configuration
^^^^^^^^^^^^^

The Wazuh dashboard configuration file is located at ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml``. You can take a look at the configuration parameters here under **Configuration**.

.. thumbnail:: /images/kibana-app/features/settings/configuration.png
   :align: center
   :width: 80%


Miscellaneous
^^^^^^^^^^^^^

You can manually run the Wazuh dashboard health check from this section. This health check assesses the operational status and performance of the Wazuh dashboard.

.. thumbnail:: /images/kibana-app/features/settings/miscellaneous.png
   :align: center
   :width: 80%

App Logs
--------

The Wazuh dashboard stores log information in the ``/usr/share/wazuh-dashboard/data/wazuh/logs/wazuhapp.log`` file. These logs help with troubleshooting.

.. thumbnail:: /images/kibana-app/features/settings/logs.png
   :align: center
   :width: 80%

About
-----

This section provides information about your currently installed Wazuh dashboard package, including:

- Version
- Revision
- Installation date

To discover new features in each release, check the `Wazuh dashboard changelog file <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v|WAZUH_CURRENT|-2.8.0/CHANGELOG.md>`__.

.. thumbnail:: /images/kibana-app/features/settings/about.png
   :align: center
   :width: 80%
