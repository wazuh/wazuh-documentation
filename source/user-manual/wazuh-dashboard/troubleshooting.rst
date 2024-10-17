.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section highlights common installation and usage issues on the Wazuh dashboard, and some basic steps to solve them.

Troubleshooting
===============

This section highlights common installation or usage issues on the Wazuh dashboard, and some basic steps to solve them.

Wazuh server API seems to be down error
---------------------------------------

This issue means that your Wazuh server API might be unavailable. Check the status of the Wazuh manager to see if the service is active:

.. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

If the Wazuh server API is running, try to fetch data using the CLI from the Wazuh dashboard server:

.. code-block:: console

   # curl -k -X GET "https://<api_url>:55000/" -H "Authorization: Bearer $(curl -u <api_user>:<api_password> -k -X POST 'https://<api_url>:55000/security/user/authenticate?raw=true')"

.. code-block:: none
   :class: output

   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
   100   404  100   404    0     0   2779      0 --:--:-- --:--:-- --:--:--  2786
   {"data": {"title": "Wazuh API REST", "api_version": "4.8.0", "revision": 40812, "license_name": "GPL 2.0", "license_url": "https://github.com/wazuh/wazuh/blob/v4.8.0/LICENSE", "hostname": "wazuh-server", "timestamp": "2024-07-18T20:06:45Z"}, "error": 0}

.. code-block:: none
   :class: output
   :caption: Output if API is down:

   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
     0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
   curl: (7) Failed to connect to 127.0.0.1 port 55000 after 0 ms: Couldn't connect to server

If the Wazuh server API is down, restart the Wazuh manager and verify the API is now running.

.. include:: /_templates/common/restart_manager.rst

No alerts on the Wazuh dashboard error
--------------------------------------

The first step is to check if there are alerts in the Wazuh indexer:

.. code-block:: console

   # curl https://<WAZUH_INDEXER_IP>:9200/_cat/indices/wazuh-alerts-* -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -k

.. code-block:: none
   :class: output

   green open wazuh-alerts-4.x-2021.03.03 xwFPX7nFQxGy-O5aBA3LFQ 3 0 340 0 672.6kb 672.6kb

If you do not see any Wazuh related index, it means you do not have alerts stored in your Wazuh indexer.

Run the following command to ensure that Filebeat is correctly configured:

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

Could not connect to API with ID error
--------------------------------------

The error *“Could not connect to API with id: default: 3003 - Missing param: API USERNAME”* is triggered when Wazuh cannot find the correct Wazuh server API username variable. Starting from Wazuh 4.0, the Wazuh server API username variable changed from ``user`` to ``username``. It is necessary to change the credentials (``foo:bar`` is no longer accepted) as well as the name of the variable in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file.

For example:

.. code-block:: yaml

   hosts:
    - production:
        url: https://localhost
        port: 55000
        username: wazuh-wui
        password: wazuh-wui
        run_as: false

Wazuh server and Wazuh dashboard version mismatch error
-------------------------------------------------------

This error shows a mismatch in the versions of the Wazuh server and the Wazuh dashboard.

The Wazuh server and the Wazuh dashboard must run the same major and minor versions. For example:

-  Wazuh server |WAZUH_CURRENT_MINOR|.x
-  Wazuh dashboard |WAZUH_CURRENT_MINOR|.x

Check out how to upgrade the Wazuh components in our :doc:`upgrade guide </upgrade-guide/index>`.

Saved object for index pattern not found error
----------------------------------------------

Saved objects store data for later use, including dashboards, visualizations, maps, index patterns, and more.

This message indicates a problem loading the information of an index pattern, which should be stored in a saved object, but the Wazuh dashboard cannot find it.

This situation can happen if the indexer is reinstalled and the previously saved objects are lost while the dashboard is running and is not restarted in the process.

Remediation
^^^^^^^^^^^

The Wazuh dashboard initializes saved objects with their index definitions when it starts, so the suggested solution is to restart the service to initialize the saved objects again.

