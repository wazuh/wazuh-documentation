.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager services handle agent enrollment and connection, vulnerability detection, cluster operations, and API access. Learn more in this section of the documentation.

Wazuh manager services
======================

The Wazuh manager is composed of multiple services, each designed to perform a specific operational function within the Wazuh platform. These services work together to handle tasks such as securing and receiving Wazuh agent communications, managing cluster operations, and providing API access.

This section describes the purpose, responsibilities, and configuration of each Wazuh manager service.

Agent enrollment service
------------------------

The agent enrollment service registers Wazuh agents with the Wazuh manager through the ``wazuh-manager-authd`` daemon. It listens for agent registration requests, validates credentials, generates the agent key, and writes the resulting entry to the agent keystore.

Wazuh 5.0 agents enroll over HTTPS through the ``POST /enroll`` endpoint of ``remoted_module`` on port ``1517``. That endpoint forwards to the same ``wazuh-manager-authd`` daemon through its local socket, so every enrollment follows one validation path regardless of how it arrives. Port ``1515`` remains fully supported for legacy Wazuh 4.x agents.

When a Wazuh agent starts on an endpoint, it contacts the Wazuh manager to begin enrollment. Enrollment requires the enrollment password by default. The Wazuh manager generates the password at first start, and you must copy it to each agent before enrollment. The Wazuh manager then generates a unique agent key, which authenticates the Wazuh agent on subsequent connections.

You can configure :doc:`additional security options </user-manual/agent/agent-enrollment/security-options/index>` for the enrollment process, such as Wazuh manager identity verification and Wazuh agent identity verification.

Configuration
^^^^^^^^^^^^^

The following ``<auth>`` block shows the default agent enrollment service configuration in the ``<wazuh_config>`` block of the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3-14

   <wazuh_config>
     ...
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
     ...
   </wazuh_config>

Where:

-  ``<disabled>`` enables or disables the process of the Wazuh agent enrolling and authenticating with the Wazuh manager. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<port>`` specifies the TCP port number for listening to connections. The default value is ``1515``. The allowed value is any port number between ``1`` and ``65535``.
-  ``<use_source_ip>`` defines whether to use the client's source IP address or the use of "any" to add a Wazuh agent. The allowed values are ``yes`` and ``no``. When the value is ``no``, the Wazuh agent can connect to the Wazuh manager even if the source IP used for enrollment changes. However, when the value is ``yes``, the Wazuh agent cannot connect to the Wazuh manager if the source IP address changes.
-  ``<purge>`` specifies whether the client keys will be deleted when Wazuh agents are removed. When the value is ``no``, removed Wazuh agents will remain in the client keys file marked as removed. When the value is set to ``yes``, the client keys file will be purged. The default value is ``yes``. The possible values are ``yes`` and ``no``.
-  ``<use_password>`` determines the use of shared password authentication. When the value is ``no``, this option is disabled. When the value is set to ``yes``, a shared password is read from the ``/var/wazuh-manager/etc/authd.pass`` file. If this file does not exist, a random password is generated and stored in the ``/var/wazuh-manager/logs/wazuh-manager.log`` file on the Wazuh manager. See the :doc:`using password authentication </user-manual/agent/agent-enrollment/security-options/using-password-authentication>` section for more information.
-  ``<ciphers>`` sets the list of ciphers for network communication using SSL. The default value is ``TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256``.
-  ``<ssl_agent_ca>`` specifies the path to the CA certificate used to verify clients. It can be referred to as a relative path under the Wazuh installation directory or a full path. The possible value is any valid path.
-  ``<ssl_verify_host>`` toggles source host verification on and off when a CA certificate is specified. The client source IP address will be validated using the Common Name field. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<ssl_manager_cert>`` specifies the path to the Wazuh manager SSL certificate. It can be referred to as a relative path under the Wazuh installation directory or a full path. The default value is ``etc/certs/remoted.pem``. The possible value is any valid path.
-  ``<ssl_manager_key>`` specifies the path to the Wazuh manager SSL key. It can be referred to as a relative path under the Wazuh installation directory or a full path. The default value is ``etc/certs/remoted-key.pem``. The possible value is any valid path.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Agent connection service
------------------------

