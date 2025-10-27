.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section outlines how to configure Wazuh components within a Kubernetes cluster, including the manager, indexer, and dashboard.

Kubernetes configuration
========================

This section outlines how to configure Wazuh components within a Kubernetes cluster, including the manager, indexer, and dashboard. It describes the resource requirements, storage setup, and controller types used for each component.

Pre-requisites
--------------

Before you begin, ensure that the following requirements are met:

-  A running Kubernetes cluster.
-  An Amazon EBS CSI driver IAM role for Amazon EKS deployments using Kubernetes version 1.23 and later. The CSI driver requires that you assign an IAM role to work properly. For detailed instructions, refer to AWS documentation on `Creating the Amazon EBS CSI driver IAM role <https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html>`__. You need to install the CSI driver for both new and old deployments. The CSI driver is an essential Kubernetes feature.

Resource Requirement
--------------------

Your cluster must have at least the following resources available:

-  2 CPU units
-  3 Gi of memory
-  2 Gi of storage

Overview
--------

StatefulSet and Deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A StatefulSet manages pods based on identical container specifications. Unlike Deployments, StatefulSets maintain a persistent identity for each pod. Pods are created from the same specification, but are not interchangeable. Each pod retains a persistent identifier that survives rescheduling.

StatefulSets are useful for stateful applications like databases that save data to persistent storage. Wazuh manager and Wazuh indexer components maintain their states, so we use StatefulSets to ensure state persistence across Pod restarts.

Deployments are intended for stateless applications and are lightweight. The Wazuh dashboard doesn't need to maintain state, so it is deployed using a Deployment controller.

Persistent volumes (PV) are storage resources in the cluster. They have a lifecycle independent of any individual pod that uses them. This API object captures storage implementation details for NFS, iSCSI, or cloud-provider-specific storage systems.

We use persistent volumes to store data from both the Wazuh manager and the Wazuh indexer.

For more information, see the `Kubernetes persistent volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__ documentation.

Pods
^^^^

A Pod is the smallest and most fundamental deployable unit in Kubernetes. It represents a single instance of a running process in your cluster. You can view how we build Wazuh Docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`__.

**Wazuh master**

This pod contains the master node of the Wazuh cluster. The master node centralizes and coordinates worker nodes, making sure the critical and required data is consistent across all nodes. The management is performed only in this node, so the agent enrollment service (authd) is placed here.

+-------------------------------+-------------+
| Image                         | Controller  |
+===============================+=============+
| wazuh/wazuh-manager           | StatefulSet |
+-------------------------------+-------------+

**Wazuh worker 0 / 1**

These pods contain a worker node of the Wazuh cluster. They will receive the agent events.

+-------------------------------+-------------+
| Image                         | Controller  |
+===============================+=============+
| wazuh/wazuh-manager           | StatefulSet |
+-------------------------------+-------------+

**Wazuh indexer**

The Wazuh indexer pod ingests events received from Filebeat.

+--------------------------------------------+-------------+
| Image                                      | Controller  |
+============================================+=============+
| wazuh/wazuh-indexer                        | StatefulSet |
+--------------------------------------------+-------------+

**Wazuh dashboard**

The Wazuh dashboard pod lets you visualize your Wazuh indexer data, along with Wazuh agents information and server configuration.

+--------------------------------------+-------------+
| Image                                | Controller  |
+======================================+=============+
| wazuh/wazuh-dashboard                | Deployment  |
+--------------------------------------+-------------+

Services
^^^^^^^^

**Wazuh indexer and dashboard**

+----------------------+-------------------------------------------------------------------------------------+
| Name                 | Description                                                                         |
+======================+=====================================================================================+
| wazuh-indexer        | Communication for Wazuh indexer nodes.                                              |
+----------------------+-------------------------------------------------------------------------------------+
| indexer              | This is the Wazuh indexer API used by the Wazuh dashboard to read/write alerts.     |
+----------------------+-------------------------------------------------------------------------------------+
| dashboard            | Wazuh dashboard service. \https://wazuh.your-domain.com:443                         |
+----------------------+-------------------------------------------------------------------------------------+

**Wazuh**

+----------------------+-------------------------------------------------------------------------+
| Name                 | Description                                                             |
+======================+=========================================================================+
| wazuh                | Wazuh API: wazuh-master.your-domain.com:55000                           |
|                      +-------------------------------------------------------------------------+
|                      | Agent registration service (authd): wazuh-master.your-domain.com:1515   |
+----------------------+-------------------------------------------------------------------------+
| wazuh-workers        | Reporting service: wazuh-manager.your-domain.com:1514                   |
+----------------------+-------------------------------------------------------------------------+
| wazuh-cluster        | Communication for Wazuh manager nodes.                                  |
+----------------------+-------------------------------------------------------------------------+

