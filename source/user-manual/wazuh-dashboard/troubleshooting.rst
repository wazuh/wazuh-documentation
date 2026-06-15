.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section highlights common installation and usage issues on the Wazuh dashboard, and some basic steps to solve them.

Troubleshooting
===============

This section highlights common installation or usage issues on the Wazuh dashboard and some basic steps to solve them.

Wazuh manager API seems to be down error
----------------------------------------

This issue means that your Wazuh manager API might be unavailable. Check the status of the Wazuh manager to see if the service is active:

.. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

If the Wazuh manager API is running, try to fetch data using the CLI from the Wazuh dashboard server:

.. code-block:: console

   # curl -k -X GET "https://<api_url>:55000/?pretty=true" -H "Authorization: Bearer $(curl -u <api_user>:<api_password> -k -X POST 'https://<api_url>:55000/security/user/authenticate?raw=true')"

The command returns output similar to the following example:

.. code-block:: none
   :class: output

     % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
   100   398  100   398    0     0   3431      0 --:--:-- --:--:-- --:--:--  3431
   {
      "data": {
         "title": "Wazuh API REST",
         "api_version": "5.0.0",
         "revision": "beta1",
         "license_name": "GPL 2.0",
         "license_url": "https://github.com/wazuh/wazuh/blob/v5.0.0-beta1/LICENSE",
         "hostname": "server",
         "timestamp": "2026-06-01T21:19:52Z"
      },
      "error": 0
   }

.. code-block:: none
   :class: output
   :caption: Output if the Wazuh manager API is down:

   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
     0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
   curl: (7) Failed to connect to 127.0.0.1 port 55000 after 0 ms: Couldn't connect to server

If the Wazuh manager API is unavailable, restart the Wazuh manager and confirm that the API is running.

.. include:: /_templates/common/restart_manager.rst

No alerts on the Wazuh dashboard error
--------------------------------------

The first step is to check if there are alerts in the Wazuh indexer:

.. code-block:: console

   # curl https://<WAZUH_INDEXER_IP>:9200/_cat/indices/wazuh* -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -k

.. code-block:: none
   :class: output

   green open .ds-wazuh-events-v5-system-activity-000001     ZWfhtYJ8QyC5-zLshj-ccA 3 0 370001   0   157mb   157mb
   green open wazuh-states-inventory-users                   XLY62qJ9TfmRJxNADUofpw 1 0     44   0  59.5kb  59.5kb
   green open .ds-wazuh-findings-v5-unclassified-000001      8Cy3yyI2RiWYxluU7gzsgA 3 0      0   0    624b    624b
   green open .ds-wazuh-findings-v5-system-activity-000001   OLxn2t3KQqS3m653-CJjZA 3 0  81628   0  67.7mb  67.7mb
   green open wazuh-states-inventory-packages                JQ7toQOTTKSWaco9-WYsEw 1 0    780   5 414.8kb 414.8kb
   green open .ds-wazuh-active-responses-000001              bN_PvMEkQUifr4RYVsszYg 3 0      0   0    624b    624b
   green open wazuh-states-inventory-hardware                FwSUHTA7QNmfvOW00AmtBw 1 0      2   0  25.7kb  25.7kb
   green open wazuh-states-inventory-browser-extensions      hZs30G4jTo6FTvbfFlUIkQ 1 0     29   0  88.4kb  88.4kb
   green open wazuh-states-inventory-protocols               E1sT9505Q4C63QKm_9CmGw 1 0     30   2  48.9kb  48.9kb
   green open wazuh-states-inventory-services                ZvyQheflQcqFTPvKbjbHBA 1 0    928  66 802.2kb 802.2kb
   green open wazuh-states-fim-registry-keys                 iUpYlrmtRQam1xBy_X74QA 1 0   9308 374   4.1mb   4.1mb
   green open .ds-wazuh-events-v5-security-000001            oykATY1YRsaxi2mi_s1BxQ 3 0    561   0   1.9mb   1.9mb
   green open .ds-wazuh-findings-v5-security-000001          BmagEEMYQbSK9_Qd5zvtiw 3 0    484   0   2.5mb   2.5mb
   green open wazuh-states-sca                               XyzKW9PFQyefxBFfxQiOhQ 1 0    689   0   1.4mb   1.4mb
   green open wazuh-states-inventory-processes               6HiCY9lZSZGrgrKNX5LFJA 1 0    500   7 740.1kb 740.1kb
   green open .ds-wazuh-metrics-comms-000001                 FrBBaRJbTdmjYVGrmNx17w 1 0   1734   0 530.9kb 530.9kb
   green open .ds-wazuh-findings-v5-access-management-000001 -GRLurdjQ0G3rcd-GoCx4w 3 0      0   0    624b    624b
   green open .ds-wazuh-events-raw-v5-000001                 UxSkDyaoTFSpN05_OO-26Q 3 0      0   0    624b    624b
   green open wazuh-states-fim-files                         jBQ_0Ze3TWqitKUE35AsAg 1 0   3152   6     2mb     2mb
   green open wazuh-states-inventory-interfaces              0qeNgaiVR9yeGv-eJp8wcg 1 0     15   0  51.6kb  51.6kb
   green open .ds-wazuh-findings-v5-other-000001             b_0Z8YtuSGaEpxr2IocHMA 3 0      0   0    624b    624b
   green open .ds-wazuh-events-v5-unclassified-000001        kgEY22_QSGew6eeXiyZwvQ 3 0      0   0    624b    624b
   green open wazuh-states-inventory-hotfixes                56y4q9MkTwu8O1PH-nOf6w 1 0     15   0  14.7kb  14.7kb
   green open .ds-wazuh-events-v5-network-activity-000001    K_n5VkgHSLmhHoUUAZhc-g 3 0      0   0    624b    624b
   green open wazuh-states-inventory-ports                   h1W-2b7BTtCFQEY3yYZhxw 1 0    304 188 304.9kb 304.9kb
   green open wazuh-states-inventory-system                  rDruR8D4Q6mBvZvz0aaQVQ 1 0      2   0  30.6kb  30.6kb
   green open .ds-wazuh-events-v5-cloud-services-000001      RRd90sPrTo-PIrKFPmZRDw 3 0      0   0    624b    624b
   green open wazuh-states-inventory-groups                  -gbLLrIHSMmAz2Y8ukdIWA 1 0     76   0  49.5kb  49.5kb
   green open wazuh-states-inventory-networks                Vi87X-mgTcWFcgqWRI2qcg 1 0     34   4  65.5kb  65.5kb
   green open wazuh-states-fim-registry-values               TG4J3OilTMS43dfTTfLxug 1 0  27862 487  14.2mb  14.2mb
   green open .ds-wazuh-events-v5-applications-000001        sinevCgKRVmSB6HMoHFKmw 3 0      0   0    624b    624b
   green open .ds-wazuh-findings-v5-applications-000001      zLEJ0YGSQ1WsZYRHs6uHOQ 3 0      0   0    624b    624b
   green open wazuh-states-vulnerabilities                   8ip5i_PSRp6BTCbpF2HMTQ 1 0   7069   0 901.8kb 901.8kb
   green open .ds-wazuh-events-v5-access-management-000001   ahTRx3ZfSPGGSbxuAj9y1Q 3 0      0   0    624b    624b
   green open .ds-wazuh-metrics-agents-000001                BS_gJjzlS1K235I14qgl9g 1 0   2885   0   1.1mb   1.1mb
   green open .ds-wazuh-findings-v5-cloud-services-000001    r1y3bGpBTDGsxgIUhe7ulQ 3 0      0   0    624b    624b
   green open .ds-wazuh-events-v5-other-000001               RIN87mGdQlWYs6yMTHcx-g 3 0      0   0    624b    624b
   green open .ds-wazuh-findings-v5-network-activity-000001  bqtm0coXQqWXBxKRjyFflA 3 0      0   0    624b    624b

