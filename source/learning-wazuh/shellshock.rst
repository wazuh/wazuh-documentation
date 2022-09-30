.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: In this lab, you will send a Shellshock probe to a web server monitored by Wazuh. Check out how the Active Response capability of Wazuh works here. 
  
.. _learning_wazuh_shellshock:

Detect and react to a Shellshock attack
=======================================

Shellshock represents a family of vulnerabilities disclosed in late 2014 involving
the Linux Bash shell.  These vulnerabilities made it possible to inject shell
commands via maliciously crafted web requests sent to Linux web servers.  The
pattern in such web requests is quite distinctive, and any instance of your
servers being probed with Shellshock requests are fairly
strong indicators of malicious probing worthy of automated countermeasures.

In this lab, you will send a Shellshock probe to a web server monitored by Wazuh.
After looking over the alert that is produced and the rule that produced it, you
will then set up and test several active response scenarios in which the attacker
will be automatically firewalled off from the Linux lab systems and null routed
by the Windows lab system in response to this attack.

Install a web server and monitor its logs
-----------------------------------------

#. If you haven't already, install a web server in your Linux agent, for example, `nginx`:

   .. code-block:: console

      # yum -y install epel-release
      # yum -y install nginx
      # systemctl start nginx

#. Ensure that the nginx `access` and `error` logs are collected by Wazuh by having these ``<localfile>`` sections present in the agent ``/var/ossec/etc/ossec.conf`` file:

    .. code-block:: xml

        <wazuh_config>
            <localfile>
                <log_format>apache</log_format>
                <location>/var/log/nginx/access.log</location>
            </localfile>

            <localfile>
                <log_format>apache</log_format>
                <location>/var/log/nginx/error.log</location>
            </localfile>
        </wazuh_config>

#. Restart the Wazuh agent service for this change to take effect:

   .. include:: /_templates/common/restart_agent.rst

   .. note::

      If a webserver (like nginx) is already on a system when the Wazuh agent is installed the ``access.log`` and ``error.log`` files will be monitored by default by the Wazuh agent.


Send a Shellshock probe to the web server and see the resulting alert
---------------------------------------------------------------------

#. For convenience, set up a system variable in the systems where you will run the attack with the address of the web server (this may be itself):

   .. code-block:: console

      # ShellshockTarget="172.30.0.30"


#. Execute the following request to the web server:

   .. code-block:: console

      # curl --insecure $ShellshockTarget -H "User-Agent: () { :; }; /bin/cat /etc/passwd"

   Notice the maliciously crafted User-Agent header to be sent, including injected shell commands.

#. Search the Wazuh dashboard for **rule.id:31168** "Shellshock attack detected".  You should find a record like this:

   .. thumbnail:: ../images/learning-wazuh/labs/shellshock-1.png
      :title: Rule 31168: "Shellshock attack detected"
      :align: center
      :width: 80%

   Look over the rule that detected the probe:

   .. code-block:: xml

      <rule id="31168" level="15">
        <if_sid>31108</if_sid>
        <regex>"\(\)\s*{\s*\w*:;\s*}\s*;|"\(\)\s*{\s*\w*;\s*}\s*;</regex>
        <description>Shellshock attack detected</description>
        <mitre>
          <id>T1068</id>
          <id>T1190</id>
        </mitre>
        <info type="cve">CVE-2014-6271</info>
        <info type="link">https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271</info>
        <group>attack,pci_dss_11.4,gdpr_IV_35.7.d,nist_800_53_SI.4,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>

.. note::
    One of the benefits of including HIDS detection of web attacks in your security strategy is that
    malicious traffic over https is not hidden from a system like Wazuh because it is watching the web
    server logs rather than the encrypted packets of https transmissions.

Set up Active Response (AR) countermeasures to Shellshock probes
----------------------------------------------------------------

The Wazuh Active Response capability allows scripted actions to be taken in
response to specific criteria of Wazuh rules being matched. By default, AR
is enabled on all agents and all standard AR commands are defined in ``manager.conf``
on the Wazuh manager, but no actual criteria for calling the AR commands is
included.  No AR commands will be triggered until further configuration
is performed on the Wazuh manager.

