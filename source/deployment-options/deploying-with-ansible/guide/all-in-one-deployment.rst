.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh indexer, dashboard, and manager on a single endpoint using Ansible.

.. _wazuh_ansible_all_in_one:

All-in-one deployment
=====================

The all-in-one deployment installs the Wazuh indexer, Wazuh dashboard, and Wazuh manager on a single endpoint. You can use predefined playbooks from the Wazuh Ansible repository to deploy these components.

Installing the Wazuh indexer and dashboard
------------------------------------------

Install the Wazuh indexer and dashboard with the playbooks from the Wazuh Ansible repository. Ensure the Ansible control server has SSH access to this endpoint.

Perform the following to deploy the Wazuh indexer and dashboard:

-  `Access the wazuh-ansible directory`_

-  `Prepare the playbook`_

-  `Run the playbook`_

Access the wazuh-ansible directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^

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

   The Wazuh dashboard can be accessed by visiting ``https://<WAZUH_SERVER_IP>``

   The default credentials for Wazuh deployed using Ansible is:

   -  Username: ``admin``
   -  Password: ``changeme``

   Refer to the :doc:`Password management </user-manual/user-administration/password-management>` section to change the default credentials.

Installing the Wazuh manager
----------------------------

Install and configure the Wazuh manager and Filebeat with the roles in the Wazuh Ansible repository. Ensure the Ansible control server has SSH access to the Wazuh manager endpoint.

To install the Wazuh manager, perform the following:

-  `Access the wazuh-ansible directory <#access-the-wazuh-ansible-directory-1>`_

-  `Prepare the playbook <#prepare-the-playbook-1>`_

-  `Run the playbook <#run-the-playbook-1>`_

.. _access-the-wazuh-ansible-directory-1:

Access the wazuh-ansible directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

.. _prepare-the-playbook-1:

Prepare the playbook
^^^^^^^^^^^^^^^^^^^^

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

.. _run-the-playbook-1:

Run the playbook
^^^^^^^^^^^^^^^^

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

   The Wazuh dashboard can be accessed by visiting ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``

   The default credentials for Wazuh deployed using Ansible is:

   -  Username: ``admin``
   -  Password: ``changeme``

   Refer to the :doc:`Password management </user-manual/user-administration/password-management>` section to change the default credentials.