The agent connection service, provided by the ``wazuh-manager-remoted`` daemon, manages secure communication between Wazuh agents and the Wazuh manager. It handles agent connections, authentication, event ingestion, state synchronization, and the delivery of centralized configuration and upgrade packages.

In Wazuh 5.0, agents communicate over an HTTPS API on port ``1517``. The listener authenticates every request with a per-agent JWT bearer token that the agent signs with its ``client.keys`` key. The Wazuh manager also checks the request source address against the Wazuh agent ``client.keys`` entry.

The legacy AES-encrypted TCP and UDP channel on port ``1514`` serves Wazuh 4.x agents. The Wazuh manager starts it only when you enable the ``<legacy>`` block inside ``<remote>``. Without that block, only Wazuh 5.x agents can connect.

Configuration
^^^^^^^^^^^^^

The following ``<remote>`` block shows the default connection service configuration in the ``<wazuh_config>`` block of the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3-22

   <wazuh_config>
     ...
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
         <local_ip>127.0.0.1</local_ip>
       </legacy>

       <agents>
         <allow_higher_versions>no</allow_higher_versions>
       </agents>
     </remote>
     ...
   </wazuh_config>

Where:

-  ``<https>`` specifies the configuration parameters for the HTTPS listener. All options are optional; an absent ``<https>`` block (or an absent individual option) falls back to the module's built-in defaults, so the listener is usable without any configuration.
-  ``<port>`` specifies the HTTPS listening port. The default port value is ``1517``. The allowed value is any port number between ``1`` and ``65535``.
-  ``<bind_addr>`` specifies the address the HTTPS listener binds to. The default value is ``127.0.0.1``. The allowed values are any valid IPv4 or IPv6 address.
-  ``<global_prefix>`` specifies the URL path prefix every HTTPS endpoint is served under. The default path is ``/wazuh-manager/``.
-  ``<certificate>`` specifies the path to the TLS certificate chain (PEM) presented by the Wazuh manager. The default path is ``etc/certs/remoted.pem`` relative to the Wazuh manager installation path.
-  ``<key>`` specifies the path to the TLS private key (PEM) matching ``certificate``. The default path is ``etc/certs/remoted-key.pem`` relative to the Wazuh manager installation path.
-  ``<legacy>`` specifies the configuration parameters for the TCP/UDP listener.
-  ``<enabled>`` enables the classic TCP/UDP listener and every subsystem that only serves Wazuh 4.x agents. The default value is ``yes`` when ``<legacy>`` is present. The allowed values are ``yes`` and ``no``.
-  ``<port>`` specifies the listening port for Wazuh agent connections. The default port is ``1514``. The allowed value is any port number between ``1`` and ``65535``.
-  ``<protocol>`` specifies communication protocol(s) to accept from Wazuh agents. The default value is ``tcp``. The allowed values are ``tcp``, ``udp``, or ``tcp,udp``.
-  ``<local_ip>`` binds ``wazuh-manager-remoted`` to a specific local IP address. The default value is ``127.0.0.1``. The allowed values are any valid IPv4 or IPv6 address.
-  ``<allow_higher_versions>`` allows the Wazuh manager to accept connections from Wazuh agents running a Wazuh version higher than the manager. The default value is ``no``. Enable when upgrading Wazuh agents before the Wazuh manager. This option is configurable under ``<agents>``.

You can find more configuration options in the :doc:`remote </user-manual/reference/wazuh-manager-conf/remote>` section of the reference guide.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Vulnerability detection service
-------------------------------

