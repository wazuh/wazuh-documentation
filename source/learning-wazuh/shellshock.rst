.. Copyright (C) 2018 Wazuh, Inc.

.. _learning_wazuh_shellshock:

Detect and react to a Shellshock attack
=======================================

Shellshock represent a family of vulnerabilities disclosed in late 2014 involving the Linux Bash shell.  They made it
possible to inject shell commands via maliciously crafted web requests sent to Linux web servers.  The pattern in such
web requests is quite distinctive, and any instance of your servers being probed with Shellshock requests are fairly
strong indicators of malicious probing worthy of automated countermeasures.

In this lab you will use linux-agent to send a Shellshock probe to elastic-server.  After looking over the alert
that is produced and the rule that produced it, you will then set up and test several active response scenarios in which
the attacker (linux-agent) will be automatically firewalled off from the Linux lab systems and null routed by the Windows lab
system in response to this malicious probe being directed at elastic-server.

Confirm Wazuh agent on elastic-server monitors the Nginx logs
-------------------------------------------------------------

The Nginx **access.log** and **error.log** file paths should be monitored by default by the Wazuh agent.
Confirm that these <localfile> sections are indeed present in /var/ossec/etc/ossec.conf:

    .. code-block:: xml

        <localfile>
            <log_format>apache</log_format>
            <location>/var/log/nginx/access.log</location>
        </localfile>

        <localfile>
            <log_format>apache</log_format>
            <location>/var/log/nginx/error.log</location>
        </localfile>

Make linux-agent send a Shellshock probe to elastic-server and find the resulting alert
---------------------------------------------------------------------------------------

Substitute the Elastic IP assigned to your Elastic Server instance, for **ES_SERVER_EIP**. Notice the maliciously crafted
User-Agent header to be sent, including injected shell commands.

    .. code-block:: console

        # curl --insecure https://ES_SERVER_EIP -H "User-Agent: () { :; }; /bin/cat /etc/passwd"

Search Kibana for **rule.id:30412** (the Shellshock rule).  You should find a record like this:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/shellshock.png                                   |
    |     :title: flood                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

Look over the rule that detected the probe:

    .. code-block:: xml

        <rule id="30412" level="6">
            <if_sid>31101</if_sid>
            <regex>"\(\)\s*{\s*:;\s*}\s*;</regex>
            <description>Apache: Shellshock attack attempt</description>
            <info type="cve">CVE-2014-6271</info>
            <info type="link">https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271</info>
            <group>attack,pci_dss_11.4,</group>
        </rule>

.. note::
    One of the benefits of including HIDS detection of web attacks in your security strategy is that
    malicious traffic over https is not hidden from a system like Wazuh because it is watching the web
    server logs rather than the encrypted packets of https transmissions.

Set up active response (AR) countermeasures to Shellshock probes
----------------------------------------------------------------

The Wazuh active response facility allows scripted actions to be taken in response to specific patterns of
Wazuh rule matches.  By default, AR is enabled on all agents and all standard AR commands are defined in ossec.conf on the Wazuh
manager, but no actual criteria for calling the AR commands is included.  No AR commands will actually be
triggered until further configuration is performed on the Wazuh manager.

For the purpose of automated blocking, here is probably the most popular command for Linux blocking (by iptables firewall)
and Windows blocking (by null routing / blackholing), respectively:

    .. code-block:: xml

        <command>
            <name>firewall-drop</name>
            <executable>firewall-drop.sh</executable>
            <expect>srcip</expect>
            <timeout_allowed>yes</timeout_allowed>
        </command>

    .. code-block:: xml

        <command>
            <name>win_route-null</name>
            <executable>route-null.cmd</executable>
            <expect>srcip</expect>
            <timeout_allowed>yes</timeout_allowed>
        </command>

Each command has a descriptive <name> that is for referring to in <active-response> sections.  The actual
script to be called is defined by <executable>.  The <expect> value specifies what log field (if any)
must be present for the command to actually run (like srcip or username).  Lastly, if <timeout_allowed> is
set to **yes**, then the command is considered stateful and can be reversed after an amount of time
specified in a specific <active-response> section (see <timeout>).  For more details about configuring
active response, see the Wazuh user manual.


**AR Scenario 1 - Make victim block attacker with iptables.**
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

In ``/var/ossec/etc/ossec.conf`` on Wazuh manager, replace this:

    .. code-block:: xml

        <!--
        <active-response>
        active-response options here
        </active-response>
        -->

with this:

    .. code-block:: xml

        <active-response>
            <disabled>no</disabled>
            <command>firewall-drop</command>
            <location>local</location>
            <rules_id>30412</rules_id>
            <timeout>300</timeout>
        </active-response>

and then restart Wazuh manager:

    .. code-block:: console

        # ossec-control restart

Run the same curl probe just like last time, remembering to substitute for ES_SERVER_EIP:

    .. code-block:: console

        # curl --insecure https://ES_SERVER_EIP -H "User-Agent: () { :; }; /bin/cat /etc/passwd"

