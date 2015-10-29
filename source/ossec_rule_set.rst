OSSEC Rule Set
=============================================================

Introduction
--------------------

This is the documentation for the rule set mantained by Wazuh. OSSEC provides a set of rules for commonly-used services, and rootchecks for rootkits detection and policy monitoring. These rules and rootchecks, need to be continuously updated and improved to enhance the alert capability of OSSEC. Maintain everything up to date is one of our goals. In our repository you will find:

* **OSSEC rules/rootchecks updates**
   We are updating the rules provided by OSSEC to fix bugs, add new rules and add new functionality. For example, each rule has been tagged with its corresponding PCI control that allows us to classify each alert according to PCI-DSS compliance.
* **New rules/rootchecks**
   Although we update the set of rules and rootchecks provided by OSSEC, these sets remain limited. For this reason, we are gathering all the rules that the community has done but has not been included in the OSSEC installation. We are also creating new rootchecks and new rules for different software like NetScaler, Puppet, FreeIPA, etc.

You can find the rule set in our repository: https://github.com/wazuh/ossec-rules.git

Installing rules
--------------------

Install or update rules in OSSEC is very easy. First of all, in folder */ossec-rules/rules-decoders/* you will find two types of folders:

* **OSSEC**
   This folder contains the rules provided by OSSEC but updated by Wazuh.
* **Remaining folders**
   Each folder represents new rules and decoders for software/services (NetScaler, Puppet, etc) created or gathered by Wazuh. These rules are not included in the OSSEC installation.

Choose the rule to install and follow the instructions in the file *instructions.md*. Usually these instructions are:

**OSSEC rules:** :: 

   Copy decoder.xml to /var/ossec/etc/
   Copy all files "*_rules.xml" to /var/ossec/rules/, except local_rules.xml

**Remaining rules:** :: 

   Append software_decoders.xml to /var/ossec/etc/decoder.xml
   Copy software_rules.xml to /var/ossec/rules/
   Add <include>software_rules.xml</include> to /var/ossec/etc/ossec.conf in section "rules"

If you prefer, you can perform above steps automatically by running the script included in each folder: **autoinstall_rules.sh**

- Set execute permission for this script: *chmod +x autoinstall_rules.sh*
- Run the script as root: *sudo ./autoinstall_rules.sh*
- Some rules can not be completely installed automatically and require performing some steps manually because they depend on the installation.

Installing rootchecks
----------------------
The rootchecks follow the same folder structure that the rules. In folder */ossec-rules/rootcheck/* you will find: 

* **OSSEC**
   This folder contains the rootchecks provided by OSSEC but updated by Wazuh.
* **Remaining folders**
   Each folder represents new rootchecks created or gathered by Wazuh. These rootcheks are not included in the OSSEC installation.

Choose the rootcheck to install and follow these instructions: 
:: 

   Copy all files to /var/ossec/etc/shared/
   Add to /var/ossec/etc/ossec.conf in section "rootcheck" the path to each file inside the proper label:
   - rootkit_files: For rootkit files database
   - rootkit_trojans: For rootkit trojans database
   - system_audit: For policy monitoring files

Contributing to the rule set
----------------------------
If you have created new rules, decoders or rootchecks and you would like to include in our repository, please contact us by email: info@wazuh.com

You can also request new rules or rootchecks which you would like to see running in OSSEC.

What next?
-----------

Once you have your rule set updated you can move forward and try out ELK integration or the API RESTful, check them on:

* `ELK Integration Guide <http://documentation.wazuh.com/en/latest/integrating_ossec_elk.html>`_
* `API RESTful Installation Guide <http://documentation.wazuh.com/en/latest/installing_ossec_api.html>`_

.. toctree:: 
   :maxdepth: 2