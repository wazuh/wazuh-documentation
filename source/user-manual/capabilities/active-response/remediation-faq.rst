.. Copyright (C) 2022 Wazuh, Inc.

.. _remediation-faq:

FAQ
===

#. `What's new in Active Response?`_
#. `Will active response continue working after upgrading to Wazuh v4.2.0?`_
#. `Will the active response alerts continue to be the same?`_
#. `Can I share custom Active Response scripts using centralized configuration?`_
#. `Can I configure active responses for only one host?`_ 
#. `Can an active response remove the action after a period of time?`_

What's new in Active Response?
------------------------------

Starting Wazuh v4.2.0, the active response capability provides the Wazuh agent with the complete alert information in JSON format via STDIN. This improvement removes the previous limitation to only send specific fields. This change increases the scope of the capability by easily allowing custom active responses to be triggered by any alert regardless of the format of the original event.

The default Active Response scripts are all adapted to benefit from this capability.


Will active response continue working after upgrading to Wazuh v4.2.0?
----------------------------------------------------------------------
For Wazuh agents with a version older than 4.2.0 active responses will continue working normally.

For Wazuh agents version v4.2.0 or higher some changes may be necessary. The default commands should be edited to remove the ``expect`` field. For Linux servers, the ``.sh`` should also be removed and, for Windows servers, you need to change the  ``.cmd`` script extension to ``.exe``. There is no need to change the default active response scripts as they are automatically replaced with the new ones during the agent upgrade.

.. code-block:: console
   :emphasize-lines: 3, 9, 10

   <command>
     <name>win_route-null</name>
     <executable>route-null.exe</executable>
     <timeout_allowed>yes</timeout_allowed>
   </command>

   <command>
     <name>win_route-null-legacy</name>
     <executable>route-null.cmd</executable>
     <expect>srcip</expect>
     <timeout_allowed>yes</timeout_allowed>
   </command>


In environments with both older and newer agent versions, the command configuration should be duplicated to include both scripts.

.. code-block:: console
   :emphasize-lines: 3, 9, 10

   <command>
     <name>firewall-drop</name>
     <executable>firewall-drop</executable>
     <timeout_allowed>yes</timeout_allowed>
   </command>

   <command>
     <name>firewall-drop-legacy</name>
     <executable>firewall-drop.sh</executable>
     <expect>srcip</expect>
     <timeout_allowed>yes</timeout_allowed>
   </command>

   <active-response>
     <command>firewall-drop</command>
     <location>local</location>
     <rules_id>5712</rules_id>
     <timeout>1800</timeout>
   </active-response>

   <active-response>
     <command>firewall-drop-legacy</command>
     <location>local</location>
     <rules_id>5712</rules_id>
     <timeout>1800</timeout>
   </active-response>


The custom active response executables must be able to read JSON input from STDIN, and the command's configuration no longer needs to specify a specific ``expect`` field. For more information, see :ref:`custom active response <custom-active-response>`.

Will the active response alerts continue to be the same?
--------------------------------------------------------

No. New rules are included for the new active response capability, you can check them under the `active response rules <https://github.com/wazuh/wazuh/blob/4.2/ruleset/rules/0015-ossec_rules.xml#L341>`_ .
Alerts generated on older agents to version 4.2.0 remain the same while newer agents now have new alert IDs. 
For example, rule 601 "Host Blocked by firewall-drop Active Response" is now rule 651 for new agents.
If you have email notifications, rules, and integrations set with the old active response rules, make sure to include the new ones.


Can I share custom Active Response scripts using centralized configuration?
---------------------------------------------------------------------------
No. For security reasons, the custom active response scripts should be placed individually in each agent under ``/var/ossec/active-response/bin`` in Linux servers and ``C:\Program Files\ossec-agent\active-response\bin`` in Windows servers.

Can I configure active responses for only one host?
---------------------------------------------------
Yes, using the location option. More information: :ref:`Active Response options <reference_ossec_active_response_manager>`


Can an active response remove the action after a period of time?
----------------------------------------------------------------
Yes, using the ``<timeout_allowed>`` tag on the command and the ``<timeout>`` tag on the active response. More information: :ref:`Example <remediation-examples>`
