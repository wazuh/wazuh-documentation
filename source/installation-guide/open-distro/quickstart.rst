.. Copyright (C) 2020 Wazuh, Inc.

Quickstart
==========

This section will explain how to install Wazuh on a single host by using a script that will automatically detect whether the operating system uses ``rpm`` or ``deb`` packages. The script will perform a health-check verifying that the available system resources meet the minimal requirements. 

The script will install Java Development Kit and other packages including ``unzip`` and ``libcap`` required by Open Distro for Elasticsearch. Besides, the Search Guard offline TLS tool will be used to generate the certificates for protecting data in the Elastic Stack.

.. note:: Alternatively, if you wish to do this all-in-one deployment manually, you can find detailed instructions :ref:`here <all_in_one>`. 

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


Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.


#. Download and run the script:

   .. code-block:: console

    # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/open-distro/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

   The script will perform an health-check to ensure that the host has enough resources to guarantee the proper performance. This can be skipped adding the option ``-i`` or ``--ignore-healthcheck`` when running the script.

   After the execution of the script, it will show the following messages to confirm that the installation was successful:

   .. code-block:: none
     :class: output
     
     Starting the installation...
     Installing all necessary utilities for the installation...
     Done
     Adding the Wazuh repository...
     Done
     Installing the Wazuh manager...
     Done
     Wazuh-manager started
     Installing Open Distro for Elasticsearch...
     Done
     Configuring Elasticsearch...
     Certificates created
     Elasticsearch started
     Initializing Elasticsearch...
     Done
     Installing Filebeat...
     Filebeat started
     Done
     Installing Open Distro for Kibana...
     Kibana started
     Done
     Checking the installation...
     Elasticsearch installation succeeded.
     Filebeat installation succeeded.
     Initializing Kibana (this may take a while)
     ########
     Installation finished


#. Access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: admin
      password: admin


Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 


Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. It means that Kibana can be accessed from the outside and will accept all the available IPs of the host.  This value can be changed for a specific IP if needed.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

Once Kibana is running it is necessary to assign each user its corresponding role. To learn more visit the :ref:`Setting up the Wazuh Kibana plugin <connect_kibana_app>` section. 




Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.


Uninstall
---------

In case you need to uninstall the Wazuh components follow the instructions below:  


Uninstall the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst




Uninstall Filebeat
^^^^^^^^^^^^^^^^^^

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: ZYpp  


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst




Uninstall Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst



Uninstall Kibana
^^^^^^^^^^^^^^^^

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_kibana.rst   
