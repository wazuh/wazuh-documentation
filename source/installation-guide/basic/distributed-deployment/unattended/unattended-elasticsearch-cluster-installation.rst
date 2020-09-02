.. Copyright (C) 2020 Wazuh, Inc.

.. _basic_unattended_distributed_elasticsearch:

Elasticsearch & Kibana unattended installation
==============================================

This section will explain how to install Elasticsearch and Kibana using an automated script. This script will perform a health check to verify that the system has enough resources to ensure the proper performance of the installation. For more information, please visit the :ref:`requirements <installation_requirements>` section.


.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.


The script allows installing both Elasticsearch and Kibana. They can be installed either together or in separate machines. The available options to run the script are:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -e / --install-elasticsearch  | Installs Elasticsearch (cannot be used together with option ``-k``)                                           |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -k / --install-kibana         | Installs Kibana (cannot be used together with option ``-e``)                                                  |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -kip / --kibana-ip            | Indicates the IP of Kibana. It can be set to ``0.0.0.0`` which will bind all the available IPs                |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -eip / --elasticsearch-ip     | Indicates the IP of Elasticsearch. It can be set to ``0.0.0.0`` which will bind all the available IPs         |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -wip / --wazuh-ip             | Indicates the IP of Wazuh                                                                                     |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -p / --elastic-password       | Elastic user password                                                                                         |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -c / --create-certificates    | Generates the certificates for all the nodes indicated on the configuration file (only for multi-node mode)   |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+

Installing Elasticsearch
----------------------------------------

Download the script and the configuration file. After downloading them, configure the installation and run the script. Choose between single-node or multi-node depending on the type of installation:

.. tabs::

  .. group-tab:: Single-node

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/elastic-stack/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/elastic-stack/unattended-installation/distributed/templates/config.yml

    **Configure the installation** 
      
      Edit the ``~/config.yml`` file to specify the IP you want the Elasticsearch service to bind to. 

      .. note:: In order to create valid certificates for the communication between the various components of Wazuh and the Elastic Stack, external IPs must be used.

      .. code-block:: yaml
        :emphasize-lines: 4, 12, 15, 18

        ## Single-node configuration

        ## Elasticsearch configuration
        network.host: <elasticsearch_ip>
        node.name: node-1
        cluster.initial_master_nodes: node-1

        ## Certificates creation
        instances:
        - name: "elasticsearch"
          ip:
          - "<elasticsearch_ip>"
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

      - To install Elasticsearch, run the script with the option ``-e``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e 

      After the installation, the script will prompt an output like this:

      .. code-block:: console
        :class: output

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

    **Download the script and the configuration file config.yml**

      .. code-block:: console

          # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/elastic-stack/unattended-installation/distributed/elastic-stack-installation.sh 
          # curl -so ~/config.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/elastic-stack/unattended-installation/distributed/templates/config_cluster.yml

    **Configure the installation**

      .. code-block:: yaml
        :emphasize-lines: 4, 5, 6, 8, 9, 10, 12, 13, 14, 20, 23, 26, 29, 32

        ## Multi-node configuration

        ## Elasticsearch configuration
        network.host: <elasticsearch_ip>
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

        ## Certificates creation
        instances:
        - name: "elasticsearch-1"
          ip:
          - "<elasticsearch_ip-1>"
        - name: "elasticsearch-2"
          ip:
          - "<elasticsearch_ip-2>"
        - name: "elasticsearch-3"
          ip:
          - "<elasticsearch_ip-3>"
        - name: "filebeat"
          ip:
          - "<wazuh_server_ip>" 
        - name: "kibana"
          ip:
          - "<kibana_ip>"              

      The highlighted lines indicate the values that must be replaced in the ``config.yml``. These values are: 

        - ``<elasticsearch_ip>``: Elasticsearch IP.
        - ``<node_name>``: Name of the node
        - ``<elastic_cluster>``: Name of the cluster. This value must be the same in all the involved nodes.
        - ``<master_node_x>``: Name of the node ``X``.
        - ``<elasticsearch_ip-X>``: Elasticsearch IP of the node ``X``.
        - ``<wazuh_server_IP>``: Wazuh Server IP.
        - ``<kibana_ip>``: The IP of Kibana.

      There can be added as many Elasticsearch nodes as needed. To generate certificates for them, the ``instances`` section must be also updated, adding the information of these new certificates. There must be the same number of certificates rows as nodes will be on the installation.

      In case of having more than one Wazuh servers, there can be specified as many fields as needed:

      .. code-block:: yaml

        - name: "filebeat-X"
          ip:
          - "<wazuh_server_ip_X>"                

    **Run the script**

      - The first node of Elasticsearch will be considered as the initial node, this means that this node will be in charged of creating the certificates that must be distributed through the rest of the involved nodes of the installation. The option ``-c`` is used to generate the certificates:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e -c

      After the installation, Elasticsearch will start and will prompt an output like this:

      .. code-block:: console
        :class: output

        Elasticsearch started
        Elasticsearch installation finished


      - In order to install the subsequent nodes, run the script with the option ``-e``:

      .. code-block:: console

        # bash ~/elastic-stack-installation.sh -e



Configuring Elasticsearch
-------------------------

After the installation of Elasticsearch, some steps must be done manually. Choose the corresponding tab depending on the type of installation:

