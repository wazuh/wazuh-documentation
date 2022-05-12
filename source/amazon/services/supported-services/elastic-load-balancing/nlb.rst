.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: AWS Classic Load Balancer is a service that distributes incoming application traffic across multiple targets. Learn how to configure and monitor it with Wazuh.

.. _amazon_nlb:

Amazon NLB
==========

`Network Load Balancers <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html>`_ (Amazon NLB) Elastic Load Balancing automatically distributes the incoming traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones. It monitors the health of its registered targets and routes traffic only to the healthy targets. Users can select the type of load balancer that best suits their needs. A Network Load Balancer functions at the fourth layer of the Open Systems Interconnection (OSI) model. It can handle millions of requests per second. After the load balancer receives a connection request, it selects a target from the target group for the default rule. It attempts to open a TCP connection to the selected target on the port specified in the listener configuration.

Amazon configuration
--------------------

#. Select an existing S3 Bucket or :ref:`create a new one. <S3_bucket>`

#. Go to Services > Compute > EC2:

    .. thumbnail:: ../../../../images/aws/aws-create-vpc-1.png
      :align: center
      :width: 70%

#. Go to Load Balancing > Load Balancers on the left menu. Create a new load balancer or select one or more load balancers and select *Edit attributes* on the *Actions* menu:

    .. thumbnail:: ../../../../images/aws/aws-create-elb-1.png
      :align: center
      :width: 70%

#. In this tab we will define our S3 and the path where the logs will be stored:

    .. thumbnail:: ../../../../images/aws/aws-create-elb-2.png
      :align: center
      :width: 70%

    .. note::
      To enable access logs for NLB (Network Load Balancers), check the following link:

        * `Network Load Balancer. <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-access-logs.html>`_

Policy configuration
++++++++++++++++++++

.. include:: /_templates/cloud/amazon/create_policy.rst
.. include:: /_templates/cloud/amazon/bucket_policies.rst
.. include:: /_templates/cloud/amazon/attach_policy.rst

Wazuh configuration
-------------------

#. Open the Wazuh configuration file (``/var/ossec/etc/ossec.conf``) and add the following block for NLB:

    .. code-block:: xml

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="nlb">
          <name>wazuh-aws-wodle</name>
          <path>NLB</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

    .. note::
      Check the :ref:`AWS S3 module <wodle_s3>` reference manual to learn more about each setting.

#. Restart Wazuh in order to apply the changes:

    * If you're configuring a Wazuh manager:

      a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-manager

      b. For SysV Init:

      .. code-block:: console

        # service wazuh-manager restart

    * If you're configuring a Wazuh agent:

      a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-agent

      b. For SysV Init:

      .. code-block:: console

        # service wazuh-agent restart
