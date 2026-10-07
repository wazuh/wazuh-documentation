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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Change to the directory where you cloned the Wazuh Ansible repository and list available roles:

   .. code-block:: console

      # cd /etc/ansible/roles/wazuh-ansible/
      # tree roles -d

   The command output looks similar to this:

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
      ├── wazuh-credentials
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

#. Run the command below to see the preconfigured playbooks:

   .. code-block:: console

      # ls

   The command output looks similar to this:

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
   :emphasize-lines: 2,5,7

   [aio]
   aio_node ansible_host=<AIO_PUBLIC_IP> private_ip=<AIO_PRIVATE_IP>

   [aio:vars]
   ansible_user=<USERNAME>
   ansible_ssh_common_args='-o StrictHostKeyChecking=no'
   ansible_ssh_private_key_file=<PATH_TO_PRIVATE_KEY_FILE>

Where:

-  ``ansible_host`` specifies the public IP address or hostname Ansible uses to connect to the all-in-one node. Replace ``<AIO_PUBLIC_IP>`` with the actual public IP address or hostname of the endpoint that hosts the Wazuh central components.
-  ``private_ip`` specifies the private IP address used for internal communication between the Wazuh components deployed on the AIO node. Replace ``<AIO_PRIVATE_IP>`` with the actual private IP address assigned to the endpoint.
-  If the environment is located in a local subnet, ``ansible_host`` and ``private_ip`` variables should match.
-  ``ansible_user`` specifies the remote user account Ansible uses to connect over SSH. Replace ``<USERNAME>`` with a valid user account that has the required privileges on the endpoints.
-  ``ansible_ssh_private_key_file`` specifies the SSH private key used by Ansible to connect to the target hosts. Replace ``<PATH_TO_PRIVATE_KEY_FILE>`` with the full path of the private key file on the Ansible control node.

Run the playbook
~~~~~~~~~~~~~~~~

#. Run the command below from the playbook directory on the Ansible server:

   .. code-block:: console

      # ansible-playbook wazuh-aio.yml -e "source=prerelease" -K

#. Run the following commands on the all-in-one node to check the status of the Wazuh indexer, Wazuh dashboard, and Wazuh manager services.

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

      Access the Wazuh dashboard at ``https://<AIO_PUBLIC_IP>`` and log in as ``admin``. The playbook generates a random password for this user during the first run and does not use a default password.

      Run the following command on the Ansible control node to read it:

      .. code-block:: console

         # cat /etc/ansible/roles/wazuh-ansible/deployment-credentials/WAZUH_INDEXER_ADMIN_PASSWORD; echo

      Refer to the :ref:`ansible_managing_passwords` section for other generated passwords and how to change them.

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

Change to the directory where you cloned the Wazuh Ansible repository and list available roles:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # tree roles -d

The command output looks similar to this:

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
   ├── wazuh-credentials
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

The command output looks similar to this:

.. code-block:: none
   :class: output

   CHANGELOG.md  docs  LICENSE  README.md  requirements.yml  roles  SECURITY.md  tools  VERSION.json  wazuh-agent.yml  wazuh-aio.yml  wazuh-distributed.yml

Using the ``wazuh-distributed.yml`` playbook, we deploy a Wazuh manager and indexer cluster using Ansible. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/wazuh-distributed.yml`` file:

.. code-block:: console

   # cat wazuh-distributed.yml

