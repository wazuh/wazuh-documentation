.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn how to install Wazuh through an unattended installation using an automated script in this section of our documentation. 

.. _unattended_all_in_one:
  
Unattended installation
=======================

You can install Wazuh on a single host by using a script that automatically detects whether the operating system uses ``rpm`` or ``deb`` packages.
The script performs a health check to verify that the available system resources meet the minimal requirements. For more information, check the :ref:`Requirements <installation_requirements>` section.

The script installs some packages, including ``unzip`` and ``libcap``, required by Open Distro for Elasticsearch.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands. The ``curl`` package is used to download the script. 


#. Run the following command:

   .. code-block:: console

     # curl -so ~/unattended-installation.sh https://packages.wazuh.com/resources/4.2/open-distro/unattended-installation/unattended-installation.sh && bash ~/unattended-installation.sh

   The script performs a health check to ensure that the host has enough resources to guarantee proper performance. To skip this step, add the ``-i`` or ``--ignore-healthcheck`` option when running the script.

   After executing the script, the output prompts all the users' passwords and a message confirms that the installation was successful.
   
   .. code-block:: none
     :class: output

      
      The password for wazuh is kFadROYxhYtdf9xIj1DLJCPv17cEC5aA

      The password for admin is OR87JPhrka5aMqvMBFaayAVL21fG9tLE

      The password for kibanaserver is XyRPZ_W0a5pyIeNFPe5tNhwYa8FEKRe1

      The password for kibanaro is G1KE3SLRhHTsIOvEtyQQQwjU6vwYwVi2

      The password for logstash is W9PwiGBlqInwdDihRf6cSe4HXO4_K0BO

      The password for readall is 89QTrCYQoNf-aLm3z98fJEscWectExgo

      The password for snapshotrestore is jYfMpPHut-YDKumClMfevMowcGrSGiGS

      The password for wazuh_admin is -2Lji-eRlPt7EmShlfhBr3BYzvIk_QgG

      The password for wazuh_user is pMhLa2ONXvsX9TQyrlTINedEZ6mQ7nHE

      11/17/2021 09:37:48 WARNING: Passwords changed. Remember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services.
      11/17/2021 09:09:07 INFO: Checking the installation...
      11/17/2021 09:09:08 INFO: Elasticsearch installation succeeded.
      11/17/2021 09:09:08 INFO: Filebeat installation succeeded.
      11/17/2021 09:09:08 INFO: Initializing Kibana (this may take a while)
      ...
      11/17/2021 09:09:20 INFO: Installation finished
      11/17/2021 09:09:20 INFO: You can access the web interface https://<kibana_ip>. The credentials are wazuh:kFadROYxhYtdf9xIj1DLJCPv17cEC5aA

#. Access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: wazuh
      password: <wazuh_user_password>

On the first access to Kibana, the browser displays a warning message indicating that the certificate was not issued by a trusted authority. It is possible to add an exception in the browser's advanced options or, for increased security, the previously generated ``root-ca.pem`` file can be imported into the certificate manager of the browser. Alternatively, it is possible to configure a certificate from a trusted authority.

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is removed during the installation since it might have a negative impact on system resources. 

Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. This means that Kibana can be accessed from the outside and accepts all the available IP addresses of the host. This value can be changed for a specific IP address if needed.

To uninstall the components of the all-in-one installation, you can use the option ``-r / --uninstall`` to remove all the components installed.
 
Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To learn how to install agents, check the :ref:`Wazuh agent<installation_agents>` section.
