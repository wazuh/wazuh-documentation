.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to enable the AWS integrations on the Wazuh dashboard so that Wazuh generates findings from the AWS logs it collects.

Enable AWS integration on the Wazuh dashboard
=============================================

An integration is a logical grouping of decoders, key-value databases (KVDBs), and rules that belong to a common log source or product. Integrations are the unit at which content is organized, enabled, and ordered. The AWS integrations are disabled by default. You must enable them before you configure any AWS service; otherwise, Wazuh doesn't generate findings from the AWS logs it collects. Follow these steps to enable them.

#. Navigate to the **Ruleset Management** > **Overview** page and make sure you are in the **Standard** space.

#. Search for ``aws`` and click **aws** to open the integration.

   .. thumbnail:: /images/cloud-security/aws/enable-aws-integration/search-aws-integration.png
      :title: Search for the AWS integration
      :alt: Search for the AWS integration
      :align: center
      :width: 80%

#. On the integration page, click **Actions** > **Enable**.

   .. thumbnail:: /images/cloud-security/aws/enable-aws-integration/enable-aws-integration.png
      :title: Enable the AWS integration
      :alt: Enable the AWS integration
      :align: center
      :width: 80%

   .. thumbnail:: /images/cloud-security/aws/enable-aws-integration/aws-integration-enabled.png
      :title: AWS integration enabled
      :alt: AWS integration enabled
      :align: center
      :width: 80%

#. Search for and enable each of the following integrations the same way:

   -  ``aws-amazon-security-lake``
   -  ``aws-bedrock``
   -  ``aws-fargate``
   -  ``aws-firehose``
