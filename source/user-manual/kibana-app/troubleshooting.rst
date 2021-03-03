.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

This section collects common installation or usage problems on the Wazuh Kibana plugin, and some basic steps to solve them.

"Incorrect Kibana version in plugin [wazuh]" when installing the Wazuh Kibana plugin
------------------------------------------------------------------------------------

Wazuh Kibana plugin must be installed in the correct version, which depends both on the Kibana and the Wazuh version.

Kibana version can be checked by executing the following command:

.. code-block:: console

 # cat /usr/share/kibana/package.json | grep version

An example output of the command looks as follows:

.. code-block:: console
  :class: output

  "version": "7.10.0",


The Wazuh version can be checked by executing the following command:

.. code-block:: console

 # cat /var/ossec/etc/ossec-init.conf | grep VERSION

An example output of the command looks as follows:

.. code-block:: console
  :class: output

  VERSION="v4.1.1"

Using the Kibana version and the Wazuh version, the correct plugin can be found in the Wazuh `compatibility matrix <https://github.com/wazuh/wazuh-kibana-app/#wazuh---kibana---open-distro-version-compatibility-matrix>`_.

No template found for the selected index pattern
------------------------------------------------

Elasticsearch needs a specific template to store Wazuh alerts, otherwise visualizations won't load properly. You can insert the correct template using the following command:

.. code-block:: console

  # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json | curl -X PUT "https://localhost:9200/_template/wazuh" -H 'Content-Type: application/json' -d @- -u <user>:<password> -k

.. code-block:: json
  :class: output

  {"acknowledged":true}

.. warning::
  Indices with the wrong template will need to be reindexed. You can follow our :ref:`reindexation guide <restore_alerts_2.x_3.x>`.

Wazuh API seems to be down
--------------------------

It means your Wazuh API could be unavailable. Since the Wazuh Kibana plugin needs data from the Wazuh API, it must be available for the Wazuh Kibana plugin.

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl status wazuh-manager



  .. group-tab:: SysV init

    .. code-block:: console

      # service wazuh-manager status


If the Wazuh API is running, try to fetch data using the CLI from the Kibana server:

.. code-block:: console

  # curl -k -X GET "https://<api_url>:55000/" -H "Authorization: Bearer $(curl -u <api_user>:<api_password> -k -X GET 'https://<api_url>:55000/security/user/authenticate?raw=true')"

.. code-block:: console
  :class: output

    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
    100   271  100   271    0     0    879      0 --:--:-- --:--:-- --:--:--   882
    {"data": {"title": "Wazuh API REST", "api_version": "4.1.1", "revision": 40110, "license_name": "GPL 2.0", "license_url": "https://github.com/wazuh/wazuh/blob/4.1/LICENSE", "hostname": "localhost.localdomain", "timestamp": "2021-03-03T10:01:18+0000"}, "error": 0}



I do not see alerts in the Wazuh Kibana plugin
----------------------------------------------

The first step is to check if there are alerts in Elasticsearch.

.. code-block:: console

  # curl https://<ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-* -u <username>:<password> -k

If you don't see any Wazuh related index, it means you have no alerts stored in Elasticsearch.

To ensure that Filebeat is correctly configured, run the following command:

.. code-block:: console

  # filebeat test output

.. code-block:: none
          :class: output

          elasticsearch: https://127.0.0.1:9200...
            parse url... OK
            connection...
              parse host... OK
              dns lookup... OK
              addresses: 127.0.0.1
              dial up... OK
            TLS...
              security: server's certificate chain verification is enabled
              handshake... OK
              TLS version: TLSv1.3
              dial up... OK
            talk to server... OK
            version: 7.10.0

Check if Filebeat is reading the ``alerts.json`` file:

.. code-block:: console

  # lsof /var/ossec/logs/alerts/alerts.json

There should be two processes reading the ``alerts.json`` file: ``ossec-analysisd`` and ``filebeat``.


Could not connect to API with id: default: 3003 - Missing param: API USERNAME
-----------------------------------------------------------------------------

Starting Wazuh 4.0 the Wazuh API username variable changed from ``user`` to ``username``. It's necessary to change the credentials (foo:bar are no longer accepted) as well as the name of the variable in the ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file. For example, the configuration can be: 

.. code-block:: console
   
   hosts:
    - production:
        url: https://localhost
        port: 55000
        username: wazuh-wui
        password: wazuh-wui
        run_as: false


None of the above solutions are fixing my problem
-------------------------------------------------

All the technologies we are using have their own logs files, you can check them and look for error and warning messages.

1. Check the Elastic Stack log files:

    .. code-block:: console

      # cat /var/log/elasticsearch/elasticsearch.log | grep -i -E "error|warn"
      # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"

    .. note::
      The Elastic Stack uses the ``/var/log`` folder to store logs by default. This setting can be customized following the documentation for `Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html>`_ or `Filebeat <https://www.elastic.co/guide/en/beats/filebeat/current/configuration-logging.html>`_.

    .. warning::
      By default, Kibana doesn't store logs on a file. It can be configured with the ``logging.dest`` setting in the ``kibana.yml`` configuration file. Check the `Kibana documentation <https://www.elastic.co/guide/en/kibana/current/settings.html>`_ for more details.

2. Check the Wazuh Kibana plugin log file:

    .. code-block:: console

      # cat /usr/share/kibana/optimize/wazuh-logs/wazuhapp.log | grep -i -E "error|warn"

3. Check the Wazuh manager log file:

    .. code-block:: console

      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

You can also open a new thread in our `Google mailing list <https://groups.google.com/group/wazuh>`_, or a new issue in our `GitHub repository <https://github.com/wazuh/wazuh-kibana-app/issues>`_.
