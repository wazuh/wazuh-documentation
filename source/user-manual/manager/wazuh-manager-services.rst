.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager services handle agent enrollment and connection, vulnerability detection, cluster operations, and API access. Learn more in this section of the documentation.

Wazuh manager services
======================

The Wazuh manager is composed of multiple services, each designed to perform a specific operational function within the Wazuh platform. These services work together to handle tasks such as securing and receiving Wazuh agent communications, managing cluster operations, and providing API access.

Each Wazuh manager service has its own configuration block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file. The ``wazuh-manager-control`` script starts ``wazuh-manager-apid``, which serves the Wazuh manager API, only on the master node. It skips ``wazuh-manager-authd`` when the ``<disabled>`` option in the ``<auth>`` block is set to ``yes``. This setting also closes the ``POST /enroll`` endpoint, so neither Wazuh 4.x nor Wazuh 5.x agents can enroll.

The following table lists the daemon and the configuration block of each Wazuh manager service:

.. list-table::
   :header-rows: 1
   :widths: 40 35 25

   * - Service
     - Daemon
     - Configuration block
   * - :ref:`Agent enrollment service <agent_enrollment_service>`
     - ``wazuh-manager-authd``
     - ``<auth>``
   * - :ref:`Agent connection service <agent_connection_service>`
     - ``wazuh-manager-remoted``
     - ``<remote>``
   * - :ref:`Vulnerability detection service <vulnerability_detection_service>`
     - ``wazuh-manager-modulesd``
     - ``<vulnerability-detection>``
   * - :ref:`Cluster service <cluster_service>`
     - ``wazuh-manager-clusterd``
     - ``<cluster>``

The ``wazuh-manager`` :doc:`systemd unit <service-sandbox>` confines every daemon without using a chroot. It mounts ``/usr``, ``/boot``, ``/efi``, and the rest of ``/etc`` read-only, and keeps ``/var/wazuh-manager`` and ``/etc/wazuh-manager`` writable. Each daemon also gets private ``/tmp`` and ``/var/tmp`` directories. A Wazuh manager installed under ``/home``, ``/root``, ``/run/user``, ``/tmp``, or ``/var/tmp`` cannot run.

.. _agent_enrollment_service:

Agent enrollment service
------------------------

The agent enrollment service registers Wazuh agents with the Wazuh manager through the ``wazuh-manager-authd`` daemon. It receives enrollment requests, validates credentials, generates the agent key, and stores the resulting entry in the ``client.keys`` file and in Wazuh DB.

Wazuh 5.x agents enroll over HTTPS through the ``POST /enroll`` endpoint of the agent connection service on port ``1517``. The endpoint forwards requests to the same ``wazuh-manager-authd`` daemon through its local socket. This method ensures that all enrollment requests use the same validation path. Port ``1515`` remains supported for legacy Wazuh 4.x agents.

When a Wazuh agent starts, it contacts the Wazuh manager to begin enrollment. A Wazuh 5.x agent uses an enrollment token that you create on the Wazuh manager. Legacy Wazuh 4.x agents use port ``1515`` and the shared enrollment password, which is required by default. The Wazuh manager generates the password at first startup and stores it in the ``/etc/wazuh-manager/authd.pass`` file. After successful enrollment, the Wazuh manager generates a unique agent key. The Wazuh agent uses this key to sign the bearer tokens that authenticate its subsequent requests.

Enrollment tokens
^^^^^^^^^^^^^^^^^

An enrollment token is a credential that a Wazuh 5.x agent presents during enrollment. It contains the Wazuh manager address, the certificate authority (CA) to trust, and an enrollment credential. By default, tokens expire after 30 days and have no usage limit.

You can create an enrollment token on the Wazuh manager using the following command as root:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <ADDRESS>

You can also create tokens using the ``/agents/enrollment-tokens`` endpoint of the Wazuh manager API. The ``wazuh-manager-authd`` command also supports listing, displaying, revoking, and purging tokens through the ``--list-enrollment-tokens``, ``--show-token``, ``--revoke-enrollment-token``, and ``--purge-enrollment-tokens`` options.

Specify the address that the Wazuh agent uses to connect to the Wazuh manager. The enrollment service validates this address against the :ref:`Subject Alternative Names (SANs) <manager_credentials_sans>` in the Wazuh manager certificate. It rejects tokens that specify an address not included in the certificate.

For command output and available options, see the :doc:`Enrollment token command-line reference </user-manual/reference/tools/enrollment-tokens>`.

To enroll a Wazuh agent using a token, set the ``WAZUH_ENROLLMENT_TOKEN`` variable when installing the Wazuh agent package. Alternatively, run the following command as root on an installed Linux Wazuh agent:

.. code-block:: console

   # /var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE>

For installation instructions, see the :doc:`Wazuh agent installation </installation-guide/wazuh-agent/index>` guide.

In a Wazuh manager cluster, the master node creates all enrollment tokens. It validates each address against its own certificate. A token for a worker node address is rejected unless the master certificate also includes that address.

.. note::

   A certificate with only loopback addresses in its SANs cannot be used to create enrollment tokens. Configure the HTTPS listener certificate with the addresses that Wazuh agents use before creating tokens.

Configuration
^^^^^^^^^^^^^

The following ``<auth>`` block shows the default agent enrollment service configuration in the ``<wazuh_config>`` block of the ``/etc/wazuh-manager/wazuh-manager.conf`` file:

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
       <ssl_manager_cert>/etc/wazuh-manager/certs/remoted.pem</ssl_manager_cert>
       <ssl_manager_key>/etc/wazuh-manager/certs/remoted-key.pem</ssl_manager_key>
     </auth>
     ...
   </wazuh_config>

Where:

-  ``<disabled>`` enables or disables the process of the Wazuh agent enrolling and authenticating with the Wazuh manager through both the ``POST /enroll`` endpoint and port ``1515``. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<port>`` specifies the TCP port number for listening to legacy Wazuh 4.x agent enrollment connections. The default value is ``1515``. The allowed value is any port number between ``1`` and ``65535``.
-  ``<use_source_ip>`` defines whether to register a Wazuh agent with its source IP address instead of ``any``. The allowed values are ``yes`` and ``no``. When the value is ``no``, the Wazuh agent can connect to the Wazuh manager even if the source IP used for enrollment changes. However, when the value is ``yes``, the Wazuh agent cannot connect to the Wazuh manager if the source IP address changes.
-  ``<purge>`` specifies whether the ``client.keys`` file keeps a record of removed Wazuh agents. When the value is ``no``, the file keeps each removed Wazuh agent as an entry marked as removed. When the value is ``yes``, the Wazuh manager removes the entry without leaving a trace. The installer sets the value to ``yes``, and the value is ``no`` when the option is absent. The possible values are ``yes`` and ``no``.
-  ``<use_password>`` determines the use of shared password authentication. When the option is absent, the value is ``no``. The configuration that the installer generates sets it to ``yes``. When the value is ``no``, this option is disabled. When the value is set to ``yes``, a shared password is read from the ``/etc/wazuh-manager/authd.pass`` file.
-  ``<ciphers>`` sets the TLS 1.3 cipher suites that the agent enrollment service accepts on port ``1515``. The default value is ``TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256``.
-  ``<ssl_agent_ca>`` specifies the path to the CA certificate used to verify clients. Use an absolute path to a file in ``/etc/wazuh-manager/certs``.
-  ``<ssl_verify_host>`` toggles source host verification on and off when a CA certificate is specified. The agent enrollment service checks that the agent certificate names the source address, first in its Subject Alternative Names and then in its Common Name field. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<ssl_manager_cert>`` specifies the path to the Wazuh manager SSL certificate. The default value is ``/etc/wazuh-manager/certs/remoted.pem``. The possible value is an absolute path to a file in ``/etc/wazuh-manager/certs``.
-  ``<ssl_manager_key>`` specifies the path to the Wazuh manager SSL key. The default value is ``/etc/wazuh-manager/certs/remoted-key.pem``. The possible value is an absolute path to a file in ``/etc/wazuh-manager/certs``.
-  ``<ipv6>`` sets whether the agent enrollment service listens on IPv6. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<force>`` sets when the Wazuh manager replaces an existing Wazuh agent that enrolls again with the same name or IP address. See :ref:`force <reference_wazuh_manager_conf_auth_force>` for its options and defaults.
-  ``<remote_enrollment>`` sets whether Wazuh agents can enroll through the HTTPS listener on port ``1517`` and on port ``1515``. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
-  ``<legacy_enrollment>`` sets whether Wazuh 4.x agents can enroll on port ``1515``. When the option is absent, it follows ``<remote><legacy><enabled>``. The ``<port>`` listener opens only while legacy enrollment is active.

For all the options, see :ref:`auth <reference_wazuh_manager_conf_auth>`.

.. note::

   The Wazuh manager does not generate TLS certificates at startup. The :doc:`credential resolver <credentials>` issues the certificate pair during installation. The agent enrollment service does not start if the files referenced by ``<ssl_manager_cert>`` and ``<ssl_manager_key>`` are missing or unreadable.

.. note::

   Whenever you change the ``/etc/wazuh-manager/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes. Before you restart it, run ``/var/wazuh-manager/bin/wazuh-manager-control check`` to check the file and the credentials.

.. _agent_connection_service:

Agent connection service
------------------------

The agent connection service, provided by the ``wazuh-manager-remoted`` daemon, manages secure communication between Wazuh agents and the Wazuh manager. It handles agent connections, authentication, event ingestion, state synchronization, and the delivery of centralized configuration and upgrade packages.

In Wazuh 5.0, agents communicate over an HTTPS API on port ``1517``. The listener authenticates every request with a per-agent JSON Web Token (JWT) bearer token that the agent signs with its ``client.keys`` key. The Wazuh manager also checks the request source address against the Wazuh agent ``client.keys`` entry.

The legacy AES-encrypted TCP and UDP channel on port ``1514`` serves Wazuh 4.x agents. The Wazuh manager starts it only when the ``<legacy>`` block inside ``<remote>`` is enabled. The configuration that the installer generates enables this block. Without that block, only Wazuh 5.x agents can connect.

Configuration
^^^^^^^^^^^^^

The following ``<remote>`` block shows the default connection service configuration in the ``<wazuh_config>`` block of the ``/etc/wazuh-manager/wazuh-manager.conf`` file:

.. code-block:: xml
   :emphasize-lines: 3-24

   <wazuh_config>
     ...
     <remote>
       <https>
         <port>1517</port>
         <bind_addr>0.0.0.0</bind_addr>
         <global_prefix>/wazuh-manager/</global_prefix>
         <certificate>/etc/wazuh-manager/certs/remoted.pem</certificate>
         <key>/etc/wazuh-manager/certs/remoted-key.pem</key>
         <ca_certificate>/etc/wazuh-manager/certs/root-ca.pem</ca_certificate>
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
     ...
   </wazuh_config>

Where:

**HTTPS options**

-  ``<https>`` specifies the configuration parameters for the HTTPS listener. All options are optional; an absent ``<https>`` block (or an absent individual option) falls back to the default values listed below, so the listener works without any configuration.
-  ``<port>`` specifies the HTTPS listening port. The default port value is ``1517``. The allowed value is any port number between ``1`` and ``65535``.
-  ``<bind_addr>`` specifies the address the HTTPS listener binds to. The default value is ``0.0.0.0``. The allowed values are any valid IPv4 or IPv6 address.
-  ``<global_prefix>`` specifies the URL path prefix every HTTPS endpoint is served under. The default path is ``/wazuh-manager/``.
-  ``<certificate>`` specifies the path to the TLS certificate chain (PEM) presented by the Wazuh manager. The default path is ``/etc/wazuh-manager/certs/remoted.pem``. It must be an absolute path to a file in ``/etc/wazuh-manager/certs``.
-  ``<key>`` specifies the path to the TLS private key (PEM) that matches the ``certificate``. The default path is ``/etc/wazuh-manager/certs/remoted-key.pem``. It must be an absolute path to a file in ``/etc/wazuh-manager/certs``.
-  ``<ca_certificate>`` specifies the path to the CA certificate (PEM) that issued the listener certificate. The default path is ``/etc/wazuh-manager/certs/root-ca.pem``. It must be an absolute path to a file in ``/etc/wazuh-manager/certs``.

**Legacy options**

-  ``<legacy>`` specifies the configuration parameters for the TCP/UDP listener.
-  ``<enabled>`` enables the classic TCP/UDP listener and every subsystem that only serves Wazuh 4.x agents. The default value is ``yes`` when ``<legacy>`` is present. The allowed values are ``yes`` and ``no``.
-  ``<port>`` specifies the listening port for Wazuh agent connections. The default port is ``1514``. The allowed value is any port number between ``1`` and ``65535``.
-  ``<protocol>`` specifies communication protocol(s) to accept from Wazuh agents. The default value is ``tcp``. The allowed values are ``tcp``, ``udp``, or ``tcp,udp``.
-  ``<local_ip>`` binds ``wazuh-manager-remoted`` to a specific local IP address. The default value is ``0.0.0.0``. The allowed values are any valid IPv4 or IPv6 address.
-  ``<queue_size>`` specifies the message queue size for incoming agent messages. The default value is ``131072``. The allowed value is any positive integer.

**Agents options**

-  ``<allow_higher_versions>`` allows the Wazuh manager to accept connections from Wazuh agents running a Wazuh version higher than the manager. The default value is ``no``. Enable it only while you upgrade Wazuh agents to a new minor or major version before the Wazuh manager. To let these Wazuh agents also enroll, set ``<allow_higher_versions>`` in the ``<agents>`` block of ``<auth>`` too.

You can find more configuration options in the :doc:`remote </user-manual/reference/wazuh-manager-conf/remote>` section of the reference guide.

