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
Before installing our Amazon rules, you need to follow next steps to enable logging through AWS API and download the JSON data files:

1. Turn on CloudTrail.
2. Create a user with at least read premission over S3.
3. Install AWS Cli in your Ossec Manager.
4. Configure the previous user credentials  with AWS Cli in your Ossec Manager.
5. Run a python script for download the JSON data in gzipped files logs and convert in to a flat file.
6. Install Wazuh Amazon rules.


1.- Turn on CloudTrail
""""""""""""""""""""""

This section shows you how to create a trail for your AWS account. You can create trails by using the AWS CloudTrail console or the AWS Command Line Interface (AWS CLI). Both methods follow the same steps:

Turn on ``CloudTrail``. By default, when you create a trail in one region in the CloudTrail console, the trail will apply to all regions.

Create a new Amazon S3 bucket for storing your log files, or specify an existing bucket where you want the log files delivered. By default, log files from all AWS regions in your account will be delivered to the bucket you specify.

S3 bucket name is common for all amazon users, dont be worried if have this error ``Bucket already exists. Select a different bucket name.`` even if you dont have any bucket before.

At this moment all your actions in Amazon AWS will be logged, you can search manually inside ``CloudTrail/API activity history`` also every 7 min, one file .json will be saved in your bucket.

2. Create a user with at least read premission over S3
""""""""""""""""""""""""""""""""""""""""""""""""""""""
Sign in to the ``AWS Management Console`` and open the IAM console at https://console.aws.amazon.com/iam/.
In the navigation panel, choose ``Users`` and then choose ``Create New Users``.
Type the user names for the users to create. You can create up to five users at one time

.. note:: User names can use only a combination of alphanumeric characters and these characters: plus (+), equal (=), comma (,), period (.), at (@), and hyphen (-). Names must be unique within an account. For more information about limitations on IAM entities

The users require access to the API, AWS CLI then they must have access keys. To generate access key for new users at this time, select ``Generate an access key`` for each user.

Choose Create.

(Optional) To view the users' access keys (access key IDs and secret access keys), choose ``Show User Security Credentials``. To save the access keys, choose ``Download Credentials`` and then save the file to a safe location on your computer.

.. warning:: This is your only opportunity to view or download the secret access keys, and you must provide this information to your users before they can use the AWS API. If you don't download and save them now, you will need to create new access keys for the users later. Save the user's new access key ID and secret access key in a safe and secure place. You will not have access to the secret access keys again after this step.

Give the user(s) permission to manage security policies, press ``Attach Policy`` and select at least ``AmazonS3ReadOnlyAccess`` policy 


3. Install AWS Cli in your Ossec Manager
""""""""""""""""""""""""""""""""""""""""

For download and process the Amazon AWS logs that already are archived in S3 Bucket we need to install AWS Cli in your sistem and configure it for use with AWS

The AWS CLI comes pre-installed on the ``Amazon Linux AMI``. Run ``sudo yum update`` after connecting to the instance to get the latest version of the package available via yum. If you need a more recent version of the AWS CLI than what is available in the Amazon updates repository, uninstall the package (sudo yum remove aws-cli) and then install using pip.

Prerequisites for AWS CLI Using Pip

* Windows, Linux, OS X, or Unix
* Python 2 version 2.6.5+ or Python 3 version 3.3+
* Pip

If you don't have Python installed, install version 2.7 or 3.4 using one of the following methods:

Check to see if Python is already installed: ::

  $ python --version

If Python 2.7 or later is not installed, install it with your distribution's package manager. The command and package name varies:

* On Debian derivatives such as Ubuntu, use APT: ::

  $ sudo apt-get install python2.7

* On Red Hat and derivatives, use yum: ::

  $ sudo yum install python27

Open a command prompt or shell and run the following command to verify that Python installed correctly: ::

  $ python --version
  Python 2.7.9

To install pip on Linux

* Download the installation script from pypa.io: ::
  
  $ curl -O https://bootstrap.pypa.io/get-pip.py

* Run the script with Python: ::
  
  $ sudo python get-pip.py

With Python and pip installed, use pip to install the AWS CLI: ::

  $ sudo pip install awscli

.. note:: If you installed a new version of Python alongside an older version that came with your distribution, or update pip to the latest version, you may get an error like the following when trying to invoke pip with sudo and the result is ``command not found`` to work around this issue, use ``which pip`` to locate the executable, and then invoke it directly by using an absolute path when installing the AWS CLI:

  ``$ which pip`` 

  ``/usr/local/bin/pip``

  ``$ sudo /usr/local/bin/pip install awscli``

To upgrade an existing AWS CLI installation, use the ``--upgrade`` option: ::

  $ sudo pip install --upgrade awscli


4. Configure user credentials  with AWS Cli
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For example, the following command includes user input, replaceable text, and output: ::

  $ sudo aws configure
  AWS Access Key ID [None]: ``AKIAIOSFODNN7EXAMPLE``
  AWS Secret Access Key [None]: ``wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY``
  Default region name [None]: ENTER
  Default output format [None]: ENTER

To use this example, type ``aws configure`` at the command line and press ``Enter``. ``aws configure`` is the command. This command is interactive, so the AWS CLI outputs lines of texts, prompting you to enter additional information. Enter each of your access keys in turn and press ``Enter``. Then, a region name is not necessary, press Enter, and press Enter a final time to skip the output format setting. The final Enter command is shown as replaceable text because there is no user input for that line. Otherwise, it would be implied.

5. Run a python script for download the JSON data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For donwload the JSON file from S3 Bucket and convert a flat file to be used under Ossec we use a python script original from Xavier Martens @xme with a minor modifications.

The commando for use this script is: ::

  $ ./getawslog.py -b ``s3bucketname`` -d -j -D -l ``/var/log/amazon/amazon.log``

Where ``s3bucketname`` is the bucket name created when CloudTrail was activated and ``/var/log/amazon/amazon.log`` the path for after convert the JSON file export the logs.

CloudTrail delivers log files to your S3 bucket approximately every 5 minutes. CloudTrail does not deliver log files if no API calls are made on your account so you can run the script every 5 min or more adding a crontab job to your system.

Run ``vi /etc/crontab`` and, at the end of the file, add the following line ::

  */5 *   * * *   root    python path_to_script/getawslog.py -b s3bucketname -d -j -D -l /var/log/amazon/amazon.log


.. note:: This script download and delete the files from your S3 Bucket, but the you can review the last 7 days logs through CloudTrail.


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
