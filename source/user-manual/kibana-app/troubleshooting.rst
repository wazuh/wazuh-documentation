.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

This section collects common installation or usage problems on the Wazuh app, and some basic steps to solve them.

"Incorrect Kibana version in plugin [wazuh]" when installing the app
--------------------------------------------------------------------

The Wazuh app has a file named *package.json*, it includes dependencies along more information. One of them is the Kibana version:

.. code-block:: console

  "kibana": {
    "version": "6.4.2"
  },

Your app must match the installed Kibana version. If the version field in the *package.json* file is ``6.4.2`` then your installed Kibana version must be ``6.4.2``.

You can check our :ref:`compatibility_matrix` to learn more about product compatibility between Wazuh and the Elastic Stack.

No template found for the selected index pattern
------------------------------------------------

Elasticsearch needs a specific template to store Wazuh alerts, otherwise visualizations won't load properly. You can insert the correct template using the following command:

.. code-block:: console

  # curl https://raw.githubusercontent.com/wazuh/wazuh/3.7/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

  {"acknowledged":true}

.. warning::
  Indices with the wrong template will need to be reindexed. You can follow our :ref:`reindexation guide <restore_alerts>`.

Wazuh API seems to be down
--------------------------

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
-----------------------------------

The first step is to check if there are alerts in Elasticsearch.

.. code-block:: console

  # curl <ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-3.x-*

If you don't see any Wazuh related index, it means you have no alerts stored in Elasticsearch.

a) If you are using a **single-host** architecture, check if Logstash is reading the ``alerts.json`` file:

.. code-block:: console

  # lsof /var/ossec/logs/alerts/alerts.json

There should be two processes reading the ``alerts.json`` file: ``ossec-analysisd`` and ``java``.

b) If you are using a **distributed** architecture, check if Filebeat is reading the ``alerts.json`` file:

.. code-block:: console

  # lsof /var/ossec/logs/alerts/alerts.json

There should be two processes reading the ``alerts.json`` file: ``ossec-analysisd`` and ``filebeat``.

API version mismatch. Expected vX.Y.Z
-------------------------------------

The Wazuh app uses the Wazuh API to fetch information, being compatible between patch versions. For example, you can use an app designed for Wazuh 3.6.1 with a Wazuh API 3.6.0.

You can't use the 3.6.1 version of Wazuh API with a Wazuh app designed for Wazuh 3.7.0.

Check our :ref:`compatibility_matrix` to learn more about compatibility between the API and the app.

Routes. Error. Cannot read property 'manager' of undefined
----------------------------------------------------------

This error usually means that you're using Wazuh v2.x with Elastic Stack v6.x, or Wazuh v3.x with Elastic Stack v5.x.

You have to use the correct versions of Wazuh and the Elastic Stack to work properly. We always recommend upgrading to the latest version following :ref:`this guide <upgrading_different_major>`.

.. _kibana_troubleshooting_3_7_0:

Failed to parse date field with format ``dateOptionalTime``
-----------------------------------------------------------

This error message appears when clicking on the **View surrounding documents** or **View single document** buttons from an alert on the **Discover** tab. This is due to a breaking change introduced on :ref:`Wazuh 3.7.0 <release_3_7_0>`.

In previous versions of Wazuh, the Elasticsearch template had these properties for the ``@timestamp`` field:

.. code-block:: none

  "@timestamp": {
    "type": "date",
    "format": "dateOptionalTime"
  },

As of Elastic Stack 6.4.x, the **date format** causes an error when viewing the surrounding documents, and to fix this, the Elasticsearch templated was updated:

.. code-block:: none

  "@timestamp": {
    "type": "date"
  },

This change is not critical and **won't cause any data loss** on Elasticsearch. For now, the only case where this issue appears is on the **View surrounding documents** option. After updating Wazuh and the Elastic Stack following our :ref:`upgrading guide <upgrading_latest_minor>`, the new template will be in use, and the next daily indices will be created using the new date format.

However, if you want to fix this problem for the affected indices, there are different options that you can try in order to correct them:

.. warning::
  The following methods require stopping the Logstash service before proceeding. After finishing, you can restart it again.

- **Reindex indices:** The most basic form of reindexation consists of copying the documents from one index to another. In this case, we use this procedure to create a new index using the updated template, so we can then remove the old one, and finally, reindex the new index into the previous one.

  On the Elasticsearch documentation you can find more info about the `Reindex API <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_.

+ **Close indices:** Closing an index will be blocked for read/write operations, so it won't be used when visualizing alerts on Kibana, although the data will be still available for archiving purposes.

  On the Elasticsearch documentation you can find more info about the `Open/Close index API <https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-open-close.html>`_.

- **Delete indices:** This method is not suitable for production environments where all the data must be stored or archived. It's more convenient for testing environments, since it's the fastest method to fix the issue.

  On the Elasticsearch documentation you can find more info about the `Delete index API <https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-delete-index.html>`_.

This breaking change could lead into a *X of Y shards failed* message because of the presence of old and new Elasticsearch indices using different templates, but it's not critical or harmful.

None of the above solutions are fixing my problem
-------------------------------------------------

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
