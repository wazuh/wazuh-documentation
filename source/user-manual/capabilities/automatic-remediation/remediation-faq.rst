.. _remediation-faq:

Faq
===

#. `Can I use a custom script?`_
#. `Can I configure active response to only one host?`_
#. `Can active response remove the action after a time?`_

Can I use a custom script?
--------------------------
Yes. You can create your own script and configure a command and active response to refer to it.

Can I configure active response to only one host?
-------------------------------------------------
Yes, using the location option. More info: :ref:`Active Response options <reference_ossec_active_response>`

Can active response remove the action after a time?
---------------------------------------------------
Yes, using the *timeout_allowed* option on the command and the *timeout* option on the active response. More info: :ref:`Example <remediation-examples>`
