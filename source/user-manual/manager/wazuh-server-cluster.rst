.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server cluster is made up of multiple Wazuh server nodes in a distributed environment. learn more in this section of the documentation.

Wazuh server cluster
====================

The Wazuh server cluster is made up of multiple Wazuh server nodes in a distributed environment. This deployment strategy helps to provide horizontal scalability and improved performance. In an environment with many endpoints to monitor, you can combine this deployment strategy with a `network load balancer`_ to distribute the Wazuh agent connection load effectively across multiple nodes. This approach enables the Wazuh server to manage a large number of Wazuh agents more efficiently and ensure high availability.

Data synchronization
--------------------

The Wazuh server processes events from the Wazuh agents, external APIs, and network devices, raising alerts for threats and anomalies detected. Hence, all required information to receive events from the agents needs to be synchronized. This information is:

-  The Wazuh agents' keys, so the Wazuh server nodes can accept incoming connections from agents.
-  The Wazuh agents' shared configuration so the Wazuh server nodes can send the agents their configuration.
-  The Wazuh agents' groups assignments, so every Wazuh server node knows which configuration to send to the agents.
-  The custom decoders, rules, SCA policies and CDB lists so the Wazuh server nodes can correctly process events from the agents.
-  The Wazuh agents' last keep alive and OS information, which is received once the agents connect to a Wazuh server node and it's necessary to know whether an agent is reporting or not.

Having all this information synchronized allows any Wazuh server cluster nodes to process and raise alerts from the Wazuh agents properly. Data synchronization makes it possible to horizontally scale a Wazuh environment when new Wazuh agents are added.

Architecture overview
---------------------

The following diagram shows a typical Wazuh server cluster architecture:

.. thumbnail:: /images/manual/wazuh-server/typical-server-cluster-architecture.png
   :title: Typical Wazuh server cluster architecture
   :alt: Typical Wazuh server cluster architecture
   :align: center
   :width: 80%

In this architecture, there are multiple Wazuh server nodes within the cluster. The Wazuh server cluster consists of a master node and worker nodes. The Wazuh agents are configured to report to the server nodes in the cluster. This setup allows for horizontal scalability and enhances the performance of the Wazuh servers.

Types of nodes in a Wazuh server cluster
----------------------------------------

There are two types of nodes in the Wazuh server cluster, the master node and the worker node. The node types define the tasks of each node within the Wazuh server cluster and establish a hierarchy to determine which node's information takes precedence during synchronizations. A Wazuh server cluster can only have one master node, during synchronizations, the data from the master node always takes precedence over the data from worker nodes. This ensures uniformity and consistency within the cluster.

Master node
^^^^^^^^^^^

The master node centralizes and coordinates worker nodes, ensuring the critical and required data is consistent across all nodes. It provides the centralization of the following:

-  Receiving and managing agent registration and deletion requests.
-  Creating shared configuration groups.
-  Updating custom rules, decoders, SCA policies and CDB lists.

The Wazuh agent registration details, shared configuration, CDB list, custom SCA policies, custom decoders, and rules are synchronized from the master to the workers, ensuring that all nodes have the same configuration and rulesets. During synchronization, every version of these files on the worker node is overwritten with the files from the master node.

Worker node
^^^^^^^^^^^

A worker node is responsible for:

-  Redirecting Wazuh agent enrollment requests to the master node.
-  Synchronizing Wazuh agent registration details, shared configuration, CDB list, custom SCA policies, custom decoders, and rules from the master node.
-  Receiving and processing events from Wazuh agents.
-  Sending the Wazuh agent status update to the master node.

During synchronization, If any of the shared files are modified on a worker node, their contents are overwritten with the master node's contents during the next synchronization.

How the Wazuh server cluster works
----------------------------------

The Wazuh server cluster is managed by the ``wazuh-clusterd`` daemon which communicates with all the nodes following a master-worker architecture. Refer to the :doc:`Daemons section </user-manual/reference/daemons/clusterd>` for more information about its use.

The image below shows the communications between a worker and a master node. Each worker-master communication is independent of each other since workers are the ones who start the communication with the master.

There are different independent threads running and each one is framed in the image:

-  **Keep alive thread**: Responsible for sending keep alive messages to the master in frequent intervals. It is necessary to keep the connection opened between master and worker nodes, since the cluster uses permanent connections.
-  **Agent info thread**: Responsible for sending OS information, labels configured, and the :ref:`status of the Wazuh agents <agent_status_cycle>` that are reporting to that node. The master also checks whether the agent exists or not before saving its status update. This is done to prevent the master from storing unnecessary information. For example, this situation is very common when an agent is removed but the master hasn't notified worker nodes yet.
-  **Agent groups send thread**: Responsible for sending information of agent groups assignment to  worker nodes. The information is calculated in the master when an agent connects for the first time.
-  **Local agent-groups thread**: Responsible for reading all new agent groups information in the master. The master node needs to get agent-groups information from the database before sending it to all the worker nodes. To avoid requesting it once per each worker connection, the information is obtained and stored in a different thread called Local agent-groups thread, in the master node at intervals.
-  **Integrity thread**: Responsible for synchronizing files in the Wazuh server cluster, from the master node to the worker nodes. These files include the Wazuh agent keys file, :doc:`user defined rules, decoders </user-manual/ruleset/index>`, :doc:`custom SCA policies </user-manual/capabilities/sec-config-assessment/creating-custom-policies>`, :doc:`CDB lists </user-manual/ruleset/cdb-list>` and `group files </user-manual/agent/agent-management/grouping-agents>`.
-  **Local integrity thread**: Responsible for calculating the integrity of each file using its MD5 checksum and its modification time. To avoid calculating the integrity with each worker node connection, the integrity is calculated in a different thread, called the *File integrity thread*, in the master node at intervals..

All cluster logs are written in the ``/var/ossec/logs/cluster.log`` file of a default Wazuh installation.

.. thumbnail:: /images/manual/wazuh-server/server-cluster-diagram.png
   :title: Wazuh server cluster diagram
   :alt: Wazuh server cluster diagram
   :align: center
   :width: 80%

Wazuh cluster nodes configuration
---------------------------------

In a Wazuh server cluster, there can only be one master node in a cluster while all other Wazuh servers are the worker nodes. For both node types, the configuration file ``/var/ossec/etc/ossec.conf`` contains the cluster configuration values. We show how to configure a cluster with a master node and a single worker node.

Master node
^^^^^^^^^^^

#. For the Wazuh server master node, set the following configuration within the ``<cluster>`` block in the configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <cluster>
          <name>wazuh</name>
          <node_name>master-node</node_name>
          <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
          <node_type>master</node_type>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node>MASTER_NODE_IP</node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
      </cluster>

   Where:

   -  ``<name>`` is the name that will be assigned to the cluster.
   -  ``<node_name>`` is the name of the current node.
   -  ``<key>`` is a unique 32-characters long key and should be the same for all of the cluster nodes. We generate a unique key with the command ``openssl rand -hex 16``.
   -  ``<node_type>`` sets the node type to either ``master`` or ``worker``.
   -  ``<port>`` is the destination port for cluster communication.
   -  ``<bind_addr>`` is the IP address where the node is listening to (0.0.0.0 any IP).
   -  ``<node>`` specifies the address of the master node within the ``<nodes>`` block and this must be specified in all nodes including the master node itself. The address can be either an IP or a DNS.
   -  ``<hidden>`` toggles whether or not to show information about the cluster that generated an alert.
   -  ``<disabled>`` indicates whether the node will be enabled or not in the cluster.

   You can learn more about the available configuration options in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide.

#. Restart the master node to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Worker node
^^^^^^^^^^^

#. For the Wazuh server worker node, within the ``<cluster>...</cluster>`` in the configuration file ``/var/ossec/etc/ossec.conf`` we set the following configuration.

   .. code-block:: xml

      <cluster>
        <name>wazuh</name>
        <node_name>worker01-node</node_name>
        <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
        <node_type>worker</node_type>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
            <node>MASTER_NODE_IP</node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
      </cluster>

#. Restart the worker node to apply the configuration changes:

   .. code-block: console

      # systemctl restart wazuh-manager

#. Execute the following command to check that everything worked as expected:

   .. code-block: console

      # /var/ossec/bin/cluster_control -l

   .. note::

      The command above can be executed on either a master or worker node.

   .. code-block:: none
      :class: output

      NAME           TYPE    VERSION  ADDRESS
      master-node    master  4.8.0   wazuh-master
      worker01-node  worker  4.8.0   172.22.0.3

Certificates deployment
^^^^^^^^^^^^^^^^^^^^^^^

Wazuh uses certificates to establish trust and confidentiality between its central components - the Wazuh indexer, Filebeat, and the Wazuh dashboard. Certificates are deployed for new installation of Wazuh or during upscaling of Wazuh central components. The required certificates are:

-  **Root CA certificate**: The root CA (Certificate Authority) certificate acts as the foundation of trust for a security ecosystem. It is used to authenticate the identity of all nodes within the system and to sign other certificates, thereby establishing a chain of trust.
-  **Node certificates**:  Node certificates uniquely identify each node within the Wazuh cluster. They are used to encrypt and authenticate communications between the nodes.

   Each node certificate must include either the IP address or the DNS name of the node. This is important for the verification process during communications, ensuring that the data is indeed being sent to and received from trusted nodes. These certificates, signed by the root CA, ensure that any communication between the nodes is trusted and verified through this central authority.

-  **Admin certificate**: The admin certificate is a client certificate with special privileges. The Wazuh indexer uses it to perform management and security-related tasks such as initializing and managing the Wazuh indexer cluster, creating, modifying, and deleting users, as well as managing roles and permissions. It also helps ensure that only authorized commands are executed within the cluster.

You can deploy certificates using two methods:

-  :ref:`Using the  wazuh-certs-tool.sh script <using_wazuh_certs_tool>`
-  `Using custom certificates`_

.. _using_wazuh_certs_tool:

Using the ``wazuh-certs-tool.sh`` script (default method)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``wazuh-certs-tool.sh`` script simplifies certificate generation for Wazuh central components and creates all the certificates required for installation. You need to create or edit the configuration file ``config.yml``. This file references the node details like node types and IP addresses or DNS names which are used to generate certificates for each of the nodes specified in it. A template could be downloaded from our `repository <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml>`__. These certificates are created with the following additional information:

-  ``C``: US
-  ``L``: California
-  ``O``: Wazuh
-  ``OU``: Wazuh
-  ``CN``: Name of the node

Generating Wazuh server certificates
''''''''''''''''''''''''''''''''''''

Follow the steps below to create Wazuh server certificates using the ``wazuh-certs-tool.sh`` script:

#. Run the command below to download the `wazuh-certs-tool.sh <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh>`__ script in your installation directory:

   .. code-block:: console

      # wget https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh

#. Create a ``config.yml`` file with the following content. We specify only the details regarding the Wazuh server nodes as we are focusing on creating certificates for the Wazuh server. These certificates will be used to integrate the Wazuh server with Filebeat for secure data transmission.

   .. code-block:: yaml

      nodes:
        # Wazuh server nodes
        # If there is more than one Wazuh server
        # node, each one must have a node_type
        server:
          - name: wazuh-1
            ip: "<WAZUH_MANAGER_IP>"
          #  node_type: master
          #- name: wazuh-2
          #  ip: "<WAZUH_MANAGER_IP>"
          #  node_type: worker
          #- name: wazuh-3
          #  ip: "<WAZUH_MANAGER_IP>"
          #  node_type: worker

   Where:

   -  ``name`` represents a unique node name. You can choose any.
   -  ``ip`` represents the IP address or DNS name of the node.
   -  ``node type`` represents the node type to configure. Two types are available, master and worker. You can only have one master node per cluster.
   -  ``<WAZUH_MANAGER_IP>`` represents the IP address of Wazuh manager nodes (master/worker)

#. Run the script to create the Wazuh server certificates:

   .. code-block:: console

      # bash wazuh-certs-tool.sh -A

   After deploying the certificates, a directory ``wazuh-certificates`` will be created in the installation directory with the following content:

   .. code-block:: none

      wazuh-certificates/
      ├── admin-key.pem
      ├── admin.pem
      ├── root-ca.key
      ├── root-ca.pem
      ├── server-key.pem
      └── server.pem

   The files in this directory are as follows:

   -  ``root-ca.pem`` and ``root-ca.key``: These files represent the root Certificate Authority (CA). The ``.pem`` file contains the public certificate, while the ``.key`` file holds the private key used for signing other certificates.

      .. note::

         If you are deploying a complete Wazuh infrastructure and deploying certificates for the first time you need to conserve the root CA certificate. This will be used to create and sign certificates for the Wazuh indexer and Wazuh dashboard nodes.

   -  ``admin.pem`` and ``admin-key.pem``: These files contain the public and private keys used by the Wazuh indexer to perform management and security-related tasks such as initializing the Wazuh indexer cluster, creating and managing users and roles.
   -  ``server.pem`` and ``server-key.pem``: The ``server.pem`` file contains the public key, which is used by Filebeat to verify the authenticity of the Wazuh server during communication. Conversely, the ``server-key.pem`` file holds the private key, which is kept securely on the Wazuh server and used to authenticate itself to Filebeat.

      In a clustered environment comprising two or more Wazuh server nodes, unique pairs of public and private keys are generated for each node. These keys are specific to the node and are identified by the names defined in the ``name`` field of the ``config.yml`` file. These key pairs must then be transferred to their corresponding nodes.

#. Once the certificates are created, you need to rename and move the Wazuh server certificate to the appropriate Wazuh server nodes respectively. You need to place them in the default directory ``/etc/filebeat/certs/`` as referenced in the file ``/etc/filebeat/filebeat.yml``. You should create the directory if it doesn’t exist.

   .. code-block:: console

      # mv /path/to/server-key.pem /etc/filebeat/certs/filebeat-key.pem
      # mv /path/to/server.pem /etc/filebeat/certs/filebeat.pem

Generating Wazuh server certificates using the pre-existing root CA
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

