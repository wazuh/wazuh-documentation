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
       full event: '{"timestamp":"2016-05-02T17:46:48.515262+0000","flow_id":1234","in_iface":"eth0","event_type":"alert","src_ip":"16.10.10.10","src_port":5555,"dest_ip":"16.10.10.11","dest_port":80,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2019236,"rev":3,"signature":"ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number","category":"Attempted Administrator Privilege Gain","severity":1},"payload":"21YW5kXBtgdW5zIGRlcHJY2F0QgYWI","payload_printable":"this_is_an_example","stream":0,"host":"suricata.com"}'
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

.. _json_decoder_example_3.3:

.. versionadded:: 3.3.0

Lets see another example where we use the JSON decoder to extract a JSON included as a part of an incoming log. This is possible thanks to the new attribute ``offset`` introduced to the decoder options, that allows to discard some parts
of the input string.

If we use this input log:

::

    2018 Apr 04 13:11:52 nba_program: this_is_an_example: " player_information: "{ "name": "Stephen", "surname": "Curry", "team": "Golden State Warriors", "number": 30, "position": "point guard"}

The decoder declaration using that new feature would be the following:

.. code-block:: xml

    <decoder name="raw_json">
        <program_name>nba_program</program_name>
        <prematch>player_information: "</prematch>
        <plugin_decoder offset="after_prematch">JSON_Decoder</plugin_decoder>
    </decoder>

The JSON decoder will extract the fields contained in the JSON event as dynamic fields, taking into account from the end of the prematch text. The output of the *ossec-logtest* is the following:

::

    **Phase 1: Completed pre-decoding.
        full event: '2018 Apr 04 13:11:52 nba_program: this_is_an_example: " player_information: "{ "name": "Stephen", "surname": "Curry", "team": "Golden State Warriors", "number": 30, "position": "point guard"}'
        timestamp: '2018 Apr 04 13:11:52'
        hostname: 'ubuntu18'
        program_name: 'nba_program'
        log: 'this_is_an_example: " player_information: "{ "name": "Stephen", "surname": "Curry", "team": "Golden State Warriors", "number": 30, "position": "point guard   "}'

    **Phase 2: Completed decoding.
        decoder: 'raw_json'
        name: 'Stephen'
        surname: 'Curry'
        team: 'Golden State Warriors'
        number: '30'
        position: 'point guard'

As we can see, the JSON decoder is not affected by any more data after a valid JSON object.

In addition, we could define a rule for these raw events decoded:

.. code-block:: xml

    <rule id="100001" level="5">
        <decoded_as>raw_json</decoded_as>
        <description>Raw JSON event</description>
    </rule>

Finally, the result retrieved by *ossec-logtest* would be:

::

    **Phase 3: Completed filtering (rules).
        Rule id: '100001'
        Level: '5'
        Description: 'Raw JSON event'
    **Alert to be generated.

Another new feature is the ability of mixing plugin decoders with regex expressions, take a look in the following incoming log:

::

    2018 Jun 08 13:11:52 nba_email_db: json_data: { "name": "Stephen", "surname": "Curry", "email": "curry@gmail.com"}

We can set several children decoders from a parent specifying a plugin decoder as before, and also another one including a regex expression. For example, the following ones:

.. code-block:: xml

    <decoder name="json_parent">
        <program_name>nba_email_db</program_name>
    </decoder>

    <decoder name="json_child">
        <parent>json_parent</parent>
        <prematch>json_data: </prematch>
        <plugin_decoder offset="after_prematch">JSON_Decoder</plugin_decoder>
    </decoder>

    <decoder name="json_child">
        <parent>json_parent</parent>
        <regex>@(\S+)"</regex>
        <order>email.domain</order>
    </decoder>

The output of the *ossec-logtest* tool shows the decoded fields by the JSON decoder, as well as the matched field from the regex expression:

::

    **Phase 1: Completed pre-decoding.
        full event: '2018 Apr 04 13:11:52 nba_email_db: json_data: { "name": "Stephen", "surname": "Curry", "email": "curry@gmail.com"}'
        timestamp: '2018 Apr 04 13:11:52'
        hostname: 'ubuntu18'
        program_name: 'nba_email_db'
        log: 'json_data: { "name": "Stephen", "surname": "Curry", "email": "curry@gmail.com"}'

   **Phase 2: Completed decoding.
        decoder: 'json_parent'
        name: 'Stephen'
        surname: 'Curry'
        email: 'curry@gmail.com'
        email.domain: 'gmail.com'
