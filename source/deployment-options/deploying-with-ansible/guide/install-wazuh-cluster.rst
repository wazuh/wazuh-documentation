.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Deploying a Wazuh cluster with Ansible.

Install a Wazuh cluster
=======================

Wazuh can be deployed as a distributed cluster with Ansible playbooks. The installation will follow the steps below:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

1 - Accessing the wazuh-ansible directory
-----------------------------------------

We access the contents of the directory on the Ansible server where we have cloned the repository to. We can see the roles we have by running the command below in the cloned directory:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # tree roles -d

.. code-block:: none
   :class: output

   roles
   ├── ansible-galaxy
   │   └── meta
   └── wazuh
     ├── ansible-filebeat-oss
     │   ├── defaults
     │   ├── handlers
     │   ├── meta
     │   ├── tasks
     │   └── templates
     ├── ansible-wazuh-agent
     │   ├── defaults
     │   ├── handlers
     │   ├── meta
     │   ├── tasks
     │   └── templates
     ├── ansible-wazuh-manager
     │   ├── defaults
     │   ├── files
     │   │   └── custom_ruleset
     │   │       ├── decoders
     │   │       └── rules
     │   ├── handlers
     │   ├── meta
     │   ├── tasks
     │   ├── templates
     │   └── vars
     ├── wazuh-dashboard
     │   ├── defaults
     │   ├── handlers
     │   ├── tasks
     │   ├── templates
     │   └── vars
     └── wazuh-indexer
         ├── defaults
         ├── handlers
         ├── meta
         ├── tasks
         └── templates

And we can see the preconfigured playbooks we have by running the command below.:

.. code-block:: console

   # tree playbooks/

.. code-block:: none
   :class: output

   playbooks
   ├── ansible.cfg
   ├── wazuh-agent.yml
   ├── wazuh-dashboard.yml
   ├── wazuh-indexer.yml
   ├── wazuh-manager-oss.yml
   ├── wazuh-production-ready.yml
   └── wazuh-single.yml

Using the wazuh-production-ready playbook, we will deploy a Wazuh manager and indexer cluster using Ansible.

If you are running Ansible on macOS, ensure Docker is installed on your system. Modify the ``macos_localhost`` variable in ``wazuh-production-ready.yml`` from ``false`` to ``true`` to ensure the certificates are created correctly.

Let’s see below, the content of the YAML file ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-production-ready.yml`` that we are going to run for a complete installation of the server.

.. code-block:: console

   # cat wazuh-production-ready.yml

.. code-block:: yaml
   :class: output

   # Certificates generation
     - hosts: wi1
       roles:
         - role: ../roles/wazuh/wazuh-indexer
           indexer_network_host: "{{ private_ip }}"
           indexer_cluster_nodes:
             - "{{ hostvars.wi1.private_ip }}"
             - "{{ hostvars.wi2.private_ip }}"
             - "{{ hostvars.wi3.private_ip }}"
           indexer_discovery_nodes:
             - "{{ hostvars.wi1.private_ip }}"
             - "{{ hostvars.wi2.private_ip }}"
             - "{{ hostvars.wi3.private_ip }}"
           perform_installation: false
       become: no
       vars:
         indexer_node_master: true
         instances:
           node1:
             name: node-1       # Important: must be equal to indexer_node_name.
             ip: "{{ hostvars.wi1.private_ip }}"   # When unzipping, the node will search for its node name folder to get the cert.
             role: indexer
           node2:
             name: node-2
             ip: "{{ hostvars.wi2.private_ip }}"
             role: indexer
           node3:
             name: node-3
             ip: "{{ hostvars.wi3.private_ip }}"
             role: indexer
           node4:
             name: node-4
             ip: "{{ hostvars.manager.private_ip }}"
             role: wazuh
             node_type: master
           node5:
             name: node-5
             ip: "{{ hostvars.worker.private_ip }}"
             role: wazuh
             node_type: worker
           node6:
             name: node-6
             ip: "{{ hostvars.dashboard.private_ip }}"
             role: dashboard
         macos_localhost: false
       tags:
         - generate-certs

   # Wazuh indexer cluster
     - hosts: wi_cluster
       strategy: free
       roles:
         - role: ../roles/wazuh/wazuh-indexer
           indexer_network_host: "{{ private_ip }}"
       become: yes
       become_user: root
       vars:
         indexer_cluster_nodes:
           - "{{ hostvars.wi1.private_ip }}"
           - "{{ hostvars.wi2.private_ip }}"
           - "{{ hostvars.wi3.private_ip }}"
         indexer_discovery_nodes:
           - "{{ hostvars.wi1.private_ip }}"
           - "{{ hostvars.wi2.private_ip }}"
           - "{{ hostvars.wi3.private_ip }}"
         indexer_node_master: true
         instances:
           node1:
             name: node-1       # Important: must be equal to indexer_node_name.
             ip: "{{ hostvars.wi1.private_ip }}"   # When unzipping, the node will search for its node name folder to get the cert.
             role: indexer
           node2:
             name: node-2
             ip: "{{ hostvars.wi2.private_ip }}"
             role: indexer
           node3:
             name: node-3
             ip: "{{ hostvars.wi3.private_ip }}"
             role: indexer
           node4:
             name: node-4
             ip: "{{ hostvars.manager.private_ip }}"
             role: wazuh
             node_type: master
           node5:
             name: node-5
             ip: "{{ hostvars.worker.private_ip }}"
             role: wazuh
             node_type: worker
           node6:
             name: node-6
             ip: "{{ hostvars.dashboard.private_ip }}"
             role: dashboard

   # Wazuh cluster
     - hosts: manager
       roles:
         - role: "../roles/wazuh/ansible-wazuh-manager"
         - role: "../roles/wazuh/ansible-filebeat-oss"
           filebeat_node_name: node-4
       become: yes
       become_user: root
       vars:
         wazuh_manager_config:
           connection:
               - type: 'secure'
                 port: '1514'
                 protocol: 'tcp'
                 queue_size: 131072
           api:
               https: 'yes'
           cluster:
               disable: 'no'
               node_name: 'master'
               node_type: 'master'
               key: 'c98b62a9b6169ac5f67dae55ae4a9088'
               nodes:
                   - "{{ hostvars.manager.private_ip }}"
               hidden: 'no'
         wazuh_api_users:
           - username: custom-user
             password: SecretPassword1!
         filebeat_output_indexer_hosts:
                 - "{{ hostvars.wi1.private_ip }}"
                 - "{{ hostvars.wi2.private_ip }}"
                 - "{{ hostvars.wi3.private_ip }}"

     - hosts: worker
       roles:
         - role: "../roles/wazuh/ansible-wazuh-manager"
         - role: "../roles/wazuh/ansible-filebeat-oss"
           filebeat_node_name: node-5
       become: yes
       become_user: root
       vars:
         wazuh_manager_config:
           connection:
               - type: 'secure'
                 port: '1514'
                 protocol: 'tcp'
                 queue_size: 131072
           api:
               https: 'yes'
           cluster:
               disable: 'no'
               node_name: 'worker_01'
               node_type: 'worker'
               key: 'c98b62a9b6169ac5f67dae55ae4a9088'
               nodes:
                   - "{{ hostvars.manager.private_ip }}"
               hidden: 'no'
         filebeat_output_indexer_hosts:
                 - "{{ hostvars.wi1.private_ip }}"
                 - "{{ hostvars.wi2.private_ip }}"
                 - "{{ hostvars.wi3.private_ip }}"

   # Wazuh dashboard node
     - hosts: dashboard
       roles:
         - role: "../roles/wazuh/wazuh-dashboard"
       become: yes
       become_user: root
       vars:
         indexer_network_host: "{{ hostvars.wi1.private_ip }}"
         dashboard_node_name: node-6
         wazuh_api_credentials:
           - id: default
             url: https://{{ hostvars.manager.private_ip }}
             port: 55000
             username: custom-user
             password: SecretPassword1!
         ansible_shell_allow_world_readable_temp: true

