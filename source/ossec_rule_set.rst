.. _ossec_rule_set:

OSSEC Rule Set
==============

Introduction
------------

This documentation explains how to install, update, and contribute to OSSEC HIDS rule set mantained by Wazuh. These rules are used by the system to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies or security policy violations. OSSEC provides an out-of-the box set of rules that we update by modifying them or including new ones, in order to increase OSSEC detection capabilities.

In the rule set repository you will find:

* **OSSEC rule/rootcheck updates**
   We update and maintain out-of-the-box rules provided by OSSEC, both to eliminate false positives or to increase their accurancy. In addition, we map those with PCI-DSS compliance controls, making it easy to identify when an alert is related to a compliance requirement.
  
* **New rules/rootchecks**
   OSSEC out-of the box number of rules and decoders is limited. For this reason, we centralize, test and maintain decoders and rules submitted by Open Source contributors. As well, we create new rules and rootchecks periodically that are added to this repository so they can be used by the users community. Some examples of new rules are NetScaler and Puppet.


Resources
^^^^^^^^^

* Visit our repository to view the rules in detail at `Github OSSEC Ruleset <https://github.com/wazuh/ossec-rules>`_
* Find a complete description of the available rules: `OSSEC Ruleset Summary <http://www.wazuh.com/resources/OSSEC_Ruleset.pdf>`_

Rule examples
^^^^^^^^^^^^^

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

Installing log analysis rules
-----------------------------

Manual installation
^^^^^^^^^^^^^^^^^^^

Installing or updating rules in OSSEC manually is very easy. In our `Github repository <https://github.com/wazuh/ossec-rules>`_ you will find two types of rules under ``ossec-rules/rules-decoders/`` directory:

* **Updated OSSEC out-of-the-box rules:** Can be found under ``ossec-rules/rules-decoders/ossec`` directory and you can manually install them following these steps: ::

     - Copy ossec-rules/rules-decoders/decoder.xml to /var/ossec/etc/
     - Copy all files *_rules.xml to /var/ossec/rules/, except for local_rules.xml
     - Restart your OSSEC manager

* **New log analysis rules:** Are located in ``ossec-rules/rules-decoders/software`` (being software the name of your log messages source) and can be installed manually following these steps: ::

     - Append software_decoders.xml to /var/ossec/etc/decoder.xml
     - Copy software_rules.xml to /var/ossec/rules/
     - Add <include>software_rules.xml</include> to /var/ossec/etc/ossec.conf in section "<rules>"
     - If there are additional instructions to install these rules and decoders, you will find them in an instructions.md file in the same directory.
     - Restart your OSSEC manager

Using the installation script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the installation script, located in ``ossec-rules/rules-decoders/install.sh``, to automatically install and update your log analysis rules. To run the script, go to your OSSEC manager and follow the follwing steps.

Cloning the repository: ::

   $ cd ~
   $ mkdir ossec_rules_tmp && cd ossec_rules_tmp
   $ git clone https://github.com/wazuh/ossec-rules.git
   $ cd ossec_rules

Running the script: ::

   $ cd rules-decoders
   $ sudo chmod +x install_rules.sh
   $ sudo ./install_rules.sh update

.. note:: We are in the process of creating an online service to distribute the rules in an even more automatic way, meantime you can still use the bash script mentioned above.

Installing rootchecks
---------------------
Rootchecks can be found in ``ossec-rules/rootcheck/`` directory. There you will find both updated out-of-the-box OSSEC rootchecks, and newly created ones. 

To install a rootcheck file, just go to your OSSEC manager and copy the ``.txt`` file to ``/var/ossec/etc/shared/``. Then modify ``/var/ossec/etc/ossec.conf`` by adding the path to the ``.txt`` file to the ``<rootcheck>`` section. Examples: :: 

   - <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
   - <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>

   - <system_audit>/var/ossec/etc/shared/system_audit_rcl.txt</system_audit>
   - <system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
   - <system_audit>/var/ossec/etc/shared/cis_rhel_linux_rcl.txt</system_audit>
   - <system_audit>/var/ossec/etc/shared/cis_rhel5_linux_rcl.txt</system_audit>

   - <windows_malware>/var/ossec/etc/shared/win_malware_rcl.txt</windows_malware>
   - <windows_audit>/var/ossec/etc/shared/win_audit_rcl.txt</windows_audit>
   - <windows_apps>/var/ossec/etc/shared/win_applications_rcl.txt</windows_apps>

Contribute to the rule set
--------------------------
If you have created new rules, decoders or rootchecks and you would like to contribute to our repository, please fork our `Github repository <https://github.com/wazuh/ossec-rules>`_ and submit a pull request.

If you are not familiar with Github, you can also share them through our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, to which you can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``. As well do not hesitate to request new rules or rootchecks that you would like to see running in OSSEC.

.. note:: In our repository you will find that most of the rules contain one or more groups called pci_dss_X. This is the PCI DSS control related to the rule. We have produced a document that can help you tag each rule with its corresponding PCI requirement: http://www.wazuh.com/resources/PCI_Tagging.pdf

What's next?
------------

Once you have your rule set up to date we encourage you to move forward and try out ELK integration or the API RESTful, check them on:

* `ELK Integration Guide <http://documentation.wazuh.com/en/latest/integrating_ossec_elk.html>`_
* `API RESTful Installation Guide <http://documentation.wazuh.com/en/latest/installing_ossec_api.html>`_

.. toctree:: 
   :maxdepth: 2