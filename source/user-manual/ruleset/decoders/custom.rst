.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can customize the Wazuh decoders on the Wazuh server to suit your requirements and improve your detection capabilities.
  
Custom decoders
===============

You can customize the Wazuh decoders on the Wazuh server to suit your requirements and improve your detection capabilities. Wazuh allows you to:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Add custom decoders
-------------------

.. note::
   
   Add your new decoders in the ``/var/ossec/etc/decoders/local_decoder.xml`` file. We recommend creating new decoder files in the ``/var/ossec/etc/decoders/`` directory for changes on a larger scale.

Check out this example on how to create new decoders and rules. The following log corresponds to a program called ``example``:

.. code-block:: none

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

#. Run ``/var/ossec/bin/wazuh-logtest`` utility on the Wazuh server and enter the example log above to test the decoder and rule:

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

   To test your rules and decoders using the ``/var/ossec/bin/wazuh-logtest`` utility, simply save the changes made to the decoder and rule files. However, you need to restart the Wazuh manager to generate alerts based on these modifications.

#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

Modify default decoders
-----------------------

To modify a default decoder, you can rewrite its file in the ``/var/ossec/etc/decoders/`` directory on the Wazuh server, make the changes, and exclude the original decoder file from the loading list.

For example, if you want to customize decoders in the ``/var/ossec/ruleset/decoders/0310-ssh_decoders.xml`` file, follow these steps:

#. Copy the decoder file ``/var/ossec/ruleset/decoders/0310-ssh_decoders.xml`` to the user directory ``/var/ossec/etc/decoders/``. This ensures that your changes are saved when upgrading to a newer version.
#. Edit the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file. Set the ``<decoder_exclude>`` tag to exclude the original ``/var/ossec/ruleset/decoders/0310-ssh_decoders.xml`` decoder file from the loading list. With this configuration, Wazuh loads the decoder file located in the ``/var/ossec/etc/decoders/`` user directory instead of the file in the default directory.

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

#. Make the changes into the ``/var/ossec/etc/decoders/0310-ssh_decoders.xml`` file.
#. Restart the Wazuh manager to apply the changes:

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

.. warning::
   
   By excluding the original decoder file, you won't receive the updates it may receive. Your custom file will remain unchanged during upgrades. So, consider applying relevant changes manually.
