.. Copyright (C) 2020 Wazuh, Inc.

.. _kibana_app:

Wazuh Kibana plugin
===================

.. meta::
  :description: Find information about the Wazuh Kibana plugin, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh Kibana plugin lets you visualize and analyze Wazuh alerts stored in Elasticsearch. You can obtain statistics per agent, search alerts and, filter using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

.. note:: Read our `Searching for alerts using the Wazuh Kibana plugin <https://wazuh.com/blog/searching-for-alerts-using-the-wazuh-app-for-kibana//>`_ document for more information.

To install the plugin, you can follow our :ref:`Elastic Stack installation guides <kibana>`.

This manual describes the configuration process to get it started and the different plugin features that you can use. In addition to this, you can find a troubleshooting and reference guide for quick access to some key solutions and configuration options.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        connect-kibana-app
        features/index
        troubleshooting
        reference/index