The command output looks similar to this:

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
           name: indexer
           ip: "{{ hostvars.wi1.private_ip }}"
           role: indexer
         wi2:
           name: indexer-2
           ip: "{{ hostvars.wi2.private_ip }}"
           role: indexer
         wi3:
           name: indexer-3
           ip: "{{ hostvars.wi3.private_ip }}"
           role: indexer
         manager:
           name: manager
           ip: "{{ hostvars.manager.private_ip }}"
           role: manager
           node_type: master
           # extra_ips: ["<manager-public-ip>"]  # optional, unique to this node
         worker:
           name: manager-2
           ip: "{{ hostvars.worker.private_ip }}"
           role: manager
           node_type: worker
           # extra_ips: ["<worker-public-ip>"]   # optional, unique to this node
         dashboard:
           name: dashboard
           ip: "{{ hostvars.dashboard.private_ip }}"
           role: dashboard

   - name: Configure Wazuh Manager
     hosts: manager
     roles:
       - role: wazuh-manager
     become: true
     vars:
       node_type: "master"
       manager_node_name: "manager"
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
       manager_node_name: "manager-2"
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
       dashboard_node_name: "dashboard"
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
   :emphasize-lines: 2-7,15,17

   [all]
   wi1 ansible_host=<WI1_PUBLIC_IP> private_ip=<WI1_PRIVATE_IP>
   wi2 ansible_host=<WI2_PUBLIC_IP> private_ip=<WI2_PRIVATE_IP>
   wi3 ansible_host=<WI3_PUBLIC_IP> private_ip=<WI3_PRIVATE_IP>
   manager ansible_host=<MANAGER_NODE_PUBLIC_IP> private_ip=<MANAGER_PRIVATE_IP>
   worker  ansible_host=<WORKER_NODE_PUBLIC_IP> private_ip=<WORKER_PRIVATE_IP>
   dashboard  ansible_host=<DASHBOARD_NODE_PUBLIC_IP> private_ip=<DASHBOARD_PRIVATE_IP>

   [wi_cluster]
   wi1
   wi2
   wi3

   [all:vars]
   ansible_user=<USERNAME>
   ansible_ssh_common_args='-o StrictHostKeyChecking=no'
   ansible_ssh_private_key_file=<PATH_TO_PRIVATE_KEY_FILE>

Where:

-  ``ansible_host`` specifies the public IP address or hostname Ansible uses to connect to the target node. Replace ``<WI1_PUBLIC_IP>``, ``<WI2_PUBLIC_IP>``, ``<WI3_PUBLIC_IP>``, ``<MANAGER_NODE_PUBLIC_IP>``, ``<WORKER_NODE_PUBLIC_IP>``, and ``<DASHBOARD_NODE_PUBLIC_IP>`` with the actual public IP addresses or hostnames of the Wazuh indexer, manager, worker, and dashboard nodes.
-  ``private_ip`` variable contains the private IP address used for the internal cluster communication. Replace ``<WI1_PRIVATE_IP>``, ``<WI2_PRIVATE_IP>``, ``<WI3_PRIVATE_IP>``, ``<MANAGER_PRIVATE_IP>``, ``<WORKER_PRIVATE_IP>``, and ``<DASHBOARD_PRIVATE_IP>`` with the actual private IP addresses assigned to the endpoints.
-  If the environment is within a local subnet, ``ansible_host`` and ``private_ip`` variables should match.
-  ``ansible_ssh_private_key_file`` specifies the SSH private key used by Ansible to connect to the target hosts. Replace ``<PATH_TO_PRIVATE_KEY_FILE>`` with the full path of the private key file on the Ansible control node.
-  ``ansible_user`` variable specifies the SSH user for the nodes when it's the same. Replace ``<USERNAME>`` with a valid user account that has the required privileges on the endpoints. Specify this variable for each ``ansible_host`` if the SSH users are different. For example:

   .. code-block:: ini

      wi1 ansible_host=<WI1_PUBLIC_IP> private_ip=<WI1_PRIVATE_IP> ansible_user=ubuntu
      wi2 ansible_host=<WI2_PUBLIC_IP> private_ip=<WI2_PRIVATE_IP> ansible_user=admin

Keep the host names ``wi1``, ``wi2``, ``wi3``, ``manager``, ``worker``, and ``dashboard``. The ``wazuh-distributed.yml`` playbook refers to each node by these names, and the Wazuh manager role reads the master node address from the host named ``manager``.

Run the playbook
~~~~~~~~~~~~~~~~

#. Run the command below from the playbook directory on the Ansible server:

   .. code-block:: console

      # ansible-playbook wazuh-distributed.yml -e "source=prerelease" -K

#. Check the status of each service on the nodes that run it.

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

      Access the Wazuh dashboard at ``https://<DASHBOARD_NODE_PUBLIC_IP>`` and log in as ``admin``. The playbook generates a random password for this user during the first run and does not use a default password.

      Run the following command on the Ansible control node to read it. Replace ``<CLONE_DIRECTORY>`` with the directory of the clone you ran ``wazuh-distributed.yml`` from, for example ``/etc/ansible/roles/wazuh-ansible``:

      .. code-block:: console

         # cat <CLONE_DIRECTORY>/deployment-credentials/WAZUH_INDEXER_ADMIN_PASSWORD; echo

      Refer to the :ref:`ansible_managing_passwords` section for other generated passwords and how to change them.

