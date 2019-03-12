.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_app:

Kibana app
==========

.. meta::
  :description: Find information about the Wazuh Kibana app, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh app for Kibana lets you visualize and analyze Wazuh alerts stored in Elasticsearch. You can obtain statistics per agent, search alerts and filter using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

To install the app, you can follow our Elastic Stack installation guides (for :ref:`RPM <install_kibana_app_rpm>` or :ref:`Debian <install_kibana_app_deb>` systems).

This manual describes the configuration process to get it started and the different app features that you can use. In addition to this, you can find a troubleshooting and reference guide for quick access to some key solutions and configuration options.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        connect-kibana-app
        configure-xpack/index
        features/index
        troubleshooting
        reference/index
