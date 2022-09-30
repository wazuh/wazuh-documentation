.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Get answers to the most frequently asked questions about Wazuh Agentless monitoring in this FAQ section of the Wazuh documentation.

.. _agentless-faq:

FAQ
===

#. `How can I collect logs via syslog using agentless?`_
#. `If I add an agentless device will it show as an agent?`_
#. `Is it possible to monitor the output of a command on a remote device?`_
#. `Can I monitor directories on a remote system?`_
#. `How can I remove the Agentless monitoring configuration?`_

How can I collect logs via syslog using agentless?
--------------------------------------------------

The agentless capability allows you to monitor devices or systems with no agent via SSH, by providing the capability to run commands on the device. Wazuh includes several built-in commands that allow you to detect any output, difference between outputs, and verify the integrity of files in the agentless device.

To collect logs you can configure your device to forward logs using syslog and configure Wazuh to receive them using :ref:`remote syslog <remote_syslog>`. 

If I add an agentless device will it show as an agent?
------------------------------------------------------

Agentless devices do not appear as individual agents themselves, their logs are registered with the manager agent name and ``ID 000``.  Agentless devices don't affect the total agent count. 

You may filter agentless logs by searching for ``location:agentless`` and each specific host can be identified by the ``agentless.host`` field.

Is it possible to monitor the output of a command on a remote device?
---------------------------------------------------------------------
Yes, using the ``ssh_generic_diff`` option: :ref:`example <agentless-examples>`.

Can I monitor directories on a remote system?
---------------------------------------------
Yes, using either the ``ssh_integrity_check_bsd`` or ``ssh_integrity_check_linux`` options.

How can I remove the Agentless monitoring configuration?
--------------------------------------------------------
To remove your agentless configuration and passwords you have to perform the following steps:

#. Remove the agentless configuration from your ``manager.conf`` file.

#. Remove the file ``.passlist`` located at ``/var/ossec/agentless/.passlist``.

#. Restart your Wazuh manager to apply the changes.

