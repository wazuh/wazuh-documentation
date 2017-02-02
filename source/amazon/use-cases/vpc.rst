.. _amazon_use-cases_vpc:

VPC Use cases
--------------

Amazon Virtual Private Cloud (Amazon VPC) lets you provision a logically isolated section of the Amazon Web Services (AWS) Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.

Create VPC
++++++++++

If one VPC is created, the ``rule id 81000`` will apply and an alert will be generated as shown below:

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

If the user doesn't have permissions, the ``rule id 81001`` will apply:

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
