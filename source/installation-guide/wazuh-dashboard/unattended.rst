.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Kibana in unattended mode, a flexible and intuitive web interface for mining and visualizing the events and archives. 


.. _wazuh_dashboard_unattended_installation:

Installing the Wazuh dashboard in unattended mode
=================================================

Install and configure the Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives.

Wazuh dashboard installation
-----------------------------

You can install and configure the Wazuh dashboard using an automated script. 


#. Download the script. This step can be skipped if you have already installed Wazuh indexer on the same server.

    .. code-block:: console

      # curl -sO https://packages.wazuh.com/resources/wazuh_install.sh


#. Run the script with the option for installing Wazuh dashboard.
   
    .. code-block:: console

      # bash ./wazuh_install.sh -D

    
    Options available when running the script:

    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | Options                                         | Purpose                                                                                                        |
    +=================================================+================================================================================================================+
    | -D / --wazuh-dashboard                          | Installs the Wazuh dashboard.                                                                                  |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -o / --overwrite                                | Overwrites the existing installation.                                                                          |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -r / --uninstall                                | Removes the installation.                                                                                      |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -v / --verbose                                  | Shows the complete installation output.                                                                        |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -i / --ignore-health-check                      | Ignores the health check.                                                                                      |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -l / --local                                    | Use local files.                                                                                               |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+ 
    | -d / --development                              | Use development repository.                                                                                    |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -h / --help                                     | Shows *help*.                                                                                                  |
    +-------------------------------------------------+----------------------------------------------------------------------------------------------------------------+        

#. Access the Wazuh web interface with your credentials. 

     - URL: *https://<server_ip>*
     - **Username**: *wazuh*
     - **Password**: *<wazuh_password>*
  

    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.
