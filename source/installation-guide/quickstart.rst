.. Copyright (C) 2021 Wazuh, Inc.


.. _quickstart:

Quickstart
==========

This part of the documentation explains how to install Wazuh on a single host by using a script that will automatically detect whether the operating system uses ``rpm`` or ``deb`` packages.
The script will perform a health-check verifying that the available system resources meet the minimal requirements. For more information, please visit the :ref:`requirements <installation_requirements>` section.

The script will install Java Development Kit and other packages including ``unzip`` and ``libcap`` required by Open Distro for Elasticsearch. Besides, the Search Guard offline TLS tool will be used to generate the certificates for protecting data in the Elastic Stack.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands described below. The ``curl`` package will be used to download the script. 


#. Download and run the script:

   .. code-block:: console

     # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/|WAZUH_LATEST_MINOR|/resources/open-distro/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

   The script will perform a health-check to ensure that the host has enough resources to guarantee the proper performance. To skip this step, add the ``-i`` or ``--ignore-healthcheck`` option when running the script.

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

On the first access to Kibana, the browser displays a warning message indicating that the certificate was not issued by a trusted authority. It is possible to add an exception in the browser's advanced options or, for increased security, the file previously generated ``root-ca.pem``  file  can be imported into the certificate manager of the browser. Alternatively, it is possible to configure a certificate from a trusted authority.

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is removed during the installation since it may have a negative impact on system resources. 

Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. This means that Kibana can be accessed from the outside and will accept all the available IPs of the host.  This value can be changed for a specific IP if needed.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.
 
To uninstall all the components of the all in one installation, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_open_distro>`.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. To find out more, visit :ref:`the Wazuh agent installation guide<installation_agents>`, available for most operating systems.
