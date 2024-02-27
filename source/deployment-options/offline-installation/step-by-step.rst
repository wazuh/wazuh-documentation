Install Wazuh components step by step
-----------------------------------------

#. In the working directory where you placed ``wazuh-offline.tar.gz`` and ``wazuh-install-files.tar``, execute the following command to decompress the installation files:

   .. code-block:: console

      # tar xf wazuh-offline.tar.gz
      # tar xf wazuh-install-files.tar

   You can check the SHA512 of the decompressed package files in ``wazuh-offline/wazuh-packages/``. Find the SHA512 checksums in the :doc:`/installation-guide/packages-list`.

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#.  Run the following commands to install the Wazuh indexer.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
        
               # rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH
               # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm

        .. group-tab:: DEB

            .. code-block:: console
        
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb

#. Run the following commands replacing ``<indexer-node-name>`` with the name of the Wazuh indexer node you are configuring as defined in ``config.yml``. For example, ``node-1``. This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

      # NODE_NAME=<indexer-node-name>

   .. code-block:: console
    
      # mkdir /etc/wazuh-indexer/certs
      # mv -n wazuh-install-files/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # mv wazuh-install-files/admin-key.pem /etc/wazuh-indexer/certs/
      # mv wazuh-install-files/admin.pem /etc/wazuh-indexer/certs/
      # cp wazuh-install-files/root-ca.pem /etc/wazuh-indexer/certs/
      # chmod 500 /etc/wazuh-indexer/certs
      # chmod 400 /etc/wazuh-indexer/certs/*
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   Here you move the node certificate and key files, such as `node-1.pem` and `node-1-key.pem`, to their corresponding `certs` folder. They're specific to the node and are not required on the other nodes. However, note that the `root-ca.pem` certificate isn't moved but copied to the `certs` folder. This way, you can continue deploying it to other component folders in the next steps.

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

#. For multi-node clusters, repeat the previous steps on every Wazuh indexer node. 

#. When all Wazuh indexer nodes are running, run the Wazuh indexer ``indexer-init.sh`` script on `any Wazuh indexer node` to load the new certificates information and start the cluster. 

    .. code-block:: console

        # bash /usr/share/wazuh-indexer/bin/indexer-init.sh -i <WAZUH_INDEXER_IP_ADDRESS>
  
