.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install Wazuh and OpenDistro components for Elasticsearch in an all-in-one deployment without connection to the internet.

Offline step-by-step all-in-one installation
============================================

This document will guide you to:

* Download Wazuh and the Open Distro for Elasticsearch components.
* Install them later when there is no connection to the Internet or from a system without connection to it in an all-in-one offline deployment.

.. note:: Run ``su`` or ``sudo su`` to gain root privileges. This is necessary to execute the commands below.

Download packages and configuration files
-----------------------------------------

#. Run the following command from a system with an Internet connection. This will download and execute a script. This script will download all required files for the offline installation.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: bash
          
          curl -sO https://raw.githubusercontent.com/wazuh/wazuh-documentation/develop/resources/open-distro/download-offline-installation/offline-yum-download.sh && bash ./offline-yum-download.sh
          
      .. group-tab:: APT

        .. code-block:: bash
          
          curl -sO https://raw.githubusercontent.com/wazuh/wazuh-documentation/develop/resources/open-distro/download-offline-installation/offline-apt-download.sh && bash ./offline-apt-download.sh

      .. group-tab:: ZYpp

        .. code-block:: bash
          
          curl -sO https://raw.githubusercontent.com/wazuh/wazuh-documentation/develop/resources/open-distro/download-offline-installation/offline-zypp-download.sh && bash ./offline-zypp-download.sh


#. Copy or move ``/wazuh-offline/`` folder contents to a folder accessible to the host from where the offline installation will be carried out.

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

      .. group-tab:: APT

        .. code-block:: console
        
          # apt install -y ./wazuh-packages/wazuh-manager_4.2.1-1_amd64.deb

      .. group-tab:: ZYpp

        .. code-block:: console
        
          # zypper install -y ./wazuh-packages/wazuh-manager-4.2.1-1.x86_64.rpm


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

      .. group-tab:: APT

        .. code-block:: console
        
          # apt install -y ./opendistro-packages/*.deb

      .. group-tab:: ZYpp

        .. code-block:: console
        
          # zypper install -y ./opendistro-packages/*.rpm


#. Move a copy of the configuration files to the appropriate locations.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
        
          # \cp ./opendistro_files/elasticsearch/elasticsearch.yml /etc/elasticsearch/
          # \cp ./opendistro_files/elasticsearch/roles.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # \cp ./opendistro_files/elasticsearch/roles_mapping.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # \cp ./opendistro_files/elasticsearch/internal_users.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/wazuh-cert-tool.sh ~
          # cp ./opendistro_files/elasticsearch/instances.yml ~

      .. group-tab:: APT

        .. code-block:: console
        
          # cp ./opendistro_files/elasticsearch/elasticsearch.yml /etc/elasticsearch/
          # cp ./opendistro_files/elasticsearch/roles.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/roles_mapping.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/internal_users.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/wazuh-cert-tool.sh ~
          # cp ./opendistro_files/elasticsearch/instances.yml ~

      .. group-tab:: ZYpp

        .. code-block:: console
        
          # cp ./opendistro_files/elasticsearch/elasticsearch.yml /etc/elasticsearch/
          # cp ./opendistro_files/elasticsearch/roles.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/roles_mapping.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/internal_users.yml /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/
          # cp ./opendistro_files/elasticsearch/wazuh-cert-tool.sh ~
          # cp ./opendistro_files/elasticsearch/instances.yml ~

#. Remove the demo certificates:

    .. include:: /_templates/installations/elastic/common/remove_demo_certs.rst

#. Run `wazuh-cert-tool.sh` to create the new certificates.

    .. code-block:: console
    
      # bash ~/wazuh-cert-tool.sh

#. Move the certificates.

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs/
      # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
      # mv ~/certs/admin* /etc/elasticsearch/certs/
      # cp ~/certs/root-ca* /etc/elasticsearch/certs/

#. Enable and start the Elasticsearch service:

    .. include:: /_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch `securityadmin` script to load the new certificates information and start the cluster:

    .. code-block:: console

      # export JAVA_HOME=/usr/share/elasticsearch/jdk/ && /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem

#. Optionally, run the following commands to remove the Open Distro for Elasticsearch performance analyzer plugin. This is installed by default and can have a negative impact on system resources.

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer
      # systemctl restart elasticsearch

