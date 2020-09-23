.. Copyright (C) 2020 Wazuh, Inc.

Unattended installation
=======================

This section will explain how to install Wazuh on a single host by using a script that will automatically detect whether the operating system uses ``rpm`` or ``deb`` packages.
The script will perform a health-check verifying that the available system resources meet the minimal requirements. For more information, please visit the :ref:`requirements <installation_requirements>` section.

The script will install Java Development Kit and other packages including ``unzip`` and ``libcap`` required by Open Distro for Elasticsearch. Besides, the Search Guard offline TLS tool will be used to generate the certificates for protecting data in the Elastic Stack.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.


Download and run the script:

.. code-block:: console

    # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

The script will perform an health-check to ensure that the host has enough resources to guarantee the proper performance. This can be skipped adding the option ``-i`` or ``--ignore-healthcheck`` when running the script:

.. code-block:: console


  # bash all-in-one-installation.sh -i    

After the execution of the script, it will show the following messages to confirm that the install was made successfully:

.. code-block:: none
  :class: output

  # Elasticsearch installation succeeded.
  # Filebeat installation succeeded.
  # Initializing Kibana (this may take a while)
  # ##################
  # Installation finished


Once Kibana is accessible, the script will quit.

.. note:: The Kibana service listens to the default port ``443``. The browser address is: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` with the Kibana server IP. The default user and password to access Kibana is ``admin``.


Elasticsearch users and roles
-----------------------------

In order to use Wazuh Kibana plugin properly, the script adds the following extra Elasticsearch users:

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_user                          | Is created for those users that only need read access to the Wazuh Kibana plugin.                                                                                                                                                                                                        |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_admin                         | Is the user recommended for those users that need administrative privileges.                                                                                                                                                                                                             |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Also three extra roles are added, these roles are in charge of giving the right permissions to the users:

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui                            | This role gives enough privileges to ``kibanaserver`` user to operate with the Wazuh’s indices. This user is one of the Open Distro for Elasticsearch default users and its purpose is to perform tasks such as making cluster-wide searches, indexing monitoring, or writing in indices.|
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui_user                       | This role provides ``wazuh_user`` permissions to read the Wazuh’s indices.                                                                                                                                                                                                               | 
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui_admin                      | This role allows ``wazuh_admin`` to perform reading, writing, management and, indexing tasks on the Wazuh indices.                                                                                                                                                                       |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

These users and roles are designed to operate along with the Wazuh Kibana plugin and they are protected so they cannot be modified from the Kibana’s interface. To modify them or add new users or roles, the ``securityadmin`` script has to be run.

Customizing the installation
----------------------------

After the installation, the Wazuh API will use the default credentials but it is highly recommended to change them. The following document :ref:`securing_api` explains how to change the default user and password among other useful API security information.

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. It means that Kibana can be accessed from the outside and will accept all the available IPs of the host.  This value can be changed for a specific IP if needed.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``root-ca.pem``, found in the ``/etc/kibana/certs`` directory, to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
