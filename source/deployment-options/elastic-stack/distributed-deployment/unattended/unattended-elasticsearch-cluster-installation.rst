.. Copyright (C) 2021 Wazuh, Inc.

.. _basic_unattended_distributed_elasticsearch:

Elasticsearch & Kibana unattended installation
==============================================

This section will explain how to install Elasticsearch and Kibana using an automated script. This script will perform a health check to verify that the system has enough resources to achieve an optimal performance. For more information, please visit the :ref:`requirements <installation_requirements>` section.


.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.


The script allows installing both Elasticsearch and Kibana. They can be installed either together or in separate machines. The available options to run the script are:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -e / --install-elasticsearch  | Installs Elasticsearch (cannot be used together with option ``-k``)                                           |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -k / --install-kibana         | Installs Kibana (cannot be used together with option ``-e``)                                                  |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -n / --node-name              | Name of the Elasticsearch instance                                                                            |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -p / --elastic-password       | Elastic user password                                                                                         |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -c / --create-certificates    | Generates the certificates for all the nodes indicated on the configuration file (only for multi-node mode)   |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -d / --debug                  | Shows the complete installation output                                                                        |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+

Installing Elasticsearch
------------------------

Download the script and the configuration file. After downloading them, configure the installation and run the script. Choose the cluster mode between single-node or multi-node:

.. tabs::

  .. group-tab:: Single-node

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/distributed/templates/config.yml

    **Configure the installation** 
      
      Edit the ``~/config.yml`` file to specify the IP you want the Elasticsearch service to bind to. 

      .. note:: In order to create valid certificates for the communication between the various components of Wazuh and the Elastic Stack, external IPs must be used.

      .. code-block:: yaml
        :emphasize-lines: 5, 10, 13

        ## Single-node configuration

        ## Elasticsearch configuration

        network.host: <elasticsearch_ip>

        ## Certificates creation
        - name: "filebeat"
          ip:
          - "<wazuh_server_ip>" 
        - name: "kibana"
          ip:
          - "<kibana_ip>"            


      In case of having more than one Wazuh servers, there can be specified as many fields as needed:

      .. code-block:: yaml

        - name: "filebeat-X"
          ip:
          - "<wazuh_server_ip_X>"                      



    **Run the script**

      - To install Elasticsearch, run the script with the option ``-e`` and ``-n <node_name>``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -n <node_name>

      After the installation, the script will prompt an output like this:

      .. code-block:: console
        :class: output
        :emphasize-lines: 21

        During the installation of Elasticsearch the passwords for its user were generated. Please take note of them:
        Changed password for user apm_system
        PASSWORD apm_system = Xf7bzEhl5fa9h3L0noyl

        Changed password for user kibana_system
        PASSWORD kibana_system = WyP1F5aCA8DHLwB14zOq

        Changed password for user kibana
        PASSWORD kibana = WyP1F5aCA8DHLwB14zOq

        Changed password for user logstash_system
        PASSWORD logstash_system = mA3OOfGjEYBYGB2DZt1Q

        Changed password for user beats_system
        PASSWORD beats_system = AeOqYqDsQ5CKqGP04eUv

        Changed password for user remote_monitoring_user
        PASSWORD remote_monitoring_user = DVxxnCyQTcOuv6h7c90H

        Changed password for user elastic
        PASSWORD elastic = 3SHBeIBKIjSN2CyE62Ls

        Elasticsearch installation finished


      

  .. group-tab:: Multi-node

    **Initial node configuration and installation**

      - Download the script and the configuration file ``config.yml``

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/distributed/templates/config_cluster.yml

    - Configure the installation

      .. code-block:: yaml
        :emphasize-lines: 5, 8, 9, 10, 13, 14, 15, 21, 24

        ## Multi-node configuration

        ## Elasticsearch configuration

        cluster.name: <elastic_cluster>

        cluster.initial_master_nodes:
                - <master_node_1>
                - <master_node_2>
                - <master_node_3>

        discovery.seed_hosts:
                - <elasticsearch_ip_node1>
                - <elasticsearch_ip_node2>
                - <elasticsearch_ip_node3> 


        ## Certificates creation
        - name: "filebeat"
          ip:
          - "<wazuh_server_ip>"
        - name: "kibana"
          ip:
          - "<kibana_ip>"             

      The highlighted lines indicate the values that must be replaced in the ``config.yml``. These values are: 

        - ``<elastic_cluster>``: Name of the cluster. 
        - ``<master_node_x>``: Name of the node ``X``.
        - ``<elasticsearch_ip_nodeX>``: Elasticsearch IP of the node ``X``.
        - ``<kibana_ip>``: Kibana server IP.
        - ``<wazuh_master_server_IP>``: Wazuh Server IP.

      There can be added as many Elasticsearch nodes as needed. To generate certificates for them, the ``instances`` section must be also updated, adding the information of these new certificates. There must be the same number of certificates rows as nodes will be on the installation.

      In case of having more than one Wazuh servers, there can be specified as many fields as needed:

      .. code-block:: yaml

        - name: "filebeat-X"
          ip:
          - "<wazuh_server_ip_X>"                

    - Run the script with the options ``-e``, ``-c`` and ``-n <node_name>`` (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``master_node_1``):

      The option ``-c`` is used to generate the certificates:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -c -n <node_name>

      After the installation, Elasticsearch will start and will prompt an output like this:

      .. code-block:: console
        :class: output

        Elasticsearch started
        Elasticsearch installation finished


    **Subsequent nodes installation**
    
      - In order to install the subsequent nodes, run the script with the option ``-e`` and ``-n <node_name>`` (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``master_node_x``):

        .. code-block:: console

          # bash ~/elastic-stack-installation.sh -e -n <node_name>

    
    **Cluster initialization**

      Once the installation process is done in all the servers of the Elasticsearch cluster, run the following command on the **initial node** to generate credentials for all the Elastic Stack pre-built roles and users:

      .. include:: ../../../../../_templates/installations/basic/elastic/common/generate_elastic_credentials.rst        



