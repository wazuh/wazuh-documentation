.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Customizing rules
  
.. _ruleset_custom:

Custom rules
============

.. _changing_existing_rule:

Changing existing rules
-----------------------

.. warning::
    Changes to any rule file inside the ``/var/ossec/ruleset/rules`` folder are lost in the update process. Use the following procedure to preserve your changes.

You can change the default Wazuh rules. To do so, we recommend copying the rules to a file in the ``/var/ossec/etc/rules/`` directory, making the necessary changes, and adding the ``overwrite="yes"`` tag to the modified rules. These steps guarantee that your changes won't be lost during updates.

Here's an example on how to change the level value of the SSH rule ``5710`` from 5 to 10.

#. Open the rule file ``/var/ossec/ruleset/rules/0095-sshd_rules.xml``.

#. Find and copy the rule definition for rule id ``5710``:

   .. code-block:: xml

      <group name="syslog,sshd,">
        ...
        <rule id="5710" level="5">
          <if_sid>5700</if_sid>
          <match>illegal user|invalid user</match>
          <description>sshd: Attempt to login using a non-existent user</description>
          <mitre>
            <id>T1110</id>
          </mitre>
          <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
        </rule>
        ...
      </group>

#. Paste the copied rule definition into ``/var/ossec/etc/rules/local_rules.xml``. Modify the level value, and add ``overwrite="yes"`` to indicate that this rule overwrites an already defined rule.

   .. code-block:: xml
      :emphasize-lines: 2

      <group name="syslog,sshd,">
        <rule id="5710" level="10" overwrite="yes">
          <if_sid>5700</if_sid>
          <match>illegal user|invalid user</match>
          <description>sshd: Attempt to login using a non-existent user</description>
          <mitre>
            <id>T1110</id>
          </mitre>
          <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
        </rule>
      </group>

   .. warning::
      To maintain consistency between loaded rules, currently it's not possible to overwrite the ``if_sid``, ``if_group``, ``if_level``, ``if_matched_sid``, and ``if_matched_group`` labels. These tags are ignored when they are in an overwrite rule, keeping the original values.

#. Restart the Wazuh manager to load the updated rules:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst
