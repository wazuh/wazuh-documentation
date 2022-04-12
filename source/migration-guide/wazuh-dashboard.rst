.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Follow this guide to migrate from Open Distro for Elasticsearch Kibana to the Wazuh dashboard.
  
.. _migration_guide_dashboard:

Migrating to the Wazuh dashboard
================================

Follow this guide to migrate from Open Distro for Elasticsearch Kibana 1.13 to the Wazuh dashboard. These instructions are intended for a standard Wazuh installation, you may need to make some changes to adapt them to your environment.


.. note:: Root user privileges are required to execute all the commands described below.


#. Stop the Kibana service. 

   .. tabs::
   
    .. group-tab:: Systemd
   
     .. code-block:: console
   
      # systemctl stop kibana
   
    .. group-tab:: SysV init
   
     .. code-block:: console
   
      # service kibana stop  

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on your server.

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/common/yum/add-repository.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/common/deb/add-repository.rst



#. Install the Wazuh dashboard package.

      .. tabs::

          .. group-tab:: Yum


              .. include:: /_templates/installations/dashboard/yum/install_dashboard.rst



          .. group-tab:: APT


              .. include:: /_templates/installations/dashboard/apt/install_dashboard.rst


    ..  note:: Make sure that your Wazuh manager is updated to the latest version. 

#. Create the ``/etc/wazuh-dashboard/certs`` directory, copy your old certificates to the new location and give them the right ownership and permissions.    

   .. code-block:: console

     # mkdir /etc/wazuh-dashboard/certs
     # cp /etc/kibana/certs/kibana.pem /etc/wazuh-dashboard/certs/dashboard.pem
     # cp /etc/kibana/certs/kibana-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
     # cp /etc/kibana/certs/root-ca.pem /etc/wazuh-dashboard/certs/root-ca.pem
     # chmod 500 /etc/wazuh-dashboard/certs
     # chmod 400 /etc/wazuh-dashboard/certs/*
     # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Port your settings from ``/etc/kibana/kibana.yml`` to the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. You can omit the ``opensearch.username`` and the ``opensearch.password`` settings as they are now stored in the Wazuh dashboard keystore. 

    .. code-block:: yaml
      :emphasize-lines: 1,3

          server.host: 0.0.0.0
          server.port: 443
          opensearch.hosts: https://localhost:9200
          opensearch.ssl.verificationMode: certificate
          #opensearch.username: 
          #opensearch.password: 
          opensearch.requestHeadersWhitelist: ["securitytenant","Authorization"]
          opensearch_security.multitenancy.enabled: true
          opensearch_security.readonly_mode.roles: ["kibana_read_only"]
          server.ssl.enabled: true
          server.ssl.key: "/etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem"
          server.ssl.certificate: "/etc/wazuh-dashboard/certs/wazuh-dashboard.pem"
          opensearch.ssl.certificateAuthorities: ["/etc/wazuh-dashboard/certs/root-ca.pem"]
          uiSettings.overrides.defaultRoute: /app/wazuh?security_tenant=global

#. Add your password for the ``kibanaserver`` user in the Wazuh dashboard keystore. You may find your old password in the ``/etc/kibana/kibana.yml`` configuration file. Execute the command below and follow the instructions. 

    .. code-block:: console

      /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add opensearch.password    
   
    (Optional) If you wish to change the default user, you may use the following command. Remember to change the password accordingly. 

    .. code-block:: console

      /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add opensearch.username 


#. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst            


#.  Port your settings from ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` to ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml``. Copy the content from ``/usr/share/kibana/data/wazuh/downloads/`` (Optional).


#. Uninstall Kibana.

    .. tabs::
    
    
      .. group-tab:: Yum
    
    
        .. include:: /_templates/installations/elastic/yum/uninstall_kibana.rst
    
    
    
      .. group-tab:: APT
    
    
        .. include:: /_templates/installations/elastic/deb/uninstall_kibana.rst





