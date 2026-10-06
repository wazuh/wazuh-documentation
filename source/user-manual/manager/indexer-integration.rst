.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The indexer integration describes data forwarders that forward data from the Wazuh manager to the Wazuh indexer or third-party indexers. Learn more in this section of the documentation.

Indexer integration
===================

The indexer integration describes data forwarders that forward data from the Wazuh manager to the Wazuh indexer or third-party indexers.

Wazuh indexer
-------------

This integration provides a bridge between the Wazuh manager and the Wazuh indexer. It forwards data from the Wazuh manager to the Wazuh indexer for indexing. The Wazuh indexer integration consists of two forwarders: `Filebeat`_ and `Wazuh indexer connector`_.

.. _indexer_integration_filebeat:

Filebeat
^^^^^^^^

This component is a lightweight data shipper designed to securely forward alerts and archived events processed by the Wazuh manager to the Wazuh indexer for indexing and storage. It reads the output of the Wazuh analysis engine and ships events in real time.

Configuration
~~~~~~~~~~~~~

The code block below shows the default Filebeat configuration on the Wazuh server ``/etc/filebeat/filebeat.yml`` file. This configuration file is downloaded while performing step by step Wazuh server installation. To learn how to download, configure, and install Filebeat, refer to the :ref:`configuring Filebeat <installation_configuring_filebeat>` section in the documentation.

.. code-block:: yaml

   # Wazuh - Filebeat configuration file
   output.elasticsearch.hosts:
           - 127.0.0.1:9200
   #        - <elasticsearch_ip_node_2>:9200
   #        - <elasticsearch_ip_node_3>:9200

   output.elasticsearch:
     protocol: https
     username: ${username}
     password: ${password}
     ssl.certificate_authorities:
       - /etc/filebeat/certs/root-ca.pem
     ssl.certificate: "/etc/filebeat/certs/wazuh-server.pem"
     ssl.key: "/etc/filebeat/certs/wazuh-server-key.pem"
   setup.template.json.enabled: true
   setup.template.json.path: '/etc/filebeat/wazuh-template.json'
   setup.template.json.name: 'wazuh'
   setup.ilm.overwrite: true
   setup.ilm.enabled: false

   filebeat.modules:
     - module: wazuh
       alerts:
         enabled: true
       Archives:

   logging.level: info
   logging.to_files: true
   logging.files:
     path: /var/log/filebeat
     name: filebeat
     keepfiles: 7
     permissions: 0644

   logging.metrics.enabled: false

   seccomp:
     default_action: allow
     syscalls:
     - action: allow
       names:
       - rseq

Where:

-  ``<output.elasticsearch.hosts>`` specifies the list of Wazuh indexer nodes to connect to. You can use either IP addresses or hostnames. By default, the host is set to localhost, ``127.0.0.1:9200``. Replace it with your Wazuh indexer address accordingly. You can separate the addresses using commas if you have more than one Wazuh indexer node.
-  ``<protocol>`` specifies the protocol to use for the connection. The default value is ``https``. The allowed values are ``http`` and ``https``.
-  ``<username>`` and ``<password>`` specifies the environment variable used to authenticate to the Wazuh indexer securely.
-  ``<ssl.certificate_authorities>`` specifies the path to the root certificates for HTTPS server verifications. The default value is ``/etc/filebeat/certs/root-ca.pem``. The possible value is any valid path
-  ``<ssl.certificate>`` specifies the path to the Filebeat SSL certificate.  The default value is ``/etc/filebeat/certs/wazuh-server.pem``. The possible value is any valid path.
-  ``<ssl.key>`` specifies the path to the SSL key used by Filebeat. The default value is ``/etc/filebeat/certs/wazuh-server-key.pem``. The possible value is any valid path.
-  ``<setup.template.json.enabled>`` enables or disables the use of custom templates. The default value is ``true``.
-  ``<setup.template.json.path>`` specifies the file path to the template JSON file. The default value is ``/etc/filebeat/wazuh-template.json``. The possible value is any valid path.
-  ``<setup.template.json.name>`` defines the name of the template. The default value is ``wazuh``.
-  ``<setup.ilm.overwrite>`` when set to ``true``, the lifecycle policy is overwritten at startup. The default value is ``true``.
-  ``<setup.ilm.enabled>`` enables or disables index lifecycle management on any new indices created. The default value is ``false``. The possible valid values are ``true`` and ``false``.
-  ``<filebeat.modules>`` specifies the modules Filebeat will use.
-  ``<module>`` defines the module to use. The default value is ``wazuh``.
-  ``<alerts>`` enables or disables the forwarding of alerts to the Wazuh indexer. When the configuration option of ``<enabled>`` is set to ``true``, alerts are forwarded to the Wazuh indexer.
-  ``<archives>`` specifies the configurations that determine whether or not archive logs are processed and forwarded.
-  ``<logging.level>`` defines the log level. The default value is ``info`` which represents informational logs. The other log level are ``debug``, ``error``, and ``warning``.
-  ``<logging.to_files>`` enables or disables logging to files. The default value is ``true``. When set to ``true``, filebeat writes all logs to a file.
-  ``<logging.files.path>`` specifies the directory where log files will be stored. The default log path is ``/var/log/filebeat``.
-  ``<logging.files.name>`` specifies the name of the file that logs are stored. The default name is ``filebeat``.
-  ``<logging.files.keepfiles>`` specifies the number of recently rotated log files to retain. The default value is ``7``. The allowed value is an integer number between ``1`` and ``1024``.
-  ``<logging.files.permissions>`` sets the file permissions for the log files. The default value is ``0644``, which implies that the owner of the log files can read and write to them, while others can only read.
-  ``<logging.metrics.enabled>`` enables or disables the logging of internal metrics. The default value is ``true``. The possible values are ``true`` and ``false``.
-  ``<seccomp>`` specifies a secomp (secure computing mode) policy that restricts the number of system calls filebeat process can issue.
-  ``<default_action>`` sets the default action for system calls to allow. This means that any system call not explicitly specified in the syscalls list will be allowed by default.
-  ``<syscalls>`` defines a list of system call  names and the corresponding actions.
-  ``<action>`` specifies the action to take when any of the system calls listed in ``names`` is executed. The default value is ``allow``. The other values are ``errno``, ``trace``, ``trap``, ``kill_thread``, ``kill_process``, and ``log``.
-  ``<names>`` defines a list of system call names. A minimum of one system call must be defined in the list. The ``rseq`` (restartable sequences) system call is used to accelerate user-space operations on shared memory across multiple threads. The ``rseq``  system call is allowed in this configuration. 

