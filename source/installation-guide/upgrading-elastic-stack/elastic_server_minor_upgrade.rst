.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_minor_upgrade:

Upgrading Elastic Stack from 7.x to 7.y
=======================================

Prepare the Elastic Stack
-------------------------

1. Stop the services:

  .. code-block:: console

    # systemctl stop filebeat
    # systemctl stop kibana

2. Add the new repository for Elastic Stack 7.x:

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

1. Disable shard allocation

  .. code-block:: bash

    curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
    {
      "persistent": {
        "cluster.routing.allocation.enable": "primaries"
      }
    }
    '

2. Stop non-essential indexing and perform a synced flush. (Optional)

  .. code-block:: bash

    curl -X POST "localhost:9200/_flush/synced"

3. Shut down a single node.

  .. code-block:: console
    
    # systemctl stop elasticsearch

4. Upgrade the node you shut down.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console
      
      # yum install elasticsearch-7.0.1

  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install elasticsearch=7.0.1
      # systemctl restart elasticsearch
      
5. Restart the service.

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl restart elasticsearch

6. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a *_cat/nodes* request:

  .. code-block:: bash

    curl -X GET "localhost:9200/_cat/nodes"

7. Reenable shard allocation.

  .. code-block:: bash

    curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
    {
      "persistent": {
        "cluster.routing.allocation.enable": null
      }
    }
    '

8. Before upgrading the next node, wait for the cluster to finish shard allocation. 

  .. code-block:: bash

    curl -X GET "localhost:9200/_cat/health?v"

9. Repeat it for every Elasticsearch node.

Upgrade Filebeat
----------------

1. Upgrade Filebeat.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install filebeat-7.0.1
  
  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install filebeat=7.0.1  

2. Update the configuration file.

  .. code-block:: console

    # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/filebeat/filebeat.yml
    # chmod go+r /etc/filebeat/filebeat.yml

3. Download the alerts template for Elasticsearch:

  .. code-block:: console

    # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/elasticsearch/wazuh-elastic7-template-alerts.json
    # chmod go+r /etc/filebeat/wazuh-template.json

4. Edit the file ``/etc/filebeat/filebeat.yml`` and add the list of Elasticsearch nodes to connect to. For example:

  .. code-block:: yaml

    output.elasticsearch:
      hosts: ['http://10.0.0.2:9200', 'http://10.0.0.3:9200']
      indices:
        - index: 'wazuh-alerts-3.x-%{+yyyy.MM.dd}'

5. Restart Filebeat.

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl restart filebeat

Upgrade Kibana
--------------

1. Remove the Wazuh app.

  .. code-block:: console

    # /usr/share/kibana/bin/kibana-plugin remove wazuh

2. Upgrade Kibana.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install kibana-7.0.1
  
  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install kibana=7.0.1  

3. Install the Wazuh app.

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.9.0_7.0.1.zip

4. Restart Kibana.

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl restart kibana

