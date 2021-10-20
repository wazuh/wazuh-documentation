.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our AMI.  

.. _amazon-machine-images:

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image that you can directly launch using our AMI in the AWS Marketplace, the use of our software is free and you will only have to pay the costs related to AWS. You can also see our `consulting service <https://aws.amazon.com/marketplace/pp/prodview-ve4mgmhukgmzi>`_.

These are the characteristics of the latest AMI:

    - Amazon Linux 2
    - Wazuh manager: |WAZUH_LATEST_AMI|
    - Open Distro for Elasticsearch: |OPENDISTRO_LATEST_AMI|
    - Filebeat-OSS: |FILEBEAT_LATEST_AMI|
    - Kibana: |KIBANA_VERSION_AMI|
    - Wazuh Kibana plugin: |WAZUH_LATEST_AMI|-|OPENDISTRO_LATEST_AMI|

Deploying an instance
---------------------


First, you have to subscribe to our Server Product `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq>`_, clicking the **Continue to Subscribe** button, once subscribed you have two options to deploy the instance:


1. Deploying a predefined instance

  1. After clicking in **Continue to Subscribe**, you will have to Accept the Terms an Conditions. Once accepted, click **Continue to Configuration**.
  2. Now you have to configure the software selecting the Software Version and the Region where the instance will be deployed. Once configured, click **Continue to Launch**.
  3. Finally, you will can see the Usage Information, EC2 Instance Type, network and Key Pair settings among others. When finished, click **Launch** and your instance will be launched.


2. Configure and deploying the instance manually

  1. Once subscribed, you can deploy an instance directly from AWS EC2 Dashboard. For this, ckick on **Launch instance**, where you will have to configure a total of 7 steps.
  2. First, choose an Amazon Machine Image (AMI) from AWS Marketplace searching by Wazuh All-In-One Deployment. Click **Select**.
  3. Review the Server Product characteristics and click **Continue**.
  4. Select the type of instance according to your needs. We recommended using an instance type ``t3a.xlarge`` or similar, and checking the `minimum and recommended requirements <https://documentation.wazuh.com/current/installation-guide/requirements.html#all-in-one-deployment>`_ for this type of instance. Click **Next: Configure Instance Details** when ready.
  5. Review the intance details, such as Network, CPU, instance behavior or User data. Then, click **Next: Add Storage**.
  6. Set the storage capacity, 100GiB or more is recommended. Click **Next: Add Tags**.
  7. Add the tags that you think are convenient. Click **Next: Configure Security Group**.
  8. Establish an SG (Security Group). Make sure you check the `protocols and ports <https://documentation.wazuh.com/current/getting-started/architecture.html#required-ports>`_ necessary for its correct operation and the security measures for your instance. Click **Review and Launch**
  9. Review all the intance configuration and when finished, click **Launch**
  10. Now you have to **Select an existing key pair or create a new key pair**, you can:
  
    a.  Choose an existing key pair.
    b. Create a new key pair.
    c. Proceed without a key pair.

If you want to access the instance with ssh, you will need a key pair, without it will only be possible to access the instance through ``EC2 Instance Connect``.

Once finished clik **Launch instances** and enjoy.

.. note:: Considerations about ssh:

    - For security reasons, the ``root`` user cannot be identified by ssh. It can only be accessed through the user: ``wazuh-user``
    - For security, ssh authentication through passwords is disabled, it can only be accessed through a ``Key Pair``, so that only the user with said ``Key Pair`` will be able to access the instance.
    - To access with a ``Key Pair`` you must download the key generated or stored in AWS and connect with:

    .. code-block:: console
   
     # ssh -i "key_pair_name" wazuh-user@instance_ip

Once the instance is running, you can access the web interface as follows:

  .. code-block:: none

      URL: https://<instance_ip>
      user: wazuh
      password: <your_instance_id>

Keep in mind that after launching the instance, the passwords of the opendsitro users will be changed to the id of the instance created from the AMI, in this way access to the interface is guaranteed only to the creator of it. This process can take an average of 5 minutes depending on the type of instance and both the ssh access and the kibana interface will be disabled. 

All components included in this AMI are configured to work out-of-the-box without the need to modify any settings. However, all components can be fully customized. These are the configuration files locations:

    - Wazuh manager: ``/var/ossec/etc/ossec.conf``
    - Open Distro for Elasticsearch: ``/etc/elasticsearch/elasticsearch.yml``
    - Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
    - Kibana: ``/etc/kibana/kibana.yml``

.. note:: It is highly recommended to change the default passwords of Elasticsearch for the users’ passwords in the first ssh access. To perform this action, see the :ref:`Elasticsearch tuning <elastic_tuning>` section.


Once the AMI instance is launched and running, the next step is to :ref:`deploy the Wazuh agents <installation_agents>` on the systems to be monitored.

Upgrading the instance
----------------------

The instance can be upgraded as a traditional installation:

  - :ref:`Upgrading the Wazuh manager <upgrading_wazuh_server>`
  - :ref:`Upgrading Open Distro for Elasticsearch, Filebeat-OSS and Kibana <upgrading_open_distro>`