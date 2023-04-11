.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the upgrade process of the Wazuh server with Elasticsearch and Kibana for Open Distro for Elasticsearch distribution.
  
.. _upgrading_open_distro:

Wazuh and Open Distro for Elasticsearch
=======================================

This section guides you through the upgrade process of the Wazuh server, Elasticsearch, and Kibana for the *Open Distro for Elasticsearch* distribution. 

.. note:: You need root user privileges to run all the commands described below.

Preparing the upgrade
---------------------

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on the node. 

   .. tabs::


     .. group-tab:: Yum


       .. include:: /_templates/installations/common/yum/add-repository.rst



     .. group-tab:: APT


       .. include:: /_templates/installations/common/deb/add-repository.rst




#. Repeat the previous step for every Wazuh node.

Upgrading the Wazuh manager
---------------------------

When upgrading a multi-node Wazuh manager cluster, run the upgrade in every node to make all the Wazuh manager nodes join the cluster. Start with the master node to reduce server downtime.

.. note:: Upgrading from Wazuh 4.2.x or lower creates the ``wazuh`` operating system user and group to replace ``ossec``. To avoid upgrade conflicts, make sure that the ``wazuh`` user and group are not present in your operating system.  

#. Upgrade the Wazuh manager to the latest version.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-manager

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-manager

   .. note::

      If the ``/var/ossec/etc/ossec.conf`` configuration file was modified, it will not be replaced by the upgrade. You will therefore have to add the settings of the new capabilities manually. More information can be found in :doc:`/user-manual/index`.        

#. Repeat the previous steps for every Wazuh manager node.

Upgrading Open Distro for Elasticsearch
---------------------------------------

Preparations
^^^^^^^^^^^^

#. Stop the services:

    .. include:: ../../_templates/installations/basic/elastic/common/stop_kibana_filebeat.rst


#. Prepare the repositories. Wazuh now hosts the Open Distro packages. In order to prevent accidental upgrades, it is recommended to disable the Open Distro repository. Besides, if the Elastic repository was added, it is also recommended to disable it:

   #. Disable the Open Distro for Elasticsearch repository:
 
        .. tabs::
    
          .. group-tab:: Yum
    
            .. code-block:: console
    
              # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/opendistroforelasticsearch-artifacts.repo
    
          .. group-tab:: APT
    
            .. code-block:: console
    
              # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/opendistroforelasticsearch.list
              # apt-get update
    
          .. group-tab:: ZYpp
    
            .. code-block:: console
    
                  # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/opendistroforelasticsearch-artifacts.repo  
 
   #. (Optional) Disable the Elastic Stack basic license repository:

         .. tabs::
     
           .. group-tab:: Yum
     
             .. code-block:: console
     
               # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
     
           .. group-tab:: APT
     
             .. code-block:: console
     
               # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
               # apt-get update
     
             Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually using ``apt-get install``:
     
             .. code-block:: console
     
               # echo "elasticsearch hold" | sudo dpkg --set-selections
               # echo "filebeat hold" | sudo dpkg --set-selections
               # echo "kibana hold" | sudo dpkg --set-selections
     
           .. group-tab:: ZYpp
     
             .. code-block:: console
     
                   # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo

   #. Add the Wazuh ``4.x`` repository:

      .. tabs::
  
        .. group-tab:: Yum
  
          .. include:: ../../_templates/installations/basic/wazuh/yum/add_repository_aio.rst
  
          3. Clean the YUM cache:
  
            .. code-block:: console
  
              # yum clean all 
  
        .. group-tab:: APT
  
          .. include:: ../../_templates/installations/basic/wazuh/deb/add_repository_aio.rst
  
        
  
        .. group-tab:: ZYpp
  
          .. include:: ../../_templates/installations/basic/wazuh/zypp/add_repository_aio.rst






Upgrade
^^^^^^^

This guide explains how to perform a rolling upgrade, which allows you to shut down one node at a time for minimal disruption of service. The cluster remains available throughout the process.

The IP address ``127.0.0.1`` is used in the commands below. If Elasticsearch is bound to a specific IP address, replace ``127.0.0.1`` with your Elasticsearch IP address. If using ``http``, the option ``-k`` must be omitted, and if not using user/password authentication, ``-u`` must be omitted.

#. Disable shard allocation:

    .. code-block:: bash

      curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush:

    .. code-block:: console

      # curl -X POST "https://127.0.0.1:9200/_flush/synced" -u <username>:<password> -k

