.. _ossec_ruleset:

OSSEC Wazuh Ruleset
===================

Introduction
------------

This documentation explains how to install, update, and contribute to OSSEC HIDS Ruleset mantained by Wazuh. These rules are used by the system to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies or security policy violations. OSSEC provides an out-of-the-box set of rules that we update by modifying them or including new ones, in order to increase OSSEC detection capabilities.

In the ruleset repository you will find:

* **OSSEC out-of-the-box rule/rootcheck updates and compliance mapping**
   We update and maintain out-of-the-box rules provided by OSSEC, both to eliminate false positives or to increase their accuracy. In addition, we map those with PCI-DSS compliance controls, making it easy to identify when an alert is related to a compliance requirement.
  
* **New rules/rootchecks**
   OSSEC default number of rules and decoders is limited. For this reason, we centralize, test and maintain decoders and rules submitted by Open Source contributors. As well, we create new rules and rootchecks periodically that are added to this repository so they can be used by the users community. Some examples are the new rules for Netscaler and Puppet.


Resources
^^^^^^^^^

* Visit our repository to view the rules in detail at `Github OSSEC Wazuh Ruleset <https://github.com/wazuh/ossec-rules>`_
* Find a complete description of the available rules: `OSSEC Wazuh Ruleset Summary <http://www.wazuh.com/resources/OSSEC_Ruleset.pdf>`_

Rule and Rootcheck example
^^^^^^^^^^^^^^^^^^^^^^^^^^

Log analysis rule for Netscaler with PCI DSS compliance mapping:
::

    <rule id="80102" level="10" frequency="6">
        <if_matched_sid>80101</if_matched_sid>
        <same_source_ip />
        <description>Netscaler: Multiple AAA failed to login the user</description>
        <group>authentication_failures,netscaler-aaa,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_11.4,</group>
    </rule> 

