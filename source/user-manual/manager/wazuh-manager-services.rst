.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager services handle agent enrollment and connection, vulnerability detection, cluster operations, and API access. Learn more in this section of the documentation.

Wazuh manager services
======================

The Wazuh manager is composed of multiple services, each designed to perform a specific operational function within the Wazuh platform. These services work together to handle tasks such as securing and receiving Wazuh agent communications, managing cluster operations, and providing API access.

This section describes the purpose, responsibilities, and configuration of each Wazuh manager service.

Agent enrollment service
------------------------

The agent enrollment service enrolls Wazuh agents in the Wazuh manager. It ensures that Wazuh agents are properly authenticated and configured to communicate securely with the Wazuh manager.

When a Wazuh agent is installed and started on an endpoint, it automatically contacts the Wazuh manager to initiate the enrollment process. The Wazuh manager generates a unique authentication key that encrypts its communication with the Wazuh agent. You can configure additional security measures for the enrollment process, such as password authentication, Wazuh manager identity verification, and Wazuh agent identity verification.

More options can be found in the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` documentation.

Configuration
^^^^^^^^^^^^^

The ``<auth>`` block below shows an agent enrollment service configuration in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file of a Wazuh manager:

.. code-block:: xml

   <ossec_config>
     ...
     <auth>
       <disabled>no</disabled>
       <port>1515</port>
       <use_source_ip>no</use_source_ip>
       <purge>yes</purge>
       <use_password>no</use_password>
       <ciphers>HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH</ciphers>
       <!-- <ssl_agent_ca></ssl_agent_ca> -->
       <ssl_verify_host>no</ssl_verify_host>
       <ssl_manager_cert>etc/sslmanager.cert</ssl_manager_cert>
       <ssl_manager_key>etc/sslmanager.key</ssl_manager_key>
       <ssl_auto_negotiate>no</ssl_auto_negotiate>
     </auth>
     ...
   </ossec_config>

Where:

-  ``<disabled>`` enables or disables the process of the Wazuh agent enrolling and authenticating with the Wazuh manager. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<port>`` specifies the TCP port number for listening to connections. The default value is ``1515``. The allowed value is any port number between ``0`` and ``65535``.
-  ``<use_source_ip>`` defines whether to use the client's source IP address or the use of "any" to add a Wazuh agent. The allowed values are ``yes`` and ``no``. When the value is ``no``, the Wazuh agent can connect to the Wazuh manager even if the source IP used for enrollment changes. However, when the value is ``yes``, the Wazuh agent cannot connect to the Wazuh manager if the source IP address changes.
-  ``<purge>`` specifies whether the client keys will be deleted when Wazuh agents are removed. When the value is ``no``, removed Wazuh agents will remain in the client keys file marked as removed. When the value is set to ``yes``, the client keys file will be purged. The default value is ``yes``. The possible values are ``yes`` and ``no``.
-  ``<use_password>`` determines the use of shared password authentication. When the value is ``no``, this option is disabled. When the value is set to ``yes``, a shared password will be read from the ``/var/wazuh-manager/etc/authd.pass`` file. If this file does not exist, a random password will be generated and stored in the ``/var/wazuh-manager/logs/wazuh-manager.log`` file on the Wazuh manager. See the :doc:`using password authentication </user-manual/agent/agent-enrollment/security-options/using-password-authentication>` documentation for more information.
-  ``<ciphers>`` sets the list of ciphers for network communication using SSL. The default value is ``HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH``.
-  ``<ssl_agent_ca>`` specifies the path to the CA certificate used to verify clients. It can be referred to as a relative path under the Wazuh installation directory or a full path. The possible value is any valid path.
-  ``<ssl_verify_host>`` toggles source host verification on and off when a CA certificate is specified. The client source IP address will be validated using the Common Name field. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<ssl_manager_cert>`` specifies the path to the Wazuh manager SSL certificate. It can be referred to as a relative path under the Wazuh installation directory or a full path. The default value is ``etc/sslmanager.cert``. The possible value is any valid path.
-  ``<ssl_manager_key>`` specifies the path to the Wazuh manager SSL key. It can be referred to as a relative path under the Wazuh installation directory or a full path. The default value is ``etc/sslmanager.key``. The possible value is any valid path.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Agent connection service
------------------------

The agent connection service listens for events from Wazuh agents to establish and maintain a persistent and secure communication channel. The Wazuh agent uses this secure channel to send security data to the Wazuh manager for transformation. By default, the agent connection service uses the ``TCP`` protocol to secure communication between the Wazuh agent and the Wazuh manager.

Configuration
^^^^^^^^^^^^^

The ``<remote>`` block below is the default connection service configuration in the Wazuh manager ``/var/wazuh-manager/etc/wazuh-manager.conf`` configuration file:

.. code-block:: xml

   <ossec_config>
     ...
     <remote>
       <port>1514</port>
       <protocol>tcp</protocol>
       <queue_size>131072</queue_size>
     </remote>
     ...
   </ossec_config>

Where:

-  ``<port>`` specifies the port to use to listen for events. The default port value is ``1514`` for secure connection and ``514`` for syslog connection. The allowed value is any port number between ``1`` and ``65535``.
-  ``<protocol>`` specifies the protocol to use for the connection. The default value is ``tcp``. The allowed values are ``tcp`` and ``udp``.
-  ``<queue_size>`` allows you to set the capacity of the remote daemon queue in the number of Wazuh agent events. The default value is ``131072``. The allowed value is an integer between ``1`` and ``262144``. The remote queue is only available for Wazuh agent events, not syslog events. This option only works when the connection is set to secure.

More options can be found in the :ref:`remote <reference_ossec_remote>` section of the Wazuh documentation.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Vulnerability detection service
-------------------------------

This service runs as a background process and is responsible for identifying known security vulnerabilities on monitored endpoints.

Configuration
^^^^^^^^^^^^^

The vulnerability detection service is configurable. Users can enable or disable the service and customize settings such as scan intervals and vulnerability feed update intervals. The ``<vulnerability-detection>`` block below shows the default vulnerability detection service configuration in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file of the Wazuh manager:

.. code-block:: xml

   <ossec_config>
     ...
     <vulnerability-detection>
       <enabled>yes</enabled>
       <feed-update-interval>60m</feed-update-interval>
     </vulnerability-detection>
     ...
   </ossec_config>

Where:

-  ``<enabled>`` specifies whether the Vulnerability Detection module is enabled or not. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
-  ``<feed-update-interval>`` specifies the time interval for periodic feed updates. The default value is ``60m`` (one hour), the minimum allowed. The allowed value is a positive number that contains a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days).

More options can be found in the :doc:`vulnerability detection </user-manual/reference/ossec-conf/vuln-detector>` reference guide in the documentation.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Cluster service
---------------

The Wazuh cluster service is managed by the :ref:`Clusterd <wazuh_manager_daemons>` (``wazuh-manager-clusterd``) daemon that enables multiple Wazuh manager nodes to synchronize shared information across the Wazuh manager cluster. This includes Wazuh agent registration data, shared configuration files, Wazuh agent groups, and other cluster-managed resources.

A Wazuh manager cluster consists of a Wazuh manager master node and one or more worker nodes that provide scalability and high availability. Worker nodes receive events from connected Wazuh agents and synchronize the required information with the master node to maintain a consistent configuration across the deployment.

Configuration
^^^^^^^^^^^^^

The following ``<cluster>`` block represents the default cluster configuration in the Wazuh manager ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

.. code-block:: xml

   <ossec_config>
     ...
     <cluster>
       <name>wazuh</name>
       <node_name>node01</node_name>
       <node_type>master</node_type>
       <key>fd3350b86d239654e34866ab3c4988a8</key>
       <port>1516</port>
       <bind_addr>127.0.0.1</bind_addr>
       <nodes>
           <node>127.0.0.1</node>
       </nodes>
       <hidden>no</hidden>
     </cluster>
     ...
   </ossec_config>

Where:

-  ``<name>`` is the name that will be assigned to the cluster.
-  ``<node_name>`` is the name of the current Wazuh manager node.
-  ``<node_type>`` sets the Wazuh manager node type to either ``master`` or ``worker``.
-  ``<key>`` is a unique 32-character key generated before configuring the cluster and must be the same on all cluster nodes.
-  ``<port>`` is the destination port for cluster communication.
-  ``<bind_addr>`` is the IP address where the Wazuh manager node is listening to (0.0.0.0 or any IP address).
-  ``<node>`` specifies the address of the master node within the ``<nodes>`` block, and this must be specified in all Wazuh manager nodes, including the master node itself. The address can be either an IP address or a DNS.
-  ``<hidden>`` toggles whether or not to show information about the cluster that generated an alert.

More options can be found in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide of the documentation.

.. note::

   Whenever you change the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file, restart the Wazuh manager to apply changes.

Wazuh manager API service
-------------------------

The Wazuh manager API service provides a RESTful interface for interacting with the Wazuh manager, allowing users and external applications to query data and perform management operations.
