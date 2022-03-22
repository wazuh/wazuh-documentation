.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our AMI.  

.. _amazon-machine-images:

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image that you can directly launch using our AMI in the AWS Marketplace or, as an alternative, you can configure and deploy the instance manually. Additionally, our `Wazuh Consulting Service <https://aws.amazon.com/marketplace/pp/prodview-ve4mgmhukgmzi>`_ is also available in the AWS Marketplace for you to check the Professional Service packages Wazuh has to offer. 

Specifications of the latest AMI:

    - Amazon Linux 2
    - Wazuh manager |WAZUH_LATEST_AMI|
    - Open Distro for Elasticsearch |OPENDISTRO_LATEST_AMI|
    - Filebeat-OSS |FILEBEAT_LATEST_AMI|
    - Kibana |KIBANA_VERSION_AMI|
    - Wazuh Kibana plugin |WAZUH_LATEST_AMI|-|OPENDISTRO_LATEST_AMI|


Deployment alternatives
-----------------------

There are two different options for deploying the Wazuh All-In-One Deployment instance.

- `Deploy a predefined instance`_
- `Deploy and configure the instance manually`_


Deploy a predefined instance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Subscribe to our Server product:

    #. Go to `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq?ref=hmpg_recommendations_widget>`_, then click  **Continue to Subscribe**. 
    #. Review the information and accept the terms for this software, then click **Continue to Configuration** to confirm the action.
   
 
#. Configure the software by selecting a **Software Version** and the **Region** where the instance will be deployed. Once configured, click **Continue to Launch**.

#. Review your configuration before launching the software and make sure that all default settings are correct. When selecting the **EC2 Instance Type**, we recommend that you use an instance type ``c5.2xlarge`` or similar, and check the `minimum and recommended requirements <https://documentation.wazuh.com/current/installation-guide/requirements.html#all-in-one-deployment>`_ for this type of instance. 

#. Click **Launch** to generate the instance. 

Your instance is successfully launched and you can now :ref:`access the Wazuh web interface <ami_wazuh_ui>`.

Deploy and configure the instance manually
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Subscribe to our Server product:

    #. From your `AWS Management Console <https://aws.amazon.com/console/>`_ dashboard, select **Launch instance**.  
    #. Search for *Wazuh All-In-One Deployment* by `Wazuh Inc. <https://aws.amazon.com/marketplace/seller-profile?id=4c3cda83-f4cf-4afd-9f48-18ffe4f4fe69>`_, and click **Select** to subscribe. 
   
#. Review the Server Product characteristics, then click **Continue**.

#. Select the instance type according to your needs, then click **Next: Configure Instance Details**. We recommend that you use an instance type ``c5.2xlarge`` or similar, and check the `minimum and recommended requirements <https://documentation.wazuh.com/current/installation-guide/requirements.html#all-in-one-deployment>`_ for this type of instance. 

#. Configure your instance as needed, then click **Next: Add Storage**.

#. Set the storage capacity of your instance under the **Size (GiB)** column, then click **Next: Add Tags**. We recommend 100GiB or more.

#. Add as many tags as you need, then click **Next: Configure Security Group**.

#. Establish a Segurity Group (SG). To do this, make sure you check the `protocols and ports <https://documentation.wazuh.com/current/getting-started/architecture.html#required-ports>`_ necessary for its correct operation and the security measures for your instance. Once the SG is configured, click **Review and Launch**.

#. Review the instance configuration and click **Launch**.

#. Configure key pair settings: 

    #. Select one of the three configuration options available. 

        - Choose an existing key pair
        - Create a new key pair
        - Proceed without a key pair


       You need to select a key pair to access the instance with SSH. If you proceed without a key pair, the instance is only available through *EC2 Instance Connect*.

    #. To complete the process and deploy your instance, click **Launch instances**.

Your instance is fully configured and ready. You can now :ref:`access the Wazuh web interface <ami_wazuh_ui>`.


Configuration files
-------------------

All components included in this AMI are configured to work out-of-the-box without the need to modify any settings. However, all components can be fully customized. These are the configuration files locations:

    - Wazuh manager: ``/var/ossec/etc/ossec.conf``
    - Open Distro for Elasticsearch: ``/etc/elasticsearch/elasticsearch.yml``
    - Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
    - Kibana: ``/etc/kibana/kibana.yml``
    - Wazuh Kibana plugin: ``/usr/share/kibana/data/wazuh/config/wazuh.yml``


To learn more about the Wazuh configuration options for its components, see the :ref:`User manual <user_manual>`.

.. _ami_wazuh_ui:

Access the Wazuh web interface
------------------------------

Once the instance is running, you can access the web interface with your credentials.


- URL: *https://<instance_ip>*
- **Username**: *wazuh*
- **Password**: *<your_instance_id>*

Keep in mind that after launching the instance, the passwords of the users are changed to the ID of the instance created from the AMI. In this way, access to the interface is guaranteed only to the creator of it. This process can take an average of 5 minutes depending on the type of instance and both the SSH access and the Kibana web interface are disabled during the process. 

.. note:: It is highly recommended to change the default passwords of Elasticsearch for the users’ passwords in the first SSH access. To perform this action, see the :ref:`Elasticsearch tuning <elastic_tuning>` section.


Security considerations about SSH
---------------------------------

- The ``root`` user cannot be identified by SSH and the instance can only be accessed through the user: ``wazuh-user``.
- SSH authentication through passwords is disabled and the instance can only be accessed through a key pair. This means that only the user with the key pair has access to the instance.
- To access the instance with a key pair, you need to download the key generated or stored in AWS. Then, run the following command to connect with the instance.

  .. code-block:: console

      # ssh -i "key_pair_name" wazuh-user@instance_ip


Next steps
----------

The Wazuh AMI is now ready and you can proceed with :ref:`deploying the Wazuh agents <installation_agents>` on the systems to be monitored.

Upgrading the Wazuh server
--------------------------

The Wazuh server in the instance can be upgraded as a traditional installation.

  - :ref:`Upgrading the Wazuh manager <upgrading_wazuh_server>`
  - :ref:`Upgrading Open Distro for Elasticsearch, Filebeat-OSS, and Kibana <upgrading_open_distro>`