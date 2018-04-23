.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_use-cases_vpc:

VPC Use cases
=============

Using an Amazon VPC (Virtual Private Cloud), you can logically isolate some of your AWS assets from the rest of your cloud infrastructure. You can actually set up your own networks in the cloud. This is why, it is usually important to monitor changes to your VPCs.

Create a VPC
------------

If a VPC is created, rule ``81000`` will match and an alert will be generated as shown below:

+------------------------------------------------------------------------+
|**Definition of rule 81000**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="81000" level="2">                                           |
|      <if_sid>80300</if_sid>                                            |
|      <action>CreateVpc</action>                                        |
|      <description>Amazon-vpc: Vpc Created</description>                |
|      <group>amazon,pci_dss_10.6.1,</group>                             |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-vpc-1.png                           |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+

If a user without proper permissions attempts to create a VPC, rule ``81001`` will match, triggering an alert:

+-------------------------------------------------------------------------------+
|**Definition of rule 81001**                                                   |
+-------------------------------------------------------------------------------+
|::                                                                             |
|                                                                               |
|  <rule id="81001" level="5">                                                  |
|      <if_sid>81000</if_sid>                                                   |
|      <match>"errorCode":"Client.UnauthorizedOperation"</match>                |
|      <description>Amazon-Vpc: Vpc Created Unauthorized Operation</description>|
|      <group>amazon,pci_dss_10.6.1,</group>                                    |
|  </rule>                                                                      |
+-------------------------------------------------------------------------------+
|    **Kibana will show this alert**                                            |
+-------------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-vpc-2.png                                  |
|    :align: center                                                             |
|    :width: 100%                                                               |
+-------------------------------------------------------------------------------+
