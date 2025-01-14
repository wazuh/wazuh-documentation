.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server cluster is made up of multiple Wazuh server nodes in a distributed environment. learn more in this section of the documentation.

Wazuh server cluster
====================

The Wazuh server cluster is made up of multiple Wazuh server nodes in a distributed environment. This deployment strategy helps to provide horizontal scalability and improved performance. In an environment with many endpoints to monitor, you can combine this deployment strategy with a :ref:`network load balancer <connecting_with_load_balancer>` to distribute the Wazuh agent connection load effectively across multiple nodes. This approach enables the Wazuh server to manage a large number of Wazuh agents more efficiently and ensure high availability.

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

The Wazuh server cluster is managed by the ``wazuh-clusterd`` daemon which communicates with all the nodes following a master-worker architecture. Refer to the :doc:`Daemons </user-manual/reference/daemons/clusterd>` section for more information about its use.

The image below shows the communications between a worker and a master node. Each worker-master communication is independent of each other since workers are the ones who start the communication with the master.

There are different independent threads running and each one is framed in the image:

-  **Keep alive thread**: Responsible for sending keep alive messages to the master in frequent intervals. It is necessary to keep the connection opened between master and worker nodes, since the cluster uses permanent connections.
-  **Agent info thread**: Responsible for sending OS information, labels configured, and the :ref:`status of the Wazuh agents <agent-status-cycle>` that are reporting to that node. The master also checks whether the agent exists or not before saving its status update. This is done to prevent the master from storing unnecessary information. For example, this situation is very common when an agent is removed but the master hasn't notified worker nodes yet.
-  **Agent groups send thread**: Responsible for sending information of agent groups assignment to  worker nodes. The information is calculated in the master when an agent connects for the first time.
-  **Local agent-groups thread**: Responsible for reading all new agent groups information in the master. The master node needs to get agent-groups information from the database before sending it to all the worker nodes. To avoid requesting it once per each worker connection, the information is obtained and stored in a different thread called *Local agent-groups thread*, in the master node at intervals.
-  **Integrity thread**: Responsible for synchronizing files in the Wazuh server cluster, from the master node to the worker nodes. These files include the Wazuh agent keys file, :doc:`user defined rules, decoders </user-manual/ruleset/index>`, :doc:`custom SCA policies </user-manual/capabilities/sec-config-assessment/creating-custom-policies>`, :doc:`CDB lists </user-manual/ruleset/cdb-list>` and :doc:`group files </user-manual/agent/agent-management/grouping-agents>`.
-  **Local integrity thread**: Responsible for calculating the integrity of each file using its MD5 checksum and its modification time. To avoid calculating the integrity with each worker node connection, the integrity is calculated in a different thread, called the *File integrity thread*, in the master node at intervals..

All cluster logs are written in the ``/var/ossec/logs/cluster.log`` file of a default Wazuh installation.

.. thumbnail:: /images/manual/wazuh-server/server-cluster-diagram.png
   :title: Wazuh server cluster diagram
   :alt: Wazuh server cluster diagram
   :align: center
   :width: 80%

.. _wazuh_cluster_nodes_configuration:

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

   .. code-block:: console

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

Wazuh also gives the ability to create and sign the admin and node(s) certificates using a pre-existing root CA. It avoids having to recreate certificates for all the nodes.

.. note::

   You need to use a pre-existing root CA to create Wazuh server certificates:

   -  If you already have a root CA after generating certificates for the :doc:`Wazuh indexer </user-manual/wazuh-indexer-cluster/certificate-deployment>` or :doc:`Wazuh dashboard </user-manual/wazuh-dashboard/certificates>` nodes.
   -  If you need to re-install a Wazuh server node or add a new node to your Wazuh server cluster.

#. Create a ``config.yml`` file. You must specify the details for only the Wazuh server node(s) you want to create certificates for, depending on the cases described in the note above.

#. Run the command below to create Wazuh server certificates from the ``config.yml`` file using the pre-existing root CA keys:

   .. code-block:: console

      # bash wazuh-certs-tool.sh -ws /path/to/root-ca.pem /path/to/root-ca.key

   Where:

   -  The flag ``-ws`` indicates we are creating Wazuh server certificates.
   -  The file ``/path/to/root-ca.pem`` contains the root CA certificate.
   -  The file ``/path/to/root-ca.key`` contains the root CA key.

   After deploying the certificates, a directory ``wazuh-certificates`` will be created in the installation directory with content similar to the one below:

   .. code-block:: none

      wazuh-certificates/
      ├── admin-key.pem
      ├── admin.pem
      ├── server-key.pem
      └── server.pem

#. Once the certificates are created, you need to rename and move the Wazuh server certificate to the appropriate Wazuh server nodes respectively. You need to place them in the default directory ``/etc/filebeat/certs/`` as referenced in the file ``/etc/filebeat/filebeat.yml``. You should create the directory if it doesn’t exist.

   .. code-block:: console

      # mv /path/to/server-key.pem /etc/filebeat/certs/filebeat-key.pem
      # mv /path/to/server.pem /etc/filebeat/certs/filebeat.pem

Using custom certificates
~~~~~~~~~~~~~~~~~~~~~~~~~

Custom certificates can be created using tools like OpenSSL. You must create the root CA, node, and admin certificates described above.

Adding new Wazuh server nodes
-----------------------------

You can upscale your Wazuh server cluster horizontally by adding new nodes. This allows for better handling of a larger number of Wazuh agents. Configuring :ref:`failover mode or using a load balancer to point agents <cluster_agent_connections>` to the Wazuh server cluster can provide redundancy in case of node failures. It also improves the scalability and resilience of your security monitoring infrastructure.

The upscaling process involves creating certificates necessary for installation, followed by configuring existing components to establish connections with the new Wazuh server node(s). Then installing and configuring the new Wazuh server node(s), and finally testing the cluster to ensure the new nodes have joined.

We have organized the steps for upscaling the Wazuh server into two subsections: one for an all-in-one deployment and the other for a distributed deployment. Your choice between these methods depends on your existing deployment.

-  **All-in-one deployment**:

   An all-in-one deployment refers to using our :ref:`Wazuh installation assistant <quickstart_installing_wazuh>` or the pre-built virtual machine image in Open Virtual Appliance (OVA) format provided by Wazuh. This deployment method installs all the Wazuh central components on a single server. If you have a Wazuh all-in-one configuration, follow the steps outlined in the "All-in-one deployment" subsections to upscale your Wazuh server cluster.

-  **Distributed deployment**:

   The distributed deployment refers to when the Wazuh components are installed as separate entities following the step-by-step installation guide (applicable to the Wazuh :doc:`indexer </installation-guide/wazuh-indexer/step-by-step>`, :doc:`server </installation-guide/wazuh-server/step-by-step>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/step-by-step>`) or using the install assistant (for the Wazuh :doc:`indexer </installation-guide/wazuh-indexer/installation-assistant>`, :doc:`server </installation-guide/wazuh-server/installation-assistant>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/installation-assistant>`). For an existing distributed deployment, refer to the "Distributed deployment" subsections to upscale your Wazuh server.

Ensure you select the appropriate sub-section based on your existing deployment. If you are unsure which method aligns with your infrastructure, consider reviewing your deployment architecture before proceeding.

.. note::

   You need root user privileges to execute the commands below.

.. _server_cluster_certificates_creation:

Certificates creation
^^^^^^^^^^^^^^^^^^^^^

Wazuh uses certificates to establish trust and confidentiality between its components - the Wazuh indexer, Filebeat and the Wazuh dashboard. The Wazuh server comprises two components, the Wazuh manager and Filebeat. When adding new Wazuh server nodes, an SSL certificate is required for the Filebeat on the new node to communicate securely with the Wazuh indexer.

Perform the following steps on your existing Wazuh server node to generate the certificates required for secure communication among the Wazuh central components.

All-in-one deployment
~~~~~~~~~~~~~~~~~~~~~

