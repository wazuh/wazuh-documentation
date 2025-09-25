.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready to use. Learn more about it in this section of the documentation.

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image (AMI). An AMI is a ready-to-use template for creating virtual computing environments in Amazon Elastic Compute Cloud (Amazon EC2). The latest Wazuh AMI includes Amazon Linux 2023 and the Wazuh central components.

- Wazuh manager |WAZUH_CURRENT_AMI|
- Filebeat-OSS |FILEBEAT_LATEST_AMI|
- Wazuh indexer |WAZUH_CURRENT_AMI|
- Wazuh dashboard |WAZUH_CURRENT_AMI|

Packages list
-------------

.. |AMI_PRODUCT_PAGE| replace:: `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq>`__

.. |var_WAZUH_CURRENT_AMI| replace:: |WAZUH_CURRENT_AMI|

+---------------------+--------------+-------------+-------------------------+---------------------+
| Distribution        | Architecture | VM Format   | Latest version          | Product page        |
+=====================+==============+=============+=========================+=====================+
| Amazon Linux 2023   | 64-bit       | AWS AMI     | |var_WAZUH_CURRENT_AMI| | |AMI_PRODUCT_PAGE|  |
+---------------------+--------------+-------------+-------------------------+---------------------+

Deployment alternatives
-----------------------

You can deploy a Wazuh instance in two ways. Launch the `Wazuh All-In-One Deployment AMI <https://aws.amazon.com/marketplace/pp/B09J56274H>`_ directly from the AWS Marketplace or configure and deploy an instance using the AWS Management Console.

- `Launch an instance from the AWS Marketplace`_
- `Deploy an instance using the AWS Management Console`_

.. note::
  Our `Wazuh Consulting Service <https://aws.amazon.com/marketplace/pp/prodview-ve4mgmhukgmzi>`_ is also available in the AWS Marketplace. Check the Professional Service packages that Wazuh has to offer.


Launch an instance from the AWS Marketplace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq?ref=hmpg_recommendations_widget>`_ in the AWS Marketplace, then click **View purchase options**.

#. Review the information and the terms for the software. Click **Subscribe** to confirm subscribing to our product. You will receive an email notification that your offer has been accepted.

#. Click **Launch your software** to continue your setup.

#. Select the service **Amazon EC2**, **Launch from EC2 console**, and a **Region**.

#. Click **Launch from EC2** to take you to the AWS Management Console.

#. Review your configuration, ensuring all settings are correct, before launching the software. Adapt the default configuration to your needs.

    #. When selecting the **EC2 Instance Type**, we recommend ``c5a.xlarge`` because it offers an ideal balance of high compute performance and cost-efficiency.

    #. To guarantee the correct operation, the **Security Group** must have the appropriate :ref:`settings for your Wazuh instance <default_ports>`. You can create a new security group by choosing **Create security group**. This new group will have the appropriate settings by default.

#. Click **Launch** to generate the instance.

Once your instance is successfully launched and a few minutes have elapsed, you can :ref:`access the Wazuh dashboard <ami_wazuh_ui>`.


Deploy an instance using the AWS Management Console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Select **EC2** from your `AWS Management Console <https://aws.amazon.com/console/>`_ dashboard.

#. Click **Launch instance**.

#. Click on **Browse more AMIs**.

#. Search **Wazuh All-In-One Deployment** by Wazuh Inc under the **AWS Marketplace AMIs** tab, and click **Select**. This brings up a description of the Wazuh All-In-One Deployment with the option to either **Subscribe on instance launch** or **Subscribe now**.

#. Select the instance type that best fits your needs. We recommend ``c5a.xlarge``.

   You can use either of these three configuration alternatives available regarding the key pair settings:

    - **Choose an existing key pair**

    - **Create a new key pair**

    - **Proceed without a key pair** (Not recommended)

    You need to choose an existing key pair or create a new one to access the instance with SSH.

#. When selecting the **Security Group**, ensure it has the appropriate :ref:`settings for your Wazuh instance <default_ports>` to guarantee correct operation. You can create a new security group by choosing **Create security group**. This new group will have the appropriate settings by default. Check that the ports and protocols are the :ref:`ports and protocols <default_ports>` for Wazuh. Check the security measures for your instance. This will establish the Security Group (SG).

#. Under the **Size (GiB)** column, set your instance's storage capacity, then click **Next: Add Tags**. We recommend 100 GiB gp3 or more.

#. Review the instance configuration and click **Launch instance**.

After a few minutes, the instance will be ready. You can :ref:`access the Wazuh dashboard <ami_wazuh_ui>`.


Configuration files
-------------------

All components included in this AMI are configured to work out-of-the-box without the need to modify any settings. However, all components can be fully customized. These are the configuration file locations:

- Wazuh manager: ``/var/ossec/etc/ossec.conf``
- Wazuh indexer: ``/etc/wazuh-indexer/opensearch.yml``
- Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
- Wazuh dashboard:

    - ``/etc/wazuh-dashboard/opensearch_dashboards.yml``
    - ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml``

To learn more about configuring Wazuh, see the :doc:`User manual </user-manual/index>`.

.. _ami_wazuh_ui:

Access the Wazuh dashboard
--------------------------

When the instance is launched, the user passwords are automatically changed to the instance ID with the first letter capitalized. For example: ``I-07f25f6afe4789342``. This ensures that only the creator has access to the interface. This process can take an average of five minutes, depending on the type of instance. During this time, SSH access and Wazuh dashboard access are disabled.

Once the instance runs and the process to initialize passwords is complete, you can access the Wazuh dashboard with your credentials.

- **URL**: ``https://<YOUR_INSTANCE_IP>``
- **Username**: ``admin``
- **Password**: ``<YOUR_INSTANCE_ID>``

.. note::
   :class: not-long

   The password is the instance ID with the first letter capitalized. For example, if the instance ID is: ``i-07f25f6afe4789342``, the default password will be ``I-07f25f6afe4789342``.

.. warning::

   The passwords for the Wazuh server API users ``wazuh`` and ``wazuh-wui`` are the same as those for the ``admin`` user. We highly recommend changing the default passwords on the first SSH access. To perform this action, refer to the :doc:`/user-manual/user-administration/password-management` section.

Security considerations about SSH
---------------------------------

- The ``root`` user cannot be identified by SSH, and the instance can only be accessed through the user: ``wazuh-user``.
- The instance can only be accessed through a key pair, which is provided to the user with the key pair.
- You must download the key generated or stored in AWS to access the instance with a key pair. Then, run the following command to connect with the instance.

  .. code-block:: console

      # ssh -i "<KEY_PAIR_NAME>" wazuh-user@<YOUR_INSTANCE_IP>

- Access during the initial password change is disabled to prevent potential problems. This process might take a few minutes to complete. Any access attempt before completion shows: ``wazuh-user@<INSTANCE_IP>: Permission denied (publickey,gssapi-keyex,gssapi-with-mic)``.


Next steps
----------

The Wazuh AMI is now ready and you can proceed with :doc:`deploying the Wazuh agents </installation-guide/wazuh-agent/index>` on the systems to be monitored.

Upgrading the AMI
-----------------

Follow the instructions on how to upgrade the Wazuh central components.

  - :doc:`Upgrading the Wazuh central components </upgrade-guide/upgrading-central-components>`
