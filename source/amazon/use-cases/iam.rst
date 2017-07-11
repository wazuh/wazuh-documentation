.. _amazon_use-cases_iam:

IAM use cases
=============

AWS Identity and Access Management (IAM) enables you to securely control your users' access to AWS services and resources. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.

Following are some use cases for Wazuh rules built in for IAM events.


Create user account
-------------------

When we create a new user account in IAM, an AWS event is generated. As per the diagram at the beginning of this section, the log event flows to the Wazuh agent which passes it along to the Wazuh manager. The latter then analyzes the event and finds that it matches rule 80861. This results in an alert being generated, which can be seen in Kibana.

+----------------------------------------------------------------------+
|**Definition of rule 80861**                                          |
+----------------------------------------------------------------------+
|::                                                                    |
|                                                                      |
|  <rule id="80861" level="2">                                         |
|      <if_sid>80860</if_sid>                                          |
|      <action>CreateUser</action>                                     |
|      <description>Amazon-iam: User created</description>             |
|      <group>amazon,pci_dss_10.2.5,</group>                           |
|  </rule>                                                             |
+----------------------------------------------------------------------+
|    **Kibana will show this alert**                                   |
+----------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-login-1.png                       |
|    :align: center                                                    |
|    :width: 100%                                                      |
+----------------------------------------------------------------------+

Create user account without permissions
---------------------------------------

If a user without permission to create new users, attempts to create a new user, then the log message generated will match ``rule 80862`` and Kibana will show the alert as follows:

+----------------------------------------------------------------------+
|**Definition of rule 80862**                                          |
+----------------------------------------------------------------------+
|::                                                                    |
|                                                                      |
|  <rule id="80862" level="2">                                         |
|      <if_sid>80861</if_sid>                                          |
|      <match>"errorCode":"AccessDenied"</match>                       |
|      <description>Amazon-iam: User creation denied</description>     |
|      <group>amazon,pci_dss_10.2.4,pci_dss_10.2.5,</group>            |
|  </rule>                                                             |
+----------------------------------------------------------------------+
|    **Kibana will show this alert**                                   |
+----------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-login-2.png                       |
|    :align: center                                                    |
|    :width: 100%                                                      |
+----------------------------------------------------------------------+

User login failed
-------------------

When a user tries to log in with an invalid password, a new event and log message will be generated. This log message will match ``rule 80802``, generating an alert that will be shown in Kibana as follows:

+---------------------------------------------------------------------------------+
|**Definition of rule 80802**                                                     |
+---------------------------------------------------------------------------------+
|::                                                                               |
|                                                                                 |
|  <rule id="80802" level="2">                                                    |
|      <if_sid>80801</if_sid>                                                     |
|      <match>'ConsoleLogin': u'Failure'</match>                                  |
|      <description>Amazon-signin: User Login failed</description>                |
|      <group>amazon,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group> |
|  </rule>                                                                        |
+---------------------------------------------------------------------------------+
|    **Kibana will show this alert**                                              |
+---------------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-login-3.png                                  |
|    :align: center                                                               |
|    :width: 100%                                                                 |
+---------------------------------------------------------------------------------+

Possible break-in attempt
-------------------------

When more than 4 authentication failures occur in a **360** second time window, this fires ``rule 80803`` and generates an alert.

+-----------------------------------------------------------------------------------------------+
|**Definition of rule 80803**                                                                   |
+-----------------------------------------------------------------------------------------------+
|::                                                                                             |
|                                                                                               |
|  <rule id="80803" level="10" frequency="4" timeframe="360">                                   |
|      <if_matched_sid>80802</if_matched_sid>                                                   |
|      <description>Possible breakin attempt (high number of login attempts).</description>     |
|      <group>amazon,authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>|
|  </rule>                                                                                      |
+-----------------------------------------------------------------------------------------------+
|    **Kibana will show this alert**                                                            |
+-----------------------------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-login-4.png                                                |
|    :align: center                                                                             |
|    :width: 100%                                                                               |
+-----------------------------------------------------------------------------------------------+

Login success
-------------

After a successful login, the ``rule 80801`` will match the log message generated by this event and a new alert will be shown in Kibana:

+----------------------------------------------------------------------+
|**Definition of rule 80801**                                          |
+----------------------------------------------------------------------+
|::                                                                    |
|                                                                      |
|  <rule id="80801" level="2">                                         |
|      <if_sid>80800</if_sid>                                          |
|      <action>ConsoleLogin</action>                                   |
|      <description>Amazon-signin: User Login Success</description>    |
|      <group>amazon,authentication_success,pci_dss_10.2.5,</group>    |
|  </rule>                                                             |
+----------------------------------------------------------------------+
|    **Kibana will show this alert**                                   |
+----------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-login-5.png                       |
|    :align: center                                                    |
|    :width: 100%                                                      |
+----------------------------------------------------------------------+

The Kibana Dashboards will show:

+-------------------------------------------------------+------------------------------------------------------+
| Pie Chart                                             | Stacked Groups                                       |
+=======================================================+======================================================+
| .. thumbnail:: ../../images/aws/aws-iam-pannels-1.png | .. thumbnail:: ../../images/aws/aws-iam-pannels-2.png|
|    :align: center                                     |    :align: center                                    |
|    :width: 100%                                       |    :width: 100%                                      |
+-------------------------------------------------------+------------------------------------------------------+
