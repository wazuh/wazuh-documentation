.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_minor_upgrade:

Upgrading Elastic Stack from 7.x to 7.y
=======================================

Prepare the Elastic Stack
-------------------------

#. Stop the services:

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
        # systemctl restart elasticsearch

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

#. Upgrade Filebeat.

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install filebeat-|ELASTICSEARCH_LATEST|

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install filebeat=|ELASTICSEARCH_LATEST|

#. Update the configuration file.

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
  For updates from Wazuh 3.11.x to 3.11.y (regardless of the version of the Elastic Stack) it is recommended to make a backup of the Wazuh app configuration file in order not to lose the modified parameters or the configured APIs.

#. Make a backup of the configuration file.

    .. code-block:: console

      # cp /usr/share/kibana/plugins/wazuh/wazuh.yml /tmp/wazuh-backup.yml

#. Remove the Wazuh app.

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin remove wazuh

#. Upgrade Kibana.

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install kibana-|ELASTICSEARCH_LATEST|

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install kibana=|ELASTICSEARCH_LATEST|

#. Remove generated bundles.

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles

#. Update file permissions. This will prevent errors when generating new bundles or updating the app.

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh app.

    * From URL:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

    * From the package:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

#. Restore the configuration file backup.

    .. code-block:: console

      # sudo cp /tmp/wazuh-backup.yml /usr/share/kibana/plugins/wazuh/wazuh.yml

#. Update configuration file permissions.

    .. code-block:: console

      # sudo chown kibana:kibana /usr/share/kibana/plugins/wazuh/wazuh.yml
      # sudo chmod 600 /usr/share/kibana/plugins/wazuh/wazuh.yml

#. For installations on Kibana 7.6.X versions it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF
      
#. Restart Kibana.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart kibana

Disabling repositories
^^^^^^^^^^^^^^^^^^^^^^

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

    * For Debian/Ubuntu:

      .. code-block:: console

        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
        # apt-get update

      Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

      .. code-block:: console

        # echo "elasticsearch hold" | sudo dpkg --set-selections
        # echo "kibana hold" | sudo dpkg --set-selections

    * For openSUSE:

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo
