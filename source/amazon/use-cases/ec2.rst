.. _amazon_use-cases_ec2:

EC2 use cases
=============

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud.  When using a service like this, it is highly desirable to monitor for attacks or other unauthorized actions being performed against your cloud assets. With CloudTrail and Wazuh's EC2 event analysis capabilities, this is very possible.

Following are some use cases for Wazuh rules built in for EC2.

Run a new instance in EC2
-------------------------

When a user runs a new instance in EC2, an AWS event is generated.  As previously illustrated, the log message flows to the Wazuh agent which passes it on to Wazuh manager. The latter analyzes the log event and finds that it matches rule ``80301``, which results in an alert being generated, as can be seen in Kibana.

+----------------------------------------------------------------------+
|**Definition of rule 80301**                                          |
+----------------------------------------------------------------------+
|::                                                                    |
|                                                                      |
|  <rule id="80301" level="2">                                         |
|      <if_sid>80300</if_sid>                                          |
|      <action>RunInstances</action>                                   |
|      <description>Amazon-ec2: Run instance</description>             |
|      <group>amazon,pci_dss_10.6.1,</group>                           |
|  </rule>                                                             |
+----------------------------------------------------------------------+
|    **Kibana will show this alert**                                   |
+----------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-1.png                      |
|    :align: center                                                    |
|    :width: 100%                                                      |
+----------------------------------------------------------------------+

When a user tries to run an instance **without relevant permissions**, then the log message will match ``rule 80303`` and an alert will be generated as seen below:

+----------------------------------------------------------------------+
|**Definition of rule 80303**                                          |
+----------------------------------------------------------------------+
|::                                                                    |
|                                                                      |
|  <rule id="80301" level="2">                                         |
|      <if_sid>80301</if_sid>                                          |
|      <match>"errorCode":"Client.UnauthorizedOperation"</match>       |
|      <description>Amazon-ec2: Run instance unauthorized</description>|
|      <group>amazon,pci_dss_10.6.1,</group>                           |
|  </rule>                                                             |
+----------------------------------------------------------------------+
|    **Kibana will show this alert**                                   |
+----------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-2.png                      |
|    :align: center                                                    |
|    :width: 100%                                                      |
+----------------------------------------------------------------------+

Start instances in EC2
-------------------------

When an instance in EC2 is started, the log message will match ``rule 80305`` and an alert will be generated as shown below:

+----------------------------------------------------------------------+
|**Definition of rule 80305**                                          |
+----------------------------------------------------------------------+
|::                                                                    |
|                                                                      |
|  <rule id="80305" level="2">                                         |
|      <if_sid>80300</if_sid>                                          |
|      <action>StartInstances</action>                                 |
|      <description>Amazon-ec2: Instance started</description>         |
|      <group>amazon,pci_dss_10.6.1,</group>                           |
|  </rule>                                                             |
+----------------------------------------------------------------------+
|    **Kibana will show this alert**                                   |
+----------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-3.png                      |
|    :align: center                                                    |
|    :width: 100%                                                      |
+----------------------------------------------------------------------+

If a user tries to start instances **without relevant permissions**, ``rule 80306`` will apply and an alert will be generated as shown below:

+------------------------------------------------------------------------+
|**Definition of rule 80306**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="80306" level="5">                                           |
|      <if_sid>80305</if_sid>                                            |
|      <match>"errorCode":"Client.UnauthorizedOperation"</match>         |
|      <description>Amazon-ec2: Start instance unauthorized</description>|
|      <group>amazon,pci_dss_10.6.1,</group>                             |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-4.png                        |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+

Stop instances in EC2
-------------------------

When an instance in EC2 is stopped, ``rule 80308`` will apply and an alert will be generated as shown below:

+------------------------------------------------------------------------+
|**Definition of rule 80308**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="80308" level="2">                                           |
|      <if_sid>80300</if_sid>                                            |
|      <action>StopInstances</action>                                    |
|      <description>Amazon-ec2: Instance stopped</description>           |
|      <group>amazon,pci_dss_10.6.1,</group>                             |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-5.png                        |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+

If a user tries to stop instances **without relevant permissions**, ``rule 80306`` will apply and an alert will be generated as shown below:

+------------------------------------------------------------------------+
|**Definition of rule 80309**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="80309" level="5">                                           |
|      <if_sid>80308</if_sid>                                            |
|      <action>StopInstances</action>                                    |
|      <match>"errorCode":"Client.UnauthorizedOperation"</match>         |
|      <description>Amazon-ec2: Stop instance unauthorized</description> |
|      <group>amazon,pci_dss_10.6.1,</group>                             |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-6.png                        |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+


Create Security Groups in EC2
-----------------------------

When a new security group is created, ``rule 80404`` will fire and an alert will be shown as follows:

+------------------------------------------------------------------------+
|**Definition of rule 80404**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="80404" level="2">                                           |
|      <if_sid>80300</if_sid>                                            |
|      <action>CreateSecurityGroup</action>                              |
|      <description>Amazon-ec2: Create Security Group</description>      |
|      <group>amazon,pci_dss_10.6.1,</group>                             |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-7.png                        |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+

Allocate a new Elastic IP address
---------------------------------

If a new Elastic IP is allocated, then ``rule 80411`` will apply:

+------------------------------------------------------------------------+
|**Definition of rule 80411**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="80411" level="2">                                           |
|      <if_sid>80300</if_sid>                                            |
|      <action>AllocateAddress</action>                                  |
|      <description>Amazon-ec2: Allocate Address</description>           |
|      <group>amazon,</group>                                            |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-8.png                        |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+

Associate a new Elastic IP address
----------------------------------

If an Elastic IP address is associated, then ``rule 80446`` will apply, generating the corresponding alert:

+------------------------------------------------------------------------+
|**Definition of rule 80446**                                            |
+------------------------------------------------------------------------+
|::                                                                      |
|                                                                        |
|  <rule id="80446" level="2">                                           |
|      <if_sid>80300</if_sid>                                            |
|      <action>AssociateAddress</action>                                 |
|      <description>Amazon-ec2: Associate Address</description>          |
|      <group>amazon,pci_dss_10.6.1,</group>                             |
|  </rule>                                                               |
+------------------------------------------------------------------------+
|    **Kibana will show this alert**                                     |
+------------------------------------------------------------------------+
|.. thumbnail:: ../../images/aws/aws-ec2-9.png                        |
|    :align: center                                                      |
|    :width: 100%                                                        |
+------------------------------------------------------------------------+

The Kibana Dashboards will show:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../images/aws/aws-ec2-pannels-1.png | .. thumbnail:: ../../images/aws/aws-ec2-pannels-2.png   |
|    :align: center                                        |    :align: center                                          |
|    :width: 100%                                          |    :width: 100%                                            |
+----------------------------------------------------------+------------------------------------------------------------+
