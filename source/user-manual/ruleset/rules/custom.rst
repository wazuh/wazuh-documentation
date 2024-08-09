.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Custom rules in Wazuh allow users to define specific conditions or patterns in log data that are relevant to their unique requirements. Learn more in this section of the documentation.
  
Custom rules
============

Custom rules in Wazuh allow users to define specific conditions or patterns in log data that are relevant to their unique environment, applications, or security requirements. While Wazuh comes with a set of default rules covering a broad range of security events, custom rules enable users to tailor the system to their specific needs and enhance its capabilities.

Wazuh allows users to:

-  Add custom rules.
-  Modify the default rules.

Adding custom rules
-------------------

.. note::
   
   Use ID numbers between 100000 and 120000 for custom rules.

.. note::
   
   To make minor adjustments in your rules, use the ``/var/ossec/etc/rules/local_rules.xml`` file. We recommend creating new rule files in ``/var/ossec/etc/rules/`` directory for changes on a larger scale.

Check out this example on how to create new rules. The following log corresponds to a program called ``example``. We already created a custom decoder for this event in the :doc:`Custom decoder </user-manual/ruleset/decoders/custom>` section.

.. code-block:: none

   Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100'

Perform the following steps on the Wazuh server.

#. Add the following rule to ``/var/ossec/etc/rules/local_rules.xml`` file:

   .. code-block:: xml

      <group name="custom_rules_example,">
        <rule id="100010" level="0">
          <program_name>example</program_name>
          <description>User logged</description>
        </rule>
      </group>

#. Run the ``/var/ossec/bin/wazuh-logtest`` utility and  input the example log above to test the decoder and rule:

   .. code-block:: none

      Type one log per line

      Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100'

      **Phase 1: Completed pre-decoding.
              full event: 'Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100''
              timestamp: 'Dec 25 20:45:02'
              hostname: 'MyHost'
              program_name: 'example'

      **Phase 2: Completed decoding.
              name: 'example'
              dstuser: 'admin'
              srcip: '192.168.1.100'

      **Phase 3: Completed filtering (rules).
              id: '100010'
              level: '0'
              description: 'User logged'
              groups: '['custom_rules_example']'
              firedtimes: '1'
              mail: 'False'

   To test your rules using ``/var/ossec/bin/wazuh-logtest`` tool, saving the changes made to the rule files is enough. However, you need to restart the Wazuh manager to generate alerts based on these changes.

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

.. _changing_existing_rule:

Changing existing rules
-----------------------

.. warning::
   
   Modifications made to any rule file within the ``/var/ossec/ruleset/rules`` directory are overwritten during the upgrade process. Follow the procedure below to preserve your changes.

Wazuh allows you to modify its out-of-the-box rules. To do so, you have to copy the rules to a file under the ``/var/ossec/etc/rules/`` directory on the Wazuh server, make the necessary changes, and add the ``overwrite="yes"`` tag to the modified rules. These steps guarantee that your changes won't be lost during upgrades.

Here is an example of how to change the level value of the SSH rule ``5710`` from 5 to 10.

Perform the steps below on the Wazuh server.

#. Open the ``/var/ossec/ruleset/rules/0095-sshd_rules.xml`` rule file.
#. Find and copy the rule definition for rule ID ``5710``:

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

#. Paste the copied rule definition into ``/var/ossec/etc/rules/local_rules.xml``. Modify the level value, and add ``overwrite="yes"`` to indicate that this rule overwrites an already defined rule:

   .. code-block:: xml

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

   .. warning:: To maintain consistency across loaded rules, it is currently not possible to overwrite the ``if_sid``, ``if_group``, ``if_level``, ``if_matched_sid``, and ``if_matched_group`` labels. These tags are ignored when present in an overwrite rule, preserving the original values.

#. Restart the Wazuh manager to load the updated rules:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

The combination of default and custom rules allows Wazuh to provide a flexible and extensible security monitoring solution for different use cases.
