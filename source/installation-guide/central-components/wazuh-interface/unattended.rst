.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_interface_unattended_installation:

Installing the Wazuh interface in unattended mode
=================================================

The Wazuh interface is a flexible and intuitive web interface, based on Kibana, for mining and visualizing the events and archives.

Install Wazuh interface
-----------------------

You can install and configure the Wazuh interface using an automated script. 


#. Download the script. Skip this step if you are installing the Wazuh interface on the same server as the Wazuh indexer. 

    .. code-block:: console

      # curl -so ./unattended-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/unattended-installation/unattended-installation.sh


#. Replace ``node_name`` by the instance name and run the script. 
   
   ``node_name`` must be the same used in ``config.yml`` for the certificate creation, e.g. ``kibana``.

    .. code-block:: console

      # sudo bash ~/elastic-stack-installation.sh -k -kn <node_name>

    
    Options available when running the script:

    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | Options                       | Purpose                                                                                                        |
    +===============================+================================================================================================================+
    | -k / --install-kibana         | It installs Kibana. Must be used with option -kname <node-name>.                                               |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -kn / --kibana-node-name      | It indicates the name of the Kibana instance.                                                                  |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -o / --overwrite              | It Overwrites the existing installation.                                                                       |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -r / --uninstall              | It removes the installation.                                                                                   |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -v / --verbose                | It shows the complete installation output.                                                                     |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -i / --ignore-health-check    | It ignores the health check.                                                                                   |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -h / --help                   | It shows help.                                                                                                 |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    

    
#. Access the Wazuh web interface with your credentials. 

    - URL: *https://<server_ip>*
    - **Username**: *wazuh*
    - **Password**: *<wazuh_password>*
  


    When you access the Wazuh interface for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Next steps
----------

The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent<installation_agents>` section.




