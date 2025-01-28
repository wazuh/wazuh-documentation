.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh cluster setup allows for horizontal scalability and enhances the performance of the Wazuh servers. Learn more in this section of the documentation.

Architecture overview
=====================

The following diagram shows a typical Wazuh server cluster architecture:

.. thumbnail:: /images/manual/wazuh-server/typical-server-cluster-architecture.png
   :title: Typical Wazuh server cluster architecture
   :alt: Typical Wazuh server cluster architecture
   :align: center
   :width: 80%

In this architecture, there are multiple Wazuh server nodes within the cluster. The Wazuh server cluster consists of a master node and worker nodes. The Wazuh agents are configured to report to the server nodes in the cluster. This setup allows for horizontal scalability and enhances the performance of the Wazuh servers.