For automated blocking, a very popular command for blocking in
Linux is using the iptables firewall, and in Windows the null routing / blackholing, respectively:

    .. code-block:: xml

        <command>
            <name>firewall-drop</name>
            <executable>firewall-drop</executable>
            <timeout_allowed>yes</timeout_allowed>
        </command>

    .. code-block:: xml

        <command>
            <name>win_route-null</name>
            <executable>route-null.exe</executable>
            <timeout_allowed>yes</timeout_allowed>
        </command>

Each command has a descriptive ``<name>`` by which it will be referred to in the
``<active-response>`` sections.  The actual script to be called is defined by
``<executable>``.  Lastly, if ``<timeout_allowed>`` is set to **yes**, then the
command is considered stateful and can be reversed after an amount of time specified
in a specific ``<active-response>`` section (see :ref:`timeout <reference_ossec_active_response_manager>`).
For more details about configuring active response, see the Wazuh user manual.



AR Scenario 1 - Make victim block attacker with iptables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On your Wazuh manager, add the following configuration in the ``/var/ossec/etc/ossec.conf`` file:

    .. code-block:: xml

        <active-response>
            <disabled>no</disabled>
            <command>firewall-drop</command>
            <location>local</location>
            <rules_id>31168</rules_id>
            <timeout>300</timeout>
        </active-response>

#. Restart the Wazuh manager. 

   .. include:: /_templates/common/restart_manager.rst

