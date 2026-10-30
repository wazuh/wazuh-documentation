.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh fills Wazuh Common Schema (WCS) fields, from the Wazuh agent to the detectors: time fields, the wazuh and event objects, and how a log becomes events and findings.

.. _reference_wcs_how_wazuh_uses_fields:

How Wazuh uses WCS fields
=========================

Wazuh fills WCS fields at different stages, from when a Wazuh agent collects a log to when a detector generates a finding. Knowing which component sets each field helps you search for the right one.

From log to finding
-------------------

Each Wazuh component that handles a log fills its own set of WCS fields. A log goes through the following stages:

-  The Wazuh agent sends the log with metadata about itself (``wazuh.agent.*``), the queue it used, and the location it read the log from (``wazuh.protocol.*``).
-  The Wazuh normalization engine on the Wazuh manager receives the log and sets ``@timestamp`` and ``wazuh.event.id``. When raw event indexing is enabled, it writes the log as received to ``wazuh-events-raw-v5``.
-  The decoders of the matching integration turn the log into WCS fields. The engine adds the integration, space, and cluster fields and writes the normalized event to the ``wazuh-events-v5-<CATEGORY>`` data stream of the integration's category.
-  Detectors on the Wazuh indexer evaluate the new events against their detection rules and write one finding for every event and matching rule to ``wazuh-findings-v5-<CATEGORY>``.

