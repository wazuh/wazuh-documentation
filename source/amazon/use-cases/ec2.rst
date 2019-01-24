.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_use-cases_ec2:

EC2 use cases
=============

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud.  When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

Run a new instance in EC2
-------------------------

When a user runs a new instance in EC2, an AWS event is generated.  As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the manager for analysis. The following alert will be shown in Kibana, it shows data such as instance type, the user who created it or creation date:

.. thumbnail:: ../../images/aws/aws-ec2-1.png
    :align: center
    :width: 85%

When a user tries to run an instance **without relevant permissions**, then the following alert will be shown in Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-2.png
    :align: center
    :width: 85%

Start instances in EC2
-------------------------

When an instance in EC2 is started, the following alert will be shown on Kibana, it shows information such as the instance id and the user who started it:

.. thumbnail:: ../../images/aws/aws-ec2-3.png
    :align: center
    :width: 85%

If a user tries to start instances **without relevant permissions** the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-4.png
    :align: center
    :width: 85%

Stop instances in EC2
-------------------------

When an instance in EC2 is stopped, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-5.png
    :align: center
    :width: 85%

If a user tries to stop instances **without relevant permissions**, the following alert wil be show on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-6.png
    :align: center
    :width: 85%


Create Security Groups in EC2
-----------------------------

When a new security group is created, the following alert is shown on Kibana. It shows information such as the user who created it and information about the security group:

.. thumbnail:: ../../images/aws/aws-ec2-7.png
    :align: center
    :width: 85%


Allocate a new Elastic IP address
---------------------------------

If a new Elastic IP is allocated, the following alert will be shown on Kibana:

.. thumbnail:: ../../images/aws/aws-ec2-8.png
    :align: center
    :width: 85%

Associate a new Elastic IP address
----------------------------------

If an Elastic IP address is associated, then rule ``80446`` will apply, generating the corresponding alert:

.. thumbnail:: ../../images/aws/aws-ec2-9.png
    :align: center
    :width: 85%

Brute force attacks
-------------------

If an instance has any open port which is receiving a brute force attack, the following alert will be shown on Kibana. It shows information about the attacked host, about the attacker and which port is being attacked:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty.png
    :align: center
    :width: 85%

EC2 API Calls made from unsual network
--------------------------------------

If an API call is made from an unsual network, the following alert will be shown on Kibana. It shows the location of the unusual network, the user who did the API calls and which API calls it did:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty2.png
    :align: center
    :width: 85%

Compromised EC2 instance
------------------------

If there is any indicator of a compromised EC2 instance, an alert will be shown on Kibana explaining what's happening. Some example of alerts are shown below:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty3.png
    :align: center
    :width: 85%

.. thumbnail:: ../../images/aws/aws-ec2-guardduty4.png
    :align: center
    :width: 85%

.. thumbnail:: ../../images/aws/aws-ec2-guardduty5.png
    :align: center
    :width: 85%

To sum up, the following screenshot shows some alerts generated for a compromised EC2 instance:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty6.png
    :align: center
    :width: 85%

And here are the Kibana dashboards for EC2 events:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../images/aws/aws-ec2-pannels-1.png    | .. thumbnail:: ../../images/aws/aws-ec2-pannels-2.png      |
|    :align: center                                        |    :align: center                                          |
|    :width: 85%                                          |    :width: 85%                                            |
+----------------------------------------------------------+------------------------------------------------------------+
