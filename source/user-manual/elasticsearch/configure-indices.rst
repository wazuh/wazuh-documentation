.. Copyright (C) 2015, Wazuh, Inc.

.. _kibana_configure_indices:

Indices configuration
=====================

This section describes the process of configuring the name of the indices that Elasticsearch generates to store the Wazuh alerts and use them for visualizations on the Wazuh Kibana plugin.

The process involves the modification of the Elasticsearch template used to give format to the events coming from the ``alerts.json`` file, and some configuration adjustments on Kibana and the Wazuh Kibana plugin.

.. warning::
  This process could lead into a broken installation of the Elastic Stack if it's not followed step by step. Please proceed carefully.

Considerations
--------------

Using a custom index name is possible on the latest versions of the Elastic Stack and the Wazuh Kibana plugin. We always recommend updating the installation to the latest version in order get the latest features and bugfixes, so in case you need to update yours, check out the :ref:`upgrading guide <upgrading_wazuh_server>`.

.. note::
  This tutorial **won't work** on Wazuh 2.x and Elastic Stack 5.x.

Also, keep in mind that this process **will be restored** after upgrading the Wazuh Kibana plugin, or any of the Elastic Stack components involved during the process. The reason for this depends on each component:

- On Elasticsearch, every new upgrade requires to update the Wazuh template, so the default index pattern will be restored.
- On Filebeat, every new upgrade requires to update the Wazuh configuration file, so the default name will be used to create indices.
- On Kibana and the Wazuh Kibana plugin, the configuration file is removed when installing a new version of the plugin, so it's necessary to apply again the custom settings.

Procedure
---------

Let's suppose that we want to add a new index pattern (``my-custom-alerts-*``) along with the default one, ``wazuh-alerts-*``. Follow these steps:

#. First of all, stop the Filebeat service:

    a. For Systemd:

       .. code-block:: console

        # systemctl stop filebeat

    b. For SysV Init:

       .. code-block:: console

        # service filebeat stop

#. Download the Wazuh template for Elasticsearch and save it into a file (for example, *template.json*):

    .. code-block:: console

      # curl -so template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json

#. Open the template file and locate this line:

    .. code-block:: javascript

      "index_patterns": ["wazuh-alerts-*"],

    Add your custom pattern:

    .. code-block:: javascript

      "index_patterns": ["wazuh-alerts-*", "my-custom-alerts-*"],

    If your template is a custom template and it's still using the ``"template": "wazuh-alerts-*",`` setting, remove that line, just use ``"index_patterns": ["wazuh-alerts-*", "my-custom-alerts-*"],``.

    The asterisk character (``*``) on the index patterns is important because Filebeat will create indices in Elasticsearch using a name that follows this pattern, which is necessary to apply the proper format to visualize the alerts on the Wazuh Kibana plugin.

#. Save the modifications and insert the new template into Elasticsearch. This will replace the current template:

    .. code-block:: console

      # curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @template.json

    .. code-block:: json
      :class: output

      {"acknowledged":true}

    .. note::
      ``{"acknowledged":true}`` indicates that the template was inserted correctly.

#. Open the Wazuh configuration file for Wazuh filebeat module for alerts (``/usr/share/filebeat/module/wazuh/alerts/manifest.yml``) and archives (``/usr/share/filebeat/module/wazuh/archives/manifest.yml``) and replace the index name:

    For example, from

    .. code-block:: yaml

        - name: index_prefix
          default: wazuh-alerts-

    To this:

    .. code-block:: yaml

        - name: index_prefix
          default: my-custom-alerts-


    .. note::
      Index name must not contain the characters ``#``, ``\``, ``/``, ``*``, ``?``, ``"``, ``<``, ``>``, ``|``, ``,`` and must not start with ``_``, ``-`` or ``+``. Also, all the letters must be lowercase.




#. (Optional) If you want to use the new index pattern by default, open the Wazuh Kibana app configuration file (``/usr/share/kibana/data/wazuh/config/wazuh.yml``) and modify the ``pattern`` setting with the new one. It should be like this:

    .. code-block:: yaml

      pattern: my-custom-alerts-*

    This will make the Wazuh Kibana plugin to automatically create and/or select the new index pattern.

    Restart the Kibana service:

    a. For Systemd:

       .. code-block:: console

        # systemctl restart kibana

    b. For SysV Init:

       .. code-block:: console

        # service kibana restart

#. Restart the Filebeat service:

    a. For Systemd:

       .. code-block:: console

        # systemctl restart filebeat

    b. For SysV Init:

       .. code-block:: console

        # service filebeat restart

If the pattern is not present in Kibana UI, you may create a new one using the same name used on the Elasticsearch template, and make sure to use ``timestamp`` as the Time Filter field name.

You can also open the Pattern section on the Wazuh dashboard, and make sure that the new one is selected.

.. warning::
  If you already have indices created with the previous name, they won't be changed. You can still change to the previous index pattern to see them, or you can perform a `reindexation <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html>`_ to rename the existing indices.
