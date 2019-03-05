.. Copyright (C) 2018 Wazuh, Inc.

.. _ruleset_custom:

Custom rules and decoders
===========================

It is possible to modify the default rules and decoders from the Wazuh Ruleset and also to add new ones in order to increase Wazuh's detection capabilities.

Adding new decoders and rules
-------------------------------

.. note::
  When implementing small changes, adding unattached rules, or even testing new rules or decoders, we recommend to use the ``local_decoder.xml`` and ``local_rules.xml`` files.
  For bigger changes or to add more rules or decoders, it is better to create a new rule or decoder file.


We are going to describe these procedures by using an easy example. Here is a log from a program called ``example``:
::

   Dec 25 20:45:02 MyHost example[12345]: User 'admin' logged from '192.168.1.100'

First, we need to decode this information, so we add the new decoder to ``/var/ossec/etc/decoders/local_decoder.xml``:
::

  <decoder name="example">
    <program_name>^example</program_name>
  </decoder>

  <decoder name="example">
    <parent>example</parent>
    <regex>User '(\w+)' logged from '(\d+.\d+.\d+.\d+)'</regex>
    <order>user, srcip</order>
  </decoder>


Now, we will add the following rule to ``/var/ossec/etc/rules/local_rules.xml``:
::

  <rule id="100010" level="0">
    <program_name>example</program_name>
    <description>User logged</description>
  </rule>


We can check if it works by using `/var/ossec/bin/ossec-logtest <https://documentation.wazuh.com/current/user-manual/reference/tools/ossec-logtest.html?highlight=logtest>`_:
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



Changing an existing rule
---------------------------

If the user needs to change an existing standard rule, it can be changed by following this guide:

.. warning::
    Changes to any rule file inside the ``/var/ossec/ruleset/rules`` folder will be lost in the update process. Use the following procedure to preserve your changes.

If we want to change an existing rule, we should do the following:

1. Open the rule file ``/var/ossec/ruleset/rules/rule_file.xml``.

2. Copy and paste the rule code block into ``/var/ossec/etc/rules/local_rules.xml``.

3. Change the pasted rule the way its needed, and add the option ``overwrite="yes"`` to indicate that this rule is overwriting an already defined rule:

::

  <rule id="100000" level="1" overwrite="yes">
    (rule content)
  </rule>

.. note::
  As is said at the start of this page, this is a punctual solution for small changes. If users want to overwrite a big amount of rules, we suggest to follow this same procedure but instead of including the overwritten rules in the ``local_rules.xml`` file, include them into a new file in the ``/var/ossec/ruleset/rules`` folder.


Changing an existing decoder
-----------------------------

You can also modify the standard decoders.

.. warning::
    Changes in any decoder file in the ``/var/ossec/ruleset/decoders`` folder will be lost in the update process. Use the following procedure to preserve your changes.

Unfortunately, there is no facility for overwriting decoders in the way described for rules above. However, we can perform changes in any decoder file as follows:

1. Copy the decoder file ``/var/ossec/ruleset/decoders/my_decoders.xml`` from the default folder to the user folder ``/var/ossec/etc/decoders`` in order to keep the changes.

2. Exclude the original decoder file ``ruleset/decoders/my_decoders.xml`` from the OSSEC loading list. To do this, use the tag ``<decoder_exclude>`` in the ``ossec.conf`` file. Thus, the specified decoder will not be loaded from the default decoder folder, and the decoder file saved in the user folder will be loaded instead.

::

  <ruleset>
    <!-- Default ruleset -->
    <decoder_dir>ruleset/decoders</decoder_dir>
    <rule_dir>ruleset/rules</rule_dir>
    <rule_exclude>my_rules.xml</rule_exclude>
    <list>etc/lists/audit-keys</list>

    <!-- User-defined ruleset -->
    <decoder_dir>etc/decoders</decoder_dir>
    <rule_dir>etc/rules</rule_dir>
    <decoder_exclude>ruleset/decoders/my_decoders.xml</decoder_exclude>
  </ruleset>


3. Perform the changes in the file ``/var/ossec/etc/decoders/my_decoders.xml``.

.. warning::
    Note that at this point, if updates to the public Wazuh Ruleset include changes to the file of the decoder you have overwritten, they will not apply to you since since you are no longer loading that decoder file from the standard location that gets updates.  At some point you may have to manually migrate your customized material to a newer copy of that file.  Consider internally documenting your changes so that they are easy to find if they have to be migrated later.