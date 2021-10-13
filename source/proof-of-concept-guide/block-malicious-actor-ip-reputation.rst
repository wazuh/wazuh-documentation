.. _poc_block_actor_IP_reputation:

Blocking a malicious actor - IP Reputation
==========================================

Prerequesites
-------------

- Apache server running on the monitored system (Linux RHEL)

- Wazuh agent configured to monitor the Apache access logs:

    .. code-block:: XML

        <localfile>
            <log_format>apache</log_format>
            <location>/var/log/httpd/access_log</location>
        </localfile>

Configuration
-------------

On Wazuh manager (the server):

- Download Alienvault IP reputation database

    .. code-block:: XML

        wget https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/alienvault_reputation.ipset -O /var/ossec/etc/lists/alienvault_reputation.ipset

- Download script to convert from ipset format to cdblist format

    .. code-block:: XML

        wget https://wazuh.com/resources/iplist-to-cdblist.py -O /tmp/iplist-to-cdblist.py

- Add an additional IP (the attacker) to the list. For the test, we will use the Windows endpoint.

    .. code-block:: console

        echo "${replace_by_your_windows_ip_address}" >> /var/ossec/etc/lists/alienvault_reputation.ipset


- Convert the ``.ipset`` to ``.cdb`` using the previously downloaded script

    .. code-block:: python

        python /tmp/iplist-to-cdblist.py /var/ossec/etc/lists/alienvault_reputation.ipset /var/ossec/etc/lists/blacklist-alienvault

- Remove the ``.ipset`` file and the Python script

    .. code-block:: XML

        rm -rf /var/ossec/etc/lists/alienvault_reputation.ipset
        rm -rf /var/ossec/etc/lists/iplist-to-cdblist.py

- Assign the right permissions and owner to the generated file:

    .. code-block:: XML

        chown ossec:ossec /var/ossec/etc/lists/blacklist-alienvault
        chmod 660 /var/ossec/etc/lists/blacklist-alienvault

- Execute ossec binary to generate ``.cdb`` file

    .. code-block:: XML

        /var/ossec/bin/ossec-makelists

- Add a custom rule to trigger the active response. This can be done at ``/var/ossec/etc/rules/local_rules.xml``

    .. code-block:: XML

        <group name="attack,">
        <rule id="100100" level="10">
            <if_group>web|attack|attacks</if_group>
            <list field="srcip" lookup="address_match_key">etc/lists/blacklist-alienvault</list>
            <description>IP address found in AlienVault reputation database.</description>
        </rule>
        </group>
        

- Add configuration to trigger the active response. Modify the ``ruleset`` block in the ``/var/ossec/etc/ossec.conf`` file:     

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

- Restart the Wazuh Manager

.. code-block:: console

    /var/ossec/bin/ossec-control restart


Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Log in the attacker system (the Windows box) and connect to the victim (Linux RHEL) Apache server from a web browser.

- A Linux firewall rule will temporarily block any connection from the attacker system for 60 seconds (using IPtables).

Alerts
^^^^^^

- Related alerts can be found with:
- rule.id:(601 OR 100100)

Affected endpoint
^^^^^^^^^^^^^^^^^

- Linux RHEL