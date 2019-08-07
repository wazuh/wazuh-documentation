.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_rpm:

Install Elastic Stack with RPM packages
=======================================

The RPM packages are suitable for installation on Red Hat, CentOS and other RPM-based systems.

.. note:: All the commands described below need to be executed with root user privileges.

Preparation
-----------

1. Install the Elastic repository and its GPG key:

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

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_.

1. Install the Elasticsearch package:

  .. code-block:: console

    # yum install elasticsearch-7.2.0

2. Enable and start the Elasticsearch service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

  b) For SysV Init:

  .. code-block:: console

    # chkconfig --add elasticsearch
    # service elasticsearch start

3. Once Elasticsearch is up and running, it is recommended to load the Filebeat template. Run the following command where Filebeat was installed (current host, for single architecture or Wazuh manager host for distributed architecture):

  .. code-block:: console

    # filebeat setup --index-management -E setup.template.json.enabled=false

.. _install_kibana_app_rpm:

Kibana
------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

    # yum install kibana-7.2.0

2. Install the Wazuh app plugin for Kibana:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.9.3_7.2.0.zip

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

    # chkconfig --add kibana
    # service kibana start

5. (Optional) Disable the Elasticsearch repository:

  It is recommended that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the App. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow :ref:`this guide <installation_agents>` and read the instructions for your specific environment.

You can also read the Kibana app :ref:`user manual <kibana_app>` to learn more about its features and how to use it.
