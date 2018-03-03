.. _learning_wazuh_rdp_brute_force:

Detect an RDP brute force attack
================================

Here you will wage a small RDP brute force attack against your Windows Agent instance.  You will see how Wazuh detects and 
alerts on each login failure, and how a higher severity alert is produced when enough login failures are seen.  Lastly you 
will take a closer look at the decoders and rules involved in the detection of your "attack".

Perform the attack
------------------

Using a Windows Remote Desktop client, attempt to log in as user "george" to the Elastic IP assigned to your Windows Agent instance six times in a fairly small time window.  


See the resulting alerts in Kibana
----------------------------------

1. Search Kibana for "george".  

2. Select the following fields for display:

    - rule.description
    - rule.id
    - data.account_name
    - data.srcip

3. Inspect the events which will look something like this:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/win-brute.png                                    |
    |     :title: flood                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

4. Notice how first the lower level "Windows: Logon Failure" alert is triggered several times, followed by the higher level "Multiple Windows Logon Failures" alert.  This process may repeat itself depending on the total number of logon failures seen.


Hold your breath for a deep dive!
---------------------------------

Let's take a thorough look at how this log event is being decoded and what leads Wazuh to the final conclusion that brute force activity is occurring. 

1. In Kibana, copy the complete contents of the full_log field for one of the Windows logon failure events.

2. In an ssh session on wazuh-server, run ossec-logtest with high verbosity to get a maximum picture of how this event is being decoded and analyzed.

    .. code-block:: console

        # ossec-logtest -v

3. Paste your copied log event into ossec-logstash and hit <Enter>.  Repeat this process several times, until in phase 3 the rule that fires is "Multiple Windows Logon Failures."

4. Scroll back up to phase 1 (the pre-decoding phase).  Notice how the full Windows Event Log entry is broken into four fields like this:

    - timestamp: '2018 Feb 03 14:21:24'
    - hostname: 'wazuh-server'
    - program_name: 'WinEvtLog'
    - log: 'Security: AUDIT_FAILURE(4625): Microsoft-Windows-Security-Auditing: (no user)..................."

    |

    .. note::
        The first step that Wazuh takes in processing an incoming log record is to pre-decode it.  This breaks down the record in a 
        very basic way based on Wazuh's knowledge of where it was acquired, like from a syslog file or a Windows Event Log.  There are
        no decoder files representing how this is done; it is all done directly in the Wazuh code.

    .. warning:: 
        Windows events and certain other log types do not have the local computer name as a consistent part of the log header, and so
        the hostname cannot be determined during the pre-decoding phase.  When this occurs, ossec-logtest will simply report the 
        hostname in phase 1 as the hostname of the Wazuh Server itself.  It is then the job of decoders in phase 2 to find 
        the correct hostname from deeper within the log record.

5. Look over the phase 2 output:

    .. code-block:: console

        **Phase 2: Completed decoding.
            decoder: 'windows'
            type: 'Security'
            status: 'AUDIT_FAILURE'
            id: '4625'
            extra_data: 'Microsoft-Windows-Security-Auditing'
            dstuser: '(no user)'
            system_name: 'EC2AMAZ-EKMKS8I'
            security_id: 'S-1-0-0'
            account_name: 'george'
            account_domain: 'MicrosoftAccount'
            logon_type: '3'
            srcip: '208.103.56.41'

6. In phase 2, decoders from the Wazuh Ruleset plus potentially local decoders are drawn upon to further classify and parse fields out of this event. Look over the decoders relevant to this event from /var/ossec/ruleset/decoders/0380-windows_decoders.xml and try to understand them.  They are:

    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    | The top level Windows decoder uses the program_name extracted in pre-decoding as criteria and sets <type> for rules to refer to.                |
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows">                                                                                                                        |
    |  <type>windows</type>                                                                                                                           |
    |  <program_name>^WinEvtLog</program_name>                                                                                                        |
    | </decoder>                                                                                                                                      |
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    | Multiple child decoders work together to extract all the needed fields                                                                          |
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows_fields">                                                                                                                 |
    |  <type>windows</type>                                                                                                                           |
    |  <parent>windows</parent>                                                                                                                       |
    |  <prematch>\s</prematch>                                                                                                                        |
    |  <regex offset="after_parent">^(\.+): (\w+)\((\d+)\): (\.+): </regex>                                                                           |
    |  <regex>(\.+): \.+: (\S+): </regex>                                                                                                             |
    |  <order>type, status, id, extra_data, user, system_name</order>                                                                                 |
    |  <fts>name, location, user, system_name</fts>                                                                                                   |
    | </decoder>                                                                                                                                      |
    |                                                                                                                                                 |
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows_fields">                                                                                                                 |
    |  <type>windows</type>                                                                                                                           |
    |  <parent>windows</parent>                                                                                                                       |
    |  <regex offset="after_regex">Security ID:\t*\s*(\S\S+)</regex>                                                                                  |
    |  <order>security_id</order>                                                                                                                     |
    | </decoder>                                                                                                                                      |
    |                                                                                                                                                 |
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows_fields">                                                                                                                 | 
    |  <type>windows</type>                                                                                                                           |                                                                            
    |  <parent>windows</parent>                                                                                                                       |
    |  <regex offset="after_regex">Account Name:\t*\s*(\S\S+)</regex>                                                                                 |
    |  <order>account_name</order>                                                                                                                    | 
    | </decoder>                                                                                                                                      |
    |                                                                                                                                                 |
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows_fields">                                                                                                                 | 
    |  <type>windows</type>                                                                                                                           |                                                                            
    |  <parent>windows</parent>                                                                                                                       |
    |  <regex offset="after_regex">Account Domain:\t*\s*(\S\S+)\t*\s*</regex>                                                                         |
    |  <order>account_domain</order>                                                                                                                  | 
    | </decoder>                                                                                                                                      |
    |                                                                                                                                                 |
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows_fields">                                                                                                                 | 
    |  <type>windows</type>                                                                                                                           |                                                                            
    |  <parent>windows</parent>                                                                                                                       |
    |  <regex>Logon Type:\t*\s*(\S+)</regex>                                                                                                          |
    |  <order>logon_type</order>                                                                                                                      | 
    | </decoder>                                                                                                                                      |
    |                                                                                                                                                 |
    |::                                                                                                                                               |
    |                                                                                                                                                 |
    | <decoder name="windows_fields">                                                                                                                 |
    |  <type>windows</type>                                                                                                                           |
    |  <parent>windows</parent>                                                                                                                       |
    |  <regex>Source Network Address:\t*\s*(\S+.\S+.\S+.\S+)|Source Network Address:\t*\s*(\S*:\S*:\S*:\S*:\S*:\S*:\S*:\S*)|[CLIENT: (\S+\d)]</regex> |
    |  <order>srcip</order>                                                                                                                           |
    | </decoder>                                                                                                                                      |
    +-------------------------------------------------------------------------------------------------------------------------------------------------+

