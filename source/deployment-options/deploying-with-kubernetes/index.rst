.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we show the process of installing, upgrading, and uninstalling Wazuh on Kubernetes.

Deployment on Kubernetes
========================

In this section, we show the process of installing, upgrading, and uninstalling Wazuh on Kubernetes.

`Kubernetes <https://kubernetes.io/>`__ is an open source container orchestration engine. Containers are microservices packaged with their dependencies and configurations. Kubernetes is meant to run across a cluster, automating deployment, scaling, and management of containerized applications. It simplifies the operation of applications that span multiple containers deployed across multiple servers. For easy management and discovery, containers are grouped into pods, the basic operational unit for Kubernetes. Kubernetes pods are distributed among nodes to provide high availability. Kubernetes helps with networking, load balancing, security, and scaling across all Kubernetes nodes running your containers.

In this section of the documentation, we show how to clone the `Wazuh Kubernetes repository <https://github.com/wazuh/wazuh-kubernetes>`__, and set up SSL certificates. We also show how to apply the manifests and deploy the necessary pods and services for installing Wazuh on Kubernetes in the cloud and local environments. The other subsection in this documentation covers :doc:`Kubernetes configuration <kubernetes-conf>`, how to :doc:`Upgrade Wazuh installed in Kubernetes <kubernetes-upgrade>`, and how to :doc:`Clean Up <kubernetes-clean-up>` both clusters and volumes.

.. toctree::
   :maxdepth: 1
   :hidden:

   kubernetes-conf
   kubernetes-deployment
   kubernetes-upgrade
   kubernetes-clean-up