You will receive several lines of html in reply.  Now repeat the same curl command.  This time the command seems to hang,
because elastic-server has added linux-agent to its firewall's drop list.  Confirm this with an iptables
command on elastic-server.

    .. code-block:: console

        # iptables --list -n

        Chain INPUT (policy ACCEPT)
        target     prot opt source               destination
        DROP       all  --  54.157.87.167        0.0.0.0/0

        Chain FORWARD (policy ACCEPT)
        target     prot opt source               destination
        DROP       all  --  54.157.87.167        0.0.0.0/0

        Chain OUTPUT (policy ACCEPT)
        target     prot opt source               destination

Wait at least 5 minutes, and then on elastic-server, look at the content of its local AR log.  By now the stateful firewall-drop
command will have timed out and been reversed.  This is why you will see an "add" and a "delete" record for this event 5 minutes apart.

    .. code-block:: console

        # cat /var/ossec/logs/active-responses.log

        Sat Feb  3 21:24:43 UTC 2018 /var/ossec/active-response/bin/firewall-drop.sh add - 54.157.87.167 1517693083.46213349 30412
        Sat Feb  3 21:29:44 UTC 2018 /var/ossec/active-response/bin/firewall-drop.sh delete - 54.157.87.167 1517693083.46213349 30412

Observe that elastic-server is no longer blocking the offending linux-agent, with an iptables command on elastic-server:

    .. code-block:: console

        # iptables --list -n

        Chain INPUT (policy ACCEPT)
        target     prot opt source               destination

        Chain FORWARD (policy ACCEPT)
        target     prot opt source               destination

        Chain OUTPUT (policy ACCEPT)
        target     prot opt source               destination


**AR Scenario 2 - Make all Linux lab systems block attacker even if they were not the target of the attack.**
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

In the newly-added <active-response> section in ossec.conf on wazuh-server, change the <location> value from **local** to **all** so that
all Linux Wazuh agents and the Wazuh manager will block the attacker even when only one of them is targeted.

.. error::
    There is a bug in Wazuh AR causing Wazuh managers themselves to not execute an AR commands when the AR <location> is
    set to **all**, leaving only the agents running the command.  For now, work around this by changing the <location> of the existing
    <active-response> section from **all** to **local** and then create a duplicate <active-response> section with a <location> of
    **server**.  The resulting configuration should look like this:

    .. code-block:: xml

        <active-response>
            <disabled>no</disabled>
            <command>firewall-drop</command>
            <location>local</location>
            <rules_id>30412</rules_id>
            <timeout>300</timeout>
        </active-response>

        <active-response>
            <disabled>no</disabled>
            <command>firewall-drop</command>
            <location>server</location>
            <rules_id>30412</rules_id>
            <timeout>300</timeout>
        </active-response>

Run the same malicious curl probe from linux-agent as before, and then using the same iptables command as before, confirm
on both elastic-server and wazuh-manager that both Linux systems are blocking the linux-agent attacker.


**AR Scenario 3 - Make windows-agent null route linux-agent when linux-agent probes elastic-server.**
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Add an additional AR section to ossec.conf on wazuh-manager:

    .. code-block:: xml

        <active-response>
            <disabled>no</disabled>
            <command>win_route-null</command>
            <location>all</location>
            <rules_id>30412</rules_id>
            <timeout>300</timeout>
        </active-response>

The Windows-specific **win_route-null** AR script creates a persistent null route on Windows agent systems, preventing them
from responding to any packets from the attacker.  Note that packets are still received; only the replies are dropped.

Restart the manager:

    .. code-block:: console

        ossec-control restart

Run the same probe again from linux-agent.  Observe that the output of the Windows command line "route print /4" now shows a null route for the Elastic IP of linux-agent.  It will be in the "Persistent Routes:" section of the output.

    .. code-block:: console

            ===========================================================================
            Persistent Routes:
            Network Address          Netmask  Gateway Address  Metric
            169.254.169.254  255.255.255.255       172.30.0.1      25
            169.254.169.250  255.255.255.255       172.30.0.1      25
            169.254.169.251  255.255.255.255       172.30.0.1      25
              54.157.87.167  255.255.255.255      172.30.0.40       1
            ===========================================================================


**Use Kibana to review active response actions taken on all agents during this lab.**
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Search Kibana for "active_response" over a large enough time window to encompass this lab.  Observe firewall blocks and null routes
being repeatedly applied and removed across all agents.

.. error::
    There is an error specifically related to AR on Windows agents.  The intended behavior when the Wazuh agent is restarted on
    a given system, is to cancel any stateful active responses that have not yet timed out.  This works on Linux systems but
    restarting the Wazuh agent on Windows systems while an active response null routing block is in place, has the undesirable
    effect of making the block permanent such that not even rebooting the Windows system will clear it out.
    In that case it it necessary to clear the orphaned null route with a "route delete N.N.N.N" command where N.N.N.N is the
    null routed IP.

We hope you enjoyed getting a taste of the Wazuh active response facility.  While blocking an attacking IP is probably the most
popular use made of Wazuh AR, it is actually far more broadly useful than that.  In addition to countermeasures taken against
attacking IPs or targeted account names, AR can also be used to take any kind of custom action in response to any kind of rule
firing.

- **Custom alerting**: Collect additional context and send a detailed custom email alert about a specific situation.
- **Recovery actions**: Respond to certain error logs with automated action to fix the problem.
