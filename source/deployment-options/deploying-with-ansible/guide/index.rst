.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh components using Ansible playbooks and roles.

.. _wazuh_ansible_deploying:

Deploying Wazuh
===============

The `Wazuh Ansible <https://github.com/wazuh/wazuh-ansible.git>`_ repository provides playbooks and roles for installing Wazuh central components and agents. Clone the repository into the Ansible roles directory at ``/etc/ansible/roles``.

Run the following commands on the Ansible server:

.. code-block:: console

   # mkdir -p /etc/ansible/roles
   # cd /etc/ansible/roles/
   # sudo git clone --branch v|WAZUH_CURRENT_ANSIBLE| https://github.com/wazuh/wazuh-ansible.git
   # ls

.. code-block:: none
   :class: output

   wazuh-ansible

The following section describes how to use Ansible to install the Wazuh central components and Wazuh agent in your environment.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Installing the Wazuh central components
----------------------------------------

The Wazuh central components include the Wazuh indexer, Wazuh dashboard, and Wazuh manager. You can deploy these components with Ansible using predefined playbooks or roles, depending on your desired architecture.

The following sections explain how to deploy the Wazuh central components based on the deployment option:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

The all-in-one deployment installs the Wazuh indexer, Wazuh dashboard, and Wazuh manager on a single endpoint. You can use predefined playbooks from the Wazuh Ansible repository to deploy these components.

Installing the Wazuh indexer and dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh indexer and dashboard with the playbooks from the Wazuh Ansible repository. Ensure the Ansible control server has SSH access to this endpoint.

Perform the following to deploy the Wazuh indexer and dashboard:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Access the wazuh-ansible directory
++++++++++++++++++++++++++++++++++

#. Change to the directory where you cloned the repository and list available roles:

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

#. Run the command below to see the preconfigured playbooks:

   .. code-block:: console

      root@ansible:/etc/ansible/roles/wazuh-ansible# tree playbooks/

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

The Wazuh dashboard and indexer roles are used to install and configure the Wazuh dashboard and indexer components. See below the content of the playbook ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-indexer.yml``:

.. code-block:: yaml

   ---
   - hosts: wi_cluster
     roles:
       - role: ../roles/wazuh/wazuh-indexer
     vars:
       instances:
             # A certificate will be generated for every node using the name as CN.
         node1:
           name: node-1
           ip: <node-1 IP>
           role: indexer
         node2:
           name: node-2
           ip: <node-2 IP>
           role: indexer
         node3:
           name: node-3
           ip: <node-3 IP>
           role: indexer

Where:

-  ``hosts:`` indicates the endpoints where the commands of the playbook will be executed.

-  ``roles:`` indicates the roles that will be executed on the hosts.

See below the content of the playbook ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-dashboard.yml`` file:

.. code-block:: yaml

   ---
   - hosts: wi1
     roles:
       - role: ../roles/wazuh/wazuh-dashboard
     vars:
       ansible_shell_allow_world_readable_temp: true

Where:

-  ``hosts:`` indicates the endpoints where the commands of the playbook will be executed.

-  ``roles:`` indicates the roles that will be executed on the hosts.

These files are designed to run the installations of each service individually. There are several variables you can use to customize the installation or configuration. To change the default configuration, modify the files below:

-  ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/wazuh-dashboard/defaults/main.yml``

-  ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/wazuh-indexer/defaults/main.yml``

Alternatively, you can create another YAML file with the content you want to change for each role. You can find more information about the roles below:

-  :doc:`Wazuh indexer role </deployment-options/deploying-with-ansible/roles/wazuh-indexer>`.

-  :doc:`Wazuh dashboard role </deployment-options/deploying-with-ansible/roles/wazuh-dashboard>`.

More details on default configuration variables can be found in the :doc:`variables references </deployment-options/deploying-with-ansible/reference>` section.

Prepare the playbook
++++++++++++++++++++

Create a single playbook to deploy both the Wazuh indexer and the dashboard. You can also configure and run the Wazuh indexer and dashboard playbooks separately. In this case, the deployment is executed using a single file.

