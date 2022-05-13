.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation guides through the upgrade process of Wazuh indexer and Filebeat.
  
Upgrading the Wazuh indexer, Filebeat, and the Wazuh dashboard
==============================================================

This section guides through the upgrade process of Wazuh indexer, Filebeat, and Wazuh dashboard.

.. note::
   
   Root user privileges are required to execute all the commands described below.

Preparing the Wazuh indexer
---------------------------

#. Stop Filebeat and the Wazuh dashboard services.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop filebeat
            # systemctl stop wazuh-dashboard

      .. tab:: SysV Init

         .. code-block:: console

            # service filebeat stop
            # service wazuh-dashboard stop

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on your server. 

   .. tabs::

      .. group-tab:: Yum

         .. include:: /_templates/installations/wazuh/yum/add_repository.rst

      .. group-tab:: APT

         .. include:: /_templates/installations/wazuh/deb/add_repository.rst

Upgrading the Wazuh indexer
---------------------------

In the case of having a Wazuh indexer cluster with multiple nodes, the cluster will remain available throughout this upgrading process. This rolling upgrade allows shutting down one Wazuh indexer node at a time for minimal disruption of service.

.. note::

   -  Replace ``<WAZUH_INDEXER_IP>`` before running the commands below.
   -  If using ``http``, the curl option ``-k`` must be omitted.
   -  If not using user/password authentication, the curl option ``-u`` must be omitted.

#. Disable shard allocation.

   .. code-block:: bash
   
      curl -X PUT "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush.

   .. code-block:: console

      # curl -X POST "https://<WAZUH_INDEXER_IP>:9200/_flush/synced" -u <username>:<password> -k

#. Shut down a single node.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-indexer

      .. tab:: SysV Init

         .. code-block:: console

            # service wazuh-indexer stop

#. Upgrade the node you shut down.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-indexer-|WAZUH_LATEST|

      .. group-tab:: APT

         .. code-block:: console

            # apt -y install wazuh-indexer=|WAZUH_LATEST|

#. Restart the service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. Check that the newly-upgraded node joins the cluster.

   .. code-block:: console

      # curl -X GET "https://<WAZUH_INDEXER_IP>:9200/_cat/nodes" -u <username>:<password> -k

#. Re-enable shard allocation.

   .. code-block:: bash

      curl -X PUT "https://<WAZUH_INDEXER_IP>:9200/_cluster/settings" -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

#. Check the status of the cluster before upgrading the next node to see if shard allocation has finished.

   .. code-block:: console

      # curl -k -u <username>:<password> https://<WAZUH_INDEXER_IP>:9200/_cat/nodes?v

#. Repeat the steps for every Wazuh indexer node.

Upgrading Filebeat
------------------

#. Run the following command to upgrade Filebeat.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum install filebeat-|ELASTICSEARCH_LATEST|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install filebeat=|ELASTICSEARCH_LATEST|

#. Download the alerts template for the Wazuh indexer:

   .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/|WAZUH_LATEST_MINOR|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Install the Wazuh module for Filebeat:

   .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace the following value.

   .. include:: /_templates/installations/filebeat/opensearch/configure_filebeat.rst

#. Restart Filebeat.

    .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template to the Wazuh indexer. This step can be omitted in Wazuh single-node installations.

   .. code-block:: console

      # filebeat setup --index-management -E output.logstash.enabled=false    

Upgrading the Wazuh dashboard
-----------------------------

#. Edit the ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file and add to the end of the file the following default structure to define an Wazuh API entry:

   .. code-block:: yaml

    hosts:
      - <id>:
         url: http(s)://<api_url>
         port: <api_port>
         username: <api_user>
         password: <api_password>
         run_as: false

   The following values need to be replaced:

    -  ``<id>``: an arbitrary ID.

    -  ``<api_url>``: url of the Wazuh API.

    -  ``<api_port>``: port.

    -  ``<api_user>``: credentials to authenticate.

    -  ``<api_password>``: credentials to authenticate.

   In case of having more Wazuh API entries, each of them must be added manually.

#. Upgrade the Wazuh dashboard.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum install wazuh-dashboard-|WAZUH_LATEST|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-dashboard=|WAZUH_LATEST|

#. Update file permissions. This will prevent errors when generating new bundles or updating the Wazuh Kibana plugin:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Update configuration file permissions:

    .. code-block:: console

      # sudo chown kibana:kibana /usr/share/kibana/data/wazuh/config/wazuh.yml
      # sudo chmod 600 /usr/share/kibana/data/wazuh/config/wazuh.yml

#. **(Recommended)** Enable multitenancy in the ``/etc/kibana/kibana.yml`` configuration file:

   .. code-block:: console

      opendistro_security.multitenancy.enabled: true

   When you access Kibana, a popup window asks you to define a tenant. You can avoid it by modifying the default route to include the selection of a tenant, for example, global.  

   .. code-block:: console

      server.defaultRoute: /app/wazuh?security_tenant=global

#. Restart the Wazuh dashboard:

    .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Clear the browser cache and cookies.

Next step
---------

The next step consists in :doc:`upgrading-agent`.