.. _ansible_managing_passwords:

Managing the Wazuh passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh Ansible playbooks do not use default passwords. During the first run, the playbook generates a random password for each Wazuh user on the Ansible control node. The passwords are each stored in its own file in the ``/etc/ansible/roles/wazuh-ansible/deployment-credentials`` directory.


+-----------------------------------------+-------------------+-------------------------------------------------------------+
| File                                    | User              | Description                                                 |
+=========================================+===================+=============================================================+
| ``WAZUH_INDEXER_ADMIN_PASSWORD``        | ``admin``         | Wazuh dashboard login and Wazuh indexer API administration  |
+-----------------------------------------+-------------------+-------------------------------------------------------------+
| ``WAZUH_INDEXER_KIBANASERVER_PASSWORD`` | ``kibanaserver``  | Connection from the Wazuh dashboard to the Wazuh indexer    |
+-----------------------------------------+-------------------+-------------------------------------------------------------+
| ``WAZUH_INDEXER_MANAGER_PASSWORD``      | ``wazuh-manager`` | Wazuh indexer connector on the Wazuh manager                |
+-----------------------------------------+-------------------+-------------------------------------------------------------+
| ``WAZUH_MANAGER_API_PASSWORD``          | ``wazuh``         | Wazuh server API                                            |
+-----------------------------------------+-------------------+-------------------------------------------------------------+
| ``WAZUH_MANAGER_WUI_PASSWORD``          | ``wazuh-wui``     | Connection from the Wazuh dashboard to the Wazuh server API |
+-----------------------------------------+-------------------+-------------------------------------------------------------+

To use your own passwords instead of generated ones, set the ``wazuh_credentials_overrides`` variable on the first run. The playbook uses a supplied password only for a key that has no file in ``deployment-credentials`` yet. For example, store the passwords in a file encrypted with Ansible Vault:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # ansible-vault create credentials-overrides.yml

Add the keys you want to set, then save the file. The playbook generates a password for every key you leave out:

.. code-block:: yaml
   :emphasize-lines: 2,3

   wazuh_credentials_overrides:
     WAZUH_INDEXER_ADMIN_PASSWORD: "<ADMIN_PASSWORD>"
     WAZUH_MANAGER_API_PASSWORD: "<API_PASSWORD>"

Each password must have 12 to 64 characters from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``. It must include at least one uppercase letter, one lowercase letter, one digit, and one of those symbols. Pass the file on the first run, for example:

.. code-block:: console

   # ansible-playbook wazuh-aio.yml -e "source=prerelease" -e @credentials-overrides.yml --ask-vault-pass -K

The playbook does not change passwords. After you change a password with the Wazuh passwords tool, write the new value to the file of its key on the Ansible control node. Later runs of the playbook use ``admin`` and ``wazuh`` users to check the Wazuh indexer and Wazuh server API, and stop if either password is rejected. If the tool generated the new password, read it from the ``# >>> wazuh generated`` block of ``/etc/wazuh/credentials.env`` on the host where you ran the tool. The same key also appears earlier in the file with its old value. For example, after you change the ``admin`` password, run:

.. code-block:: console

   # printf '%s' '<NEW_ADMIN_PASSWORD>' > /etc/ansible/roles/wazuh-ansible/deployment-credentials/WAZUH_INDEXER_ADMIN_PASSWORD

Then remove ``/etc/wazuh/credentials.env`` from the host where you ran the tool. The files in ``deployment-credentials`` hold the passwords in plain text, it is important to restrict access to them. To read a password, open the corresponding file for the Wazuh user. For example, run the following command to read the password of the ``wazuh`` user:

.. code-block:: console

   # cat /etc/ansible/roles/wazuh-ansible/deployment-credentials/WAZUH_MANAGER_API_PASSWORD; echo

