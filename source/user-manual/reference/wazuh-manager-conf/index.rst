.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh manager local configuration file, wazuh-manager.conf, including its configuration sections in this section of our documentation.

.. _reference_wazuh_manager_conf:

Wazuh manager local configuration (wazuh-manager.conf)
========================================================

The ``/var/wazuh-manager/etc/wazuh-manager.conf`` file is the main local configuration file for the Wazuh manager. In Wazuh 5.0 and later, this file replaces the manager-side ``/var/ossec/etc/ossec.conf`` file from earlier versions.

We recommend that you back up the file before editing it. An invalid configuration might prevent Wazuh manager services from starting.

The ``wazuh-manager.conf`` file uses XML syntax. Enclose all Wazuh manager configuration sections within the ``<wazuh_config>`` element.

The following configuration block shows the default configuration:

.. code-block:: xml

   <wazuh_config>
     <global>
       <agents_disconnection_time>15m</agents_disconnection_time>
     </global>
     <!-- Choose between "plain", "json", or "plain,json" for the format of internal logs -->
     <logging>
       <log_format>plain</log_format>
     </logging>
     <remote>
       <https>
         <port>1517</port>
         <bind_addr>127.0.0.1</bind_addr>
         <global_prefix>/wazuh-manager/</global_prefix>
         <certificate>etc/certs/remoted.pem</certificate>
         <key>etc/certs/remoted-key.pem</key>
       </https>
       <legacy>
         <enabled>yes</enabled>
         <port>1514</port>
         <protocol>tcp</protocol>
         <local_ip>0.0.0.0</local_ip>
         <queue_size>131072</queue_size>
       </legacy>
       <agents>
         <allow_higher_versions>no</allow_higher_versions>
       </agents>
     </remote>
     <vulnerability-detection>
       <enabled>yes</enabled>
       <feed-update-interval>60m</feed-update-interval>
     </vulnerability-detection>
     <indexer>
       <hosts>
         <host>https://127.0.0.1:9200</host>
       </hosts>
       <ssl>
         <certificate_authorities>
           <ca>etc/certs/root-ca.pem</ca>
         </certificate_authorities>
         <certificate>etc/certs/indexer-connector.pem</certificate>
         <key>etc/certs/indexer-connector-key.pem</key>
       </ssl>
     </indexer>
     <!-- Configuration for wazuh-authd -->
     <auth>
       <disabled>no</disabled>
       <port>1515</port>
       <use_source_ip>no</use_source_ip>
       <purge>yes</purge>
       <use_password>yes</use_password>
       <ciphers>TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256</ciphers>
       <!-- <ssl_agent_ca></ssl_agent_ca> -->
       <ssl_verify_host>no</ssl_verify_host>
       <ssl_manager_cert>etc/certs/remoted.pem</ssl_manager_cert>
       <ssl_manager_key>etc/certs/remoted-key.pem</ssl_manager_key>
     </auth>
     <cluster>
       <name>wazuh</name>
       <node_name>node01</node_name>
       <node_type>master</node_type>
       <key>XXXXXXXXXXXXXXXXXXXX</key>
       <port>1516</port>
       <bind_addr>0.0.0.0</bind_addr>
       <nodes>
         <node>127.0.0.1</node>
       </nodes>
       <hidden>no</hidden>
     </cluster>
   </wazuh_config>

To manage agent configuration centrally, use the ``/var/wazuh-manager/etc/shared/<GROUP_NAME>/agent.conf`` file. The ``agent.conf`` file distributes supported configuration settings to all agents assigned to the specified group.

Configuration sections
-----------------------

The following table lists the configuration sections available in ``wazuh-manager.conf``.

+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Section                                                    | Description                                                                       |
+============================================================+===================================================================================+
| :doc:`global <global>`                                     | Configures global Wazuh manager settings, including agent disconnection timing.   |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`logging <logging>`                                   | Configures the format of Wazuh manager internal logs.                             |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`remote <remote>`                                     | Configures communication between Wazuh agents and the Wazuh manager.              |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`auth <auth>`                                         | Configures Wazuh agent enrollment.                                                |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`indexer <indexer>`                                   | Configures communication with the Wazuh indexer.                                  |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`vulnerability-detection <vulnerability-detection>`   | Configures vulnerability detection and vulnerability feed updates.                |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`agent-upgrade <agent-upgrade>`                       | Configures remote Wazuh agent upgrades.                                           |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`task-manager <task-manager>`                         | Configures remote task scheduling and lifecycle management.                       |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`wdb <wdb>`                                           | Configures Wazuh database backup settings.                                        |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`cluster <cluster>`                                   | Configures Wazuh manager cluster communication and synchronization.               |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   global
   logging
   remote
   auth
   indexer
   vulnerability-detection
   agent-upgrade
   task-manager
   wdb
   cluster
