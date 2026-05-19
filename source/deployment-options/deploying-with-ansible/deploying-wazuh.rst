.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh central components and agents using Ansible playbooks, including all-in-one and cluster deployment options.

Deploying Wazuh
===============

The `Wazuh Ansible <https://github.com/wazuh/wazuh-ansible.git>`_ repository provides playbooks and roles for installing Wazuh central components and agents. Clone the repository into the Ansible roles directory at ``/etc/ansible/roles``.

Run the following commands on the Ansible server:

.. code-block:: console

   # mkdir -p /etc/ansible/roles
   # cd /etc/ansible/roles/
   # git clone --branch v|WAZUH_CURRENT_ANSIBLE|-|WAZUH_CURRENT_ANSIBLE_REV| https://github.com/wazuh/wazuh-ansible.git
   # cd wazuh-ansible
   # ansible-galaxy install -r requirements.yml

The following section describes how to use Ansible to install the Wazuh central components and Wazuh agent in your environment:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Installing the Wazuh central components
---------------------------------------

The Wazuh central components include the Wazuh indexer, Wazuh dashboard, and Wazuh manager. You can deploy these components with Ansible using predefined playbooks or roles, depending on your desired architecture.

The following sections explain how to deploy the Wazuh central components based on the deployment option:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

The all-in-one deployment installs the Wazuh indexer, Wazuh dashboard, and Wazuh manager on a single endpoint. You can use predefined playbooks from the Wazuh Ansible repository to deploy these components. Ensure the Ansible control server has SSH access to this endpoint.

Perform the following to deploy the Wazuh manager, indexer, and dashboard:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Access the wazuh-ansible directory
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Change to the directory where you cloned the Wazuh Ansible repository and list available roles:

   .. code-block:: console

      # cd /etc/ansible/roles/wazuh-ansible/
      # tree roles -d

   .. code-block:: none
      :class: output

      roles
      ├── package-urls
      │   ├── defaults
      │   └── tasks
      ├── vars
      ├── wazuh-agent
      │   ├── defaults
      │   └── tasks
      ├── wazuh-dashboard
      │   ├── defaults
      │   └── tasks
      ├── wazuh-indexer
      │   ├── defaults
      │   └── tasks
      └── wazuh-manager
          ├── defaults
          └── tasks
      17 directories

#. Run the command below to see the preconfigured playbooks:

   .. code-block:: console

      # ls

   .. code-block:: none
      :class: output

      CHANGELOG.md  LICENSE  README.md  SECURITY.md  VERSION.json  docs  requirements.yml  roles  tools  wazuh-agent.yml  wazuh-aio.yml  wazuh-distributed.yml

   The Wazuh manager, dashboard, and indexer roles are used to install and configure the Wazuh manager, dashboard, and indexer components. See below the content of the playbook ``/etc/ansible/roles/wazuh-ansible/wazuh-aio.yml``:

   .. code-block:: yaml

      ---

      - name: Wazuh All-in-One Deployment
        hosts: aio
        become: true
        roles:
          - role: package-urls
          - role: wazuh-indexer
          - role: wazuh-manager
          - role: wazuh-dashboard
        vars:
          single_node: true

   Where:

   -  ``hosts:`` indicates the endpoints where the commands of the playbook will be executed.
   -  ``roles:`` indicates the roles that will be executed on the hosts.

Prepare the playbook
~~~~~~~~~~~~~~~~~~~~

The ``wazuh-aio.yml`` file allows you to deploy an all-in-one Wazuh environment. Add the public and private IP addresses of the endpoint where the Wazuh components will be installed to the ``/etc/ansible/hosts`` Ansible hosts file.

The contents of the Ansible host file below:

.. code-block:: ini

   [aio]
   aio_node ansible_host=<AIO_PUBLIC_IP> private_ip=<AIO_PRIVATE_IP>

   [aio:vars]
   ansible_user=<USERNAME>
   ansible_ssh_common_args='-o StrictHostKeyChecking=no'
   ansible_ssh_private_key_file=<PATH_TO_PIVATE_KEY>.pem

Where:

