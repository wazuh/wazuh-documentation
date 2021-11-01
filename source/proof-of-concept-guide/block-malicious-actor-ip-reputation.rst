.. _poc_block_actor_IP_reputation:

Blocking a malicious actor - IP Reputation
==========================================

Identify the monitored Windows endpoint IP address as a bad reputation one. Log in to this Windows endpoint as the attacker and try connecting to the victim's Apache server.


Prerequesites
-------------

- You need an Apache server running on the monitored RHEL 7 agent system.

- Configure the Wazuh RHEL 7 agent host to monitor the Apache access logs in the ``/var/ossec/etc/ossec.conf`` configuration file.

    .. code-block:: XML

        <localfile>
        <log_format>apache</log_format>
        <location>/var/log/httpd/access_log</location>
        </localfile>

Configuration
-------------

Configure your environment as follows to test the POC.

#. Download the Alienvault IP reputation database to your Wazuh manager endpoint.

    .. code-block:: console

        # wget https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/alienvault_reputation.ipset -O /var/ossec/etc/lists/alienvault_reputation.ipset

#. Run the following command at the Wazuh manager endpoint (the attacker) replacing ``<your_windows_ip_address>`` with the monitored Windows endpoint's IP address.

    .. code-block:: console

        # echo "<your_windows_ip_address>" >> /var/ossec/etc/lists/alienvault_reputation.ipset

#. Download the script to convert from the `ipset` format to the `cdb` list format.

    .. code-block:: console

        # wget https://wazuh.com/resources/iplist-to-cdblist.py -O /tmp/iplist-to-cdblist.py

#. Convert the `alienvault_reputation.ipset` file to a `.cdb` format using the previously downloaded script.

    .. code-block:: console

        # python /tmp/iplist-to-cdblist.py /var/ossec/etc/lists/alienvault_reputation.ipset /var/ossec/etc/lists/blacklist-alienvault

#. Optionally, remove the `alienvault_reputation.ipset` file and the `iplist-to-cdblist.py` script as they are no longer needed.

    .. code-block:: console

        # rm -rf /var/ossec/etc/lists/alienvault_reputation.ipset
        # rm -rf /var/ossec/etc/lists/iplist-to-cdblist.py

#. Assign the right permissions and owner to the generated file.

    .. code-block:: console

        # chown ossec:ossec /var/ossec/etc/lists/blacklist-alienvault
        # chmod 660 /var/ossec/etc/lists/blacklist-alienvault

#. Add a custom rule to trigger the active response. This can be done in the ``/var/ossec/etc/rules/local_rules.xml`` file at the Wazuh manager endpoint.

    .. code-block:: XML

        <group name="attack,">
        <rule id="100100" level="10">
            <if_group>web|attack|attacks</if_group>
            <list field="srcip" lookup="address_match_key">etc/lists/blacklist-alienvault</list>
            <description>IP address found in AlienVault reputation database.</description>
        </rule>
        </group>
        

#. Add the appropriate active response settings to the  ``ruleset`` section of the  ``/var/ossec/etc/ossec.conf`` file at the Wazuh manager endpoint.

    .. code-block:: XML

        <ossec_config>
            <ruleset>
                <!-- Default ruleset -->
                <decoder_dir>ruleset/decoders</decoder_dir>
                <rule_dir>ruleset/rules</rule_dir>
                <rule_exclude>0215-policy_rules.xml</rule_exclude>
                <list>etc/lists/audit-keys</list>
                <list>etc/lists/blacklist-alienvault</list>
                <!-- User-defined ruleset -->
                <decoder_dir>etc/decoders</decoder_dir>
                <rule_dir>etc/rules</rule_dir>
            </ruleset>

            <command>
                <name>firewall-drop</name>
                <executable>firewall-drop</executable>
                <timeout_allowed>yes</timeout_allowed>
            </command>

            <active-response>
                <command>firewall-drop</command>
                <location>local</location>
                <rules_id>100100</rules_id>
                <timeout>60</timeout>
            </active-response>
        </ossec_config>

#. Restart the Wazuh Manager.

    .. code-block:: console

        # systemctl restart wazuh-manager


Steps to generate the alerts
----------------------------

#. Log in to the attacker's system (the monitored Windows endpoint) and connect to the victim's (the Apache server in the monitored RHEL7 endpoint) from a web browser. The custom firewall rule will temporarily block any connection from the attacker system for 60 seconds.

Alerts
------

Related alerts can be found with:

* ``rule.id:(601 OR 100100)``

Affected endpoints
------------------

* RHEL 7 agent host
