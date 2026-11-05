.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the Wazuh Common Schema (WCS) file integrity monitoring state indices, with an example document and an example of how to use file.hash.sha256.

File integrity monitoring
=========================

The File Integrity Monitoring (FIM) indices store the monitored files and Windows registry entries, with attributes such as hashes, permissions, and owners.

The following example shows a document from the ``wazuh-states-fim-files`` index. It records the attributes of a monitored file on the Ubuntu endpoint:

.. code-block:: json

   {
     "_index" : "wazuh-states-fim-files",
     "_id" : "wazuh_003_9a30e2494a7578925cde57179ccce87978f8af3e",
     "_score" : 1.0,
     "_source" : {
       "file" : {
         "inode" : "2886305",
         "owner" : "root",
         "path" : "/etc/grub.d/README",
         "uid" : "0",
         "gid" : "0",
         "size" : 483,
         "permissions" : [
           "rw-r--r--"
         ],
         "mtime" : "2025-03-17T13:20:09.000Z",
         "device" : "64770",
         "hash" : {
           "sha1" : "7330684105b8e3df69f7a7a0af1436610f254f58",
           "sha256" : "cd72738c7dfd3b205e4e91528c0d25169bb3e8e6ebeec11c916662d8d0c3e47c",
           "md5" : "be58f42dfe74feb6eeb98c6a843c743f"
         },
         "group" : "root"
       },
       "checksum" : {
         "hash" : {
           "sha1" : "343e5b87c9be19207c585fc09bcf86877ce4324f"
         }
       },
       "wazuh" : {
         "cluster" : {
           "name" : "wazuh"
         },
         "agent" : {
           "host" : {
             "hostname" : "ubuntu-QEMU-Virtual-Machine",
             "os" : {
               "name" : "Ubuntu",
               "type" : "linux",
               "version" : "24.04.4 LTS (Noble Numbat)",
               "platform" : "ubuntu"
             },
             "architecture" : "aarch64"
           },
           "name" : "Ubuntu",
           "groups" : [
             "default"
           ],
           "id" : "003",
           "version" : "v5.0.0"
         }
       },
       "state" : {
         "document_version" : 298,
         "modified_at" : "2026-10-29T08:01:45.264Z"
       }
     }
   }

Example: Detect a file by its hash, then find every endpoint that has it
------------------------------------------------------------------------

WCS uses the same field names in events and in state indices. ``file.hash.sha256`` is in the FIM events that the Wazuh agent sends when a file changes, and in the ``wazuh-states-fim-files`` index that keeps the current state of each file. First a rule flags the hash in a FIM event, then a query finds every endpoint that still has the file. Replace the hash with one from your threat report.

Create the rule in **Ruleset management** > **Detection** > **Rules**. ``logsource.product`` names the integration whose events the rule evaluates. The events come from a built-in integration, so add the rule to a custom integration whose title is the same as the built-in one, for example ``wazuh-fim``. Then promote it to the custom space and add it to a custom detector in **Ruleset management** > **Detection** > **Detectors**. In the query, replace ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>`` with your values. The highlighted lines show where ``file.hash.sha256`` is used and where it appears in the output.

**1. Rule on FIM events**

.. code-block:: yaml
   :emphasize-lines: 10

   logsource:
     product: wazuh-fim
   level: high
   status: experimental
   enabled: true
   detection:
     condition: selection
     selection:
       event.dataset: wazuh.fim
       file.hash.sha256: 382b8ae959c6eefb675e465b49222eca3b63e4dcf6cba4cdd20e816a823b14a5
   metadata:
     title: File with a known malicious hash
     author: Security Team
     description: Detects a monitored file whose SHA256 hash matches a hash from a threat report.

**2. Finding (excerpt)**

.. code-block:: json
   :emphasize-lines: 6

   {
     "event": { "dataset": "wazuh.fim", "action": "created" },
     "file": {
       "path": "/home/ubuntu/Downloads/brctl-copy",
       "hash": {
         "sha256": "382b8ae959c6eefb675e465b49222eca3b63e4dcf6cba4cdd20e816a823b14a5"
       }
     },
     "wazuh": {
       "agent": { "name": "Ubuntu" },
       "rule": { "title": "File with a known malicious hash", "level": "high" }
     }
   }

**3. Query on the state index**

.. code-block:: bash
   :emphasize-lines: 4

   curl -k -u <USERNAME>:<PASSWORD> -X GET "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/wazuh-states-fim-files/_search?pretty" \
     -H 'Content-Type: application/json' -d '
   {
     "query": { "term": { "file.hash.sha256": "382b8ae959c6eefb675e465b49222eca3b63e4dcf6cba4cdd20e816a823b14a5" } },
     "_source": [ "wazuh.agent.name", "file.path", "file.hash.sha256" ]
   }'

**4. Result (excerpt)**

.. code-block:: json
   :emphasize-lines: 8, 18

   "hits": [
     {
       "_index": "wazuh-states-fim-files",
       "_source": {
         "wazuh": { "agent": { "name": "Ubuntu" } },
         "file": {
           "path": "/usr/sbin/brctl",
           "hash": { "sha256": "382b8ae959c6eefb675e465b49222eca3b63e4dcf6cba4cdd20e816a823b14a5" }
         }
       }
     },
     {
       "_index": "wazuh-states-fim-files",
       "_source": {
         "wazuh": { "agent": { "name": "Ubuntu" } },
         "file": {
           "path": "/home/ubuntu/Downloads/brctl-copy",
           "hash": { "sha256": "382b8ae959c6eefb675e465b49222eca3b63e4dcf6cba4cdd20e816a823b14a5" }
         }
       }
     }
   ]

.. note::

   -  The finding tells you when a copy of the file appeared. The state index tells you every place it is now, including the original ``/usr/sbin/brctl``, which was there before the rule existed.
   -  On the Wazuh dashboard, the same search in **Discover** is ``file.hash.sha256: "382b8ae9…"``.


``wazuh-states-fim-files``
--------------------------

Monitored files.

.. wcs-field-tables:: stateful/fim/files
   :single-table:

``wazuh-states-fim-registry-keys``
----------------------------------

Monitored Windows registry keys.

.. wcs-field-tables:: stateful/fim/windows-registry-keys
   :single-table:

``wazuh-states-fim-registry-values``
------------------------------------

Monitored Windows registry values.

.. wcs-field-tables:: stateful/fim/windows-registry-values
   :single-table:
