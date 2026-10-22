.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon CLB service to integrate with Wazuh.

Amazon CLB
==========

`Classic Load Balancers <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html>`__ (Amazon CLB) are one of the load balancer types that Elastic Load Balancing offers. A Classic Load Balancer distributes incoming traffic across its registered EC2 instances in one or more Availability Zones, and routes traffic only to the healthy instances. It makes routing decisions at either the transport layer (TCP/SSL) or the application layer (HTTP/HTTPS).

AWS configuration
-----------------

The following sections cover how to configure the Amazon CLB service to integrate with Wazuh.

Amazon CLB configuration
^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `S3 buckets <https://s3.console.aws.amazon.com/>`__, copy the name of an existing S3 bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`. The bucket needs a bucket policy that allows Elastic Load Balancing to write the access logs. The AWS documentation in the note below gives the policy to use.

#. On your AWS console, search for ``ec2`` in the search bar or go to **Services** > **Compute** > **EC2**.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/01-search-for-ec2.png
      :title: Search for EC2 in the AWS console
      :alt: Search for EC2 in the AWS console
      :align: center
      :width: 80%

#. Go to **Load Balancing** > **Load Balancers** on the left menu. Create a new load balancer or select one or more load balancers and select **Edit load balancer attributes** on the **Actions** menu.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/02-edit-load-balancer-attributes.png
      :title: Edit load balancer attributes
      :alt: Edit load balancer attributes
      :align: center
      :width: 80%

#. In the **Monitoring** tab, enable **Access logs**, and then define the S3 bucket and the path where the logs are stored. The Wazuh configuration below uses ``CLB`` as the path. If you enter a different path, set the ``<path>`` value to match it.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/03-enable-access-logs.png
      :title: Enable CLB access logs
      :alt: Enable CLB access logs
      :align: center
      :width: 80%

   .. note::

      To enable access logs and add the bucket policy that Elastic Load Balancing needs, see `Enable access logs for your Classic Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html>`__.

.. _clb_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/bucket_policies.rst

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon CLB logs
------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket that stores the CLB access logs. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

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

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

CLB use case
------------

Monitoring backend errors
^^^^^^^^^^^^^^^^^^^^^^^^^

A request through the Classic Load Balancer can fail, for example, with HTTP ``503`` when no registered instance is healthy. The Wazuh dashboard then shows the AWS Classic Load Balancer backend error finding. To see these findings, go to **Amazon Web Services** > **Findings**.

.. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/1-monitoring-backend-errors.png
   :title: CLB backend error findings
   :alt: CLB backend error findings
   :align: center
   :width: 80%

Expand a finding to see its details:

-  HTTP status code (``http.response.status_code``)
-  Request method and path (``http.request.method`` and ``url.path``)
-  Full request URL (``url.original``)
-  Client address and port (``source.address`` and ``source.port``)
-  Load balancer name (``observer.name``)
-  User agent (``user_agent.original``)

.. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/clb/2-monitoring-backend-errors.png
   :title: CLB finding details
   :alt: CLB finding details
   :align: center
   :width: 80%