-  Create the file ``wazuh-indexer-and-dashboard.yml`` in the ``/etc/ansible/roles/wazuh-ansible/playbooks`` directory:

   .. code-block:: console

      # touch playbooks/wazuh-indexer-and-dashboard.yml

-  Add the following content below to the ``playbooks/wazuh-indexer-and-dashboard.yml`` file:

   .. code-block:: yaml

      - hosts: all_in_one
        roles:
          - role: ../roles/wazuh/wazuh-indexer
            perform_installation: false
        become: no
        vars:
          indexer_node_master: true
          instances:
            node1:
              name: node-1       # Important: must be equal to indexer_node_name.
              ip: 127.0.0.1
              role: indexer
        tags:
          - generate-certs

      - hosts: all_in_one
        become: yes
        become_user: root
        roles:
          - role: ../roles/wazuh/wazuh-indexer
          - role: ../roles/wazuh/wazuh-dashboard
        vars:
          single_node: true
          indexer_network_host: 127.0.0.1
          ansible_shell_allow_world_readable_temp: true
          instances:
                # A certificate will be generated for every node using the name as CN.
            node1:
              name: node-1
              ip: 127.0.0.1
              role: indexer
          indexer_custom_user: false

As shown above, the IP address of the Wazuh dashboard and indexer server has been set to the ``indexer_network_host`` entry.

Run the playbook
++++++++++++++++

#. Switch to the playbooks directory on the Ansible server and run the command below:

   .. code-block:: console

      # ansible-playbook wazuh-indexer-and-dashboard.yml -b -K

#. Check the status of Wazuh indexer and dashboard server services.

   -  Wazuh indexer.

      .. code-block:: console

         # systemctl status wazuh-indexer

   -  Wazuh dashboard

      .. code-block:: console

         # systemctl status wazuh-dashboard

.. note::

   -  The Wazuh dashboard can be accessed by visiting
      ``https://<WAZUH_SERVER_IP>``
   -  The default credentials for Wazuh deployed using Ansible is:

      Username: ``admin``
      
      Password: ``changeme``

   Refer to the :doc:`Password management </user-manual/user-administration/password-management>` section to change the default credentials.

Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install and configure the Wazuh manager and Filebeat with the roles in the Wazuh Ansible repository. Ensure the Ansible control server has SSH access to the Wazuh manager endpoint.

To install the Wazuh manager, perform the following:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Access the wazuh-ansible directory
++++++++++++++++++++++++++++++++++

Change to the directory where the repository was cloned and list the available roles and playbooks:

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

You can see the preconfigured playbooks by running the command below.:

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

The ``ansible-wazuh-manager`` and ``ansible-filebeat-oss`` roles are used in the installation and configuration of the Wazuh manager and filebeat components. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-manager-oss.yml`` file that deploy the Wazuh server.

.. code-block:: console

   # cat wazuh-manager-oss.yml

.. code-block:: yaml
   :class: output

   ---
   - hosts: managers
     roles:
       - role: ../roles/wazuh/ansible-wazuh-manager
       - role: ../roles/wazuh/ansible-filebeat-oss
         filebeat_output_indexer_hosts:
         - "<indexer-node-1>:9200"
         - "<indexer-node-2>:9200"
         - "<indexer-node-2>:9200"

Where:

-  ``hosts:`` indicates the machines where the commands below will be executed.

-  ``roles:`` section indicates the roles that will be executed on the hosts mentioned above. Specifically, we are going to install the role of wazuh-manager (Wazuh manager + API) and the role of filebeat.

-  ``filebeat_output_indexer_hosts:`` indicates the host group of the Wazuh indexer cluster.

There are several variables that you can use to customize the installation or configuration. You can change the default configuration by modifying the files below:

-  ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-manager/defaults/main.yml``

-  ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-filebeat-oss/defaults/main.yml``

Alternatively, you can create another YAML file with the content you want to change for Filebeat and the Wazuh manager. We can find more information about the :doc:`roles </deployment-options/deploying-with-ansible/roles/index>` in this section.

