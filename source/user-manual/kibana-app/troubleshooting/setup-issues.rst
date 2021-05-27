.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_setup_issues:

Possible problems with the enviroment/setup
===========================================

"Incorrect Kibana version in plugin [wazuh]" when installing the Wazuh Kibana plugin
------------------------------------------------------------------------------------

To install the Wazuh Kibana plugin successfully, it needs to be compatible with the Kibana and Wazuh versions.

Kibana version can be checked by executing the following command:

.. code-block:: console

 # cat /usr/share/kibana/package.json | grep version

An example output of the command looks as follows:

.. code-block:: console
  :class: output

  "version": "7.10.2",


The Wazuh version can be checked by executing the following command:

.. code-block:: console

 # /var/ossec/bin/wazuh-control info | grep WAZUH_VERSION

An example output of the command looks as follows:

.. code-block:: console
  :class: output

  WAZUH_VERSION="v4.2.0"

Using the Kibana version and the Wazuh version, you can find the correct plugin in `compatibility matrix <https://github.com/wazuh/wazuh-kibana-app/#wazuh---kibana---open-distro-version-compatibility-matrix>`_.

No template found for the selected index pattern
------------------------------------------------

Elasticsearch needs a specific template to store Wazuh alerts, otherwise visualizations won't load properly. You can insert the correct template using the following command:

.. code-block:: console

  # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json | curl -X PUT "https://localhost:9200/_template/wazuh" -H 'Content-Type: application/json' -d @- -u <elasticsearch_user>:<elasticsearch_password> -k

.. code-block:: json
  :class: output

  {"acknowledged":true}

If this error occurs after an **upgrade from a 3.x version** the solution is to remove the ``wazuh-alerts-3.x-*`` index pattern. Since Wazuh 4.x, the index pattern is ``wazuh-alerts-*``, and you need to remove the old pattern for the new one to take its place.

.. code-block:: console
   
   # curl 'https://<kibana_ip>:<kibana_port>/api/saved_objects/index-pattern/wazuh-alerts-3.x-*' -X DELETE  -H 'Content-Type: application/json' -H 'kbn-version: 7.10.2' -k -u <elasticsearch_user>:<elasticsearch_password>


If you have a custom index pattern, make sure to replace it accordingly.

**Very important:** Clean the browser’s cache and cookies.
