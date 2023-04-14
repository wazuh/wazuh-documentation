.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use our preconfigured roles to deploy Wazuh indexer and dashboard components, Wazuh Manager and Wazuh Agents.

Roles
=====

You can use our preconfigured roles to deploy the Wazuh indexer and dashboard components, Wazuh Manager, and Wazuh Agents. First, clone our `GitHub repository <https://github.com/wazuh/wazuh-ansible>`_ directly to your Ansible roles folder:

.. code-block:: console

   # cd /etc/ansible/roles
   # git clone --branch v|WAZUH_CURRENT_ANSIBLE| https://github.com/wazuh/wazuh-ansible.git

Below we briefly explain how to use these roles. Please check out the `Ansible Playbook Documentation <http://docs.ansible.com/ansible/playbooks.html>`_ for more information on Ansible roles.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      wazuh-indexer
      wazuh-dashboard
      wazuh-filebeat
      wazuh-manager
      wazuh-agent