Let’s take a closer look at the content.

-  The first line ``hosts``: indicates the machines where the commands below will be executed.

-  The ``roles``: section indicates the roles that will be executed on the hosts mentioned above. Specifically, we are going to install the role of wazuh-manager (Wazuh manager + API) and the role of filebeat.

-  The parameter ``filebeat_output_indexer_hosts``: indicates the host group of the Wazuh indexer cluster.

More details on  default configuration variables can be found in the :doc:`variables references section <../reference>`.

2 - Preparing to run the playbook
---------------------------------

The YAML file wazuh-production-ready.yml will provision a production-ready distributed Wazuh environment. We will add the public and private IP addresses of the endpoints where the various components of the cluster will be installed to the Ansible hosts file. For this guide, the architecture includes 2 Wazuh nodes, 3 Wazuh indexer nodes, and a Wazuh dashboard node.

The contents of the host file is:

.. code-block:: yaml

   wi1 ansible_host=<wi1_ec2_public_ip> private_ip=<wi1_ec2_private_ip> indexer_node_name=node-1
   wi2 ansible_host=<wi2_ec2_public_ip> private_ip=<wi2_ec2_private_ip> indexer_node_name=node-2
   wi3 ansible_host=<wi3_ec2_public_ip> private_ip=<wi3_ec2_private_ip> indexer_node_name=node-3
   dashboard  ansible_host=<dashboard_node_public_ip> private_ip=<dashboard_ec2_private_ip>
   manager ansible_host=<manager_node_public_ip> private_ip=<manager_ec2_private_ip>
   worker  ansible_host=<worker_node_public_ip> private_ip=<worker_ec2_private_ip>

   [wi_cluster]
   wi1
   wi2
   wi3

   [all:vars]
   ansible_ssh_user=centos
   ansible_ssh_private_key_file=/path/to/ssh/key.pem
   ansible_ssh_extra_args='-o StrictHostKeyChecking=no'

Let’s take a closer look at the content.

-  The ``ansible_host`` variable should contain the public IP address/FQDN for each node.
-  The ``private_ip`` variable should contain the private IP address/FQDN used for the internal cluster communications.
-  If the environment is located in a local subnet, ``ansible_host`` and ``private_ip`` variables should match.
-  The ansible_ssh variable specifies the ssh user for the nodes.

3 - Running the playbook
------------------------

Now, we are ready to run the playbook and start the installation. However, some of the operations to be performed on the remote systems will need sudo permissions. We can solve this in several ways, either by opting to enter the password when Ansible requests it or using  the `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ option (to avoid entering passwords one by one).

#. Let's run the playbook.

   Switch to the playbooks folder on the Ansible server and proceed to run the command below:

   .. code-block:: console

      # ansible-playbook wazuh-production-ready.yml -b -K

#. We can check the status of the new services on our respective nodes.

   -  Wazuh indexer.

      .. code-block:: console

         # systemctl status wazuh-indexer

   -  Wazuh dashboard

      .. code-block:: console

         # systemctl status wazuh-dashboard

   -  Wazuh manager.

      .. code-block:: console

         # systemctl status wazuh-manager

   -  Filebeat.

      .. code-block:: console

         # systemctl status filebeat

.. note::

	- 	The Wazuh dashboard can be accessed by visiting ``https://<dashboard_server_IP>``

	- 	The default credentials for Wazuh deployed using ansible is:

		| Username: admin
		|	Password: changeme
		| These credentials should be changed using the password changing tool.
