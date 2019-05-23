.. Copyright (C) 2019 Wazuh, Inc.

.. _ansible_wazuh_roles:

Roles
======

You can use these roles to deploy Elastic Stack components, Wazuh API, Wazuh Manager and Wazuh Agents, first clone our `GitHub repository <https://github.com/wazuh/wazuh-ansible>`_ directly to your Ansible roles folder:

  .. code-block:: yaml

    $ cd /etc/ansible/roles
    $ git clone https://github.com/wazuh/wazuh-ansible.git .

Below we explain briefly how to use these roles, please check out `Ansible Playbooks <http://docs.ansible.com/ansible/playbooks.html>`_ for more information.

    - :ref:`ansible-wazuh-manager`
    - :ref:`ansible-wazuh-filebeat`
    - :ref:`ansible-wazuh-elasticsearch`
    - :ref:`ansible-wazuh-kibana`
    - :ref:`ansible-wazuh-logstash`
    - :ref:`ansible-wazuh-agent`

.. _ansible-wazuh-manager:

Wazuh Manager
--------------

This role will install and configure Wazuh Manager and Wazuh API, there are several variables you can use to customize the installation or configuration, by example:

- **json_output:** enabling or not JSON output (default: ``yes``)
- **email_notification:** enabling email notifications (default: ``no``)
- **mail_to:** email notifications recipients (array, defaults: ``admin@example.net``)
- **mail_smtp_server:** SMTP server to be used by email notifications ( defaults: ``localhost``)
- **mail_from:** email notification sender ( defaults: ``ossec@example.com``)

By creating a YAML file ``wazuh-manager.yml`` you can specify the usage of this role:

.. code-block:: yaml

  - hosts: wazuh-manager
    roles:
      - ansible-wazuh-manager
      - ansible-role-filebeat

Setting the variables in a separate YAML file is recommended when configuring the installation. For this example we used: ``vars-production.yml``:

.. code-block:: yaml

  filebeat_output_logstash_hosts: '10.1.1.11:5000'

  wazuh_manager_fqdn: "wazuh-server"

  wazuh_manager_config:
    json_output: 'yes'
    alerts_log: 'yes'
    logall: 'no'
    log_format: 'plain'
    connection:
      - type: 'secure'
        port: '1514'
        protocol: 'tcp'
    authd:
      enable: true
      port: 1515
      use_source_ip: 'no'
      force_insert: 'no'
      force_time: 0
      purge: 'no'
      use_password: 'no'
      ssl_agent_ca: null
      ssl_verify_host: 'no'
      ssl_manager_cert: null
      ssl_manager_key: null
      ssl_auto_negotiate: 'no'

You can configure **Wazuh API** user credentials by including them in ``htpasswd`` format in the file ``ansible-wazuh-manager/vars/wazuh_api_creds.yml`` located on your Ansible control server:

.. code-block:: yaml

  # Be sure you encrypt this file with ansible-vault
  wazuh_api_user:
  - foo:$apr1$/axqZYWQ$Xo/nz/IG3PdwV82EnfYKh/
  - bar:$apr1$hXE97ag.$8m0koHByattiGKUKPUgcZ1

Also, you can configure **agentless** host credentials via the file: ``ansible-wazuh-manager/vars/agentless_creds.yml``, set many as you need:

.. code-block:: yaml

  # Be sure you encrypt this file with ansible-vault.
  agentless_creds:
   - type: ssh_integrity_check_linux
     frequency: 3600
     host: root@example1.net
     state: periodic
     arguments: '/bin /etc/ /sbin'
     passwd: qwerty
   - type: ssh_integrity_check_bsd
     frequency: 3600
     host: user@example2.net
     state: periodic
     arguments: '/bin /etc/ /sbin'
     passwd: qwerty

And the ``authd`` service password could be set in the file ``ansible-wazuh-manager/vars/authd_pass.yml``:

.. code-block:: yaml

  # Be sure you encrypt this file with ansible-vault
  authd_pass: foobar

.. warning:: We recommend the use of `Ansible Vault <http://docs.ansible.com/ansible/playbooks_vault.html>`_ to protect Wazuh API and agentless credentials.

Next, run the playbook:

.. code-block:: bash

  $ ansible-playbook wazuh-manager.yml -e@vars-production.yml

The example above will install Wazuh Manager and Filebeat, Filebeat will be configured to forward data to ``10.1.1.11:5000`` as Logstash node, also it will set various ``agentless`` hosts configurations including their credentials, the Wazuh API and the ``authd`` will be configured as well.

Please review the :ref:`references <wazuh_ansible_reference_manager>` section to see all variables available for this role.

.. _ansible-wazuh-filebeat:

Filebeat
--------------

Filebeat can be used in conjunction with Wazuh Manager to send events and alerts to Logstash node, this role will install Filebeat, you can customize the installation with these variables:

- **filebeat_output_logstash_hosts:** define logstash node(s) to be use (default: ``127.0.0.1:5000``).

Please review the :ref:`references <wazuh_ansible_reference_filebeat>` section to see all variables available for this role.

.. _ansible-wazuh-elasticsearch:

Elasticsearch
--------------

This role is intended to deploy Elasticsearch node, you have some variables that can be used to customize the installation:

- **elasticsearch_network_host:** defines listen ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** defines listen port (default: ``9200``).
- **elasticsearch_jvm_xms**: amount of memory for java (default: ``null``).
- **elastic_stack_version**: defines elk version to be installed.

You can create a YAML file ``wazuh-elastic.yml`` to be used by Ansible playbook:

.. code-block:: yaml

  - hosts: elasticsearch
    roles:
    - ansible-role-elasticsearch

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the ansible playbook: ::

  $ ansible-playbook wazuh-elastic.yml -e@vars-production.yml

The example above will install Elasticsearch and set the listen address to: ``10.1.1.10`` using ``vars-production.yml``.

Please review the :ref:`references <wazuh_ansible_reference_elasticsearch>` section to see all variables available for this role.

.. _ansible-wazuh-kibana:

Kibana
--------------

This is similar to the Elasticsearch role and is intended to deploy Kibana with the correct Wazuh APP version, you can customize the installation with the following:

- **elasticsearch_network_host:** defines Elasticsearch node ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** defines Elasticsearch node port (default: ``9200``).
- **kibana_server_host**: defines Kibana listen address (default: ``0.0.0.0``).
- **elastic_stack_version**: defines Kibana version to be installed.

You can create a YAML file ``wazuh-kibana.yml`` to be used be Ansible playbook:

.. code-block:: yaml

  - hosts: kibana
    roles:
      - ansible-role-kibana

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the Ansible playbook: ::

  $ ansible-playbook wazuh-kibana.yml -e@vars-production.yml

The example above will install Kibana and configure to use ``10.1.1.10`` as Elasticsearch node.

Please review the :ref:`references <wazuh_ansible_reference_kibana>` section to see all variables available for this role.

.. _ansible-wazuh-logstash:

Logstash
--------------

This role will install and configure Logstash with Wazuh templates on the hosts you selected, you can customize the installation with this vars:

- **elasticsearch_network_host:** defines Elasticsearch node ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** defines Elasticsearch node port (default: ``9200``).
- **elastic_stack_version**: defines Logstash version to be installed.
- **logstash_input_beats**: defines the use of File input or Filebeat input. (default: ``false``)

Create a YAML file ``wazuh-logstash.yml`` to be used by Ansible playbook:

.. code-block:: yaml

    - hosts: logstash
      roles:
        - ansible-role-logstash

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'
    logstash_input_beats: true

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '127.0.0.1'
    logstash_input_beats: false

Next, run the Ansible playbook:

.. code-block:: console

  $ ansible-playbook wazuh-logstash.yml -e@vars-production.yml

The example above will install Logstash and configure to use ``10.1.1.10`` as Elasticsearch node enabling the Filebeat input.

Please review the :ref:`references <wazuh_ansible_reference_logstash>` section to see all variables available for this role.

.. _ansible-wazuh-agent:

Wazuh Agent
--------------

This role is designed to install and configure Wazuh Agent on different hosts, this agent is compatible with Linux and Windows machines. Also, has the ability to register the agent using the ``ossec-authd`` service on the Wazuh Manager, you can use several variables to customize the installation:

- **wazuh_manager_ip:** set Wazuh server to connect.
- **wazuh_agent_authd:** array with a set of options to register the Wazuh agent on the Wazuh server, will require the ``ossec-authd`` service started on the Wazuh server.

By example, create a YAML file ``wazuh-agent.yml`` to be used be Ansible playbook:

.. code-block:: yaml

    - hosts: all:!wazuh-manager
      roles:
       - ansible-wazuh-agent

You can maintain different environments using a variable definition YAML file for each one:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    wazuh_managers:
      - address: 10.1.1.12
        port: 1514
        protocol: udp
    wazuh_agent_authd:
      enable: true
      port: 1515
      ssl_agent_ca: null
      ssl_auto_negotiate: 'no'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    wazuh_managers:
      - address: 192.168.0.10
        port: 1514
        protocol: udp
    wazuh_agent_authd:
      enable: true
      port: 1515
      ssl_agent_ca: null
      ssl_auto_negotiate: 'no'

Next, run the ansible playbook:

.. code-block:: console

  $ ansible-playbook wazuh-agent.yml -e@vars-production.yml

The example above for production environment will install Wazuh agent in all host except ``wazuh-manager``. then it will register against ``wazuh-manager`` with ip ``10.1.1.12``.

Please review the :ref:`references <wazuh_ansible_reference_agent>` section to see all variables available for this role.
