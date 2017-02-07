.. _ruleset_dynamic-fields:

Dynamic fields
===============

Traditional decoder
--------------------

An important step for the detection and processing of threats is the extraction of information from each event received, the great difference that OSSEC represents in this aspect is the ability to process an event and extract the most relevant fields, thus converting an event into plain text in an enriched alert, allowing its indexing and subsequent analysis.

Traditionally, OSSEC provides thirteen predefined fields to store the extracted information in the decoding process (*user, srcip, dstip, srcport, dstport, protocol, action, id, url, data, extra_data, status, system_name*), but it is only possible to extract eight of them simultaneously.

Static fields:
::

  <decoder name="web-accesslog">
    <type>web-log</type>
    <prematch>^\d+.\d+.\d+.\d+ - </prematch>
    <regex>^(\d+.\d+.\d+.\d+) - \S+ [\S+ -\d+] </regex>
    <regex>"\w+ (\S+) HTTP\S+ (\d+) </regex>
    <order>srcip,url,id</order>
  </decoder>


Dynamic decoder
----------------

In most cases it is necessary to extract more than eight relevant fields from an event. In the case of important information that we want to extract and analyze, we can not afford this limit of fields, besides the name of each field is fixed, and in many cases we will extract information that has no place in fields like *'extra_data'* or *'status'*.
Wazuh allows the insertion of new fields in a way that facilitates the understanding and treatment of the information extracted in the decoding process, thus being able to extract and create as many fields as we need, besides choosing the exact name for each situation and using several nesting levels.

Dynamic fields:
::

  <decoder name="auditd-config_change">
    <parent>auditd</parent>
    <regex offset="after_regex">^auid=(\S+) ses=(\S+) op="(\.+)"</regex>
    <order>audit.auid,audit.session,audit.op</order>
  </decoder>

Wazuh transforms any field name included in the ``<order>`` tag into a JSON field.

The next example shows how the Audit decoder extracts the information from an alert:
::

  ** Alert 1486483073.60589: - audit,audit_configuration,
  2017 Feb 07 15:57:53 wazuh-example->/var/log/audit/audit.log
  Rule: 80705 (level 3) -> 'Auditd: Configuration changed'
  type=CONFIG_CHANGE msg=audit(1486483072.194:20): auid=0 ses=6 op="add rule" key="audit-wazuh-a" list=4 res=1
  audit.type: CONFIG_CHANGE
  audit.id: 20
  audit.auid: 0
  audit.session: 6
  audit.op: add rule
  audit.key: audit
  audit.list: 4
  audit.res: 1


JSON Output:
::

  {
    "rule": {
      "level": 3,
      "description": "Auditd: Configuration changed",
      "id": 80705,
      "firedtimes": 2,
      "groups": [
        "audit",
        "audit_configuration"
      ]
    },
    "agent": {
      "id": "000",
      "name": "wazuh-example"
    },
    "manager": {
      "name": "wazuh-example"
    },
    "full_log": "type=CONFIG_CHANGE msg=audit(1486483072.194:20): auid=0 ses=6 op=\"add rule\" key=\"audit-wazuh-a\" list=4 res=1",
    "audit": {
      "type": "CONFIG_CHANGE",
      "id": "20",
      "auid": "0",
      "session": "6",
      "op": "add rule",
      "key": "audit",
      "list": "4",
      "res": "1"
    },
    "decoder": {
      "parent": "auditd",
      "name": "auditd"
    },
    "timestamp": "2017 Feb 07 15:57:53",
    "location": "/var/log/audit/audit.log"
  }


.. note::
    By default the number of fields that can be extracted simultaneously from a ``<order>`` tag is **64**. This value can be modified by the variable ``analysisd.decoder_order_size`` inside the file ``/var/ossec/etc/internal_options.conf``
