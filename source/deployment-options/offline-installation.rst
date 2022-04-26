.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install the Wazuh central components without connection to the Internet.

Offline installation
====================

You can install Wazuh even when there is no connection to the Internet. Installing the solution offline involves downloading the Wazuh central components to later install them on a system with no Internet connection. The Wazuh server, the Wazuh indexer and the Wazuh dashboard can be installed and configured on the same host in an all-in-one deployment, or each component can be installed on a separate host as a distributed deployment, depending on your environment needs. For more information about the hardware requirements and the recommended operating systems, check the :ref:`Requirements <installation_requirements>` section.

.. note::

    Root privileges are required to execute all the commands.

Prerequisites
-------------

- ``curl``, ``tar``, and ``setcap`` need to be installed in the target system where the offline installation will be carried out. ``gnupg`` might need to be installed as well for some Debian-based systems.

- In some systems, the command ``cp`` is an alias for ``cp -i`` — you can check this by running ``alias cp``. If this is your case, use ``unalias cp`` to avoid being asked for confirmation to overwrite files.

Download the packages and configuration files
---------------------------------------------

#.  Replace ``<deb|rpm>`` in the following command with your choice of package format and run it from a Linux system with Internet connection. This action executes a script that downloads all required files for the offline installation on x86_64 architectures.

    .. code-block:: console
      
        # curl -sO https://packages-dev.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-install.sh
        # chmod 744 wazuh-install.sh
        # ./wazuh-install.sh -dw <deb|rpm>
          
#.  Prepare the certificate configuration file.

    -   All-in-one deployment
    
        If you are performing an all-in-one deployment, do the following:
        
        .. code-block:: console
        
            # curl -sO https://packages-dev.wazuh.com/|WAZUH_LATEST_MINOR|/config.yml
            
        Edit ``config.yml`` and replace ``<indexer-node-ip>``, ``<wazuh-manager-ip>``, and ``<dashboard-node-ip>`` with ``127.0.0.1``.
        
    -   Multi-node cluster
        
        If you are performing a multi-node deployment, do the following:
        
        .. code-block:: console
        
            # curl -sO https://packages-dev.wazuh.com/|WAZUH_LATEST_MINOR|/config.yml
            
        Edit ``config.yml`` and replace ``<indexer-node-ip>``, ``<wazuh-manager-ip>``, and ``<dashboard-node-ip>`` with the IP address of the host of each component.

#.  Create the certificates and move them to the ``wazuh-offline/`` directory.

    .. code-block:: console
    
        # curl -sO https://packages-dev.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-certs-tool.sh
        # chmod 744 wazuh-certs-tool.sh
        # ./wazuh-certs-tool.sh --all            

#.  Copy or move ``wazuh-offline.tar.gz`` file and ``./wazuh-certificates/`` folder to a folder accessible to the host from where the offline installation will be carried out.


Install Wazuh components from local files
-----------------------------------------

.. note::

    In the host where the installation is taking place, make sure to change the working directory to the folder where the downloaded installation files were placed.

In the working directory where you placed ``wazuh-offline.tar.gz`` and ``./wazuh-certificates/``, execute the following to decompress the installation files:

.. code-block:: console

    # tar xf wazuh-offline.tar.gz

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
        
                # apt-key add ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb

#.  Enable and start the Wazuh manager service.

    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#.  Run the following command to verify that the Wazuh manager status is active.

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst    

Installing the Wazuh indexer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#.  Run the following command to install the Wazuh indexer.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
        
                # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm

        .. group-tab:: DEB

            .. code-block:: console
        
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb

#.  Move the production certificates to the ``/etc/wazuh-indexer/certs/`` directory.

    .. code-block:: console
    
        # mkdir /etc/wazuh-indexer/certs
        # mv wazuh-certificates/admin-key.pem /etc/wazuh-indexer/certs/
        # mv wazuh-certificates/admin.pem /etc/wazuh-indexer/certs/
        # mv wazuh-certificates/node-1-key.pem /etc/wazuh-indexer/certs/
        # mv wazuh-certificates/node-1.pem /etc/wazuh-indexer/certs/
        # cp wazuh-certificates/root-ca.pem /etc/wazuh-indexer/certs/
        # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs/

#.  Edit the indexer configuration file ``/etc/wazuh-indexer/opensearch.yml`` and change the certificate names to match the name of the new certificates as shown in the following lines:

    .. code-block:: yaml

        plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/node-1.pem
        plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/node-1-key.pem
        plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/node-1.pem
        plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/node-1-key.pem

