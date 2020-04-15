.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_app:

Wazuh Kibana plugin
===================

.. meta::
  :description: Find information about the Wazuh Kibana app, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh Kibana plugin lets the user visualize and analyze Wazuh alerts stored in Elasticsearch and provides control over the Wazuh environment in a convenient way. It integrates with the Wazuh API to retrieve information about the Wazuh manager and the Wazuh agents configuration, logs, ruleset, groups and more. The plugin allows also to present collected data in the form of the PDF reports.

The installation process of the Wazuh Kibana plugin is described in the Elastic Stack installation section for :ref:`RPM <install_kibana_app_rpm>` and :ref:`Debian <install_kibana_app_deb>` systems.
It will be available in Kibana under the Wazuh logo icon situated on the left side menu:

.. thumbnail:: ../../images/kibana-app/kibana-plugin-main/wazuh-kibana-plugin-icon.png
  :align: center
  :width: 100%

This option will take the user to the main Wazuh Kibana plugin section called Overview:

.. thumbnail:: ../../images/kibana-app/kibana-plugin-main/wazuh-kibana-plugin-main.png
  :align: center
  :width: 100%


.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        features/index
        troubleshooting
        reference/index
