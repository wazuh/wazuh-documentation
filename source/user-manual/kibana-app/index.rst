.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_app:

Kibana app
==========

.. meta::
  :description: Find information about the Wazuh Kibana app, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh app for Kibana lets you visualize and analyze Wazuh alerts stored in Elasticsearch. You can obtain statistics per agent, search alerts and filter using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

.. note:: Read our `Searching for alerts using the Wazuh app for Kibana <https://wazuh.com/blog/searching-for-alerts-using-the-wazuh-app-for-kibana//>`_ document for more information.

To install the app, you can follow our :ref:`Elastic Stack installation guides <installation_elastic>`.

This manual describes the configuration process to get it started and the different app features that you can use. In addition to this, you can find a troubleshooting and reference guide for quick access to some key solutions and configuration options.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        connect-kibana-app
        features/index
        troubleshooting
        reference/index
