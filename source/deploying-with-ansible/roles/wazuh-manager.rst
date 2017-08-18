.. _ansible-wazuh-manager:

Wazuh manager
--------------

This role will install and configure Wazuh manager and Wazuh API, there are some variables you can use to customize the installation or configuration:

- **email_notification:** enabling email notifications (default: ``no``).
- **mail_to:** email notifications recipients (array, defaults: ``admin@example.net``)
- **mail_smtp_server:** SMTP server to be used by email notifications ( defaults: ``localhost``)
- **mail_from:** email notification sender ( defaults: ``ossec@example.com``)

Next, create a YAML file ``wazuh-manager.yml`` to be used be Ansible playbook:

.. code-block:: yaml

  - hosts: wazuh-manager
    roles:
      - ansible-wazuh-manager
      - ansible-role-filebeat

You can set variables on separate YAML files, this could give you a way to configuring various environments, for this example we used: ``vars-production.yml``:

.. code-block:: yaml

  - filebeat_output_logstash_hosts: '10.1.1.11:5000'

You can configure **Wazuh API** user credentials, this could be done by setting the file: ``ansible-wazuh-manager/vars/wazuh_api_creds.yml`` file on you Ansible control server, the credentials are in ``htpasswd`` format. :

.. code-block:: yaml

  # Be sure you encrypt this file with ansible-vault
  wazuh_api_user:
  - foo:$apr1$/axqZYWQ$Xo/nz/IG3PdwV82EnfYKh/
  - bar:$apr1$hXE97ag.$8m0koHByattiGKUKPUgcZ1

Also, you can configure **agentless** host credentials using the file: ``ansible-wazuh-manager/vars/agentless_creeds.yml``, set many as you want:

.. code-block:: yaml

  # Be sure you encrypt this file with ansible-vault.
  agentless_creeds:
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

.. warning:: We recommend the use of `Ansible Vault <http://docs.ansible.com/ansible/playbooks_vault.html>`_ to protect Wazuh API and agentless credentials.

Next, run the playbook:

.. code-block:: bash

  $ ansible-playbook wazuh-manager.yml -e@vars-production.yml

The example above will install Wazuh Manager and Filebeat, Filebeat will be configure to forward data to ``10.1.1.11:5000`` as Logstash node.