#. Run the following command to check that the installation is successful. Note that this command uses localhost, set your Wazuh indexer address if necessary. 

   .. code-block:: console

      # curl -XGET https://localhost:9200 -u admin:admin -k

   Expand the output to see an example response.

   .. code-block:: none
      :class: output collapsed

      {
        "name" : "node-1",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "095jEW-oRJSFKLz5wmo5PA",
        "version" : {
          "number" : "7.10.2",
          "build_type" : "rpm",
          "build_hash" : "db90a415ff2fd428b4f7b3f800a51dc229287cb4",
          "build_date" : "2023-06-03T06:24:25.112415503Z",
          "build_snapshot" : false,
          "lucene_version" : "9.6.0",
          "minimum_wire_compatibility_version" : "7.10.0",
          "minimum_index_compatibility_version" : "7.0.0"
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
        
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb

#.  Enable and start the Wazuh manager service.

    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#.  Run the following command to verify that the Wazuh manager status is active.

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst    

#. Save the Wazuh indexer username and password into the Wazuh manager keystore using the wazuh-keystore tool: 

   .. code-block:: console

       # /var/ossec/bin/wazuh-keystore -f indexer -k username -v <INDEXER_USERNAME>
       # /var/ossec/bin/wazuh-keystore -f indexer -k password -v <INDEXER_PASSWORD>   

   .. note:: The default offline-installation credentials are ``admin``:``admin``

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

#.  Replace ``<server-node-name>`` with your Wazuh server node certificate name, the same used in ``config.yml`` when creating the certificates. For example, ``wazuh-1``. Then, move the certificates to their corresponding location.

     .. code-block:: console
        
        # NODE_NAME=<server-node-name>

    .. code-block:: console

        # mkdir /etc/filebeat/certs
        # mv -n wazuh-install-files/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
        # mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
        # cp wazuh-install-files/root-ca.pem /etc/filebeat/certs/
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

To verify that the Wazuh cluster is enabled and all the nodes are connected, execute the following command:

  .. code-block:: console

    # /var/ossec/bin/cluster_control -l

An example output of the command looks as follows:

  .. code-block:: none
    :class: output
    
      NAME         TYPE    VERSION  ADDRESS
      master-node  master  |WAZUH_CURRENT|   10.0.0.3
      worker-node1 worker  |WAZUH_CURRENT|   10.0.0.4
      worker-node2 worker  |WAZUH_CURRENT|   10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are example IPs.

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#.  Run the following commands to install the Wazuh dashboard.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
       
                # rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH
                # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm

        .. group-tab:: DEB

            .. code-block:: console
       
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-dashboard*.deb

#.  Replace ``<dashboard-node-name>`` with your Wazuh dashboard node name, the same used in ``config.yml`` to create the certificates. For example, ``dashboard``. Then, move the certificates to their corresponding location.

    .. code-block:: console

        # NODE_NAME=<dashboard-node-name>

    .. code-block:: console

        # mkdir /etc/wazuh-dashboard/certs
        # mv -n wazuh-install-files/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
        # mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
        # cp wazuh-install-files/root-ca.pem /etc/wazuh-dashboard/certs/
        # chmod 500 /etc/wazuh-dashboard/certs
        # chmod 400 /etc/wazuh-dashboard/certs/*
        # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and replace the following values:

   #. ``server.host``: This setting specifies the host of the back end server. To allow remote users to connect, set the value to the IP address or DNS name of the Wazuh dashboard.  The value ``0.0.0.0`` will accept all the available IP addresses of the host.

   #. ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries. The Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example,  ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

        .. code-block:: yaml
          :emphasize-lines: 1,3

             server.host: 0.0.0.0
             server.port: 443
             opensearch.hosts: https://localhost:9200
             opensearch.ssl.verificationMode: certificate

#.  Enable and start the Wazuh dashboard.

    .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#.  Run the following command to verify the Wazuh dashboard service is active.

    .. include:: /_templates/installations/wazuh/common/check_wazuh_dashboard.rst    

#.  Access the web interface. 

    -   URL: *https://<wazuh_server_ip>*
    -   **Username**: admin
    -   **Password**: admin

      Upon the first access to the Wazuh dashboard, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured.

#.  Add a new server API.

      Go to **Dashboard management** > **Server APIs**, click on **Add API connection** button and fill the form with:

      - **ID**: default
      - **URL**: IP address or hostname of the Wazuh server master node
      - **Port**: 55000
      - **Username**: wazuh-wui
      - **Password**: wazuh-wui
      - **Run as**: false 

Securing your Wazuh installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


You have now installed and configured all the Wazuh central components. We recommend changing the default credentials to protect your infrastructure from possible attacks. 

Select your deployment type and follow the instructions to change the default passwords for both the Wazuh API and the Wazuh indexer users.


.. tabs::

   .. group-tab:: All-in-one deployment

      #. Use the Wazuh passwords tool to change all the internal users passwords.
      
         .. code-block:: console
         
            # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all --admin-user wazuh --admin-password wazuh
         
         .. code-block:: console
            :class: output
       
            INFO: The password for user admin is yWOzmNA.?Aoc+rQfDBcF71KZp?1xd7IO
            INFO: The password for user kibanaserver is nUa+66zY.eDF*2rRl5GKdgLxvgYQA+wo
            INFO: The password for user kibanaro is 0jHq.4i*VAgclnqFiXvZ5gtQq1D5LCcL
            INFO: The password for user logstash is hWW6U45rPoCT?oR.r.Baw2qaWz2iH8Ml
            INFO: The password for user readall is PNt5K+FpKDMO2TlxJ6Opb2D0mYl*I7FQ
            INFO: The password for user snapshotrestore is +GGz2noZZr2qVUK7xbtqjUup049tvLq.
            WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.
            INFO: The password for Wazuh API user wazuh is JYWz5Zdb3Yq+uOzOPyUU4oat0n60VmWI
            INFO: The password for Wazuh API user wazuh-wui is +fLddaCiZePxh24*?jC0nyNmgMGCKE+2
            INFO: Updated wazuh-wui user password in wazuh dashboard. Remember to restart the service.
       
    
   .. group-tab:: Distributed deployment

      #. On `any Wazuh indexer node`, use the Wazuh passwords tool to change the passwords of the Wazuh indexer users. 

         .. code-block:: console
  
            # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all
  
         .. code-block:: console
            :class: output

            INFO: Wazuh API admin credentials not provided, Wazuh API passwords not changed.
            INFO: The password for user admin is wcAny.XUwOVWHFy.+7tW9l8gUW1L8N3j
            INFO: The password for user kibanaserver is qy6fBrNOI4fD9yR9.Oj03?pihN6Ejfpp
            INFO: The password for user kibanaro is Nj*sSXSxwntrx3O7m8ehrgdHkxCc0dna
            INFO: The password for user logstash is nQg1Qw0nIQFZXUJc8r8+zHVrkelch33h
            INFO: The password for user readall is s0iWAei?RXObSDdibBfzSgXdhZCD9kH4
            INFO: The password for user snapshotrestore is Mb2EHw8SIc1d.oz.nM?dHiPBGk7s?UZB
            WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.



      #. On your `Wazuh server master node`, change the default password of the admin users: `wazuh` and `wazuh-wui`. Note that the commands below use localhost, set your Wazuh manager IP address if necessary. 

         #. Get an authorization TOKEN. 

            .. code-block:: console

               # TOKEN=$(curl -u wazuh-wui:wazuh-wui -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

         #. Change the `wazuh` user credentials (ID 1). Select a password between 8 and 64 characters long, it should contain at least one uppercase and one lowercase letter, a number, and a symbol. See :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>` to learn more. 

            .. code-block:: console

               curl -k -X PUT "https://localhost:55000/security/users/1" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d' 
               {
                 "password": "SuperS3cretPassword!"
               }'

            .. code-block:: console
               :class: output

               {"data": {"affected_items": [{"id": 1, "username": "wazuh", "allow_run_as": true, "roles": [1]}], "total_affected_items": 1, "total_failed_items": 0, "failed_items": []}, "message": "User was successfully updated", "error": 0}  
    
        
         #. Change the `wazuh-wui` user credentials (ID 2). 

            .. code-block:: console

               curl -k -X PUT "https://localhost:55000/security/users/2" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d' 
               {
                 "password": "SuperS3cretPassword!"
               }'

            .. code-block:: console
               :class: output   

               {"data": {"affected_items": [{"id": 2, "username": "wazuh-wui", "allow_run_as": true, "roles": [1]}], "total_affected_items": 1, "total_failed_items": 0, "failed_items": []}, "message": "User was successfully updated", "error": 0}
   
         See the :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section for additional security configurations. 

         .. note:: Remember to store these passwords securely. 


      #. On `all your Wazuh server nodes`, run the following command to update the `admin` password in the Filebeat keystore. Replace ``<admin-password>`` with the random password generated in the first step.
      
         .. code-block:: console

            # echo <admin-password> | filebeat keystore add password --stdin --force

      #. Restart Filebeat to apply the change.

         .. include:: /_templates/common/restart_filebeat.rst

         .. note:: Repeat steps 3 and 4 on `every Wazuh server node`.
       
      #. On your `Wazuh dashboard node`, run the following command to update the `kibanaserver` password in the Wazuh dashboard keystore. Replace ``<kibanaserver-password>`` with the random password generated in the first step.

         .. code-block:: console

            # echo <kibanaserver-password> | /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password

      #. Restart the Wazuh dashboard to apply the changes.

         .. include:: /_templates/common/restart_dashboard.rst

      #. Update the API host password.
      
         On Wazuh dashboard, go to **Dashboard management** > **Server APIs**, click on the edit button of the secured server API entry and replace the **Password** field, then click on the **Apply** button to save.


Next steps
^^^^^^^^^^

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` installation section. If you need to install them offline, you can check the appropriate agent package to download for your monitored system in the :ref:`Wazuh agent packages list <wazuh_agent_packages_list>` section.

To uninstall all the Wazuh central components, see the :doc:`/user-manual/uninstall/index` section.