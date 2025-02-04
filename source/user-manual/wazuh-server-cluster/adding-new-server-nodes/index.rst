.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upscale your Wazuh server cluster horizontally by adding new nodes in this section of the documentation.

Adding new Wazuh server nodes
=============================

You can upscale your Wazuh server cluster horizontally by adding new nodes. This allows for better handling of a larger number of Wazuh agents. Configuring :doc:`failover mode or using a load balancer to point agents </user-manual/wazuh-server-cluster/agent-connections>` to the Wazuh server cluster can provide redundancy in case of node failures. It also improves the scalability and resilience of your security monitoring infrastructure.

The upscaling process involves creating certificates necessary for installation, followed by configuring existing components to establish connections with the new Wazuh server node(s). Then installing and configuring the new Wazuh server node(s), and finally testing the cluster to ensure the new nodes have joined.

We have organized the steps for upscaling the Wazuh server into two subsections: one for an all-in-one deployment and the other for a distributed deployment. Your choice between these methods depends on your existing deployment.

-  **All-in-one deployment**:

   An all-in-one deployment refers to using the :ref:`Wazuh installation assistant <quickstart_installing_wazuh>` or the pre-built virtual machine image in Open Virtual Appliance (OVA) format provided by Wazuh. This deployment method installs all the Wazuh central components on a single endpoint. If you have a Wazuh all-in-one setup, follow the steps outlined in the "All-in-one deployment" subsections to upscale your Wazuh server cluster.

-  **Distributed deployment**:

   The distributed deployment refers to when the Wazuh components are installed as separate entities following the step-by-step installation guide (applicable to the Wazuh :doc:`indexer </installation-guide/wazuh-indexer/step-by-step>`, :doc:`server </installation-guide/wazuh-server/step-by-step>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/step-by-step>`) or using the install assistant (for the Wazuh :doc:`indexer </installation-guide/wazuh-indexer/installation-assistant>`, :doc:`server </installation-guide/wazuh-server/installation-assistant>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/installation-assistant>`). For an existing distributed deployment, refer to the "Distributed deployment" subsections to upscale your Wazuh server.

Ensure you select the appropriate sub-section based on your existing deployment. If you are unsure which method aligns with your infrastructure, consider reviewing your deployment architecture before proceeding.

.. note::

   You need root user privileges to execute the commands in the next sub-sections.

.. toctree::
   :titlesonly:

   certificates-creation
   configuration-to-connect-with-new-node
   server-nodes-installation
   testing-the-cluster