Rootcheck rule for SSH Server with mapping to CIS security benchmark and PCI DSS compliance:
::

   [CIS - Debian Linux - 2.3 - SSH Configuration - Empty passwords permitted {CIS: 2.3 Debian Linux} {PCI_DSS: 4.1}] [any] [http://www.ossec.net/wiki/index.php/CIS_DebianLinux]
   f:/etc/ssh/sshd_config -> !r:^# && r:^PermitEmptyPasswords\.+yes;

Manual installation
-------------------

Log analysis rules
^^^^^^^^^^^^^^^^^^

In the `Github repository <https://github.com/wazuh/ossec-rules>`_ you will find two different kind of rules under ``ossec-rules/rules-decoders/`` directory:

Updated out-of-the-box rules
""""""""""""""""""""""""""""

These rules can be found under ``ossec-rules/rules-decoders/ossec`` directory, and you can manually install them following these steps: ::

     - Copy "ossec-rules/rules-decoders/ossec/decoders/*_decoders.xml" to "/var/ossec/etc/ossec_decoders/".
     - Copy all files "ossec-rules/rules-decoders/ossec/rules/*rules*.xml" to "/var/ossec/rules/", except for "local_rules.xml".
     - Restart your OSSEC manager.

If you do not use the OSSEC Wazuh fork, copy, after the above steps, the decoders ``ossec/decoders/compatibility/*_decoders.xml`` to ``/var/ossec/etc/ossec_decoders/``.

New log analysis rules
""""""""""""""""""""""

These rules are located at ``ossec-rules/rules-decoders/software`` (being software the name of your log messages source) and can be installed manually following next steps.



Copy new rule files into OSSEC directories and add the new rules file to ``ossec.conf`` configuration file: ::

 - Copy "software_decoders.xml" to "/var/ossec/etc/wazuh_decoders/".
 - Copy "software_rules.xml" to "/var/ossec/rules/"
 - Add "<include>software_rules.xml</include>" to "/var/ossec/etc/ossec.conf" before the tag "</rules>".
 - If there are additional instructions to install these rules and decoders, you will find them in an instructions.md file in the same directory.
 - Restart your OSSEC manager


Decoder paths
""""""""""""""""""""""""
Configure decoder paths adding the next lines after tag ``<rules>`` at ``/var/ossec/etc/ossec.conf``: ::

 <decoder_dir>etc/ossec_decoders</decoder_dir>
 <decoder>etc/local_decoder.xml</decoder>
 <decoder_dir>etc/wazuh_decoders</decoder_dir>

If you do not use the OSSEC Wazuh fork, you must move the file ``decoder.xml`` to the directory ``etc/ossec_decoders``.
Also, if you do not use ``local_decoder.xml``, remove that line in ossec.conf. Remember that ``local_decoder.xml`` can not be empty.

Rootcheck rules
^^^^^^^^^^^^^^^

Rootchecks can be found in ``ossec-rules/rootcheck/`` directory. There you will see both updated out-of-the-box OSSEC rootchecks, and new ones. 

To install a rootcheck file, go to your OSSEC manager and copy the ``.txt`` file to ``/var/ossec/etc/shared/``. Then modify ``/var/ossec/etc/ossec.conf`` by adding the path to the ``.txt`` file into the ``<rootcheck>`` section. 

Examples: :: 

   - <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
   - <system_audit>/var/ossec/etc/shared/cis_rhel5_linux_rcl.txt</system_audit>
   - <windows_malware>/var/ossec/etc/shared/win_malware_rcl.txt</windows_malware>
   - <windows_audit>/var/ossec/etc/shared/win_audit_rcl.txt</windows_audit>
   - <windows_apps>/var/ossec/etc/shared/win_applications_rcl.txt</windows_apps>

Automatic installation
----------------------

Run ``ossec_ruleset.py`` script to install and update OSSEC Wazuh Ruleset with no need to manually change OSSEC internal files.

Two main functionalities are included in the script:

* **Install**: Allows you to select new rules, to incorporate them into your OSSEC installation.
* **Update**: Fetchs updated and new rules directly from Wazuh server.

The installation script is located in our repository at ``wazuh/ossec-rules/ossec_ruleset.py``. To download and run it, go to your OSSEC manager and follow next steps.

Cloning the repository: ::

   $ cd ~
   $ mkdir ossec_rules_tmp && cd ossec_rules_tmp
   $ git clone https://github.com/wazuh/ossec-rules.git
   $ cd ossec-rules

Running the script: ::

   $ sudo chmod +x ossec_ruleset.py
   $ sudo ./ossec_ruleset.py

At this point you can select what you want to install/update: rules, rootchecks or both: ::

  -r, --rules
  -c, --rootchecks
  -a, --all

As well, if you want to run the script in silent-mode (non interactive), you can use: ::

  -f, --file  Use a configuration file to select rules and rootchecks to install

Or, if you simply want to update the exiting ruleset: ::

  -u, --update

Usage examples
^^^^^^^^^^^^^^

Install new rules/rootchecks from interactive menu: ::

  ./ossec_ruleset.py --all

Update existing rule set: ::

  ./ossec_ruleset.py --all --update

Update only existing rootchecks: ::

  ./ossec_ruleset.py --rootchecks --update

Restore a backup: ::

  ./ossec_ruleset.py --backups list


Configure weekly updates
^^^^^^^^^^^^^^^^^^^^^^^^

Run ``ossec_ruleset.py`` weekly and keep your OSSEC Wazuh Ruleset installation up to date by adding a crontab job to your system.

Run ``sudo crontab -e`` and, at the end of the file, add the following line ::
 
  @weekly root /full/path/to/ossec-rules/ossec_ruleset.py -a -u -s

Wazuh rules
-----------

Amazon
^^^^^^

Auditd
^^^^^^

Netscaler
^^^^^^^^^

Puppet
^^^^^^

Serv-U
^^^^^^

Contribute to the ruleset
-------------------------
If you have created new rules, decoders or rootchecks and you would like to contribute to our repository, please fork our `Github repository <https://github.com/wazuh/ossec-rules>`_ and submit a pull request.

If you are not familiar with Github, you can also share them through our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, to which you can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``. As well do not hesitate to request new rules or rootchecks that you would like to see running in OSSEC and our team will do our best to make it happen.

.. note:: In our repository you will find that most of the rules contain one or more groups called pci_dss_X. This is the PCI DSS control related to the rule. We have produced a document that can help you tag each rule with its corresponding PCI requirement: http://www.wazuh.com/resources/PCI_Tagging.pdf

What's next
-----------

Once you have your ruleset up to date we encourage you to move forward and try out ELK integration or the API RESTful, check them on:

* :ref:`ELK Stack integration guide <ossec_elk>`
* :ref:`OSSEC Wazuh RESTful API installation Guide <ossec_api>`
