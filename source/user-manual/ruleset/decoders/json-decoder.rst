.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh incorporates a default decoder for JSON logs, enabling the extraction of data from any source in this format. Learn more in this section of the documentation.
    
JSON decoder
============

Wazuh incorporates a default decoder for JSON logs, enabling the extraction of data from any source in this format.

The JSON decoder possesses the ability to extract the following data types:

+------------------+--------------------------------------------------------------------------------------------+
|**Numbers**       | Integer or decimal numbers.                                                                |
+------------------+--------------------------------------------------------------------------------------------+
|**Strings**       | A sequence of characters.                                                                  |
+------------------+--------------------------------------------------------------------------------------------+
|**Booleans**      | The values are ``true`` or ``false``.                                                      |
+------------------+--------------------------------------------------------------------------------------------+
|**Null values**   | Empty values.                                                                              |
+------------------+--------------------------------------------------------------------------------------------+
|**Arrays**        | Lists with zero or more values. These values may be different, but they must belong to     |
|                  | some of the above. An array of objects is not supported.                                   |
+------------------+--------------------------------------------------------------------------------------------+
|**Objects**       | Collections of key/value pairs where the keys are strings.                                 |
+------------------+--------------------------------------------------------------------------------------------+

Extracted fields are stored as :doc:`dynamic Fields <dynamic-fields>` and can be referred to by the rules.

The following example shows how Wazuh decodes a JSON log and generates an alert for *Suricata*.

Suricata event log:

.. code-block:: json

   {
      "timestamp": "2023-05-02T17:46:48.515262+0000",
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

The JSON decoder extracts each field from the JSON log data for comparison against the rules, eliminating the need for a specific Suricata decoder.

We can now run the ```` tool on the Wazuh server to test the log sample and have insights into the current decoding.

The output of the test provide the following result:

.. code-block:: none

   Type one log per line

   {"timestamp":"2023-05-02T17:46:48.515262+0000","flow_id":1234,"in_iface":"eth0","event_type":"alert","src_ip":"16.10.10.10","src_port":5555,"dest_ip":"16.10.10.11","dest_port":80,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2019236,"rev":3,"signature":"ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number","category":"Attempted Administrator Privilege Gain","severity":1},"payload":"21YW5kXBtgdW5zIGRlcHJY2F0QgYWI","payload_printable":"this_is_an_example","stream":0,"host":"suricata.com"}

   **Phase 1: Completed pre-decoding.

   **Phase 2: Completed decoding.
           name: 'json'
           alert.action: 'allowed'
           alert.category: 'Attempted Administrator Privilege Gain'
           alert.gid: '1'
           alert.rev: '3'
           alert.severity: '1'
           alert.signature: 'ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number'
           alert.signature_id: '2019236'
           dest_ip: '16.10.10.11'
           dest_port: '80'
           event_type: 'alert'
           flow_id: '1234'
           host: 'suricata.com'
           in_iface: 'eth0'
           payload: '21YW5kXBtgdW5zIGRlcHJY2F0QgYWI'
           payload_printable: 'this_is_an_example'
           proto: 'TCP'
           src_ip: '16.10.10.10'
           src_port: '5555'
           stream: '0'
           timestamp: '2023-05-02T17:46:48.515262+0000'

   **Phase 3: Completed filtering (rules).
           id: '86601'
           level: '3'
           description: 'Suricata: Alert - ET WEB_SERVER Possible CVE-2014-6271 Attempt in HTTP Version Number'
           groups: '['ids', 'suricata']'
           firedtimes: '1'
           mail: 'False'
   **Alert to be generated.

.. _json_decoder_example_3.3:

Offset
------

The ``offset`` attribute in the Wazuh JSON decoder enables the extraction of JSON data included within an incoming log by discarding certain parts of the input string. This functionality proves useful when dealing with logs that contain additional metadata or formatting before the JSON payload. For instance, if we receive a log containing JSON data embedded within a larger string, we can use the ``offset`` attribute to discard the preceding text and focus solely on the JSON content.

Let’s consider the following log entry which includes player information within a string, preceded by timestamp and program name:

.. code-block:: none

   2018 Apr 04 13:11:52 nba_program: this_is_an_example: " player_information: "{ "name": "Stephen", "surname": "Curry", "team": "Golden State Warriors", "number": 30, "position": "point guard"}

By utilizing the JSON decoder with the ``offset`` attribute, we can efficiently extract and process the JSON data for further analysis. The decoder declaration using the ``offset`` attribute would be as follows:

.. code-block:: xml

   <decoder name="raw_json">
       <program_name>nba_program</program_name>
       <prematch>player_information: "</prematch>
       <plugin_decoder offset="after_prematch">JSON_Decoder</plugin_decoder>
   </decoder>

The JSON decoder extracts the fields contained in the JSON event as :ref:`dynamic fields <dynamic_fields_dynamic_decoders>`, considering the end of the prematch text.

When, testing the log sample with ```` we obtain the following output:

.. code-block:: none
   
   Type one log per line

   2018 Apr 04 13:11:52 nba_program: this_is_an_example: " player_information: "{ "name": "Stephen", "surname": "Curry", "team": "Golden State Warriors", "number": 30, "position": "point guard"}

   **Phase 1: Completed pre-decoding.
           full event: '2018 Apr 04 13:11:52 nba_program: this_is_an_example: " player_information: "{ "name": "Stephen", "surname": "Curry", "team": "Golden State Warriors", "number": 30, "position": "point guard"}'
           timestamp: '2018 Apr 04 13:11:52'
           program_name: 'nba_program'

   **Phase 2: Completed decoding.
           name: 'raw_json'
           name: 'Stephen'
           number: '30'
           position: 'point guard'
           surname: 'Curry'
           team: 'Golden State Warriors'

As we can see, the JSON decoder ignores any data after a valid JSON object, ensuring accurate extraction of JSON fields.

Mixing of plugin decoders with regular expressions
--------------------------------------------------

Another new capability is the ability to combine :ref:`plugin decoders <plugin_decoder>` with regular expressions.

Consider the following incoming log:

.. code-block:: none

   2018 Jun 08 13:11:52 nba_email_db: json_data: { "name": "Stephen", "surname": "Curry", "email": "curry@gmail.com"}

We can set several child decoders from a parent, specifying a plugin decoder as before, and also another one including a regular expression. For example, the following ones:

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
       <order>email_domain</order>
   </decoder>

When, testing the log sample with ````, we can observe the decoded fields by the JSON decoder, as well as the matched field from the regex expression:

.. code-block:: none

   Type one log per line

   2018 Jun 08 13:11:52 nba_email_db: json_data: { "name": "Stephen", "surname": "Curry", "email": "curry@gmail.com"}

   **Phase 1: Completed pre-decoding.
           full event: '2018 Jun 08 13:11:52 nba_email_db: json_data: { "name": "Stephen", "surname": "Curry", "email": "curry@gmail.com"}'
           timestamp: '2018 Jun 08 13:11:52'
           program_name: 'nba_email_db'

   **Phase 2: Completed decoding.
           name: 'json_parent'
           parent: 'json_parent'
           email: 'curry@gmail.com'
           email_domain: 'gmail.com'
           name: 'Stephen'
           surname: 'Curry'
