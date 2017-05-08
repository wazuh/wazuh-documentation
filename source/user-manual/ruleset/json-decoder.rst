.. _ruleset_json-decoder:

JSON decoder
=============

.. versionadded:: 3.0

Wazuh incorporates an integrated decoder for JSON format. This decoder allows us to extract data from any source in JSON format.

The decoder is able to extract the following data types:

+------------------+--------------------------------------------------------------------------------------------+
|**Numbers**       | Integer or decimal numbers.                                                                |
+------------------+--------------------------------------------------------------------------------------------+
|**Strings**       | A sequence of zero or more characters.                                                     |
+------------------+--------------------------------------------------------------------------------------------+
|**Booleans**      | Either of the values *true* or *false*.                                                    |
+------------------+--------------------------------------------------------------------------------------------+
|**Null values**   | Empty values.                                                                              |
+------------------+--------------------------------------------------------------------------------------------+
|**Arrays**        | List with zero or more values. These values may be different, but they must belong to      |
|                  | some of the above. **An array of objects is not supported.**                               |
+------------------+--------------------------------------------------------------------------------------------+
|**Objects**       | Collection of key/value pairs where the keys are strings.                                  |
+------------------+--------------------------------------------------------------------------------------------+

Extracted fields are casted to strings, stored as :doc:`Dynamic Fields <dynamic-fields>` and can be used for rules generation.

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


We don't need to create a specific decoder for *Suricata*, since the JSON decoder extracts all the content fields and we can use them directly in the rules.
We only need to check the fields extracted by the decoder to identify the log received and generate the alert.
In the following example we show how the rules contained in the file ``0470-suricata_rules.xml`` work.
We use the first rule to check the existence of the *'timestamp'* and *'event_type'* fields to determine the type of log (*Suricata*),
and in the second rule we can display the alert using the value of the extracted fields.

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


Output obtained using *ossec-logtest*:

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
