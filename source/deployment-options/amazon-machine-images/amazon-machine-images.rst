.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready to use. Learn more about it in this section of the documentation.

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image (AMI). An AMI is a ready-to-use template for creating virtual computing environments in Amazon Elastic Compute Cloud (Amazon EC2). The Wazuh |WAZUH_CURRENT_AMI| AMI runs on Amazon Linux 2023 and includes the following components:

-  Wazuh manager |WAZUH_CURRENT_AMI|
-  Wazuh indexer |WAZUH_CURRENT_AMI|
-  Wazuh dashboard |WAZUH_CURRENT_AMI|
-  Wazuh agent |WAZUH_CURRENT_AMI|

The AMI uses an all-in-one configuration, so all Wazuh central components run on one instance. Monitoring starts after first-boot configuration finishes. The pre-installed Wazuh agent enrolls with the local Wazuh manager on first boot and monitors the instance itself. Starting with Wazuh 5.0, the Wazuh agent uses a separate package. The Wazuh manager package no longer includes the agent. The AMI excludes Filebeat.

Packages list
-------------

.. |AMI_PRODUCT_PAGE| replace:: `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq>`__

.. |AMI_RELEASE| replace:: ``|WAZUH_CURRENT_AMI|``

+-------------------+-------------------------+-----------+---------------+--------------------+
| Distribution      | Architecture            | VM format | Wazuh release | Product page       |
+===================+=========================+===========+===============+====================+
| Amazon Linux 2023 | ``x86_64``, ``aarch64`` | AWS AMI   | |AMI_RELEASE| | |AMI_PRODUCT_PAGE| |
+-------------------+-------------------------+-----------+---------------+--------------------+

Deployment alternatives
-----------------------

You can deploy the Wazuh AMI in one of the following ways:

-  Launch an instance from the AWS Marketplace.
-  Deploy an instance using the AWS Management Console.

.. note::

   The `Wazuh Consulting Service <https://aws.amazon.com/marketplace/pp/prodview-ve4mgmhukgmzi>`__ is also available in the AWS Marketplace. It offers professional service packages for your Wazuh deployment.

Launch an instance from the AWS Marketplace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Launch the pre-built Wazuh AMI to deploy the Wazuh components on an Amazon EC2 instance.

#. Open `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq>`__ in the AWS Marketplace and click **View purchase options**.

#. Review the information and the terms for the software, then click **Subscribe**.

   You will receive an email confirming the subscription.

#. Click **Launch your software**.

#. Select **Amazon EC2** as the service, **Launch from EC2 console** as the launch method, and a Region.

#. Click **Launch from EC2** to open the launch page in the AWS Management Console.

#. Review the instance type, key pair, security group, and root volume before you launch the instance. Select a key pair for SSH access and allocate at least 100 GiB of ``gp3`` storage.

   .. note::

      Select ``c5a.2xlarge`` for x86_64 or ``c6g.2xlarge`` for aarch64 as the instance type. Wazuh 5.0 needs more resources than earlier versions, and smaller instance types can stop responding.

   .. warning::

      The security group must allow the :ref:`ports that the Wazuh AMI uses <default_ports>`. Select **Create security group** to create a group with the seller's default settings, then limit each source to trusted addresses.

#. Click **Launch instance**.

The instance needs about five minutes to finish its first-boot configuration. After first-boot configuration finishes, follow :ref:`Access the Wazuh dashboard <ami_wazuh_ui>`.

Deploy an instance using the AWS Management Console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Amazon EC2 launch wizard to configure an instance from the pre-built Wazuh AMI.

#. Sign in to the AWS Management Console and open the **EC2** console.

#. Click **Launch instance**.

#. Click **Browse more AMIs** in **Application and OS Images**.

#. Search for **Wazuh All-In-One Deployment** by Wazuh Inc. in the **AWS Marketplace AMIs** tab and click **Select**.

   Click **Subscribe on instance launch** or **Subscribe now** to subscribe to the product.

#. Select ``c5a.2xlarge`` for x86_64 or ``c6g.2xlarge`` for aarch64 in **Instance type**.

#. Select your key pair in **Key pair (login)**, or click **Create new key pair** to create one.

   .. warning::

      Select a key pair before you launch the instance. You need its private key file to connect with SSH and retrieve the passwords.

