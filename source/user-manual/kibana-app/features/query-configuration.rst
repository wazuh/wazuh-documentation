.. Copyright (C) 2022 Wazuh, Inc.

.. _kibana_query_configuration:

Query configuration
===================

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
