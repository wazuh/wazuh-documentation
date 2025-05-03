.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation lists the common installation or usage issues with the Wazuh Kibana plugin and how to resolve them. 
  
.. _kibana_troubleshooting:

Troubleshooting
===============

- `"Incorrect Kibana version in plugin [wazuh]" when installing the Wazuh Kibana plugin`_
- `No template found for the selected index pattern`_
- `Wazuh API seems to be down`_
- `I do not see alerts in the Wazuh Kibana plugin`_
- `Could not connect to API with id: default: 3003 - Missing param: API USERNAME`_
- `Wazuh Kibana plugin page goes blank`_
- `"Conflict with the Wazuh app version" error is displayed`_
- `"Agent evolution graph shows incorrect data"`_
- `None of the above solutions are fixing my problem`_

This section collects common installation or usage issues on the Wazuh Kibana plugin, and some basic steps to solve them.

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

  WAZUH_VERSION="v|WAZUH_LATEST|"

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


Wazuh API seems to be down
--------------------------

This issue means that your Wazuh API might be unavailable. Check the status of the Wazuh manager to check if the service is active: 

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

  # curl https://<ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-* -u <elasticsearch_user>:<elasticsearch_password> -k

.. code-block:: none
    :class: output

     green open wazuh-alerts-4.x-2021.03.03 xwFPX7nFQxGy-O5aBA3LFQ 3 0 340 0 672.6kb 672.6kb

If you do not see any Wazuh related index, it means you have no alerts stored in Elasticsearch.

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
            version: 7.10.2



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


Wazuh Kibana plugin page goes blank
-----------------------------------

Sometimes, after an upgrade, the Wazuh Kibana plugin page goes blank. This is due to some issues with the cache memory of the browser.

.. thumbnail:: ../../images/kibana-app/troubleshooting/page_goes_blank.png
    :title: Page goes blank
    :align: left
    :width: 100%


To fix this you need to:

  .. include:: ../../_templates/common/clear_cache.rst

"Conflict with the Wazuh app version" error is displayed
--------------------------------------------------------

Sometimes, after an upgrade, the Wazuh Kibana plugin displays the "Conflict with the Wazuh app version" error. This is due to some issues with the cache memory of the browser.

.. thumbnail:: ../../images/kibana-app/troubleshooting/conflict_wazuh_app_version.png
    :title: Conflict wazuh app version
    :align: left
    :width: 100%

To fix this you need to:

  .. include:: ../../_templates/common/clear_cache.rst

"Agent evolution graph shows incorrect data"
--------------------------------------------
Sometimes, after connecting two o more Wazuh APIs to the Wazuh Kibana plugin, the agent evolution graph may show data as if there were more agents than expected for that selected API.

.. thumbnail:: ../../images/kibana-app/troubleshooting/agent_evolution_graph_incorrect.png
    :title: Graph showing more agents than expected
    :align: left
    :width: 100%

This is caused by the way agent data is stored in the Elasticsearch indices. Agent monitoring data references its manager or cluster by name only, so when two clusters or managers share the same name, data can be displayed incorrectly in this graph.
In order to solve it, each cluster (even every node) or manager must have different names:

.. tabs::
  .. group-tab:: Changing name of a manager

    For managers that don't form part of a cluster, the data shown in the graph is filtered using the name of the manager, which is its :code:`hostname`.
    Make sure each manager that connects to your Elastic Server has an unique hostname, you may change it by running

    .. code-block:: console

        # hostname newHostName
    
    Make sure that the master nodes in your clusters also have distinct manager names.

  .. group-tab:: Changing the name of the cluster

    For clusters, make sure each cluster has an unique name. The name of the cluster can be changed in each of the :code:`ossec.conf` files for each manager in the cluster.
    
    .. code-block:: xml

        <cluster>
          <name>unique cluster name</name>
          ...
        </cluster>
    
    All members of the cluster must have the same cluster name.

None of the above solutions are fixing my problem
-------------------------------------------------

All the components we use have their own log files, you can check them and look for error and warning messages.

1. Check the Elastic Stack log files:

    .. code-block:: console

      # cat /var/log/elasticsearch/<elasticsearch-cluster-name>.log | grep -i -E "error|warn"
      # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"

    .. note::
      The Elastic Stack uses the ``/var/log`` folder to store logs by default. This setting can be customized following the documentation for `Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html>`_ or `Filebeat <https://www.elastic.co/guide/en/beats/filebeat/current/configuration-logging.html>`_.

    .. warning::
      By default, Kibana doesn't store logs on a file. You can change this by configuring ``logging.dest`` setting in the ``kibana.yml`` configuration file. Check the `Kibana documentation <https://www.elastic.co/guide/en/kibana/current/settings.html>`_ for more details.

2. Check the Wazuh Kibana plugin log file:

    .. code-block:: console

      # cat /usr/share/kibana/data/wazuh/logs/wazuhapp.log | grep -i -E "error|warn"

3. Check the Wazuh manager log file:

    .. code-block:: console

      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"