#. Configure the security group in **Network settings**.

   Select **Create security group** to create a group with the seller's default settings. Check that it allows the :ref:`ports that the Wazuh AMI uses <default_ports>`, and limit each source to trusted addresses.

#. Set the root volume to 100 GiB or more and the volume type to **gp3** in **Configure storage**.

#. Review the configuration in **Summary** and click **Launch instance**.

The instance needs about five minutes to finish its first-boot configuration. After first-boot configuration finishes, follow :ref:`Access the Wazuh dashboard <ami_wazuh_ui>`.

Configuration files
-------------------

The Wazuh AMI includes preconfigured Wazuh components. You can customize each component in the same way as in a standard Wazuh installation. The following table lists the configuration file for each component.

+-----------------+----------------------------------------------------+
| Component       | Configuration file                                 |
+=================+====================================================+
| Wazuh manager   | ``/var/wazuh-manager/etc/wazuh-manager.conf``      |
+-----------------+----------------------------------------------------+
| Wazuh indexer   | ``/etc/wazuh-indexer/opensearch.yml``              |
+-----------------+----------------------------------------------------+
| Wazuh dashboard | ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` |
+-----------------+----------------------------------------------------+
| Wazuh agent     | ``/var/ossec/etc/ossec.conf``                      |
+-----------------+----------------------------------------------------+

.. note::

   The ``/var/ossec/etc/ossec.conf`` file configures the pre-installed Wazuh agent, not the Wazuh manager.

To learn more about configuring each component, see the :doc:`User manual </user-manual/index>`.

.. _ami_wazuh_ui:

Access the Wazuh dashboard
--------------------------

The Wazuh AMI has no default passwords. Each instance generates passwords, certificates, and a root certificate authority (CA) during first-boot configuration. It stores the passwords for every Wazuh account in the ``/etc/wazuh/credentials.env`` file. Only the ``root`` user can read this file. First-boot configuration takes about five minutes, depending on the instance type.

.. warning::

   SSH access and Wazuh dashboard access are unavailable until first-boot configuration finishes.

Read the ``admin`` password from the instance, then log in to the Wazuh dashboard. You need the private key file of the key pair you selected at launch.

#. Get the public IP address of the instance from the **Details** tab on the **Instances** page of the EC2 console.

   Use the private IP address instead if you connect from inside a VPC without internet access.

#. Restrict the permissions of your private key file if you use Linux or macOS:

   .. code-block:: console

      $ chmod 400 "<KEY_PAIR_FILE>"

#. Connect to the instance with SSH as ``wazuh-user``:

   .. code-block:: console

      $ ssh -i "<KEY_PAIR_FILE>" wazuh-user@<YOUR_INSTANCE_IP>

   Replace ``<KEY_PAIR_FILE>`` with the path to your private key file and ``<YOUR_INSTANCE_IP>`` with the IP address from step 1.

#. Run the following command to read the ``admin`` password:

   .. code-block:: console

      $ sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-

#. Open ``https://<YOUR_INSTANCE_IP>`` in a web browser and accept the certificate warning. Your browser shows the warning because the instance uses certificates from its own certificate authority.

#. Log in with the username ``admin`` and the password from step 4.

Security considerations about SSH
---------------------------------

-  The ``root`` user cannot be identified by SSH, and the instance can only be accessed through the user: ``wazuh-user``.
-  The instance can only be accessed through a key pair, which is provided to the user with the key pair.
-  You must download the key generated or stored in AWS to access the instance with a key pair. Then, run the following command to connect to the instance.

   .. code-block:: console

      # ssh -i "<KEY_PAIR_NAME>" wazuh-user@<YOUR_INSTANCE_IP>

-  Access during the initial password change is disabled to prevent potential problems. This process might take a few minutes to complete. Any access attempt before completion shows: ``wazuh-user@<INSTANCE_IP>: Permission denied (publickey,gssapi-keyex,gssapi-with-mic)``.

Next steps
----------

The Wazuh AMI is now ready, and you can proceed with :doc:`deploying the Wazuh agents </installation-guide/wazuh-agent/index>` on the systems to be monitored.