This service uses a Vulnerability Scanner to detect known security vulnerabilities on monitored endpoints. It is event-driven, with Inventory Sync sessions triggering vulnerability processing when inventory data becomes available. Syscollector on each Wazuh agent collects operating system, package, and hotfix inventory and sends the data to the Wazuh manager. Inventory Sync processes the inventory through synchronization sessions and provides the resulting data to the Vulnerability Scanner. The Vulnerability Scanner correlates the inventory data with local CVE databases built from `Wazuh CTI <https://cti.wazuh.com/vulnerabilities/cves>`__ to identify vulnerabilities.

Configuration
^^^^^^^^^^^^^

Enable or disable the service and tune the CVE feed download using the ``<vulnerability-detection>`` block in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file. The following block shows the default configuration:

.. code-block:: xml
   :emphasize-lines: 3-6

   <wazuh_config>
     ...
     <vulnerability-detection>
       <enabled>yes</enabled>
       <feed-update-interval>60m</feed-update-interval>
     </vulnerability-detection>
     ...
   </wazuh_config>

Where:

-  ``<enabled>`` specifies whether the Vulnerability Detection module is enabled or not. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
-  ``<feed-update-interval>`` specifies the time interval for periodic feed updates. The default value is ``60m`` (one hour). The allowed value is a positive number that contains a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days).

The ``<vulnerability-detection>`` block does not configure a scan interval. Scan frequency follows the rate at which Wazuh agents synchronize their inventory.

You can find more configuration options in the :doc:`vulnerability detection </user-manual/reference/wazuh-manager-conf/vulnerability-detection>` section of the reference guide.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Cluster service
---------------

The cluster service synchronizes shared information across the nodes of a Wazuh manager cluster. It is managed by the ``wazuh-manager-clusterd`` daemon. Synchronized data includes Wazuh agent registration information, shared configuration, and Wazuh agent group assignments.

Every Wazuh manager installation runs as a cluster node, including single-node deployments. A cluster has exactly one master node and any number of worker nodes. Adding worker nodes provides horizontal scalability, and placing a load balancer in front of them provides high availability.

Configuration
^^^^^^^^^^^^^

The following ``<cluster>`` block represents the default cluster configuration in the Wazuh manager ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3-14

   <wazuh_config>
     ...
     <cluster>
       <name>wazuh</name>
       <node_name>node01</node_name>
       <node_type>master</node_type>
       <key><CLUSTER_ENCRYPTION_KEY></key>
       <port>1516</port>
       <bind_addr>127.0.0.1</bind_addr>
       <nodes>
           <node><MASTER_NODE_IP></node>
       </nodes>
       <hidden>no</hidden>
     </cluster>
     ...
   </wazuh_config>

Where:

-  ``<name>`` specifies the name of the Wazuh manager cluster this node belongs to. All nodes in the same cluster must use the same name. The default value is ``wazuh``.
-  ``<node_name>`` specifies the name of the current Wazuh manager node.
-  ``<key>`` specifies a unique 32-character key used to encrypt the communication between the Wazuh manager nodes. It must be the same on the master node and worker nodes. Replace ``<CLUSTER_ENCRYPTION_KEY>`` with your generated key.
-  ``<node_type>`` specifies the role of the Wazuh manager node. It can be either ``master`` or ``worker``.
-  ``<port>`` specifies the port to use for the Wazuh manager cluster communications. The default value is ``1516``.
-  ``<bind_addr>`` specifies the IP address the Wazuh manager node listens on (``0.0.0.0`` or a specific IP address). It binds to ``127.0.0.1`` by default.
-  ``<node>`` specifies the address of the master node within the ``<nodes>`` block. Specify this value in all Wazuh manager nodes, including the master node itself. Replace ``<MASTER_NODE_IP>`` with the IP address or a DNS name of the master node.
-  ``<hidden>`` sets whether findings include information about the cluster node that generated them. Allowed values are ``yes`` and ``no``. The default value is ``no``.

You can learn more about the configuration options in the :doc:`cluster </user-manual/reference/wazuh-manager-conf/cluster>` section of the reference guide.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.
