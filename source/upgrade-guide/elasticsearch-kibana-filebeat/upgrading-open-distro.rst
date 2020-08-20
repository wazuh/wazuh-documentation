.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_open_distro:

Upgrading Open Distro for Elasticsearch
=======================================

This section guides through the upgrade process of Elasticsearch, Filebeat and Kibana for *Open Distro for Elasticsearch* distribution. 

Preparing Open Distro for Elasticsearch
---------------------------------------

#. Stop the services:

    .. include:: ../../_templates/installations/basic/elastic/common/stop_kibana_filebeat.rst


#. Prepare the repository:

    .. tabs::

      .. group-tab:: YUM

          .. code-block:: console

            # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

          .. code-block:: console

            # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list


      .. group-tab:: ZYpp

          .. code-block:: console

            # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo


Upgrading Elasticsearch
-----------------------

This guide explains how to perform a rolling upgrade, which allows you to shut down one node at a time for minimal disruption of service.
The cluster remains available throughout the process.

In the commands below ``127.0.0.1`` IP address is used. If Elasticsearch is bound to a specific IP address, replace ``127.0.0.1`` with your Elasticsearch IP. If using ``http``, the option ``-k`` must be omitted and if not using user/password authentication, ``-u`` must be omitted.

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

    .. code-block:: bash

      curl -X POST "https://127.0.0.1:9200/_flush/synced" -u <username>:<password> -k

#. Shut down a single node:

    .. include:: ../../_templates/installations/basic/elastic/common/stop_elasticsearch.rst

#. Upgrade the node you shut down:

      .. tabs::

        .. group-tab:: YUM

          .. code-block:: console

            # yum install opendistroforelasticsearch-1.6.0


        .. group-tab:: APT

          Upgrade Elasticsearch OSS:

          .. code-block:: console

            # apt install elasticsearch-oss

          Upgrade Open Distro for Elasticsearch:

          .. code-block:: console

            # apt install opendistroforelasticsearch


        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update opendistroforelasticsearch-1.6.0



#. Restart the service:

    .. include:: ../../_templates/installations/basic/elastic/common/enable_elasticsearch.rst


#. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a ``_cat/nodes`` request:

    .. code-block:: bash

      curl -X GET "https://127.0.0.1:9200/_cat/nodes" -u <username>:<password> -k

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

    .. code-block:: bash

      curl -X GET "https://127.0.0.1:9200/_cat/health?v" -u <username>:<password> -k

#. Repeat the steps for every Elasticsearch node.


Upgrading Filebeat
------------------

#. Upgrade Filebeat:

      .. tabs::

        .. group-tab:: YUM

          .. code-block:: console

            # yum install filebeat

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install filebeat


        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update filebeat


#. Update the configuration file:

      .. tabs::

        .. group-tab:: All-in-One installation

          .. code-block:: console

            # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
            # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat_all_in_one.yml
            # chmod go+r /etc/filebeat/filebeat.yml

        .. group-tab:: Distributed installation

          .. code-block:: console

            # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
            # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat.yml
            # chmod go+r /etc/filebeat/filebeat.yml


#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file. This step is only needed for the upgrade of a ``Distributed installation``. In case of having an ``All-in-one`` installation, the file is already configured:

      .. tabs::

        .. group-tab:: Elasticsearch single-node
         
          .. code-block:: yaml

            output.elasticsearch:
              hosts: ["<elasticsearch_ip>:9200"]

          Replace ``elasticsearch_ip`` with the IP address or the hostname of the Elasticsearch server.

        .. group-tab:: Elasticsearch multi-node

          .. code-block:: yaml

            output.elasticsearch:
              hosts: ["<elasticsearch_ip_node_1>:9200", "<elasticsearch_ip_node_2>:9200", "<elasticsearch_ip_node_3>:9200"]

          Replace ``elasticsearch_ip_node_x`` with the IP address or the hostname of the Elasticsearch server to connect to.

      During the installation, the default username and password were used. If those credentials were changed, replace those values in the ``filebeat.yml`` configuration file.


