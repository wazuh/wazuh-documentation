.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the Wazuh Common Schema (WCS) Security Configuration Assessment (SCA) state indices, with an example document and an example of how to use check.result.

Security Configuration Assessment
=================================

The ``wazuh-states-sca`` index stores the results of the Security Configuration Assessment (SCA) checks on each endpoint, with the policy each check belongs to.

The following example shows a document from the ``wazuh-states-sca`` index. It records the result of a CIS benchmark check on the Ubuntu endpoint:

.. code-block:: json

   {
     "_index" : "wazuh-states-sca",
     "_id" : "wazuh_003_4ac934f2a35158bf04255a96435edf246798aedf",
     "_score" : 1.0,
     "_source" : {
       "checksum" : {
         "hash" : {
           "sha1" : "fed019ea7dfb3d744a4ac23cef96c3f88dc6ff92"
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
       "check" : {
         "result" : "Passed",
         "remediation" : "Run the following script to unload and disable the cramfs module: - IF - the cramfs kernel module is available in ANY installed kernel: - Create a file ending in .conf with install cramfs /bin/false in the /etc/modprobe.d/ directory - Create a file ending in .conf with blacklist cramfs in the /etc/modprobe.d/ directory - Run modprobe -r cramfs 2>/dev/null; rmmod cramfs 2>/dev/null to remove cramfs from the kernel - IF - the cramfs kernel module is not available on the system, or pre-compiled into the kernel, no remediation is necessary #!/usr/bin/env bash.",
         "condition" : "any",
         "compliance" : {
           "iso_27001" : [
             "A.5.37",
             "A.8.32",
             "A.8.25"
           ],
           "hipaa" : [
             "164.308.a.1",
             "164.308.a.8"
           ],
           "pci_dss" : [
             "1.2.5",
             "2.2.4",
             "6.4.1"
           ],
           "tsc" : [
             "CC6.3",
             "CC6.6",
             "CC8.1",
             "CC5.1",
             "CC5.2",
             "CC5.3"
           ],
           "nis2" : [
             "21.2.e",
             "21.2.a"
           ],
           "nist_800_171" : [
             "3.4.7",
             "3.4.8",
             "3.13.6"
           ],
           "fedramp" : [
             "CM-2",
             "CM-3",
             "CM-6",
             "CM-7"
           ],
           "nist_800_53" : [
             "CM-2",
             "CM-3",
             "CM-6",
             "CM-7"
           ],
           "cmmc" : [
             "CM.L2-3.4.7",
             "CM.L2-3.4.8",
             "SC.L2-3.13.6"
           ],
           "gdpr" : [
             "IV_32.1.a",
             "IV_32.1.b",
             "IV_32.1.c",
             "IV_32.1.d",
             "IV_32.2",
             "IV_32.3",
             "IV_32.4"
           ]
         },
         "name" : "Ensure mounting of cramfs filesystems is disabled.",
         "description" : "The cramfs filesystem type is a compressed read-only Linux filesystem embedded in small footprint systems. A cramfs image can be used without having to first decompress the image.",
         "mitre" : {
           "technique" : {
             "name" : [
               "Masquerading",
               "Hide Artifacts"
             ],
             "id" : [
               "T1036",
               "T1564"
             ]
           },
           "tactic" : {
             "name" : [
               "Stealth"
             ],
             "id" : [
               "TA0005"
             ]
           }
         },
         "rules" : [
           "c:modprobe -n -v cramfs -> r:install /bin/false|install /bin/true|Module cramfs not found",
           "not c:lsmod -> r:cramfs",
           "d:/etc/modprobe.d/ -> r:.*\\.conf -> r:^blacklist\\s+cramfs"
         ],
         "id" : "35500",
         "rationale" : "Removing support for unneeded filesystem types reduces the local attack surface of the system. If this filesystem type is not needed, disable it."
       },
       "state" : {
         "document_version" : 298,
         "modified_at" : "2026-10-29T08:02:08.403Z"
       },
       "policy" : {
         "file" : "cis_ubuntu24-04.yml",
         "references" : [
           "https://www.cisecurity.org/cis-benchmarks/"
         ],
         "name" : "CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0.",
         "description" : "This document provides prescriptive guidance for establishing a secure configuration posture for Ubuntu Linux 24.04 LTS based on CIS benchmark for Ubuntu Linux 24.04 LTS.",
         "id" : "cis_ubuntu24-04"
       }
     }
   }

Example: Detect an SCA check that starts failing, then see where it fails
-------------------------------------------------------------------------

The Wazuh agent sends an SCA event when the result of a check changes. ``check.result`` is in that event and in the ``wazuh-states-sca`` index. A rule flags checks that change to ``Failed``, then a query shows where the check fails now.

Create the rule in **Ruleset management** > **Detection** > **Rules**. ``logsource.product`` names the integration whose events the rule evaluates. The events come from a built-in integration, so add the rule to a custom integration whose title is the same as the built-in one, for example ``wazuh-fim``. Then promote it to the custom space and add it to a custom detector in **Ruleset management** > **Detection** > **Detectors**. In the query, replace ``<WAZUH_INDEXER_IP_ADDRESS>``, ``<USERNAME>``, and ``<PASSWORD>`` with your values. The highlighted lines show where ``check.result`` is used and where it appears in the output.

**1. Rule on SCA events**

.. code-block:: yaml
   :emphasize-lines: 10

   logsource:
     product: wazuh-sca
   level: medium
   status: experimental
   enabled: true
   detection:
     condition: selection
     selection:
       event.dataset: wazuh.sca
       check.result: Failed
   metadata:
     title: SCA check started failing
     author: Security Team
     description: Detects an SCA check whose result changed to Failed.

**2. Finding (excerpt)**

.. code-block:: json
   :emphasize-lines: 6

   {
     "event": { "dataset": "wazuh.sca", "action": "policy-check-evaluated", "outcome": "failure" },
     "check": {
       "id": "35608",
       "name": "Ensure ip forwarding is disabled.",
       "result": "Failed"
     },
     "wazuh": {
       "agent": { "name": "Ubuntu" },
       "rule": { "title": "SCA check started failing", "level": "medium" }
     }
   }

**3. Query on the state index**

.. code-block:: bash
   :emphasize-lines: 6

   curl -k -u <USERNAME>:<PASSWORD> -X GET "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/wazuh-states-sca/_search?pretty" \
     -H 'Content-Type: application/json' -d '
   {
     "query": { "bool": { "filter": [
       { "term": { "check.id": "35608" } },
       { "term": { "check.result": "Failed" } }
     ] } },
     "_source": [ "wazuh.agent.name", "policy.name", "check.id", "check.name", "check.result" ]
   }'

**4. Result (excerpt)**

.. code-block:: json
   :emphasize-lines: 10

   "hits": [
     {
       "_index": "wazuh-states-sca",
       "_source": {
         "wazuh": { "agent": { "name": "Ubuntu" } },
         "policy": { "name": "CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0." },
         "check": {
           "id": "35608",
           "name": "Ensure ip forwarding is disabled.",
           "result": "Failed"
         }
       }
     }
   ]

.. note::

   -  ``check.result`` values start with a capital letter, such as ``Passed`` and ``Failed``.


Fields
------

.. wcs-field-tables:: stateful/sca
   :single-table:
