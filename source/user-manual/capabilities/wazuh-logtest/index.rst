.. Copyright (C) 2020 Wazuh, Inc.

.. _manual_wazuh_logtest:

Wazuh Logtest
=============

.. versionadded:: 4.0.0

The Wazuh-Logtest whole solution incorporates from version 4.0 was designed to replace Ossec-Logtest tool.
This solution that allows to test and verify rules locally and remotely is part of the analysisd daemon and they share the same rules engine.


Wazuh-Logtest allows test rules and decoders:
 
 * Both locally and remotely from Wazuh App for Kibana.
 * Both locally and remotely from Wazuh API
 * Locally from Wazuh-Logtest binary in the Manager


.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        logtest-configuration
        logtest-faq