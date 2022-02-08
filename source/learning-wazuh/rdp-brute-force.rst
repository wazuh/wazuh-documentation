.. Copyright (C) 2022 Wazuh, Inc.

.. _learning_wazuh_rdp_brute_force:

Detect an RDP brute force attack
================================

Here you will wage a small RDP brute force attack against your Windows Agent instance.

You will see how Wazuh detects and alerts on each login failure, and how a higher severity
alert is produced when enough login failures are seen.

Lastly you will take a closer look at the decoders and rules involved in the detection of your "attack".

Perform the attack
------------------

Using a Windows Remote Desktop client, attempt to log in as user "*george*" to your Windows Agent instance
eight times in a fairly small time window.


See the resulting alerts in Wazuh dashboard
-------------------------------------------


1. On Wazuh dashboard, go to **[Security events]**, search for "*george*" and then click on **[Discover]** on the top right corner.

2. On ``Discover``, you can personalize how to visualize the alerts. If you look at the menu on the left, click on the button next to ``Available fields``, introduce the field you are looking for in ``Field name`` and click on **[add]**. We will be using the 4 fields stated below.


  - rule.description
  - rule.id
  - data.win.eventdata.targetUserName
  - data.win.eventdata.ipAddress




3. Inspect the events which will look similar to this:

  .. thumbnail:: ../images/learning-wazuh/labs/win-brute.png
    :align: left
    :width: 100%


4. Notice how the lower level "*Windows: Logon Failure*" alert is triggered several times,
   followed by the higher level "Multiple Windows Logon Failures" alert.
   This process may repeat itself depending on the total number of logon failures seen.



Where could things proceed from here?
-------------------------------------

The generation of the "Multiple Windows Logon Failures" does not have to be the end of the story for this log event.
Other things that could additionally or alternatively take place might be:

1. An email, Slack, or PagerDuty message could be generated about this alert.

2. A high severity local rule of your own making, child of rule 60204, could fire if the attacked account name specifically matches your secret Windows admin account name.

3. An active response could be triggered causing windows-agent to null-route the attacking IP address.

This concludes the RDP brute force attack lab.  We hope you enjoyed it!
