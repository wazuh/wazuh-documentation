.. _ossec_amazon:

OSSEC Amazon
************
Ruleset Installation
====================

Before installing our Amazon rules, you need to follow the steps below in order to enable logging through AWS API and download the JSON data files. A detailed description of each of the steps will be find further below. 

1. Turn on CloudTrail.
2. Create a user with permission over S3.
3. Install AWS Cli in your Ossec Manager.
4. Configure the previous user credentials  with AWS Cli in your Ossec Manager.
5. Run a python script to download JSON data in gzipped files logs and convert it into a flat file.
6. Install Wazuh Amazon rules.

1.- Turn on CloudTrail
----------------------

In this section you will learn how to create a trail for your AWS account. Trails can be created using the AWS CloudTrail console or the AWS Command Line Interface (AWS CLI). Both methods follow the same steps but we will be focusing on the first one:

* Turn on ``CloudTrail``. By default, when creating a trail in one region in the CloudTrail console, this one will apply to all regions.

* Create a new Amazon S3 bucket for storing your log files, or specify an existing bucket where you want your log files to be stored. By default, log files from all AWS regions in your account will be stored in the bucket you specified.

S3 bucket name is common for all amazon users, don't worry if you get this error ``Bucket already exists. Select a different bucket name.``, even if you don't have any bucket created before.

From now on all your actions in Amazon AWS console will be logged. You can search logs manually inside ``CloudTrail/API activity history``. Also, notice that every 7 min a .json file will be stored in your bucket.

2. Create a user with permission over S3
----------------------------------------

Sign in to the ``AWS Management Console`` and open the IAM console at https://console.aws.amazon.com/iam/.
In the navigation panel, choose ``Users`` and then choose ``Create New Users``.
Type the user names for the users you would like to create. You can create up to five users at one time.

.. note:: User names can only use a combination of alphanumeric characters and these characters: plus (+), equal (=), comma (,), period (.), at (@), and hyphen (-). Names must be unique within an account. 

The users require access to the API. For this they must have access keys. To generate access key for new users, select ``Generate an access key`` for each user and ``Choose Create``.

(Optional) To view users' access keys (access key IDs and secret access keys), choose ``Show User Security Credentials``. To save the access keys, choose ``Download Credentials`` and then save the file to a safe location on your computer.

.. warning:: This is your only opportunity to view or download the secret access keys, and you must provide this information to your users before they can use the AWS Console. If you don't download and save them now, you will need to create new access keys for the users later. Save the new user's access key ID and secret access key in a safe and secure place. You will not have access to the secret access keys again after this step.

Give the user(s) permission to manage security policies, press ``Attach Policy`` and select ``AmazonS3FullAccess`` policy. 


3. Install AWS Cli in your Ossec Manager
----------------------------------------

To download and process the Amazon AWS logs that already are archived in S3 Bucket we need to install AWS Cli in your system and configure it to use with AWS.

The AWS CLI comes pre-installed on the ``Amazon Linux AMI``. Run ``$ sudo yum update`` after connecting to the instance to get the latest version of the package available via yum. If you need a more recent version of the AWS CLI than the available in the Amazon updates repository, uninstall the package ``$ sudo yum remove aws-cli`` and then install using pip as follows.

Prerequisites for AWS CLI Using Pip

* Windows, Linux, OS X, or Unix
* Python 2 version 2.6.5+ or Python 3 version 3.3+
* Pip

If you don't have Python installed, install version 2.7 or 3.4 using one of the following methods:

Check if Python is already installed: ::

  $ python --version

If Python 2.7 or later is not installed, install it with your distribution's package manager. The command and package name varies:

* On Debian derivatives such as Ubuntu, use APT: ::

  $ sudo apt-get install python2.7

* On Red Hat and derivatives, use yum: ::

  $ sudo yum install python27

Open a command prompt or shell and run the following command to verify that Python has been installed correctly: ::

  $ python --version
  Python 2.7.9

To install pip on Linux

* Download the installation script from pypa.io: ::
  
  $ curl -O https://bootstrap.pypa.io/get-pip.py

