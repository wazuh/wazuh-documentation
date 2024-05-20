.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The actual configuration of an agent or the manager can be queried on demand. Learn more about it in this section of the Wazuh documentation.

.. _kibana_query_configuration:

Querying the agent configuration
================================

You can query the configuration of an agent by going to **Endpoints summary**, selecting an agent and clicking on **Configuration**. To query the configuration of the manager, go to **Server management** > **Settings**. From here you can fetch the active configuration in real time.

.. thumbnail:: /images/kibana-app/features/query-configuration/configuration-section.png
  :title: Query the manager configuration in Wazuh dashboard
  :alt: Query the manager configuration in Wazuh dashboard
  :align: center
  :width: 100%

The image below shows that the agent configuration is synchronized:

.. thumbnail:: /images/kibana-app/features/query-configuration/configuration-synchronized.png
  :title: Configuration is synchronized
  :alt: Configuration is synchronized
  :align: center

By clicking on the *Log collection* configuration, the active configuration is shown:

.. thumbnail:: /images/kibana-app/features/query-configuration/logcollector-query.png
  :title: Log collection configuration
  :alt: Log collection configuration
  :align: center
  :width: 100%


Now for example, if you want to know the current cluster configuration from one of your *Wazuh managers*, click on the upper-left menu icon **☰** to open the options, go to **Server management** > **Settings** module, select the desired node and then click on the **Cluster** section:

.. thumbnail:: /images/kibana-app/features/query-configuration/cluster.png
  :title: Cluster node configuration
  :alt: Cluster node configuration
  :align: center
  :width: 100%
