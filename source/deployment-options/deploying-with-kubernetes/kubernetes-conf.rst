.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section outlines Wazuh components within a Kubernetes cluster, including the manager, indexer, and dashboard, and their resource requirements.

Wazuh Kubernetes requirements and architecture
==============================================

This section outlines Wazuh components within a Kubernetes cluster, including the manager, indexer, and dashboard. It describes the resource requirements, storage setup, and controller types used for each component.

Prerequisites
-------------

Before you begin to deploy Wazuh, ensure that the following prerequisites are met:

Kubernetes cluster
^^^^^^^^^^^^^^^^^^

-  A running Kubernetes cluster with ``kubectl`` configured for communication, Kustomize support for applying manifests (included in ``kubectl`` version 1.23 and later), and the ``git``, ``curl``, and ``openssl`` utilities installed.
-  A container network interface (CNI) plugin that enforces Kubernetes network policies. On Amazon EKS, enable network policy support in the Amazon VPC CNI add-on before deploying.

.. note::

   When using Minikube, start the Kubernetes cluster with Calico CNI enabled by running the command below.

   .. code-block:: console

      $ minikube start --cpus=4 --memory=6144 --cni=calico

Storage class
^^^^^^^^^^^^^

Amazon EKS
~~~~~~~~~~

Amazon EBS CSI driver with appropriate IAM role configuration for Amazon EKS deployments using Kubernetes version 1.23 and later. The CSI driver requires that you assign an IAM role to work properly. For detailed instructions, refer to AWS documentation on `Creating the Amazon EBS CSI driver IAM role <https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#csi-iam-role>`__.

Local cluster
~~~~~~~~~~~~~

Local storage provisioners such as ``microk8s.io/hostpath`` and ``k8s.io/minikube-hostpath``.

.. note::

   Other managed Kubernetes services, such as Google GKE and Azure AKS, need a storage class that supports dynamic volume provisioning and provides low-latency storage, especially for the Wazuh indexer. For example, use GCE Persistent Disk on GKE and Azure Disk on AKS, through their CSI drivers.

Resource requirements
---------------------

The minimum cluster resources required for deploying the Wazuh central components are listed below:

Amazon EKS
^^^^^^^^^^

-  5 CPU units
-  8 Gi of memory

Local cluster
^^^^^^^^^^^^^

-  4 CPU units
-  6 Gi of memory
-  2.5 Gi of storage for volumes, plus about 12 GB of disk for the container images

Overview
--------

StatefulSet and Deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A StatefulSet manages pods based on identical container specifications. Unlike Deployments, StatefulSets maintain a persistent identity for each pod. Pods are created from the same specification, but are not interchangeable. Each pod retains a persistent identifier that survives rescheduling.

StatefulSets are useful for stateful applications, such as databases that persist data. The Wazuh manager and Wazuh indexer components maintain their states, so we use StatefulSets to ensure state persistence across pod restarts.

Deployments are intended for stateless applications and are lightweight. Traefik doesn't need to maintain state, so it runs as a Deployment. The Wazuh dashboard also runs as a Deployment, with one replica. It keeps its configuration directory and keystore on the ``wazuh-dashboard-config`` persistent volume claim.

Persistent volumes (PV) are storage resources in the cluster. They have a lifecycle independent of any individual pod that uses them. This API object captures storage implementation details for NFS, iSCSI, or cloud-provider-specific storage systems.

We use persistent volumes to store data from the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard.

For more information, see the `Kubernetes persistent volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__ documentation.

Pods
^^^^

A pod is the smallest and most fundamental deployable unit in Kubernetes. It represents a single instance of a running process in your cluster. In our deployment, each Wazuh component runs inside a container image, and these containers are deployed within pods. You can view how we build Wazuh Docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`__.

Wazuh master
~~~~~~~~~~~~

The master pod contains the master node of the Wazuh manager cluster. The master node centralizes and coordinates worker nodes. It ensures critical data remains consistent across the Wazuh manager cluster. Management operations occur only on this node, so the Wazuh API runs here. The master node also serves the enrollment service (``authd``) that Wazuh 4.x agents use on port ``1515``. Wazuh 5.x agents enroll on port ``1517`` through any Wazuh manager node.

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