-  ``ansible_host`` specifies the public IP address or hostname Ansible uses to connect to the all-in-one node. Replace ``<AIO_PUBLIC_IP>`` with the actual public IP address or hostname of the endpoint that hosts the Wazuh central components.
-  ``private_ip`` specifies the private IP address used for internal communication between the Wazuh components deployed on the AIO node. Replace ``<AIO_PRIVATE_IP>`` with the actual private IP address assigned to the endpoint.
-  If the environment is located in a local subnet, ``ansible_host`` and ``private_ip`` variables should match.
-  ``ansible_user`` specifies the remote user account Ansible uses to connect over SSH. Replace ``<USERNAME>`` with a valid user account that has the required privileges on the endpoints.
-  ``ansible_ssh_private_key_file`` specifies the full path to the SSH private key used by Ansible to connect to the target hosts. Replace ``<PATH_TO_PRIVATE_KEY>`` with the directory path where the private key file is stored on the Ansible control node.

Run the playbook
~~~~~~~~~~~~~~~~

#. Run the command below from the playbook directory on the Ansible server:

   .. code-block:: console

      # ansible-playbook wazuh-aio.yml -e "source=prerelease"

#. Check the status of the Wazuh indexer, dashboard, and manager services.

   -  Wazuh indexer:

      .. code-block:: console

         # systemctl status wazuh-indexer

   -  Wazuh dashboard:

      .. code-block:: console

         # systemctl status wazuh-dashboard

   -  Wazuh manager:

      .. code-block:: console

         # systemctl status wazuh-manager

.. note::

   The Wazuh dashboard can be accessed by visiting ``https://<AIO_PUBLIC_IP>``

   The default credentials are:

   -  **Username**: ``admin``
   -  **Password**: ``admin``

Wazuh cluster deployment
^^^^^^^^^^^^^^^^^^^^^^^^^

A Wazuh cluster is a distributed deployment where multiple Wazuh manager and indexer nodes work together to provide horizontal scalability, performance, and high availability. In a clustered setup, data and workloads are shared across nodes, ensuring redundancy and load balancing.

You can deploy a Wazuh cluster using Ansible playbooks from the Wazuh Ansible repository.

To install a Wazuh cluster, perform the following steps:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Access the wazuh-ansible directory
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Change to the directory where you cloned the Wazuh Ansible repository and list available playbooks:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # tree roles -d

.. code-block:: none
   :class: output

   roles
   ├── package-urls
   │   ├── defaults
   │   └── tasks
   ├── vars
   ├── wazuh-agent
   │   ├── defaults
   │   └── tasks
   ├── wazuh-dashboard
   │   ├── defaults
   │   └── tasks
   ├── wazuh-indexer
   │   ├── defaults
   │   └── tasks
   └── wazuh-manager
       ├── defaults
       └── tasks

You can see the preconfigured playbooks by running the command below:

.. code-block:: console

   # ls

.. code-block:: none
   :class: output

   CHANGELOG.md  docs  LICENSE  README.md  requirements.yml  roles  SECURITY.md  tools  VERSION.json  wazuh-agent.yml  wazuh-aio.yml  wazuh-distributed.yml

Using the ``wazuh-distributed.yml`` playbook, we deploy a Wazuh manager and indexer cluster using Ansible. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/wazuh-distributed.yml`` file:

.. code-block:: console

   # cat wazuh-distributed.yml

