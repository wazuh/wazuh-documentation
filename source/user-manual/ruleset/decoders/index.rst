.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh uses decoders to extract information from received log messages. Learn more in this section of the documentation.

Decoders
========

Wazuh utilizes decoders to extract information from received log messages. Upon receiving a log message, decoders segment the information into fields to prepare them for analysis.

Wazuh decoders utilize XML syntax, enabling users to specify how log data should be parsed and normalized. The syntax typically includes elements such as ``<decoder>`` for defining the decoder, ``<order>``  to specify the decoding sequence, and ``<regex>`` for defining regular expressions for pattern matching. For more information, take a look at the :doc:`decoder syntax </user-manual/ruleset/ruleset-xml-syntax/decoders>` documentation.

Decoders operate in two phases: pre-decoding and decoding. During the pre-decoding phase, general information such as a timestamp, hostname, and program name are extracted when a syslog-like header is present. This initial extraction provides essential context for further analysis. In the subsequent decoding phase, decoders parse and interpret the remaining log data, extracting additional relevant information. They play a crucial role in parsing and interpreting log data, allowing Wazuh to understand and respond to different types of events.

While Wazuh has a built-in :doc:`JSON decoder </user-manual/ruleset/decoders/json-decoder>` dedicated to logs in JSON format, it also offers a range of other out-of-the-box decoders tailored to various log formats commonly encountered in different environments. Furthermore, users have the flexibility to create custom decoders for formats not covered by the out-of-the-box options. The following sections provide detailed insights into both the functionality of the built-in JSON decoder and the process of creating and utilizing :doc:`custom decoders </user-manual/ruleset/decoders/custom>`.

.. toctree::
   :maxdepth: 1

   json-decoder
   dynamic-fields
   sibling-decoders
   custom
