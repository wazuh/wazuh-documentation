.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to install Wazuh through an unattended installation using an automated script in this section of our documentation. 

.. _unattended_all_in_one:
  
Unattended installation
=======================

You can install Wazuh on a single host by using a script that automatically detects whether the operating system uses ``rpm`` or ``deb`` packages.

The script performs a health check to verify that the available system resources meet the minimal requirements. For more information, check the :ref:`Requirements <installation_requirements>` section.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands. The ``curl`` package is used to download the script. 


#. Run the following command:

   .. code-block:: console

     # curl -so ~/wazuh_install.sh https://packages.wazuh.com/wazuh_install/4.2/wazuh_install.sh && bash ~/wazuh_install.sh -a

   The script performs a health check to ensure that the host has enough resources to guarantee proper performance. To skip this step, add the ``-i`` or ``--ignore-healthcheck`` option when running the script.

   After executing the script, the output prompts a message confirming that the installation was successful. The passwords for the different OpenDistro users are stored in a file called passwords_file.yml inside configurations.tar, alongside the certificates for each component. 
   
   .. code-block:: none
     :class: output

      20/01/2022 15:55:50 INFO: You can access the web interface https://<kibana-host-ip>. The credentials are admin:SAADOlRN5FQ9AjgZXJqxAArrvmGVrP4z
      20/01/2022 15:55:50 INFO: The Wazuh repository set to production.
      20/01/2022 15:55:50 INFO: Installation finished.

#. Access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: wazuh
      password: <wazuh_user_password>

On the first access to Kibana, the browser displays a warning message indicating that the certificate was not issued by a trusted authority. It is possible to add an exception in the browser's advanced options or, for increased security, the previously generated ``root-ca.pem`` file can be imported into the certificate manager of the browser. Alternatively, it is possible to configure a certificate from a trusted authority.

Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. This means that Kibana can be accessed from the outside and accepts all the available IP addresses of the host. This value can be changed for a specific IP address if needed.

To uninstall the components of the all-in-one installation, you can use the option ``-u / --uninstall`` to remove all the components installed.
 
Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To learn how to install agents, check the :ref:`Wazuh agent<installation_agents>` section.
