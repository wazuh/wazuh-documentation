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

#. Add the new repository for Elastic Stack 7.x:

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
        # cat > /etc/yum.repos.d/elastic.repo << EOF
        [elasticsearch-7.x]
        name=Elasticsearch repository for 7.x packages
        baseurl=https://artifacts.elastic.co/packages/7.x/yum
        gpgcheck=1
        gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
        enabled=1
        autorefresh=1
        type=rpm-md
        EOF

    * For Debian/Ubuntu:

      .. code-block:: console

        # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
        # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list


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

        # yum install elasticsearch-7.5.1

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install elasticsearch=7.5.1
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

        # yum install filebeat-7.5.1

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install filebeat=7.5.1

#. Update the configuration file.

    .. code-block:: console

      # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v3.11.0/extensions/filebeat/7.x/filebeat.yml
      # chmod go+r /etc/filebeat/filebeat.yml

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

#. Remove the Wazuh app.

    .. code-block:: console

      # /usr/share/kibana/bin/kibana-plugin remove wazuh

#. Upgrade Kibana.

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install kibana-7.5.1

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install kibana=7.5.1

#. Remove generated bundles.

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles

#. Update file permissions. This will avoid several errors prior to updating the app.

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh app.

    .. code-block:: console

      # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.11.0_7.5.1.zip

#. Restart Kibana.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart kibana