#. Shut down a single node:

    .. include:: ../../_templates/installations/basic/elastic/common/stop_elasticsearch.rst

#. Upgrade the node you shut down:

      .. tabs::

        .. group-tab:: Yum

          .. code-block:: console

            # yum install opendistroforelasticsearch-|OPEN_DISTRO_LATEST|


        .. group-tab:: APT

          Upgrade Elasticsearch OSS:

          .. code-block:: console

            # apt-get install elasticsearch-oss=|ELASTICSEARCH_LATEST|

          Upgrade Open Distro for Elasticsearch:

          .. code-block:: console

            # apt-get install opendistroforelasticsearch=|OPEN_DISTRO_LATEST|-1


        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update opendistroforelasticsearch-|OPEN_DISTRO_LATEST|


#. Restart the service:

    .. warning::
    
      Add the following configuration to mitigate Apache Log4j2 Remote Code Execution (RCE) vulnerability - CVE-2021-44228 - ESA-2021-31.
      
      .. code-block:: console
    
        # mkdir -p /etc/elasticsearch/jvm.options.d
        # echo '-Dlog4j2.formatMsgNoLookups=true' > /etc/elasticsearch/jvm.options.d/disabledlog4j.options
        # chmod 2750 /etc/elasticsearch/jvm.options.d/disabledlog4j.options
        # chown root:elasticsearch /etc/elasticsearch/jvm.options.d/disabledlog4j.options

    .. include:: ../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst


#. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a ``_cat/nodes`` request:

    .. code-block:: console

      # curl -X GET "https://127.0.0.1:9200/_cat/nodes" -u <username>:<password> -k

#. Reenable shard allocation:

    .. code-block:: bash

      curl -X PUT "https://127.0.0.1:9200/_cluster/settings" -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

#. Before upgrading the next node, wait for the cluster to finish shard allocation:

    .. code-block:: console

      # curl -X GET "https://127.0.0.1:9200/_cat/health?v" -u <username>:<password> -k

#. Repeat the steps for every Elasticsearch node.

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is installed by default and can have a negative impact on system resources. We recommend removing it with the following command ``/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer``. 


Upgrading Filebeat
------------------

#. Upgrade Filebeat:

      .. tabs::

        .. group-tab:: Yum

          .. code-block:: console

            # yum install filebeat-|ELASTICSEARCH_LATEST|

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install filebeat=|ELASTICSEARCH_LATEST|


        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update filebeat-|ELASTICSEARCH_LATEST|


#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file. This step is only needed for the upgrade of a ``Distributed installation``. In case of having an ``All-in-one`` installation, the file is already configured:

      .. tabs::

        .. group-tab:: Elasticsearch single-node
         
          .. code-block:: yaml

            output.elasticsearch:
              hosts: ["<elasticsearch_ip>:9200"]

          Replace ``<elasticsearch_ip>`` with the IP address or the hostname of the Elasticsearch server.

        .. group-tab:: Elasticsearch multi-node

          .. code-block:: yaml

            output.elasticsearch:
              hosts: ["<elasticsearch_ip_node_1>:9200", "<elasticsearch_ip_node_2>:9200", "<elasticsearch_ip_node_3>:9200"]

          Replace ``elasticsearch_ip_node_x`` with the IP address or the hostname of the Elasticsearch server to connect to.

      During the installation, the default username and password were used. If those credentials were changed, replace those values in the ``filebeat.yml`` configuration file.


#. Restart Filebeat:

    .. include:: ../../_templates/installations/basic/elastic/common/enable_filebeat.rst

#. Upload the new Wazuh template to Elasticsearch. This step can be omitted in Wazuh single-node installations:

   .. code-block:: console

      # filebeat setup --index-management -E output.logstash.enabled=false    

Upgrading Kibana
----------------

.. warning::
  The location of the Wazuh Kibana plugin configuration file has been moved to ``/usr/share/kibana/data/wazuh/config/wazuh.yml``

