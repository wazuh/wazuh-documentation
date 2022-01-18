.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to install Wazuh on a single host by using a script that will automatically detect whether the operating system uses rpm or deb packages.
  
Unattended installation
=======================

This section will explain how to install Wazuh on a single host by using a script that will automatically detect whether the operating system uses ``rpm`` or ``deb`` packages.
The script will perform a health-check verifying that the available system resources meet the minimal requirements. For more information, please visit the :ref:`requirements <installation_requirements>` section.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.

#. Download and run the script:

   .. code-block:: console

     # curl -so ~/all-in-one-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/elastic-stack/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

   The script will perform a health-check to ensure that the host has enough resources to guarantee the proper performance. This can be skipped adding the option ``-i`` or ``--ignore-healthcheck`` when running the script.  

   After the execution of the script, it will show the following messages to confirm that the installation was successful. Save the password for the ``elastic`` user since this will be needed to access Kibana:



   .. code-block:: none
     :class: output
     :emphasize-lines: 41

      Installing Elasticsearch...
      Done
      Configuring Elasticsearch...
      Certificates created
      Elasticsearch started
      Initializing Elasticsearch...(this may take a while)
      #
      Generating passwords...
      Done
      Installing Filebeat...
      Filebeat started
      Done
      Installing Kibana...
      Kibana started
      Done
      Checking the installation...
      Elasticsearch installation succeeded.
      Filebeat installation succeeded.
      Initializing Kibana (this may take a while)
      ############
      During the installation of Elasticsearch the passwords for its user were generated. Please take note of them:
      Changed password for user apm_system
      PASSWORD apm_system = fmxX8f2mmvwr1tYWI7oV
    
      Changed password for user kibana_system
      PASSWORD kibana_system = oRQFFsII9ASwdCxNcxav
    
      Changed password for user kibana
      PASSWORD kibana = oRQFFsII9ASwdCxNcxav
    
      Changed password for user logstash_system
      PASSWORD logstash_system = VK2A7OATwLVYWd69s1FI
    
      Changed password for user beats_system
      PASSWORD beats_system = YK9Jsjwip68duJeiuiTo
    
      Changed password for user remote_monitoring_user
      PASSWORD remote_monitoring_user = rflSfdb67niYzgPHCF9r
    
      Changed password for user elastic
      PASSWORD elastic = t7gevllM04kYX7FwnObQ
    
      Installation finished


#. Access the web interface using the password generated during the installation process: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: elastic
      password: <PASSWORD_elastic>


  Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured.


Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. It means that Kibana can be accessed from the outside and will accept all the available IP addresses of the host.  This value can be changed for a specific IP address if needed.

To uninstall all the components of the all in one installation, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_basic>`.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
