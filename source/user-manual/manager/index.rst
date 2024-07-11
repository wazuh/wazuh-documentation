.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh server is the Wazuh central component that analyzes data it receives from agents, external APIs, and network devices. Learn more in this section of the documentation.

Wazuh server
============

The Wazuh server is the Wazuh central component that analyzes data it receives from agents, external APIs, and network devices. It analyzes the received data by correlating and matching it against a predefined ruleset to generate alerts for security monitoring and management.

The Wazuh server comprises two main components; the :doc:`Wazuh manager <wazuh-manager>` and :ref:`Filebeat <indexer_integration_filebeat>`. The Wazuh manager is responsible for data analysis and alerting, while the indexer integration forwards the analyzed data to the Wazuh indexer. Refer to the :doc:`Wazuh server installation </installation-guide/wazuh-server/index>` documentation for information on how to install and set it up.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      wazuh-manager
      indexer-integration
      alert-management
      event-logging
      integration-with-external-apis
      wazuh-server-cluster
      wazuh-server-queue