More details on default configuration variables can be found in the :doc:`variables references </deployment-options/deploying-with-ansible/reference>` section.

Prepare the playbook
++++++++++++++++++++

Modify the ``wazuh-manager-oss.yml`` file and include the IP address of the server where you will install the Wazuh manager to the ``filebeat_output_indexer_hosts`` field. Also, change the value of the ``hosts`` field to ``all_in_one``.

.. code-block:: yaml

   ---
   - hosts: all_in_one
     roles:
       - role: ../roles/wazuh/ansible-wazuh-manager
       - role: ../roles/wazuh/ansible-filebeat-oss
         filebeat_node_name: node-1
         filebeat_output_indexer_hosts:
         - "127.0.0.1:9200"

Run the playbook
++++++++++++++++

#. Navigate to the playbooks folder on the Ansible server and run the command below:

   .. code-block:: console

      # ansible-playbook wazuh-manager-oss.yml -b -K

#. Check the status of Wazuh manager and filebeat services.

   -  Wazuh manager

      .. code-block:: console

         # systemctl status wazuh-manager

   -  Filebeat

      .. code-block:: console

         # systemctl status filebeat

.. note::

   -  The Wazuh dashboard can be accessed by visiting
      ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  The default credentials for Wazuh deployed using Ansible is:

      Username: ``admin``

      Password: ``changeme``

   Refer to the :doc:`Password management </user-manual/user-administration/password-management>` section to change the default credentials.

Wazuh cluster deployment
^^^^^^^^^^^^^^^^^^^^^^^^

A Wazuh cluster is a distributed deployment where multiple Wazuh manager and indexer nodes work together to provide horizontal scalability, performance, and high availability. In a clustered setup, data and workloads are shared across nodes, ensuring redundancy and load balancing.

You can deploy a Wazuh cluster using Ansible playbooks from the Wazuh Ansible repository.

To install a Wazuh cluster, perform the following steps:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Access the wazuh-ansible directory
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Change to the directory where you cloned the Wazuh Ansible repository and list available playbooks:

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

You can see the preconfigured playbooks by running the command below:

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

Using the wazuh-production-ready playbook, we deploy a Wazuh manager and indexer cluster using Ansible. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-production-ready.yml`` file:

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

   # Indexer + dashboard node
     - hosts: dashboard
       roles:
         - role: "../roles/wazuh/wazuh-indexer"
         - role: "../roles/wazuh/wazuh-dashboard"
       become: yes
       become_user: root
       vars:
         indexer_network_host: "{{ hostvars.dashboard.private_ip }}"
         indexer_node_name: node-6
         indexer_node_master: false
         indexer_node_ingest: false
         indexer_node_data: false
         indexer_cluster_nodes:
             - "{{ hostvars.wi1.private_ip }}"
             - "{{ hostvars.wi2.private_ip }}"
             - "{{ hostvars.wi3.private_ip }}"
         indexer_discovery_nodes:
             - "{{ hostvars.wi1.private_ip }}"
             - "{{ hostvars.wi2.private_ip }}"
             - "{{ hostvars.wi3.private_ip }}"
         dashboard_node_name: node-6
         wazuh_api_credentials:
           - id: default
             url: https://{{ hostvars.manager.private_ip }}
             port: 55000
             username: custom-user
             password: SecretPassword1!
         instances:
           node1:
             name: node-1
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
         ansible_shell_allow_world_readable_temp: true

**Where:**

-  ``hosts:`` indicates the endpoints where the commands below will be executed.

-  ``roles:`` section indicates the roles that will be executed on the hosts mentioned above. The role of wazuh-manager (Wazuh manager + API) filebeat will be installed.

-  ``filebeat_output_indexer_hosts:`` indicates the host group of the Wazuh indexer cluster.

More details on default configuration variables can be found in the :doc:`variables references </deployment-options/deploying-with-ansible/reference>` section.

Prepare the playbook
~~~~~~~~~~~~~~~~~~~~