.. note::

   Later runs of the playbook from the same directory reuse these passwords. If you delete the ``/etc/ansible/roles/wazuh-ansible/deployment-credentials`` directory or run the playbook from another directory, the playbook stops with an error. To recover, replace the ``deployment-credentials`` directory with your backup, and run the playbook from the directory of the clone that installed the deployment.

   The playbook writes the passwords of each component to ``/etc/wazuh/credentials.env`` on its host before it installs the package. The packages read the file only during installation, and later runs of the playbook do not need it. After you back up ``deployment-credentials``, remove the file from the Wazuh central component hosts. Run the following command on the Ansible control node:

   .. code-block:: console

      # ansible <HOSTS> -b -K -m ansible.builtin.file -a "path=/etc/wazuh/credentials.env state=absent"

   Replace ``<HOSTS>`` with ``aio`` for the all-in-one deployment, or with ``wi_cluster:manager:worker:dashboard`` for the Wazuh cluster deployment.

The playbook also generates the root CA and the certificates of the deployment on the Ansible control node during the first run. It keeps the certificates in ``/etc/ansible/roles/wazuh-ansible/deployment-config-files/wazuh-certificates``. It keeps the root CA and its private key in a directory under ``/var/lib/wazuh-ansible/``, which it prints on every run. Back up both directories.

Each clone of the Wazuh Ansible repository holds one deployment. To deploy another environment, clone the repository into another directory and run the playbook from there. The passwords of that deployment are in the ``deployment-credentials`` directory of that clone, so read them there, not in ``/etc/ansible/roles/wazuh-ansible/``.

To change the passwords, see :doc:`Password management </user-manual/user-administration/password-management>`.

Installing the Wazuh agent
--------------------------

The ``wazuh-agent`` role installs Wazuh agents on Linux, Windows, and macOS endpoints and enrolls them in the Wazuh manager using an enrollment token. The Ansible control server requires SSH access to Linux and macOS endpoints and WinRM access to Windows endpoints.

To install the Wazuh agent, perform the following:

-  :ref:`Check the prerequisites <ansible_agent_prereqs>`
-  :ref:`Generate an enrollment token <ansible_agent_token>`
-  :ref:`Access the wazuh-ansible directory <ansible_agent_access>`
-  :ref:`Prepare the playbook <ansible_agent_prepare>`
-  :ref:`Run the playbook <ansible_agent_run>`

.. _ansible_agent_prereqs:

Prerequisites
^^^^^^^^^^^^^

Before deploying Wazuh agents with Ansible, check that the ``ansible.windows`` collection is installed on the Ansible control node. The ``wazuh-agent`` role uses it for Windows endpoints. The ``ansible-galaxy install -r requirements.yml`` command in :doc:`Deploying Wazuh <index>` installs it with the other required collections. Run the following command to confirm:

.. code-block:: console

   # ansible-galaxy collection list ansible.windows

.. note::

   SSH key pairing is configured between the Ansible control node and the Linux and macOS endpoints. WinRM over HTTPS is configured on the Windows endpoints, and the ``pywinrm`` Python package is installed on the Ansible control node.

   Add the endpoints to the ``[agents]`` group of the ``/etc/ansible/hosts`` file, as shown in :ref:`Prepare the playbook <ansible_agent_prepare>`.

.. _ansible_agent_token:

Generate an enrollment token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following command on the Wazuh manager to generate an enrollment token. In a Wazuh cluster, run it on the master node, because worker nodes do not create tokens. Replace ``<WAZUH_MANAGER_ADDRESS>`` with the IP address or FQDN that the agents use to reach the Wazuh manager.

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS>

.. note::

   The Wazuh manager creates tokens only for addresses in the certificate it presents to agents. By default, the playbooks add only the ``private_ip`` value and the node name of each Wazuh manager node, for example ``manager``. To use another address, such as a public IP address, an FQDN, or a load balancer, add it before you deploy the central components. For an all-in-one deployment, use ``wazuh_manager_ips``. In a cluster, use ``extra_ips`` on the node's entry in ``instances``, or ``agent_san`` for an address every node shares. Set ``agent_san`` as a list in the ``vars`` of the Configure Wazuh Indexer cluster play in ``wazuh-distributed.yml``, next to ``instances``. For any other address, the command fails with ``address not in certificate SAN``.

The command output looks similar to this:

.. code-block:: none
   :class: output

   <ENROLLMENT_TOKEN>
   id: <TOKEN_ID>
   endpoint: <WAZUH_MANAGER_ADDRESS>
   expires: <TOKEN_EXPIRY_TIMESTAMP>
   pin: <CA_PIN>
   credential: yes

