.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out more about how to upgrade the Wazuh server and the Elastic Stack basic license: preparing and upgrading Elastic Stack, upgrading Filebeat and Kibana, and next steps. 
  
.. _upgrading_elastic_stack:

Wazuh and Elastic Stack basic license
=====================================

This section guides you through the upgrade process of the Wazuh server, Elasticsearch, and Kibana for the *Elastic Stack basic license* distribution. 

.. note::
   
   This guide is meant for upgrades from 7.x to 7.y. The upgrade instructions for Elastic Stack versions prior to 7.0 can be found in the :ref:`Upgrading Elastic Stack from a legacy version <upgrading_elastic_stack_legacy>` section.

.. note:: You need root user privileges to run all the commands described below.

Preparing the upgrade
---------------------

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on the node. 

   .. tabs::


     .. group-tab:: Yum


       .. include:: /_templates/installations/common/yum/add-repository.rst



     .. group-tab:: APT


       .. include:: /_templates/installations/common/deb/add-repository.rst




#. Repeat the previous steps for every Wazuh node.

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

Upgrading Elastic Stack
-----------------------

Preparations
^^^^^^^^^^^^

#. Stop the services:

    .. include:: ../../_templates/installations/basic/elastic/common/stop_kibana_filebeat.rst


#. Add the Elastic Stack repository:


    .. tabs::

      .. group-tab:: Yum


        .. include:: ../../_templates/installations/basic/elastic/yum/add_repository.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/basic/elastic/deb/add_repository.rst



      .. group-tab:: ZYpp


         .. include:: ../../_templates/installations/basic/elastic/zypp/add_repository.rst              


#. Before the upgrade process, it is important to ensure that the Wazuh repository is disabled, as it contains Filebeat packages used by Open Distro for Elasticsearch distribution, which might be accidentally installed instead of the Elastic package. In case of having enabled the Wazuh repository, it can be disabled using:

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
 
 
Upgrade
^^^^^^^

This guide explains how to perform a rolling upgrade, which allows you to shut down one node at a time for minimal disruption of service.
The cluster remains available throughout the process.

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

            # yum install elasticsearch-|ELASTICSEARCH_ELK_LATEST|

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install elasticsearch=|ELASTICSEARCH_ELK_LATEST|
          
          It's recommended to keep your currently installed version of the configuration file (option N or O if prompted).  

        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update elasticsearch-|ELASTICSEARCH_ELK_LATEST|


#. Restart the service:

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


Upgrading Filebeat
------------------

The following steps need to be run in the Wazuh server or servers in the case of Wazuh multi-node cluster. 


#. Upgrade Filebeat:

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console

          # yum install filebeat-|ELASTICSEARCH_ELK_LATEST|

      .. group-tab:: APT

        .. code-block:: console

          # apt-get install filebeat=|ELASTICSEARCH_ELK_LATEST|
        
        It's recommended to keep your currently installed version of the configuration file (option N or O if prompted).  

      .. group-tab:: ZYpp

        .. code-block:: console

          # zypper update filebeat-|ELASTICSEARCH_ELK_LATEST|


#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module


#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file. Replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

    .. code-block:: yaml

      output.elasticsearch.hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']


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

            # yum install kibana-|ELASTICSEARCH_ELK_LATEST|

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install kibana=|ELASTICSEARCH_ELK_LATEST|

          It's recommended to keep your currently installed version of the configuration file (option N or O if prompted).

        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update kibana=|ELASTICSEARCH_ELK_LATEST|

#. **(For upgrades from 3.x versions)** Remove generated bundles and the ``wazuh-registry.json`` file:

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles
      # rm -f /usr/share/kibana/optimize/wazuh/config/wazuh-registry.json

#. Update file permissions. This will prevent errors when generating new bundles or updating the Wazuh Kibana plugin:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana
    
#. Install the Wazuh Kibana plugin:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_|ELASTICSEARCH_ELK_LATEST|-1.zip


#. Update configuration file and certificates permissions:

    .. code-block:: console

      # chown kibana:kibana /usr/share/kibana/data/wazuh/config/wazuh.yml
      # chmod 600 /usr/share/kibana/data/wazuh/config/wazuh.yml
      # chown -R kibana: /etc/kibana/certs
      # chmod -R 500 /etc/kibana/certs
      # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*

#. For installations on Kibana 7.6.x version and higher, it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF

#. Edit the ``/etc/kibana/kibana.yml`` configuration file: 


   .. code-block:: none
      :emphasize-lines: 3,20,21

      server.host: <kibana_ip>
      server.port: 443
      elasticsearch.hosts: https://<elasticsearch_DN>:9200
      elasticsearch.password: <elasticsearch_password>

      # Elasticsearch from/to Kibana

      elasticsearch.ssl.certificateAuthorities: /etc/kibana/certs/ca/ca.crt
      elasticsearch.ssl.certificate: /etc/kibana/certs/kibana.crt
      elasticsearch.ssl.key: /etc/kibana/certs/kibana.key

      # Browser from/to Kibana
      server.ssl.enabled: true
      server.ssl.certificate: /etc/kibana/certs/kibana.crt
      server.ssl.key: /etc/kibana/certs/kibana.key

      # Elasticsearch authentication
      xpack.security.enabled: true
      elasticsearch.username: elastic
      uiSettings.overrides.defaultRoute: "/app/wazuh"
      elasticsearch.ssl.verificationMode: certificate

   - ``elasticsearch.hosts:`` In case of having an IP, replace it with a DNS name (Starting Elasticsearch 7.11.0, IP addresses are not allowed). For example, ``https://localhost:9200``
   - Replace ``server.defaultRoute: /app/wazuh`` with ``uiSettings.overrides.defaultRoute: "/app/wazuh"``
   - Add the following line to select ``certificate`` as verification mode: ``elasticsearch.ssl.verificationMode: certificate``

#. Link Kibana’s socket to privileged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node      


#. Restart Kibana:

    .. include:: ../../_templates/installations/basic/elastic/common/enable_kibana.rst


#. **(For upgrades from 3.x versions)** Once Kibana is accessible, remove the ``wazuh-alerts-3.x-*`` index pattern. Since it has been replaced in Wazuh 4.0 by ``wazuh-alerts-*``, it is necessary to remove the old pattern for the new one to take its place.

    .. code-block:: console

      # curl 'https://<kibana_ip>:<kibana_port>/api/saved_objects/index-pattern/wazuh-alerts-3.x-*' -X DELETE  -H 'Content-Type: application/json' -H 'kbn-version: |ELASTICSEARCH_ELK_LATEST|' -k -uelastic:<elastic_password>

    If you have a custom index pattern, be sure to replace it accordingly.

#. Clear the browser's cache and cookies.



Finishing the upgrade
---------------------

#. **Recommended action** - Disable the Wazuh repository when finished upgrading the Wazuh installation in the node to prevent an upgrade to the newest Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin.
  
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

Next steps
----------

The next step consists in :ref:`upgrading the Wazuh agents<upgrading_wazuh_agent>`.
