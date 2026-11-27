.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we provide an overview of the Wazuh Kubernetes architecture and how to deploy Wazuh central components and agents on Kubernetes.

Deployment on Kubernetes
========================

`Kubernetes <https://kubernetes.io/>`__ is an open source container orchestration engine.

This section describes the :doc:`Wazuh Kubernetes architecture <kubernetes-conf>` and how to :doc:`deploy Wazuh central components on Amazon EKS and local Kubernetes clusters <kubernetes-deployment>`. It also covers :ref:`enrolling and deploying a Wazuh agent on Kubernetes <kubernetes-deploying-wazuh-agent>` and how to :doc:`clean up <kubernetes-clean-up>` both clusters and volumes.

To transition a Wazuh 4.x deployment on Kubernetes to Wazuh 5.x, see :ref:`Kubernetes deployments <migration_kubernetes_deployments>` in the Transitioning from 4.x to 5.x documentation.

.. toctree::
   :maxdepth: 1
   :hidden:

   kubernetes-conf
   kubernetes-deployment
   kubernetes-clean-up