* Run the script with Python: ::
  
  $ sudo python get-pip.py

Now than we have Python and pip installed, use pip to install the AWS CLI: ::

  $ sudo pip install awscli

.. note:: If you installed a new version of Python alongside an older version that came with your distribution, or update pip to the latest version, you may get the following error when trying to invoke pip with sudo: ``command not found``. We can work around this issue by using ``which pip`` to locate the executable, and then invoke it directly by using an absolute path when installing the AWS CLI:

  ``$ which pip`` 

  ``/usr/local/bin/pip``

  ``$ sudo /usr/local/bin/pip install awscli``

To upgrade an existing AWS CLI installation, use the ``--upgrade`` option: ::

  $ sudo pip install --upgrade awscli


4. Configure user credentials  with AWS Cli
-------------------------------------------

To configure the user credentials type: ::

  $ sudo aws configure

This command is interactive, prompting you to enter additional information. Enter each of your access keys in turns and press ``Enter``. Region name is not necessary, press Enter, and press Enter once again to skip the output format setting. The latest Enter command is shown as replaceable text because there is no user input for that line.

The result should be something like this: ::

  AWS Access Key ID [None]: ``AKIAIOSFODNN7EXAMPLE``
  AWS Secret Access Key [None]: ``wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY``
  Default region name [None]: ENTER
  Default output format [None]: ENTER

5. Run a python script for download the JSON data
-------------------------------------------------

To download the JSON file from S3 Bucket and convert it into a flat file to be used with Ossec, we use a python script written by Xavier Martens @xme with  minor modifications done by Wazuh. The script is located in our repository at ``wazuh/ossec-rules/tools/amazon/getawslog.py``.

The command to use this script is: ::

  $ ./getawslog.py -b s3bucketname -d -j -D -l /var/log/amazon/amazon.log

Where ``s3bucketname`` is the name of the bucket created when CloudTrail was activated and ``/var/log/amazon/amazon.log`` is the path where the log is stored after being converted by the script.

.. note:: In case you don't want to use an existing folder, then the folder where the log is stored need to be created manually before starting the script.

CloudTrail delivers log files to your S3 bucket approximately every 5 minutes. CloudTrail does not deliver log files if no API calls are made on your account so you can run the script every 5 min or more adding a crontab job to your system.

.. note:: If after executing the first time ``getawslog.py`` the result is:

  ``Traceback (most recent call last):``

  ``File "/root/script/getawslog.py", line 16, in <module>``

    ``import boto``

  ``ImportError: No module named boto``

  To work around this issue install the module named boto, use this command ``$ sudo pip install boto``

Run ``vi /etc/crontab`` and, at the end of the file, add the following line ::

  */5 *   * * *   root    python path_to_script/getawslog.py -b s3bucketname -d -j -D -l /var/log/amazon/amazon.log


.. note:: This script downloads and deletes the files from your S3 Bucket, but you can always review the last 7 days logs through CloudTrail.

6. Install Wazuh Amazon rules.
------------------------------

To install Wazuh Amazon rules follow either the `Automatic installation <http://documentation.wazuh.com/en/latest/ossec_ruleset.html#automatic-installation>`_ section or `Manual installation <http://documentation.wazuh.com/en/latest/ossec_ruleset.html#manual-installation>`_ section in this guide.

Use Cases
=========

Our Rules focuses on providing the desired visibility within the Amazon AWS platform, the next section we will show you some Use cases in the differenet Amazon AWS aplications.

Indicar que estas reglas solo afectan al trabajo con AWS API, cada instancia en Amazon EC2 tendrá que tener su Agente de Ossec corriendo como cualquier otro sistema para ser monitorizados por Ossec. 

Iam Use cases
-------------

AWS Identity and Access Management (IAM) enables you to securely control access to AWS services and resources for your users. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.

Few examples about how works Wazuh Ruleset in Amazon IAM

Create user account
+++++++++++++++++++

For start we can create a user account, after that will apply the ``rule id 80861``:: 

    <rule id="80861" level="2">
        <if_sid>80860</if_sid>
        <action>CreateUser</action>
        <description>Amazon-iam: User created</description>
        <group>amazon,pci_dss_10.2.5,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-login-1.png
    :align: center
    :width: 100%

