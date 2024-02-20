.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This documentation provides a guide on upscaling your Wazuh infrastructure to add new Wazuh indexer and Wazuh server nodes.
  
Upscaling a Wazuh deployment
============================

This documentation provides a guide on upscaling your Wazuh infrastructure to add new Wazuh indexer or Wazuh server nodes. Thus maximizing the potential of Wazuh to effectively monitor and protect your growing IT infrastructure.

The Wazuh platform is composed of a universal :doc:`Wazuh agent </getting-started/components/wazuh-agent>` and three central components; the :doc:`Wazuh server </getting-started/components/wazuh-server>`, the :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>`, and the :doc:`Wazuh dashboard </getting-started/components/wazuh-dashboard>`.  The Wazuh agent is deployed on the endpoints you want to monitor. The central components can be deployed in two ways; as a single unit on one server (all-in-one deployment) using our :ref:`quickstart install script <quickstart_installing_wazuh>`, or as separate entities (distributed deployment) by following our step-by-step guide (applicable to Wazuh :doc:`indexer </installation-guide/wazuh-indexer/step-by-step>`, :doc:`server </installation-guide/wazuh-server/step-by-step>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/step-by-step>`) or using the install assistant (for Wazuh :doc:`indexer </installation-guide/wazuh-indexer/installation-assistant>`, :doc:`server </installation-guide/wazuh-indexer/installation-assistant>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/installation-assistant>`). Hence, the scaling strategy for your infrastructure depends on the deployment method you initially performed.

This guide covers the following:

.. toctree::
   :maxdepth: 1

   adding-indexer-node
   adding-server-node