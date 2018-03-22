.. _learning_wazuh_virus_total:

Consult VirusTotal about new and changed files
==============================================

Not only can Wazuh notice when file are created, changed, or deleted, but it can also check the antivirus detection rate of new or replaced 
files by looking up their hash using the VirusTotal public or private API.  In this lab we will sign up for a free VirusTotal account so we
can do lookups using the free public API.  We will then configure syscheck, VirusTotal integration, and a rule to determine 
which FIM events will trigger a VirusTotal check.  Lastly we will download a simulated malware sample and observe the associated FIM and 
VirusTotal detection events in Kibana.


Sign up for a free VirusTotal account and get your API key
----------------------------------------------------------

1. Surf to https://www.virustotal.com

2. Click the "Sign in" link in the upper right.

3. Click "Join the community" in the lower left.

4. Fill out the "Join community for free" form and click **[Join]**.  Note the usage terms and the fact that the free service is rate limited to 4 lookups per minute.  More is possible with a commercial VirusTotal account.

5. Check your email for a message from community@virustotal.com.  Click the link in it to activate your VT account and then click "Sign in" and sign in with the credentials you just set up.

6. Click on the user image icon in the upper right.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vt-user-image-icon.png                           |
    |     :title: image                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

7. Then click on "Settings" and then on "API Key"

8. Copy the API Key that is displayed, as you will need to include it in the configuration of Wazuh's VirusTotal integration.


Create a rule to identify specific FIM events that should trigger VirusTotal lookups
------------------------------------------------------------------------------------

In this lab we will only call VirusTotal about new or changed files in a directory called ``/vt-test``, as described in new rule 100400.  

Append the following to the very end of ``/var/ossec/etc/rules/local_rules.xml`` on wazuh-server:

  .. code-block:: xml

        <group name="syscheck,">
        <rule id="100400" level="7">
            <if_sid>550,551,552,554</if_sid>
            <field name="file">^/vt-test/</field>
            <description>File modified or created in /vt-test directory.</description>
        </rule>
        </group>


Enable and Configure VirusTotal integration on wazuh-server
-----------------------------------------------------------

1. Enable the Wazuh integrations feature with this one-time command

    .. code-block:: console

        # /var/ossec/bin/ossec-control enable integrator

2. In ``ossec.conf`` on wazuh-manager, after the end of the last ``<wodle>`` section, add this new section, substituting your own API key for YOUR-API-KEY below.  Then save and close the file.

    .. code-block:: xml

        <integration>
            <name>virustotal</name>
            <api_key>YOUR-API-KEY</api_key>
            <rule_id>100400</rule_id>
            <alert_format>json</alert_format>
        </integration>


Centralize Linux agent FIM configuration and set it up for this lab
-------------------------------------------------------------------

Instead of making the same ``<syscheck>`` configuration changes on each Linux agent, let's move all that to agent.conf on wazuh-server.

1. On both linux-agent and elastic-server, delete the entire ``<syscheck>`` section from ``ossec.conf``.

2. On wazuh-server, add the following new <syscheck> section within the <agent_config> section of ``/var/ossec/etc/shared/linux/agent.conf``. 

    .. code-block:: xml

        <!-- File integrity monitoring -->
        <syscheck>
            <disabled>no</disabled>
            <frequency>43200</frequency>
            <scan_on_start>yes</scan_on_start>
            <alert_new_files>yes</alert_new_files>
            <directories check_all="yes" realtime="yes">/vt-test</directories>
        </syscheck>

3. On wazuh-server, verify the syntax of our agent.conf change and then restart to apply the changes.

    .. code-block:: console

        # verify-agent-conf
        # ossec-control restart

4. Wait a few moments while both Linux agent systems automatically pick up the change and restart.  They won't actually start real-time scanning the ``/vt-test`` directory since it does not yet exist.


Go get some (simulated) malware!
--------------------------------

Now we will acquire a password-protected zip file containing the benign Eicar antivirus test file which almost all AV engines classify
as malware for AV testing purposes.  Next we unzip our package and see if the malware.exe file that appears is noticed and 
alerted on as malicious according to VirusTotal.

1. First, on linux-agent, create our test directory and restart Wazuh agent to start monitoring the new directory.

    .. code-block:: console

        # mkdir /vt-test
        # ossec-control restart

2. Wait about 2 minutes for the real time FIM scanning engine to initialize on the agent.  Confirm it is ready with this check:

    .. code-block:: console

        # grep "Real time" /var/ossec/logs/ossec.log
        2018/03/17 17:38:48 ossec-syscheckd: INFO: Real time file monitoring engine started.

3. Fetch the "malware" sample onto the agent system, providing the password "infected" when prompted during the unzip step.

    .. code-block:: console

        # wget -O /vt-test/package.zip http://TO-BE-DETERMINED
        # cd /vt-test
        # yum -y install unzip
        # unzip package.zip

4. If you like, repeat steps 1 through 3 above on elastic-server so that you will have FIM and VirusTotal events to see for a couple of different agents.


Look at the results in Kibana
-----------------------------

By now, Wazuh should have noticed the zip file and the unzipped "malware," and both should have been checked against VirusTotal.  Only the
unzipped malware should actually match.

1. Search Kibana for "syscheck OR virustotal" (not in quotes) to see recent FIM and VT lookup events.  Choose fields for columnar display like below.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vt-events.png                                    |
    |     :title: image                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

2. Expand the "File modified or created" event for the ``malware.exe`` file.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vt-newfile.png                                   |
    |     :title: image                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

3. Next expand and examine the details of the the VirusTotal event about ``malware.exe``.

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vt-detect.png                                    |
    |     :title: image                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

4. Notice there is also a VirusTotal event about ``package.zip`` that as expected indicates a non-match: "No records in VirusTotal database".  

.. error::  
    With the free public API, if more than 4 VirusTotal lookups are attempted in the same minute, the extra attempts will be silently 
    rejected without any retries.  No VirusTotal events will appear in Kibana about the rejected lookups.  
    The intention is for a "Public API request rate limit reached" alert to be generated, 
    but no such alerts presently appear with Wazuh 3.2.1.


Food for thought
----------------

Consider how you might use a custom active response to integrate with the API of your edge firewall such that local hosts would be
quarantined from reaching the Internet if they have a specifically defined VirusTotal malware match event.