Create user account without permissions
+++++++++++++++++++++++++++++++++++++++

If the user don't has permission to create new users will apply the ``rule id 80862``::

    <rule id="80862" level="5">
        <if_sid>80861</if_sid>
        <match>"errorCode":"AccessDenied"</match>
        <description>Amazon-iam: User creation denied</description>
        <group>amazon,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>


The Kibana pannels will show:

.. image:: images/aws/aws-login-2.png
    :align: center
    :width: 100%

User login failed
+++++++++++++++++

As example in this scenario one user try to login in the system but has a error in the password, in this case apply the ``rule id 80802``::

      <rule id="80802" level="5">
        <if_sid>80801</if_sid>
        <match>'ConsoleLogin': u'Failure'</match>
        <description>Amazon-signin: User Login failed</description>
        <group>amazon,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-login-3.png
    :align: center
    :width: 100%

Possible breakin attempt
++++++++++++++++++++++++

If we have more than 4 incorrect access in less than 360 second apply the ``rule id 80803``::

    <rule id="80803" level="10" frequency="4" timeframe="360">
        <if_matched_sid>80802</if_matched_sid>
        <description>Possible breakin attempt (high number of login attempts).</description>
        <group>amazon,authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-login-4.png
    :align: center
    :width: 100%


Login success
+++++++++++++

After a login success apply the ``rule id 80801``::

    <rule id="80801" level="2">
        <if_sid>80800</if_sid>
        <action>ConsoleLogin</action>
        <description>Amazon-signin: User Login Success</description>
        <group>amazon,authentication_success,pci_dss_10.2.5,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-login-5.png
    :align: center
    :width: 100%

The Kibana Dashboards will show:

.. image:: images/aws/aws-iam-pannels-1.png
    :align: center
    :width: 25%

.. image:: images/aws/aws-iam-pannels-2.png
    :align: center
    :width: 50%

EC2 Use cases
-------------

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

Amazon EC2's is simple web service interface allows you to obtain and configure capacity with minimal friction. It provides you with complete control of your computing resources and lets you run on Amazon's proven computing environment. Amazon EC2 reduces the time required to obtain and boot new server instances to minutes, allowing you to quickly scale capacity, both up and down, as your computing requirements change. Amazon EC2 changes the economics of computing by allowing you to pay only for capacity that you actually use. Amazon EC2 provides developers the tools to build failure resilient applications and isolate themselves from common failure scenarios.

Few examples about how works Wazuh Ruleset in Amazon EC2's

Run a new instance in EC2
+++++++++++++++++++++++++

When one user run a new instance will apply the ``rule id 80301``::

    <rule id="80301" level="2">
        <if_sid>80300</if_sid>
        <action>RunInstances</action>
        <description>Amazon-ec2: Run instance</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>


The Kibana pannels will show:

.. image:: images/aws/aws-ec2-1.png
    :align: center
    :width: 100%

If one user without permissions for run instances try to run one will apply the ``rule id 80303``::

    <rule id="80303" level="5">
        <if_sid>80301</if_sid>
        <match>"errorCode":"Client.UnauthorizedOperation"</match>
        <description>Amazon-ec2: Run instance unauthorized</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-ec2-2.png
    :align: center
    :width: 100%

Start instances in EC2
++++++++++++++++++++++

When one instance in EC2 is Started, will apply the ``rule id 80305``::

    <rule id="80305" level="2">
        <if_sid>80300</if_sid>
        <action>StartInstances</action>
        <description>Amazon-ec2: Instance started</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-ec2-3.png
    :align: center
    :width: 100%

If one user without permissions for Start instances try to run one will apply the ``rule id 80306``::

    <rule id="80306" level="5">
        <if_sid>80305</if_sid>
        <match>"errorCode":"Client.UnauthorizedOperation"</match>
        <description>Amazon-ec2: Start instance unauthorized</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>


The Kibana pannels will show:

