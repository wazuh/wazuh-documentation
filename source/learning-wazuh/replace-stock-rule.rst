.. Copyright (C) 2019 Wazuh, Inc.

.. _learning_wazuh_replace_stock_rule:

Change the rules
================

The `Wazuh Ruleset <https://github.com/wazuh/wazuh-ruleset>`_ is maintained by Wazuh, Inc.
and is contributed to by the Wazuh community.  These stock rules are located in various files 
in ``/var/ossec/ruleset/rules/`` on the Wazuh manager and should not be edited in that location
because they are overwritten when you upgrade Wazuh manager or perform a Wazuh Ruleset update.

Custom changes to the ruleset must be done within files in the  ``/var/ossec/etc/rules/`` folder.
In order to change a default rule, then the ``overwrite="yes"`` option must be used when declaring the rule.

In this lab you will raise the severity level of a specific rule in the Wazuh Ruleset.
This can be achieved using the Web Interface or directly editing the files on the Wazuh Manager.

Using the Kibana Wazuh App
--------------------------
1. Open the Wazuh app in Kibana, go into the Management Tab and select the Ruleset
    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/rules-1.png                                      |
    |     :title: Management                                                                        |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

2. Select **Manage rules files** and search for **ssh**, then click on the eye icon next to 
   **0095-sshd_rules.xml** to view the contents of that file.
    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/rules-2.png                                      |
    |     :title: Selecting 0095-sshd_rules.xml                                                     |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

3. Scroll down to rule ``5706`` and copy the text starting from where the ``<rule`` tag is opened until 
   it is closed ``</rule>``:

    .. code-block:: xml

        <rule id="5706" level="6">
          <if_sid>5700</if_sid>
          <match>Did not receive identification string from</match>
          <description>sshd: insecure connection attempt (scan).</description>
          <group>recon,pci_dss_11.4,gpg13_4.12,gdpr_IV_35.7.d,nist_800_53_SI.4,</group>
        </rule>

4. Click on **Close**, then toggle **Editable files** and click on the pencil icon next to ``local_rules.xml``
    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/rules-3.png                                      |
    |     :title: Selecting local_rules.xml                                                         |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

Using the Command Line Interface
--------------------------------
1. Log in to the *wazuh-manager*.

2. Copy existing rule 5706 from /var/ossec/ruleset/rules/0095-sshd_rules.xml:

    .. code-block:: xml

        <rule id="5706" level="6">
          <if_sid>5700</if_sid>
          <match>Did not receive identification string from</match>
          <description>sshd: insecure connection attempt (scan).</description>
          <group>recon,pci_dss_11.4,gpg13_4.12,gdpr_IV_35.7.d,nist_800_53_SI.4,</group>
        </rule>

3. Paste it into ``/var/ossec/etc/rules/local_rules.xml``.  Make sure to insert it above the closing 
   </group> tag, as all rules must be located inside of a <group> section.

4. Change the level from "6" to "7" in your revised version of the rule.

5. Add the tag **overwrite="yes"** to the rule so that Wazuh knows you are replacing an already defined rule.  The first line should now look like this:

    .. code-block:: xml

        <rule id="5706" level="7" overwrite="yes">

6. You could customize anything about the rule as long as you keep the rule id the same and include the *overwrite* tag.  If you change the rule id then the original rule will not be overwritten and it may interfere with your customized version.  If you leave the rule id the same but forget to add the overwrite tag, then Wazuh manager will fail the next time it is restarted and throw an error about a duplicate rule id.

7. Save your changes to local_rules.xml.

8. Run ossec-logtest to test your customized rule and paste in this event that should trigger it:

    .. code-block:: console

        Jan 25 17:27:36 linux-agent sshd[7642]: Did not receive identification string from 138.68.149.171 port 55640

9. Observe your customized alert level near the end of the output:

    .. code-block:: xml

        **Phase 3: Completed filtering (rules).
            Rule id: '5706'
            Level: '7'
            Description: 'sshd: insecure connection attempt (scan).'
        **Alert to be generated.

.. note::
    The Wazuh manager only reads in the rules when started or restarted, so any real events like above would not be affected
    by your customized rule until you restart Wazuh manager.  The ossec-logtest tool does not require Wazuh manager to be
    restarted to notice your latest rule changes, which provides you with a convenient way to test your rule changes before
    making them take effect on real events.
