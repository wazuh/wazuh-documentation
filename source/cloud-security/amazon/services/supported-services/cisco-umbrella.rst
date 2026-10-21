.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Cisco Umbrella is a cloud-based Secure Internet Gateway that defends against internet-based threats. Learn how to monitor it with Wazuh.

Cisco Umbrella
==============

`Cisco Umbrella <https://umbrella.cisco.com/>`__ is a cloud-based Secure Internet Gateway (SIG) platform that provides you with multiple levels of defense against internet-based threats.

AWS configuration
-----------------

Cisco Umbrella configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To configure Cisco Umbrella, see the `Cisco Umbrella DNS User Guide <https://securitydocs.cisco.com/docs/umbrella-dns/olh/144276.ditamap>`__. You must configure Cisco Umbrella to export its logs to an Amazon S3 bucket. You can use one of these buckets:

-  Your own S3 bucket. See `Enable Logging to Your Own S3 Bucket <https://securitydocs.cisco.com/docs/umbrella-sig/olh/151697.dita>`__. Create the IAM policy described in :ref:`Policy configuration <umbrella_policy_configuration>`.
-  A Cisco-managed S3 bucket. See `Enable Logging to a Cisco-managed S3 Bucket <https://securitydocs.cisco.com/docs/umbrella-sig/olh/151696.dita>`__. You don't create an IAM policy. Instead, do the following:

   -  When Umbrella provisions the bucket, the **Admin** > **Log Management** page shows the data path, access key, and secret key. Copy the keys then, because Umbrella doesn't store them and requires rotating them every 90 days.
   -  Add the keys to a profile in the ``/root/.aws/credentials`` file on the Wazuh agent.
   -  In :ref:`Configure Wazuh to process Cisco Umbrella logs <umbrella_configure_wazuh>`, set ``<name>`` to the bucket in the data path, for example, ``cisco-managed-us-east-1``. Set ``<path>`` to the data path prefix followed by ``/dnslogs`` or ``/proxylogs``, for example, ``123456_abcdef0123456789/dnslogs``.

.. _umbrella_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

If you use a Cisco-managed bucket, skip this section. Follow the :ref:`create an AWS policy <creating_an_AWS_policy>` guide to create a policy using the Amazon Web Services console.

The policies below follow the principle of least privilege, so they give the AWS IAM user only the minimum permissions it needs.

.. include:: /_templates/cloud/amazon/bucket_policies.rst

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

.. include:: /_templates/cloud/amazon/attach_policy.rst

.. _umbrella_configure_wazuh:

Configure Wazuh to process Cisco Umbrella logs
----------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket that stores the Cisco Umbrella logs. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 9,15

      <wodle name="aws-s3">

        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>

        <bucket type="cisco_umbrella">
          <name><WAZUH_AWS_BUCKET></name>
          <path>dnslogs</path>
          <aws_profile>default</aws_profile>
        </bucket>

        <bucket type="cisco_umbrella">
          <name><WAZUH_AWS_BUCKET></name>
          <path>proxylogs</path>
          <aws_profile>default</aws_profile>
        </bucket>

      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes.

   .. code-block:: console

      # systemctl restart wazuh-agent