.. note::

   Whenever you change the ``/etc/wazuh-manager/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes. Before you restart it, run ``/var/wazuh-manager/bin/wazuh-manager-control check`` to check the file and the credentials.

.. _vulnerability_detection_service:

Vulnerability detection service
-------------------------------

This service uses the Vulnerability Scanner module of ``wazuh-manager-modulesd`` to detect known security vulnerabilities on monitored endpoints. It is event-driven, with inventory synchronization sessions triggering vulnerability processing when inventory data becomes available. Syscollector, the system inventory module of each Wazuh agent, collects operating system, package, and hotfix inventory and sends the data to the Wazuh manager. Inventory Sync, the inventory synchronization module of ``wazuh-manager-modulesd``, processes the inventory through synchronization sessions and provides the resulting data to the Vulnerability Scanner. To identify vulnerabilities, the Vulnerability Scanner correlates the inventory data with local CVE databases, built from `Wazuh CTI <https://cti.wazuh.com/vulnerabilities/cves>`__ data that the Wazuh manager reads from the Wazuh indexer.

Configuration
^^^^^^^^^^^^^

Enable or disable the service and tune the CVE feed download using the ``<vulnerability-detection>`` block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file. The following block shows the default configuration:

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

-  ``<enabled>`` specifies whether the vulnerability detection service is enabled. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
-  ``<feed-update-interval>`` specifies the time interval for periodic feed updates. The default value is ``60m`` (one hour). The allowed value is a positive number that contains a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days). The minimum is ``1s``. The Wazuh manager doesn't start with a value of ``0``.

The ``<vulnerability-detection>`` block does not configure a scan interval. Scan frequency follows the rate at which Wazuh agents synchronize their inventory.

You can find more configuration options in the :doc:`vulnerability detection </user-manual/reference/wazuh-manager-conf/vulnerability-detection>` section of the reference guide.

.. note::

   Whenever you change the ``/etc/wazuh-manager/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes. Before you restart it, run ``/var/wazuh-manager/bin/wazuh-manager-control check`` to check the file and the credentials.

.. _cluster_service:

Cluster service
---------------

The cluster service synchronizes shared information across the nodes of a Wazuh manager cluster. It is managed by the ``wazuh-manager-clusterd`` daemon. Synchronized data includes Wazuh agent registration information, shared configuration, and Wazuh agent group assignments.

Every Wazuh manager installation runs as a cluster node, including single-node deployments. A cluster has exactly one master node and any number of worker nodes. Worker nodes provide horizontal scalability, and a load balancer in front of them distributes Wazuh agent connections across the nodes.

Configuration
^^^^^^^^^^^^^

The following ``<cluster>`` block is a template of the cluster configuration in the Wazuh manager ``/etc/wazuh-manager/wazuh-manager.conf`` file:

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
-  ``<node_name>`` specifies the name of the current Wazuh manager node. Each node must have a unique name.
-  ``<key>`` specifies a unique 32-character key used to encrypt the communication between the Wazuh manager nodes. It must be the same on the master node and worker nodes. The installer writes a random key. To set your own, run ``openssl rand -hex 16`` and replace ``<CLUSTER_ENCRYPTION_KEY>`` with the output. Copy the master node key to every worker node.
-  ``<node_type>`` specifies the role of the Wazuh manager node. It can be either ``master`` or ``worker``. Set it to ``worker`` on worker nodes.
-  ``<port>`` specifies the port to use for the Wazuh manager cluster communications. The default value is ``1516``.
-  ``<bind_addr>`` specifies the IP address the master node listens on for worker node connections (``0.0.0.0`` or a specific IP address). Worker nodes ignore this option. The default value is ``127.0.0.1``. Worker nodes can't connect to a master node that listens on ``127.0.0.1``. On the master node of a multi-node cluster, set it to an address that the worker nodes can reach, such as its address on the management network, or to ``0.0.0.0``. Avoid ``0.0.0.0`` on an endpoint whose other interfaces face Wazuh agents or users.
-  ``<node>`` specifies the address of the master node within the ``<nodes>`` block. Specify this value in all Wazuh manager nodes, including the master node itself. Replace ``<MASTER_NODE_IP>`` with the IP address or a DNS name of the master node. The installer sets it to ``127.0.0.1``.
-  ``<hidden>`` has no effect in Wazuh 5.0. The Wazuh manager accepts the option only for configuration compatibility. Allowed values are ``yes`` and ``no``. The default value is ``no``.

You can learn more about the configuration options in the :doc:`cluster </user-manual/reference/wazuh-manager-conf/cluster>` section of the reference guide.

.. note::

   Whenever you change the ``/etc/wazuh-manager/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes. Before you restart it, run ``/var/wazuh-manager/bin/wazuh-manager-control check`` to check the file and the credentials.
