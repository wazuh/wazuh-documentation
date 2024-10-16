.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon ALB service to integrate with Wazuh.

Amazon ALB
==========

`Application Load Balancers <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html>`__ (Amazon ALB) Elastic Load Balancing automatically distributes the incoming traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones. It monitors the health of its registered targets and routes traffic only to the healthy targets. Users can select the type of load balancer that best suits their needs. An Application Load Balancer functions at the application layer, the seventh layer of the Open Systems Interconnection (OSI) model. After the load balancer receives a request, it evaluates the listener rules in priority order to determine which rule to apply then selects a target from the target group for the rule action.

AWS configuration
-----------------

The following sections cover how to configure the Amazon ALB service to integrate with Wazuh.

Amazon ALB configuration
^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `S3 buckets <https://s3.console.aws.amazon.com/>`__, copy the name of an existing S3 bucket or :doc:`create a new one <../../prerequisites/S3-bucket>`.
#. On your AWS console, search for "*EC2*" or go to **Services** > **Compute** > **EC2**.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/alb/01-search-for-ec2.png
      :align: center
      :width: 80%

#. Go to **Load Balancing** > **Load Balancers** on the left menu. Create a new load balancer or select one or more load balancers and select **Edit load balancer attributes** on the **Actions** menu.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/alb/02-edit-load-balancer-attributes.png
      :align: center
      :width: 80%

#. In the **Monitoring** tab, enable **Access logs** and define the S3 bucket and the path where the logs will be stored.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/alb/03-enable-access-logs.png
      :align: center
      :width: 80%

   .. note::

      To enable access logs for ALB (Application Load Balancers), check the following link:

      -  `Application Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html>`__.

.. _alb_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon ALB logs
------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/alb/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/alb/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="alb">
          <name><WAZUH_AWS_BUCKET></name>
          <path>ALB</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

#. Save the changes and restart Wazuh to apply the changes. The service can be manually restarted using the following command outside the Wazuh dashboard:

   -  Wazuh manager:

      .. code-block:: console

         # systemctl restart wazuh-manager

   -  Wazuh agent:

      .. code-block:: console

         # systemctl restart wazuh-agent
