.. Copyright (C) 2022 Wazuh, Inc.

.. _learning_wazuh_rdp_brute_force:

Detect an RDP brute force attack
================================

Here you will wage a small RDP brute force attack against your Windows agent instance. You will see how Wazuh detects and alerts on each login failure, and how a higher severity
alert is produced when enough login failures are seen.

Perform the attack
------------------

Using a Windows Remote Desktop client, attempt to log in as user "george" to your Windows agent instance eight times in a fairly small time window.


See the resulting alerts in the Wazuh dashboard
-----------------------------------------------


#. On the Wazuh dashboard, go to **Wazuh** > **Modules** > **Security events** and search for "george".

#. You can personalize how to visualize the alerts. You can add fields like `data.win.eventdata.targetUserName` and `data.win.eventdata.ipAddress` by searching for them on the left column and clicking on the add button. 

#. Inspect the events which will look similar to this:

   .. thumbnail:: ../images/learning-wazuh/labs/win-brute.png
      :align: center
      :width: 80%


#. Notice how the lower level "Logon failure - Unknown user or bad password." alert is triggered several times, followed by the higher level "Multiple Windows Logon Failures" alert. This process may repeat itself depending on the total number of logon failures seen.



Where could things proceed from here?
-------------------------------------

The generation of the "Multiple Windows Logon Failures" does not have to be the end of the story for this log event. Other things that could additionally or alternatively take place might be:

#. An email, Slack, or PagerDuty message could be generated about this alert.

#. A high severity local rule of your own making, child of rule 60204, could fire if the attacked account name specifically matches your secret Windows admin account name.

#. An active response could be triggered causing the Windows agent to null-route the attacking IP address.

This concludes the RDP brute force attack lab. We hope you enjoyed it!
