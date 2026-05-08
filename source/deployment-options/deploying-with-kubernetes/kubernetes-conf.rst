.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section outlines Wazuh components within a Kubernetes cluster, including the manager, indexer, and dashboard.

Wazuh Kubernetes architecture
=============================

This section outlines Wazuh components within a Kubernetes cluster, including the manager, indexer, and dashboard. It describes the resource requirements, storage setup, and controller types used for each component.

Prerequisites
-------------

Before you begin to deploy Wazuh, ensure that the following prerequisites are met:

Kubernetes cluster
^^^^^^^^^^^^^^^^^^

-  A running Kubernetes cluster with kubectl configured for communication, and kustomize support for applying manifests (included in kubectl version 1.14 and above).

.. note::

   When using Minikube, start the Kubernetes cluster with Calico CNI enabled by running the command below.

   .. code-block:: console

      $ minikube start --network-plugin=cni --cni=calico

Storage class
^^^^^^^^^^^^^

Amazon EKS
~~~~~~~~~~

Amazon EBS CSI driver with appropriate IAM role configuration for Amazon EKS deployments using Kubernetes version 1.23 and later. The CSI driver requires that you assign an IAM role to work properly. For detailed instructions, refer to AWS documentation on `Creating the Amazon EBS CSI driver IAM role <https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html>`__.

Local cluster
~~~~~~~~~~~~~

Local storage provisioners such as ``microk8s.io/hostpath`` and ``k8s.io/minikube-hostpath``.

.. note::

   Other managed Kubernetes services, such as Google GKE, Azure AKS, and similar platforms, should work with appropriate storage class configurations. The storage class must support dynamic volume provisioning and provide low-latency storage, especially for the Wazuh indexer component. For example, use GCE Persistent Disk for GKE and Azure Disk for AKS through their respective CSI drivers.

Resource Requirement
--------------------

The minimum cluster resource required for deploying the Wazuh central components are listed below:

Amazon EKS
^^^^^^^^^^

-  4 CPU units
-  5.5 Gi of memory

Local cluster
^^^^^^^^^^^^^

-  2 CPU units
-  3 Gi of memory
-  2 Gi of storage

Overview
--------

StatefulSet and Deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A StatefulSet manages pods based on identical container specifications. Unlike Deployments, StatefulSets maintain a persistent identity for each pod. Pods are created from the same specification, but are not interchangeable. Each pod retains a persistent identifier that survives rescheduling.

StatefulSets are useful for stateful applications, such as databases that persist data. The Wazuh manager and Wazuh indexer components maintain their states, so we use StatefulSets to ensure state persistence across pod restarts.

Deployments are intended for stateless applications and are lightweight. The Wazuh dashboard and Traefik do not need to maintain state, so they are deployed using a Deployment controller.

Persistent volumes (PV) are storage resources in the cluster. They have a lifecycle independent of any individual pod that uses them. This API object captures storage implementation details for NFS, iSCSI, or cloud-provider-specific storage systems.

We use persistent volumes to store data from both the Wazuh manager and the Wazuh indexer.

For more information, see the `Kubernetes persistent volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__ documentation.

Pods
^^^^

A pod is the smallest and most fundamental deployable unit in Kubernetes. It represents a single instance of a running process in your cluster. In our deployment, each Wazuh component runs inside a container image, and these containers are deployed within pods. You can view how we build Wazuh Docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`__.

Wazuh master
~~~~~~~~~~~~

The master pod contains the master node of the Wazuh manager cluster. The master node centralizes and coordinates worker nodes. It ensures critical data remains consistent across the Wazuh manager cluster. Management operations occur only on this node, so the Wazuh agent enrollment service (``authd``) runs here.

+---------------------+-------------+
| Image               | Controller  |
+=====================+=============+
| wazuh/wazuh-manager | StatefulSet |
+---------------------+-------------+

Wazuh worker
~~~~~~~~~~~~

The Wazuh worker pods contain the worker nodes of the Wazuh manager cluster. They receive Wazuh agent events.

+---------------------+-------------+
| Image               | Controller  |
+=====================+=============+
| wazuh/wazuh-manager | StatefulSet |
+---------------------+-------------+

Wazuh indexer
~~~~~~~~~~~~~

The Wazuh indexer pod is used to create the Wazuh indexer cluster.

