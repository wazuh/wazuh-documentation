.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

This section collects common installation or usage problems on the Wazuh app, and some basic steps to solve them.

**"Plugin installation was unsuccessful due to error "Incorrect Kibana version in plugin [wazuh]. Expected [6.2.4]; found [6.3.0]"**

    The Wazuh app has a file named *package.json*, it includes dependencies along more information. One included thing is the Kibana version:

    .. code-block:: console

        "kibana": {
            "version": "6.3.0"
        },

    Your app must to match to the installed Kibana version. If you have, for example, ``6.3.0`` in the *package.json* file, your installed Kibana version must be ``6.3.0``. You can check our :ref:`compatibility_matrix` to learn more about product compatibility between Wazuh and the Elastic Stack.

**No template found for the selected index-pattern**

    Elasticsearch needs the right template to ingest alerts on the right way, otherwise you'll have corrupted indices.

    .. code-block:: console

        # curl https://raw.githubusercontent.com/wazuh/wazuh/3.3/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

**Wazuh RESTful API seems to be down**

    It means your Wazuh API could be unavailable. Since the Wazuh App needs data from the Wazuh API, it must to be available for the Wazuh App.

    If you are using ``systemd``, please check the status as follow:

    .. code-block:: console

        # systemctl status wazuh-api


    If you are using ``SysV Init``, please check the status as follow:

    .. code-block:: console

        # service wazuh-api status

    If the above suggestion says the Wazuh API is up, try to fetch data using the CLI from the Kibana server to the Wazuh API server:

    .. code-block:: console

        # curl api_user:api_pass@api_url:55000/version

    If the *curl* command fails but the Wazuh API is running properly, it means you have a connectivity problem between servers.

**I don't see alerts in the Wazuh App**

    The first step is to check if there are indeed no alerts in Elasticsearch.

    .. code-block:: console

        # curl <ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-3.x-*

    If you don't see any created index, means you have no alerts in Elasticsearch. Check the next steps to get it solved:

    a) If you are using a **single-host** architecture, check if Logstash is reading your *alerts.json* file:

    .. code-block:: console

        # lsof /var/ossec/logs/alerts/alerts.json

    You should see two processes reading the *alerts.json* file: *ossec-analysisd* and *java*.

    b) If you are using a **distributed** architecture, check if Filebeat is reading your *alerts.json* file:

    .. code-block:: console

        # lsof /var/ossec/logs/alerts/alerts.json

    You should see two processes reading the *alerts.json* file: *ossec-analysisd* and *filebeat*.

**API version mismatch. Expected v3.2.0**

    The Wazuh app uses the Wazuh API to fetch some information, and they are compatible between patch versions, this means you could use an app designed for Wazuh 3.3.1 with a Wazuh API 3.3.0.

    You can't use the 3.3.0 version of Wazuh API with a Wazuh app designed for Wazuh 3.2.4.

    Check our :ref:`compatibility_matrix` to learn more about compatibility between the API and the app.

**Routes. Error. Cannot read property 'manager' of undefined**

    This error usually means that you're using Wazuh v2.x with Elastic Stack v6.x, or Wazuh v3.x with Elastic Stack v5.x.

    You have to use the correct versions of Wazuh and the Elastic Stack to work properly. We always recommend upgrading to the latest version following :ref:`this guide <upgrading_different_major>`.

**None of the above solutions are fixing my problem**

    All the technologies we are using have their own logs files, so you could check them and look for error messages and warning messages.

    1. Check the Elastic stack log files:

    .. code-block:: console

        # cat /var/log/elasticsearch/elasticsearch.log | grep -i -E "error|warn"
        # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"
        # cat /var/log/logstash/logstash-plain.log | grep -i -E "error|warn"

    2. Check the Wazuh App log file:

    .. code-block:: console

        # cat /usr/share/kibana/plugins/wazuh-logs/wazuhapp.log | grep -i -E "error|warn"

    3. Check the Wazuh Manager log file:

    .. code-block:: console

        # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

You can also open a new thread in our `Google mailing list <https://groups.google.com/group/wazuh>`_, or a new issue in our `GitHub repository <https://github.com/wazuh/wazuh-kibana-app/issues>`_.