We generate new certificates for the Wazuh components in an all-in-one deployment. This is necessary because the quickstart install script uses the localhost IP address ``127.0.0.1`` to create the certificates for the Wazuh indexer, server, and dashboard. Perform the following steps to create new certificates.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh server node(s):

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file with it’s content as follows:

   .. code-block:: yaml
      :emphasize-lines: 4,5,9,10,12,13,18,19

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <WAZUH_INDEXER_NODE_NAME>
            ip: <WAZUH_INDEXER_IP>

        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: <WAZUH_DASHBOARD_NODE_NAME>
            ip: <WAZUH_DASHBOARD_IP>

   Replace the node names and IP values with your new node names and IP addresses.

   You can assign a different ``node_type`` in your installation. In this documentation, we assign the master role to the existing node and the worker role to the new node.

#. Download and run ``wazuh-certs-tool.sh`` to create the certificates for the new node and recreate for the existing one:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A

   .. code-block:: none
      :class: output

      19/06/2024 13:59:08 INFO: Generating the root certificate.
      19/06/2024 13:59:09 INFO: Generating Admin certificates.
      19/06/2024 13:59:09 INFO: Admin certificates created.
      19/06/2024 13:59:09 INFO: Generating Wazuh indexer certificates.
      19/06/2024 13:59:09 INFO: Wazuh indexer certificates created.
      19/06/2024 13:59:09 INFO: Generating Filebeat certificates.
      19/06/2024 13:59:09 INFO: Wazuh Filebeat certificates created.
      19/06/2024 13:59:09 INFO: Generating Wazuh dashboard certificates.
      19/06/2024 13:59:09 INFO: Wazuh dashboard certificates created.

#. Compress the certificates folder and copy it to the new Wazuh server node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This will copy the certificates to the ``/home`` directory of the user on the target system. You can change this to specify a path to your installation directory.

Distributed deployment
~~~~~~~~~~~~~~~~~~~~~~

For a distributed deployment, the certificates can be generated by either using the pre-existing root CA keys or creating a fresh set of certificates. We recommend you utilize pre-existing root CA keys to generate certificates for new nodes only. We describe both techniques below.

Using pre-existing root CA key
''''''''''''''''''''''''''''''

Perform the steps below on your existing Wazuh server node to generate the certificates using pre-existing root CA key.

.. note::

   You will require a copy of the ``wazuh-certificates.tar`` file created during the initial configuration for the :ref:`Wazuh indexer <certificates_creation>` in steps 4 and 5 or a copy of the root CA keys. If neither is available, you can generate new certificates by following the steps outlined in the next :ref:`section <generating_new_certificates>`.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh server node(s):

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file to include the node name and IP of the new node:

   .. code-block:: yaml
      :emphasize-lines: 4,5,7,8

      nodes:
        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

   Replace the values with your node names and their corresponding IP addresses.

#. Extract the ``wazuh-certificates.tar`` file to get the root CA keys:

   .. code-block:: console

      # mkdir wazuh-install-files && tar -xf ./wazuh-certificates.tar -C wazuh-install-files

#. Download and run ``wazuh-certs-tool.sh`` to create the certificates for the new Wazuh server node using the pre-existing root CA keys:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A wazuh-install-files/root-ca.pem wazuh-install-files/root-ca.key

   .. code-block:: none
      :class: output

      19/06/2024 16:42:37 INFO: Generating Admin certificates.
      19/06/2024 16:42:37 INFO: Admin certificates created.
      19/06/2024 16:42:37 INFO: Generating Filebeat certificates.
      19/06/2024 16:42:38 INFO: Wazuh Filebeat certificates created.

#. Copy the newly created certificates to the ``wazuh-install-files`` directory making sure not to replace the admin certificates:

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_SERVER_NODE_NAME>* wazuh-install-files
      # cp wazuh-certificates/<EXISTING_WAZUH_SERVER_NODE_NAME>* wazuh-install-files

#. Compress the certificates directory into a new ``wazuh-certificates.tar`` file and copy it to the new Wazuh server node(s). You can make use of the ``scp`` utility to securely copy the compressed file as follows:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-install-files/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This command copies the certificates to the ``/home`` directory of the target user on the endpoint. You can modify the command to specify a path to your installation directory.

.. _generating_new_certificates:

