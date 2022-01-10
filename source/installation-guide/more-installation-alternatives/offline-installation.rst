.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install Wazuh and OpenDistro components for Elasticsearch in an all-in-one deployment without connection to the Internet.

Offline installation
====================

You can install Wazuh even when there is no connection to the Internet. Installing the solution offline involves downloading the Wazuh components to later install them on a system with no internet connection. Although in this section the Wazuh server and Elastic Stack are installed and configured on the same host in an all-in-one deployment, each component can also be installed on a separate host as a distributed deployment, depending on your environment needs. For more information, check the :ref:`Requirements <installation_requirements>` section.

.. note:: Root privileges are required to execute all the commands.

Prerequisites
-------------

- ``curl``, ``tar``, and ``setcap`` need to be installed in the target system where the offline installation will be carried out. ``gnupg`` might need to be installed as well for some Debian-based systems.

- In some systems, the command ``cp`` is an alias for ``cp -i`` — you can check this by running ``alias cp``. If this is your case, use ``unalias cp`` to avoid being asked for confirmation to overwrite files.

Download the packages and configuration files
---------------------------------------------

#. Replace ``<deb|rpm>`` in the following command with your choice of package format and run it from a Linux system with internet connection. This action executes a script that downloads all required files for the offline installation on x86_64 architectures. You can add the ``--list-only`` option to only get a list of files to be downloaded.

    ..
      Add ``-a aarch64`` if you want to download files for `ARM64`  architectures.

    .. code-block:: console
      
      # curl -sO https://packages.wazuh.com/resources/4.2/open-distro/tools/wazuh-offline-download.sh && bash ./wazuh-offline-download.sh -p <deb|rpm>
          
#. Copy or move the ``./wazuh-offline/`` folder contents to a folder accessible to the host from where the offline installation will be carried out.


Install Wazuh components from local files
-----------------------------------------

.. note:: In the host where the installation is taking place, make sure to change the working directory to the folder where the downloaded installation files were placed.

Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Run the following commands to import the Wazuh key and install the Wazuh manager.

    .. tabs::

      .. group-tab:: RPM

        .. code-block:: console
        
          # rpm --import ./wazuh_files/GPG-KEY-WAZUH
          # rpm -ivh ./wazuh-packages/wazuh-manager*.rpm

      .. group-tab:: DEB

        .. code-block:: console
        
          # apt-key add ./wazuh_files/GPG-KEY-WAZUH
          # dpkg -i ./wazuh-packages/wazuh-manager*.deb

#. Enable and start the Wazuh manager service.

    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to verify the Wazuh manager status is active.

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst    

Installing Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~

#. Run the following command to install Open Distro for Elasticsearch.

    .. tabs::

      .. group-tab:: RPM

        .. code-block:: console
        
          # rpm -ivh ./opendistro-packages/*.rpm > opendistro_output.txt

      .. group-tab:: DEB

        .. code-block:: console
        
          # dpkg -i ./opendistro-packages/*.deb > opendistro_output.txt

#. Move a copy of the configuration files to the appropriate location.

    .. code-block:: none
    
      cp ./opendistro_files/elasticsearch/elasticsearch.yml /etc/elasticsearch/ &&\
      cp ./opendistro_files/elasticsearch/roles.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ &&\
      cp ./opendistro_files/elasticsearch/roles_mapping.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ &&\
      cp ./opendistro_files/elasticsearch/internal_users.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ &&\
      cp ./opendistro_files/elasticsearch/wazuh-cert-tool.sh ~ &&\
      cp ./opendistro_files/elasticsearch/instances.yml ~

#. Remove the demo certificates.

    .. include:: /_templates/installations/elastic/common/remove_demo_certs.rst

#. Run *wazuh-cert-tool.sh* to create the new certificates.

    .. code-block:: console
    
      # bash ~/wazuh-cert-tool.sh

#. Move the certificates to the appropriate location.

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs/
      # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
      # mv ~/certs/admin* /etc/elasticsearch/certs/
      # cp ~/certs/root-ca* /etc/elasticsearch/certs/

#. **Recommended action**  - Remove Open Distro for Elasticsearch performance analyzer plugin

    The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command.

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer

#. Enable and start the Elasticsearch service.

    .. include:: /_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch *securityadmin* script to load the new certificates information and start the cluster.

    .. code-block:: console

      # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem

  
  