The ``wazuh-production-ready.yml`` file allows you to deploy a distributed Wazuh environment. For this guide, the architecture includes 2 Wazuh manager nodes, 3 Wazuh indexer nodes and a Wazuh dashboard node. Add the public and private IP addresses of the endpoints where the various components of the cluster will be installed to the ``/etc/ansible/hosts`` Ansible hosts file.

The contents of the Ansible host file below:

.. code-block:: ini

   wi1 ansible_host=<WI1_EC2_PUBLIC_1P> private_ip=<WI1_EC2_PRIVATE_IP> indexer_node_name=node-1
   wi2 ansible_host=<WI2_EC2_PUBLIC_1P> private_ip=<WI2_EC2_PRIVATE_IP> indexer_node_name=node-2
   wi3 ansible_host=<WI3_EC2_PUBLIC_1P> private_ip=<WI3_EC2_PRIVATE_IP> indexer_node_name=node-3
   dashboard  ansible_host=<DASHBOARD_NODE_PUBLIC_IP> private_ip=<DASHBOARD_EC2_PRIVATE_IP>
   manager ansible_host=<MANAGER_NODE_PUBLIC_IP> private_ip=<MANAGER_EC2_PRIVATE_IP>
   worker  ansible_host=<WORKER_NODE_PUBLIC_IP> private_ip=<WORKER_EC2_PRIVATE_IP>

   [wi_cluster]
   wi1
   wi2
   wi3

   [all:vars]
   ansible_ssh_user=<USERNAME>
   ansible_ssh_extra_args='-o StrictHostKeyChecking=no'
   ansible_python_interpreter=/usr/bin/python3

Where:

-  ``ansible_host`` variable should contain the public IP address/FQDN for each node.

-  ``private_ip`` variable should contain the private IP address/FQDN used for the internal cluster communications.

-  If the environment is located in a local subnet, ``ansible_host`` and ``private_ip`` variables should match.

-  ``ansible_ssh_user`` variable specifies the SSH user for the nodes when it's the same. Specify this variable for each ``ansible_host`` if the SSH users are different. For example:

   .. code-block:: ini

      wi1 ansible_host=<WI1_EC2_PUBLIC_IP> private_ip=<WI1_EC2_PRIVATE_IP> indexer_node_name=node-1 ansible_user=ubuntu
      wi2 ansible_host=<WI2_EC2_PUBLIC_IP> private_ip=<WI2_EC2_PRIVATE_IP> indexer_node_name=node-2 ansible_user=admin

Run the playbook
~~~~~~~~~~~~~~~~

#. Switch to the playbooks folder on the Ansible server and proceed to run the command below:

   .. code-block:: console

      # ansible-playbook wazuh-production-ready.yml -b -K

#. The commands below check the status of Wazuh indexer, Wazuh dashboard, Wazuh manager, and filebeat services.

   -  Wazuh indexer:

      .. code-block:: console

         # systemctl status wazuh-indexer

   -  Wazuh dashboard:

      .. code-block:: console

         # systemctl status wazuh-dashboard

   -  Wazuh manager:

      .. code-block:: console

         # systemctl status wazuh-manager

   -  Filebeat:

      .. code-block:: console

         # systemctl status filebeat

.. note::

   -  The Wazuh dashboard can be accessed by visiting
      ``https://<DASHBOARD_SERVER_IP>``
   -  The default credentials for Wazuh deployed using Ansible is:

      Username: ``admin``

      Password: ``changeme``

   Refer to the :doc:`Password management </user-manual/user-administration/password-management>` section to change the default credentials.

Installing the Wazuh agent
--------------------------

The ``ansible-wazuh-agent`` role installs Wazuh agents on Linux endpoints. The Ansible control server requires SSH access to each endpoint.

To install the Wazuh agent, perform the following:

-  :ref:`Check your Ansible version <agent-prerequisites>`
-  :ref:`Access the wazuh-ansible directory <agent-access-wazuh-ansible-directory>`
-  :ref:`Prepare the playbook <agent-prepare-playbook>`
-  :ref:`Run the playbook <agent-run-playbook>`

.. _agent-prerequisites:

Prerequisites
^^^^^^^^^^^^^