#. Run the following command to make sure the installation is successful:

    .. code-block:: console

      # curl -XGET https://localhost:9200 -u admin:admin -k

    An example response should look as follows:

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


Install Filebeat
~~~~~~~~~~~~~~~~

#. Run the following command to install Filebeat.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
        
          # yum install -y ./wazuh-packages/filebeat-oss-7.10.2-x86_64.rpm

      .. group-tab:: APT

        .. code-block:: console
        
          # apt install -y ./wazuh-packages/filebeat_7.10.2_amd64.deb

      .. group-tab:: ZYpp

        .. code-block:: console
        
          # zypper install -y ./wazuh-packages/filebeat-oss-7.10.2-x86_64.rpm

#. Move a copy of the configuration files.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
        
          # \cp ./wazuh_files/filebeat/filebeat.yml /etc/filebeat/
          # \cp ./wazuh_files/filebeat/wazuh-template.json /etc/filebeat/
          # chmod go+r /etc/filebeat/wazuh-template.json

      .. group-tab:: APT

        .. code-block:: console
        
          # cp ./wazuh_files/filebeat/filebeat.yml /etc/filebeat/
          # cp ./wazuh_files/filebeat/wazuh-template.json /etc/filebeat/
          # chmod go+r /etc/filebeat/wazuh-template.json

      .. group-tab:: ZYpp

        .. code-block:: console
        
          # cp ./wazuh_files/filebeat/filebeat.yml /etc/filebeat/
          # cp ./wazuh_files/filebeat/wazuh-template.json /etc/filebeat/
          # chmod go+r /etc/filebeat/wazuh-template.json

#. Install the Wazuh module for Filebeat.

    .. code-block:: console
    
      # tar -xzf ./wazuh_files/filebeat/wazuh-filebeat-module.tar.gz -C /usr/share/filebeat/module

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

Install Kibana
~~~~~~~~~~~~~~

#. Run the following command to install Kibana.

   .. tabs::

     .. group-tab:: Yum

       .. code-block:: console
       
         # yum install -y ./opendistro-kibana-packages/opendistroforelasticsearch-kibana-1.13.2-linux-x64.rpm

     .. group-tab:: APT

       .. code-block:: console
       
         # apt install -y ./opendistro-kibana-packages/opendistroforelasticsearch-kibana_1.13.2_amd64.deb

     .. group-tab:: ZYpp

       .. code-block:: console
       
         # zypper install -y ./opendistro-kibana-packages/opendistroforelasticsearch-kibana-1.13.2-linux-x64.rpm

#. Move a copy of the configuration files.

     .. tabs::

       .. group-tab:: Yum

         .. code-block:: console
         
           # \cp ./opendistro_files/kibana/kibana.yml /etc/kibana/

       .. group-tab:: APT

         .. code-block:: console
         
           # cp ./opendistro_files/kibana/kibana.yml /etc/kibana/

       .. group-tab:: ZYpp

         .. code-block:: console
         
           # cp ./opendistro_files/kibana/kibana.yml /etc/kibana/

    .. note::
      ``server.host: 0.0.0.0`` in ``/etc/kibana/kibana.yml`` means that Kibana can be accessed from the outside and accepts all the available IPs of the host. This value can be changed for a specific IP if needed.
  
#. Create the ``/usr/share/kibana/data`` directory:

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/data

#. Replace ``/path/to/installation/folder`` with your actual path to the installation folder in the following command and run it to install the Wazuh Kibana plugin:

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console

            # /usr/share/kibana/bin/kibana-plugin install --allow-root file:///path/to/installation/folder/wazuh_files/kibana/wazuh_kibana.zip

      .. group-tab:: APT

        .. code-block:: console

            # cd /usr/share/kibana
            # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/to/installation/folder/wazuh_files/kibana/wazuh_kibana.zip

      .. group-tab:: ZYpp

        .. code-block:: console

            # cd /usr/share/kibana
            # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/to/installation/folder/wazuh_files/kibana/wazuh_kibana.zip

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

..
  Next steps
  ----------

  Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :ref:`Wazuh agent<installation_agents>` section.
