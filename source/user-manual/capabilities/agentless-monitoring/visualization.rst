.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Agentless monitoring allows you to monitor devices or systems with no agent via SSH. Learn how it works and its configuration in this section.

Visualization
=============

The Wazuh server registers events from agentless endpoints under the Wazuh server name and ``ID 000``. Therefore, they do not appear as individual agents on the Wazuh dashboard. Agentless endpoints don't affect the total agent count. You can create a custom visualization to view the alerts from agentless endpoints. 

Perform the following steps to create a visualization for the alerts from agentless endpoints.

#. Navigate to the **Discover** section.

   .. thumbnail:: /images/manual/agentless-monitoring/discover-section.png
      :title: Discover section
      :alt: Discover section
      :align: center
      :width: 80%

#. Filter agentless logs by searching for ``agentless.host:*``.

   .. thumbnail:: /images/manual/agentless-monitoring/filter-agentless-logs.png
      :title: Filter agentless logs
      :alt: Filter agentless logs
      :align: center
      :width: 80%

#. Add the following fields from the **Available fields** section:

   - **rule.description**
   - **rule.level**
   - **rule.id**
   - **agentless.host**

   You can see in the image below how you can add the **rule.description** field. Follow the same step for the remaining fields.   

   .. thumbnail:: /images/manual/agentless-monitoring/add-the-rule-description-field.png
      :title: Add the rule.description field
      :alt: Add the rule.description field
      :align: center
      :width: 80%

#. After adding all the fields, the dashboard should look similar to the image below.

   .. thumbnail:: /images/manual/agentless-monitoring/after-adding-all-the-fields.png
      :title: After adding all the fields
      :alt: After adding all the fields
      :align: center
      :width: 80%

#. Click on **Save** and assign a name to the dashboard. In this example, you can name it as Agentless monitoring.
 
   .. thumbnail:: /images/manual/agentless-monitoring/click-on-save.png
      :title: Click on Save and assign a name to the dashboard
      :alt: Click on Save and assign a name to the dashboard
      :align: center
      :width: 80%

#. After assigning a name, click the **Save** button to apply the configuration.

   .. thumbnail:: /images/manual/agentless-monitoring/click-the-save-button.png
      :title: Click the Save button to apply the configuration
      :alt: Click the Save button to apply the configuration
      :align: center
      :width: 80%

#. Click on **Open** to access the visualization.

   .. thumbnail:: /images/manual/agentless-monitoring/click-on-open.png
      :title: Click on Open to access the visualization
      :alt: Click on Open to access the visualization
      :align: center
      :width: 80%

#. Expand one of the alerts to view more information about the event.

   .. thumbnail:: /images/manual/agentless-monitoring/expand-one-of-the-alerts.png
      :title: Expand one of the alerts
      :alt: Expand one of the alerts
      :align: center
      :width: 80%

Alert in JSON:

   .. code-block:: json
      :emphasize-lines: 8-23        

      {
        "_index": "wazuh-alerts-4.x-2023.04.13",
        "_id": "VPPfeocBfkbi0eGUYKSc",
        "_version": 1,
        "_score": null,
        "_source": {
          "syscheck": {
            "path": "/special_dir/file1",
            "sha1_after": "9e7633f2260abb2b3de4cdf7589305a4197e757b",
            "size_before": "5",
            "changed_attributes": [
              "size",
              "md5",
              "sha1"
            ],
            "size_after": "6",
            "uid_after": "0",
            "gid_after": "0",
            "md5_before": "14a47f5bf4c5b0fa3f8e4abc97c5f11e",
            "perm_after": "001204",
            "event": "modified",
            "md5_after": "ba62eb8d83f89e2cab34d63a06ed43c5",
            "sha1_before": "a9ff574809c81ac1c3f8a7b6fd33a9a88c868741"
          },
          "input": {
            "type": "log"
          },
          "agent": {
            "hostname": "wazuh",
            "name": "wazuh",
            "id": "3e201657-df9c-4c0d-8518-aa9556aaf110",
            "type": "filebeat",
            "ephemeral_id": "6fed6291-e32d-4a30-ad9b-20fcf172ee7a",
            "version": "7.10.2"
          },
          "manager": {
            "name": "wazuh"
          },
          "agentless": {
            "host": "192.168.33.137",
            "user": "agentless",
            "script": "ssh_integrity_check_linux"
          },
          "rule": {
            "mail": false,
            "level": 7,
            "pci_dss": [
              "11.5"
            ],
            "hipaa": [
              "164.312.c.1",
              "164.312.c.2"
            ],
            "tsc": [
              "PI1.4",
              "PI1.5",
              "CC6.1",
              "CC6.8",
              "CC7.2",
              "CC7.3"
            ],
            "description": "Integrity checksum changed.",
            "groups": [
              "ossec",
              "syscheck",
              "syscheck_entry_modified",
              "syscheck_file"
            ],
            "nist_800_53": [
              "SI.7"
            ],
            "gdpr": [
              "II_5.1.f"
            ],
            "firedtimes": 3,
            "mitre": {
              "technique": [
                "Stored Data Manipulation"
              ],
              "id": [
                "T1565.001"
              ],
              "tactic": [
                "Impact"
              ]
            },
            "id": "550",
            "gpg13": [
              "4.11"
            ]
          },
          "location": "syscheck",
          "decoder": {
            "name": "syscheck_integrity_changed"
          },
          "id": "1681393661.11766",
          "full_log": "File '/special_dir/file1' checksum changed.\nSize changed from '5' to '6'\nOld md5sum was: '14a47f5bf4c5b0fa3f8e4abc97c5f11e'\nNew md5sum is : 'ba62eb8d83f89e2cab34d63a06ed43c5'\nOld sha1sum was: 'a9ff574809c81ac1c3f8a7b6fd33a9a88c868741'\nNew sha1sum is : '9e7633f2260abb2b3de4cdf7589305a4197e757b'\n",
          "timestamp": "2023-04-13T16:47:41.557+0300"
        },
        "fields": {
          "timestamp": [
            "2023-04-13T13:47:41.557Z"
          ]
        },
        "highlight": {
          "manager.name": [
            "@opensearch-dashboards-highlighted-field@wazuh@/opensearch-dashboards-highlighted-field@"
          ]
        },
        "sort": [
          1681393661557
        ]
      }



