.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_configure_indices:

Configure the name of Elasticsearch indices
===========================================

The Wazuh alerts are being stored in Elasticsearch indices which are used to create the visualizations in Wazuh Kibana plugin. This section describes how to configure the name of these indices.


The process involves the modification of the Wazuh template for Elasticsearch, the configuration file for Wazuh filebeat module for alerts, and the Wazuh Kibana plugin configuration file.

.. warning::

  This process could lead into a broken installation of the Elastic Stack if it's not followed step by step. Please proceed carefully.

This process will be restored after upgrading the Wazuh Kibana plugin, or any of the Elastic Stack components involved during the process. The reason for this depends on each component:

- On Elasticsearch, every new upgrade requires to update the Wazuh template, so the default index pattern will be restored.
- On Filebeat, every new upgrade requires to update the configuration file for the Wazuh filebeat module, so the default name will be used to create indices.
- On Kibana and the Wazuh Kibana plugin, the configuration file is removed when installing a new version, so it's necessary to apply again the custom settings.

Procedure
---------

This example shows how to add a new index pattern ``my-custom-alerts-*``, along with the default one, ``wazuh-alerts-3.x-*``:

#. Stop the Filebeat service:

    .. include:: ../../../_templates/common/stop_filebeat.rst

#. Download the Wazuh template for Elasticsearch and save it into a file, in this example, ``template.json``:

    .. code-block:: console

      # curl -so template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json

#. Open the template file and add the new custom pattern to the existing ones:

    .. code-block:: javascript

     "index_patterns": [
       "wazuh-alerts-3.x-*",
       "wazuh-archives-3.x-*",
       "my-custom-alerts-*"
     ],

    The asterisk character (``*``) on the index patterns is important because Filebeat will create indices in Elasticsearch using a name that follows this pattern. It is necessary to apply the proper format to be able to visualize the alerts on the Wazuh Kibana plugin.

#. Save the modifications and insert the new template into Elasticsearch. This will replace the current template:

    .. code-block:: console

      # curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @template.json

    .. code-block:: json
      :class: output

      {"acknowledged":true}

#. Open the Wazuh configuration file for Wazuh filebeat module for alerts ``/usr/share/filebeat/module/wazuh/alerts/manifest.yml``, and for the archives ``/usr/share/filebeat/module/wazuh/archives/manifest.yml``. In both of them, replace the index name:

    For example, from the index name:

    .. code-block:: yaml

        - name: index_prefix
          default: wazuh-alerts-3.x-

    To the new index name:

    .. code-block:: yaml

        - name: index_prefix
          default: my-custom-alerts-3.x-

    Index name must not contain the characters `#`, `\`, `/`, `*`, `?`, `"`, `<`, `>`, `|`, `,`, and must not start with `_`, `-` or `+`. All the letters must be lowercase.

#. Optional, to use the new index pattern by default,  modify the ``pattern`` setting in the Wazuh Kibana plugin configuration file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``:

    .. code-block:: yaml

      pattern: my-custom-alerts-*

    The Wazuh Kibana plugin will automatically create and/or select the new index pattern.

    Restart the Kibana service:

    .. include:: ../../../_templates/common/restart_kibana.rst

    Managing and creating custom index pattern can be also done from the :ref:`Index Patterns <kibana_index_pattern>` section on the Wazuh Kibana plugin.

#. Restart the Filebeat service:

    .. include:: ../../../_templates/common/restart_filebeat.rst

The Wazuh alerts belonging to the previous index will not be included in the new index, but they can still be queried after selecting their index pattern in the Wazuh Kibana plugin. They can also be `reindexed <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_ to the new index.
