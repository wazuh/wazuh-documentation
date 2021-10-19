.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our AMI.  

.. _amazon-machine-images:

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image that you can directly launch using our AMI in the AWS Marketplace. You can also see our `consulting service <https://aws.amazon.com/marketplace/pp/prodview-ve4mgmhukgmzi>`_.

The characteristics of the AMI are:

    - Amazon Linux 2
    - Wazuh manager: |WAZUH_LATEST_AMI|
    - Open Distro for Elasticsearch: |OPENDISTRO_LATEST_AMI|
    - Filebeat-OSS: |FILEBEAT_LATEST_AMI|
    - Kibana: |KIBANA_VERSION_AMI|
    - Wazuh Kibana plugin: |WAZUH_LATEST_AMI|-|OPENDISTRO_LATEST_AMI|

To deploy an instance from this AMI you must perform the following steps:

1. Subscribe to our Server Product: `Wazuh All-In-One Deployment <https://aws.amazon.com/marketplace/pp/prodview-eju4flv5eqmgq>`_.
2. Launch an instance with the AMI ``Wazuh All-In-One Deployment``, it can be found on AWS Marketplace or launched from the subscription page.
3. Select the type of instance according to your needs, it is recommended to use an instance type ``t3a.xlarge`` or similar, you must take into account the `minimum and recommended requirements <https://documentation.wazuh.com/current/installation-guide/requirements.html#all-in-one-deployment>`_ for this type of instance.
4. Configure your instance details.
5. Set the storage capacity, 100GiB or more is recommended.
6. Add the tags that you think are convenient.
7. Establish an SG (Security Group). Take into account the `protocols and ports <https://documentation.wazuh.com/current/getting-started/architecture.html#required-ports>`_ necessary for its correct operation and the security measures for your instance.
8. When you're done reviewing the instance details, click on ``Launch`` and select one ``Key Pair`` with which to access the instance through ssh. Without this ``Key Pair`` it will only be possible to access the instance through ``EC2 Instance Connect``

Considerations about ssh:

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