.. _upgrading_different_major:

Upgrade from different major version
=====================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x, including a full upgrade of the Elastic Stack.

Depending on the upgrade case, you have to stop the following services.

Manager upgrade:

.. code-block:: console

    # systemctl stop filebeat
    # systemctl stop wazuh-api
    # systemctl stop wazuh-manager

Agent upgrade:

.. code-block:: console

    # systemctl stop wazuh-agent

Upgrade Wazuh components
------------------------

First of all, we have to add the new repository for Wazuh 3.x.

    .. code-block:: console

        # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

In this repository is located the new version of Wazuh components, so we are able to upgrade them directly.

The second step is to update the repositories of our system.

a) For CentOS/RHEL/Fedora:

  .. code-block:: console

        # yum update

b) For Debian/Ubuntu:

  .. code-block:: console

        # apt-get update


Upgrade Wazuh manager
^^^^^^^^^^^^^^^^^^^^^

a) Upgrade Wazuh manager on CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install wazuh-manager

b) Upgrade Wazuh manager on Debian/Ubuntu:

  .. code-block:: console

      # apt-get install wazuh-manager

Upgrade Wazuh API
^^^^^^^^^^^^^^^^^

a) Upgrade Wazuh API on CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install wazuh-api

b) Upgrade Wazuh API on Debian/Ubuntu:

  .. code-block:: console

      # apt-get install wazuh-api

Upgrade Wazuh agent
^^^^^^^^^^^^^^^^^^^

In order to upgrade Wazuh agents, you only need to add Wazuh's repository and upgrade the Wazuh agent.

a) Upgrade Wazuh agent on CentOS/RHEL/Fedora:

  .. code-block:: console

      # yum install wazuh-agent

b) Upgrade Wazuh agent on Debian/Ubuntu:

  .. code-block:: console

      # apt-get install wazuh-agent

Upgrade Elastic Stack
---------------------

In order to perform the upgrade of the Elastic Stack, follow these steps.

1. Remove Wazuh Kibana App plugin from Kibana:

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin remove wazuh
        # rm -rf /usr/share/kibana/optimize/bundles


2. Upgrade Elastic Stack to 6.0:

    For upgrading Elastic components follow their official documentation where you will find a complete guide for each use case.

    - Upgrading Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html

    - Upgrading Logstash: https://www.elastic.co/guide/en/logstash/current/upgrading-logstash.html

    - Upgrading Kibana: https://www.elastic.co/guide/en/kibana/current/upgrade.html

    - Upgrading Filebeat: https://www.elastic.co/guide/en/beats/libbeat/6.0/upgrading.html

.. warning::
    Do not start services after the upgrade due to it is necessary to configure them before.


3. Download and set the Wazuh configuration for Logstash:

It is necessary to apply this new configuration for using Wazuh 3.x with Logstash 6.x. However, this sustitution will overwrite
previous logstash configuration. **We recommend to backup current configuration before applying the new one.**

.. code-block:: console

  # cp /etc/logstash/conf.d/01-wazuh.conf /path/01-wazuh.conf.bak
  # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/logstash/01-wazuh.conf


4. **Follow this step only if you are using a single-host architecture**:

    Edit ``/etc/logstash/conf.d/01-wazuh.conf``, commenting out the entire input section titled "Remote Wazuh Manager - Filebeat input" and uncommenting the entire input section titled "Local Wazuh Manager - JSON file input".  This will set up Logstash to read the Wazuh ``alerts.json`` file directly from the local filesystem rather than expecting Filebeat on a separate server to forward the information in that file to Logstash.


5. Restart Elasticsearch node:

    .. code-block:: console

        # systemctl daemon-reload
        # systemctl restart elasticsearch


6. Load Wazuh Elasticsearch templates:

We should load new templates for Wazuh alerts in order to index them correctly in Elasticsearch. To do this, we execute the following commands.

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/wazuh-elastic6-template-monitoring.json | curl -XPUT 'http://localhost:9200/_template/wazuh-agent' -H 'Content-Type: application/json' -d @-


7. Insert sample alert in Elasticsearch:

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/alert_sample.json | curl -XPUT "http://localhost:9200/wazuh-alerts-"`date +%Y.%m.%d`"/wazuh/sample" -H 'Content-Type: application/json' -d @-


8. Delete indices of the current day from Elasticsearch:

Elasticsearch index alert fields when it receives them first time each day, upgrading Wazuh 3.0 will provoke that Elasticsearch receives new kind of fields because Wazuh 3.0 alerts have a new structure.

This incompatibility causes Elasticsearch not to work correctly. For solve this issue we have to remove indices stored by Elasticsearch for the day of the upgrade process.


This step is too simple, we just have to run the following ``curl`` call setting the correct date.

    .. code-block:: console

        # curl -XDELETE 'localhost:9200/wazuh-alerts-{year}.{month}.{day}'


9. Upgrade Wazuh Kibana App:

    .. code-block:: console

        # /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

10. Restart services:

    .. code-block:: console

        # systemctl daemon-reload
        # systemctl elasticsearch restart
        # systemctl logstash start
        # systemctl kibana start
        # systemctl filebeat start


Reindexing your previous alerts
-------------------------------

A reindex can be a complex process, depending on how big is your dataset. Do it only if you are interested in visualize alerts generated before the upgrade in your Kibana environment.

In the new version of Wazuh, there's a change in the Wazuh alerts structure. Now, the new alerts bring more information to the final user. That is why Wazuh 3.x uses different
indices and templates than Wazuh 2.x For that reason, you will not be able to see the previous alerts using Kibana. If you need to access them, you will have to reindex the previous indices.

.. note::
    Not reindex alerts does not means that they will disappear, alerts will still be stored in Elasticsearch and the Wazuh manager.
