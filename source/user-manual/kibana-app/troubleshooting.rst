.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

This section collects common installation or usage problems on the Wazuh app, and some basic steps to solve them.

"Incorrect Kibana version in plugin [wazuh]" when installing the app
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    The Wazuh app has a file named *package.json*, it includes dependencies along more information. One of them is the Kibana version:

    .. code-block:: console

        "kibana": {
            "version": "6.4.2"
        },

    Your app must match the installed Kibana version. If the version field in the *package.json* file is ``6.4.2`` then your installed Kibana version must be ``6.4.2``.

    You can check our :ref:`compatibility_matrix` to learn more about product compatibility between Wazuh and the Elastic Stack.

No template found for the selected index pattern
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    Elasticsearch needs a specific template to store Wazuh alerts, otherwise visualizations won't load properly. You can insert the correct template using the following command:

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.7/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

        {"acknowledged":true}

    .. warning::

        Indices with the wrong template will need to be reindexed. You can follow our :ref:`reindexation guide <restore_alerts>`.

Wazuh API seems to be down
^^^^^^^^^^^^^^^^^^^^^^^^^^

    It means your Wazuh API could be unavailable. Since the Wazuh app needs data from the Wazuh API, it must be available for the Wazuh app.

    If you are using ``systemd``, please check the status as follow:

    .. code-block:: console

        # systemctl status wazuh-api

    If you are using ``SysV Init``, please check the status as follow:

    .. code-block:: console

        # service wazuh-api status

    If the Wazuh API is running, try to fetch data using the CLI from the Kibana server:

    .. code-block:: console

        # curl api_user:api_pass@api_url:55000/version

    If the *curl* command fails but the Wazuh API is running properly, it means you have a connectivity problem between servers.

I don't see alerts in the Wazuh app
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    The first step is to check if there are alerts in Elasticsearch.

    .. code-block:: console

        # curl <ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-3.x-*

    If you don't see any Wazuh related index, it means you have no alerts stored in Elasticsearch.

    a) If you are using a **single-host** architecture, check if Logstash is reading the *alerts.json* file:

    .. code-block:: console

        # lsof /var/ossec/logs/alerts/alerts.json

    There should be two processes reading the *alerts.json* file: *ossec-analysisd* and *java*.

    b) If you are using a **distributed** architecture, check if Filebeat is reading the *alerts.json* file:

    .. code-block:: console

        # lsof /var/ossec/logs/alerts/alerts.json

    There should be two processes reading the *alerts.json* file: *ossec-analysisd* and *filebeat*.

API version mismatch. Expected vX.Y.Z
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    The Wazuh app uses the Wazuh API to fetch information, being compatible between patch versions. For example, you can use an app designed for Wazuh 3.6.1 with a Wazuh API 3.6.0.

    You can't use the 3.6.1 version of Wazuh API with a Wazuh app designed for Wazuh 3.7.0.

    Check our :ref:`compatibility_matrix` to learn more about compatibility between the API and the app.

Routes. Error. Cannot read property 'manager' of undefined
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    This error usually means that you're using Wazuh v2.x with Elastic Stack v6.x, or Wazuh v3.x with Elastic Stack v5.x.

    You have to use the correct versions of Wazuh and the Elastic Stack to work properly. We always recommend upgrading to the latest version following :ref:`this guide <upgrading_different_major>`.

.. _kibana_troubleshooting_3_7_0:

"Failed to parse date field with format ``dateOptionalTime``" error message on Discover tab
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    This error message appears when clicking on the **View surrounding documents** option from an alert on the **Discover** tab/panel. This is due to a breaking change introduced on :ref:`Wazuh 3.7.0 <release_3_7_0>`.

    To fix this problem, we can remove the current index, so Elasticsearch can recreate it using the new template.

    1. List all your indices on Elasticsearch:

      .. code-block:: console

          # curl -XGET http://localhost:9200/_cat/indices?v

          health status index                       uuid                   pri rep docs.count docs.deleted store.size pri.store.size
          yellow open   wazuh-alerts-3.x-2018.10.25 E1NgknRNR5WPpXd_chj__A   5   1         37            0    119.7kb        119.7kb
          yellow open   wazuh-alerts-3.x-2018.10.24 DWf9dgKPQWmb5XHixSdjdw   5   1        254            0    396.7kb        396.7kb
          yellow open   wazuh-alerts-3.x-2018.10.23 susXBOXdRxGEmB0m3GCBmw   5   1      27356            0     15.3mb         15.3mb
          yellow open   wazuh-alerts-3.x-2018.10.22 vwBF4WseSyurU73LBWM4MQ   5   1       4739            16     2.2mb          2.2mb

    2. Stop Logstash:

      .. code-block:: console

          # systemctl stop logstash

    3. Remove today's index (in this case, we'll remove the ``wazuh-alerts-3.x-2018.10.25`` index):

      .. code-block:: console

          # curl -XDELETE http://localhost:9200/wazuh-alerts-3.x-2018.10.25

    Let's list the Elasticsearch indices once again:

      .. code-block:: console

          # curl -XGET http://localhost:9200/_cat/indices?v

          health status index                       uuid                   pri rep docs.count docs.deleted store.size pri.store.size
          yellow open   wazuh-alerts-3.x-2018.10.24 DWf9dgKPQWmb5XHixSdjdw   5   1        254            0    396.7kb        396.7kb
          yellow open   wazuh-alerts-3.x-2018.10.23 susXBOXdRxGEmB0m3GCBmw   5   1      27356            0     15.3mb         15.3mb
          yellow open   wazuh-alerts-3.x-2018.10.22 vwBF4WseSyurU73LBWM4MQ   5   1       4739            16     2.2mb          2.2mb

    4. Insert the latest Elasticsearch template:

      .. code-block:: console

          # curl https://raw.githubusercontent.com/wazuh/wazuh/3.7/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

          {"acknowledged":true}

    5. Restart Logstash:

      .. code-block:: console

          # systemctl restart logstash

    After some time, a new index will be created, using the new Elasticsearch template.

    This will avoid the error, but a warning message will appear:

    .. code-block:: none

        Warning: 20 of 25 shards failed

    This is due to the fact that the previous indices are using a different mapping from the previous template.

    .. warning::
      To avoid the *shards failed* error, we can reindex the indices that used the old template. You can follow our :ref:`reindexation guide <restore_alerts>`.

      This process is a bit complex, and we do not recommend it for large amounts of Elasticsearch data.

None of the above solutions are fixing my problem
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    All the technologies we are using have their own logs files, you can check them and look for error and warning messages.

    1. Check the Elastic Stack log files:

    .. code-block:: console

        # cat /var/log/elasticsearch/elasticsearch.log | grep -i -E "error|warn"
        # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"
        # cat /var/log/logstash/logstash-plain.log | grep -i -E "error|warn"

    2. Check the Wazuh app log file:

    .. code-block:: console

        # cat /usr/share/kibana/plugins/wazuh-logs/wazuhapp.log | grep -i -E "error|warn"

    3. Check the Wazuh Manager log file:

    .. code-block:: console

        # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

You can also open a new thread in our `Google mailing list <https://groups.google.com/group/wazuh>`_, or a new issue in our `GitHub repository <https://github.com/wazuh/wazuh-kibana-app/issues>`_.
