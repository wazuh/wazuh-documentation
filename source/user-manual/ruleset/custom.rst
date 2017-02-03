.. _ruleset_custom:

Custom rules and decoders
===========================

It is possible to modify the default rules and decoders from Wazuh-Ruleset and also add new ones in order to increase Wazuh detection capabilities.

Adding new decoders and rules
-------------------------------
.. note::
   We will use the ``local_decoder.xml`` and ``local_rules.xml`` to implement small changes. If you want to implement more complet or concrete changes, we recommend to create a new decoder o rule file.


We are going to describe these procedures using an easy example. We have the next log from a program called ``example``:
::

   Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100'

First, we need to decode this information. We create the new decoder code into the file ``/var/ossec/etc/decoders/local_decoder.xml``:
::

  <decoder name="example">
    <program_name>^example</program_name>
  </decoder>

  <decoder name="example">
    <parent>example</parent>
    <regex>User '(\w+)' logged from '(\d+.\d+.\d+.\d+)'</regex>
    <order>user, srcip</order>
  </decoder>


Now, we will create the next rule into the file ``/var/ossec/etc/rules/local_rules.xml``:
::

  <rule id="100010" level="0">
    <program_name>example</program_name>
    <description>User logged</description>
  </rule>


We can check if it works using ``/var/ossec/bin/ossec-logtest``:
::

  **Phase 1: Completed pre-decoding.
       full event: 'Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100''
       hostname: 'MyHost'
       program_name: 'example'
       log: 'User 'admin' logged from '192.168.1.100''

  **Phase 2: Completed decoding.
       decoder: 'example'
       dstuser: 'admin'
       srcip: '192.168.1.100'

  **Phase 3: Completed filtering (rules).
       Rule id: '100010'
       Level: '0'
       Description: 'User logged'



Changing existing rule
------------------------

It is possible to modify the installed rules.

.. warning::
    All changes in any rule file inside the ``/var/ossec/ruleset/rules`` folder will be lost in the update process. Use the next procedure to keep your changes.

For example, if we want to change the level value of the SSH rule ``5710`` from 5 to 10, we will follow the next steps:

1. Open the rule file ``/var/ossec/ruleset/rules/0095-sshd_rules.xml``.

2. Search and copy the following code in the rule file:

::

  <rule id="5710" level="5">
    <if_sid>5700</if_sid>
    <match>illegal user|invalid user</match>
    <description>sshd: Attempt to login using a non-existent user</description>
    <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,</group>
  </rule>

3. Paste the code into the file ``/var/ossec/etc/rules/local_rules.xml``, modify the level value and add ``overwrite="yes"`` to indicate that this rule will be overwritten:

::

  <rule id="5710" level="10" overwrite="yes">
    <if_sid>5700</if_sid>
    <match>illegal user|invalid user</match>
    <description>sshd: Attempt to login using a non-existent user</description>
    <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,</group>
  </rule>


Changing existing decoder
---------------------------

It is possible to modify the installed decoders.

.. warning::
    All changes in any decoder file inside the ``/var/ossec/ruleset/decoders`` folder will be lost in the update process. Use the next procedure to keep your changes.

Unfortunately, there is any automatic procedure to overwrite decoders like the procedure described above for rules. However, we can perform changes in any decoder file following the steps of the example described below.

If we want to accomplish some changes in the decoder file ``0310-ssh_decoders.xml``, we will follow the next steps:

1. Copy the decoder file ``/var/ossec/ruleset/decoders/0310-ssh_decoders.xml`` from the default folder to the user folder ``/var/ossec/etc/decoders`` in order to keep the changes.

2. Exclude the original decoder file ``ruleset/decoders/0310-ssh_decoders.xml`` from the OSSEC loading list. To do this, use the tag ``<decoder_exclude>`` in the ``ossec.conf`` file. Thus, the specified decoder will not be loaded from the default decoder folder, and the decoder file saved on the user folder will be loaded instead.

::

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


3. Perform the changes in the file ``/var/ossec/etc/decoders/0310-ssh_decoders.xml``.
