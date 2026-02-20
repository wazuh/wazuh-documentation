.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use our preconfigured roles to deploy Wazuh indexer and dashboard components, Wazuh manager and Wazuh agents.

Roles
=====

You can use our preconfigured roles to deploy the Wazuh indexer and dashboard components, Wazuh manager, and Wazuh agents. You have to clone the `Wazuh GitHub repository <https://github.com/wazuh/wazuh-ansible>`_ to your Ansible roles folder:

.. code-block:: console

   # cd /etc/ansible/roles
   # sudo git clone --branch v|WAZUH_CURRENT_ANSIBLE| https://github.com/wazuh/wazuh-ansible.git

The following sections explain how to use and customize these roles. For more details about Ansible roles, see the `Ansible community documentation <http://docs.ansible.com/ansible/playbooks.html>`_.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      wazuh-indexer
      wazuh-dashboard
      wazuh-filebeat
      wazuh-manager
      wazuh-agent
