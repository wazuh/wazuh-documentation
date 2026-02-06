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
   :depth: 2
   :backlinks: none

Installing the Wazuh central components
---------------------------------------

The Wazuh central components include the Wazuh indexer, Wazuh dashboard, and Wazuh manager. You can deploy these components with Ansible using predefined playbooks or roles, depending on your desired architecture.

The following sections explain how to deploy the Wazuh central components based on the deployment option:

.. toctree::
   :maxdepth: 1

   all-in-one-deployment
   install-wazuh-cluster

Installing the Wazuh agent
--------------------------

.. toctree::
   :maxdepth: 1

   install-wazuh-agent
