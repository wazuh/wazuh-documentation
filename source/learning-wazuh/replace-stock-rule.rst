.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to customize Wazuh rules to suit your needs. The Wazuh ruleset is used to detect attacks, intrusions, malware or application errors, and more.
  
.. _learning_wazuh_replace_stock_rule:

Change the rules
================

The `Wazuh Ruleset <https://github.com/wazuh/wazuh/tree/|WAZUH_CURRENT_MINOR|/ruleset>`_ is maintained by Wazuh and is contributed to by the Wazuh community.  These stock rules are located in various files in ``/var/ossec/ruleset/rules/`` on the Wazuh Manager and should not be edited in that location because they are overwritten when you make an upgrade.

Custom changes to the ruleset must be done within files in the  ``/var/ossec/etc/rules/`` folder. To change a default rule, then the ``overwrite="yes"`` option must be used when declaring the rule.

In this lab, you will raise the severity level of a specific rule in the Wazuh Ruleset. This can be achieved using the web interface or directly editing the files on the Wazuh Manager.

Using the Wazuh dashboard
-------------------------

#. Open the Wazuh dashboard, go into the **Management** Tab and select the **Rules**. 

   .. thumbnail:: ../images/learning-wazuh/labs/rules-1.png
       :title: Management
       :align: center
       :width: 80%


#. Select **Manage rules files** and search for "sshd". Click on the eye icon next to **0095-sshd_rules.xml** to view the contents of that file.

   .. thumbnail:: ../images/learning-wazuh/labs/rules-2.png
       :title: Selecting 0095-sshd_rules.xml
       :align: center
       :width: 80%


#. Scroll down to rule **5760** and copy the text starting from where the ``<rule`` tag is opened until it is closed ``</rule>``:

   .. code-block:: xml
      
      <rule id="5760" level="5">
        <if_sid>5700,5716</if_sid>
        <match>Failed password|Failed keyboard|authentication error</match>
        <description>sshd: authentication failed.</description>
        <mitre>
          <id>T1110.001</id>
          <id>T1021.004</id>
        </mitre>
        <group>authentication_failed,gdpr_IV_35.7.d,gdpr_IV_32.2,gpg13_7.1,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,pci_dss_10.2.4,pci_dss_10.2.5,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>

#. Go back, click **Custom rules** and click on the pencil icon next to ``local_rules.xml``

   .. thumbnail:: ../images/learning-wazuh/labs/rules-3.png
       :title: Selecting local_rules.xml
       :align: center
       :width: 80%


#. Paste the original rule within an existing set of ``<group>`` tags or create your own. Then change the alert level and specify that it overwrites the original rule:

   .. code-block:: xml
     :emphasize-lines: 1
      
      <rule id="5760" level="7" overwrite="yes">
        <if_sid>5700,5716</if_sid>
        <match>Failed password|Failed keyboard|authentication error</match>
        <description>sshd: authentication failed.</description>
        <mitre>
          <id>T1110.001</id>
          <id>T1021.004</id>
        </mitre>
        <group>authentication_failed,gdpr_IV_35.7.d,gdpr_IV_32.2,gpg13_7.1,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,pci_dss_10.2.4,pci_dss_10.2.5,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>


   .. note::
      In this case, the ``if_sid`` label is not overwritten to maintain the correct operation of the rules. Same behavior applies to ``if_group``, ``if_level``, ``if_matched_sid``, and ``if_matched_group``.

   Notice how the web interface will automatically display an error if the xml syntax is incorrect.

#. Press **Save file**, confirm and then click **Restart** to restart the Wazuh manager.

   .. thumbnail:: ../images/learning-wazuh/labs/rules-4.png
       :title: Saving local_rules.xml file
       :align: center
       :width: 80%


#. Attempt to log in to the **linux-agent** using SSH and incorrect credentials. Then look for the event on the Wazuh dashboard by searching for **5760** and you will see that the level of the alert for the most recent event will be **7**:

   .. thumbnail:: ../images/learning-wazuh/labs/rules-5.png
       :title: Rule level has been changed
       :align: center
       :width: 80%


Using the Command Line Interface
--------------------------------
#. Log in to the Wazuh manager.

#. Copy existing rule 5760 from ``/var/ossec/ruleset/rules/0095-sshd_rules.xml``:

   .. code-block:: xml
      
      <rule id="5760" level="5">
        <if_sid>5700,5716</if_sid>
        <match>Failed password|Failed keyboard|authentication error</match>
        <description>sshd: authentication failed.</description>
        <mitre>
          <id>T1110.001</id>
          <id>T1021.004</id>
        </mitre>
        <group>authentication_failed,gdpr_IV_35.7.d,gdpr_IV_32.2,gpg13_7.1,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,pci_dss_10.2.4,pci_dss_10.2.5,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>
      
#. Paste it into ``/var/ossec/etc/rules/local_rules.xml``.  Make sure to insert it before a closing ``</group>`` tag, as all rules must be located inside of a ``<group>`` section.

#. Change the level from "5" to "7" in your revised version of the rule.

#. Add the tag ``overwrite="yes"`` to the rule so that Wazuh knows you are replacing an already defined rule. The first line should now look like this:

    .. code-block:: xml

        <rule id="5760" level="7" overwrite="yes">

#. You can customize a rule as long as you keep the rule ID the same and include the ``overwrite`` tag. If you change the rule ID then the original rule will not be overwritten and it may interfere with your customized version.  If you leave the rule ID the same but forget to add the overwrite tag, then the Wazuh manager will fail the next time it is restarted and throw an error about a duplicate rule ID.

   .. note:: It is also necessary to know that the ``if_sid``, ``if_group``, ``if_level``, ``if_matched_sid``, and ``if_matched_group`` labels are not taken into account when overwriting a rule to maintain consistency between loaded rules. If any of these are encountered, the original value prevails.

#. Save your changes to ``local_rules.xml``.

#. Run ``/var/ossec/bin/wazuh-logtest`` to test your customized rule and paste in this event that should trigger it:

   .. code-block:: none

    Oct 23 17:27:17 agent sshd[8221]: Failed password for root from ::1 port 60164 ssh2

#. Observe your customized alert level:

   .. code-block:: none
     :class: output
     :emphasize-lines: 3

      **Phase 3: Completed filtering (rules).
      	id: '5760'
      	level: '7'
      	description: 'sshd: authentication failed.'
      	groups: '['local', 'syslog', 'sshd', 'authentication_failed']'
      	firedtimes: '1'
      	gdpr: '['IV_35.7.d', 'IV_32.2']'
      	gpg13: '['7.1']'
      	hipaa: '['164.312.b']'
      	mail: 'False'
      	mitre.id: '['T1110.001', 'T1021.004']'
      	mitre.tactic: '['Credential Access', 'Lateral Movement']'
      	mitre.technique: '['Password Guessing', 'SSH']'
      	nist_800_53: '['AU.14', 'AC.7']'
      	pci_dss: '['10.2.4', '10.2.5']'
      	tsc: '['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3']'
      **Alert to be generated.


.. note::
    The Wazuh manager only reads the rules when started or restarted, so any real events like the above would not be affected by your customized rule until you restart the Wazuh manager.  The ``wazuh-logtest`` tool does not require the Wazuh manager to be restarted to notice your latest rule changes, which provides you with a convenient way to test your rule changes before making them take effect on real events.
