.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install Wazuh and OpenDistro components for Elasticsearch in an all-in-one deployment without connection to the internet.

Offline step-by-step all-in-one installation
============================================

Download Wazuh and Open Distro for Elasticsearch components. Then, install them from local in an all-in-one offline deployment.

.. note:: Run ``su`` or ``sudo su`` to gain root privileges. This is necessary to execute the commands below.

Download packages and configuration files
-----------------------------------------

#. Run the following script from a system with an Internet connection. This will download all required files for the offline installation.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: bash
          
          #!/bin/bash

          # For Wazuh 4.x
          WAZUH_VERSION="4.2.1"

          OD_VERSION="1.13.2"
          ES_VERSION="7.10.2"
          
          BASE_DEST="wazuh-offline"

          install_prerequisites(){

          # Install the prerequisites
          yum install -y yum-plugin-downloadonly curl unzip wget libcap

          }

          get_wazuh_packages(){

          # Install RPM key and Wazuh repo
          rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

          cat > /etc/yum.repos.d/wazuh.repo << EOF
          [wazuh]
          gpgcheck=1
          gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
          enabled=0
          name=EL-$releasever - Wazuh
          baseurl=https://packages.wazuh.com/4.x/yum/
          protect=1
          EOF

          # Download packages for Wazuh, Filebeat and OpenSSL
          echo "Downloading Wazuh packages..."

          DEST_PATH="${BASE_DEST}/wazuh-packages"
          yum install --enablerepo=wazuh --downloadonly --downloaddir=${DEST_PATH} wazuh-manager-${WAZUH_VERSION}-1 filebeat-${ES_VERSION}-1 #openssl

          }

          get_opendistro_packages(){

          # Download packages for Elasticsearch, Kibana and Java
          echo "Downloading Opendistro packages..."

          DEST_PATH="${BASE_DEST}/opendistro-packages"
          yum install --enablerepo=wazuh --downloadonly --downloaddir=${DEST_PATH} opendistroforelasticsearch-${OD_VERSION}-1

          DEST_PATH="${BASE_DEST}/opendistro-kibana-packages"
          yum install --enablerepo=wazuh --downloadonly --downloaddir=${DEST_PATH} opendistroforelasticsearch-kibana-${OD_VERSION}-1 #unzip java-11-openjdk-devel

          }

          get_wazuh_files(){

          DEST_PATH="${BASE_DEST}/wazuh_files"

          mkdir ${DEST_PATH}

          mkdir ${DEST_PATH}/filebeat

          # Download config templates and Filebeat module
          echo "Downloading Wazuh configuration files"

          curl -so ${DEST_PATH}/filebeat/filebeat.yml https://packages.wazuh.com/resources/4.2/open-distro/filebeat/7.x/filebeat_all_in_one.yml
          
          curl -so ${DEST_PATH}/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/4.2/extensions/elasticsearch/7.x/wazuh-template.json
          
          curl -so ${DEST_PATH}/filebeat/wazuh-filebeat-module.tar.gz https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz

          }

          get_opendistro_files(){

          DEST_PATH="${BASE_DEST}/opendistro_files"

          mkdir ${DEST_PATH}

          mkdir ${DEST_PATH}/elasticsearch


          # Download Elasticsearch config templates
          echo "Downloading Elasticsearch configuration files"

          curl -so ${DEST_PATH}/elasticsearch/elasticsearch.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/7.x/elasticsearch_all_in_one.yml
          
          curl -so ${DEST_PATH}/elasticsearch/roles.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/roles/roles.yml
          
          curl -so ${DEST_PATH}/elasticsearch/roles_mapping.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/roles/roles_mapping.yml
          
          curl -so ${DEST_PATH}/elasticsearch/internal_users.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/roles/internal_users.yml      
          
          
          # Download certificates utility files
          echo "Downloading Wazuh certificates tool"
          
          curl -so ${DEST_PATH}/elasticsearch/wazuh-cert-tool.sh https://packages.wazuh.com/resources/4.2/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
          
          curl -so ${DEST_PATH}/elasticsearch/instances.yml https://packages.wazuh.com/resources/4.2/open-distro/tools/certificate-utility/instances_aio.yml


          # Download Kibana config templates and Kibana app
          echo "Downloading Kibana configuration files"

          mkdir ${DEST_PATH}/kibana

          curl -so ${DEST_PATH}/kibana/kibana.yml https://packages.wazuh.com/resources/4.2/open-distro/kibana/7.x/kibana_all_in_one.yml

          }

          install_prerequisites

          get_wazuh_packages

          get_opendistro_packages

          get_wazuh_files

          get_opendistro_files    

#. Copy the ``wazuh-offline`` folder contents to a folder accesible to the host where the offline installation will be carried out.

..
  see the :ref:`Packages list <packages>` section. 


Install Wazuh and components from local files
---------------------------------------------

.. note:: In the host where the installation is taking place, change the working directory to the folder with the installation files downloaded in the previous steps.

Install Wazuh manager
~~~~~~~~~~~~~~~~~~~~~

#. Run the following command to install the Wazuh manager.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
        
          # yum install -y ./wazuh-packages/wazuh-manager-4.2.1-1.x86_64.rpm

