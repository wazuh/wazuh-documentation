.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This section guides you through an installation of the Wazuh server and Elastic Stack components in an all-in-one configuration. 

.. _basic_all_in_one:

All-in-one deployment
=====================

This document guides through an installation of the Wazuh server and Elastic Stack components in an all-in-one configuration. This guide provides instructions to configure the official repositories to do the installations, alternatively, all the available packages can be found :doc:`here </installation-guide/packages-list>`.

.. note:: You need root user privileges to run all the commands described below.

Installing prerequisites
------------------------

Some extra packages are needed for the installation, such as ``curl`` or ``unzip``, which will be used in further steps. However, this step can be skipped if ``curl`` and ``unzip`` are already installed on the server. 

.. include:: ../../../_templates/installations/basic/before_installation_all_in_one.rst

.. _basic_all_in_one_elastic:

Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine.  


Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/basic/elastic/deb/add_repository.rst



Elasticsearch installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Elasticsearch package:

    .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

           # yum install elasticsearch-7.17.9


      .. group-tab:: APT

         .. code-block:: console

           # apt-get install elasticsearch=7.17.9


#. Download the configuration file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

   .. code-block:: console

     # curl -so /etc/elasticsearch/elasticsearch.yml https://packages.wazuh.com/4.4/tpl/elastic-basic/elasticsearch_all_in_one.yml


Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Download the configuration file for creating the certificates:

    .. code-block:: console

        # curl -so /usr/share/elasticsearch/instances.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/tpl/elastic-basic/instances_aio.yml
    
    
    In the following steps, a file that contains a folder named after the instance defined here will be created. This folder will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

#. The certificates can be created using the elasticsearch-certutil tool:

    .. code-block:: console

        # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

#. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. 

    .. code-block:: console

        # unzip ~/certs.zip -d ~/certs

#. The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the CA file, the certificate and the key there:

    .. code-block:: console

        # mkdir /etc/elasticsearch/certs/ca -p
        # cp -R ~/certs/ca/ ~/certs/elasticsearch/* /etc/elasticsearch/certs/
        # chown -R elasticsearch: /etc/elasticsearch/certs
        # chmod -R 500 /etc/elasticsearch/certs
        # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
        # rm -rf ~/certs/ ~/certs.zip
   
#. Enable and start the Elasticsearch service:

    .. include:: ../../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: ../../../_templates/installations/basic/elastic/common/generate_elastic_credentials.rst

To check that the installation was made successfully, run the following command replacing ``<elastic_password>`` with the password generated in the previous step for ``elastic`` user:


.. code-block:: console
  
  # curl -XGET https://localhost:9200 -u elastic:<elastic_password> -k

This command should have an output like this:

.. code-block:: console
   :class: output
   
   {
     "name" : "elasticsearch",
     "cluster_name" : "elasticsearch",
     "cluster_uuid" : "CFw_rkxnR7avI7pBv9MvtQ",
     "version" : {
       "number" : "7.17.9",
       "build_flavor" : "default",
       "build_type" : "rpm",
       "build_hash" : "ef48222227ee6b9e70e502f0f0daa52435ee634d",
       "build_date" : "2023-01-31T05:34:43.305517834Z",
       "build_snapshot" : false,
       "lucene_version" : "8.11.1",
       "minimum_wire_compatibility_version" : "6.8.0",
       "minimum_index_compatibility_version" : "6.0.0-beta1"
     },
     "tagline" : "You Know, for Search"
   }  

.. _basic_all_in_one_wazuh:

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step in setting up Wazuh is to add the Wazuh repository to the server. Alternatively, the Wazuh manager package can be downloaded directly, and compatible versions can be checked :doc:`here </installation-guide/packages-list>`.


Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::
  

  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/basic/wazuh/yum/add_repository_aio.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/basic/wazuh/deb/add_repository_aio.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../../_templates/installations/basic/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../../_templates/installations/basic/wazuh/deb/install_wazuh_manager.rst



#. Enable and start the Wazuh manager service:

    .. include:: ../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_manager.rst    

.. _basic_wazuh_server_packages_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../_templates/installations/basic/elastic/yum/install_filebeat.rst    



      .. group-tab:: APT


        .. include:: ../../../_templates/installations/basic/elastic/deb/install_filebeat.rst



#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/tpl/elastic-basic/filebeat_all_in_one.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/|WAZUH_CURRENT_MINOR|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml`` and add the following line:

    .. include:: ../../../_templates/installations/basic/elastic/common/configure_filebeat_aio.rst


#. Copy the certificates into ``/etc/filebeat/certs/``

    .. code-block:: console

        # cp -r /etc/elasticsearch/certs/ca/ /etc/filebeat/certs/
        # cp /etc/elasticsearch/certs/elasticsearch.crt /etc/filebeat/certs/filebeat.crt
        # cp /etc/elasticsearch/certs/elasticsearch.key /etc/filebeat/certs/filebeat.key

      

#. Enable and start the Filebeat service:

    .. include:: ../../../_templates/installations/basic/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

      # filebeat test output


This command should have an output like this:

.. code-block:: console
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
     version: 7.17.9

Kibana installation and configuration
-------------------------------------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../_templates/installations/basic/elastic/yum/install_kibana.rst    



        .. group-tab:: APT


            .. include:: ../../../_templates/installations/basic/elastic/deb/install_kibana.rst



#. Copy the Elasticsearch certificates into the Kibana configuration folder:

    .. include:: ../../../_templates/installations/basic/elastic/common/copy_certificates_kibana_elastic_server.rst

#. Download the Kibana configuration file:

    .. include:: ../../../_templates/installations/basic/elastic/common/configure_kibana_all_in_one.rst

#. Create the ``/usr/share/kibana/data`` directory:

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana

#. Install the Wazuh Kibana plugin. The installation of the plugin must be done from the Kibana home directory as follows:

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_|ELASTICSEARCH_ELK_LATEST|-1.zip

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../../_templates/installations/basic/elastic/common/enable_kibana.rst


#. Access the web interface using the password generated during the Elasticsearch installation process: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: elastic
      password: <PASSWORD_elastic>


 Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``ca.crt`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 


Disabling repositories
----------------------

.. include:: ../../../_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/basic/wazuh/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/basic/wazuh/deb/disabling_repositories.rst



To uninstall all the components of the all in one installation, visit the :doc:`uninstalling section </user-manual/uninstall/elastic-stack>`.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. The :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>` is available for most operating systems.
