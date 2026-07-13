.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find a use case on monitoring the Docker environment with Wazuh in this section of our documentation.

Use case
========

This use case demonstrates how to use Wazuh to monitor Docker runtime activities.

.. _monitoring_docker_runtime_activities:

Monitoring Docker runtime activities
------------------------------------

Wazuh monitors Docker events and generates findings for activities involving containers and images.

Requirements
^^^^^^^^^^^^

-  Install Docker on an Ubuntu 24.04 endpoint.
-  :doc:`Install the Wazuh agent </installation-guide/wazuh-agent/index>` on the Docker host and enroll it on a Wazuh manager.
-  :ref:`Enable the Wazuh Docker listener module <enable-wazuh-docker-listener>` on the Docker host.

Simulate events
^^^^^^^^^^^^^^^

Perform the following steps to simulate Docker runtime events:

#. Run ``test-container`` from the ``httpd`` image:

   .. code-block:: console

      # docker run -d --name test-container httpd

#. Stop ``test-container``:

   .. code-block:: console

      # docker stop test-container

#. Remove ``test-container``:

   .. code-block:: console

      # docker rm test-container

#. Remove the ``httpd`` image:

   .. code-block:: console

      # docker rmi httpd

View the findings on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to the **Threat Hunting** module or the **Findings** tab of the dedicated **Wazuh Docker dashboard** on the Wazuh dashboard to view the findings. The following findings are generated when we perform all the actions above. We have highlighted the findings and labeled them according to the action that triggered each of them.

.. thumbnail:: /images/manual/container-security/docker-runtime-findings.png
   :title: Docker runtime findings
   :alt: Docker runtime findings
   :align: center
   :width: 80%

Below, we show the full data of a finding triggered when a Docker image is downloaded:

.. code-block:: JSON

   {
     "_index": ".ds-wazuh-findings-v5-system-activity-000001",
     "_id": "uypqTZ8BuECDMKLrjUk9",
     "_score": null,
     "_source": {
       "container": {
         "image": {
           "name": "httpd",
           "tag": [
             "latest"
           ]
         }
       },
       "orchestrator": {
         "resource": {
           "type": "image"
         }
       },
       "wazuh": {
         "cluster": {
           "node": "node01",
           "name": "wazuh"
         },
         "protocol": {
           "location": "Wazuh-Docker",
           "queue": 49
         },
         "agent": {
           "host": {
             "hostname": "vagrant",
             "os": {
               "name": "Ubuntu",
               "type": "linux",
               "version": "24.04.2 LTS (Noble Numbat)",
               "platform": "ubuntu"
             },
             "architecture": "x86_64"
           },
           "name": "ubuntu24",
           "groups": [
             "default"
           ],
           "id": "001",
           "version": "v5.0.0"
         },
         "integration": {
           "name": "docker",
           "decoders": [
             "decoder/core-wazuh-message/0",
             "decoder/docker/0"
           ],
           "category": "system-activity"
         },
         "rule": {
           "sigma_id": "02f34659-8058-4ba9-aa66-e64a63a329fa",
           "level": "medium",
           "compliance": {
             "iso_27001": [
               "A.8.1.1",
               "A.12.2.1",
               "A.12.4.1",
               "A.12.5.1",
               "A.14.2.1"
             ],
             "hipaa": [
               "164.308.a.1.ii.D",
               "164.308.a.5.ii.A",
               "164.312.b"
             ],
             "pci_dss": [
               "6.2",
               "6.3",
               "10.2",
               "11.4"
             ],
             "tsc": [
               "A1.2",
               "CC6.8",
               "CC7.1",
               "CC7.2"
             ],
             "nis2": [
               "21.2.a",
               "21.2.b",
               "21.2.e",
               "23"
             ],
             "nist_800_171": [
               "3.3.1",
               "3.4.1",
               "3.4.2",
               "3.14.1"
             ],
             "fedramp": [
               "CM-7",
               "CM-8",
               "AU-6",
               "IR-4",
               "SI-3"
             ],
             "nist_800_53": [
               "CM-7",
               "CM-8",
               "AU-6",
               "SI-3",
               "SI-4"
             ],
             "cmmc": [
               "CM.L2-3.4.1",
               "CM.L2-3.4.2",
               "AU.L2-3.3.1",
               "IR.L2-3.6.1",
               "SI.L2-3.14.1"
             ],
             "gdpr": [
               "IV_25.1",
               "IV_32.1.a",
               "IV_33.1",
               "IV_34.1"
             ]
           },
           "mitre": {
             "technique": {
               "name": [
                 "Supply Chain Compromise",
                 "Compromise Software Supply Chain"
               ],
               "id": [
                 "T1195",
                 "T1195.002"
               ]
             },
             "subtechnique": {
               "name": [
                 "Compromise Software Supply Chain"
               ],
               "id": [
                 "T1195.002"
               ]
             },
             "tactic": {
               "name": [
                 "Initial Access"
               ],
               "id": [
                 "TA0001"
               ]
             }
           },
           "id": "02f34659-8058-4ba9-aa66-e64a63a329fa",
           "title": "Docker image pulled from external or unknown registry - httpd",
           "tags": [
             "medium",
             "docker",
             "attack.initial-access",
             "attack.t1195.002"
           ],
           "status": "stable"
         },
         "event": {
           "id": "8d141015-0a2b-4e48-82c6-4bff32efa2d1"
         },
         "space": {
           "name": "standard"
         }
       },
       "@timestamp": "2026-07-10T19:02:36.573Z",
       "event": {
         "original": "{\"integration\": \"docker\", \"docker\": {\"Type\": \"image\", \"Action\": \"pull\", \"Actor\": {\"ID\": \"httpd:latest\", \"Attributes\": {\"name\": \"httpd\"}}, \"scope\": \"local\", \"time\": 1783710157, \"timeNano\": 1783710157176731991}}",
         "code": "pull",
         "kind": "event",
         "start": "2026-07-10T19:02:37.000000Z",
         "action": "package-installed",
         "index": ".ds-wazuh-events-v5-system-activity-000001",
         "category": [
           "package"
         ],
         "type": [
           "access"
         ],
         "dataset": "docker.events",
         "doc_id": "typpTZ8BuECDMKLrDEna",
         "outcome": "success"
       },
       "data_stream": {
         "namespace": "default",
         "type": "logs",
         "dataset": "docker.events"
       }
     },
     "fields": {
       "event.start": [
         "2026-07-10T19:02:37.000Z"
       ],
       "@timestamp": [
         "2026-07-10T19:02:36.573Z"
       ]
     },
     "sort": [
       1783710156573
     ]
   }
