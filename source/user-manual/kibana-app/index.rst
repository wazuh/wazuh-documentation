.. Copyright (C) 2020 Wazuh, Inc.

.. _kibana_app:

Wazuh Kibana plugin
===================

.. meta::
  :description: Find information about the Wazuh Kibana app, its different features, configuration reference and how to troubleshoot some of the most common problems.

The Wazuh Kibana plugin allows the user to visualize and analyze Wazuh alerts stored in Elasticsearch and provides control over the Wazuh environment conveniently. It integrates with the Wazuh API to retrieve information about the Wazuh managers and the Wazuh agents configuration, logs, ruleset, groups, and more. The collected security events can be presented as PDF reports.

The installation process of the Wazuh Kibana plugin is described in the Elastic Stack installation section for :ref:`RPM <install_kibana_app_rpm>` and :ref:`Debian <install_kibana_app_deb>` systems.
It is available in Kibana under the Wazuh logo icon situated on the left side menu.

.. thumbnail:: ../../images/kibana-app/kibana-plugin-main/wazuh-kibana-plugin-main.png
  :align: center
  :width: 100%

The Wazuh Kibana plugin top menu offers access to the following sections:

#. :ref:`Overview <kibana_overview>`: monitor the Wazuh alerts presented in security information management, threat detection and response, auditing and policy monitoring, and regulatory compliance subsectons. 

#. :ref:`Management <kibana_management>`: access the Wazuh administration tools, status information and reports.

#. :ref:`Agents <kibana_agents>`: monitor the overall status of the Wazuh agents and access the detailed information regarding each Wazuh agent.

#. :ref:`Dev tools <kibana_dev_tools>`: access the Wazuh console, an user interface to interact with the Wazuh API.

#. :ref:`Settings <kibana_settings>`: configure and obtain the information about the Wazuh Kibana plugin. This section is accessible through the gear icon, located on the right side of the top menu.

.. toctree::
    :hidden:
    :maxdepth: 1

    overview
    management
    agents
    dev_tools
    settings
    troubleshooting
    reference/index
    features/index
