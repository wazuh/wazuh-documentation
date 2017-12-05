.. _upgrading_different_major:

Upgrade from different major version
=====================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x, including a full upgrade of the Elastic Stack.

You have to stop the following services.

Manager upgrade:

.. code-block:: console

    # systemctl stop filebeat
    # systemctl stop wazuh-api
    # systemctl stop wazuh-manager

Agent upgrade:

.. code-block:: console

    # systemctl stop wazuh-agent

Upgrade Wazuh manager
------------------------

1. Add the new repository for Wazuh 3.x.

    .. code-block:: console

        # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

2. Update the repositories in your system.

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

        # yum update

  b) For Debian/Ubuntu:

  .. code-block:: console

        # apt-get update

3. Upgrade the manager

  a) Upgrade Wazuh manager on CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install wazuh-manager

  b) Upgrade Wazuh manager on Debian/Ubuntu:

  .. code-block:: console

      # apt-get install wazuh-manager

4. Upgrade the API

  a) Upgrade Wazuh API on CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install wazuh-api

  b) Upgrade Wazuh API on Debian/Ubuntu:

  .. code-block:: console

      # apt-get install wazuh-api


Upgrade Wazuh agent
------------------------

1. Add the new repository for Wazuh 3.x.

    .. code-block:: console

        # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

2. Update the repositories in your system.

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

        # yum update

  b) For Debian/Ubuntu:

  .. code-block:: console

        # apt-get update

3. Upgrade the agent.

  a) Upgrade Wazuh agent on CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install wazuh-agent

  b) Upgrade Wazuh agent on Debian/Ubuntu:

  .. code-block:: console

      # apt-get install wazuh-agent


Upgrade Elastic Stack
---------------------

1. Remove the Wazuh Kibana App plugin from Kibana:

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin remove wazuh
        # rm -rf /usr/share/kibana/optimize/bundles


2. Upgrade Elastic Stack to 6.0:

    To upgrade the Elastic components follow the official documentation where you will find a complete guide for each use case.

    - Upgrading Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html

    - Upgrading Logstash: https://www.elastic.co/guide/en/logstash/current/upgrading-logstash.html

    - Upgrading Kibana: https://www.elastic.co/guide/en/kibana/current/upgrade.html

    - Upgrading Filebeat: https://www.elastic.co/guide/en/beats/libbeat/6.0/upgrading.html

.. warning::
    Do NOT start the services after the upgrade as they need further configuration prior to that.


3. Download and set the Wazuh configuration for Logstash:

This substitution will overwrite previous logstash configuration. **We recommend to backup the current configuration before applying the new one.**

  a) Local configuration:

  .. code-block:: console

    # cp /etc/logstash/conf.d/01-wazuh.conf /path/01-wazuh.conf.bak
    # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/logstash/01-wazuh-local.conf

  b) Remote configuration:

  .. code-block:: console

    # cp /etc/logstash/conf.d/01-wazuh.conf /path/01-wazuh.conf.bak
    # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/logstash/01-wazuh-remote.conf


4. Restart Elasticsearch node:

    .. code-block:: console

        # systemctl daemon-reload
        # systemctl restart elasticsearch


5. Load Wazuh Elasticsearch templates:

Load the new templates for Wazuh alerts. To do this, we execute the following commands.

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/wazuh-elastic6-template-monitoring.json | curl -XPUT 'http://localhost:9200/_template/wazuh-agent' -H 'Content-Type: application/json' -d @-


6. Insert sample alert in Elasticsearch:

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/alert_sample.json | curl -XPUT "http://localhost:9200/wazuh-alerts-3.x-"`date +%Y.%m.%d`"/wazuh/sample" -H 'Content-Type: application/json' -d @-


7. Migrate .kibana from 5.x to 6.x:

The .kibana index (which holds Kibana configuration) has drastically changed. To migrate it, follow the official documentation:

  - Upgrading Elasticsearch: https://www.elastic.co/guide/en/kibana/current/migrating-6.0-index.html

.. warning::
    This process will delete the old .kibana index and, although the procedure is safe, be warned.


8. Upgrade Wazuh Kibana App:

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip


9. Restart services:

    .. code-block:: console

        # systemctl daemon-reload
        # systemctl elasticsearch restart
        # systemctl logstash start
        # systemctl kibana start
        # systemctl filebeat start


Reindexing your previous alerts
-------------------------------

A reindex can be a complex process, depending on how big is your dataset. Do it only if you are interested in visualizing alerts generated before the upgrade in your Kibana environment.

In the new version of Wazuh, there's a change in the Wazuh alerts structure. Now, the new alerts bring more information to the final user. That is why Wazuh 3.x uses different
indices and templates than Wazuh 2.x.

For that reason, you will not be able to see the previous alerts using Kibana. If you need to access them, you will have to reindex the previous indices.

.. note::
    Not reindexing alerts doesn't mean that they will disappear, alerts will still be stored in Elasticsearch and the Wazuh manager.
