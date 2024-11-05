.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Sibling decoders refer to a decoder building strategy where multiple decoders operate at the same hierarchical level without a parent-child relationship. Learn more about it in this section.

Sibling Decoders
================

Sibling decoders refer to a decoder building strategy where multiple decoders operate at the same hierarchical level without a parent-child relationship. Unlike traditional parent-child decoder relationships, where a parent decoder triggers its child decoders based on specific conditions, sibling decoders are independent of each other and function in parallel. This approach is particularly useful when dealing with logs that require multiple decoding strategies or when different parts of a log entry need to be processed separately. Sibling decoders offer greater flexibility in decoding complex log structures and allow for more nuanced analysis of log data.

Traditional log decoding
------------------------

Wazuh collects log messages from numerous sources relevant to an environment's security. Subsequently, each ingested message undergoes analysis based on a simple and resource-efficient logic, enabling the Wazuh manager to handle large volumes of log data with minimal resources. 

The analysis process involves sequentially examining each log message using decoders without a parent.  Once a matching condition is met, the process repeats with decoders that have this decoder as a parent. It is important to note that once a decoder is matched, it stops searching through other decoders and focuses solely on its children, if any. Therefore, when constructing decoders, it is essential to avoid overly generic matching conditions to prevent false positives and ensure that the appropriate decoders are triggered effectively.

.. thumbnail:: /images/manual/ruleset/traditional-log-decoding.png
   :title: Traditional log decoding
   :alt: Traditional log decoding
   :align: center
   :width: 80%

As a reminder, decoders, unlike rules, cannot have "grandchildren". In other words, a child decoder cannot act as a parent.

Dealing with dynamically structured logs
----------------------------------------

The process of matching at decoder level uses :ref:`regular expressions <os_regex_syntax>`, which require the matching string to have a specific structure. However, this can be a nuisance when logs do not follow a specific structure. They will often provide information omitting parts of the log or changing the order, which would make it impractical if not impossible to create all the necessary decoders to match each one of the possible combinations in which security-relevant data may be received.

Sibling decoders take advantage of the simple parent-children matching logic, enabling the creation of a set of decoders that are 'parents' of each other. As a result, when one of these decoders is matched, it will also check the "sibling" decoders, while extracting one piece of information at a time.

.. thumbnail:: /images/manual/ruleset/dynamically-structured-decoding.png
   :title: 
   :alt: 
   :align: center
   :width: 80%

As a result, even if the ordering of the information varies, additional information is present, or some information is missing, the Wazuh analysis engine can still extract as much information as possible from the message.

Extracting information in this modular way through sibling decoders significantly improves their readability. This is achieved by breaking down lengthy regular expression strings into smaller, more manageable pieces.

Practical example
-----------------

We have a log source that provides the following log message:

.. code-block:: none

   Apr 12 14:31:38 hostname1 securityapp: INFO: srcuser="Bob" action="called" dstusr="Alice"

A simple decoder may be:

.. code-block:: xml

   <decoder name="securityapp">
     <program_name>securityapp</program_name>
     <regex>(\w+): srcuser="(\.+)" action="(\.+)" dstusr="(\.+)"</regex>
     <order>type,srcuser,action,dstuser</order>
   </decoder>

We run the ``/var/ossec/bin/wazuh-logtest`` utility on the Wazuh server to test the decoder and obtain the following result:

.. code-block:: none

   Type one log per line

   Apr 12 14:31:38 hostname1 securityapp: INFO: srcuser="Bob" action="called" dstusr="Alice"

   **Phase 1: Completed pre-decoding.
           full event: 'Apr 12 14:31:38 hostname1 securityapp: INFO: srcuser="Bob" action="called" dstusr="Alice"'
           timestamp: 'Apr 12 14:31:38'
           hostname: 'hostname1'
           program_name: 'securityapp'

   **Phase 2: Completed decoding.
           name: 'securityapp'
           action: 'called'
           dstuser: 'Alice'
           srcuser: 'Bob'
           type: 'INFO'

However, if the log source then provides this message:

.. code-block:: none

   Apr 01 19:21:24 hostname2 securityapp: INFO: action="logged on" srcuser="Bob"

No information is extracted.

We can use modular logic with sibling decoders to decode the log message:

.. code-block:: xml

   <decoder name="securityapp">
     <program_name>securityapp</program_name>
   </decoder>

   <decoder name="securityapp">
     <parent>securityapp</parent>
     <regex>^(\w+):</regex>
     <order>type</order>
   </decoder>

   <decoder name="securityapp">
     <parent>securityapp</parent>
     <regex>srcuser="(\.+)"</regex>
     <order>srcuser</order>
   </decoder>

   <decoder name="securityapp">
     <parent>securityapp</parent>
     <regex>action="(\.+)"</regex>
     <order>action</order>
   </decoder>

   <decoder name="securityapp">
     <parent>securityapp</parent>
     <regex>dstusr="(\.+)"</regex>
     <order>dstuser</order>
   </decoder>

Both messages are now correctly decoded.

Output

.. code-block:: none

   Type one log per line

   Dec 28 01:35:18 hostname1 securityapp: INFO: srcuser="Bob" action="called" dstusr="Alice"

   **Phase 1: Completed pre-decoding.
           full event: 'Dec 28 01:35:18 hostname1 securityapp: INFO: srcuser="Bob" action="called" dstusr="Alice"'
           timestamp: 'Dec 28 01:35:18'
           hostname: 'hostname1'
           program_name: 'securityapp'

   **Phase 2: Completed decoding.
           name: 'securityapp'
           action: 'called'
           dstuser: 'Alice'
           srcuser: 'Bob'
           type: 'INFO'


   Apr 01 19:21:24 hostname2 securityapp: INFO: action="logged on" srcuser="Bob"

   **Phase 1: Completed pre-decoding.
           full event: 'Apr 01 19:21:24 hostname2 securityapp: INFO: action="logged on" srcuser="Bob"'
           timestamp: 'Apr 01 19:21:24'
           hostname: 'hostname2'
           program_name: 'securityapp'

   **Phase 2: Completed decoding.
           name: 'securityapp'
           action: 'logged on'
           srcuser: 'Bob'
           type: 'INFO'