Generating new certificates
'''''''''''''''''''''''''''

You can follow the steps below to generate fresh certificates if the pre-existing root-ca keys have been deleted or are not accessible.

#. Create the ``/root/config.yml`` file to reference all your nodes:

   .. code-block:: yaml
      :emphasize-lines: 4,5,9,10,12,13,18,19

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <WAZUH_INDEXER_NODE_NAME>
            ip: <WAZUH_INDEXER_IP>

        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: <WAZUH_DASHBOARD_NODE_NAME>
            ip: <WAZUH_DASHBOARD_IP>

#. Download and execute the ``wazuh-certs-tool.sh`` script to create the certificates:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A

#. Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This command copies the certificates to the ``/home`` directory of the target user on the endpoint. You can modify the command to specify a path to your installation directory.

Configuring existing components to connect with the new node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All-in-one deployment
~~~~~~~~~~~~~~~~~~~~~~

#. Create a file, ``env_variables.sh``, in the ``/root`` directory of the existing node where you define your environmental variables as follows:

   .. code-block:: bash

      export NODE_NAME1=<WAZUH_INDEXER_NODE_NAME>
      export NODE_NAME2=<EXISTING_WAZUH_SERVER_NODE_NAME>
      export NODE_NAME3=<WAZUH_DASHBOARD_NODE_NAME>

   Replace ``<WAZUH_INDEXER_NODE_NAME>``, ``<EXISTING_WAZUH_SERVER_NODE_NAME>``, ``<WAZUH_DASHBOARD_NODE_NAME>`` with the names of the Wazuh indexer, Wazuh server and Wazuh dashboard nodes respectively as defined in ``/root/config.yml``.

#. Create a ``deploy-certificates.sh`` script in the ``/root`` directory and paste the following to it:

   .. code-block:: bash

      #!/bin/bash

      # Source the environmental variables from the external file
      source ~/env_variables.sh

      rm -rf /etc/wazuh-indexer/certs
      mkdir /etc/wazuh-indexer/certs
      tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME1.pem ./$NODE_NAME1-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
      mv -n /etc/wazuh-indexer/certs/$NODE_NAME1.pem /etc/wazuh-indexer/certs/wazuh-indexer.pem
      mv -n /etc/wazuh-indexer/certs/$NODE_NAME1-key.pem /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
      chmod 500 /etc/wazuh-indexer/certs
      chmod 400 /etc/wazuh-indexer/certs/*
      chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

      rm -rf /etc/filebeat/certs
      mkdir /etc/filebeat/certs
      tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME2.pem ./$NODE_NAME2-key.pem ./root-ca.pem
      mv -n /etc/filebeat/certs/$NODE_NAME2.pem /etc/filebeat/certs/wazuh-server.pem
      mv -n /etc/filebeat/certs/$NODE_NAME2-key.pem /etc/filebeat/certs/wazuh-server-key.pem
      chmod 500 /etc/filebeat/certs
      chmod 400 /etc/filebeat/certs/*
      chown -R root:root /etc/filebeat/certs

      rm -rf /etc/wazuh-dashboard/certs
      mkdir /etc/wazuh-dashboard/certs
      tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME3.pem ./$NODE_NAME3-key.pem ./root-ca.pem
      mv -n /etc/wazuh-dashboard/certs/$NODE_NAME3.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
      mv -n /etc/wazuh-dashboard/certs/$NODE_NAME3-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
      chmod 500 /etc/wazuh-dashboard/certs
      chmod 400 /etc/wazuh-dashboard/certs/*
      chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Deploy the certificates by executing the following command:

   .. code-block:: console

      # bash /root/deploy-certificates.sh

   This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   **Recommended action**: Save a copy offline for potential future use and scalability. You can  remove the ``wazuh-certificates.tar`` file on this node by running the command below to increase security:

   .. code-block:: console

      # rm -rf ./wazuh-certificates
      # rm -f ./wazuh-certificates.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the indexer’s IP address and ``NODE_NAME`` as mentioned in ``/root/config.yml`` file:

   .. code-block:: yaml
      :emphasize-lines: 1,2,4

      network.host: "<WAZUH_INDEXER_IP>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` to specify the indexer’s IP address:

   .. code-block:: yaml

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP>:9200

   .. note::

      The structure of this section varies based on whether you completed your installation using the Wazuh installation assistant or the step-by-step guide. Here we used the quickstart script.

#. Generate a random encryption key that will be used to encrypt communication between the cluster nodes:

   .. _generate_random_encryption_key:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command as it will be used later to configure both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include connection details for the indexer node:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file and replace the ``url`` value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3,6

      hosts:
        - default:
            url: https://<EXISTING_WAZUH_SERVER_IP>
            port: 55000
            username: wazuh-wui
            password: <WAZUH-WUI-PASSWORD>
            run_as: false

#. Edit the Wazuh server configuration file at ``/var/ossec/etc/ossec.conf`` to enable the Wazuh server cluster:

   .. code-block:: xml
      :emphasize-lines: 3-5,9,12

      <cluster>
        <name>wazuh</name>
        <node_name><EXISTING_WAZUH_SERVER_NODE_NAME></node_name>
        <node_type>master</node_type>
        <key><ENCRYPTION_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
            <node><MASTER_NODE_IP></node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
      </cluster>

   The configurable fields in the above section of the ``/var/ossec/etc/ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to master.
   -  :ref:`key <cluster_key>` represents a :ref:`key <generate_random_encryption_key>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to no.

#. Restart the Wazuh central component and Filebeat to apply the changes.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl restart wazuh-indexer
            # systemctl restart wazuh-manager
            # systemctl restart wazuh-dashboard
            # systemctl restart filebeat

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-indexer restart
            # service wazuh-manager restart
            # service wazuh-dashboard restart
            # service filebeat restart

Distributed deployment
~~~~~~~~~~~~~~~~~~~~~~

#. Deploy the Wazuh server certificates on your existing Wazuh server node by running the following commands. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with the node name of the Wazuh server you are configuring as defined in ``/root/config``.yml.

   .. code-block:: console

      # NODE_NAME=<EXISTING_WAZUH_SERVER_NODE_NAME>

   .. code-block:: console

      # rm -rf /etc/filebeat/certs
      # mkdir /etc/filebeat/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
      # chmod 500 /etc/filebeat/certs
      # chmod 400 /etc/filebeat/certs/*
      # chown -R root:root /etc/filebeat/certs

   .. note::

      If the certificates were recreated as recommended in the :ref:`note <generating_new_certificates>` above.

      You will also have to re-deploy the certificates on all your existing Wazuh nodes (indexer and dashboard).

   After deploying the new certificate on the server, run the following commands to deploy the certificates to the Wazuh indexer and dashboard:

   -  On the Wazuh indexer node(s):

      .. code-block:: console

         # NODE_NAME=<WAZUH_INDEXER_NODE_NAME>

      .. code-block:: console

         # rm -rf /etc/wazuh-indexer/certs
         # mkdir /etc/wazuh-indexer/certs
         # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
         # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
         # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
         # chmod 500 /etc/wazuh-indexer/certs
         # chmod 400 /etc/wazuh-indexer/certs/*
         # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   -  On the Wazuh dashboard node:

      .. code-block:: console

         # NODE_NAME=<WAZUH_DASHBOARD_NODE_NAME>

      .. code-block:: console

         # rm -rf /etc/wazuh-dashboard/certs
         # mkdir /etc/wazuh-dashboard/certs
         # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
         # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
         # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
         # chmod 500 /etc/wazuh-dashboard/certs
         # chmod 400 /etc/wazuh-dashboard/certs/*
         # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

   **Recommended action**: Save a copy offline for potential future use and scalability. You can  remove the ``wazuh-certificates.tar`` file on this node by running the command below to increase security:

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the indexer’s IP address as specified in the ``/root/config.yml`` file:

   .. code-block:: yaml

      network.host: "<WAZUH_INDEXER_IP>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` (located in the Wazuh server node) to specify the indexer’s IP address:

   .. code-block:: yaml

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP>:9200

   .. note::

      The structure of this section will vary depending on if you did your installation using the Wazuh installation assistant or the step-by-step guide. Here we used the Wazuh installation assistant.

#. Generate an encryption key that will be used to encrypt communication between the cluster nodes:

   .. _generate_random_encryption_key_cluster:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command as it will be used later to configure cluster mode on both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the indexer node’s IP:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file located in the Wazuh dashboard node and replace the ``url`` value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3,6

      hosts:
        - default:
            url: https://<EXISTING_WAZUH_SERVER_IP>
            port: 55000
            username: wazuh-wui
            password: <WAZUH-WUI-PASSWORD>
            run_as: false

#. Edit the Wazuh server configuration file at ``/var/ossec/etc/ossec.conf`` to enable cluster mode:

   .. code-block:: xml
      :emphasize-lines: 3-5,9,12

      <cluster>
        <name>wazuh</name>
        <node_name><EXISTING_WAZUH_SERVER_NODE_NAME></node_name>
        <node_type>master</node_type>
        <key><ENCRYPTION_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
            <node><MASTER_NODE_IP></node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
      </cluster>

   The configurable fields in the above section of the ``var/ossec/etc/ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to master.
   -  :ref:`key <cluster_key>` represents a :ref:`key <generate_random_encryption_key_cluster>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

#. Run the following commands on your respective nodes to apply the changes

   -  **Wazuh indexer node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-indexer

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-indexer restart

   -  **Wazuh server node(s)**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart filebeat
               # systemctl restart wazuh-manager

         .. group-tab:: SysV init

            .. code-block:: console

               # service filebeat restart
               # service wazuh-manager restart

   -  **Wazuh dashboard node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-dashboard

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-dashboard restart

Wazuh server node(s) installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the certificates have been created and copied to the new node(s), you can now proceed with installing and configuring the  new Wazuh server as a worker node.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::

   .. group-tab:: YUM

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: APT

      #. Install the following packages if missing:

         .. code-block:: console

            # apt-get install gnupg apt-transport-https

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

      #. Update the packages information:

         .. code-block:: console

            # apt-get update

Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package.

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum -y install wazuh-manager

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-manager

#. Enable and start the Wazuh manager service.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-manager
            # systemctl start wazuh-manager

      .. group-tab:: SysV init

         -  RPM-based operating system:

            .. code-block:: console

               # chkconfig --add wazuh-manager
               # service wazuh-manager start

         -  Debian-based operating system:

            .. code-block:: console

               # update-rc.d wazuh-manager defaults 95 10
               # service wazuh-manager start

#. Check the Wazuh manager status to ensure it is up and running.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager status

Install and configure Filebeat
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Filebeat package.

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum -y install filebeat

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install filebeat

#. Download the preconfigured Filebeat configuration file:

   .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/tpl/wazuh/filebeat/filebeat.yml

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace the following value:

   -  ``hosts`` which represents the list of Wazuh indexer nodes to connect to. You can use either IP addresses or hostnames. By default, the host is set to localhost ``hosts: ["127.0.0.1:9200"]``. Replace it with your Wazuh indexer IP address accordingly.

      If you have more than one Wazuh indexer node, you can separate the addresses using commas. For example, ``hosts: ["10.0.0.1:9200", "10.0.0.2:9200", "10.0.0.3:9200"]``:

   .. code-block:: yaml
      :emphasize-lines: 3

      # Wazuh - Filebeat configuration file
      output.elasticsearch:
        hosts: <WAZUH_INDEXER_IP>:9200
        protocol: https

#. Create a Filebeat keystore to securely store authentication credentials:

   .. code-block:: console

      # filebeat keystore create

#. Add the admin user and password to the secrets keystore:

   .. code-block:: console

      # echo admin | filebeat keystore add username --stdin --force
      # echo <ADMIN_PASSWORD> | filebeat keystore add password --stdin --force

   In case you are running an all-in-one deployment and using the default admin password, you could get it by running the following command:

   .. code-block:: console

      # sudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

#. Download the alerts template for the Wazuh indexer:

   .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Install the Wazuh module for Filebeat:

   .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.4.tar.gz | tar -xvz -C /usr/share/filebeat/module

Deploying certificates
~~~~~~~~~~~~~~~~~~~~~~

Run the following commands in the directory where the ``wazuh-certificates.tar`` file was copied to, replacing ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name of the Wazuh server node you are configuring as defined in ``/root/config.yml``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

#. Create an environment variable to store the node name:

   .. code-block:: console

      NODE_NAME=<NEW_WAZUH_SERVER_NODE_NAME>

#. Deploy the certificates:

   .. code-block:: console

      # mkdir /etc/filebeat/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
      # chmod 500 /etc/filebeat/certs
      # chmod 400 /etc/filebeat/certs/*
      # chown -R root:root /etc/filebeat/certs

Starting the service
~~~~~~~~~~~~~~~~~~~~

.. tabs::

   .. group-tab:: SystemD

      .. code-block:: console

         # systemctl daemon-reload
         # systemctl enable wazuh-manager
         # systemctl start wazuh-manager

   .. group-tab:: SysV init

      -  RPM based operating system:

         .. code-block:: console

            # chkconfig --add wazuh-manager
            # service wazuh-manager start

      -  Debian-based operating system:

         .. code-block:: console

            # update-rc.d wazuh-manager defaults 95 10
            # service wazuh-manager start

Run the following command to verify that Filebeat is successfully installed:

.. code-block:: console

   # filebeat test output

An example output is shown below:

.. code-block:: none
   :class: output

   elasticsearch: https://10.0.0.1:9200...
     parse url... OK
     connection...
       parse host... OK
       dns lookup... OK
       addresses: 10.0.0.1
       dial up... OK
     TLS...
       security: server's certificate chain verification is enabled
       handshake... OK
       TLS version: TLSv1.3
       dial up... OK
     talk to server... OK
     version: 7.10.2

Configuring the Wazuh server worker nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Configure the Wazuh server worker node to enable cluster mode by editing the following settings in the ``/var/ossec/etc/ossec``.conf file:

   .. code-block:: xml
      :emphasize-lines: 3-5,9,12

      <cluster>
          <name>wazuh</name>
          <node_name><NEW_WAZUH_SERVER_NODE_NAME></node_name>
          <node_type>worker</node_type>
          <key><ENCRYPTION_KEY></key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><MASTER_NODE_IP></node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
      </cluster>

   The configurable fields in the above section of the ``ossec.conf`` file are as follows:

   -  ``<name>`` indicates the name of the cluster.
   -  ``<node_name>`` indicates the name of the current node. Each node of the cluster must have a unique name. Replace ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name specified in the ``/root/config.yml`` file.
   -  ``<node_type>`` specifies the role of the node. It has to be set as a worker.
   -  ``<key>`` represents the :ref:`key created previously <generate_random_encryption_key_cluster>` for the master node. It has to be the same for all the nodes. In case you have an already distributed infrastructure, copy this key from the master node’s ``/var/ossec/etc/ossec.conf`` file.
   -  ``<port>`` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  ``<bind_addr>`` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  ``<nodes>`` contain the address of the master node which can be either an IP or a DNS hostname. Replace ``<MASTER_NODE_IP>`` with the IP address of your master node.
   -  ``<hidden>`` shows or hides the cluster information in the generated alerts.
   -  ``<disabled>`` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

   You can learn more about the available configuration options in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide.

#. Restart the Wazuh manager service.

   .. include:: /_templates/common/restart_manager.rst

Testing the cluster
^^^^^^^^^^^^^^^^^^^

Now that the installation and configuration are completed, you can proceed with testing your cluster to ensure that the new Wazuh server node has been connected. Two possible ways of doing this:

-  `Using the cluster control tool`_
-  `Using the Wazuh API console`_

Using the cluster control tool
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Verify that the Wazuh server cluster is enabled and all the nodes are connected by executing the following command on any of the Wazuh server nodes:

.. code-block:: console

   # /var/ossec/bin/cluster_control -l

A sample output of the command:

.. code-block:: none
   :class: output

   NAME             TYPE    VERSION  ADDRESS
   wazuh-server-1   master  4.8.0    10.0.0.1
   wazuh-server-2   worker  4.8.0    10.0.0.2

Note that ``10.0.0.1``, ``10.0.0.2`` are example IP addresses.

Using the Wazuh API console
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also check your new Wazuh server cluster by using the **Wazuh API Console** accessible via the Wazuh dashboard.

Access the Wazuh dashboard using the credentials below.

-  URL: ``https://<WAZUH_DASHBOARD_IP>``
-  Username: ``admin``
-  Password: ``<ADMIN_PASSWORD>`` or ``admin`` in case you already have a distributed architecture and using the default password.

Navigate to **Tools** and select **API Console**.  On the console, run the query below:

.. code-block:: none

   GET /cluster/healthcheck

.. thumbnail:: /images/manual/wazuh-server/running-api-console-query.gif
   :title: Running query in the API console
   :alt: Running query in the API console
   :align: center
   :width: 80%

This query will display the global status of your Wazuh server cluster with the following information for each node:

-  ``Name`` indicates the name of the server node
-  ``Type`` indicates the role assigned to a node(Master or Worker)
-  ``Version`` indicates the version of the ``Wazuh-manager`` service running on the node
-  ``IP`` is the IP address of the node
-  ``n_active_agents`` indicates the number of active agents connected to the node

Having completed these steps, the Wazuh infrastructure has been successfully scaled up, and the new server nodes have been integrated into the cluster.

If you want to uninstall the Wazuh server, see :ref:`Uninstall the Wazuh server <uninstall_server>` documentation.

.. _cluster_agent_connections:

Agent connections
^^^^^^^^^^^^^^^^^

The configuration of the Wazuh agents has to be modified to report to the Wazuh server cluster. We configure the Wazuh agent to report to the Wazuh server cluster by editing the ``<client></client>`` block in the agent’s configuration file ``/var/ossec/etc/ossec.conf``.

There are two methods to handle the Wazuh agent connection to the Wazuh server cluster nodes including:

-  :ref:`Pointing Wazuh agents to the Wazuh cluster (Failover mode) <connecting_failover_mode>`.
-  :ref:`Pointing Wazuh agents to the Wazuh cluster with a load balancer <connecting_with_load_balancer>`.

.. note::

   We recommend using a :ref:`load balancer <cluster_load_balancers>` for enrolling and connecting Wazuh agents. This way, the agents register and report to the Wazuh server cluster nodes in a distributed way, and it will be the load balancer who assigns which worker they will report to. Using this option we can better distribute the load, and in case of a fall in some worker nodes, its agents will reconnect to another one.

.. _connecting_failover_mode:

Connecting Wazuh agents to the Wazuh cluster (Failover mode)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this method, we add a list of Wazuh server nodes (master/workers) to the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``. In case of a disconnection, the agent will connect to another node on the list to continue reporting.

After :ref:`configuring the Wazuh server cluster <wazuh_cluster_nodes_configuration>`, we configure the Wazuh agents to connect and report to the Wazuh server cluster nodes as shown below.

Suppose we have the following IP addresses for the Wazuh server nodes:

.. code-block:: none

   master: 172.0.0.3
   worker01: 172.0.0.4
   worker02: 172.0.0.5

#. Edit the ``<client></client>`` block of the Wazuh agent ``/var/ossec/etc/ossec.conf`` file to add the IP addresses of the Wazuh server nodes:

   .. code-block:: xml

      <client>
          <server>
              <address>172.0.0.4</address>
              <port>1514</port>
              <protocol>tcp</protocol>
          </server>
          <server>
              <address>172.0.0.5</address>
              <port>1514</port>
              <protocol>tcp</protocol>
          </server>
          <server>
              <address>172.0.0.3</address>
              <port>1514</port>
              <protocol>tcp</protocol>
          </server>
          <config-profile>ubuntu, ubuntu18, ubuntu18.04</config-profile>
          <notify_time>10</notify_time>
          <time-reconnect>60</time-reconnect>
          <auto_restart>yes</auto_restart>
          <crypto_method>aes</crypto_method>
      </client>

#. Restart the Wazuh agent to apply changes:

   .. include:: /_templates/common/restart_agent.rst

Using this method, if the ``worker01`` node is not available, the agents will report to the ``worker02``. If both worker nodes are unavailable, the agent will report to the ``master`` node. This process is performed cyclically between all the nodes that we place in the ``/var/ossec/etc/ossec.conf`` of the agents.

.. _connecting_with_load_balancer:

Connecting Wazuh agents to the Wazuh cluster with a load balancer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh agents can be configured to report to a :ref:`load balancer <cluster_load_balancers>` to evenly distribute incoming Wazuh agent traffic among all available Wazuh server nodes in a cluster. This way, Wazuh agents can report to newly added Wazuh server nodes without modifying the Wazuh agents' configuration.

Perform the following steps to point a Wazuh agent to a load balancer.

#. Edit the Wazuh agent configuration in ``/var/ossec/etc/ossec.conf`` to add the Load Balancer IP address. In the ``<server></server>`` block, replace the ``<LOAD_BALANCER_IP>`` with the load balancer IP address:

   .. code-block:: xml
      :emphasize-lines: 3

      <client>
        <server>
          <address><LOAD_BALANCER_IP></address>
          …
        </server>
      </client>

#. Restart the Wazuh agents to apply changes:

   .. include:: /_templates/common/restart_agent.rst

.. _cluster_load_balancers:

Load balancers
^^^^^^^^^^^^^^

A load balancer distributes workloads across multiple resources. In this case, it distributes Wazuh agents among the different worker nodes in a Wazuh server cluster.

Wazuh recommends the following load balancers including `NGINX`_ and `HAProxy`_. You can choose any of the load balancer services as per your need.

NGINX
~~~~~

NGINX is an open source web server that can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache. In this scenario, we use it as a load balancer to distribute Wazuh agent traffic within a Wazuh server cluster.

Installation
''''''''''''

There are different installation instructions for installing NGINX based on the choice of your Linux distribution.

#. Download the packages from the `Official page <http://nginx.org/en/linux_packages.html>`__.
#. Follow the steps related to that guide to install the packages.

Configuration
'''''''''''''

The way NGINX and its modules work are determined in it’s configuration file. By default, the configuration file of NGINX is named ``nginx.conf`` and located in the ``/usr/local/nginx/conf``, ``/etc/nginx``, or ``/usr/local/etc/nginx`` directory depending on the installation type.

Perform the steps below to configure NGINX as a load balancer.

#. Add the content below to the NGINX ``nginx.conf`` configuration file:

   .. code-block:: nginx

      stream {
         upstream master {
             server <MASTER_NODE_IP_ADDRESS>:1515;
         }
         upstream mycluster {
         hash $remote_addr consistent;
             server <MASTER_NODE_IP_ADDRESS>:1514;
             server <WORKER_NODE_IP_ADDRESS>:1514;
             server <WORKER_NODE_IP_ADDRESS>:1514;
         }
         server {
             listen 1515;
             proxy_pass master;
         }
         server {
             listen 1514;
             proxy_pass mycluster;
         }
      }

   Replace:

   -  ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of the Wazuh server master node in your cluster.
   -  ``<WORKER_NODE_IP_ADDRESS>`` with the IP address of the Wazuh server worker nodes in your cluster.

   You can find more details in the NGINX guide for configuring `TCP and UDP load balancer <https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/>`__.

#. Verify the NGINX configuration file for syntax errors:

   .. code-block:: console

      # nginx -t

   .. code-block:: none
      :class: output

      nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
      nginx: configuration file /etc/nginx/nginx.conf test is successful

#. Reload the NGINX service to apply the changes:

   .. code-block:: console

      # nginx -s reload

.. _lb_haproxy:

HAProxy
~~~~~~~

High Availability Proxy (HAProxy) is a free and open source software that provides a high availability load balancer and proxy for TCP and HTTP-based applications. Using a load balancer, such as `HAProxy <https://www.haproxy.org/>`__, ensures the Wazuh agents enroll and report to Wazuh manager nodes in a distributed way. HAProxy supports several load balancing including round-robin, leastconn, source, and others. The load balancer assigns manager nodes to the Wazuh agents based on the selected algorithm, improving load distribution. If a Wazuh manager node fails, the Wazuh agents reconnect to another node in the cluster.

.. _haproxy_installation:

Installation
''''''''''''

There are two main ways to install HAProxy.

-  Using system packages and Personal Package Archive (PPA).
-  Using Docker images.

.. note::

   The provided examples and configurations are based on Ubuntu and HAProxy 2.8.

.. tabs::

   .. group-tab:: System Package

      #. Install HAProxy

         .. code-block:: console

            # apt install haproxy -y

      #. Check the installation

         .. code-block:: console

            # haproxy -v

         .. code-block:: none
            :class: output

            HAProxy version 2.8.5-1ubuntu3 2024/04/01 - https://haproxy.org/
            Status: long-term supported branch - will stop receiving fixes around Q2 2028.
            Known bugs: http://www.haproxy.org/bugs/bugs-2.8.5.html
            Running on: Linux 6.8.0-76060800daily20240311-generic #202403110203~1714077665~22.04~4c8e9a0 SMP PREEMPT_DYNAMIC Thu A x86_64

   .. group-tab:: PPA Package

      #. Add the PPA repository

         .. code-block:: console

            # apt update && apt install software-properties-common -y
            # add-apt-repository ppa:vbernat/haproxy-2.8 -y

      #. Install HAProxy

         .. code-block:: console

            # apt install haproxy -y

      #. Check the installation

         .. code-block:: console

            # haproxy -v

         .. code-block:: none
            :class: output

            HAProxy version 2.8.9-1ppa1~jammy 2024/04/06 - https://haproxy.org/
            Status: long-term supported branch - will stop receiving fixes around Q2 2028.
            Known bugs: http://www.haproxy.org/bugs/bugs-2.8.9.html
            Running on: Linux 6.8.0-76060800daily20240311-generic #202403110203~1714077665~22.04~4c8e9a0 SMP PREEMPT_DYNAMIC Thu A x86_64

   .. group-tab:: Docker

      We provide the following files for installing HAProxy with Docker.

      .. raw:: html

         <details>
         <summary><b>Dockerfile</b></summary>

      .. code-block:: dockerfile

         FROM haproxytech/haproxy-ubuntu:2.8

         COPY haproxy.cfg /etc/haproxy/haproxy.cfg
         COPY haproxy-service /etc/init.d/haproxy
         COPY entrypoint.sh /entrypoint.sh

         RUN chmod +x /etc/init.d/haproxy
         RUN chmod +x /entrypoint.sh

         ENTRYPOINT [ "/entrypoint.sh" ]

      .. raw:: html

         </details>


      .. raw:: html

         <details>
         <summary><b>entrypoint.sh</b></summary>

      .. code-block:: bash

         #!/usr/bin/env bash

         # Start HAProxy service
         service haproxy start

         tail -f /dev/null

      .. raw:: html

         </details>

      .. raw:: html

         <details>
         <summary><b>haproxy-service</b></summary>

      .. code-block:: bash

         #!/bin/sh
         ### BEGIN INIT INFO
         # Provides:      	haproxy
         # Required-Start:	$local_fs $network $remote_fs $syslog $named
         # Required-Stop: 	$local_fs $remote_fs $syslog $named
         # Default-Start: 	2 3 4 5
         # Default-Stop:  	0 1 6
         # Short-Description: fast and reliable load balancing reverse proxy
         # Description:   	This file should be used to start and stop haproxy.
         ### END INIT INFO

         # Author: Arnaud Cornet <acornet@debian.org>

         PATH=/sbin:/usr/sbin:/bin:/usr/bin
         BASENAME=haproxy
         PIDFILE=/var/run/${BASENAME}.pid
         CONFIG=/etc/${BASENAME}/${BASENAME}.cfg
         HAPROXY=/usr/sbin/haproxy
         RUNDIR=/run/${BASENAME}
         EXTRAOPTS=

         test -x $HAPROXY || exit 0

         if [ -e /etc/default/${BASENAME} ]; then
           	. /etc/default/${BASENAME}
         fi

         test -f "$CONFIG" || exit 0

         [ -f /etc/default/rcS ] && . /etc/default/rcS
         . /lib/lsb/init-functions


         check_haproxy_config()
         {
           	$HAPROXY -c -f "$CONFIG" $EXTRAOPTS >/dev/null
           	if [ $? -eq 1 ]; then
              	log_end_msg 1
              	exit 1
           	fi
         }

         haproxy_start()
         {
           	[ -d "$RUNDIR" ] || mkdir "$RUNDIR"
           	chown haproxy:haproxy "$RUNDIR"
           	chmod 2775 "$RUNDIR"

           	check_haproxy_config

           	start-stop-daemon --quiet --oknodo --start --pidfile "$PIDFILE" \
              	--exec $HAPROXY -- -f "$CONFIG" -D -p "$PIDFILE" \
              	$EXTRAOPTS || return 2
           	return 0
         }

         haproxy_stop()
         {
           	if [ ! -f $PIDFILE ] ; then
              	# This is a success according to LSB
              	return 0
           	fi

           	ret=0
           	tmppid="$(mktemp)"

           	# HAProxy's pidfile may contain multiple PIDs, if nbproc > 1, so loop
           	# over each PID. Note that start-stop-daemon has a --pid option, but it
           	# was introduced in dpkg 1.17.6, post wheezy, so we use a temporary
           	# pidfile instead to ease backports.
           	for pid in $(cat $PIDFILE); do
              	echo "$pid" > "$tmppid"
              	start-stop-daemon --quiet --oknodo --stop \
                 	--retry 5 --pidfile "$tmppid" --exec $HAPROXY || ret=$?
           	done

           	rm -f "$tmppid"
           	[ $ret -eq 0 ] && rm -f $PIDFILE

           	return $ret
         }

         haproxy_reload()
         {
           	check_haproxy_config

           	$HAPROXY -f "$CONFIG" -p $PIDFILE -sf $(cat $PIDFILE) -D $EXTRAOPTS \
              	|| return 2
           	return 0
         }

         haproxy_status()
         {
           	if [ ! -f $PIDFILE ] ; then
              	# program not running
              	return 3
           	fi

           	for pid in $(cat $PIDFILE) ; do
              	if ! ps --no-headers p "$pid" | grep haproxy > /dev/null ; then
                 	# program running, bogus pidfile
                 	return 1
              	fi
           	done

           	return 0
         }


         case "$1" in
         start)
           	log_daemon_msg "Starting haproxy" "${BASENAME}"
           	haproxy_start
           	ret=$?
           	case "$ret" in
           	0)
              	log_end_msg 0
              	;;
           	1)
              	log_end_msg 1
              	echo "pid file '$PIDFILE' found, ${BASENAME} not started."
              	;;
           	2)
              	log_end_msg 1
              	;;
           	esac
           	exit $ret
           	;;
         stop)
           	log_daemon_msg "Stopping haproxy" "${BASENAME}"
           	haproxy_stop
           	ret=$?
           	case "$ret" in
           	0|1)
              	log_end_msg 0
              	;;
           	2)
              	log_end_msg 1
              	;;
           	esac
           	exit $ret
           	;;
         reload|force-reload)
           	log_daemon_msg "Reloading haproxy" "${BASENAME}"
           	haproxy_reload
           	ret=$?
           	case "$ret" in
           	0|1)
              	log_end_msg 0
              	;;
           	2)
              	log_end_msg 1
              	;;
           	esac
           	exit $ret
           	;;
         restart)
           	log_daemon_msg "Restarting haproxy" "${BASENAME}"
           	haproxy_stop
           	haproxy_start
           	ret=$?
           	case "$ret" in
           	0)
              	log_end_msg 0
              	;;
           	1)
              	log_end_msg 1
              	;;
           	2)
              	log_end_msg 1
              	;;
           	esac
           	exit $ret
           	;;
         status)
           	haproxy_status
           	ret=$?
           	case "$ret" in
           	0)
              	echo "${BASENAME} is running."
              	;;
           	1)
              	echo "${BASENAME} dead, but $PIDFILE exists."
              	;;
           	*)
              	echo "${BASENAME} not running."
              	;;
           	esac
           	exit $ret
           	;;
         *)
           	echo "Usage: /etc/init.d/${BASENAME} {start|stop|reload|restart|status}"
           	exit 2
           	;;
         esac

         :

      .. raw:: html

         </details>


      **haproxy.cfg** :ref:`configuration file <haproxy_configuration>` to get the service up and running.

      Perform the following steps to install HAProxy with docker.

      #. Put the files in the same directory:
      #. Verify the files are in the same directory:

         .. code-block:: console

            # tree
            .
            ├── Dockerfile
            ├── entrypoint.sh
            ├── haproxy.cfg
            └── haproxy-service

      #. Build the image.

         .. code-block:: console

            # docker build --tag=haproxy-deploy .

      #. Run the HAProxy service:

         .. code-block:: console

            # docker run haproxy-deploy

         .. code-block:: none
            :class: output

            TCPLOG: true HTTPLOG: true
            * Starting haproxy haproxy
            [NOTICE]   (33) : haproxy version is 2.8.9-1842fd0
            [NOTICE]   (33) : path to executable is /usr/sbin/haproxy
            [ALERT]    (33) : config : parsing [/etc/haproxy/haproxy.cfg:3] : 'pidfile' already specified. Continuing.

.. _haproxy_configuration:

Configuration
'''''''''''''

Perform the following steps to configure HAProxy to work with a Wazuh server cluster.

#. Create a ``haproxy.cfg`` file in the ``/etc/haproxy/`` directory and add the following configuration:

   .. raw:: html

      <details>
      <summary><b>haproxy.cfg</b></summary>

   .. code-block:: cfg
      :emphasize-lines: 32-34,36-47

      global
        	chroot  	/var/lib/haproxy
        	pidfile 	/var/run/haproxy.pid
        	maxconn 	4000
        	user    	haproxy
        	group   	haproxy
        	stats socket /var/lib/haproxy/stats level admin
        	log 127.0.0.1 local2 info

      defaults
        	mode http
        	maxconn 4000
        	log global
        	option redispatch
        	option dontlognull
        	option tcplog
        	timeout check 10s
        	timeout connect 10s
        	timeout client 1m
        	timeout queue 1m
        	timeout server 1m
        	retries 3

      frontend wazuh_register
        	mode tcp
        	bind :1515
        	default_backend wazuh_register

      backend wazuh_register
        	mode tcp
        	balance leastconn
        	server master <IP_OR_DNS_OF_WAZUH_MASTER_NODE>:1515 check
        	server worker1 <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1515 check
        	server workern <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1515 check

      # Do not include the following if you will enable HAProxy Helper
      frontend wazuh_reporting_front
        	mode tcp
        	bind :1514 name wazuh_reporting_front_bind
        	default_backend wazuh_reporting

      backend wazuh_reporting
        	mode tcp
        	balance leastconn
        	server master <IP_OR_DNS_OF_WAZUH_MASTER_NODE>:1514 check
        	server worker1 <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1514 check
        	server worker2 <IP_OR_DNS_OF_WAZUH_WORKER_NODE>:1514 check

   Replace:

   -  ``<IP_OR_DNS_OF_WAZUH_MASTER_NODE>`` with the IP address or DNS of the Wazuh server master node in your cluster.
   -  ``<IP_OR_DNS_OF_WAZUH_WORKER_NODE>`` with the IP address or DNS of the Wazuh server worker nodes in your cluster.

   .. raw:: html

      </details>

   The configuration above is made of the following sections defined below.

   -  A *backend* section which is a set of Wazuh server cluster nodes that receive forwarded agent connections. It includes the following parameters:

      -  The load balancing mode.
      -  The load balance algorithm to use.
      -  A list of Wazuh servers and ports. The example that follows has the default one pointing to the master node.

      .. code-block:: cfg
         :emphasize-lines: 4

         backend wazuh_register
            mode tcp
            balance leastconn
            server master_node <WAZUH_REGISTRY_HOST>:1515 check

   -  A *frontend* section defines how to forward requests to backends. It's composed of the following parameters:

      -  The type of load balancing.
      -  The port to bind the connections.
      -  The default backend to forward requests

      .. code-block:: cfg

         frontend wazuh_register
            mode tcp
            bind :1515
            default_backend wazuh_register

#. Start the service to apply the configuration:

   .. code-block:: console

      # service haproxy start

   .. code-block:: none
      :class: output

      * Starting haproxy haproxy
      [NOTICE]   (13231) : haproxy version is 2.8.9-1ppa1~jammy
      [NOTICE]   (13231) : path to executable is /usr/sbin/haproxy
      [ALERT]    (13231) : config : parsing [/etc/haproxy/haproxy.cfg:3] : 'pidfile' already specified. Continuing.

.. _haproxy_helper_setup:

HAProxy helper
~~~~~~~~~~~~~~

This is an optional tool to manage HAProxy configuration depending on the Wazuh server cluster status in real time. It provides the Wazuh manager with the ability to automatically balance the Wazuh agent TCP sessions.

Key features of HAProxy helper
''''''''''''''''''''''''''''''

Some of its key features are:

-  Adding and removing servers to the Wazuh backend (``1514/tcp``) when detecting changes on the Wazuh server cluster. For example, new workers connected.
-  Balancing excess Wazuh agents per node when adding new servers to the Wazuh backend.
-  Balancing agents when detecting an imbalance that exceeds the given tolerance.

.. thumbnail:: /images/manual/cluster/haproxy-helper-architecture.png
   :title: HAProxy helper architecture
   :alt: HAProxy helper architecture
   :align: center
   :width: 80%

The HAProxy helper runs in an independent thread that initiates with the ``wazuh-cluster`` daemon. It follows this process.

.. thumbnail:: /images/manual/cluster/haproxy-helper-flow.png
   :title: HAProxy helper flow
   :alt: HAProxy helper flow
   :align: center
   :width: 80%

Enabling the HAProxy helper
'''''''''''''''''''''''''''

