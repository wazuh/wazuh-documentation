.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about Kubernetes configuration for Wazuh: prerequisites, overview, how to verify the deployment, and more. 

.. _kubernetes_conf:

Kubernetes configuration
========================   

Pre-requisites
--------------

-  A Kubernetes cluster already deployed.
-  For Amazon EKS deployments using Kubernetes version 1.23 and later, an Amazon EBS CSI driver IAM role. The CSI driver requires that you assign an IAM role to work properly. Read AWS documentation to find instructions on `Creating the Amazon EBS CSI driver IAM role <https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html>`__. You need to install the CSI driver for both, new and old deployments. The CSI driver is an essential Kubernetes feature.
   
Resource Requirement
--------------------

To deploy Wazuh on Kubernetes, the cluster should have at least the following resources available:

- 2 CPU units
- 3 Gi of memory
- 2 Gi of storage
   
   
Overview
--------

StatefulSet and deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As a *Deployment*, a *StatefulSet* manages Pods that are based on an identical container specification, but it maintains an identity attached to each of its pods. These pods are created from the same specification, but they are not interchangeable: each one has a persistent identifier maintained across any rescheduling.

It is useful for stateful applications like databases that save the data to persistent storage. The states of each Wazuh manager and each Wazuh indexer should be maintained, so we declare them using StatefulSet to ensure that they maintain their states in every startup.

Deployments are intended for stateless use and are quite lightweight, and seem to be appropriate for the Wazuh dashboard, where it is not necessary to maintain the states.

Persistent volumes (PV) are pieces of storage in the provisioned cluster. It is a resource in the cluster just like a node is a cluster resource. Persistent volumes are volume plugins like Volumes but have a lifecycle independent of any individual pod that uses the PV. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.

Here, we use persistent volumes to store data from both the Wazuh manager and the Wazuh indexer.

Refer to the `persistent volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`_ page for more information.

Pods
^^^^

You can check how we build our Wazuh docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`_.

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
| wazuh/wazuh-worker           | StatefulSet |
+-------------------------------+-------------+

**Wazuh indexer**

The Wazuh indexer pod ingests events received from Filebeat.

+--------------------------------------------+-------------+
| Image                                      | Controller  |
+============================================+=============+
| wazuh/wazuh-indexer                        | StatefulSet |
+--------------------------------------------+-------------+

**Wazuh dashboard**

The Wazuh dashboard pod lets you visualize your Wazuh indexer data, along with other features such as the Wazuh app.

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