#. Run the same curl probe just like last time:

   .. code-block:: console

      # curl --insecure $ShellshockTarget -H "User-Agent: () { :; }; /bin/cat /etc/passwd"

   The command will quickly download the webpage to ``/dev/null``.  Now repeat the same curl command.
   This time the command seems to hang because the agent has added the attacking IP address to its firewall drop list.  If you have used the agent IP address instead of ``localhost`` you may confirm this with an iptables command on the attacked server:

   .. code-block:: console

      # iptables --list -n

   .. code-block:: none
      :class: output

        Chain INPUT (policy ACCEPT)
        target     prot opt source               destination
        DROP       all  --  172.30.0.30          0.0.0.0/0

        Chain FORWARD (policy ACCEPT)
        target     prot opt source               destination
        DROP       all  --  172.30.0.30          0.0.0.0/0

        Chain OUTPUT (policy ACCEPT)
        target     prot opt source               destination

   Wait at least 5 minutes, and then on the attacked server look at the content of its local AR log.  By now the stateful firewall-drop command will have timed out and been reversed.  This is why you will see an "add" and a "delete" record for this event 5 minutes apart.

   .. code-block:: console

      # cat /var/ossec/logs/active-responses.log

   .. code-block:: none
      :class: output
      
      2022/06/17 14:46:27 active-response/bin/firewall-drop: Starting
      2022/06/17 14:46:27 active-response/bin/firewall-drop: {"version":1,"origin":{"name":"node01","module":"wazuh-execd"},"command":"add","parameters":{"extra_args":[],"alert":{"timestamp":"2022-06-17T14:46:27.816+0000","rule":{"level":15,"description":"Shellshock attack detected","id":"31168","mitre":{"id":["T1068","T1190"],"tactic":["Privilege Escalation","Initial Access"],"technique":["Exploitation for Privilege Escalation","Exploit Public-Facing Application"]},"info":"CVE-2014-6271https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271","firedtimes":1,"mail":true,"groups":["web","accesslog","attack"],"pci_dss":["11.4"],"gdpr":["IV_35.7.d"],"nist_800_53":["SI.4"],"tsc":["CC6.1","CC6.8","CC7.2","CC7.3"]},"agent":{"id":"005","name":"linux-agent","ip":"172.30.0.30"},"manager":{"name":"Wazuh"},"id":"1655477187.49701","full_log":"192.168.56.3 - - [17/Jun/2022:14:46:26 +0000] \"GET / HTTP/1.1\" 200 4833 \"-\" \"() { :; }; /bin/cat /etc/passwd\" \"-\"","decoder":{"name":"web-accesslog"},"data":{"protocol":"GET","srcip":"192.168.56.3","id":"200","url":"/"},"location":"/var/log/nginx/access.log"},"program":"active-response/bin/firewall-drop"}}
      2022/06/17 14:46:27 active-response/bin/firewall-drop: {"version":1,"origin":{"name":"firewall-drop","module":"active-response"},"command":"check_keys","parameters":{"keys":["192.168.56.3"]}}
      2022/06/17 14:46:27 active-response/bin/firewall-drop: {"version":1,"origin":{"name":"node01","module":"wazuh-execd"},"command":"continue","parameters":{"extra_args":[],"alert":{"timestamp":"2022-06-17T14:46:27.816+0000","rule":{"level":15,"description":"Shellshock attack detected","id":"31168","mitre":{"id":["T1068","T1190"],"tactic":["Privilege Escalation","Initial Access"],"technique":["Exploitation for Privilege Escalation","Exploit Public-Facing Application"]},"info":"CVE-2014-6271https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271","firedtimes":1,"mail":true,"groups":["web","accesslog","attack"],"pci_dss":["11.4"],"gdpr":["IV_35.7.d"],"nist_800_53":["SI.4"],"tsc":["CC6.1","CC6.8","CC7.2","CC7.3"]},"agent":{"id":"005","name":"linux-agent","ip":"172.30.0.30"},"manager":{"name":"Wazuh"},"id":"1655477187.49701","full_log":"192.168.56.3 - - [17/Jun/2022:14:46:26 +0000] \"GET / HTTP/1.1\" 200 4833 \"-\" \"() { :; }; /bin/cat /etc/passwd\" \"-\"","decoder":{"name":"web-accesslog"},"data":{"protocol":"GET","srcip":"192.168.56.3","id":"200","url":"/"},"location":"/var/log/nginx/access.log"},"program":"active-response/bin/firewall-drop"}}
      2022/06/17 14:46:27 active-response/bin/firewall-drop: Ended
      2022/06/17 14:51:28 active-response/bin/firewall-drop: Starting
      2022/06/17 14:51:28 active-response/bin/firewall-drop: {"version":1,"origin":{"name":"node01","module":"wazuh-execd"},"command":"delete","parameters":{"extra_args":[],"alert":{"timestamp":"2022-06-17T14:46:27.816+0000","rule":{"level":15,"description":"Shellshock attack detected","id":"31168","mitre":{"id":["T1068","T1190"],"tactic":["Privilege Escalation","Initial Access"],"technique":["Exploitation for Privilege Escalation","Exploit Public-Facing Application"]},"info":"CVE-2014-6271https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6271","firedtimes":1,"mail":true,"groups":["web","accesslog","attack"],"pci_dss":["11.4"],"gdpr":["IV_35.7.d"],"nist_800_53":["SI.4"],"tsc":["CC6.1","CC6.8","CC7.2","CC7.3"]},"agent":{"id":"005","name":"linux-agent","ip":"172.30.0.30"},"manager":{"name":"Wazuh"},"id":"1655477187.49701","full_log":"192.168.56.3 - - [17/Jun/2022:14:46:26 +0000] \"GET / HTTP/1.1\" 200 4833 \"-\" \"() { :; }; /bin/cat /etc/passwd\" \"-\"","decoder":{"name":"web-accesslog"},"data":{"protocol":"GET","srcip":"192.168.56.3","id":"200","url":"/"},"location":"/var/log/nginx/access.log"},"program":"active-response/bin/firewall-drop"}}
      2022/06/17 14:51:28 active-response/bin/firewall-drop: Ended
      
      
   Observe that the attacked server is no longer blocking the offending IP address by requesting the webpage again, or by using an iptables command on the attacked server:
      
   .. code-block:: console
      
      # iptables --list -n
      
   .. code-block:: none
      :class: output

        Chain INPUT (policy ACCEPT)
        target     prot opt source               destination

        Chain FORWARD (policy ACCEPT)
        target     prot opt source               destination

        Chain OUTPUT (policy ACCEPT)
        target     prot opt source               destination


