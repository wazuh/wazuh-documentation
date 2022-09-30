.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install the Wazuh central components without connection to the Internet.

Offline installation
====================

You can install Wazuh even when there is no connection to the Internet. Installing the solution offline involves downloading the Wazuh central components to later install them on a system with no Internet connection. The Wazuh server, the Wazuh indexer, and the Wazuh dashboard can be installed and configured on the same host in an all-in-one deployment, or each component can be installed on a separate host as a distributed deployment, depending on your environment needs. 

For more information about the hardware requirements and the recommended operating systems, check the :ref:`Requirements <installation_requirements>` section.

.. note::

    Root privileges are required to execute all the commands.

Prerequisites
-------------

- ``curl``, ``tar``, and ``setcap`` need to be installed in the target system where the offline installation will be carried out. ``gnupg`` might need to be installed as well for some Debian-based systems.

- In some systems, the command ``cp`` is an alias for ``cp -i`` — you can check this by running ``alias cp``. If this is your case, use ``unalias cp`` to avoid being asked for confirmation to overwrite files.

Download the packages and configuration files
---------------------------------------------

#. Replace ``<deb|rpm>`` in the following command with your choice of package format and run it from a Linux system with Internet connection. This action executes a script that downloads all required files for the offline installation on x86_64 architectures.

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh
      # chmod 744 wazuh-install.sh
      # ./wazuh-install.sh -dw <deb|rpm>
          
#. Download the certificates configuration file.

      .. code-block:: console
        
         # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml

#. Edit ``config.yml`` to prepare the certificates creation.

   -  If you are performing an all-in-one deployment, replace ``<indexer-node-ip>``, ``<wazuh-manager-ip>``, and ``<dashboard-node-ip>`` with ``127.0.0.1``.
        
   -  If you are performing a distributed deployment, replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. Add as many node fields as needed.


#.  Run the ``./wazuh-certs-tool.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

    .. code-block:: console
    
        # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
        # chmod 744 wazuh-certs-tool.sh
        # ./wazuh-certs-tool.sh --all            

#. Copy or move ``wazuh-offline.tar.gz`` file and ``./wazuh-certificates/`` folder to a folder accessible to the host(s) from where the offline installation will be carried out. This can be done by using ``scp``.


Install Wazuh components from local files
-----------------------------------------

In the working directory where you placed ``wazuh-offline.tar.gz`` and ``./wazuh-certificates/``, execute the following command to decompress the installation files:

.. code-block:: console

    # tar xf wazuh-offline.tar.gz

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#.  Run the following command to install the Wazuh indexer.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
        
                # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm

        .. group-tab:: DEB

            .. code-block:: console
        
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb

#. Run the following commands replacing ``<indexer-node-name>`` with the name of the Wazuh indexer node you are configuring as defined in ``config.yml``. For example, ``node-1``. This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

      # NODE_NAME=<indexer-node-name>

   .. code-block:: console
    
      # mkdir /etc/wazuh-indexer/certs
      # mv -n wazuh-certificates/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # mv -n wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # mv wazuh-certificates/admin-key.pem /etc/wazuh-indexer/certs/
      # mv wazuh-certificates/admin.pem /etc/wazuh-indexer/certs/
      # cp wazuh-certificates/root-ca.pem /etc/wazuh-indexer/certs/
      # chmod 500 /etc/wazuh-indexer/certs
      # chmod 400 /etc/wazuh-indexer/certs/*
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   Here you move the node certificate and key files, such as `node-1.pem` and `node-1-key.pem`, to their corresponding `certs` folder. They're specific to the node and are not required on the other nodes. However, note that the `root-ca.pem` certificate isn't moved but copied to the `certs` folder. This way, you can continue deploying it to other nodes and component folders in the next steps.

#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values: 

    
   #. ``network.host``:  Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and will also use it as its publish address. Accepts an IP address or a hostname. 
   
      Use the same node address set in ``config.yml`` to create the SSL certificates. 

   #. ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``node-1``.

   #. ``cluster.initial_master_nodes``: List of the names of the master-eligible nodes. These names are defined in the ``config.yml`` file. Uncomment the ``node-2`` and ``node-3`` lines, change the names, or add more lines, according to your ``config.yml`` definitions.

      .. code-block:: yaml

        cluster.initial_master_nodes:
        - "node-1"
        - "node-2"
        - "node-3"

   #. ``discovery.seed_hosts:`` List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. 
      You may leave this setting commented if you are configuring the Wazuh indexer as a single-node. For multi-node configurations, uncomment this setting and set your master-eligible nodes addresses. 

       .. code-block:: yaml

        discovery.seed_hosts:
          - "10.0.0.1"
          - "10.0.0.2"
          - "10.0.0.3"
  
   #. ``plugins.security.nodes_dn``: List of the Distinguished Names of the certificates of all the Wazuh indexer cluster nodes. Uncomment the lines for ``node-2`` and ``node-3`` and change the common names (CN) and values according to your settings and your ``config.yml`` definitions.

      .. code-block:: yaml

        plugins.security.nodes_dn:
        - "CN=node-1,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=node-2,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=node-3,OU=Wazuh,O=Wazuh,L=California,C=US"

