.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon CLB service to integrate with Wazuh.

Amazon CLB
==========

`Classic Load Balancers <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html>`__ (Amazon CLB) Elastic Load Balancing automatically distributes the incoming traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones. It monitors the health of its registered targets and routes traffic only to the healthy targets. Users can select the type of load balancer that best suits their needs. A Classic Load Balancer makes routing decisions at either the transport layer (TCP/SSL) or the application layer (HTTP/HTTPS). Classic Load Balancers currently require a fixed relationship between the load balancer port and the container instance port.

AWS configuration
-----------------

The following sections cover how to configure the Amazon CLB service to integrate with Wazuh.

Amazon CLB configuration
^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `S3 buckets <https://s3.console.aws.amazon.com/>`__, copy the name of an existing S3 bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`.
#. On your AWS console, search for "*EC2*" or go to **Services** > **Compute** > **EC2**.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/01-search-for-ec2.png
      :align: center
      :width: 80%

#. Go to **Load Balancing** > **Load Balancers** on the left menu. Create a new load balancer or select one or more load balancers and select **Edit load balancer attributes** on the **Actions** menu.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/02-edit-load-balancer-attributes.png
      :align: center
      :width: 80%

#. In the **Monitoring** tab define the S3 bucket and the path where the logs will be stored.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/03-enable-access-logs.png
      :align: center
      :width: 80%

   .. note::

      To enable access logs for CLB (Classic Load Balancers), check the following link:

      -  `Classic Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html>`__.

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon CLB logs
------------------------------------------

#. Access the Wazuh configuration in **Server management** > **Settings** using the Wazuh dashboard or by manually editing the ``/var/ossec/etc/ossec.conf`` file in the Wazuh server or agent.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/01-wazuh-configuration.png
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/02-wazuh-configuration.png
      :align: center
      :width: 80%

#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the file, replacing ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket:

   .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="clb">
          <name><WAZUH_AWS_BUCKET></name>
          <path>CLB</path>
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
