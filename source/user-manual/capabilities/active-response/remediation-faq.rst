.. _remediation-faq:

FAQ
===

#. `Can I use a custom script for active responses?`_
#. `Can I configure active responses for only one host?`_
#. `Can an active response remove the action after a period of time?`_

Can I use a custom script for active responses?
-----------------------------------------------
Yes. You can create your own script and configure a command and active response to refer to it.

Can I configure active responses for only one host?
---------------------------------------------------
Yes, using the location option. More information: :ref:`Active Response options <reference_ossec_active_response>`

Can an active response remove the action after a period of time?
----------------------------------------------------------------
Yes, using the ``<timeout_allowed>`` tag on the command and the ``<timeout>`` tag on the active response. More information: :ref:`Example <remediation-examples>`
