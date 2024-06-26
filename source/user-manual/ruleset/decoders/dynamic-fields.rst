.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Dynamic fields are additional fields extracted from log data during the decoding process. Learn more in this section of the documentation. 
  
Dynamic fields
==============

Dynamic fields are additional fields extracted from log data during the decoding process. Unlike predefined fields, dynamic fields are not limited in number and can vary depending on the content of the log message. These fields capture specific information from logs, enriching the data available for analysis and detection.

.. _traditional_decoders:

Traditional decoders
--------------------

Traditionally, Wazuh offers thirteen predefined fields for storing extracted information: ``user``, ``srcip``, ``dstip``, ``srcport``, ``dstport``, ``protocol``, ``action``, ``id``, ``url``, ``data``, ``extra_data``, ``status``, and ``system_name``. These are also referred to as “static fields”. However, only eight fields can be extracted simultaneously. This limitation arises because in certain scenarios where log entries contain multiple types of information, Wazuh prioritizes the extraction of specific fields over others. As a result, only eight out of the thirteen fields can be populated simultaneously to manage resource constraints and maintain efficiency in log processing. The prioritized fields in such cases are typically: ``user``, ``srcip``, ``dstip``, ``srcport``, ``dstport``, ``protocol``, ``action`` and ``id``.

You can find below an example decoder to match some static fields:

.. code-block:: xml

   <decoder name="web-accesslog">
     <type>web-log</type>
     <prematch>^\d+.\d+.\d+.\d+ - </prematch>
     <regex>^(\d+.\d+.\d+.\d+) - \S+ [\S+ -\d+] </regex>
     <regex>"\w+ (\S+) HTTP\S+ (\d+) </regex>
     <order>srcip,url,id</order>
   </decoder>

.. _dynamic_fields_dynamic_decoders:

Dynamic decoders
----------------

It is often necessary to extract more than eight relevant fields from an event, and often the actual data items extracted have no relationship to the limited list of predefined field names. Recognizing the limitations of operating within these constraints, 	 unlimited number of fields with names that accurately reflect the extracted data. This enhancement includes support for nested field names as well.

You can find below an example decoder to match some dynamic fields:

.. code-block:: xml

   <decoder name="auditd-config_change">
     <parent>auditd</parent>
     <regex offset="after_regex">^auid=(\S+) ses=(\S+) op="(\.+)"</regex>
     <order>audit.auid,audit.session,audit.op</order>
   </decoder>

Wazuh transforms any field name included in the ``<order>`` tag into a JSON field.

The following example shows how the ``/var/ossec/ruleset/decoders/0040-auditd_decoders.xml`` decoder extracts information from an alert:

Output

.. code-block:: none

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


JSON output

.. code-block:: json

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

By default, the maximum number of fields that can be extracted simultaneously from an ``<order>`` tag is 64. You can modify the ``analysisd.decoder_order_size`` variable in the ``/var/ossec/etc/internal_options.conf`` file to adjust this value.

If you need to change this value, copy the ``analysisd.decoder_order_size`` section from ``/var/ossec/etc/internal_options.conf`` to ``/var/ossec/etc/local_internal_options.conf`` and make the necessary changes there. This precaution is necessary because Wazuh upgrades overwrite the ``/var/ossec/etc/internal_options.conf`` file.