.. image:: images/aws/aws-ec2-4.png
    :align: center
    :width: 100%

Stop instances in EC2
+++++++++++++++++++++

When one instance in EC2 is Stoped, will apply the ``rule id 80308``::

    <rule id="80308" level="2">
        <if_sid>80300</if_sid>
        <action>StopInstances</action>
        <description>Amazon-ec2: Instance stopped</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The kibana pannels will show:

.. image:: images/aws/aws-ec2-5.png
    :align: center
    :width: 100%

If one user without permissions for Start instances try to run one will apply the ``rule id 80309``::

    <rule id="80309" level="5">
        <if_sid>80308</if_sid>
        <match>"errorCode":"Client.UnauthorizedOperation"</match>
        <description>Amazon-ec2: Stop instance unauthorized</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-ec2-6.png
    :align: center
    :width: 100%

Create Security Groups in EC2
+++++++++++++++++++++++++++++

If a security gruop is created will apply the ``rule id 80404``::

    <rule id="80404" level="2">
        <if_sid>80300</if_sid>
        <action>CreateSecurityGroup</action>
        <description>Amazon-ec2: Create Security Group</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-ec2-7.png
    :align: center
    :width: 100%

Allocate new address Elastic IP's
+++++++++++++++++++++++++++++++++

If one Elastic IP's is allocated will apply the rule ``rule id 80411``::

    <rule id="80411" level="2">
        <if_sid>80300</if_sid>
        <action>AllocateAddress</action>
        <description>Amazon-ec2: Allocate Address</description>
        <group>amazon,</group>
    </rule>


The Kibana pannels will show:

.. image:: images/aws/aws-ec2-8.png
    :align: center
    :width: 100%

Associate new Elastic IP's address
++++++++++++++++++++++++++++++++++

If one Elastic IP's is associated will apply the rule ``rule id 80446``::

    <rule id="80446" level="2">
        <if_sid>80300</if_sid>
        <action>AssociateAddress</action>
        <description>Amazon-ec2: Associate Address</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-ec2-9.png
    :align: center
    :width: 100%

VPC Use cases
-------------

Amazon Virtual Private Cloud (Amazon VPC) lets you provision a logically isolated section of the Amazon Web Services (AWS) Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.

Create VPC
++++++++++

If one VPC is created will apply the rule ``rule id 81000``::

    <rule id="81000" level="2">
        <if_sid>80300</if_sid>
        <action>CreateVpc</action>
        <description>Amazon-vpc: Vpc Created</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>

The Kibana pannels will show:

.. image:: images/aws/aws-vpc-1.png
    :align: center
    :width: 100%

If the user don't has permission will apply the ``rule id 81001``::

    <rule id="81001" level="5">
        <if_sid>81000</if_sid>
        <match>"errorCode":"Client.UnauthorizedOperation"</match>
        <description>Amazon-Vpc: Vpc Created Unauthorized Operation</description>
        <group>amazon,pci_dss_10.6.1,</group>
    </rule>


The Kibana pannels will show:

.. image:: images/aws/aws-vpc-2.png
    :align: center
    :width: 100%


Contribute to the ruleset
=========================

If you have created new rules, decoders or rootchecks and you would like to contribute to our repository, please fork our `Github repository <https://github.com/wazuh/ossec-rules>`_ and submit a pull request.

If you are not familiar with Github, you can also share them through our `users mailing list <https://groups.google.com/d/forum/wazuh>`_, to which you can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``. As well do not hesitate to request new rules or rootchecks that you would like to see running in OSSEC and our team will do our best to make it happen.

.. note:: In our repository you will find that most of the rules contain one or more groups called pci_dss_X. This is the PCI DSS control related to the rule. We have produced a document that can help you tag each rule with its corresponding PCI requirement: http://www.wazuh.com/resources/PCI_Tagging.pdf

What's next
===========

Once you have your ruleset up to date we encourage you to move forward and try out ELK integration or the API RESTful, check them on:


* :ref:`ELK Stack integration guide <ossec_elk>`
* :ref:`OSSEC Wazuh RESTful API installation Guide <ossec_api>`