To use this feature, you need a :ref:`HAProxy <lb_haproxy>` instance balancing the Wazuh server cluster using the least connections algorithm.

.. note::

   The recommended version of HAProxy is the 2.8 LTS.

Dataplane API configuration
"""""""""""""""""""""""""""

The HAProxy helper uses the Dataplane API to communicate with HAProxy and update the configuration according to the changes in the Wazuh server cluster.

This is the basic configuration for the Dataplane API. Replace ``<DATAPLANE_USER>`` and ``<DATAPLANE_PASSWORD>`` with the chosen user and password.

.. tabs::

   .. group-tab:: HTTP

      .. code-block:: yaml
         :emphasize-lines: 8,9

         dataplaneapi:
            host: 0.0.0.0
            port: 5555
            transaction:
                transaction_dir: /tmp/haproxy
            user:
            - insecure: true
               password: <DATAPLANE_PASSWORD>
               name: <DATAPLANE_USER>
         haproxy:
            config_file: /etc/haproxy/haproxy.cfg
            haproxy_bin: /usr/sbin/haproxy
            reload:
               reload_delay: 5
               reload_cmd: service haproxy reload
               restart_cmd: service haproxy restart

   .. group-tab:: HTTPS

      .. note::

         If you use HTTPS as the Dataplane API communication protocol, you must set the ``tls`` field and related subfields: ``tls_port``, ``tls_certificate`` and ``tls_key`` in the configuration. The ``tls_ca`` field is only necessary when using client-side certificates.

         To generate the certificate files for both the HAProxy instance and the Wazuh server, use the following command.

         .. code-block:: console

            # openssl req -x509 -newkey rsa:4096 -keyout <KEY_FILE_NAME> -out <CERTIFICATE_FILE_NAME> -sha256 -nodes -addext "subjectAltName=DNS:<FQDN>" -subj "/C=US/ST=CA/O=Wazuh>/CN=<CommonName>"

      .. code-block:: yaml
         :emphasize-lines: 15,16

         dataplaneapi:
            scheme:
               - https
            host: 0.0.0.0
            port: 5555
            transaction:
               transaction_dir: /tmp/haproxy
            tls:
               tls_port: 6443
               tls_certificate: /etc/haproxy/ssl/<HAPROXY_CERTIFICATE_FILE>
               tls_key: /etc/haproxy/ssl/<HAPROXY_CERTIFICATE_KEY_FILE>
               tls_ca: /etc/haproxy/ssl/<CLIENT_SIDE_CERTIFICATE_FILE>
            user:
            -  insecure: true
               password: <DATAPLANE_PASSWORD>
               name: <DATAPLANE_USER>
         haproxy:
            config_file: /etc/haproxy/haproxy.cfg
            haproxy_bin: /usr/sbin/haproxy
            reload:
               reload_delay: 5
               reload_cmd: service haproxy reload
               restart_cmd: service haproxy restart

Depending on the :ref:`HAProxy installation method <haproxy_installation>`, follow these steps to enable the HAProxy helper.

.. warning::

   For the HAProxy helper to operate correctly, ensure there's no frontend with port ``1514`` in the ``haproxy.cfg`` file.

.. tabs::

   .. group-tab:: Packages

      #. Download the binary file for the installed HAProxy version. You can find the available versions `here <https://github.com/haproxytech/dataplaneapi/releases/>`__.

         .. code-block:: console

            # curl -sL https://github.com/haproxytech/dataplaneapi/releases/download/v2.8.X/dataplaneapi_2.8.X_linux_x86_64.tar.gz | tar xz && cp dataplaneapi /usr/local/bin/

      #. Put the configuration in ``/etc/haproxy/dataplaneapi.yml`` and start the process

         .. code-block:: console

            # dataplaneapi -f /etc/haproxy/dataplaneapi.yml &

      #. Verify the API is running properly. Replace ``<DATAPLANE_USER>`` and ``<DATAPLANE_PASSWORD>`` with the chosen user and password.

         .. tabs::

            .. group-tab:: HTTP

               .. code-block:: console

                  # curl -X GET --user <DATAPLANE_USER>:<DATAPLANE_PASSWORD> http://localhost:5555/v2/info

               .. code-block:: none
                  :class: output

                  {"api":{"build_date":"2024-05-13T12:09:33.000Z","version":"v2.8.X 13ba2b34"},"system":{}}

            .. group-tab:: HTTPS

               .. code-block:: console

                  # curl -k -X GET --user <DATAPLANE_USER>:<DATAPLANE_PASSWORD> https://localhost:6443/v2/info

               .. code-block:: none
                  :class: output

                  {"api":{"build_date":"2024-05-13T12:09:33.000Z","version":"v2.8.X 13ba2b34"},"system":{}}

   .. group-tab:: Docker

      #. Put the configuration into ``dataplaneapi.yaml``

         .. code-block:: console

            # tree
            .
            ├── dataplaneapi.yml
            ├── Dockerfile
            ├── entrypoint.sh
            ├── haproxy.cfg
            └── haproxy-service

      #. Modify ``Dockerfile`` to include ``dataplaneapi.yaml`` during the build

         .. tabs::

            .. group-tab:: HTTP

               .. code-block:: dockerfile
                  :emphasize-lines: 4

                  FROM haproxytech/haproxy-ubuntu:2.8

                  COPY haproxy.cfg /etc/haproxy/haproxy.cfg
                  COPY dataplaneapi.yml /etc/haproxy/dataplaneapi.yml
                  COPY haproxy-service /etc/init.d/haproxy
                  COPY entrypoint.sh /entrypoint.sh

                  RUN chmod +x /etc/init.d/haproxy
                  RUN chmod +x /entrypoint.sh

                  ENTRYPOINT [ "/entrypoint.sh" ]

            .. group-tab:: HTTPS

               .. code-block:: dockerfile
                  :emphasize-lines: 4,8,9,10

                  FROM haproxytech/haproxy-ubuntu:2.8

                  COPY haproxy.cfg /etc/haproxy/haproxy.cfg
                  COPY dataplaneapi.yml /etc/haproxy/dataplaneapi.yml
                  COPY haproxy-service /etc/init.d/haproxy
                  COPY entrypoint.sh /entrypoint.sh

                  COPY <HAPROXY_CERTIFICATE_FILE> /etc/haproxy/ssl/<HAPROXY_CERTIFICATE_FILE>
                  COPY <HAPROXY_CERTIFICATE_KEY_FILE> /etc/haproxy/ssl/<HAPROXY_CERTIFICATE_KEY_FILE>
                  COPY <CLIENT_SIDE_CERTIFICATE_FILE> /etc/haproxy/ssl/<CLIENT_SIDE_CERTIFICATE_FILE>

                  RUN chmod +x /etc/init.d/haproxy
                  RUN chmod +x /entrypoint.sh

                  ENTRYPOINT [ "/entrypoint.sh" ]

      #. Modify the ``entrypoint.sh`` to start the dataplaneapi process

         .. code-block:: bash
            :emphasize-lines: 6

            #!/usr/bin/env bash

            # Start HAProxy service
            service haproxy start
            # Start HAProxy Data Plane API
            dataplaneapi -f /etc/haproxy/dataplaneapi.yml &

            tail -f /dev/null

      #. Build and run the image

         .. code-block:: console

            # docker build --tag=haproxy-deploy .

         .. tabs::

            .. group-tab:: HTTP

               .. code-block:: console

                  # docker run -p 5555:5555 haproxy-deploy

            .. group-tab:: HTTPS

               .. code-block:: console

                  # docker run -p 6443:6443 haproxy-deploy

         .. code-block:: none
            :class: output

            TCPLOG: true HTTPLOG: true
            * Starting haproxy haproxy
            [NOTICE]   (33) : haproxy version is 2.8.9-1842fd0
            [NOTICE]   (33) : path to executable is /usr/sbin/haproxy
            [ALERT]    (33) : config : parsing [/etc/haproxy/haproxy.cfg:3] : 'pidfile' already specified. Continuing.

      #. Verify the API is running properly. Replace ``<DATAPLANE_USER>`` and ``<DATAPLANE_PASSWORD>`` with the chosen user and password.

         .. tabs::

            .. group-tab:: HTTP

               .. code-block:: console

                  # curl -X GET --user <DATAPLANE_USER>:<DATAPLANE_PASSWORD> http://localhost:5555/v2/info

            .. group-tab:: HTTPS

               .. code-block:: console

                  # curl -k -X GET --user <DATAPLANE_USER>:<DATAPLANE_PASSWORD> https://localhost:6443/v2/info

         .. code-block:: none
            :class: output

            {"api":{"build_date":"2024-05-13T14:06:03.000Z","version":"v2.9.3 59f34ea1"},"system":{}}


As an example, you can configure a basic HAProxy helper within an already configured Wazuh server cluster master node. Perform the following steps on the Wazuh server master node only.

#. Add the highlighted :ref:`HAProxy helper <haproxy_helper>` configuration section to the ``/var/ossec/etc/ossec.conf`` file:

   .. tabs::

      .. group-tab:: HTTP

         .. code-block:: xml
            :emphasize-lines: 13-18

            <cluster>
               <name>wazuh</name>
               <node_name>master-node</node_name>
               <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
               <node_type>master</node_type>
               <port>1516</port>
               <bind_addr>0.0.0.0</bind_addr>
               <nodes>
                  <node>WAZUH-MASTER-ADDRESS</node>
               </nodes>
               <hidden>no</hidden>
               <disabled>no</disabled>
               <haproxy_helper>
                  <haproxy_disabled>no</haproxy_disabled>
                  <haproxy_address><HAPROXY_ADDRESS></haproxy_address>
                  <haproxy_user><DATAPLANE_USER></haproxy_user>
                  <haproxy_password><DATAPLANE_PASSWORD></haproxy_password>
               </haproxy_helper>
            </cluster>

         Where:

         -  :ref:`haproxy_disabled <haproxy_disabled>` indicates whether the helper is disabled or not in the master node.
         -  :ref:`haproxy_address <haproxy_address>` specifies the IP or DNS address to connect with HAProxy.
         -  :ref:`haproxy_user <haproxy_user>` specifies the username to authenticate with HAProxy.
         -  :ref:`haproxy_password <haproxy_password>` specifies the password to authenticate with HAProxy.

         Learn more about :ref:`haproxy_helper` options in the reference guide.

      .. group-tab:: HTTPS

         .. code-block:: xml
            :emphasize-lines: 13-23

            <cluster>
               <name>wazuh</name>
               <node_name>master-node</node_name>
               <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
               <node_type>master</node_type>
               <port>1516</port>
               <bind_addr>0.0.0.0</bind_addr>
               <nodes>
                  <node>WAZUH-MASTER-ADDRESS</node>
               </nodes>
               <hidden>no</hidden>
               <disabled>no</disabled>
               <haproxy_helper>
                  <haproxy_disabled>no</haproxy_disabled>
                  <haproxy_address><HAPROXY_ADDRESS></haproxy_address>
                  <haproxy_user><DATAPLANE_USER></haproxy_user>
                  <haproxy_password><DATAPLANE_PASSWORD></haproxy_password>
                  <haproxy_protocol>https</haproxy_protocol>
                  <haproxy_port>6443</haproxy_port>
                  <haproxy_cert><HAPROXY_CERTIFICATE_FILE></haproxy_cert>
                  <client_cert><CLIENT_SIDE_CERTIFICATE_FILE></client_cert>
                  <client_cert_key><CLIENT_SIDE_CERTIFICATE_KEY_FILE></client_cert_key>
               </haproxy_helper>
            </cluster>

         Where:

         -  :ref:`haproxy_disabled <haproxy_disabled>` indicates whether the helper is disabled or not in the master node.
         -  :ref:`haproxy_address <haproxy_address>` specifies the IP or DNS address to connect with HAProxy.
         -  :ref:`haproxy_user <haproxy_user>` specifies the username to authenticate with HAProxy.
         -  :ref:`haproxy_password <haproxy_password>` specifies the password to authenticate with HAProxy.
         -  :ref:`haproxy_protocol <haproxy_protocol>` specifies the protocol to use for the HAProxy Dataplane API communication. It is recommended to set it to ``https``.
         -  :ref:`haproxy_port <haproxy_port>` specifies the port used for the HAProxy Dataplane API communication.
         -  :ref:`haproxy_cert` <haproxy_cert> specifies the certificate file used for the HTTPS communication. It must be the same as the one defined in the ``tls_certificate`` parameter in the ``dataplaneapi.yml`` file.
         -  :ref:`client_cert` <client_cert> specifies the certificate file used in the client side of the HTTPS communication. It must be the same as the one defined in the ``tls_ca`` parameter in the ``dataplaneapi.yml`` file.
         -  :ref:`client_cert_key` <client_cert_key> specifies the certificate key file used in the client side of the HTTPS communication.

         Learn more about :ref:`haproxy_helper` options in the reference guide.

#. Restart the Wazuh server master node:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Verify the HAProxy helper is running:

   .. code-block:: console

      # tail /var/ossec/logs/cluster.log

   .. code-block:: none
      :class: output
      :emphasize-lines: 11

      2024/04/05 19:23:06 DEBUG: [Cluster] [Main] Removing '/var/ossec/queue/cluster/'.
      2024/04/05 19:23:06 DEBUG: [Cluster] [Main] Removed '/var/ossec/queue/cluster/'.
      2024/04/05 19:23:06 INFO: [Local Server] [Main] Serving on /var/ossec/queue/cluster/c-internal.sock
      2024/04/05 19:23:06 DEBUG: [Local Server] [Keep alive] Calculating.
      2024/04/05 19:23:06 DEBUG: [Local Server] [Keep alive] Calculated.
      2024/04/05 19:23:06 INFO: [Master] [Main] Serving on ('0.0.0.0', 1516)
      2024/04/05 19:23:06 DEBUG: [Master] [Keep alive] Calculating.
      2024/04/05 19:23:06 DEBUG: [Master] [Keep alive] Calculated.
      2024/04/05 19:23:06 INFO: [Master] [Local integrity] Starting.
      2024/04/05 19:23:06 INFO: [Master] [Local agent-groups] Sleeping 30s before starting the agent-groups task, waiting for the workers connection.
      2024/04/05 19:23:06 INFO: [HAPHelper] [Main] Proxy was initialized
      2024/04/05 19:23:06 INFO: [HAPHelper] [Main] Ensuring only exists one HAProxy process. Sleeping 12s before start...
      2024/04/05 19:23:06 INFO: [Master] [Local integrity] Finished in 0.090s. Calculated metadata of 34 files.
      2024/04/05 19:23:14 INFO: [Master] [Local integrity] Starting.
      2024/04/05 19:23:14 INFO: [Master] [Local integrity] Finished in 0.005s. Calculated metadata of 34 files.
      2024/04/05 19:23:18 DEBUG2: [HAPHelper] [Proxy] Obtained proxy backends
      2024/04/05 19:23:18 DEBUG2: [HAPHelper] [Proxy] Obtained proxy frontends
      2024/04/05 19:23:18 INFO: [HAPHelper] [Main] Starting HAProxy Helper
      2024/04/05 19:23:18 DEBUG2: [HAPHelper] [Proxy] Obtained proxy servers
