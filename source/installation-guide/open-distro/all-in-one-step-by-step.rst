.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh and Elastic Stack on a single host

:orphan:

.. _all_in_one:

Step-by-step installation
=========================

This document guides through the installation of the Wazuh and Open Distro for Elasticsearch components in an all-in-one deployment. This deployment type is meant for small production environments and testing purposes. 

This guide provides instructions to configure the official repositories to do the installations, alternatively, the installation can be done using packages. A list of all the available packages can be found :ref:`here <packages>`. 

Requirements
------------

The Wazuh server and Elastic Stack components can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 7 or greater.

- Fedora 31 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 12 or greater.

In an all-in-one deployment, Wazuh server and Elastic Stack, are installed on the same host. This type of deployment is suitable for testing and small production environments. A typical use case for this type of environment supports around 100 agents.  

The minimum requirements for this type of deployment are 4 GB of RAM and 2 CPU cores and the recommended are 16 GB of RAM and 8 CPU cores. A 64-bit operating system is necessary. 

Disk space requirements depend on the alerts per second (APS) generated. The expected APS vary greatly depending on the amount and type of monitored endpoints, the following table provides an estimate of the storage per agent needed for 90 days of alerts depending on the type of monitored endpoint.

+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS |  Storage (GB/90 days)       | 
+=================================================+=====+=============================+
| Servers                                         | 0.25|    3.8                      |     
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |    1.5                      |                   
+-------------------------------------------------+-----+-----------------------------+       
| Network devices                                 | 0.5 |    7.6                      |
+-------------------------------------------------+-----+-----------------------------+

For example for an environment with 80 workstations, 10 servers and 10 networks devices the storage needed for 90 days of alerts would be around 236 GB.


.. _all_in_one_elastic:

Prerequisites
-------------

.. note:: Root user privileges are required to run all the commands described below.

Open Distro for Elasticsearch requires the Java Development Kit and other packages installation including ``wget``, ``curl``, ``unzip``, and ``libcap`` that will be used in further steps:

.. include:: ../../_templates/installations/before_installation_all_in_one.rst


.. _all_in_one_wazuh:

Installing Wazuh
----------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API and Filebeat. 

The first step to set up Wazuh is to add the Wazuh repository to the server.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst    



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service:

    .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst    


Installing Elasticsearch
------------------------

Open Distro for Elasticsearch is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features. 

.. include:: ../../_templates/installations/elastic/common/install_elastic.rst


Configuring Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch_all_in_one.rst


Certificates creation
~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../_templates/installations/elastic/common/remove_demo_certs.rst


#. Generate and deploy the certificates:

    .. include:: ../../_templates/installations/elastic/common/certificates-aio.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster:

  .. code-block:: console

    # /usr/share/elasticsearch/plugins/opendistro_security/tools/securityadmin.sh -cd /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key

Run the following command to ensure that the installation has been successful:

.. code-block:: console

  # curl -XGET https://localhost:9200 -u admin:admin -k

An example response should look as follows:

.. code-block:: none
             :class: output

              {
                "name" : "node-1",
                "cluster_name" : "elasticsearch",
                "cluster_uuid" : "2gIeOOeUQh25c2yU0Pd-RQ",
                "version" : {
                  "number" : "7.9.1",
                  "build_flavor" : "oss",
                  "build_type" : "rpm",
                  "build_hash" : "083627f112ba94dffc1232e8b42b73492789ef91",
                  "build_date" : "2020-09-01T21:22:21.964974Z",
                  "build_snapshot" : false,
                  "lucene_version" : "8.6.2",
                  "minimum_wire_compatibility_version" : "6.8.0",
                  "minimum_index_compatibility_version" : "6.0.0-beta1"
                },
                "tagline" : "You Know, for Search"
              }
  


.. _wazuh_server_packages_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the pre-configured Filebeat configuration file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/open-distro/filebeat/7.x/filebeat_all_in_one.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Copy the Elasticsearch certificates into ``/etc/filebeat/certs``:

    .. code-block:: console

      # mkdir /etc/filebeat/certs
      # cp /etc/elasticsearch/certs/root-ca.pem /etc/filebeat/certs/
      # mv /etc/elasticsearch/certs/filebeat* /etc/filebeat/certs/

#. Enable and start the Filebeat service:

    .. include:: ../../_templates/installations/elastic/common/enable_filebeat.rst


To ensure that Filebeat has been successfully installed, run the following command:

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
                version: 7.9.1

Installing Kibana
-----------------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

#. Install the Kibana package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_kibana.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_kibana.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/elastic/zypp/install_kibana.rst



#. Download the Kibana configuration file:

    .. include:: ../../_templates/installations/elastic/common/configure_kibana_all_in_one.rst

#. Update the ``optimize`` and ``plugins`` directories permissions:

    .. code-block:: console
    
      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh Kibana plugin. The installation of the plugin must be done from the Kibana home directory as follows:

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.0.3_7.9.1-1.zip

#. Copy the Elasticsearch certificates into ``/etc/kibana/certs``:

    .. code-block:: console

      # mkdir /etc/kibana/certs
      # cp /etc/elasticsearch/certs/root-ca.pem /etc/kibana/certs/
      # mv /etc/elasticsearch/certs/kibana* /etc/kibana/certs/

#. Link Kibana's socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

#. Access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: admin
      password: admin

Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.

Once Kibana is running it is necessary to assign each user its corresponding role. To learn more visit the :ref:`Setting up the Wazuh Kibana plugin <connect_kibana_app>` section. 


Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.

Uninstall
---------

In case you need to uninstall the Wazuh components follow the instructions below:  


Uninstall the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst




Uninstall Filebeat
~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: ZYpp  


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst




Uninstall Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst




Uninstall Kibana
~~~~~~~~~~~~~~~~


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_kibana.rst   
