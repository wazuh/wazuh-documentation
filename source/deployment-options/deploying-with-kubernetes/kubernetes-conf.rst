.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section outlines Wazuh components within a Kubernetes cluster, including the Wazuh manager, Wazuh indexer, and Wazuh dashboard, and their resource requirements.

Wazuh Kubernetes requirements and architecture
==============================================

This section outlines Wazuh components within a Kubernetes cluster, including the Wazuh manager, Wazuh indexer, and Wazuh dashboard. It describes the resource requirements, storage setup, and controller types used for each component.

Prerequisites
-------------

Before you begin to deploy Wazuh, ensure that the following prerequisites are met:

Kubernetes cluster
^^^^^^^^^^^^^^^^^^

-  A running Kubernetes cluster with ``kubectl`` configured to access the cluster, Kustomize support for applying manifests (included in ``kubectl`` version 1.21 and later), and the ``git``, ``curl``, and ``openssl`` utilities installed.
-  A container network interface (CNI) plugin that enforces Kubernetes network policies. On Amazon EKS, enable network policy support in the Amazon VPC CNI add-on before deploying.

.. note::

   When using Minikube, start the Kubernetes cluster with Calico CNI enabled by running the command below.

   .. code-block:: console

      $ minikube start --cpus=4 --memory=6144 --cni=calico

   To install ``kubectl`` and Minikube, see `Install and set up kubectl on Linux <https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/>`__ and `minikube start <https://minikube.sigs.k8s.io/docs/start/>`__. Minikube also needs a driver, such as Docker. To install Docker, see `Install Docker Engine <https://docs.docker.com/engine/install/>`__ and `Manage Docker as a non-root user <https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user>`__.

Storage class
^^^^^^^^^^^^^

Amazon EKS
~~~~~~~~~~

Amazon EBS CSI driver with appropriate IAM role configuration for Amazon EKS deployments using Kubernetes version 1.23 and later. For detailed instructions, see the AWS documentation on `Creating the Amazon EBS CSI driver IAM role <https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#csi-iam-role>`__.

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
-  2.5 Gi of storage for volumes (12 GB of disk for the container images)

Overview
--------

StatefulSet and Deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager and the Wazuh indexer keep state and run as StatefulSets. Each of their pods keeps its identity and its persistent volume across restarts.

:ref:`Traefik <kubernetes-apply-traefik>` and the Wazuh dashboard run as Deployments. The Wazuh dashboard has one replica and keeps its configuration directory and keystore on the ``wazuh-dashboard-config`` persistent volume claim.

Persistent volumes store the data of the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard.

For more information, see the `Kubernetes persistent volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__ documentation.

Pods
^^^^

Each Wazuh component runs in a container inside a pod. The Wazuh Docker images are built from the ``wazuh-docker`` `repository <https://github.com/wazuh/wazuh-docker>`__.

Wazuh master
~~~~~~~~~~~~

The master pod contains the master node of the Wazuh manager cluster. Management operations occur only on this node, so the Wazuh manager API runs here. Wazuh 5.x agents enroll on port ``1517`` through any Wazuh manager node.

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
| wazuh-cluster      | Headless service for internal communication between Wazuh manager nodes on port ``1516``.                                                            |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+

Network policies
^^^^^^^^^^^^^^^^

Wazuh uses Kubernetes network policies to control communication between components and to restrict unauthorized traffic. Each policy defines specific allowed connections, while all other traffic is blocked by default.

The following network policies are included:

-  ``allow-dns``: Allows all pods in the ``wazuh`` namespace to send DNS queries (UDP and TCP port ``53``) to the cluster DNS service (``kube-dns`` in ``kube-system``) so that they can resolve service names.
-  ``allow-ingress-to-dashboard`` (EKS only): Permits incoming traffic from the ingress controller to port ``443`` of the Wazuh dashboard.
-  ``allow-ingress-to-manager-master`` (EKS only): Allows incoming traffic from the ingress controller to ports ``1517`` and ``1515`` of Wazuh manager (master).
-  ``allow-ingress-to-manager-worker`` (EKS only): Allows incoming traffic from the ingress controller to ports ``1517`` and ``1514`` of Wazuh manager (worker).
-  ``dashboard-egress``: Allows outgoing traffic from Wazuh dashboard pods to port ``9200`` of the Wazuh indexer and port ``55000`` of the Wazuh manager master.
-  ``default-deny-all``: Blocks all incoming and outgoing traffic that is not explicitly allowed by another network policy.
-  ``indexer-egress``: Allows outgoing traffic from Wazuh indexer pods to ports ``9200`` and ``9300`` of other indexer nodes for cluster communication.
-  ``indexer-ingress``: Allows incoming traffic to Wazuh indexer pods from the dashboard (port ``9200``), manager (port ``9200``), and other indexer nodes (port ``9300``).
-  ``manager-egress-external``: Allows outgoing HTTPS traffic (TCP port ``443``) from Wazuh manager pods to any address. This is required for downloading CTI updates and other external resources.
-  ``manager-egress``: Allows outgoing traffic from Wazuh manager pods to the Wazuh indexer on port ``9200``.
-  ``wazuh-api-ingress``: Allows incoming traffic to the Wazuh manager master from the Wazuh dashboard on port ``55000`` (Wazuh manager API) and from other Wazuh manager pods on port ``1516`` (Wazuh cluster communication).
-  ``wazuh-worker-egress``: Allows outgoing traffic from Wazuh manager worker pods to manager ports ``1516`` and ``55000`` for cluster coordination.