+---------------------+-------------+
| Image               | Controller  |
+=====================+=============+
| wazuh/wazuh-indexer | StatefulSet |
+---------------------+-------------+

Wazuh dashboard
~~~~~~~~~~~~~~~

The Wazuh dashboard pod provides visualization of Wazuh indexer data, Wazuh agent information, and Wazuh manager configuration.

+-----------------------+------------+
| Image                 | Controller |
+=======================+============+
| wazuh/wazuh-dashboard | Deployment |
+-----------------------+------------+

Services
^^^^^^^^

Wazuh indexer and dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~

+---------------+-------------------------------------------------------------------------------------------------------+
| Name          | Description                                                                                           |
+===============+=======================================================================================================+
| wazuh-indexer | -  Communication for Wazuh indexer nodes.                                                             |
|               | -  Exposes ports 9200 (REST API) and 9300 (cluster transport) inside the Kubernetes cluster.          |
+---------------+-------------------------------------------------------------------------------------------------------+
| dashboard     | -  Wazuh dashboard service running at: ``https://<WAZUH_DASHBOARD_IP>:443``                           |
|               | -  Exposed externally through the Traefik ingress controller (wazuh-ingress) at the configured FQDN.  |
+---------------+-------------------------------------------------------------------------------------------------------+

Wazuh manager
~~~~~~~~~~~~~

+--------------------+-------------------------------------------------------------------------------------------+
| Name               | Description                                                                               |
+====================+===========================================================================================+
| wazuh-api          | Internal service for the Wazuh manager API ``<YOUR_DOMAIN>.com:55000``                    |
+--------------------+-------------------------------------------------------------------------------------------+
| wazuh-registration | Wazuh agent registration service (``authd``): ``<YOUR_DOMAIN>.com:1515``                  |
+--------------------+-------------------------------------------------------------------------------------------+
| wazuh-events       | Reporting service: ``wazuh-manager.<YOUR_DOMAIN>.com:1514``                               |
+--------------------+-------------------------------------------------------------------------------------------+
| wazuh-cluster      | Headless service for internal communication between Wazuh manager nodes on port ``1516``  |
+--------------------+-------------------------------------------------------------------------------------------+

Network policies
^^^^^^^^^^^^^^^^

Wazuh uses Kubernetes network policies to control communication between components and to restrict unauthorized traffic. Each policy defines specific allowed connections, while all other traffic is blocked by default.

The following network policies are included:

-  ``Allow-dns``: Allows DNS traffic within the Wazuh cluster so that pods can resolve service names.
-  ``Allow-ingress-to-dashboard``: Permits incoming traffic from the ingress controller to port ``443`` of the Wazuh dashboard.
-  ``Allow-ingress-to-manager-master``: Permits incoming traffic from the ingress controller to port ``1515`` of the Wazuh manager master node for agent enrollment.
-  ``Allow-ingress-to-manager-worker``: Permits incoming traffic from the ingress controller to port ``1514`` of the Wazuh manager worker nodes for agent event communication.
-  ``Dashboard-egress``: Allows outgoing traffic from Wazuh dashboard pods to port ``9200`` of the Wazuh indexer and port ``55000`` of the Wazuh manager master.
-  ``Default-deny-all``: Blocks all incoming and outgoing traffic that is not explicitly allowed by another network policy. This ensures a secure-by-default configuration.
-  ``Indexer-egress``: Allows outgoing traffic from Wazuh indexer pods to ports ``9200`` and ``9300`` of other indexer nodes for cluster communication.
-  ``Indexer-ingress``: Allows incoming traffic to Wazuh indexer pods from the dashboard (port ``9200``), manager (port ``9200``), and other indexer nodes (port ``9300``).
-  ``Manager-egress-external``: Allows outgoing traffic from Wazuh manager pods to the internet for CTI updates and external resources.
-  ``Manager-egress``: Allows outgoing traffic from Wazuh manager pods to the Wazuh indexer on port ``9200``.
-  ``Wazuh-api-ingress``: Allows incoming traffic from the Wazuh dashboard (port ``55000``) and other manager pods to port ``1516`` of the manager master for internal API communication.
-  ``Wazuh-worker-egress``: Allows outgoing traffic from Wazuh manager worker pods to manager ports ``1516`` and ``55000`` for cluster coordination.
