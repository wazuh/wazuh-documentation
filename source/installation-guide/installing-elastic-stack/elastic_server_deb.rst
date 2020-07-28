.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_deb:

Install Elastic Stack with Debian packages
==========================================

The DEB package is suitable for Debian, Ubuntu and other Debian-based systems.

.. note:: All the commands described below need to be executed with root user privileges.

Preparation
-----------

1. Add the Elastic repository and its GPG key:

  .. code-block:: console

    # apt-get install curl apt-transport-https
    # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
    # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_.

1. Install the Elasticsearch package:

  .. code-block:: console

    # apt-get install elasticsearch=|ELASTICSEARCH_LATEST|

2. Elasticsearch will only listen on the loopback interface (localhost) by default. Configure Elasticsearch to listen to a non-loopback address by editing the file ``/etc/elasticsearch/elasticsearch.yml`` and uncommenting the setting ``network.host``. Change the value to the IP you want to bind it to:

   .. code-block:: yaml

     network.host: <elasticsearch_ip>

3. Further configuration will be necessary after changing the ``network.host`` option. Add or edit (if commented) the following lines in the file ``/etc/elasticsearch/elasticsearch.yml``:

   .. code-block:: yaml

     node.name: <node_name>
     cluster.initial_master_nodes: ["<node_name>"]

4. Enable and start the Elasticsearch service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

  b) For SysV Init:

  .. code-block:: console

    # update-rc.d elasticsearch defaults 95 10
    # service elasticsearch start

5. Once Elasticsearch is up and running, it is recommended to load the Filebeat template. Run the following command where Filebeat was installed:

  .. code-block:: console

    # filebeat setup --index-management -E setup.template.json.enabled=false

.. note:: The Elasticsearch service listens on the default port 9200. You can make a simple check by making the following request:

    .. code-block:: console

        # curl http://<elasticsearch_ip>:9200

.. _install_kibana_app_deb:

Kibana
------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

    # apt-get install kibana=|ELASTICSEARCH_LATEST|

2. Install the Wazuh app plugin for Kibana:


  * Install from URL:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

  * Install from the package:

  .. code-block:: console

     # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

  .. note:: The `path` should have *read* permissions for *others*. E.g: The directory `/tmp/` accomplishes this.

3. Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by editing the file ``/etc/kibana/kibana.yml``, uncomment the setting ``server.host``, and change the value to:

  .. code-block:: yaml

    server.host: "<kibana_ip>"

4. Configure the URLs of the Elasticsearch instances to use for all your queries. By editing the file ``/etc/kibana/kibana.yml``:

  .. code-block:: yaml

    elasticsearch.hosts: ["http://<elasticsearch_ip>:9200"]

5. Enable and start the Kibana service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable kibana.service
    # systemctl start kibana.service

  b) For SysV Init:

  .. code-block:: console

    # update-rc.d kibana defaults 95 10
    # service kibana start

6. (Optional) Disable the Elasticsearch updates:

  It is recommended that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the App. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

  Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "elasticsearch hold" | sudo dpkg --set-selections
    # echo "kibana hold" | sudo dpkg --set-selections

.. note:: The Kibana service listens on the default port 5601.

Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow :ref:`this guide <installation_agents>` and read the instructions for your specific environment.

You can also read the Kibana app :ref:`user manual <kibana_app>` to learn more about its features and how to use it.

Uninstall
---------

To uninstall Elasticsearch:

    .. code-block:: console

      # apt-get remove elasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete files removal action is a user responsibility. It can be done by removing the folder ``/var/lib/elasticsearch`` and ``/etc/elasticsearch``.

To uninstall Kibana:

    .. code-block:: console

      # apt-get remove kibana

As in the previous case, the complete files removal can be done by removing the folder ``/var/lib/kibana`` and ``/etc/kibana``.
