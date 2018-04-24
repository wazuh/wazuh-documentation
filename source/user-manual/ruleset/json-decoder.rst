.. Copyright (C) 2018 Wazuh, Inc.

.. _ruleset_json-decoder:

JSON decoder
============

.. versionadded:: 3.0.0

Wazuh now incorporates an integrated decoder for JSON logs enabling the extraction of data from any source in this format.

This decoder has the ability to extract the following data types:

+------------------+--------------------------------------------------------------------------------------------+
|**Numbers**       | Integer or decimal numbers.                                                                |
+------------------+--------------------------------------------------------------------------------------------+
|**Strings**       | A sequence of characters.                                                                  |
+------------------+--------------------------------------------------------------------------------------------+
|**Booleans**      | The values *true* or *false*.                                                              |
+------------------+--------------------------------------------------------------------------------------------+
|**Null values**   | Empty values.                                                                              |
+------------------+--------------------------------------------------------------------------------------------+
|**Arrays**        | Lists with zero or more values. These values may be different, but they must belong to     |
|                  | some of the above. **An array of objects is not supported.**                               |
+------------------+--------------------------------------------------------------------------------------------+
|**Objects**       | Collections of key/value pairs where the keys are strings.                                 |
+------------------+--------------------------------------------------------------------------------------------+

Extracted fields are stored as :doc:`Dynamic Fields <dynamic-fields>` and can be referred to by the rules.

The following example shows how Wazuh decodes a JSON log and generates an alert for *Suricata*.

*Suricata* event log:

.. code-block:: json

   {
      "timestamp": "2016-05-02T17:46:48.515262+0000",
      "flow_id": 1234,
      "in_iface": "eth0",
      "event_type": "alert",
      "src_ip": "16.10.10.10",
      "src_port": 5555,
      "dest_ip": "16.10.10.11",
      "dest_port": 80,
      "proto": "TCP",
      "alert": {
         "action": "allowed",
         "gid": 1,
         "signature_id": 2019236,
         "rev": 3,
         "signature": "ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number",
         "category": "Attempted Administrator Privilege Gain",
         "severity": 1
      },
      "payload": "21YW5kXBtgdW5zIGRlcHJY2F0QgYWI",
      "payload_printable": "this_is_an_example",
      "stream": 0,
      "host": "suricata.com"
   }


The JSON decoder extracts each the fields from the log data for comparison against the rules such that a specific *Suricata* decoder is not needed.  The rules will be used to identify the source of the JSON event based on the existence of certain fields that are specific to the source that the JSON event was generated from.

The following example shows how the rules contained in the file ``0470-suricata_rules.xml`` work. Initially, there is a parent rule to check for the existence of the *'timestamp'* and *'event_type'* fields to determine the type of log (*Suricata*), then the child rule displays the alert using the value of the extracted fields.

.. code-block:: xml

   ...

   <rule id="86600" level="0">
      <decoded_as>json</decoded_as>
      <field name="timestamp">\.+</field>
      <field name="event_type">\.+</field>
      <description>Suricata messages.</description>
   </rule>

   <rule id="86601" level="3">
      <if_sid>86600</if_sid>
      <field name="event_type">^alert$</field>
      <description>Suricata: Alert - $(alert.signature)</description>
   </rule>

   ...


The output of *ossec-logtest* from the above JSON record is as follows:

::

    **Phase 1: Completed pre-decoding.
       full event: '{"timestamp":"2016-05-02T17:46:48.515262+0000","flow_id":1234,"in_iface":"eth0","event_type":"alert","src_ip":"16.10.10.10","src_port":5555,"dest_ip":"16.10.10.11","dest_port":80,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2019236,"rev":3,"signature":"ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number","category":"Attempted Administrator Privilege Gain","severity":1},"payload":"21YW5kXBtgdW5zIGRlcHJY2F0QgYWI","payload_printable":"this_is_an_example","stream":0,"host":"suricata.com"}'
       hostname: 'ip-172-31-22-71'
       program_name: '(null)'
       log: '{"timestamp":"2016-05-02T17:46:48.515262+0000","flow_id":1234,"in_iface":"eth0","event_type":"alert","src_ip":"16.10.10.10","src_port":5555,"dest_ip":"16.10.10.11","dest_port":80,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2019236,"rev":3,"signature":"ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number","category":"Attempted Administrator Privilege Gain","severity":1},"payload":"21YW5kXBtgdW5zIGRlcHJY2F0QgYWI","payload_printable":"this_is_an_example","stream":0,"host":"suricata.com"}'

    **Phase 2: Completed decoding.
           decoder: 'json'
           timestamp: '2016-05-02T17:46:48.515262+0000'
           flow_id: '1234'
           in_iface: 'eth0'
           event_type: 'alert'
           src_ip: '16.10.10.10'
           src_port: '5555'
           dest_ip: '16.10.10.11'
           dest_port: '80'
           proto: 'TCP'
           alert.action: 'allowed'
           alert.gid: '1'
           alert.signature_id: '2019236'
           alert.rev: '3'
           alert.signature: 'ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number'
           alert.category: 'Attempted Administrator Privilege Gain'
           alert.severity: '1'
           payload: '21YW5kXBtgdW5zIGRlcHJY2F0QgYWI'
           payload_printable: 'this_is_an_example'
           stream: '0'
           host: 'suricata.com'

    **Phase 3: Completed filtering (rules).
           Rule id: '86601'
           Level: '3'
           Description: 'Suricata: Alert - ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number'
    **Alert to be generated.