#. Enable and start the Wazuh manager service:

    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst    

Install Elasticsearch
~~~~~~~~~~~~~~~~~~~~~

#. Run the following command to install `Open Distro for Elasticsearch`.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
        
          # yum install -y ./opendistro-packages/*.rpm

#. Remove the demo certificates:

    .. include:: /_templates/installations/elastic/common/remove_demo_certs.rst

#. Run ``wazuh-cert-tool.sh`` to create the new certificates.

    .. code-block:: console
    
      # cp ./opendistro_files/elasticsearch/wazuh-cert-tool.sh ~
      # cp ./opendistro_files/elasticsearch/instances.yml ~
      # bash ~/wazuh-cert-tool.sh

#. Move the certificates.

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs/
      # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
      # mv ~/certs/admin* /etc/elasticsearch/certs/
      # cp ~/certs/root-ca* /etc/elasticsearch/certs/

#. Enable and start the Elasticsearch service:

    .. include:: /_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch ``securityadmin`` script to load the new certificates information and start the cluster:

    .. code-block:: console

      # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem

#. Run the following command to ensure that the installation is successful:

    .. code-block:: console

      # curl -XGET https://localhost:9200 -u admin:admin -k

    An example response should look as follows:

    .. code-block:: none
        :class: output

        {
          "name" : "node-1",
          "cluster_name" : "elasticsearch",
          "cluster_uuid" : "tWYgqpgdRz6fGN8gH11flw",
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
              
.. note:: The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command ``/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer``. Please be sure to restart the Elasticsearch service afterwards. 

..
  .. _wazuh_server_packages_filebeat:

  Installing Filebeat
  -------------------

  Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

  #. Install the Filebeat package:

      .. tabs::


        .. group-tab:: Yum


          .. include:: /_templates/installations/elastic/yum/install_filebeat.rst



        .. group-tab:: APT


          .. include:: /_templates/installations/elastic/deb/install_filebeat.rst



        .. group-tab:: ZYpp


          .. include:: /_templates/installations/elastic/zypp/install_filebeat.rst



  #. Download the preconfigured Filebeat configuration file used to forward the Wazuh alerts to Elasticsearch:

      .. code-block:: console

        # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/resources/4.2/open-distro/filebeat/7.x/filebeat_all_in_one.yml

  #. Download the alerts template for Elasticsearch:

      .. include:: /_templates/installations/elastic/common/load_filebeat_template.rst


  #. Download the Wazuh module for Filebeat:

      .. code-block:: console

        # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

  #. Copy the Elasticsearch certificates into ``/etc/filebeat/certs``:

      .. code-block:: console

        # mkdir /etc/filebeat/certs
        # cp ~/certs/root-ca.pem /etc/filebeat/certs/
        # mv ~/certs/filebeat* /etc/filebeat/certs/

  #. Enable and start the Filebeat service:

      .. include:: /_templates/installations/elastic/common/enable_filebeat.rst


  To ensure that Filebeat is successfully installed, run the following command:

      .. code-block:: console

        # filebeat test output

  An example response should look as follows:

  .. code-block:: none
               :class: output

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

  Installing Kibana
  -----------------

  Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

  #. Install the Kibana package:

      .. tabs::


        .. group-tab:: Yum


          .. include:: /_templates/installations/elastic/yum/install_kibana.rst



        .. group-tab:: APT


          .. include:: /_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: ZYpp


          .. include:: /_templates/installations/elastic/zypp/install_kibana.rst



  #. Download the Kibana configuration file:

      .. include:: /_templates/installations/elastic/common/configure_kibana_all_in_one.rst

  #. Create the ``/usr/share/kibana/data`` directory:

      .. code-block:: console
      
        # mkdir /usr/share/kibana/data
        # chown -R kibana:kibana /usr/share/kibana/data

  #. Install the Wazuh Kibana plugin. The installation of the plugin must be done from the Kibana home directory as follows:

      .. code-block:: console

          # cd /usr/share/kibana
          # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/|CURRENT_MAJObana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip

  #. Copy the Elasticsearch certificates into ``/etc/kibana/certs``:

      .. code-block:: console

        # mkdir /etc/kibana/certs
        # cp ~/certs/root-ca.pem /etc/kibana/certs/
        # mv ~/certs/kibana* /etc/kibana/certs/
        # chown kibana:kibana /etc/kibana/certs/*

  #. Link Kibana socket to privileged port 443:

      .. code-block:: console

        # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

  #. Enable and start the Kibana service:

      .. include:: /_templates/installations/elastic/common/enable_kibana.rst

  #. Access the web interface: 

    .. code-block:: none

        URL: https://<wazuh_server_ip>
        user: admin
        password: admin

  Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 


  .. note::  It is highly recommended to change the default passwords of Elasticsearch for the users' passwords. To perform this action, see the :ref:`Elasticsearch tuning <elastic_tuning>` section.

  It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` to improve the performance of Elasticsearch. Learn more about this process in the :ref:`user manual <change_elastic_pass>`.

  To uninstall all the components of the all-in-one installation, see the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_open_distro>`.

  Next steps
  ----------

  Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :ref:`Wazuh agent<installation_agents>` section.
