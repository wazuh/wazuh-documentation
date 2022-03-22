.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description:  The Wazuh Kibana plugin allows users to view and analyze Wazuh alerts stored in Elasticsearch. Learn more about it in this section.
  
.. _kibana_app:

Wazuh Kibana plugin
===================

The Wazuh Kibana plugin allows users to view and analyze Wazuh alerts stored in Elasticsearch. Users are able to get statistics per agent, search for alerts and filter them using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

.. note:: Read our `Searching for alerts using the Wazuh Kibana plugin <https://wazuh.com/blog/searching-for-alerts-using-the-wazuh-app-for-kibana//>`_ document for more information.

To install the plugin, you can follow our :ref:`Elastic Stack installation guides <wazuh_dashboard_step_by_step>`.

This manual describes the configuration process to start this plugin and the different features of the plugins that can be used. Additionally, a reference and troubleshooting guide is provided for quick access to some key solutions and configuration options.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        features/index
        RBAC - create and map users <wazuh-rbac>
        troubleshooting
        reference/index
        
