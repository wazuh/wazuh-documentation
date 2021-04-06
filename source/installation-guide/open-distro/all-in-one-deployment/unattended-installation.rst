.. Copyright (C) 2021 Wazuh, Inc.

Unattended installation
=======================

You can install Wazuh on a single host by using a script that automatically detects whether the operating system uses ``rpm`` or ``deb`` packages.
The script performs a health check to verify that the available system resources meet the minimal requirements. For more information, check the :ref:`requirements <installation_requirements>` section.

The script installs Java Development Kit and other packages including ``unzip`` and ``libcap`` required by Open Distro for Elasticsearch. Besides, the Search Guard offline TLS tool is used to generate the certificates for protecting data in the Elastic Stack.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands. The ``curl`` package is used to download the script. 


#. Run the script:

   .. code-block:: console

     # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/|WAZUH_LATEST_MINOR|/resources/open-distro/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

   The script performs a health check to ensure that the host has enough resources to guarantee the proper performance. To skip this step, add the ``-i`` or ``--ignore-healthcheck`` option when running the script.

   After executing the script, a message is shown to confirm that the installation was successful.

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

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is removed during the installation since it might have a negative impact on system resources. 

Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. This means that Kibana can be accessed from the outside and accepts all the available IPs of the host.  This value can be changed for a specific IP if needed.

It is highly recommended to change Elasticsearch default passwords for the user's found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. For more information on Elasticsearch configuration and passwords, check the :ref:`Elasticsearch tuning <change_elastic_pass>` section.
 
Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. To find out how to install agents and learn about supported operating systems, check the :ref:`Wazuh agent<installation_agents>` section.