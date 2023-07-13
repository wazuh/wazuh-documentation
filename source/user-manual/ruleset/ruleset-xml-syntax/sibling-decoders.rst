.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Sibling Decoders can be considered a decoder building strategy for those looking to build their own custom decoders. Learn more about it in this section.

.. _sibling_decoders:

Sibling Decoders
================

Our development team and the Wazuh community at large are constantly :doc:`contributing to the ruleset <../contribute>` but at the same time, new security-relevant devices and software programs are being created constantly all around the globe.
Even more, depending on each environment, users will have different needs and preferences. For these reasons and more it is key that the security software you use is as flexible and easy to configure as possible.

Sibling Decoders can be considered a decoder building strategy that can be of great help for those looking into building their own custom decoders. As different logs come with different needs and sometimes extracting all the information can be challenging, especially when dealing with dynamically structured logs.
The main purpose is to provide tools capable of decoding as much information as possible in the easiest way possible.

Wazuh's log analysis
^^^^^^^^^^^^^^^^^^^^

Firstly, it is of the utmost importance to understand how logs are analyzed by Wazuh's ``analysisd``. Wazuh collects log messages from a vast amount of sources relevant to an environment's security. Then, for every message ingested, the ruleset is analyzed using a very simple and resource-efficient logic that allows the Wazuh manager to handle large amounts of log data requiring few resources.


The log will be sequentially checked one by one by the decoders that don't have a parent. When it meets the condition of any one of them the process is repeated with the decoders that have this decoder as a ``<parent>``. It is important to understand, that once a decoder is matched, it will stop looking through the ruleset and will only focus on its children if it has any.
Because of this, it is an essential practice when building decoders to avoid being too generic in the matching conditions as it could result in false positives and the right decoders not being triggered at all.

.. thumbnail:: ../../../images/manual/ruleset/ruleset-xml-syntax/decoders-tree.png
    :title: Log analysis
    :align: center
    :width: 100%

Remember that unlike rules, decoders cannot have "grandchildren". A child decoder is not able to be a parent.

Dealing with dynamically structured logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The process of matching at decoder level uses `regular expressions <:ref:`regex <os_regex_syntax>`, which require the matching string to have a specific structure. However, this can be a nuisance when logs do not follow a specific structure. They will often provide information omitting parts of the log or changing the order, which would make it impractical if not impossible to create all the necessary decoders to match each one of the possible combinations in which security-relevant data may be received.

This is where sibling decoders come in. Taking advantage of the simple parent-children matching logic, one can create a set of decoders that are together "parent" of themselves. As a result, when one of these decoders is matched it will also check the "sibling" decoders whilst extracting one piece of information at a time.



.. thumbnail:: ../../../images/manual/ruleset/ruleset-xml-syntax/sibling-decoders-tree.png
    :title: Log analysis
    :align: center
    :width: 100%

As a consequence, if the ordering of the information varies, there is additional information or some is missing, the analysisd module will still be able to extract as much information as possible from the message.

A welcome side effect of extracting information in this modular way is that decoders become much more readable than one long regular expression string.


Practical example
^^^^^^^^^^^^^^^^^

Say we have a log source that provides the following log message:

``2019/01/02 13:16:35 securityapp: INFO: srcuser="Bob" action="called" dstusr="Alice"``

A simple decoder may be:

.. code-block:: xml

  <decoder name="securityapp">
    <program_name>securityapp</program_name>
    <regex>(\w+): srcuser="(\.+)" action="(\.+)" dstusr="(\.+)"</regex>
    <order>type,srcuser,action,dstuser</order>
  </decoder>

Using `/var/ossec/bin/wazuh-logtest` we get:

.. code-block:: none
  :class: output

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

``Apr 01 19:21:24 hostname2 securityapp: INFO: action="logged on" srcuser="Bob"``

No information is extracted.

But using modular logic with sibling decoders:

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

.. code-block:: none
  :class: output

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