#. Restart Filebeat:

    .. include:: ../../_templates/installations/basic/elastic/common/enable_filebeat.rst

Upgrading Kibana
----------------

.. warning::
  Since Wazuh 3.12.0 release, regardless of the Elastic Stack version, the location of the Wazuh Kibana plugin configuration file has been moved from ``/usr/share/kibana/plugins/wazuh/wazuh.yml``, for the version 3.11.x, and from ``/usr/share/kibana/plugins/wazuh/config.yml``, for the version 3.10.x or older, to ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``.

#. Copy the Wazuh Kibana plugin configuration file to its new location. This step is not needed for upgrades from 3.12.x to 3.13.x:

      .. tabs::

          .. group-tab:: For upgrades from 3.11.x to 3.13.x

              Create the new directory and copy the Wazuh Kibana plugin configuration file:

                .. code-block:: console

                  # mkdir -p /usr/share/kibana/optimize/wazuh/config
                  # cp /usr/share/kibana/plugins/wazuh/wazuh.yml /usr/share/kibana/optimize/wazuh/config/wazuh.yml


          .. group-tab:: For upgrades from 3.10.x or older to 3.13.x


              Create the new directory and copy the Wazuh Kibana plugin configuration file:

                    .. code-block:: console

                      # mkdir -p /usr/share/kibana/optimize/wazuh/config
                      # cp /usr/share/kibana/plugins/wazuh/config.yml /usr/share/kibana/optimize/wazuh/config/wazuh.yml


              Edit the ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` configuration file and add to the end of the file the following default structure to define an Wazuh API entry:

                    .. code-block:: yaml

                      hosts:
                        - <id>:
                           url: http(s)://<api_url>
                           port: <api_port>
                           user: <api_user>
                           password: <api_password>

                    The following values need to be replaced:

                      -  ``<id>``: an arbitrary ID.

                      -  ``<api_url>``: url of the Wazuh API.

                      -  ``<api_port>``: port.

                      -  ``<api_user>``: credentials to authenticate.

                      -  ``<api_password>``: credentials to authenticate.

                    In case of having more Wazuh API entries, each of them must be added manually.



#. Remove the Wazuh Kibana plugin:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin remove wazuh

#. Upgrade Kibana:

      .. tabs::

        .. group-tab:: YUM

          .. code-block:: console

            # yum install opendistroforelasticsearch-kibana

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install opendistroforelasticsearch-kibana


        .. group-tab:: ZYpp

          .. code-block:: console

            # zypper update opendistroforelasticsearch-kibana


#. Remove generated bundles:

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles

#. Update file permissions. This will prevent errors when generating new bundles or updating the Wazuh Kibana plugin:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh Kibana plugin:

    .. tabs::

      .. group-tab:: From the URL

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/trash/app/kibana/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

      .. group-tab:: From the package

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip



#. Update configuration file permissions:

    .. code-block:: console

      # sudo chown kibana:kibana /usr/share/kibana/optimize/wazuh/config/wazuh.yml
      # sudo chmod 600 /usr/share/kibana/optimize/wazuh/config/wazuh.yml

#. For installations on Kibana 7.6.x version and higher, it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF

#. Link Kibana’s socket to priviledged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Restart Kibana:

    .. include:: ../../_templates/installations/basic/elastic/common/enable_kibana.rst


Disabling the repository
^^^^^^^^^^^^^^^^^^^^^^^^
It is recommended to disable the Wazuh repository to prevent an upgrade to a newest Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin:

      .. tabs::

        .. group-tab:: YUM

          .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh_pre.repo

        .. group-tab:: APT

          .. code-block:: console

            # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh_trash.list
            # apt-get update

        .. group-tab:: ZYpp

          .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

Next step
---------

The next step consists on :ref:`upgrading the Wazuh agents<upgrading_wazuh_agent>`.