#. Copy the Wazuh Kibana plugin configuration file to its new location:

      .. tabs::

          
          .. group-tab:: For upgrades from 3.12.x or newer

              Create the new directory and copy the Wazuh Kibana plugin configuration file.

                .. code-block:: console

                  # mkdir -p /usr/share/kibana/data/wazuh/config/
                  # cp /usr/share/kibana/optimize/wazuh/config/wazuh.yml /usr/share/kibana/data/wazuh/config/wazuh.yml


          .. group-tab:: For upgrades from 3.11.x

              Create the new directory and copy the Wazuh Kibana plugin configuration file:

                .. code-block:: console

                  # mkdir -p /usr/share/kibana/data/wazuh/config/
                  # cp /usr/share/kibana/plugins/wazuh/wazuh.yml /usr/share/kibana/data/wazuh/config/wazuh.yml


          .. group-tab:: For upgrades from 3.10.x or older


              Create the new directory and copy the Wazuh Kibana plugin configuration file:

                    .. code-block:: console

                      # mkdir -p /usr/share/kibana/data/wazuh/config/
                      # cp /usr/share/kibana/plugins/wazuh/config.yml /usr/share/kibana/data/wazuh/config/wazuh.yml


              Edit the ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file and add to the end of the file the following default structure to define an Wazuh API entry:

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


#. **(For upgrades from 3.x versions)** Replace the value ``user`` by ``username`` and set the username and password as ``wazuh-wui`` in the file ``/usr/share/kibana/data/wazuh/config/wazuh.yml``: 

    .. code-block:: yaml
      :emphasize-lines: 5, 6

      hosts:
        - default:
            url: https://localhost
            port: 55000
            username: wazuh-wui
            password: wazuh-wui
            run_as: false

#. Remove the Wazuh Kibana plugin:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin remove wazuh

#. Upgrade Kibana:

      .. tabs::

        .. group-tab:: Yum

          .. code-block:: console

            # yum install opendistroforelasticsearch-kibana-|OPEN_DISTRO_LATEST|

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install opendistroforelasticsearch-kibana=|OPEN_DISTRO_LATEST|


        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update opendistroforelasticsearch-kibana-|OPEN_DISTRO_LATEST|


#. **(For upgrades from 3.x versions)** Remove generated bundles and the ``wazuh-registry.json`` file:

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles
      # rm -f /usr/share/kibana/optimize/wazuh/config/wazuh-registry.json

#. Update file permissions. This will prevent errors when generating new bundles or updating the Wazuh Kibana plugin:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh Kibana plugin:

    .. tabs::

      .. group-tab:: From the URL

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_|ELASTICSEARCH_LATEST|-1.zip

      .. group-tab:: From the package

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana bin/kibana-plugin install file:///path/wazuh_kibana-|WAZUH_CURRENT|_|ELASTICSEARCH_LATEST|-1.zip



#. Update configuration file permissions:

    .. code-block:: console

      # sudo chown kibana:kibana /usr/share/kibana/data/wazuh/config/wazuh.yml
      # sudo chmod 600 /usr/share/kibana/data/wazuh/config/wazuh.yml

#. For installations on Kibana 7.6.x version and higher, it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF

#. Link Kibana’s socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. **(Recommended)** Enable multitenancy in the ``/etc/kibana/kibana.yml`` configuration file:

   .. code-block:: console

      opendistro_security.multitenancy.enabled: true

   When you access Kibana, a popup window asks you to define a tenant. You can avoid it by modifying the default route to include the selection of a tenant, for example, global.  

   .. code-block:: console

      server.defaultRoute: /app/wazuh?security_tenant=global

#. Restart Kibana:

    .. include:: ../../_templates/installations/basic/elastic/common/enable_kibana.rst


#. **(For upgrades from 3.x versions)** Once Kibana is accessible, remove the ``wazuh-alerts-3.x-*`` index pattern. Since Wazuh 4.0 it has been replaced by ``wazuh-alerts-*`` , it is necessary to remove the old pattern in order for the new one to take its place.

    .. code-block:: console

      # curl 'https://<kibana_ip>:<kibana_port>/api/saved_objects/index-pattern/wazuh-alerts-3.x-*' -X DELETE  -H 'Content-Type: application/json' -H 'kbn-version: |ELASTICSEARCH_LATEST|' -k -uadmin:admin

    If you have a custom index pattern, be sure to replace it accordingly.      

#. Clear the browser's cache and cookies.


Finishing the upgrade
---------------------

#. **Recommended action** - Disable the Wazuh repository when finished upgrading the Wazuh installation in the node to prevent  an upgrade to the newest Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin.
  
      .. tabs::

        .. group-tab:: Yum

          .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

        .. group-tab:: APT

          .. code-block:: console

            # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
            # apt-get update

        .. group-tab:: ZYpp

          .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

Next steps
----------

The next step consists in :ref:`upgrading the Wazuh agents<upgrading_wazuh_agent>`.
