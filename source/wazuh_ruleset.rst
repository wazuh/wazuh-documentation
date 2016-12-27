.. _wazuh_ruleset:

Wazuh Ruleset
=============

This documentation explains how to install, update, and contribute to OSSEC HIDS Ruleset mantained by Wazuh. These rules are used by the system to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies or security policy violations. OSSEC provides an out-of-the-box set of rules that we update by modifying them or including new ones, in order to increase OSSEC detection capabilities.


GitHub repository
------------------

In the ruleset repository you will find:

* **New rules, decoders and rootchecks**
   OSSEC default number of rules and decoders is limited. For this reason, we centralize, test and maintain decoders and rules submitted by Open Source contributors. As well, we create new rules and rootchecks periodically that are added to this repository so they can be used by the users community. Some examples are the new rules for Netscaler and Puppet.
   We update and maintain out-of-the-box rules provided by OSSEC, both to eliminate false positives or to increase their accuracy. In addition, we map those with PCI-DSS compliance controls, making it easy to identify when an alert is related to a compliance requirement.

* **Tools**
   We provide some usefull tools for testing.


Resources
^^^^^^^^^

* Visit our repository to view the rules in detail at `Github Wazuh Ruleset <https://github.com/wazuh/wazuh-ruleset>`_
* Find a complete description of the available rules: `Wazuh Ruleset Summary <http://www.wazuh.com/resources/OSSEC_Ruleset.pdf>`_

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


Directory layout
------------------

The ruleset folder structure is divided in two parts following the next schema:
::

   /var/ossec/
           ├─ etc/
           │   ├─ decoders
           │   └─ rules
           └─ ruleset/
                   ├─ decoders
                   └─ rules

Folders
^^^^^^^^^^^^^^^
Inside the ``etc/`` folder we will find the ``local_decoder.xml`` and ``local_rules.xml`` files inside their corresponding folders.
Use these folders to keep you personal decoders and rules.

Inside the ``ruleset/`` folder we will find all the common rules and decoders files. This folder will be overwritten or modified in the Wazuh update process, so please do not use this folder for personal files and use the ``etc/`` folder instead.

You will be able to include or exclude decoders and rules, and also add new folders.


Update ruleset
----------------

Run ``update_ruleset.py`` script to update Wazuh Ruleset with no need to manually change OSSEC internal files.


Usage examples
^^^^^^^^^^^^^^

Update Decoders, Rules and Rootchecks: ::

   $ /var/ossec/bin/update_ruleset.py

All script options: ::

  Restart:
    -r, --restart       Restart OSSEC when required.
    -R, --no-restart    Do not restart OSSEC when required.

  Backups:
    -b, --backups       Restore last backup.

  Additional Params:
    -f, --force-update  Force to update the ruleset. By default, only it is updated the new/changed decoders/rules/rootchecks.
    -o, --ossec-path    Set OSSEC path. Default: '/var/ossec'
    -s, --source        Select ruleset source path (instead of download it).
    -j, --json          JSON output. It should be used with '-s' or '-S' argument.
    -d, --debug         Debug mode.


Configure weekly updates
^^^^^^^^^^^^^^^^^^^^^^^^

Run ``update_ruleset.py`` weekly and keep your Wazuh Ruleset installation up to date by adding a crontab job to your system.

Run ``sudo crontab -e`` and, at the end of the file, add the following line ::

  @weekly root cd /var/ossec/bin && ./update_ruleset.py -r



Contribute to the ruleset
-------------------------
If you have created new rules, decoders or rootchecks and you would like to contribute to our repository, please fork our `Github repository <https://github.com/wazuh/wazuh-ruleset>`_ and submit a pull request.

If you are not familiar with Github, you can also share them through our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, to which you can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``. As well do not hesitate to request new rules or rootchecks that you would like to see running in OSSEC and our team will do our best to make it happen.

.. note:: In our repository you will find that most of the rules contain one or more groups called pci_dss_X. This is the PCI DSS control related to the rule. We have produced a document that can help you tag each rule with its corresponding PCI requirement: http://www.wazuh.com/resources/PCI_Tagging.pdf

What's next
-----------

Once you have your ruleset up to date we encourage you to move forward and try out ELK integration or the API RESTful, check them on:


* :ref:`ELK Stack integration guide <ossec_elk>`
* :ref:`Wazuh RESTful API installation Guide <wazuh_api>`