Configuring Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^

Once Elasticsearch is installed, the script will start the services automatically. The certificates will be placed at ``~/certs.zip``. This file must be copied into the :ref:`Wazuh server <basic_unattended_distributed_wazuh>` to extract the certificates needed.

In case that Kibana was installed in a different server, the ``certs.zip`` file should be also copied into its server to extract the :ref:`corresponding certificates <basic_configure_kibana_unattended>`.


.. _basic_install_kibana_unattended:

Installing Kibana
-----------------

#. Download the script. In case of installing Kibana on the same server as Elasticsearch, this step must me skipped:

   .. code-block:: console

     # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/distributed/elastic-stack-installation.sh

#. Run the script:

   .. code-block:: console

    # bash elastic-stack-installation.sh -k n <node_name> -p <elastic_password>

   The following values must be replaced:

   - ``<node_name>``: Name of the instance (this name must be the same used in ``config.yml`` for the certificate creation, e.g. ``kibana``). 
   - ``elastic_password``: Password for the user ``elastic`` previously generated during the Elasticsearch installation.


#. Access the web interface using the password generated during the Elasticsearch installation process: 

    .. code-block:: none

      URL: https://<kibana_ip>
      user: elastic
      password: <PASSWORD_elastic>   

    
    Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured.   

.. _basic_configure_kibana_unattended:

Configuring Kibana
^^^^^^^^^^^^^^^^^^

If Kibana is accessed before installing the Wazuh server, the Wazuh Kibana plugin will indicate that it cannot establish a connection with the Wazuh API. Proceed with the Wazuh server installation to remediate this.

To uninstall Elasticsearch and Kibana, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_basic>`.

Next steps
~~~~~~~~~~

Once the Elastic Stack environment is ready, the Wazuh server can be installed. The Wazuh server installation guide can be found :ref:`here<basic_unattended_distributed_wazuh>`.
