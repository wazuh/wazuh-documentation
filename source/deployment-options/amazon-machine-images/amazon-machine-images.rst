.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready to use. Learn more about it in this section of the documentation.

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image (AMI). An AMI is a pre-configured template that is ready to use for creating a virtual computing environment within the Amazon Elastic Compute Cloud (Amazon EC2). The latest Wazuh AMI packages together Amazon Linux 2 with the following central components for your Wazuh server:

- Wazuh manager |WAZUH_CURRENT_AMI|
- Filebeat-OSS |FILEBEAT_LATEST_AMI|
- Wazuh indexer |WAZUH_CURRENT_AMI|
- Wazuh dashboard |WAZUH_CURRENT_AMI|

Packages list
-------------

.. |AMI_PRODUCT_PAGE| replace:: `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq>`__

.. |var_WAZUH_CURRENT_AMI| replace:: |WAZUH_CURRENT_AMI|

+------------------+--------------+-------------+-------------------------+---------------------+
| Distribution     | Architecture | VM Format   | Latest version          | Product page        |
+==================+==============+=============+=========================+=====================+
| Amazon Linux 2   | 64-bit       | AWS AMI     | |var_WAZUH_CURRENT_AMI| | |AMI_PRODUCT_PAGE|  |
+------------------+--------------+-------------+-------------------------+---------------------+

Deployment alternatives
-----------------------

There are two alternatives for deploying a Wazuh instance. You can launch the `Wazuh All-In-One Deployment AMI <https://aws.amazon.com/marketplace/pp/B09J56274H>`_ directly from the AWS Marketplace or you can configure and deploy an instance using the AWS Management Console.

- `Launch an instance from the AWS Marketplace`_
- `Deploy an instance using the AWS Management Console`_

.. note::
  Our `Wazuh Consulting Service <https://aws.amazon.com/marketplace/pp/prodview-ve4mgmhukgmzi>`_ is also available in the AWS Marketplace. Check the Professional Service packages that Wazuh has to offer.


Launch an instance from the AWS Marketplace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq?ref=hmpg_recommendations_widget>`_ in the AWS Marketplace, then click **Continue to Subscribe**.

#. Review the information and accept the terms for the software. Click **Continue to Configuration** to confirm subscribing to our Server product.

#. Select a **Software Version** and the **Region** where the instance is going to be deployed. Then, click **Continue to Launch**.

#. Review your configuration, making sure that all settings are correct before launching the software. Adapt the default configuration values to your needs.

    #. When selecting the **EC2 Instance Type**, we recommend that you use an instance type ``c5a.xlarge``.
  
    #. When selecting the **Security Group**, it must be one with the appropriate :ref:`settings for your Wazuh instance <default_ports>` to guarantee the correct operation. You can create a new security group by choosing **Create new based on seller settings**. This new group will have the appropriate settings by default.

#. Click **Launch** to generate the instance.

Once your instance is successfully launched and a few minutes have elapsed, you can :ref:`access the Wazuh dashboard <ami_wazuh_ui>`.


Deploy an instance using the AWS Management Console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Select **Launch instance** from your `AWS Management Console <https://aws.amazon.com/console/>`_ dashboard.

#. Find Wazuh All-In-One Deployment by Wazuh Inc., and click **Select** to subscribe.

#. Review the Server product characteristics, then click **Continue**. This allows subscribing to our Server product.

#. Select the instance type according to your needs, then click **Next: Configure Instance Details**. We recommend that you use an instance type ``c5a.xlarge``.

#. Configure your instance as needed, then click **Next: Add Storage**.

#. Set the storage capacity of your instance under the **Size (GiB)** column, then click **Next: Add Tags**. We recommend 100 GiB GP3 or more.

#. Add as many tags as you need, then click **Next: Configure Security Group**.

#. Check that the ports and protocols are the :ref:`ports and protocols <default_ports>` for Wazuh. Check the security measures for your instance. This will establish the Security Group (SG). Then, click **Review and Launch**.

#. Review the instance configuration and click **Launch**.

#. Select one of three configuration alternatives available regarding the key pair settings: **Choose an existing key pair**, **Create a new key pair**, **Proceed without a key pair**. You need to choose an existing key pair or create a new one to access the instance with SSH.
    
#. Click **Launch instances** to complete the process and deploy your instance.

Once your instance is fully configured and ready after a few minutes since launch, you can :ref:`access the Wazuh dashboard <ami_wazuh_ui>`.


Configuration files
-------------------

All components included in this AMI are configured to work out-of-the-box without the need to modify any settings. However, all components can be fully customized. The configuration files locations are the following.

- Wazuh manager: ``/var/ossec/etc/ossec.conf``
- Wazuh indexer: ``/etc/wazuh-indexer/opensearch.yml``
- Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
- Wazuh dashboard: ``/etc/wazuh-dashboard/opensearch_dashboards.yml``

To learn more about configuring Wazuh, see the :doc:`User manual </user-manual/index>`.

.. _ami_wazuh_ui:

Access the Wazuh dashboard
--------------------------

When the instance is launched, the passwords of the users are automatically changed to the ID of the instance. In this way, access to the interface is guaranteed only to the creator of it. This process can take an average of five minutes, depending on the type of instance. Both the SSH access and the Wazuh dashboard access are disabled during this process.

Once the instance is running and the process to initialize passwords is complete, you can access the Wazuh dashboard with your credentials.

- URL: *https://<YOUR_INSTANCE_IP>*
- **Username**: *admin*
- **Password**: *<YOUR_INSTANCE_ID>*

.. warning::
   
   It is highly recommended to change the default users passwords in the first SSH access. To perform this action, see the :doc:`/user-manual/user-administration/password-management` section.


Security considerations about SSH
---------------------------------

- The ``root`` user cannot be identified by SSH and the instance can only be accessed through the user: ``wazuh-user``.
- SSH authentication through passwords is disabled and the instance can only be accessed through a key pair. This means that only the user with the key pair has access to the instance.
- To access the instance with a key pair, you need to download the key generated or stored in AWS. Then, run the following command to connect with the instance.

  .. code-block:: console

      # ssh -i "<KEY_PAIR_NAME>" wazuh-user@<YOUR_INSTANCE_IP>
- Access during the initial password change process is disabled to prevent potential problems. This process may take a few minutes to complete. Any access attempt before completion will show ``wazuh-user@<INSTANCE_IP>: Permission denied (publickey,gssapi-keyex,gssapi-with-mic)``.


Next steps
----------

The Wazuh AMI is now ready and you can proceed with :doc:`deploying the Wazuh agents </installation-guide/wazuh-agent/index>` on the systems to be monitored.

Upgrading the AMI
-----------------

Follow the instructions on how to upgrade the Wazuh central components. 

  - :doc:`Upgrading the Wazuh central components </upgrade-guide/upgrading-central-components>`