#.  Enable and start the Wazuh indexer service.

    .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. For multi-node clusters, repeat the previous steps on every Wazuh indexer node. Then proceed to the cluster initialization stage.

#.  When all Wazuh indexer nodes are running, run the Wazuh indexer ``indexer-security-init.sh`` script on any Wazuh indexer node to load the new certificates information and start the cluster:

    .. code-block:: console

        # /usr/share/wazuh-indexer/bin/indexer-security-init.sh
  
#.  Run the following command to check that the installation is successful.

    .. code-block:: console

        # curl -XGET https://localhost:9200 -u admin:admin -k

    Expand the output to see an example response.

    .. code-block:: none
        :class: output collapsed

        {
          "name" : "node-1",
          "cluster_name" : "wazuh-cluster",
          "cluster_uuid" : "nRWvWcQsTpuC_PQU9pB3-g",
          "version" : {
            "number" : "7.10.2",
            "build_type" : "rpm",
            "build_hash" : "e505b10357c03ae8d26d675172402f2f2144ef0f",
            "build_date" : "2022-01-14T03:38:06.881862Z",
            "build_snapshot" : false,
            "lucene_version" : "8.10.1",
            "minimum_wire_compatibility_version" : "6.8.0",
            "minimum_index_compatibility_version" : "6.0.0-beta1"
          },
          "tagline" : "The OpenSearch Project: https://opensearch.org/"
        }


Installing the Wazuh server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#.  Run the following commands to import the Wazuh key and install the Wazuh manager.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
        
                # rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH
                # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-manager*.rpm

        .. group-tab:: DEB

            .. code-block:: console
        
                # gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH && chmod 644 /usr/share/keyrings/wazuh.gpg
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb

#.  Enable and start the Wazuh manager service.

    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#.  Run the following command to verify that the Wazuh manager status is active.

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst    


Installing Filebeat
~~~~~~~~~~~~~~~~~~~

Filebeat must be installed and configured on the same server as the Wazuh manager.

#.  Run the following command to install Filebeat.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
        
                # rpm -ivh ./wazuh-offline/wazuh-packages/filebeat*.rpm

        .. group-tab:: DEB

            .. code-block:: console
        
                # dpkg -i ./wazuh-offline/wazuh-packages/filebeat*.deb

#.  Move a copy of the configuration files to the appropriate location. Ensure to type “yes” at the prompt to overwrite ``/etc/filebeat/filebeat.yml``.

    .. code-block:: console
    
        # cp ./wazuh-offline/wazuh-files/filebeat.yml /etc/filebeat/ &&\
        cp ./wazuh-offline/wazuh-files/wazuh-template.json /etc/filebeat/ &&\
        chmod go+r /etc/filebeat/wazuh-template.json

#.  Edit ``/etc/filebeat/wazuh-template.json`` and change to ``"1"`` the value for ``"index.number_of_shards"`` for  a single-node installation. This value can be changed based on the user requirement when performing a distributed installation.

    .. code-block:: none
        :emphasize-lines: 5

        {
          ...
          "settings": {
            ...
            "index.number_of_shards": "1",
            ...
          },
          ...
        }      

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace the following value:

   .. include:: /_templates/installations/filebeat/opensearch/configure_filebeat.rst

#. Create a Filebeat keystore to securely store authentication credentials.

   .. code-block:: console
     
      # filebeat keystore create

#. Add the username and password ``admin``:``admin`` to the secrets keystore.
      
   .. code-block:: console

      # echo admin | filebeat keystore add username --stdin --force
      # echo admin | filebeat keystore add password --stdin --force              

#.  Install the Wazuh module for Filebeat.

    .. code-block:: console
    
        # tar -xzf ./wazuh-offline/wazuh-files/wazuh-filebeat-0.2.tar.gz -C /usr/share/filebeat/module

#.  Replace ``<server-node-name>`` with your Wazuh server node certificate name, the same used in ``config.yml`` when creating the certificates. Then, move the certificates to their corresponding location.

     .. code-block:: console
        
        # NODE_NAME=<server-node-name>

    .. code-block:: console

        # mkdir /etc/filebeat/certs
        # mv -n wazuh-certificates/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
        # mv -n wazuh-certificates/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
        # cp wazuh-certificates/root-ca.pem /etc/filebeat/certs/
        # chmod 500 /etc/filebeat/certs
        # chmod 400 /etc/filebeat/certs/*
        # chown -R root:root /etc/filebeat/certs


