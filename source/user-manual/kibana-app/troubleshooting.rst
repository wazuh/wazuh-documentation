.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

This section guides about how to solve the most common problems with the Wazuh Kibana plugin and, in case of not finding the solution here, how to reach us providing information regarding the issue, allowing us to assist further.

"Plugin installation was unsuccessful due to error 'Plugin wazuh [<version>] is incompatible with Kibana [<version>]'" when installing the plugin
-------------------------------------------------------------------------------------------------------------------------------------------------

Wazuh Kibana plugin must be installed in the correct version, which depends both on the Kibana and the Wazuh version.

Kibana version can be checked by executing the following command:

.. code-block:: console

 # cat /usr/share/kibana/package.json | grep version

An example output of the command looks as follows:

.. code-block:: console
  :class: output

  # "version": "7.6.2",

The Wazuh version can be checked by executing the following command:

.. code-block:: console

 # cat /var/ossec/etc/ossec-init.conf | grep VERSION

An example output of the command looks as follows:

.. code-block:: console
  :class: output

  # VERSION="v3.12.2"

Using the Kibana version and the Wazuh version, the correct plugin can be found in the Wazuh `compatibility matrix <https://github.com/wazuh/wazuh-kibana-app/#older-packages>`_.

No template found for the selected index pattern
------------------------------------------------

Elasticsearch needs a specific template to store Wazuh alerts, otherwise, visualizations won't load properly. The correct template can be inserted using the following command:

.. code-block:: console

  # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json | curl -X PUT "http://localhost:9200/_template/wazuh" -H 'Content-Type: application/json' -d @-

.. code-block:: json
  :class: output

  {"acknowledged":true}

.. warning::
  Indices with the wrong template will need to be reindexed. The process is explained in the :ref:`reindexation guide <restore_alerts>`.

"Wazuh API seems to be down" information displayed while launching the Wazuh Kibana plugin
------------------------------------------------------------------------------------------

The Wazuh Kibana plugin needs data provided by the Wazuh API. To accomplish that, the Wazuh API service has to be active, and there must be connectivity between the Wazuh server and the Kibana server. The other reason for this information to appear can be that there is the Wazuh API version mismatch.

The status of the Wazuh API service can be checked with the following command:

.. tabs::

 .. group-tab:: Systemd

  .. code-block:: console

   # systemctl status wazuh-api

 .. group-tab:: SysV init

  .. code-block:: console

   # service wazuh-api status

If the Wazuh API is running, try to fetch data using the CLI on the Kibana server:

.. code-block:: console

  # curl -k -u api_user:api_password http(s)://api_url:55000/version

If the curl command fails but the Wazuh API is running properly, it means that there is a connectivity problem between the servers.

The Wazuh Kibana plugin uses the Wazuh API to fetch information, being compatible between patch versions.

For example, the Wazuh API v3.7.1 can be used with the Wazuh Kibana plugin designed for the Wazuh v3.7.2, but cannot be used with the Wazuh Kibana plugin designed for Wazuh v|WAZUH_LATEST|.


The Wazuh Kibana plugin does not show the alerts
------------------------------------------------

The first step is to check if there are alerts in Elasticsearch:

.. code-block:: console

  # curl <ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-3.x-*

If the command does not list any Wazuh related indexes, it means that there are no alerts stored in Elasticsearch.

The next step is to check if Filebeat is reading the ``alerts.json`` file:

.. code-block:: console

  # lsof /var/ossec/logs/alerts/alerts.json

There should be two processes reading the ``alerts.json`` file: ``ossec-analysisd`` and ``filebeat``.

None of the above solutions are fixing the problem
--------------------------------------------------

All the technologies used by Wazuh have their own logs files, which can provide error and warning messages.

#. Elastic Stack log files:

    .. code-block:: console

      # cat /var/log/elasticsearch/elasticsearch.log | grep -i -E "error|warn"
      # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"

    .. note::
      By default, Elastic Stack uses the ``/var/log`` folder to store logs. This setting can be customized following the documentation for `Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html>`_ or `Filebeat <https://www.elastic.co/guide/en/beats/filebeat/current/configuration-logging.html>`_.
      Kibana, by default, does not store logs on a file. It can be configured with the ``logging.dest`` setting in the ``kibana.yml`` configuration file. Check the `Kibana documentation <https://www.elastic.co/guide/en/kibana/current/settings.html>`_ for more details.

#. The Wazuh Kibana plugin log file:

    .. code-block:: console

      # cat /usr/share/kibana/optimize/wazuh/logs/wazuhapp.log | grep -i -E "error|warn"

#. The Wazuh manager log file:

    .. code-block:: console

      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

Our community channels are always available to open a new thread in Wazuh `Google mailing list <https://groups.google.com/group/wazuh>`_, Wazuh `Slack channel <//https://wazuh.com/community/join-us-on-slack/>`_, or a new issue in Wazuh `GitHub repository <https://github.com/wazuh/wazuh-kibana-app/issues>`_, providing as much information as possible about the issue. We are always there to help.
