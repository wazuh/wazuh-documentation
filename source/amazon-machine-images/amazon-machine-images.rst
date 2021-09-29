.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Amazon Machine Image includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our AMI.  

.. _amazon-machine-images:

Amazon Machine Images (AMI)
===========================

Wazuh provides a pre-built Amazon Machine Image that you can directly launch using our AMI in the AWS Marketplace.

The characteristics of the AMI are:

    - Amazon Linux 2
    - Wazuh manager: |WAZUH_LATEST_AMI|
    - Open Distro for Elasticsearch: |OPENDISTRO_LATEST_AMI|
    - Filebeat-OSS: |FILEBEAT_LATEST_AMI|
    - Kibana: |KIBANA_VERSION_AMI|
    - Wazuh Kibana plugin: |WAZUH_LATEST_AMI|-|OPENDISTRO_LATEST_AMI|

To deploy an instance from this AMI you must perform the following steps:

1. Launch an instance with the AMI ``Wazuh v|WAZUH_LATEST_AMI|``, it can be found on AWS Marketplace.
2. Select the type of instance according to your needs, it is recommended to use an instance type ``t3a.xlarge`` or similar, you must take into account the `minimum and recommended requirements <https://documentation.wazuh.com/current/installation-guide/requirements.html#all-in-one-deployment>`_ for this type of instance.
3. Configure your instance details.
4. Set the storage capacity, 100GiB or more is recommended.
5. Add the tags that you think are convenient.
6. Establish an SG (Security Group). Take into account the `protocols and ports <https://documentation.wazuh.com/current/getting-started/architecture.html#required-ports>`_ necessary for its correct operation and the security measures for your instance.
7. When you're done reviewing the instance details, click on ``Launch`` and select one ``Key Pair`` with which to access the instance through ssh. Without this ``Key Pair`` it will only be possible to access the instance through ``EC2 Instance Connect``

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
      password: wazuh

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