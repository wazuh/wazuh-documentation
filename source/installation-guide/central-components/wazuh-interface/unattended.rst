.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_interface_unattended_installation:

Installing Wazuh interface in unattended mode
=============================================

You can install the Wazuh interface using an automated script. This script performs a health check to verify that the system has enough resources to achieve optimal performance.

For more information on system resources, see the :ref:`Requirements <installation_requirements>` section.


.. note:: Root user privileges are required to run all the commands. To download the script, the package ``curl`` is used.


#. Download the script. Skip this step if you are installing the Wazuh interface on the same server as the Wazuh indexer. 

    .. code-block:: console

      # curl -so ~/elastic-stack-installation.sh https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/open-distro/unattended-installation/distributed/elastic-stack-installation.sh

#. Replace ``node_name`` by the instance name and run the script. 
   
   ``node_name`` must be the same used in ``config.yml`` for the certificate creation, e.g. ``kibana``.

    .. code-block:: console

      # bash ~/elastic-stack-installation.sh -k -n <node_name>

    
    Options available for you to use when running the script:

    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | Options                       | Purpose                                                                                                        |
    +===============================+================================================================================================================+
    | -k / --install-kibana         | It installs Open Distro for Kibana. It cannot be used together with option ``-e``.                             |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -n / --node-name              | It indicates the name of the instance.                                                                         |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -d / --debug                  | It shows the complete installation output.                                                                     |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -i / --ignore-healthcheck     | It ignores the health check.                                                                                   |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    | -h / --help                   | It shows help.                                                                                                 |
    +-------------------------------+----------------------------------------------------------------------------------------------------------------+
    
    
#. Access the web interface: 

    .. code-block:: none

      URL: https://<kibana_ip>
      user: admin
      password: admin  
  

Upon the first access to the Wazuh interface, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 

.. note:: If the Wazuh interface is accessed before installing the Wazuh server, it indicates that it cannot establish a connection with the Wazuh API. Proceed with the Wazuh server installation to remediate this.

If you need to uninstall Elasticsearch and Kibana, visit the :ref:`Uninstalling <user_manual_uninstall_wazuh_installation_open_distro>` section.



