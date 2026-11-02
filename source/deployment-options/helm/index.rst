.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the process of installing and configuring the Wazuh deployment using Helm in this section of our documentation.

Deployment using Helm
======================

This section details the process of installing Wazuh using Helm. `Helm <https://helm.sh/>`_ is a package manager for Kubernetes that simplifies the deployment and management of applications within Kubernetes clusters. Helm charts package up all dependencies, configuration, and resource definitions necessary to run an application on Kubernetes.

Using Helm guarantees that the application deployment is consistent across different environments, whether in the cloud or on-premises.

You can install Wazuh using the Helm charts we have created, such as ``wazuh/wazuh-manager``, ``wazuh/wazuh-indexer``, and ``wazuh/wazuh-dashboard``. You can find all the Wazuh Helm charts in the `JOSA's charts Github repo  <https://github.com/jordanopensource/charts/tree/main/charts/wazuh>`_.

You can refer to the `helm install <https://helm.sh/docs/intro/install/>`_ guide in order to figure out how to install helm on your system.

Read the :doc:`/deployment-options/helm/chart-usage` section to learn how to access the services and manage deployments.

.. toctree::
   :maxdepth: 1
   :hidden:

   chart-usage
   wazuh-chart-values
   upgrading-wazuh-helm