AR Scenario 2 - Make all Linux lab systems block attacker even if they were not the target of the attack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

#. In the newly-added ``<active-response>`` section in ``ossec.conf`` on the Wazuh manager, change the ``<location>`` value from `local` to `all` so that all Linux Wazuh agents will block the attacker even when only one of them is targeted.

   .. note::
       The option `all` sends the active response to all agents. If we want it to also run in the manager, we must duplicate the active-response block indicating `server` in the ``location`` field.

   .. code-block:: xml
      :emphasize-lines: 4, 12

      <active-response>
          <disabled>no</disabled>
          <command>firewall-drop</command>
          <location>all</location>
          <rules_id>31168</rules_id>
          <timeout>300</timeout>
      </active-response>    

      <active-response>
          <disabled>no</disabled>
          <command>firewall-drop</command>
          <location>server</location>
          <rules_id>31168</rules_id>
          <timeout>300</timeout>
      </active-response>


#. Restart the Wazuh manager. 

   .. include:: /_templates/common/restart_manager.rst

#. Run the same malicious ``curl`` probe as before, and then confirm that all Linux systems configured are blocking the attacker's IP address.


AR Scenario 3 - Make windows null route the attacker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Add an additional AR section to ``ossec.conf`` on wazuh-manager:

   .. code-block:: xml

      <active-response>
          <disabled>no</disabled>
          <command>win_route-null</command>
          <location>all</location>
          <rules_id>31168</rules_id>
          <timeout>300</timeout>
      </active-response>

   The Windows-specific **win_route-null** AR script creates a persistent null route on Windows agent systems, preventing them from responding to any packets from the attacker.  Note that packets are still received; only the replies are dropped.

#. Restart the Wazuh manager.

   .. include:: /_templates/common/restart_manager.rst

#. Run the same probe again to the web server.  Observe that the output of the Windows command line `route print /4` now shows a null route for the IP address of the attacker.  It will be in the "Persistent Routes:" section of the output.

   .. code-block:: none
      :class: output

       PS C:\Users\Administrator> route print /   
       (...   
       ===========================================================================
       Persistent Routes:
       Network Address          Netmask  Gateway Address  Metric
       169.254.169.254  255.255.255.255       172.30.0.1      25
       169.254.169.250  255.255.255.255       172.30.0.1      25
       169.254.169.251  255.255.255.255       172.30.0.1      25
           172.30.0.30  255.255.255.255      172.30.0.40       1
       ===========================================================================


Use the Wazuh dashboard to review active response actions taken on all agents during this lab
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Search the Wazuh dashboard for "active_response" over a large enough time window to encompass
this lab.  Observe firewall blocks and null routes being repeatedly applied and
removed across all agents.

.. thumbnail:: ../images/learning-wazuh/labs/shellshock-2.png
    :title: Wazuh active response
    :align: center
    :width: 80%


.. note::
    When the Wazuh agent is restarted on a given system, the intended behavior
    to cancel any stateful active responses that have not yet timed out.
    On Windows systems, if the service is restarted externally (i.e. System reboot)
    while an active response null routing block is in place, has the undesirable
    effect of making the block permanent such that it will not be cleared
    automatically.  In that case it it necessary to clear the orphaned null route
    with a `route  delete N.N.N.N` command where N.N.N.N is the null routed IP address.

We hope you enjoyed getting a taste of the Wazuh **Active Response** capability.
While blocking an attacking IP address is probably the most popular use made of Wazuh AR,
it is far more broadly useful than that.  In addition to countermeasures taken
against attacking IP addresses or targeted account names, AR can also be used to take
any kind of custom action in response to any kind of rule firing.

- **Custom alerting**: Collect additional context and send a detailed custom
  email alert about a specific situation.
- **Recovery actions**: Respond to certain error logs with automated action to
  fix the problem.
