.. Copyright (C) 2021 Wazuh, Inc.

.. _remediation-faq:

FAQ
===

#. `Can I configure active responses for only one host?`_
#. `Can an active response remove the action after a period of time?`_

Can I configure active responses for only one host?
---------------------------------------------------
Yes, using the location option. More information: :ref:`Active Response options <reference_ossec_active_response_manager>`

Can an active response remove the action after a period of time?
----------------------------------------------------------------
Yes, using the ``<timeout_allowed>`` tag on the command and the ``<timeout>`` tag on the active response. More information: :ref:`Example <remediation-examples>`