#.  Enable and start the Filebeat service.

    .. include:: /_templates/installations/elastic/common/enable_filebeat.rst

#.  Run the following command to make sure Filebeat is successfully installed.

    .. code-block:: console

        # filebeat test output

    Expand the output to see an example response.

    .. code-block:: none
        :class: output collapsed

        elasticsearch: https://127.0.0.1:9200...
          parse url... OK
          connection...
            parse host... OK
            dns lookup... OK
            addresses: 127.0.0.1
            dial up... OK
          TLS...
            security: server's certificate chain verification is enabled
            handshake... OK
            TLS version: TLSv1.3
            dial up... OK
          talk to server... OK
          version: 7.10.2

    To check the number of shards that have been configured, you can run the following command.
    
    .. code-block:: console

        # curl -k -u admin:admin "https://localhost:9200/_template/wazuh?pretty&filter_path=wazuh.settings.index.number_of_shards"

    Expand the output to see an example response.
    
    .. code-block:: none
        :class: output collapsed

        {
          "wazuh" : {
            "settings" : {
              "index" : {
                "number_of_shards" : "1"
              }
            }
          }
        }


Your Wazuh server node is now successfully installed. Repeat the steps of this installation process stage for every Wazuh server node in your cluster, expand the **Wazuh cluster configuration for multi-node deployment** section below, and carry on then with configuring the Wazuh cluster. If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with the Wazuh dashboard installation.
  
Wazuh cluster configuration for multi-node deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

  <div class="accordion-section">

After completing the installation of the Wazuh server on every node, you need to configure one server node only as the master and the rest as workers.


Configuring the Wazuh server master node
""""""""""""""""""""""""""""""""""""""""

  #. Edit the following settings in the ``/var/ossec/etc/ossec.conf`` configuration file.

      .. include:: /_templates/installations/manager/configure_wazuh_master_node.rst

  #. Restart the Wazuh manager. 

      .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

    
Configuring the Wazuh server worker nodes
"""""""""""""""""""""""""""""""""""""""""

  #. .. include:: /_templates/installations/manager/configure_wazuh_worker_node.rst

  #. Restart the Wazuh manager. 

      .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

  Repeat these configuration steps for every Wazuh server worker node in your cluster.

Testing Wazuh server cluster
""""""""""""""""""""""""""""

  .. include:: /_templates/installations/manager/check_wazuh_cluster.rst



Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#.  Run the following command to install the Wazuh dashboard.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
       
                # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm

        .. group-tab:: DEB

            .. code-block:: console
       
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-dashboard*.deb

#.  Replace ``<dashboard-node-name>`` with your Wazuh dashboard node name, the same used in ``config.yml`` to create the certificates, and move the certificates to their corresponding location.

    .. code-block:: console

        # NODE_NAME=<dashboard-node-name>

    .. code-block:: console

        # mkdir /etc/wazuh-dashboard/certs
        # mv -n wazuh-certificates/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
        # mv -n wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
        # cp wazuh-certificates/root-ca.pem /etc/wazuh-dashboard/certs/
        # chmod 500 /etc/wazuh-dashboard/certs
        # chmod 400 /etc/wazuh-dashboard/certs/*
        # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and replace the following values:

   #. ``server.host``: This setting specifies the host of the back end server. To allow remote users to connect, set the value to the IP address or DNS name of the Kibana server.  The value ``0.0.0.0`` will accept all the available IP addresses of the host.

   #. ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries. The Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example,  ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

        .. code-block:: yaml
          :emphasize-lines: 1,3

             server.host: 0.0.0.0
             server.port: 443
             opensearch.hosts: https://localhost:9200
             opensearch.ssl.verificationMode: certificate

#.  Enable and start the Wazuh dashboard.

    .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. **Only for distributed deployments**:  Edit the file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` and replace the ``url`` value with the IP address or hostname of the Wazuh server master node.
          
            .. code-block:: yaml
            
              hosts:
                - default:
                  url: https://localhost
                  port: 55000
                  username: wazuh-wui
                  password: wazuh-wui
                  run_as: false

#.  Run the following command to verify the Wazuh dashboard service is active.

    .. include:: /_templates/installations/wazuh/common/check_wazuh_dashboard.rst    

#.  Access the web interface. 

    -   URL: *https://<wazuh_server_ip>*
    -   **Username**: admin
    -   **Password**: admin

Upon the first access to the Wazuh dashboard, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured.

.. note::
  
   It is highly recommended to change the default Wazuh indexer passwords. To perform this action, see the :doc:`/user-manual/securing-wazuh/wazuh-indexer` section.

To uninstall all the Wazuh central components, see the :doc:`/user-manual/uninstall/central-components` section.

Next steps
----------

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` installation section. If you need to install them offline, you can check the appropriate agent package to download for your monitored system in the :ref:`Wazuh agent packages list <Wazuh_manager_agent_packages_list>` section.
