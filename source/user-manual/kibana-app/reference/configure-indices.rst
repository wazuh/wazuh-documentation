.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_configure_indices:

Configure the name of Elasticsearch indices
===========================================

This section describes the process of configuring the name of the indices that Elasticsearch generates to store the Wazuh alerts and use them for visualizations on the Kibana app.

The process involves the modification of the Elasticsearch template used to give format to the events coming from the ``alerts.json`` file, and some configuration adjustments on Kibana and the Wazuh app.

.. warning::
  This process could lead into a broken installation of the Elastic Stack if it's not followed step by step. Please proceed carefully.

Considerations
--------------

Changing the name of the indices is possible on the latest versions of the Elastic Stack and the Wazuh app. We always recommend updating the installation to the latest version in order get the latest features and bugfixes, so in case you need to update yours, check out the :ref:`upgrading guide <upgrading_wazuh>`.

.. note::
  This tutorial **won`t work** on Wazuh 2.x and Elastic Stack 5.x.

Also, keep in mind that this process **will be restored** after upgrading the Wazuh app, or any of the Elastic Stack components involved during the process. The reason for this depends on each component:

- On Elasticsearch, every new upgrade requires to update the Wazuh template, so the default name will be restored.
- On Logstash, every new upgrade requires to update the Wazuh configuration file, so the default name will be used to create indices.
- On Kibana and the Wazuh app, the configuration file is removed when installing a new version of the app, so it's necessary to apply again the custom settings.

Procedure
---------

Let's suppose that we want to change the indices from ``wazuh-alerts-3.x-*`` to ``my-custom-alerts-*``. Follow these steps:

1. First of all, stop Logstash and Kibana services:

  a. For Systemd:

  .. code-block:: console

    # systemctl stop logstash
    # systemctl stop kibana

  b. For SysV Init:

  .. code-block:: console

    # service logstash stop
    # service kibana stop

2. Download the Wazuh template for Elasticsearch and save it into a file (for example, *template.json*):

  .. code-block:: console

    # curl -so template.json https://raw.githubusercontent.com/wazuh/wazuh/3.7/extensions/elasticsearch/wazuh-elastic6-template-alerts.json

3. Open the template file and locate the line with the name, and change it with the new one:

  From this:

  .. code-block:: none

    "template": "wazuh-alerts-3.x-*",

  To this:

  .. code-block:: none

    "template": "my-custom-alerts-*",

  The asterisk character (``*``) is important, because Logstash will create indices in Elasticsearch with the same name along with the date the index was created. The Wazuh app requires an index pattern, which will be the same as the new template name.

4. Save the modifications and insert the new template into Elasticsearch. This will replace the current template:

  .. code-block:: console

    # cat template.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

    {"acknowledged":true}

  .. note::
    ``{"acknowledged":true}`` indicates that the template was inserted correctly.

5. Open the Wazuh configuration file for Logstash (``/etc/logstash/conf.d/01-wazuh.conf``) and replace the index name on the ``output -> elasticsearch`` section:

  From this:

  .. code-block:: none

    index => "wazuh-alerts-3.x-%{+YYYY.MM.dd}"

  To this:

  .. code-block:: none

    index => "my-custom-alerts-%{+YYYY.MM.dd}"

7. Open the Wazuh Kibana app configuration file (``/usr/share/kibana/plugins/wazuh/config.yml``) and modify the ``pattern`` setting with the new one. It should be like this:

  .. code-block:: yaml

    pattern: my-custom-alerts-*

  This will make the app to automatically generate the proper index pattern for your new indices.

8. Restart the Logstash and Kibana services:

  a. For Systemd:

  .. code-block:: console

    # systemctl restart logstash
    # systemctl restart kibana

  b. For SysV Init:

  .. code-block:: console

    # service logstash restart
    # service kibana restart

9. After waiting some minutes, open up again the Kibana interface on your web browser. If you go to *Management -> Index patterns*, you should see your new index pattern created and ready to use. You can also open the :ref:`Pattern <kibana_index_pattern>` section on the Wazuh app, and make sure that the new one is selected.

.. warning::
  If you already have indices created with the previous name, they won't be changed, and cannot be used with the new index pattern on the Wazuh app. You can still change to the previous index pattern to see them, or you can perform a `reindexation <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_ to rename the existing indices.
