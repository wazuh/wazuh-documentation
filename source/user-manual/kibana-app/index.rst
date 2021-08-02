.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_app:

Wazuh Kibana plugin
===================

.. meta::
  :description: Find information about the Wazuh Kibana plugin, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh Kibana plugin is a free and open user interface that allows users to view and analyze Wazuh alerts stored in Elasticsearch. Users are able to navigate around of all Wazuh capabilities using different filters and visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

.. thumbnail:: ../../../images/kibana-app/security_events_dashboard.png
  :align: center
  :width: 100%

.. note:: To install the plugin, you can follow our :ref:`Elastic Stack installation guides <kibana>`.

This manual describes the different features of the plugins that can be used and how to implement the most common use cases. Additionally, a reference and troubleshooting guide is provided for quick access to some key solutions and configuration options.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        features/index
        common-use-cases/index
        troubleshooting
        reference/index
