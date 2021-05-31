.. Copyright (C) 2021 Wazuh, Inc.

.. _agentless-faq:

FAQ
===

#. `Is it possible to monitor the output of a command on a remote device?`_
#. `Can I monitor directories on a remote system?`_
#. `How can I remove the Agentless monitoring configuration?`_

Is it possible to monitor the output of a command on a remote device?
---------------------------------------------------------------------
Yes, using the ``ssh_generic_diff`` option: :ref:`example <agentless-examples>`

Can I monitor directories on a remote system?
---------------------------------------------
Yes, using either the ``ssh_integrity_check_bsd`` or ``ssh_integrity_check_linux`` options.

How can I remove the Agentless monitoring configuration?
---------------------------------------------
To remove your Agentless configuration and passwords you have to perform the following steps:

1. Remove the agentless configuration from your ``ossec.conf`` file.

2. Remove the file ``.passlist`` located at ``/var/ossec/agentless/.passlist``.

3. Restart your Wazuh manager to apply the changes.