7. Read up on the components of the decoders above in the Wazuh User manual. Search for “Decoders Syntax”.

8. After the record has been decoded, it's time to start comparing it to the Wazuh rules.  See the "\*\*Rule debugging" section for that process.

    .. code-block:: console

        Trying rule: 6 - Generic template for all windows rules.
            *Rule 6 matched.
            *Trying child rules.
        Trying rule: 7301 - Grouping of Symantec AV rules from eventlog.
        Trying rule: 18100 - Group of windows rules.
            *Rule 18100 matched.
            *Trying child rules.
        Trying rule: 18101 - Windows informational event.
        Trying rule: 18102 - Windows warning event.
        Trying rule: 18104 - Windows audit success event.
        Trying rule: 184665 - Sysmon - Event 1
        Trying rule: 185000 - Sysmon - Event 2
        Trying rule: 185001 - Sysmon - Event 3
        Trying rule: 185002 - Sysmon - Event 4
        Trying rule: 185003 - Sysmon - Event 5
        Trying rule: 185004 - Sysmon - Event 6
        Trying rule: 185005 - Sysmon - Event 7
        Trying rule: 185006 - Sysmon - Event 8
        Trying rule: 185007 - Sysmon - Event 9
        Trying rule: 185009 - Sysmon - Event 11
        Trying rule: 185013 - Sysmon - Event 15
        Trying rule: 83000 - Windows Defender messages grouped.
        Trying rule: 18103 - Windows error event.
        Trying rule: 18105 - Windows audit failure event.
            *Rule 18105 matched.
            *Trying child rules.
        Trying rule: 18120 - Windows login attempt (ignored). Duplicated.
        Trying rule: 18153 - Multiple Windows audit failure events.
        Trying rule: 18106 - Windows Logon Failure.
            *Rule 18106 matched.
            *Trying child rules.
        Trying rule: 18152 - Multiple Windows Logon Failures.
            *Rule 18152 matched.

    .. caution::
        **Traversing the Wazuh rule heirarchy (Important! Read carefully!)**

        |

        When a rule matches a log record, if it has no children then that is the final rule match.  
        Otherwise, the child rules of that rule are evaluated.  
        Child rules are evaluated in the order of descending severity level with the exception
        that level zero child rules are looked at first.
        Once a child rule matches, none of the other child rules of the same parent will be considered.
        Instead, analysis drops down to the level of checking child rules of the child that just matched.
        This process continues until a rule matches that has no children or no matching children.
        When mulitiple children of the same severity level are involved, they are evaluated in 
        load order (the order the rule files are loaded and the order the rules appear in the rule files).

9. Use the show-wazuh-rule script to carefully examine and understand each rule that matched for this event, like this:  

    .. code-block:: console

        # show-wazuh-rule 18100

        /var/ossec/ruleset/rules/0220-msauth_rules.xml:  <rule id="18100" level="0">
        /var/ossec/ruleset/rules/0220-msauth_rules.xml:    <category>windows</category>
        /var/ossec/ruleset/rules/0220-msauth_rules.xml:    <description>Group of windows rules.</description>
        /var/ossec/ruleset/rules/0220-msauth_rules.xml:  </rule>

10. Read up on the components of each rule in the Wazuh User manual.  Search for "Rules Syntax". 

11. Here are some helpful hints about the rules we see in this lab:

    - Rule 6 is not a real rule, but rather a generic template that only exists within the Wazuh code itself.  You will not find it defined in any rule file.
    - In composite rule 18152, instead of the more common <if_matched_sid>, it uses <if_matched_group> to match the <group> set in rule 18106.  This way a composite rule could watch a whole family of rules rather than just one.
    - The frequency value of **$MS_FREQ** in rule 18152 is a variable defined at the top of the same file where that rule is.

.. note::
    Still holding your breath?  You can breath now.  We are done with the deep-dive.  You made it!

Where could things proceed from here?
-------------------------------------

The generation of the "Multiple Windows Logon Failures" does not have to be the end of the story for this log event.  
Other things that could additionally or alternatively take place might be:

1. An email, Slack, or PagerDuty message could be generated about this alert.

2. A high severity local rule of your own making, child of rule 18152, could fire if the attacked account name specifically matches your secret Windows admin account name.

3. An active response could be triggered causing windows-agent to null-route the attacking IP address.

This concludes the RDP brute force attack lab.  We hope you enjoyed it!
