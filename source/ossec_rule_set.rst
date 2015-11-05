OSSEC Rule Set
=============================================================

Introduction
--------------------

This is the documentation for the rule set mantained by Wazuh. OSSEC provides a set of rules for commonly-used services, and rootchecks for rootkits detection and policy monitoring. Wazuh keeps these rules and rootchecks up to date and create new ones to enhance the alert capability of OSSEC. Here you will find a guide to install the rule set or update it with the latest rules.

In our repository you will find:

* **OSSEC rules/rootchecks updates**
   We update out-of-the-box rules provided by OSSEC to fix bugs, create new rules and add further functionality. For example, each rule has been tagged with its related PCI control in order to classify each alert according to PCI-DSS compliance.
* **New rules/rootchecks**
   Although we update the set of rules and rootchecks provided by OSSEC, this set is still limited. For this reason, we collect rules published by the community that do not come by default with OSSEC, test them and make sure they work well. Additionally we create new rootchecks and rules. Some examples of new rules are NetScaler and Puppet.

You can find this rule set in our repository: https://github.com/wazuh/ossec-rules.git

Installing rules
--------------------

Install or update rules in OSSEC is very easy. First of all, in folder */ossec-rules/rules-decoders/* you will find two types of folders:

* **OSSEC**
   This folder contains the rules provided by OSSEC and updated by Wazuh.
* **Other folders**
   Each folder represents new rules and decoders for software/services (NetScaler, Puppet, etc) created or collected by Wazuh. Remember that these rules are not included in OSSEC by default.

Choose the rule you would like to install and follow the instructions given in the file *instructions.md*. This file usually looks like the below instructions:

**Rules from OSSEC folder:** :: 

   Copy /ossec-rules/rules-decoders/decoder.xml to /var/ossec/etc/
   Copy all files "*_rules.xml" to /var/ossec/rules/, except local_rules.xml

**Rules from other folders:** :: 

   Append software_decoders.xml to /var/ossec/etc/decoder.xml
   Copy software_rules.xml to /var/ossec/rules/
   Add <include>software_rules.xml</include> to /var/ossec/etc/ossec.conf in section "rules"

If you prefer, you can execute the above steps automatically by running the script included in the main folder: **install_rules.sh**

- Set execute permission for this script: *chmod +x install_rules.sh*
- Run the script as root: *sudo ./install_rules.sh*
- Some rules can not be completely installed automatically and require further manual steps because they depend on the installation.

Installing rootchecks
----------------------
Rootchecks follow the same folder structure as rules. In folder */ossec-rules/rootcheck/* you will find: 

* **OSSEC**
   This folder contains the rootchecks provided by OSSEC and updated by Wazuh.
* **Other folders**
   Each folder represents new rootchecks created or collected by Wazuh. Remember that these rootchecks are not included in OSSEC by default.

Choose the rootcheck you would like to install and follow these instructions: 
:: 

   Copy all files to /var/ossec/etc/shared/
   Add to /var/ossec/etc/ossec.conf in section "rootcheck" the path to each file inside the proper label:
   - rootkit_files: For rootkit files database
   - rootkit_trojans: For rootkit trojans database
   - system_audit: For policy monitoring files

Contribute to the rule set
----------------------------
If you have created new rules, decoders or rootchecks and you would like to include them in our repository, please contact us by email: info@wazuh.com

Also do not hesitate to request new rules or rootchecks that you would like to see running in OSSEC.

What's next?
------------

Once you have your rule set up to date we encourage you to move forward and try out ELK integration or the API RESTful, check them on:

* `ELK Integration Guide <http://documentation.wazuh.com/en/latest/integrating_ossec_elk.html>`_
* `API RESTful Installation Guide <http://documentation.wazuh.com/en/latest/installing_ossec_api.html>`_

.. toctree:: 
   :maxdepth: 2