Before deploying Wazuh agents with Ansible, check your Ansible version:

-  Ansible-core 2.10 or later requires installing additional collections from Ansible Galaxy. Without these collections, running the Wazuh agent playbook may fail with an invalid characters error in ``roles/wazuh/ansible-wazuh-agent/handlers/main.yml``:

   .. code-block:: console

      # ansible-galaxy collection install ansible.windows community.windows

-  Ansible 2.9 or earlier does not require these collections.

.. note::

   -  SSH key-pairing should already be configured between the Ansible control server and the endpoints.
   -  Add the endpoints where the agent will be deployed in the ``/etc/ansible/hosts`` Ansible hosts file under the ``[wazuh-agents]`` hosts group.

   .. code-block:: ini

      [wazuh-agents]
      agent_1 ansible_host=<WAZUH_AGENT_IP_ADDRESS> ansible_ssh_user=<USERNAME>

.. _agent-access-wazuh-ansible-directory:

Access the wazuh-ansible directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Change to the directory where you cloned the Wazuh Ansible repository:

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

You can see the preconfigured playbooks by running the command below:

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

The ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` file contains the necessary commands to install a Wazuh agent and register it to the Wazuh manager. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` file:

.. code-block:: yaml

   ---
   - hosts: <WAZUH_AGENT_IP_ADDRESS> OR <WAZUH_AGENT_GROUP_NAME>
     become: yes
     become_user: root
     roles:
       - ../roles/wazuh/ansible-wazuh-agent
     vars:
       wazuh_managers:
         - address: <WAZUH_MANAGER_IP_ADDRESS>
           port: 1514
           protocol: tcp
           api_port: 55000
           api_proto: 'https'
           api_user: wazuh
           max_retries: 5
           retry_interval: 5

**Where:**

-  ``hosts:`` indicates the endpoints where the commands in the playbook will be executed.

-  ``roles:`` section indicates the roles that will be executed on the hosts specified. In this case, the role of the wazuh-agent will be installed. Replace the ``<WAZUH_AGENT_IP_ADDRESS>`` OR ``<WAZUH_AGENT_GROUP_NAME>`` with the IP address of the Wazuh agent or the Wazuh agent group name.

-  ``wazuh_managers:`` indicates details for the connection with the Wazuh manager. This list overwrites the default configuration. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the actual IP address of the Wazuh manager.

There are several variables that you can use to customize the installation or configuration. You can change the default configuration by modifying the ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent/defaults/main.yml`` file.

Alternatively, you can create another YAML file with the content you want to change in the configuration. You can find more information in the :doc:`Wazuh agent role </deployment-options/deploying-with-ansible/roles/wazuh-agent>` section.

More details on default configuration variables can be found in the :doc:`variables references </deployment-options/deploying-with-ansible/reference>` section.

.. _agent-prepare-playbook:

Prepare the playbook
^^^^^^^^^^^^^^^^^^^^

Add ``wazuh-agents`` as host group of the endpoints where the installation of the Wazuh agent will be done in the hosts section and the IP address of the Wazuh server in the ``wazuh_managers:`` section of the ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` file.

.. code-block:: yaml

   ---
   - hosts: wazuh-agents
     become: yes
     become_user: root
     roles:
       - ../roles/wazuh/ansible-wazuh-agent
     vars:
       wazuh_managers:
         - address: <WAZUH_MANAGER_IP_ADDRESS>
           port: 1514
           protocol: tcp
           api_port: 55000
           api_proto: 'https'
           api_user: wazuh
           max_retries: 5
           retry_interval: 5

.. _agent-run-playbook:

Run the playbook
^^^^^^^^^^^^^^^^

#. Switch to the playbooks folder on the Ansible server and run the command below:

   .. code-block:: console

      # ansible-playbook wazuh-agent.yml -b -K

#. Check the status of Wazuh agent:

   -  Wazuh agent status on the endpoint

      .. code-block:: console

         # systemctl status wazuh-agent

   -  Wazuh agent status on the Wazuh server

      .. code-block:: console

         # /var/ossec/bin/agent_control -l
