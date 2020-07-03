.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_elasticsearch:

Elasticsearch & Kibana unattended installation
==============================================

This section will explain how to install Open Distro for Elasticsearch and Open Distro for Kibana using an automated script. This script will perform a health check to verify that the system has enough resources to ensure a proper performance of the installation. For more information, please visit the :ref:`requirements <distributed_requirements>` section.

Run the script
--------------

.. note:: Root user privileges are required to run all the commands described below.

In order to download the script, ``curl`` package must be installed on the system:

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum install curl


  .. group-tab:: APT

    .. code-block:: console

        # apt install curl

Download the script:

.. code-block:: console

    # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/distributed/elastic-stack-installation.sh 

The script allows installing both Elasticsearch and Kibana. They can be installed either together or in separate machines. The available options to run the script are:

+-------------------------------+----------------------------------------------------------+
| Options                       | Purpose                                                  |
+===============================+==========================================================+
| -e / --install-elasticsearch  | Installs Open Distro for Elasticsearch                   |
+-------------------------------+----------------------------------------------------------+
| -k / --install-kibana         | Installs Open Distro for Kibana                          |
+-------------------------------+----------------------------------------------------------+
| -ip / --elasticsearch-ip      | Elasticsearch IP. Usage: ``-ip <elasticsearch_ip>``      |
+-------------------------------+----------------------------------------------------------+
| -kip / --kibana-ip            | Kibana IP. Usage: ``-kip <kibana_ip>``                   |
+-------------------------------+----------------------------------------------------------+
| -m / --multi-node             | Indicates whether it is a multi-node installation or not |
+-------------------------------+----------------------------------------------------------+
| -h / --help                   | Shows help                                               |
+-------------------------------+----------------------------------------------------------+

Elasticsearch can be installed either as a single-node or a multi-node cluster.

To install Elasticsearch, the script should be run with the following arguments:

.. code-block:: console

  # bash ~/elastic-stack-installation.sh -e -ip <elasticsearch_ip>

As mentioned before, Kibana can be installed on a separate machine. In that case, the script arguments should look as follows:

.. code-block:: console

  # bash ~/elastic-stack-installation.sh -k -ip <elasticsearch_ip> -kip <kibana_ip>

The example below shows how to run the script to install Open Distro for Elasticsearch in multi-node mode and Open Distro for Kibana: 

.. code-block:: console

  # bash ~/elastic-stack-installation.sh -e -ip <elasticsearch_ip> -m -k -kip <kibana_ip>  

Configure Elasticsearch
-----------------------

After the installation of Elasticsearch, some steps must be done manually in order to finish the configuration. Choose either single-node or multi-node tab depending on the type of installation used: 

.. tabs::


  .. group-tab:: Single-node

    **Generating the certificates**

    .. include:: ../../../_templates/installations/elastic/common/elastic-single-node/generate_deploy_certificates.rst



  .. group-tab:: Multi-node

    **Configuring cluster settings**

    The file ``/etc/elasticsearch/elasticsearch.yml`` has to be edited:

    .. code-block:: yaml

      node.name: <node_name>
      cluster.name: <elastic_cluster>
      cluster.initial_master_nodes:
              - <master_node_1>
              - <master_node_2>
              - <master_node_3>
      discovery.seed_hosts:
              - <elasticsearch_ip_node1>
              - <elasticsearch_ip_node2>
              - <elasticsearch_ip_node3>

    Depending on the node type, some parameters may vary between nodes. The ``cluster.initial_master_nodes`` and the ``discovery.seed_hosts`` are lists of all the master-eligible nodes in the cluster. The parameter ``node.master: false`` must be included in every Elasticsearch node that will not be configured as master.

    Values to be replaced:

    - ``<node_name>``: The node name. E.g.: ``node-1``.
    - ``<elastic_cluster>``: Elasticsearch cluster name. E.g.: ``elastic-cluster-production``.
    - ``<master_node_X>``: Elasticsearch cluster master-eligible node names. E.g.: ``node-2``.
    - ``<elasticsearch_ip_nodeX>`` Elasticsearch cluster master-eligible nodes IP. E.g.: ``10.0.0.3``.

    Besides, the node certificates for each node must be specified under the ``opendistro_security.nodes_dn`` section. By default, the pre-configured template includes 3 certificates, in case of having only 2 nodes, one of these lines must be removed.

        .. code-block:: yaml
            :emphasize-lines: 4

            opendistro_security.nodes_dn:
                - CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
                - CN=node-2,OU=Docu,O=Wazuh,L=California,C=ES
                - CN=<common_name>,OU=<operational_unit>,O=<organization_name>,L=<locality>,C=<country_code>

    **Generating certificates**

    The following steps must be done only in the master node:

    .. include:: ../../../_templates/installations/elastic/common/elastic-multi-node/generate_certificates.rst

    **Deploying the certificates**

    The following steps must be done in the rest of the involved nodes in the installation except the master:

    .. include:: ../../../_templates/installations/elastic/common/elastic-multi-node/deploy_certificates.rst


After generating and deploying the certificates, the Elasticsearch service can be started:

.. include:: ../../../_templates/installations/elastic/common/enable_elasticsearch.rst


Run the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster. To run this command, the value ``<elasticsearch_IP>`` must be replaced by the Elasticsearch installation IP:

.. code-block:: console

  # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
  # ./securityadmin.sh -cd ../securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key  -h <elasticsearch_IP>

Run the following command replacing the value ``<elasticsearch_ip>`` by the Elasticsearch IP to ensure that the installation was made properly:

.. code-block:: console

  # curl -XGET https://<elasticsearch_ip>:9200 -u admin:admin -k

An example response should look as follows:

.. code-block:: none
             :class: output

              {
                "name" : "node-1",
                "cluster_name" : "elasticsearch",
                "cluster_uuid" : "O82AgJJTTF2pTOXKPnwQsA",
                "version" : {
                  "number" : "7.6.1",
                  "build_flavor" : "oss",
                  "build_type" : "rpm",
                  "build_hash" : "aa751e09be0a5072e8570670309b1f12348f023b",
                  "build_date" : "2020-02-29T00:15:25.529771Z",
                  "build_snapshot" : false,
                  "lucene_version" : "8.4.0",
                  "minimum_wire_compatibility_version" : "6.8.0",
                  "minimum_index_compatibility_version" : "6.0.0-beta1"
                },
                "tagline" : "You Know, for Search"
              }  

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` in order to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.

Configure Kibana
----------------

After installing Kibana, the user must deploy the certificates generated during the Elasticsearch installation. It will vary depending on whether Kibana will be installed in the same server as Elasticsearch or in a different one:


.. tabs::



    .. group-tab:: Same Elasticsearch server


        Copy the Elasticsearch certificates:

        .. include:: ../../../_templates/installations/elastic/common/copy_certificates_kibana_elastic_server.rst



    .. group-tab:: Different Elasticsearch server


        .. include:: ../../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst


Enable and start the Kibana service:

.. include:: ../../../_templates/installations/elastic/common/enable_kibana.rst           

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``root-ca.pem`` previously created to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.

.. note:: The Kibana service listens to port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user and password to access Kibana is ``wazuh_user``.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

With the first access attempt, the Wazuh Kibana plugin may prompt a message that indicates that the Wazuh API is not working. To solve this issue edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and replace the ``url`` value by the Wazuh's server IP in which the Wazuh API is installed:

.. code-block:: yaml

  hosts:
    - default:
       url: <Wazuh_server_IP>
       port: 55000
       user: foo
       password: bar


Next steps
~~~~~~~~~~

Once the Wazuh-Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
