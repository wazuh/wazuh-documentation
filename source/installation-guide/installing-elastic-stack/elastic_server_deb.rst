.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_deb:

Install Elastic Stack with Debian packages
==========================================

The DEB package is suitable for Debian, Ubuntu and other Debian-based systems.

.. note:: All the commands described below need to be executed with root user privileges.

Preparation
-----------

1. Install the Elastic repository and its GPG key:

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

    # apt-get install elasticsearch=7.1.0

2. Enable and start the Elasticsearch service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

  b) For SysV Init:

  .. code-block:: console

    # update-rc.d elasticsearch defaults 95 10
    # service elasticsearch start


.. _install_kibana_app_deb:

Kibana
------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

    # apt-get install kibana=7.1.0

2. Install the Wazuh app plugin for Kibana:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.9.0_7.1.0.zip

3. **Optional.** Kibana will only listen on the loopback interface (localhost) by default. To set up Kibana to listen on all interfaces, edit the file ``/etc/kibana/kibana.yml`` uncommenting the setting ``server.host``. Change the value to:

  .. code-block:: yaml

    server.host: "0.0.0.0"

4. Enable and start the Kibana service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable kibana.service
    # systemctl start kibana.service

  b) For SysV Init:

  .. code-block:: console

    # update-rc.d kibana defaults 95 10
    # service kibana start

5. (Optional) Disable the Elasticsearch updates:

  It is recommended that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the App. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

  Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "elasticsearch hold" | sudo dpkg --set-selections
    # echo "kibana hold" | sudo dpkg --set-selections
    # echo "filebeat hold" | sudo dpkg --set-selections

Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow :ref:`this guide <installation_agents>` and read the instructions for your specific environment.

You can also read the Kibana app :ref:`user manual <kibana_app>` to learn more about its features and how to use it.