.. code-block:: yaml
   :class: output

   ---

   - name: Configure package URLs
     hosts: localhost
     roles:
       - role: package-urls
     run_once: true
     become: false

   - name: Configure Wazuh Indexer cluster
     hosts: wi_cluster
     roles:
       - role: wazuh-indexer
     become: true
     vars:
       # generate_certs: false                    # Set to false if you are using your own certificates
       instances:
         wi1:                                     # Must be same as inventory hostname
           name: node-1
           ip: "{{ hostvars.wi1.private_ip }}"
           role: indexer
         wi2:
           name: node-2
           ip: "{{ hostvars.wi2.private_ip }}"
           role: indexer
         wi3:
           name: node-3
           ip: "{{ hostvars.wi3.private_ip }}"
           role: indexer
         manager:
           name: node-4
           ip: "{{ hostvars.manager.private_ip }}"
           role: manager
           node_type: master
         worker:
           name: node-5
           ip: "{{ hostvars.worker.private_ip }}"
           role: manager
           node_type: worker
         dashboard:
           name: node-6
           ip: "{{ hostvars.dashboard.private_ip }}"
           role: dashboard

   - name: Configure Wazuh Manager
     hosts: manager
     roles:
       - role: wazuh-manager
     become: true
     vars:
       node_type: "master"
       manager_node_name: "node-4"
       wazuh_indexer_hosts:
         - host: "{{ hostvars.wi1.private_ip }}"
           port: 9200
         - host: "{{ hostvars.wi2.private_ip }}"
           port: 9200
         - host: "{{ hostvars.wi3.private_ip }}"
           port: 9200

   - name: Configure Wazuh Worker
     hosts: worker
     roles:
       - role: wazuh-manager
     become: true
     vars:
       node_type: "worker"
       manager_node_name: "node-5"
       wazuh_indexer_hosts:
         - host: "{{ hostvars.wi1.private_ip }}"
           port: 9200
         - host: "{{ hostvars.wi2.private_ip }}"
           port: 9200
         - host: "{{ hostvars.wi3.private_ip }}"
           port: 9200

   - name: Configure Wazuh Dashboard
     hosts: dashboard
     roles:
       - role: wazuh-dashboard
     become: true
     vars:
       dashboard_node_name: "node-6"
       wazuh_manager_master_address: "{{ hostvars.manager.private_ip }}"
       indexer_cluster_nodes:
         - "{{ hostvars.wi1.private_ip }}"
         - "{{ hostvars.wi2.private_ip }}"
         - "{{ hostvars.wi3.private_ip }}"

**Where:**

-  ``hosts:`` specifies the Ansible inventory group name that the playbook will target. The playbook runs on the hosts defined under that group in the inventory file.
-  ``roles:`` section indicates the roles that will be executed on the hosts mentioned above.

Prepare the playbook
~~~~~~~~~~~~~~~~~~~~

The ``wazuh-distributed.yml`` file allows you to deploy a distributed Wazuh environment. For this guide, the architecture includes 2 Wazuh manager nodes, 3 Wazuh indexer nodes, and a Wazuh dashboard node. Add the public and private IP addresses of the endpoints where the various components of the cluster will be installed to the ``/etc/ansible/hosts`` Ansible hosts file.

The contents of the Ansible host file below:

.. code-block:: ini

   [all]
   wi1 ansible_host=<WI1_EC2_PUBLIC_1P> private_ip=<WI1_EC2_PRIVATE_IP> indexer_node_name=node-1
   wi2 ansible_host=<WI2_EC2_PUBLIC_1P> private_ip=<WI2_EC2_PRIVATE_IP> indexer_node_name=node-2
   wi3 ansible_host=<WI3_EC2_PUBLIC_1P> private_ip=<WI3_EC2_PRIVATE_IP> indexer_node_name=node-3
   manager ansible_host=<MANAGER_NODE_PUBLIC_IP> private_ip=<MANAGER_EC2_PRIVATE_IP>
   worker  ansible_host=<WORKER_NODE_PUBLIC_IP> private_ip=<WORKER_EC2_PRIVATE_IP>
   dashboard  ansible_host=<DASHBOARD_NODE_PUBLIC_IP> private_ip=<DASHBOARD_EC2_PRIVATE_IP>
   [wi_cluster]
   wi1
   wi2
   wi3

   [all:vars]
   ansible_ssh_user=<USERNAME>
   ansible_ssh_extra_args='-o StrictHostKeyChecking=no'
   ansible_ssh_private_key_file=<PATH_TO_PRIVATE_KEY>.pem

Where:

-  ``ansible_host`` specifies the public IP address or hostname Ansible uses to connect to the target node. Replace ``<WI1_EC2_PUBLIC_IP>``, ``<WI2_EC2_PUBLIC_IP>``, ``<WI3_EC2_PUBLIC_IP>``, ``<MANAGER_NODE_PUBLIC_IP>``, ``<WORKER_NODE_PUBLIC_IP>``, and ``<DASHBOARD_NODE_PUBLIC_IP>`` with the actual public IP addresses or hostnames of the Wazuh indexer, manager, worker, and dashboard nodes.
-  ``private_ip`` variable contains the private IP address/FQDN used for the internal cluster communication. Replace ``<WI1_EC2_PRIVATE_IP>``, ``<WI2_EC2_PRIVATE_IP>``, ``<WI3_EC2_PRIVATE_IP>``, ``<MANAGER_EC2_PRIVATE_IP>``, ``<WORKER_EC2_PRIVATE_IP>``, and ``<DASHBOARD_EC2_PRIVATE_IP>`` with the actual private IP addresses assigned to the endpoints.
-  If the environment is within a local subnet, ``ansible_host`` and ``private_ip`` variables should match.
-  ``ansible_ssh_private_key_file`` specifies the full path to the SSH private key used by Ansible to connect to the target hosts. Replace ``<PATH_TO_PRIVATE_KEY>`` with the directory path where the private key file is stored on the Ansible control node.
-  ``ansible_ssh_user`` variable specifies the SSH user for the nodes when it's the same. Replace ``<USERNAME>`` with a valid user account that has the required privileges on the endpoints. Specify this variable for each ``ansible_host`` if the SSH users are different. For example:

   .. code-block:: ini

      wi1 ansible_host=<WI1_EC2_PUBLIC_IP> private_ip=<WI1_EC2_PRIVATE_IP> indexer_node_name=node-1 ansible_user=ubuntu
      wi2 ansible_host=<WI2_EC2_PUBLIC_IP> private_ip=<WI2_EC2_PRIVATE_IP> indexer_node_name=node-2 ansible_user=admin

Run the playbook
~~~~~~~~~~~~~~~~

#. Run the command below from the playbook directory on the Ansible server:

   .. code-block:: console

      # ansible-playbook wazuh-distributed.yml -e "source=prerelease"

#. The commands below check the status of Wazuh indexer, Wazuh dashboard, and Wazuh manager services.

   -  Wazuh indexer:

      .. code-block:: console

         # systemctl status wazuh-indexer

   -  Wazuh dashboard:

      .. code-block:: console

         # systemctl status wazuh-dashboard

   -  Wazuh manager:

      .. code-block:: console

         # systemctl status wazuh-manager

.. note::

   The Wazuh dashboard can be accessed by visiting ``https://<DASHBOARD_SERVER_IP>``

   The default credentials are:

   -  **Username**: ``admin``
   -  **Password**: ``admin``

Installing the Wazuh agent
--------------------------

The ``ansible-wazuh-agent`` role installs Wazuh agents on Linux endpoints. The Ansible control server requires SSH access to each endpoint.

To install the Wazuh agent, perform the following:

-  :ref:`Check your Ansible version <ansible_agent_prereqs>`
-  :ref:`Access the wazuh-ansible directory <ansible_agent_access>`
-  :ref:`Prepare the playbook <ansible_agent_prepare>`
-  :ref:`Run the playbook <ansible_agent_run>`

.. _ansible_agent_prereqs:

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
         agent_1 ansible_host=<WAZUH_AGENT_IP_ADDRESS>
         ansible_ssh_user=<USERNAME>

.. _ansible_agent_access:

Access the wazuh-ansible directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Change to the directory where you cloned the Wazuh Ansible repository:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # tree roles -d

.. code-block:: none
   :class: output

   roles
   ├── package-urls
   │   ├── defaults
   │   └── tasks
   ├── vars
   ├── wazuh-agent
   │   ├── defaults
   │   └── tasks
   ├── wazuh-dashboard
   │   ├── defaults
   │   └── tasks
   ├── wazuh-indexer
   │   ├── defaults
   │   └── tasks
   └── wazuh-manager
       ├── defaults
       └── tasks
   17 directories

You can see the preconfigured playbooks by running the command below:

.. code-block:: console

   # ls

.. code-block:: none
   :class: output

   CHANGELOG.md  LICENSE  README.md  SECURITY.md  VERSION.json  docs  requirements.yml  roles  tools  wazuh-agent.yml  wazuh-aio.yml  wazuh-distributed.yml

The ``/etc/ansible/roles/wazuh-ansible/wazuh-agent.yml`` file contains the necessary commands to install a Wazuh agent and register it to the Wazuh manager. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/wazuh-agent.yml`` file:

.. code-block:: yaml

   ---

   - name: Deploy Wazuh agent(s)
     hosts: agents
     strategy: free
     vars:
       wazuh_manager_address: "<Your Wazuh Manager IP>"
     roles:
       - role: package-urls
     tasks:
       - name: Include wazuh-agent role for Linux/MacOS hosts
         when: ansible_facts.system == "Linux" or ansible_facts.system == "Darwin"
         become: true
         become_user: root
         block:
           - name: Include Wazuh agent role for Linux
             ansible.builtin.include_role:
               name: wazuh-agent

       - name: Include wazuh-agent role for Windows hosts
         when: ansible_facts.os_family == "Windows"
         ansible.builtin.include_role:
           name: wazuh-agent

**Where:**

-  ``hosts:`` specifies the Ansible inventory group that contains the endpoints where the Wazuh agent will be installed.
-  ``roles:`` section indicates the roles that will be executed on the hosts specified. In this case, the wazuh-agent role will be installed. Replace the ``<WAZUH_AGENT_IP_ADDRESS>`` OR ``<WAZUH_AGENT_GROUP_NAME>`` with the IP address of the Wazuh agent or the Wazuh agent group name.
-  ``wazuh_managers:`` indicates details for the connection with the Wazuh manager. This list overwrites the default configuration. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the actual IP address of the Wazuh manager.

.. _ansible_agent_prepare:

Prepare the playbook
^^^^^^^^^^^^^^^^^^^^^

Replace the IP address of the Wazuh manager in the ``wazuh_manager_addresses:`` section of the ``/etc/ansible/roles/wazuh-ansible/wazuh-agent.yml`` file.

.. code-block:: yaml

   ---

   - name: Deploy Wazuh agent(s)
     hosts: agents
     strategy: free
     vars:
       wazuh_manager_address: "<Your Wazuh Manager IP>"
     roles:
       - role: package-urls
     tasks:
       - name: Include wazuh-agent role for Linux/MacOS hosts
         when: ansible_facts.system == "Linux" or ansible_facts.system == "Darwin"
         become: true
         become_user: root
         block:
           - name: Include Wazuh agent role for Linux
             ansible.builtin.include_role:
               name: wazuh-agent

       - name: Include wazuh-agent role for Windows hosts
         when: ansible_facts.os_family == "Windows"
         ansible.builtin.include_role:
           name: wazuh-agent

Add the public and private IP addresses of the endpoint where the Wazuh components will be installed to the ``/etc/ansible/hosts`` Ansible hosts file.

The contents of the Ansible host file below:

.. code-block:: ini

   [agents]
   agent1 ansible_host=<WAZUH_AGENT1_IP>
   agent2 ansible_host=<WAZUH_AGENT2_IP>

   [agents:vars]
   ansible_user=<USERNAME>
   ansible_ssh_common_args='-o StrictHostKeyChecking=no'
   ansible_ssh_private_key_file=<PATH_TO_PRIVATE_KEY>.pem

Where:

-  ``ansible_host`` specifies the IP address of the endpoint where the Wazuh agent will be installed. Replace ``<WAZUH_AGENT1_IP>`` and ``<WAZUH_AGENT2_IP>`` with the actual IP addresses or hostnames of the Wazuh agent endpoints.
-  ``ansible_ssh_user`` specifies the remote user account Ansible uses to connect over SSH. Replace ``<USERNAME>`` with a valid user account that has the required privileges on the endpoints.
-  ``ansible_ssh_private_key_file`` specifies the SSH private key used by Ansible to connect to the target hosts. Replace ``<PATH_TO_PRIVATE_KEY>`` with the directory path where the private key file is stored on the Ansible control node.

.. _ansible_agent_run:

Run the playbook
^^^^^^^^^^^^^^^^^

#. Run the command below from the playbook directory on the Ansible server:

   .. code-block:: console

      # ansible-playbook wazuh-agent.yml -e "source=prerelease"

#. Check the status of the Wazuh agent:

   -  Wazuh agent status on the endpoint:

      .. code-block:: console

         # systemctl status wazuh-agent

   -  Wazuh agent status on the Wazuh manager:

      .. code-block:: console

         # /var/ossec/bin/agent_control -l