Copy the first line, ``<ENROLLMENT_TOKEN>``. The token is valid for 30 days and can be used to enroll several agents until it expires.

Store the token with Ansible Vault on the Ansible control node. Replace ``<ENROLLMENT_TOKEN>`` with the token you copied. The commands save it, encrypted, in ``group_vars/agents/vault.yml`` next to the playbook, and Ansible loads it for the ``agents`` group:

.. code-block:: console
   :emphasize-lines: 3

   # cd /etc/ansible/roles/wazuh-ansible/
   # mkdir -p group_vars/agents
   # ansible-vault encrypt_string '<ENROLLMENT_TOKEN>' --name 'vault_wazuh_enrollment_token' >> group_vars/agents/vault.yml

.. note::

   ``ansible-vault`` prompts for a new vault password. You need the same password when you run the agent playbook. To avoid prompts, use ``--vault-password-file <FILE>`` instead of ``--ask-vault-pass``.

.. _ansible_agent_access:

Access the wazuh-ansible directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Change to the directory where you cloned the Wazuh Ansible repository:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # tree roles -d

The command output looks similar to this:

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
   ├── wazuh-credentials
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

The output also lists the ``group_vars`` directory, which you created when you stored the enrollment token. If you deployed the Wazuh central components from this clone, it also lists ``deployment-config-files`` and ``deployment-credentials``.

The command output looks similar to this:

.. code-block:: none
   :class: output

   CHANGELOG.md  LICENSE  README.md  SECURITY.md  VERSION.json  docs  requirements.yml  roles  tools  wazuh-agent.yml  wazuh-aio.yml  wazuh-distributed.yml

The ``/etc/ansible/roles/wazuh-ansible/wazuh-agent.yml`` file contains the necessary commands to install a Wazuh agent and register it to the Wazuh manager. Below is an excerpt of the ``/etc/ansible/roles/wazuh-ansible/wazuh-agent.yml`` file:

.. code-block:: yaml

   ---

   - name: Deploy Wazuh agent(s)
     hosts: agents
     strategy: free
     vars:
       wazuh_enrollment_token: "<Your Wazuh Agent Enrollment Token>"
       # Verification posture: full (CA + hostname), certificate (CA only), system
       # (OS trust store) or none. Empty leaves it unset.
       wazuh_ssl_verification: ""
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

-  ``hosts:`` specifies the Ansible inventory group that contains the endpoints where the Wazuh agent will be installed. The playbook targets the ``agents`` group, so the inventory uses the same group name.
-  ``wazuh_enrollment_token``: is the enrollment token generated on the Wazuh manager. The role passes it to the agent installer as ``WAZUH_ENROLLMENT_TOKEN``.
-  ``roles:`` runs the ``package-urls`` role, which downloads the list of Wazuh package URLs that the ``wazuh-agent`` role uses.
-  ``tasks:`` includes the ``wazuh-agent`` role on Linux, macOS, and Windows hosts. On Linux and macOS hosts, the role runs with root privileges.

.. _ansible_agent_prepare:

Prepare the playbook
^^^^^^^^^^^^^^^^^^^^

Replace the value of ``wazuh_enrollment_token`` in the ``/etc/ansible/roles/wazuh-ansible/wazuh-agent.yml`` file with the variable of the vaulted token:

.. code-block:: yaml

   ---

   - name: Deploy Wazuh agent(s)
     hosts: agents
     strategy: free
     vars:
       wazuh_enrollment_token: "{{ vault_wazuh_enrollment_token }}"
       # Verification posture: full (CA + hostname), certificate (CA only), system
       # (OS trust store) or none. Empty leaves it unset.
       wazuh_ssl_verification: ""
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

Add the endpoints where the Wazuh agent will be installed to the ``agents`` group of the ``/etc/ansible/hosts`` Ansible hosts file.

The contents of the Ansible host file below:

.. code-block:: ini
   :emphasize-lines: 2,3,6,8

   [agents]
   agent1 ansible_host=<WAZUH_AGENT1_IP>
   agent2 ansible_host=<WAZUH_AGENT2_IP>

   [agents:vars]
   ansible_user=<USERNAME>
   ansible_ssh_common_args='-o StrictHostKeyChecking=no'
   ansible_ssh_private_key_file=<PATH_TO_PRIVATE_KEY_FILE>

Where:

