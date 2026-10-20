.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The following sections cover how to configure the Amazon NLB service to integrate with Wazuh.

Amazon NLB
==========

`Network Load Balancers <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html>`__ (Amazon NLB) are one of the load balancer types that Elastic Load Balancing offers. A Network Load Balancer functions at the fourth layer of the Open Systems Interconnection (OSI) model. It can handle millions of requests per second. After the load balancer receives a connection request, it selects a target from the target group for the default rule. It attempts to open a TCP connection to the selected target on the port specified in the listener configuration.

AWS configuration
-----------------

The following sections cover how to configure the Amazon NLB service to integrate with Wazuh.

Amazon NLB configuration
^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `S3 buckets <https://s3.console.aws.amazon.com/>`__, copy the name of an existing S3 bucket or :doc:`create a new one </cloud-security/amazon/services/prerequisites/S3-bucket>`. The bucket needs a bucket policy that allows Elastic Load Balancing to write the access logs. The AWS documentation in the note below gives the policy to use.

#. On your AWS console, search for ``ec2`` in the search bar or go to **Services** > **Compute** > **EC2**.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/nlb/01-search-for-ec2.png
      :title: Search for EC2 in the AWS console
      :alt: Search for EC2 in the AWS console
      :align: center
      :width: 80%

#. Go to **Load Balancing** > **Load Balancers** on the left menu. Create a new load balancer or select one or more load balancers and select **Edit load balancer attributes** on the **Actions** menu.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/nlb/02-edit-load-balancer-attributes.png
      :title: Edit load balancer attributes
      :alt: Edit load balancer attributes
      :align: center
      :width: 80%

#. In the **Monitoring** tab, enable **Access logs** and define the S3 bucket and the path where the logs are stored. Network Load Balancers write access logs only for TLS listeners, so the load balancer needs a TLS listener to produce logs. The Wazuh configuration below uses ``NLB`` as the path. If you enter a different path, set the ``<path>`` value to match it.

   .. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/nlb/03-enable-access-logs.png
      :title: Enable NLB access logs
      :alt: Enable NLB access logs
      :align: center
      :width: 80%

   .. note::

      To enable access logs and add the bucket policy that Elastic Load Balancing needs, see `Access logs for your Network Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-access-logs.html>`__.

.. _nlb_policy_configuration:

Policy configuration
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/cloud/amazon/create_policy.rst

.. include:: /_templates/cloud/amazon/bucket_policies.rst

Wazuh deletes the log files from the bucket only if you set ``remove_from_bucket`` to ``yes`` in the bucket configuration. This option is off by default and isn't in the sample configuration, so you need the second policy only if you turn it on.

.. include:: /_templates/cloud/amazon/attach_policy.rst

Configure Wazuh to process Amazon NLB logs
------------------------------------------

#. Make sure that the AWS integrations are enabled on the Wazuh dashboard, as described in :doc:`Enable AWS integration on the Wazuh dashboard </cloud-security/amazon/services/prerequisites/enabling-integration>`.
#. Add the following :doc:`Wazuh module for AWS </user-manual/reference/ossec-conf/wodle-s3>` configuration to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent. Replace ``<WAZUH_AWS_BUCKET>`` with the name of the S3 bucket that stores the NLB access logs. If the file already has a ``<wodle name="aws-s3">`` block, add only the ``<bucket>`` section to it:

   .. code-block:: xml
      :emphasize-lines: 7

      <wodle name="aws-s3">
        <disabled>no</disabled>
        <interval>10m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>yes</skip_on_error>
        <bucket type="nlb">
          <name><WAZUH_AWS_BUCKET></name>
          <path>NLB</path>
          <aws_profile>default</aws_profile>
        </bucket>
      </wodle>

   .. note::

      This example uses the ``aws_profile`` authentication parameter. Check the :doc:`Configure AWS credentials </cloud-security/amazon/services/prerequisites/credentials>` section to learn more about the different authentication options and how to use them.

#. Save the changes and restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

NLB use case
------------

Monitoring TLS connections
^^^^^^^^^^^^^^^^^^^^^^^^^^

Network Load Balancer access logs record the TLS connections to the load balancer, and they appear as events on the Wazuh dashboard. To see them, go to **Explore** > **Discover**, select the ``wazuh-events-v5*`` index pattern, and filter by ``observer.type: tls``. These events don't raise findings.

.. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/nlb/1-monitoring-tls-connections.png
   :title: NLB TLS connection events
   :alt: NLB TLS connection events
   :align: center
   :width: 80%

Expand an event to see its details:

-  Load balancer (``observer.name``)
-  Client address and port (``source.address`` and ``source.port``)
-  Target address and port (``destination.ip`` and ``destination.port``)
-  TLS version and cipher (``tls.version`` and ``tls.cipher``)
-  Key exchange group (``tls.curve``)
-  Domain name the client connected to (``destination.domain``)
-  Bytes sent and received (``source.bytes`` and ``destination.bytes``)

.. thumbnail:: /images/cloud-security/aws/elastic-load-balancers/nlb/2-monitoring-tls-connections.png
   :title: NLB TLS connection event details
   :alt: NLB TLS connection event details
   :align: center
   :width: 80%