#. Restart the Wazuh dashboard service using the command below:

   .. include:: /_templates/common/restart_dashboard.rst

   This will initialize the index with the required mappings.

   .. note:: If the index contains data but has missing objects, the Wazuh dashboard will migrate the data to a new index with the missing objects added.

If the restart does not solve the problem, we can execute this process manually:

#. Stop the Wazuh dashboard service.

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-dashboard

      .. group-tab:: SysV

         .. code-block:: console

            # service wazuh-dashboard stop

#. Identify the index or indices that have the wrong field mappings, this depends on the logged user that experiences the problem or the selected tenant.

#. Get the field mapping for the ``type`` field for the indices that store the saved objects.

   .. code-block:: console

      # curl https://<WAZUH_INDEXER_IP>:9200/.kibana*/_mapping/field/type?pretty -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -k

   .. code-block:: none
      :class: output

      {
        ".kibana" : {
          "mappings" : {
            "type" : {
              "full_name" : "type",
              "mapping" : {
                "type" : {

                 "type" : "text",

                 "fields" : {

                   "keyword" : {

                     "type" : "keyword",

                     "ignore_above" : 256
                    }
                  }
                }
              }
            }
          }
        },
        ".kibana_92668751_admin_1" : {
          "mappings" : {
            "type" : {
              "full_name" : "type",
              "mapping" : {
                "type" : {

                 "type" : "text",

                 "fields" : {

                   "keyword" : {

                     "type" : "keyword",

                     "ignore_above" : 256
                    }
                  }
                }
              }
            }
          }
        }
      }

   In the output, we can see type field mapping for the ``.kibana`` and ``.kibana_92668751_admin_1`` indices. Note that the field mapping type for the type field is ``text`` and that it contains a subfield called ``keyword``. This is not the expected result; the type field should be ``keyword``, not ``text``, and it should not include the keyword subfield.

   These errors happened because there was no template that specified the appropriate field mappings at the time the saved object data was indexed. To solve the errors, we need to remove the index and rebuild it.

#. Delete the index or indices that store the saved objects with the wrong field mapping.

   .. code-block:: console

      # curl https://<WAZUH_INDEXER_IP>:9200/<INDEX/INDICES_SEPARATED_BY_COMMAS> -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -k -XDELETE

   .. code-block:: none
      :class: output

      {“acknowledged”:true}

#. Restart the Wazuh dashboard service.

   .. include:: /_templates/common/restart_dashboard.rst

.. note::

   These actions take into account that the index that stores the saved objects must have valid field mappings. The field mappings are defined through a template, so they should exist before the index is created. This template is added when the Wazuh dashboard starts if it doesn’t exist.

Application not found
---------------------

If you encounter the message *Application Not Found* when accessing the Wazuh dashboard after upgrading, it might be that the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` wasn't overwritten with new changes. To resolve this issue, update the ``uiSettings.overrides.defaultRoute`` setting with the ``/app/wz-home`` value in the configuration file:

.. code-block:: yaml

   uiSettings.overrides.defaultRoute: /app/wz-home

None of the above solutions are fixing my problem
-------------------------------------------------

We have a welcoming community that can help you with most of the problems you might have regarding Wazuh deployment and usage https://wazuh.com/community.

Also, you can contact us by opening issues in our GitHub repositories under the `organization <https://github.com/wazuh>`__.

In case you encounter errors during your deployment, we will be interested in the log files for your deployment. You can check them out on each component:

Check the following log files:

-  Wazuh indexer:

   .. code-block:: console

      # cat /var/log/wazuh-indexer/wazuh-cluster.log | grep -i -E "error|warn"

-  Wazuh manager:

   .. code-block:: console

      # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"
      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

- Wazuh dashboard:

   .. code-block:: console

      # journalctl -u wazuh-dashboard | grep -i -E "error|warn"

.. note::

   The Wazuh indexer uses the ``/var/log`` folder to store logs by default.
