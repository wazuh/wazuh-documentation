.. Copyright (C) 2018 Wazuh, Inc.

.. _amazon_use-cases_iam:

IAM use cases
=============

AWS Identity and Access Management (IAM) log data can be used to monitor user access to AWS services and resources. Using IAM, you can create and manage AWS users and groups, and manage permissions to allow and deny their access to AWS resources.

Below are some use cases for Wazuh alerts built used for IAM events.

Create user account
-------------------

When we create a new user account in IAM, an AWS event is generated. As previously mentioned, the log message is collected by the Wazuh agent, and forwarded to the manager for analysis. When an user account is created, the following alert will appear on Kibana. You can see the username of the created user and who created it:

.. thumbnail:: ../../images/aws/aws-login-1.png
    :align: center
    :width: 100%

Create user account without permissions
---------------------------------------

If an unauthorized user attempts to create new users, the following alert will be shown in kibana. It will show you which user has tried to create an user account and the username it tried to create:

.. thumbnail:: ../../images/aws/aws-login-2.png
    :align: center
    :width: 100%

User login failed
-------------------

When a user tries to log in with an invalid password, the following alert will be shown in Kibana. There will be shown data such as the user who tried to login or the browser it was using:

.. thumbnail:: ../../images/aws/aws-login-3.png
    :align: center
    :width: 100%

Possible break-in attempt
-------------------------

When more than 4 authentication failures occur in a **360** second time window, Wazuh raises this alert:

.. thumbnail:: ../../images/aws/aws-login-4.png
    :align: center
    :width: 100%

Login success
-------------

After a successful login, the following event will be shown in Kibana. It shows the user who logged in, the browser it used and many other useful information:

.. thumbnail:: ../../images/aws/aws-login-5.png
    :align: center
    :width: 100%

And here are the Kibana dashboards for IAM events:

+----------------------------------------------------------+------------------------------------------------------------+
| Pie Chart                                                | Stacked Groups                                             |
+==========================================================+============================================================+
| .. thumbnail:: ../../images/aws/aws-iam-pannels-1.png    | .. thumbnail:: ../../images/aws/aws-iam-pannels-2.png      |
|    :align: center                                        |    :align: center                                          |
|    :width: 100%                                          |    :width: 100%                                            |
+----------------------------------------------------------+------------------------------------------------------------+
