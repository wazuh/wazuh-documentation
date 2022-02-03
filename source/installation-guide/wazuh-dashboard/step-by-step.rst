.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. _wazuh_dashboard_step_by_step:

Installing the Wazuh dashboard in step-by-step mode
===================================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing the Wazuh server alerts and archived events.

.. note:: Root user privileges are required to run the commands described below.

Wazuh dashboard installation
----------------------------

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    If you are installing Wazuh dashboard on the same host as the Wazuh indexer or the Wazuh server, you may skip these steps as you may have added the Wazuh repository already.

  .. tabs::
  
    .. group-tab:: Yum
  
  
      .. include:: /_templates/installations/common/yum/add-repository.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: /_templates/installations/common/deb/add-repository.rst
  
  
  
    .. group-tab:: Zypp
  
  
      .. include:: /_templates/installations/common/yum/add-repository.rst
  
  

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Install the Wazuh dashboard package.

      .. tabs::

          .. group-tab:: Yum


              .. include:: /_templates/installations/dashboard/yum/install_dashboard.rst



          .. group-tab:: APT


              .. include:: /_templates/installations/dashboard/apt/install_dashboard.rst



          .. group-tab:: Zypp


              .. include:: /_templates/installations/dashboard/zypp/install_dashboard.rst



Configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Edit the ``/etc/wazuh-dashboard/dashboard.yml`` file.

      .. code-block:: yaml

         server.host: 0.0.0.0
         server.port: 443
         opensearch.hosts: https://localhost:9700
         opensearch.ssl.verificationMode: certificate
         opensearch.username: kibanaserver
         opensearch.password: kibanaserver
         opensearch.requestHeadersWhitelist: ["securitytenant","Authorization"]
         opensearch_security.multitenancy.enabled: false
         opensearch_security.readonly_mode.roles: ["kibana_read_only"]
         server.ssl.enabled: true
         server.ssl.key: "/etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem"
         server.ssl.certificate: "/etc/wazuh-dashboard/certs/wazuh-dashboard.pem"
         opensearch.ssl.certificateAuthorities: ["/etc/wazuh-dashboard/certs/root-ca.pem"]
         logging.dest: "/var/log/wazuh-dashboard/wazuh-dashboard.log"
         uiSettings.overrides.defaultRoute: /app/wazuh?security_tenant=global



      - By default, the Wazuh dashboard only listens on the loopback interface (localhost), which means that it can be only accessed from the same host. To access the Wazuh dashboard from the outside it may be configured to listen on its network IP by replacing ``<kibana_ip>`` with Wazuh dashboard's host IP. The value ``0.0.0.0`` will accept all the available IPs of the host.

      - ``opensearch.hosts``: the host's IP. In case of having more than one Wazuh indexer node, the Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The IPs of the nodes can be separated with commas. Eg. ``["https://10.0.0.2:900", "https://10.0.0.3:900","https://10.0.0.4:900"]``


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of ``certs.tar``, created in the previous stage of the installation process, is placed in your working directory.

  .. include:: /_templates/installations/dashboard/deploy_certificates.rst


Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst

      
      **Only for distributed deployments**  
      
          Edit the file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` and replace the ``url`` value with the Wazuh server IP address or hostname.
          
            .. code-block:: yaml
            
              hosts:
                - default:
                  url: https://localhost
                  port: 55000
                  username: wazuh-wui
                  password: wazuh-wui
                  run_as: false


  #. Access the Wazuh web interface with your credentials.

      - URL: *https://<dashboard_ip>*
      - **Username**: *admin*
      - **Password**: *<admin_password>*

    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.

If you want to uninstall the Wazuh dashboard, see the :ref:`uninstalling <uninstall_kibana>` section. 
