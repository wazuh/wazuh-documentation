.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to add new decoders and rules, and how to change existing ones in this section of the Wazuh documentation.

.. _ruleset_custom:

Custom rules and decoders
===========================

Customize the Wazuh ruleset to fit your needs and enhance detection capabilities. To achieve this, you can:

- Modify the default rules and decoders. 
- Add new custom rules and decoders.  

Find detailed instructions and examples on how to customize the ruleset in the sections below. 

Adding new decoders and rules
-------------------------------

.. note:: Use ID numbers between 100000 and 120000 for custom rules. 

.. note:: To make minor adjustments, use the ``local_decoder.xml`` and ``local_rules.xml`` files. We recommend creating new decoder and rule files for changes on a larger scale.


Check out this example on how to create new decoders and rules. The following log corresponds to a program called ``example``:

   .. code-block:: 

      Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100'

#. Add a new decoder to ``/var/ossec/etc/decoders/local_decoder.xml`` to decode the log information:

   .. code-block:: xml

      <decoder name="example">
        <program_name>^example</program_name>
      </decoder>

      <decoder name="example">
        <parent>example</parent>
        <regex>User '(\w+)' logged from '(\d+.\d+.\d+.\d+)'</regex>
        <order>user, srcip</order>
      </decoder>


#. Add the following rule to ``/var/ossec/etc/rules/local_rules.xml``:

   .. code-block:: xml

      <rule id="100010" level="0">
        <program_name>example</program_name>
        <description>User logged</description>
      </rule>


#. Run ``/var/ossec/bin/wazuh-logtest``. Input the example log above to test the decoder and rule:

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
              groups: '['local', 'syslog', 'sshd']'
              firedtimes: '1'
              mail: 'False'


   To test your rules and decoders using ``wazuh-logtest``, it's enough to save the changes made to the decoder and rule files. However, you need to restart the Wazuh manager to generate alerts based on these changes.  

#. Restart the Wazuh manager to load the updated rules and decoders:

      .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

Changing an existing rule
-------------------------

.. warning::
    Changes to any rule file inside the ``/var/ossec/ruleset/rules`` folder are lost in the update process. Use the following procedure to preserve your changes.

You can change the default Wazuh rules. To do so, we recommend copying the rules to a file in the ``/var/ossec/etc/rules/`` directory, making the necessary changes, and adding the ``overwrite="yes"`` tag to the modified rules. These steps guarantee that your changes won't be lost during updates.

Here's an example on how to change the level value of the SSH rule ``5710`` from 5 to 10.

#. Open the rule file ``/var/ossec/ruleset/rules/0095-sshd_rules.xml``.

#. Find and copy the rule definition for rule id ``5710``:

   .. code-block:: xml

      <rule id="5710" level="5">
        <if_sid>5700</if_sid>
        <match>illegal user|invalid user</match>
        <description>sshd: Attempt to login using a non-existent user</description>
        <mitre>
          <id>T1110</id>
        </mitre>
        <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>

#. Paste the copied rule definition into ``/var/ossec/etc/rules/local_rules.xml``. Modify the level value, and add ``overwrite="yes"`` to indicate that this rule is overwriting an already defined rule:

   .. code-block:: xml
      :emphasize-lines: 1

      <rule id="5710" level="10" overwrite="yes">
        <if_sid>5700</if_sid>
        <match>illegal user|invalid user</match>
        <description>sshd: Attempt to login using a non-existent user</description>
        <mitre>
          <id>T1110</id>
        </mitre>
        <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>

   .. warning::
      To maintain consistency between loaded rules, currently it's not possible to overwrite the ``if_sid``, ``if_group``, ``if_level``, ``if_matched_sid``, and ``if_matched_group`` labels. These tags are ignored when they are in an overwrite rule, keeping the original values.

#. Restart the Wazuh manager to load the updated rules:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

Changing an existing decoder
-----------------------------

.. warning::
    Changes in any decoder file in the ``/var/ossec/ruleset/decoders`` folder are lost in the update process. Use the following procedure to preserve your changes.


To change a default decoder, you can rewrite its file in the ``/var/ossec/etc/decoders`` directory, make the changes, and exclude the original decoder file from the loading list. 

For example, if you want to customize decoders in the ``0310-ssh_decoders.xml`` file, follow these steps: 

#. Copy the decoder file ``/var/ossec/ruleset/decoders/0310-ssh_decoders.xml`` to the user folder ``/var/ossec/etc/decoders``. This keeps the changes you make when updating to a newer version.

#. Edit the ``/var/ossec/etc/ossec.conf`` configuration file. Set the ``<decoder_exclude>`` tag to exclude the original ``ruleset/decoders/0310-ssh_decoders.xml`` decoder file from the loading list. With this configuration, Wazuh loads the decoder file located in the user folder and not the file in the default folder.
 
   .. code-block:: xml
      :emphasize-lines: 11 

      <ruleset>
        <!-- Default ruleset -->
        <decoder_dir>ruleset/decoders</decoder_dir>
        <rule_dir>ruleset/rules</rule_dir>
        <rule_exclude>0215-policy_rules.xml</rule_exclude>
        <list>etc/lists/audit-keys</list>

        <!-- User-defined ruleset -->
        <decoder_dir>etc/decoders</decoder_dir>
        <rule_dir>etc/rules</rule_dir>
        <decoder_exclude>ruleset/decoders/0310-ssh_decoders.xml</decoder_exclude>
      </ruleset>


#. Make changes to ``/var/ossec/etc/decoders/0310-ssh_decoders.xml``.

#. Restart the Wazuh manager so the changes take effect:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

   .. warning::
      Since you're excluding the original decoder file, you don't benefit from  any updates it might get.  Your custom file remains unchanged during upgrades so consider applying relevant changes manually. 
