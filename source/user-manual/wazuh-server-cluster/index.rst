.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server cluster is made up of multiple Wazuh server nodes in a distributed environment. Learn more in this section of the documentation.

Wazuh server cluster
====================

The Wazuh server cluster is made up of multiple Wazuh server nodes in a distributed environment. This deployment strategy helps to provide horizontal scalability and improved performance. In an environment with many endpoints to monitor, you can combine this deployment strategy with a :ref:`network load balancer <connecting_with_load_balancer>` to distribute the Wazuh agent connection load effectively across multiple nodes. This approach enables the Wazuh server to manage a large number of Wazuh agents more efficiently and ensure high availability.

.. topic:: Content

   .. toctree::
      :titlesonly:

      architecture-overview
      types-of-nodes
      how-server-cluster-works
      cluster-nodes-configuration
      data-synchronization
      certificates-deployment
      adding-new-server-nodes