.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Kibana in unattended mode, a flexible and intuitive web interface for mining and visualizing the events and archives. 


.. _wazuh_dashboard_unattended_installation:

Installing Kibana in unattended mode
====================================

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives.

Install Kibana
--------------

You can install and configure Kibana using an automated script. 


#. Download the script. Skip this step if you are installing Kibana on the same server as Elasticsearch. 

    .. code-block:: console

      # curl -so ./unattended-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/unattended-installation/unattended-installation.sh


#. Replace ``node_name`` with the instance name and run the script. 
   
   The ``node_name`` must be the same used in ``config.yml`` for the certificate creation, e.g. ``kibana``.

    .. code-block:: console

      # sudo bash ~/elastic-stack-installation.sh -k -kn <node_name>

    
    Options available when running the script:

    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | Options                       | Purpose                                                                                                        |
    +===============================+================================================================================================================+
    | -k / --install-kibana         | Installs Kibana. Must be used with option ``-kname <node-name>``.                                              |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -kn / --kibana-node-name      | Indicates the name of the Kibana instance.                                                                     |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -o / --overwrite              | Overwrites the existing installation.                                                                          |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -r / --uninstall              | Removes the installation.                                                                                      |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -v / --verbose                | Shows the complete installation output.                                                                        |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -i / --ignore-health-check    | Ignores the health check.                                                                                      |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -h / --help                   | Shows *help*.                                                                                                  |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    

    
#. Access the Wazuh web interface with your credentials. 

     - URL: *https://<server_ip>*
     - **Username**: *wazuh*
     - **Password**: *<wazuh_password>*
  

    When you access Kibana for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete2.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.