.. tabs::

  .. group-tab:: Single-node

    Once Elasticsearch is installed, the script will start the services automatically. The certificates will be placed at ``/root/certs.zip``. This file must be copied into the :ref:`Wazuh server <basic_unattended_distributed_wazuh>` to extract the certificates needed.

    In case that Kibana was installed in a different server, the ``certs.zip`` file should be also copied into its server to extract the :ref:`corresponding certificates <basic_configure_kibana_unattended>`.


  .. group-tab:: Multi-node

    Once Elasticsearch has been installed, the certificates must be placed on their corresponding server. If the installation was run using the option ``-c``, the Elasticsearch service will be automatically started. On the other hand, the rest of the nodes where the certificates were not created, will not start the service since they need their corresponding certificates to start.

    Copy the  ``certs.zip`` file into each Elasticsearch node, except the master node, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

    The ``X`` must be replaced with the number used in the certificate name defined for the corresponding Elasticsearch server:

    .. code-block:: console

      # unzip ~/certs.zip -d ~/certs
      # mkdir /etc/elasticsearch/certs/ca -p
      # cp -R ~/certs/ca/ ~/certs/elasticsearch-X/* /etc/elasticsearch/certs/
      # mv /etc/elasticsearch/certs/elasticsearch-X.crt /etc/elasticsearch/certs/elasticsearch.crt
      # mv /etc/elasticsearch/certs/elasticsearch-X.key /etc/elasticsearch/certs/elasticsearch.key
      # chown -R elasticsearch: /etc/elasticsearch/certs
      # chmod -R 500 /etc/elasticsearch/certs
      # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
      # rm -rf ~/certs/ ~/certs.zip

    When the certificates have been copied, the Elasticsearch service can be started:

    .. include:: ../../../../_templates/installations/elastic/common/enable_elasticsearch.rst

    
    After stating all the nodes, run the following commands to generate the passwords.

    .. include:: ../../../../_templates/installations/basic/elastic/common/generate_elastic_credentials.rst


.. _basic_install_kibana_unattended:

Installing Kibana
-----------------

Download the script. In case of installing Kibana on the same server as Elasticsearch, this step must me skipped:

.. code-block:: console

  # curl -so ~/elastic-stack-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/unattended-installation/distributed/elastic-stack-installation.sh

Run the script:

.. code-block:: console

  # bash elastic-stack-installation.sh -k -kip <kibana_IP> -eip <elasticsearch_IP> -wip <wazuh_IP> -p <elastic_user_password>

The following values must be replaced:

  - ``kibana_IP``: The IP of Kibana. 
  - ``elasticsearch_IP``: The IP of Elasticsearch. 
  - ``wazuh_IP``: The IP of the Wazuh server.
  - ``elastic_user_password``: The password of the suer ``elastic`` generated during the Elasticsearch installation.
  

.. _basic_configure_kibana_unattended:

Configuring Kibana
------------------

When the script finishes, some steps must be done manually to finish the installation. Choose the corresponding tab depending on the type of installation:

.. tabs::


  .. group-tab:: Elasticsearch single-node

    If Kibana was installed on the same server as Elasticsearch, it will be ready to use once the script finishes. On the other hand, if Kibana was installed on a different host, some steps must be done manually to finish the installation:

    #. Copy the ``certs.zip`` file from the Elasticsearch’s node into the server where Kibana has been installed. It can be copied using ``scp``. This guide assumes that the file is placed in ~/ (home user folder):

        .. code-block:: console

          # unzip ~/kibana.zip -d ~/certs
          # cp -R /etc/elasticsearch/certs/ca/ /etc/kibana/certs/
          # cp /etc/elasticsearch/certs/elasticsearch.key /etc/kibana/certs/kibana.key
          # cp /etc/elasticsearch/certs/elasticsearch.crt /etc/kibana/certs/kibana.crt
          # chown -R kibana:kibana /etc/kibana/
          # chmod -R 500 /etc/kibana/certs
          # chmod 440 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*

    #. Enable and start the Kibana service:

      .. include:: ../../../../_templates/installations/elastic/common/enable_kibana.rst           



  .. group-tab:: Elasticsearch multi-node

    To finish Kibana's installation, some steps must be done manually. These steps will vary on whether the installation was made on the same server as Elasticsearch or in a different server:

    **Kibana installed on the same server as Elasticsearch**

      If Kibana is installed on the same node where certificates where created, Kibana will be ready to use as soon as the script finishes. In case of installing on a different node, follow the next steps:

      - Copy Kibana's certificates into ``/root/certs/`` directory:

      .. code-block:: console
  
        # unzip ~/certs.zip -d ~/certs
        # cp -R /etc/elasticsearch/certs/ca/ /etc/kibana/certs/
        # cp /etc/elasticsearch/certs/elasticsearch.key /etc/kibana/certs/kibana.key
        # cp /etc/elasticsearch/certs/elasticsearch.crt /etc/kibana/certs/kibana.crt
        # chown -R kibana:kibana /etc/kibana/
        # chmod -R 500 /etc/kibana/certs
        # chmod 440 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*       

    **Kibana installed on a different server from Elasticsearch**

      - Copy the ``certs.zip`` file from the Elasticsearch’s node into the server where Kibana has been installed. It can be copied using ``scp``. This guide assumes that the file is placed in ~/ (home user folder):

      .. code-block:: console

        # unzip ~/certs.zip -d ~/certs
        # cp ~/certs/ca.crt /etc/kibana/certs/ca
        # cp ~/certs/kibana/* /etc/kibana/certs/
        # chown -R kibana: /etc/kibana/certs
        # chmod -R 500 /etc/kibana/certs
        # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*
        # rm -rf ~/certs ~/certs.zip

    Once the certificates have been palced, Kibana can be started:

      .. include:: ../../../../_templates/installations/elastic/common/enable_kibana.rst           
          

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``ca.crt`` previously created to the Certificate Manager of each browser that will access the Kibana interface.

.. note:: The Kibana service listens to the default port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user is ``elastic`` and the password is the one generated previously.

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

Once the Elastic Stack environment is ready, the Wazuh server can be installed. The Wazuh server installation guide can be found :ref:`here<basic_unattended_distributed_wazuh>`.
