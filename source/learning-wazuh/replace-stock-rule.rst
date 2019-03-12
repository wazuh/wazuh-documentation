.. Copyright (C) 2018 Wazuh, Inc.

.. _learning_wazuh_replace_stock_rule:

Change the rules
================

The `Wazuh Ruleset <https://github.com/wazuh/wazuh-ruleset>`_ is maintained by Wazuh, Inc. and is contributed to by the Wazuh
community.  These stock rules are located in various files in /var/ossec/ruleset/rules/ on the Wazuh Manager and should never
be edited in that location because they are overwritten when you upgrade Wazuh Manager or pull a Wazuh Ruleset update.

To change something about a stock rule, you must copy the rule to /var/ossec/etc/rules/local_rules.xml or elsewhere in that
same directory, where you can then adjust it to suit your requirements. In this new location the rule must be tagged
as an *overwrite* rule so that it is clear the original version of the rule is being replaced.

In this lab you will raise the severity level of a specific rule in the Wazuh Ruleset.

1. Log in to the wazuh-manager.

2. Copy existing rule 5706 from /var/ossec/ruleset/rules/0095-sshd_rules.xml:

    .. code-block:: console

        <rule id="5706" level="6">
            <if_sid>5700</if_sid>
            <match>Did not receive identification string from</match>
            <description>sshd: insecure connection attempt (scan).</description>
            <group>recon,pci_dss_11.4,gpg13_4.12,</group>
        </rule>

3. Paste it into /var/ossec/etc/rules/local_rules.xml.  Make sure to insert it above the closing </group> tag, as all rules must be located inside of a <group> section.

4. Change the level from "6" to "7" in your revised version of the rule.

5. Add the tag **overwrite="yes"** to the rule so that Wazuh knows you are replacing an already defined rule.  The first line should now look like this:

    .. code-block:: console

        <rule id="5706" level="7" overwrite="yes">

6. You could customize anything about the rule as long as you keep the rule id the same and include the *overwrite* tag.  If you change the rule id then the original rule will not be overwritten and it may interfere with your customized version.  If you leave the rule id the same but forget to add the overwrite tag, then Wazuh Manager will fail the next time it is restarted and throw an error about a duplicate rule id.

7. Save your changes to local_rules.xml.

8. Run ossec-logtest to test your customized rule and paste in this event that should trigger it:

    .. code-block:: console

        Jan 25 17:27:36 linux-agent sshd[7642]: Did not receive identification string from 138.68.149.171 port 55640

9. Observe your customized alert level near the end of the output:

    .. code-block:: console

        **Phase 3: Completed filtering (rules).
            Rule id: '5706'
            Level: '7'
            Description: 'sshd: insecure connection attempt (scan).'
        **Alert to be generated.

.. note::
    The Wazuh Manager only reads in the rules when started or restarted, so any real events like above would not be affected
    by your customized rule until you restart Wazuh Manager.  The ossec-logtest tool does not require Wazuh Manager to be
    restarted to notice your latest rule changes, which provides you with a convenient way to test your rule changes before
    making them take effect on real events.
