.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out how to migrate your Wazuh cluster.  
  
.. _migration_guide_dashboard:

Migrating to Wazuh dashboard
============================

Follow this guide to migrate from Open Distro for Elasticsearch Kibana 1.13.2 to Wazuh dashboard. 

.. note:: Root user privileges are required to execute all the commands described below.


#. Stop the Kibana service. 

   .. code-block:: console

     # systemctl stop kibana

#. Add Wazuh repository. (dev)

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


#. Remove demo certificates and copy your old certificates. 

   .. code-block:: console

     rm -f /etc/wazuh-dashboard/certs/*
     cp /etc/kibana/certs/kibana.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
     cp /etc/kibana/certs/kibana-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
     cp /etc/kibana/certs/root-ca.pem /etc/wazuh-dashboard/certs/root-ca.pem
     chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs/*

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file.

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
          logging.dest: "/var/log/wazuh-dashboard/wazuh-dashboard.log"
          uiSettings.overrides.defaultRoute: /app/wazuh?security_tenant=global

#. Add your password for the kibanaserver user in the Wazuh dashboard keystore. You may find your old password in ``/etc/kibana/kibana.yml``. 

    .. code-block:: console

      /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add opensearch.password    

#. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst            

#. Edit the file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` with your Wazuh manager information.  

    .. code-block:: yaml

      hosts:
        - default:
          url: https://localhost
          port: 55000
          username: wazuh-wui
          password: wazuh-wui
          run_as: false



#. Uninstall Kibana.

    .. tabs::
    
    
      .. group-tab:: Yum
    
    
        .. include:: /_templates/installations/elastic/yum/uninstall_kibana.rst
    
    
    
      .. group-tab:: APT
    
    
        .. include:: /_templates/installations/elastic/deb/uninstall_kibana.rst



You did it! Your cluster is now upgraded via a Restart Upgrade.


