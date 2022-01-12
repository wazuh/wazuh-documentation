.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_monitoring_activity:

.. meta::
  :description: Discover the numerous ways that Wazuh provides to monitor your Microsoft Azure infrastructure activity.

Monitoring Azure platform and services
======================================


The `Azure Monitor Logs <https://docs.microsoft.com/en-us/azure/azure-monitor/logs/data-platform-logs>`_ collects and organizes logs and performance data from monitored resources, including Azure services, virtual machines and applications. This insight can be sent to Wazuh using the **Azure Log Analytics REST API** or directly accessing the contents of an **Azure Storage** account. 

This section explains the two ways to proceed, looking at the steps to follow in the Microsoft Azure portal and using the ``azure-logs`` module on the Wazuh manager. The Wazuh ``azure-logs`` module requires dependencies to work as well as the right credentials to access the logs. Take a look at the :ref:`Prerequisites <azure_prerequisites>` section before proceeding.


.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       log-analytics
       storage