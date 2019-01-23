.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_guardduty_usecases:

GuarDuty use cases
------------------

- `Brute force attacks`_
- `EC2 API Calls made from unsual network`_
- `Compromised EC2 instance`_

Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the cloud. When using this service, it is highly recommended to monitor it for intrusion attempts or other unauthorized actions performed against your cloud infrastructure.

Below are some use cases for Wazuh rules built for EC2.

Brute force attacks
^^^^^^^^^^^^^^^^^^^

If an instance has any open port which is receiving a brute force attack, the following alert will be shown on Kibana. It shows information about the attacked host, about the attacker and which port is being attacked:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty.png
  :align: center
  :width: 70%

EC2 API Calls made from unsual network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If an API call is made from an unsual network, the following alert will be shown on Kibana. It shows the location of the unusual network, the user who did the API calls and which API calls it did:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty2.png
  :align: center
  :width: 70%

Compromised EC2 instance
^^^^^^^^^^^^^^^^^^^^^^^^

If there is any indicator of a compromised EC2 instance, an alert will be shown on Kibana explaining what's happening. Some example of alerts are shown below:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty3.png
  :align: center
  :width: 70%

.. thumbnail:: ../../images/aws/aws-ec2-guardduty4.png
  :align: center
  :width: 70%

.. thumbnail:: ../../images/aws/aws-ec2-guardduty5.png
  :align: center
  :width: 70%

To sum up, the following screenshot shows some alerts generated for a compromised EC2 instance:

.. thumbnail:: ../../images/aws/aws-ec2-guardduty6.png
  :align: center
  :width: 70%

And here are the Kibana dashboards for EC2 events:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../images/aws/aws-ec2-pannels-1.png    | .. thumbnail:: ../../images/aws/aws-ec2-pannels-2.png      |
|    :align: center                                        |    :align: center                                          |
|    :width: 70%                                           |    :width: 70%                                             |
+----------------------------------------------------------+------------------------------------------------------------+