You can learn more about these stages in the :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>` and :doc:`Detectors </user-manual/data-analysis/detectors>` documentation.

Time fields
-----------

A log can reach Wazuh some time after the activity it describes, so WCS keeps the two times in separate fields:

-  ``@timestamp``: When the Wazuh normalization engine received the event, in UTC. The engine sets it for every log before any decoder runs. The raw event, the normalized event, and its findings have the same value.
-  ``event.start``: When the logged activity happened, or started if it has a duration. Decoders set it from the timestamp in the original log. Events whose source has no timestamp, such as inventory or Rootcheck events, don't have it.

``@timestamp`` is later than ``event.start``. The difference is the time the log took to reach the Wazuh manager, usually a few seconds, and longer when a Wazuh agent sends a backlog after it reconnects. Use each field for what it records:

-  The Wazuh dashboard filters events and findings by ``@timestamp``, so a log that arrives late is listed at its arrival time.
-  To search by the time something happened, filter on ``event.start``.
-  Custom decoders should write the time found in the log to ``event.start`` and leave ``@timestamp`` as the engine sets it.

Findings keep the ``@timestamp`` of the event that matched. No field records when the finding itself was created.

The wazuh object
----------------

The ``wazuh`` object describes how Wazuh collected and processed the event, not what the log says. Wazuh agents, the Wazuh normalization engine, and detectors set these fields, except the case management fields of findings, which users manage:

-  ``wazuh.agent.*``: The Wazuh agent that collected the event, with its ID, name, version, groups, and host details.
-  ``wazuh.event.id``: The identifier of the received log. All the documents that a log produces share it.
-  ``wazuh.integration.name`` and ``wazuh.integration.category``: The integration whose decoder matched the event, and its category. Detection rules commonly filter on the integration name.
-  ``wazuh.integration.decoders``: The decoders that matched the event, from the root decoder to the most specific one.
-  ``wazuh.protocol.location``: Where the Wazuh agent collected the event, such as the path of a monitored file, a log channel such as ``journald`` or ``EventChannel``, or the Wazuh agent module that generated it, such as ``syscollector``.
-  ``wazuh.protocol.queue``: The queue the event came through, stored as the byte value of the queue character. For example, ``49`` (``1``) for log collector events, ``57`` (``9``) for Rootcheck, and ``100`` (``d``) for Syscollector.
-  ``wazuh.cluster.name`` and ``wazuh.cluster.node``: The Wazuh manager cluster and node that processed the event.
-  ``wazuh.space.name``: The space of the policy that processed the event, ``standard`` for the Wazuh ruleset and ``custom`` for your own content.
-  ``wazuh.threat.enrichments.*``: The indicators of compromise (IOCs) that matched a field of the event. See the :doc:`Enrichment </user-manual/data-analysis/enrichment>` documentation.
-  ``wazuh.rule.*`` and ``wazuh.case.*``: On findings only, the detection rule that matched and the case management fields.

Root fields and wazuh fields
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Where a field sits tells you who reported its value: Wazuh or the source of the log. ``agent``, ``host``, and ``rule`` exist both at the root of the event and under ``wazuh``, and they describe different things:

-  ``wazuh.agent.*`` is the Wazuh agent that collected the event. ``agent.*`` and ``host.*`` at the root hold what the log reports, which can be another system when the Wazuh agent collects logs forwarded by other devices.
-  ``wazuh.rule.*`` is the Wazuh detection rule that matched, on findings only. ``rule.*`` at the root is the rule of the source device or service, as the log reports it, such as a firewall rule ID.

The event object and message
----------------------------

The ``event`` object describes what happened, as the log source reports it. Decoders fill most ``event`` fields, following ECS:

-  ``event.kind``, ``event.category``, ``event.type``, and ``event.outcome``: The ECS categorization fields, restricted to the values that ECS allows. Detection rules commonly filter on ``event.kind`` and ``event.category``.
-  ``event.code``, ``event.action``, ``event.provider``, and ``event.dataset``: What the event is according to its source, such as a Windows event ID in ``event.code``.
-  ``event.id``: The identifier the source gave the event, when the log has one. It's different from ``wazuh.event.id``.
-  ``event.original``: The log as the Wazuh normalization engine received it, before decoding. It isn't indexed, so search the decoded fields instead.

``message`` holds a human-readable message that the decoder extracts from the log, such as the free-text part of a syslog line. Not every decoder sets it, and it never replaces ``event.original``.

Following a log through its documents
-------------------------------------

A single log can produce several documents: the raw event, the normalized event, and one finding for every rule it matches. All of them have the same ``wazuh.event.id``, a UUID that the engine generates once for every log. Run the following command to find all the documents of a log:

.. code-block:: console
   :emphasize-lines: 1,3

   # curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -X GET "https://<WAZUH_INDEXER_IP>:9200/wazuh-events-raw-v5,wazuh-events-v5-*,wazuh-findings-v5-*/_search?pretty" \
   -H 'Content-Type: application/json' \
   -d '{"_source": ["@timestamp", "wazuh.event.id", "wazuh.integration.name", "event.category", "wazuh.rule.title"], "query": {"term": {"wazuh.event.id": "<WAZUH_EVENT_ID>"}}}'

The command output looks similar to this:

.. code-block:: json
   :class: output

   {
     "took" : 11,
     "timed_out" : false,
     "_shards" : {
       "total" : 17,
       "successful" : 17,
       "skipped" : 0,
       "failed" : 0
     },
     "hits" : {
       "total" : {
         "value" : 3,
         "relation" : "eq"
       },
       "max_score" : 1.0,
       "hits" : [
         {
           "_index" : ".ds-wazuh-events-raw-v5-000001",
           "_id" : "WuOXiaEBB-x79B5YMkGF",
           "_score" : 1.0,
           "_source" : {
             "@timestamp" : "2026-10-29T21:35:42.804Z",
             "wazuh" : {
               "event" : {
                 "id" : "d36dd348-831a-4dfe-ae63-097d732877f9"
               }
             }
           }
         },
         {
           "_index" : ".ds-wazuh-events-v5-system-activity-000001",
           "_id" : "YOOXiaEBB-x79B5YMkGF",
           "_score" : 1.0,
           "_source" : {
             "@timestamp" : "2026-10-29T21:35:42.804Z",
             "wazuh" : {
               "integration" : {
                 "name" : "linux"
               },
               "event" : {
                 "id" : "d36dd348-831a-4dfe-ae63-097d732877f9"
               }
             },
             "event" : {
               "category" : [
                 "process"
               ]
             }
           }
         },
         {
           "_index" : ".ds-wazuh-findings-v5-system-activity-000001",
           "_id" : "8ING9M_QTHMpLgdh8A5vAg",
           "_score" : 1.0,
           "_source" : {
             "@timestamp" : "2026-10-29T21:35:42.804Z",
             "wazuh" : {
               "integration" : {
                 "name" : "linux"
               },
               "rule" : {
                 "title" : "Sudo command targeting a persistence path - bash -c sudo ls /etc/init.d >/dev/null; sudo cat /etc/crontab >/dev/null; date -u"
               },
               "event" : {
                 "id" : "d36dd348-831a-4dfe-ae63-097d732877f9"
               }
             },
             "event" : {
               "category" : [
                 "process"
               ]
             }
           }
         }
       ]
     }
   }

The output shows the raw event, the normalized event, and the log finding. All three have the same ``wazuh.event.id`` and ``@timestamp``. The ``_source`` parameter limits the output to a few fields. Remove it to see the complete documents.

The following blocks show each document of the ``hits`` array separately:

-  Raw event, stored in the ``wazuh-events-raw-v5`` data stream:

   .. code-block:: json

      {
        "_index" : ".ds-wazuh-events-raw-v5-000001",
        "_id" : "WuOXiaEBB-x79B5YMkGF",
        "_score" : 1.0,
        "_source" : {
          "@timestamp" : "2026-10-29T21:35:42.804Z",
          "wazuh" : {
            "event" : {
              "id" : "d36dd348-831a-4dfe-ae63-097d732877f9"
            }
          }
        }
      }

-  Normalized event, stored in the ``wazuh-events-v5-system-activity`` data stream:

   .. code-block:: json

      {
        "_index" : ".ds-wazuh-events-v5-system-activity-000001",
        "_id" : "YOOXiaEBB-x79B5YMkGF",
        "_score" : 1.0,
        "_source" : {
          "@timestamp" : "2026-10-29T21:35:42.804Z",
          "wazuh" : {
            "integration" : {
              "name" : "linux"
            },
            "event" : {
              "id" : "d36dd348-831a-4dfe-ae63-097d732877f9"
            }
          },
          "event" : {
            "category" : [
              "process"
            ]
          }
        }
      }

-  Finding, stored in the ``wazuh-findings-v5-system-activity`` data stream:

   .. code-block:: json

      {
        "_index" : ".ds-wazuh-findings-v5-system-activity-000001",
        "_id" : "8ING9M_QTHMpLgdh8A5vAg",
        "_score" : 1.0,
        "_source" : {
          "@timestamp" : "2026-10-29T21:35:42.804Z",
          "wazuh" : {
            "integration" : {
              "name" : "linux"
            },
            "rule" : {
              "title" : "Sudo command targeting a persistence path - bash -c sudo ls /etc/init.d >/dev/null; sudo cat /etc/crontab >/dev/null; date -u"
            },
            "event" : {
              "id" : "d36dd348-831a-4dfe-ae63-097d732877f9"
            }
          },
          "event" : {
            "category" : [
              "process"
            ]
          }
        }
      }

Findings
--------

A finding is the matched event with the rule added. It contains every field of the event, unchanged, and the following fields:

-  ``event.doc_id`` and ``event.index``: The ``_id`` of the event that matched and the backing index that stores it. Use them to open the original event.
-  ``wazuh.rule.id``, ``wazuh.rule.title``, ``wazuh.rule.level``, and ``wazuh.rule.status``: The rule that matched, its title with the placeholders filled from the event, its severity level, and its maturity status.
-  ``wazuh.rule.tags``: The rule level, followed by the rule tags, such as MITRE ATT&CK tactic and technique tags.
-  ``wazuh.rule.mitre.*`` and ``wazuh.rule.compliance.*``: The MITRE ATT&CK tactics, techniques, and subtechniques of the rule, and the compliance requirements it maps to.

You can learn more about findings in the :doc:`Findings </user-manual/data-analysis/findings>` documentation.