-  ``ansible_host`` specifies the IP address of the endpoint where the Wazuh agent will be installed. Replace ``<WAZUH_AGENT1_IP>`` and ``<WAZUH_AGENT2_IP>`` with the actual IP addresses or hostnames of the Wazuh agent endpoints.
-  ``ansible_user`` specifies the remote user account Ansible uses to connect over SSH. Replace ``<USERNAME>`` with a valid user account that has the required privileges on the endpoints.
-  ``ansible_ssh_private_key_file`` specifies the SSH private key used by Ansible to connect to the target hosts. Replace ``<PATH_TO_PRIVATE_KEY_FILE>`` with the full path of the private key file on the Ansible control node.

To install Windows agents, add the following configuration to the ``[agents]`` section in the ``/etc/ansible/hosts`` Ansible hosts file:

.. code-block:: ini

   windows_agent ansible_host=<WINDOWS_AGENT_IP>  ansible_connection=winrm  ansible_port=5986  ansible_winrm_transport=ntlm  ansible_user=<WINDOWS_USERNAME>  ansible_password=<WINDOWS_PASSWORD> ansible_winrm_server_cert_validation=ignore

Where:

-  ``ansible_host`` specifies the IP address of the endpoint where the Wazuh agent will be installed. Replace ``<WINDOWS_AGENT_IP>`` with the IP address or hostname of the Windows endpoint.
-  ``ansible_user`` specifies the username of an administrator account on the endpoint.
-  ``ansible_password`` specifies the password of an administrator account on the endpoint.
-  ``ansible_connection=winrm`` and ``ansible_port=5986`` make Ansible connect to a Windows endpoint over WinRM HTTPS. ``ansible_winrm_transport=ntlm`` makes Ansible sign in with NTLM. Without it, Ansible uses Basic authentication, which WinRM on Windows turns off by default. ``ansible_winrm_server_cert_validation=ignore`` skips the check of the WinRM certificate. Remove it if a CA that the control node trusts signed the certificate.

.. warning::

   Users on the control node can read the ``/etc/ansible/hosts`` file. Ensure the file is adequately protected as the password will be stored in plaintext. Alternatively, store the password with Ansible Vault:

   .. code-block:: console
      :emphasize-lines: 2

      # cd /etc/ansible/roles/wazuh-ansible/
      # ansible-vault encrypt_string '<WINDOWS_PASSWORD>' --name 'vault_wazuh_agent_windows_password' >> group_vars/agents/vault.yml

   Replace ``ansible_password=<WINDOWS_PASSWORD>`` with ``ansible_password="{{ vault_wazuh_agent_windows_password }}"`` in the ``/etc/ansible/hosts`` file.

   After you vault the password, run ``ansible`` commands that reach the Windows endpoint from ``/etc/ansible/roles/wazuh-ansible/``, and add ``--ask-vault-pass``. For example, run ``ansible windows_agent -m win_ping --ask-vault-pass``, where ``windows_agent`` is the name of the Windows endpoint in the ``/etc/ansible/hosts`` file.

.. _ansible_agent_run:

Run the playbook
^^^^^^^^^^^^^^^^

#. Run the command below from the playbook directory on the Ansible server:

   .. code-block:: console

      # ansible-playbook wazuh-agent.yml -e "source=prerelease" --ask-vault-pass -K

   .. note::

      The playbook passes ``wazuh_enrollment_token`` and ``wazuh_ssl_verification`` to the Wazuh agent installer only when it installs the agent. On an endpoint where the Wazuh agent is already installed, a new run skips the installation and applies neither value. If an agent did not enroll, for example because its token expired, the run fails at the Start and enable Wazuh Agent service task. Remove the Wazuh agent from the endpoint and run the playbook again.

#. Check the status of the Wazuh agent:

   -  Wazuh agent status on the endpoint

      +------------------------------------+-----------------------------------------------+----------------------------------+
      | Linux                              | MacOS                                         | Windows                          |
      +====================================+===============================================+==================================+
      | ``# systemctl status wazuh-agent`` | ``# /Library/Ossec/bin/wazuh-control status`` | ``> Get-Service -Name WazuhSVC`` |
      +------------------------------------+-----------------------------------------------+----------------------------------+

#. Navigate to **Agents management** > **Summary** on the Wazuh dashboard to confirm the agent is enrolled.
