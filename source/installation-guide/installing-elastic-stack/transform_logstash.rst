.. Copyright (C) 2019 Wazuh, Inc.

.. _transform_logstash:

Transform your data with Logstash
=================================

Logstash is an open source data collection engine with real-time pipelining capabilities. Logstash can dynamically unify data
from disparate sources and normalize the data into destinations of your choice. Cleanse and democratize all your data for diverse
advanced downstream analytics and visualization use cases.

This guide describes how to configure Logstash for receiving events from one or more Filebeat instances, parse the events, and then send
them to Elasticsearch.

1. Install Java 8.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install java-1.8.0-openjdk

  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get update
      # apt-get install openjdk-8-jre

2. Install the Elastic repository and its GPG key.

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

      # apt-get install curl apt-transport-https
      # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
      # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list
      # apt-get update

3. Install Logstash.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install logstash-|ELASTICSEARCH_LATEST|
      # systemctl daemon-reload
      # systemctl enable logstash

  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install logstash=1:|ELASTICSEARCH_LATEST|-1
      # systemctl daemon-reload
      # systemctl enable logstash

4. Download the Wazuh configuration file for Logstash.

  .. code-block:: console

    # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/logstash/7.x/01-wazuh-remote.conf

5. Restart Logstash.

  .. code-block:: console

    # systemctl restart logstash

6. Configure the Filebeat instance, change the events destination from Elasticsearch instance to the Logstash instance.

  * Disable the Elasticsearch output in ``/etc/filebeat/filebeat.yml``.

    .. code-block:: yaml

      # output.elasticsearch:
      # hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']

  * Add the Logstash output in ``/etc/filebeat/filebeat.yml``.

    .. code-block:: yaml

      output.logstash.hosts: ["YOUR_LOGSTASH_SERVER_IP:5000"]

7. Restart Filebeat.

  .. code-block:: console

    # systemctl restart filebeat

8. Check if Logstash is reachable from Filebeat.

  .. code-block:: console

    # filebeat test output

  Example output:

  .. code-block:: none
    :class: output

    logstash: 172.16.1.2:5000...
    connection...
      parse host... OK
      dns lookup... OK
      addresses: 172.16.1.2
      dial up... OK
    TLS... WARN secure connection disabled
    talk to server... OK

Useful information for events transformation:

  - `Transforming Data <https://www.elastic.co/guide/en/logstash/current/transformation.html>`_
