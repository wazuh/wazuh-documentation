.. Copyright (C) 2019 Wazuh, Inc.

.. _remediation-faq:

FAQ
===

#. `Can I use a custom script for active responses?`_
#. `Can I configure active responses for only one host?`_
#. `Can an active response remove the action after a period of time?`_

Can I use a custom script for active responses?
-----------------------------------------------
Yes. You can create your own script and configure a command and active response to refer to it. Keep in mind that AR follows a specific arguments syntax when running scripts. The arguments are inserted in this order:

.. code-block:: none

  <SCRIPT-NAME> <ACTION> <USER> <IP> <ALERT-ID> <RULE-ID> <AGENT> <FILENAME>

Some considerations:

* ``<SCRIPT-NAME>`` is the name of the script file that is going to be run.
* ``<ACTION>`` can be *delete* or *add*.
* ``<USER>`` is the user name. It can be *-* if not set.
* ``<IP>`` is the source IP. It can be *-* if not set.
* ``<ALERT-ID>`` is the alert ID (unique for every alert).
* ``<RULE-ID>`` is the rule ID.
* ``<AGENT>`` is the agent ID or hostname.
* ``<FILENAME>`` is the source path file of the log that triggered the alert (if it exists).

Can I configure active responses for only one host?
---------------------------------------------------
Yes, using the location option. More information: :ref:`Active Response options <reference_ossec_active_response>`

Can an active response remove the action after a period of time?
----------------------------------------------------------------
Yes, using the ``<timeout_allowed>`` tag on the command and the ``<timeout>`` tag on the active response. More information: :ref:`Example <remediation-examples>`