#. Run the following command to check that the installation is successful.

    .. code-block:: console

      # curl -XGET https://localhost:9200 -u admin:admin -k

    Expand the output to see an example response.

    .. code-block:: none
        :class: output accordion-output

        {
          "name" : "node-1",
          "cluster_name" : "elasticsearch",
          "cluster_uuid" : "RpYwqJ5CRdS1ZFI5QQERRA",
          "version" : {
            "number" : "7.10.2",
            "build_flavor" : "oss",
            "build_type" : "rpm",
            "build_hash" : "747e1cc71def077253878a59143c1f785afa92b9",
            "build_date" : "2021-01-13T00:42:12.435326Z",
            "build_snapshot" : false,
            "lucene_version" : "8.7.0",
            "minimum_wire_compatibility_version" : "6.8.0",
            "minimum_index_compatibility_version" : "6.0.0-beta1"
          },
          "tagline" : "You Know, for Search"
        }


Installing Filebeat
~~~~~~~~~~~~~~~~~~~

#. Run the following command to install Filebeat.

    .. tabs::

      .. group-tab:: RPM

        .. code-block:: console
        
          # rpm -ivh ./wazuh-packages/filebeat*.rpm

      .. group-tab:: DEB

        .. code-block:: console
        
          # dpkg -i ./wazuh-packages/filebeat*.deb

#. Move a copy of the configuration files to the appropriate location.

    .. code-block:: none
    
      cp ./wazuh_files/filebeat/filebeat.yml /etc/filebeat/ &&\
      cp ./wazuh_files/filebeat/wazuh-template.json /etc/filebeat/ &&\
      chmod go+r /etc/filebeat/wazuh-template.json

#. Edit ``/etc/filebeat/wazuh-template.json`` and change to ``"1"`` the value for ``"index.number_of_shards"`` as this is a single-node installation.

    .. code-block:: none

      {
        ...
        "settings": {
          ...
          "index.number_of_shards": "1",
          ...
        },
        ...
      }      

#. Install the Wazuh module for Filebeat.

    .. code-block:: console
    
      # tar -xzf ./wazuh_files/filebeat/wazuh-filebeat-module.tar.gz -C /usr/share/filebeat/module

#. Copy the Elasticsearch certificates into ``/etc/filebeat/certs``.

    .. code-block:: console

      # mkdir /etc/filebeat/certs
      # cp ~/certs/root-ca.pem /etc/filebeat/certs/
      # mv ~/certs/filebeat* /etc/filebeat/certs/

#. Enable and start the Filebeat service.

    .. include:: /_templates/installations/elastic/common/enable_filebeat.rst


#. Run the following command to make sure Filebeat is successfully installed.

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

    To check only one shard has been configured, you can run the following command.
    
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


Installing Kibana
~~~~~~~~~~~~~~~~~

#. Run the following command to install Kibana.

   .. tabs::

     .. group-tab:: RPM

       .. code-block:: console
       
         # rpm -ivh ./opendistro-kibana-packages/opendistroforelasticsearch-kibana*.rpm

     .. group-tab:: DEB

       .. code-block:: console
       
         # dpkg -i ./opendistro-kibana-packages/opendistroforelasticsearch-kibana*.deb

#. Move a copy of the configuration files to the appropriate location.

     .. code-block:: console
     
       # cp ./opendistro_files/kibana/kibana.yml /etc/kibana/

    .. note::
      ``server.host: 0.0.0.0`` in ``/etc/kibana/kibana.yml`` means that Kibana can be accessed from the outside and accepts all the available IP addresses of the host. This value can be changed for a specific IP address if needed.
  
#. Create the ``/usr/share/kibana/data`` directory.

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/data

#. Replace ``</path/to/installation/folder/>`` with your installation folder path and run the following command to install the Wazuh Kibana plugin.

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin install --allow-root file://</path/to/installation/folder/>wazuh_files/kibana/wazuh_kibana.zip

#. Copy the Elasticsearch certificates into ``/etc/kibana/certs``.

    .. code-block:: console

      # mkdir /etc/kibana/certs
      # cp ~/certs/root-ca.pem /etc/kibana/certs/
      # mv ~/certs/kibana* /etc/kibana/certs/
      # chown kibana:kibana /etc/kibana/certs/*

#. Link Kibana socket to privileged port 443.

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service.

    .. include:: /_templates/installations/elastic/common/enable_kibana.rst

#. Access the web interface. 

    - URL: *https://<wazuh_server_ip>*
    - **Username**: admin
    - **Password**: admin

Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


.. note::
  
  * It is highly recommended to change the default passwords of Elasticsearch for the users' passwords. To perform this action, see the :ref:`Change users' password <change_elastic_pass>` section.
  * It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` to improve the performance of Elasticsearch. Learn more about this process in the :ref:`memory_locking` section.

To uninstall all the components of the all-in-one installation, see the :ref:`Uninstalling Wazuh <user_manual_uninstall_wazuh_installation_open_distro>` section.

Next steps
----------

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :ref:`Wazuh agent<installation_agents>` installation section. If you need to install them offline, you can check the appropriate agent package to download for your monitored system in the :ref:`Wazuh agent packages list <Wazuh_manager_agent_packages_list>` section.
