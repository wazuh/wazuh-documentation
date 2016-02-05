.. _ossec_amazon:

OSSEC Amazon
============

Iam Use cases
^^^^^^^^^^^^^

A simple business use case for ``Ruleset IAM`` can help you understand basic ways you might implement the service to control the AWS access your users have with Ossec.

To start we can add a new user account to Amazon AWS, after the account creation Ossec will apply the rule ``80861`` as you see bellow::

    <rule id="80861" level="2">
        <if_sid>80860</if_sid>
        <action>CreateUser</action>
        <description>Amazon-iam: User created</description>
        <group>amazon,pci_dss_10.2.5,</group>
    </rule>

Kibana dispays the next:

.. image:: images/aws/aws-login-1.png
    :align: center
    :width: 100%


If the user don't have enought permission for create account Ossec will apply the rule ``8062`` as you see bellow::

    <rule id="80862" level="5">
        <if_sid>80861</if_sid>
        <match>"errorCode":"AccessDenied"</match>
        <description>Amazon-iam: User creation denied</description>
        <group>amazon,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>


Kibana dispays the next:

.. image:: images/aws/aws-login-2.png
    :align: center
    :width: 100%

As example in this scenario one user try to login in the system but has a error in the password,  Ossec will apply the rule ``80802`` as you see below::

      <rule id="80802" level="5">
        <if_sid>80801</if_sid>
        <match>'ConsoleLogin': u'Failure'</match>
        <description>Amazon-signin: User Login failed</description>
        <group>amazon,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

Kibana dispays the next:

.. image:: images/aws/aws-login-3.png
    :align: center
    :width: 100%

If the user has more than four incorrect access in less than 360 seconds ssec will apply the rule ``80802`` as you see below::

    <rule id="80803" level="10" frequency="4" timeframe="360">
        <if_matched_sid>80802</if_matched_sid>
        <description>Possible breakin attempt (high number of login attempts).</description>
        <group>amazon,authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

Kibana dispays the next:

.. image:: images/aws/aws-login-4.png
    :align: center
    :width: 100%

