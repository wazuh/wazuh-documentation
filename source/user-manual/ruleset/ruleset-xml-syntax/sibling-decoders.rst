.. Copyright (C) 2019 Wazuh, Inc.

.. _sibling_decoders:

Sibling Decoders
================

Our development team and the Wazuh community at large are constantly `contributing to the ruleset <../contribute.html>`_ but at the same time, new security-relevant devices and software programs are being created constantly all around the globe.
Even more, depending on each environment, users will have different needs and preferences. For these reasons and more it is key that the security software you use is as flexible and easy to configure as possible.

Sibling Decoders can be considered a decoder building strategy which can be of great help for those looking into building their own custom decoders. As different logs come with different needs and sometimes extracting all the information can be challenging, especially when dealing with dynamically structured logs.
The main purpose is to provide tools capable of decoding as much information as possible the easiest way possible.