#.  Enable and start the Wazuh indexer service.

    .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#.  Use ``indexer-security-init.sh`` script to load the new certificates information and start the cluster:

    .. code-block:: console

        # /usr/share/wazuh-indexer/bin/indexer-security-init.sh
  
#.  Run the following command to check that the installation is successful.

    .. code-block:: console

        # curl -XGET https://localhost:9200 -u admin:admin -k

    Expand the output to see an example response.

    .. code-block:: none
        :class: output accordion-output

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

#.  Edit ``/etc/filebeat/wazuh-template.json`` and change to ``"1"`` the value for ``"index.number_of_shards"`` for  a single-node installation. This value can be changed based on the user requirement when performing a multi-node installation.

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

#.  Edit Filebeat configuration file ``/etc/filebeat/filebeat.yml``:

    -   All-in-one deployment

        Change the value of ``username`` and ``password`` to the configured credentials. The default username and password is ``admin``.
        
        .. code-block:: yaml
        
            # Wazuh - Filebeat configuration file
            output.elasticsearch:
            hosts: ["127.0.0.1:9200"]
            username: admin
            password: admin
            
    -   Multi-node cluster
    
        Change the value of ``hosts`` to the IP address of the Wazuh indexer. Also change the value of ``username`` and ``password`` to the configured credentials. The default username and password is ``admin``.
        
        .. code-block:: yaml
        
            # Wazuh - Filebeat configuration file
            output.elasticsearch:
            hosts: ["<wazuh_indexer_IP>:9200"]
            username: admin
            password: admin

#.  Install the Wazuh module for Filebeat.

    .. code-block:: console
    
        # tar -xzf ./wazuh-offline/wazuh-files/wazuh-filebeat-0.1.tar.gz -C /usr/share/filebeat/module

#.  Copy the Wazuh indexer certificates into ``/etc/wazuh-indexer/certs/filebeat``.

    .. code-block:: console

        # mkdir /etc/filebeat/certs
        # mv wazuh-certificates/wazuh-1-key.pem /etc/filebeat/certs/filebeat-key.pem
        # mv wazuh-certificates/wazuh-1.pem /etc/filebeat/certs/filebeat.pem
        # cp wazuh-certificates/root-ca.pem /etc/filebeat/certs/

#.  Enable and start the Filebeat service.

    .. include:: /_templates/installations/elastic/common/enable_filebeat.rst

#.  Run the following command to make sure Filebeat is successfully installed.

    .. code-block:: console

        # filebeat test output

    Expand the output to see an example response.

    .. code-block:: none
        :class: output accordion-output

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
        :class: output accordion-output

        {
          "wazuh" : {
            "settings" : {
              "index" : {
                "number_of_shards" : "1"
              }
            }
          }
        }


Installing the Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#.  Run the following command to install the Wazuh dashboard.

    .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
       
                # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm

        .. group-tab:: DEB

            .. code-block:: console
       
                # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-dashboard*.deb

#.  Copy the dashboard certificates into ``/etc/wazuh-dashboard/certs``.

    .. code-block:: console
     
        # mkdir /etc/wazuh-dashboard/certs
        # mv wazuh-certificates/dashboard-key.pem /etc/wazuh-dashboard/certs/
        # mv wazuh-certificates/dashboard.pem /etc/wazuh-dashboard/certs/
        # cp wazuh-certificates/root-ca.pem /etc/wazuh-dashboard/certs/
        # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs/

#.  Enable and start Wazuh dashboard.

    .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#.  Access the web interface. 

    -   URL: *https://<wazuh_server_ip>*
    -   **Username**: admin
    -   **Password**: admin

Upon the first access to the Wazuh dashboard, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured.

.. note::
  
    -   It is highly recommended to change the default passwords of Wazuh indexer for the users’ passwords. To perform this action, see the :ref:`Change users' password <change_elastic_pass>` section.
    -   It is also recommended to customize the file ``/etc/wazuh-indexer/jvm.options`` to improve the performance of Wazuh indexer. Learn more about this process in the :ref:`memory_locking` section.

To uninstall all the Wazuh central components, see the :doc:`/user-manual/uninstall/central-components` section.

Next steps
----------

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :ref:`Wazuh agent<installation_agents>` installation section. If you need to install them offline, you can check the appropriate agent package to download for your monitored system in the :ref:`Wazuh agent packages list <Wazuh_manager_agent_packages_list>` section.