If you do not see any Wazuh related index, it means you do not have alerts stored in your Wazuh indexer.

.. note::

   The default credential for the Wazuh index is ``admin:admin``.

Could not connect to API with ID error
--------------------------------------

The error *“Could not connect to API with id: default: 3003 - Missing param: API USERNAME”* is triggered when Wazuh cannot find the correct Wazuh server API username variable. Starting from Wazuh 4.0, the Wazuh server API username variable changed from ``user`` to ``username``. It is necessary to change the credentials (``foo:bar`` is no longer accepted) as well as the name of the variable in the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` configuration file.

For example:

.. code-block:: yaml

   wazuh_core.hosts:
     default:
       url: https://127.0.0.1
       port: 55000
       username: wazuh-wui
       password: wazuh-wui
       run_as: true

Wazuh manager and Wazuh dashboard version mismatch error
--------------------------------------------------------

This error shows a mismatch in the versions of the Wazuh manager and the Wazuh dashboard.

The Wazuh manager and the Wazuh dashboard must run the same major and minor versions. For example:

-  Wazuh manager |WAZUH_CURRENT_MINOR|.x
-  Wazuh dashboard |WAZUH_CURRENT_MINOR|.x

.. Republish TODO: once "/upgrade-guide/index" is in the build, restore the cross-reference in the phrase "upgrade the Wazuh components in our upgrade guide" — replace the word "upgrade guide" with :doc:`upgrade guide </upgrade-guide/index>`.

Check out how to upgrade the Wazuh components in our upgrade guide.

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
        ".kibana_1" : {
          "mappings" : {
            "type" : {
              "full_name" : "type",
              "mapping" : {
                "type" : {
                  "type" : "keyword"
                }
              }
            }
          }
        }
      }

   In the output, we can see the field mapping for the ``type`` field in the ``.kibana_1`` index. The mapping shows that the ``type`` field is configured as ``keyword``, which is the expected result.

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

      # cat /var/wazuh-manager/logs/wazuh-manager.log | grep -i -E "error|warn"

- Wazuh dashboard:

   .. code-block:: console

      # journalctl -u wazuh-dashboard | grep -i -E "error|warn"

.. note::

   The Wazuh indexer uses the ``/var/log`` folder to store logs by default.
