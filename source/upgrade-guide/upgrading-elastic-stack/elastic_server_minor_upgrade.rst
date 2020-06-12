.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_server_minor_upgrade:

Upgrading Elastic Stack from 7.x to 7.y
=======================================

This section guides through the upgrade process of Elastic Stack components including Elasticsearch, Filebeat and Kibana for both Elastic and Open Distro for Elasticsearch distributions. As some of the steps may differ depending on the distribution, the following tags will be used:

- [*Both*] - indicates that the step should be done for both Elastic and Open Distro components.

- [*OD*] - indicates that the step should be done only for Open Distro for Elasticsearch component.

- [*Elastic*] - indicates that the step should be done only for Elastic component.

Prepare the Elastic Stack
-------------------------

#. [*Both*] Stop the services:

    .. code-block:: console

      # systemctl stop filebeat
      # systemctl stop kibana

#. In case of having disabled the repository for Elastic Stack 7.x it can be enabled using:

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/elastic.repo

  * For Debian/Ubuntu:

    .. code-block:: console

      # sed -i "s/#deb/deb/" /etc/apt/sources.list.d/elastic-7.x.list
      # apt-get update

  * For openSUSE:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/elastic.repo

Upgrade Elasticsearch
---------------------

#. Disable shard allocation

    .. code-block:: bash

      curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush. (Optional)

    .. code-block:: bash

      curl -X POST "localhost:9200/_flush/synced"

#. Shut down a single node.

    .. code-block:: console

      # systemctl stop elasticsearch

#. Upgrade the node you shut down.

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install elasticsearch-|ELASTICSEARCH_LATEST|

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install elasticsearch=|ELASTICSEARCH_LATEST|

#. Restart the service.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart elasticsearch

#. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a *_cat/nodes* request:

    .. code-block:: bash

      curl -X GET "localhost:9200/_cat/nodes"

#. Reenable shard allocation.

    .. code-block:: bash

      curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": null
        }
      }
      '

#. Before upgrading the next node, wait for the cluster to finish shard allocation.

    .. code-block:: bash

      curl -X GET "localhost:9200/_cat/health?v"

#. Repeat it for every Elasticsearch node.

Upgrade Filebeat
----------------

#. Upgrade Filebeat:

    * Open Distro for Elasticsearch:

      .. tabs::

        .. group-tab:: YUM

          .. code-block:: console

            # yum install filebeat

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install filebeat

    * Elastic:

      .. tabs::

        .. group-tab:: YUM

          .. code-block:: console

            # yum install filebeat-|ELASTICSEARCH_LATEST|

        .. group-tab:: APT

          .. code-block:: console

            # apt-get install filebeat=|ELASTICSEARCH_LATEST|


#. Update the configuration file:

    .. code-block:: console

      # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/7.x/filebeat.yml
      # chmod go+r /etc/filebeat/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

    .. code-block:: yaml

      output.elasticsearch.hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']

#. Restart Filebeat.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart filebeat

Upgrade Kibana
--------------

.. warning::
  Since Wazuh 3.12.0 release (regardless of the Elastic Stack version) the location of the Wazuh Kibana plugin configuration file has been moved from ``/usr/share/kibana/plugins/wazuh/wazuh.yml``, for the version 3.11.x, and from ``/usr/share/kibana/plugins/wazuh/config.yml``, for the version 3.10.x or older, to ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``.

#. Copy the Wazuh Kibana plugin configuration file to its new location (not needed for upgrades from 3.12.x to 3.13.x):

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

    * Open Distro for Elasticsearch:

      .. tabs::

        .. group-tab:: YUM

            .. code-block:: console

              # yum install opendistroforelasticsearch-kibana

        .. group-tab:: APT

            .. code-block:: console

              # apt-get install opendistroforelasticsearch-kibana


    * Elastic:

      .. tabs::

        .. group-tab:: YUM

            .. code-block:: console

              # yum install kibana-|ELASTICSEARCH_LATEST|

        .. group-tab:: APT

            .. code-block:: console

              # apt-get install kibana=|ELASTICSEARCH_LATEST|

#. Remove generated bundles:

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles

#. Update file permissions. This will avoid several errors prior to updating the app:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh Kibana plugin:

    * From the URL:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

    * From the package:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

#. Update configuration file permissions:

    .. code-block:: console

      # sudo chown kibana:kibana /usr/share/kibana/optimize/wazuh/config/wazuh.yml
      # sudo chmod 600 /usr/share/kibana/optimize/wazuh/config/wazuh.yml

#. It is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF

#. [*OD*] Link Kibana’s socket to priviledged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Restart Kibana.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart kibana

Disabling the Elastic repositories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is recommended to disable the Elastic repository to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin:

.. tabs::

  .. group-tab:: YUM

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

  .. group-tab:: APT

      .. code-block:: console

        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
        # apt-get update

      Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

      .. code-block:: console

        # echo "elasticsearch hold" | sudo dpkg --set-selections
        # echo "kibana hold" | sudo dpkg --set-selections