+---------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Name          | Description                                                                                                                                                      |
+===============+==================================================================================================================================================================+
| wazuh-indexer | -  Communication for Wazuh indexer nodes.                                                                                                                        |
|               | -  Exposes ports ``9200`` (REST API) and ``9300`` (cluster transport) inside the Kubernetes cluster.                                                             |
+---------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| dashboard     | -  Wazuh dashboard service on port ``443`` inside the Kubernetes cluster.                                                                                        |
|               | -  Exposed outside the cluster through the Traefik ingress controller (``wazuh-dashboard`` route) on Amazon EKS, and through port forwarding on a local cluster. |
+---------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Wazuh manager
~~~~~~~~~~~~~

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| Name               | Description                                                                                                                                          |
+====================+======================================================================================================================================================+
| wazuh-api          | Internal service for the Wazuh manager API on port ``55000``, served by the Wazuh manager master node.                                               |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh-registration | Wazuh 4.x agent enrollment service (``authd``) on port ``1515``, served by the Wazuh manager master node.                                            |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh-agents       | Wazuh agent connection and enrollment on port ``1517``, served by every Wazuh manager node. Wazuh 5.x agents use only this port.                     |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh-events       | Wazuh 4.x agent event traffic (legacy ``remoted``) on port ``1514``, served by the Wazuh manager worker nodes. Wazuh 5.x agents don't use this port. |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh-cluster      | Headless service for internal communication between Wazuh manager nodes on port ``1516``                                                             |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+

Network policies
^^^^^^^^^^^^^^^^

Wazuh uses Kubernetes network policies to control communication between components and to restrict unauthorized traffic. Each policy defines specific allowed connections, while all other traffic is blocked by default.

The following network policies are included:

-  ``allow-dns``: Allows all pods in the ``wazuh`` namespace to send DNS queries (UDP and TCP port ``53``) to the cluster DNS service (``kube-dns`` in ``kube-system``) so that they can resolve service names.
-  ``allow-ingress-to-dashboard`` (EKS only): Permits incoming traffic from the ingress controller to port ``443`` of the Wazuh dashboard.
-  ``allow-ingress-to-manager-master`` (EKS only): Allows incoming traffic from the ingress controller to ports ``1517`` and ``1515`` of Wazuh manager (master).
-  ``allow-ingress-to-manager-worker`` (EKS only): Allows incoming traffic from the ingress controller to ports ``1517`` and ``1514`` of Wazuh manager (worker) .
-  ``dashboard-egress``: Allows outgoing traffic from Wazuh dashboard pods to port ``9200`` of the Wazuh indexer and port ``55000`` of the Wazuh manager master.
-  ``default-deny-all``: Blocks all incoming and outgoing traffic that is not explicitly allowed by another network policy. This ensures a secure-by-default configuration.
-  ``indexer-egress``: Allows outgoing traffic from Wazuh indexer pods to ports ``9200`` and ``9300`` of other indexer nodes for cluster communication.
-  ``indexer-ingress``: Allows incoming traffic to Wazuh indexer pods from the dashboard (port ``9200``), manager (port ``9200``), and other indexer nodes (port ``9300``).
-  ``manager-egress-external``: Allows outgoing HTTPS traffic (TCP port ``443``) from Wazuh manager pods to any address. This is required for downloading CTI updates and other external resources.
-  ``manager-egress``: Allows outgoing traffic from Wazuh manager pods to the Wazuh indexer on port ``9200``.
-  ``wazuh-api-ingress``: Allows incoming traffic to the Wazuh manager master from the Wazuh dashboard on port ``55000`` (Wazuh API) and from other Wazuh manager pods on port ``1516`` (Wazuh cluster communication).
-  ``wazuh-worker-egress``: Allows outgoing traffic from Wazuh manager worker pods to manager ports ``1516`` and ``55000`` for cluster coordination.
