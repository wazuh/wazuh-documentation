.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_app:

Wazuh Kibana plugin
===================

.. meta::
  :description: Find information about the Wazuh Kibana plugin, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh Kibana plugin allows users to view and analyze Wazuh alerts stored in Elasticsearch. Users are able to get statistics per agent, search for alerts and filter them using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

.. note:: Read our `Searching for alerts using the Wazuh Kibana plugin <https://wazuh.com/blog/searching-for-alerts-using-the-wazuh-app-for-kibana//>`_ document for more information.

To install the plugin, you can follow our :ref:`Elastic Stack installation guides <wazuh_interface_step_by_step>`.

This manual describes the configuration process to start this plugin and the different features of the plugins that can be used. Additionally, a reference and troubleshooting guide is provided for quick access to some key solutions and configuration options.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        connect-kibana-app
        features/index
        troubleshooting
        reference/index
