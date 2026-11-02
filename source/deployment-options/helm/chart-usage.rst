.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the process of installing and configuring the Wazuh chart. 

Using the Wazuh Chart
=====================


Getting started
---------------

To get started, first install JOSA's helm repo

.. code-block:: bash
  
    helm repo add josa https://charts.josa.ngo
    helm repo update

Once your ``values.yaml`` configuration is ready, read the `Configurations notes`_ before installing the chart.

.. code-block:: bash

   helm install wazuh josa/wazuh

Configurations notes
--------------------

Release Name
^^^^^^^^^^^^

We strongly recommend setting the release name to "wazuh" to avoid issues with the manager configuration. The wazuh manager nodes use the name "wazuh" by default. If you want to change the name, you will need to provide your own ``wazuh-manager`` configuration under ``manager.config.customManagerConfig``. You will need to provide your own ``master.conf`` and ``worker.conf`` in your config maps, containing your release name.

**Example on the release name:**

If your release name is ``my-release``, the manager node references in the configuration files should look like:

.. code-block:: yaml

   my-release-manager-master-0.my-release-cluster

Make sure that the cluster name matches the release name (``my-release`` in this example).

**Example of the node name under ``master.conf`` and ``worker.conf``:**

.. code-block:: conf

   <cluster>
      <name>my-release</name>
      <node_name>my-release-manager-master</node_name>
      <node_type>master</node_type>
      <key>to_be_replaced_by_cluster_key</key>
      <port>1516</port>
      <bind_addr>0.0.0.0</bind_addr>
      <nodes>
         <node>my-release-manager-master-0.my-release-cluster</node>
      </nodes>
      <hidden>no</hidden>
      <disabled>no</disabled>
   </cluster>

You can take a look at our configuration in our templates `here <./configs/wazuh_conf/>`_.

TLS
^^^

TLS is enabled and required at all times in our chart. To get this chart working, you will need to provide the following TLS configuration. The easiest way, and the one we recommend, is that you enable the certification creation in our chart if your cluster has `cert-manager <https://cert-manager.io/docs/installation/helm/>`_ installed. If you don't have a cert-manager, you can generate the required certificates and provide them as secrets under ``tls.secretName``. 

The required certificates you will need in your secrets are the following:

- admin-key.pem
- admin.pem
- node-key.pem (referenced in the docs as index-key.pem and indexer.pem)
- node.pem
- root-ca.pem
- server.key
- server.cert
- key.pem
- cert.pem
- filebeat-key.pem
- filebeat.pem

For more information on how to generate these .pem files, refer to the `wazuh Deployment kubernetes <https://documentation.wazuh.com/current/deployment-options/deploying-with-kubernetes/kubernetes-deployment.html#setup-ssl-certificates>`_.

You may notice that we did not provide the files ``dashboard-key.pem`` and ``dashboard.pem``. This is because the Wazuh Kubernetes setup uses multiple names for the same certificate. Specifically, it utilizes ``key.pem`` and ``cert.pem`` alongside ``dashboard.pem`` and ``dashboard-key.pem``, even though they refer to the same underlying certificates. In other words, different names are used interchangeably for the same certificate files across the setup.

Helpful links
-------------

- `Wazuh documentation <https://documentation.wazuh.com/current/deployment-options/deploying-with-kubernetes/index.html>`_

