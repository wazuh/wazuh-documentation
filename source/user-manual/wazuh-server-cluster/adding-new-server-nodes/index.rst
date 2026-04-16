.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upscale your Wazuh server cluster horizontally by adding new nodes in this section of the documentation.

Adding new Wazuh server nodes
=============================

You can upscale your Wazuh server cluster horizontally by adding new Wazuh server nodes. This allows for better handling of a larger number of Wazuh agents. Configuring :doc:`failover mode or using a load balancer to direct Wazuh agents </user-manual/wazuh-server-cluster/agent-connections>` to the Wazuh server cluster provides redundancy in case of node failures. It also improves the scalability, availability, and resilience of your security monitoring infrastructure.

The upscaling process involves creating the certificates required for installation, followed by configuring existing components to establish connections to the new Wazuh server node(s). Then, install and configure the new Wazuh server node(s), and finally test the cluster to ensure the new nodes have joined.

The steps for scaling the Wazuh server are divided into two subsections: all-in-one and distributed deployments. The appropriate method depends on your existing deployment model and the target infrastructure for scaling.

-  :ref:`All-in-one deployment <all-in-one-deployment>`:

   Follow the steps outlined in the "All-in-one deployment" subsection to scale up your Wazuh server.

-  :ref:`Distributed deployment <distributed-deployment>`:

   Follow the steps outlined in the "Distributed deployment" subsections to scale up your server.

If you are unsure which method aligns with your infrastructure, we recommend reviewing your deployment architecture before proceeding.

.. note::

   You need root user privileges to execute the commands below.

.. toctree::
   :titlesonly:
   :hidden:

   all-in-one-deployment
   distributed-deployment