Wazuh indexer connector
^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer connector currently receives vulnerability data from the Wazuh manager and securely forwards it to the Wazuh indexer. It gets the vulnerability data in JSON format following the Elastic Common Schema (ECS) and synchronizes its state with the Wazuh indexer to ensure data consistency and reliability. The Wazuh indexer connector is shipped together with the Wazuh manager.

The standard configuration for the indexer connector is specified in the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server as shown below:

.. code-block:: xml

   <ossec_config>
    <indexer>
       <enabled>yes</enabled>
       <hosts>
         <host>https://127.0.0.1:9200</host>
       </hosts>
       <ssl>
         <certificate_authorities>
           <ca>/etc/filebeat/certs/root-ca.pem</ca>
         </certificate_authorities>
         <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
         <key>/etc/filebeat/certs/filebeat-key.pem</key>
       </ssl>
     </indexer>
   </ossec_config>

Where:

-  ``<indexer>`` specifies the configuration options for the Wazuh indexer connector.
-  ``<enabled>`` enables or disables the Wazuh indexer connector. The allowed values for this option are ``yes`` and ``no``. The value ``yes`` enables the Wazuh indexer connector and ``no`` disables it. The default value is ``yes``.
-  ``<hosts>`` specifies a list of Wazuh indexer nodes to connect to. Use the ``host`` option for setting up each node connection.
-  ``<host>`` specifies the Wazuh indexer node URL or IP address to connect to. For example, ``http://172.16.1.11`` or ``192.168.3.2:9230``. By default, the value is set to the localhost host: ``https://127.0.0.1:9200``.
-  ``<ssl>`` specifies the configuration options for the SSL parameters.
-  ``<certificate_authorities>`` specifies a list of root certificate file paths for verification. Use the ``ca`` option for setting up each CA certificate file path.
-  ``<ca>`` specifies the root CA certificate for HTTPS server verifications. The default value is ``/etc/filebeat/certs/root-ca.pem``. The possible value is any valid CA certificate.
-  ``<certificate>`` specifies the path to the Filebeat SSL certificate. The default value is ``/etc/filebeat/certs/filebeat-key.pem``. The possible value is any valid key.
-  ``<key>`` specifies the certificate key used for authentication. The default value is ``/etc/filebeat/certs/filebeat-key.pem``. The possible value is any valid key.

You can learn more about the available configuration options in the :doc:`indexer </user-manual/reference/ossec-conf/indexer>` section of the reference guide.

Third-party indexers
--------------------

The Wazuh manager can forward alerts to third-party indexers. If you are using the Wazuh managers solely for log analysis and wish to forward alerts to third-party solutions for indexing and storage, there are alternative options available. Wazuh allows you to install the data forwarder of your choice on each Wazuh manager node to transfer the alerts to your desired solution. At the moment, Wazuh provides documentation for the following third-party solutions:

.. |MANAGER_ELK_STACK| replace:: :ref:`ELK stack <elastic_stack_wazuh_server_integration_using_logstash>`
.. |MANAGER_OPENSEARCH| replace:: :ref:`OpenSearch <opensearch_wazuh_server_integration_using_logstash>`
.. |MANAGER_SPLUNK| replace:: :ref:`Splunk <server_integration_using_Logstash>`

+-----------------------+----------------------------------------------------------------------------------+
| Solution              | Description                                                                      |
+=======================+==================================================================================+
| |MANAGER_ELK_STACK|   | Forwarding Wazuh manager alerts to ELK Stack using Logstash.                     |
+-----------------------+----------------------------------------------------------------------------------+
| |MANAGER_OPENSEARCH|  | Forwarding Wazuh manager alerts to OpenSearch using Logstash.                    |
+-----------------------+----------------------------------------------------------------------------------+
| |MANAGER_SPLUNK|      | Forwarding Wazuh manager alerts to Splunk using Logstash.                        |
|                       +----------------------------------------------------------------------------------+
|                       | Forwarding Wazuh server alerts to Splunk using the Splunk Universal Forwarder.   |
+-----------------------+----------------------------------------------------------------------------------+

These options provide flexibility in integrating Wazuh with your existing monitoring and analytics infrastructure.
