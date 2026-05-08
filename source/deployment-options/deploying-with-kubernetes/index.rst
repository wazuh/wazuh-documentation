.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we provide an overview of the Wazuh Kubernetes architecture and how to deploy Wazuh central components and agents on Kubernetes.

Deployment on Kubernetes
========================

`Kubernetes <https://kubernetes.io/>`__ is an open source container orchestration engine. Containers are microservices packaged with their dependencies and configurations. Kubernetes runs across a cluster, automating deployment, scaling, and managing containerized applications. It simplifies the management of applications composed of multiple containers running across different servers by automating deployment, scaling, networking, and recovery. For easy management and discovery, containers are grouped into pods, the basic operational unit for Kubernetes. Kubernetes pods are distributed among nodes to provide high availability. Kubernetes helps with networking, load balancing, security, and scaling across all Kubernetes nodes running your containers.

In this section, we provide an overview of the :doc:`Wazuh Kubernetes architecture <kubernetes-conf>`. It also describes how to :doc:`deploy Wazuh central components <kubernetes-deployment>` on Amazon EKS and local Kubernetes clusters. We also include steps for enrolling and deploying a Wazuh agent on Kubernetes. Other subsections in this documentation cover :doc:`changing the password of Wazuh users <kubernetes-password>` and how to :doc:`clean up <kubernetes-clean-up>` both clusters and volumes.

.. toctree::
   :maxdepth: 1
   :hidden:

   kubernetes-conf
   kubernetes-deployment
   kubernetes-password
   kubernetes-clean-up