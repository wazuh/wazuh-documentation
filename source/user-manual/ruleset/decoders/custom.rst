.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: 
  
Custom decoders
===============

Adding new decoders
-------------------

Changing existing decoders
--------------------------

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
