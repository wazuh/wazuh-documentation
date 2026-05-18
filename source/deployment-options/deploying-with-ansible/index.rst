.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh components using Ansible playbooks and roles.

Deployment with Ansible
=======================

Ansible is an open-source automation platform that deploys and manages infrastructure. It comes with playbooks, a descriptive language based on YAML, that makes it easy to create and describe automation jobs. Also, Ansible communicates with every host over SSH, making it very secure. See `Ansible overview <https://www.ansible.com/how-ansible-works>`_ for more information. You can use Ansible to deploy a Wazuh environment that includes the Wazuh indexer, Wazuh dashboard, Wazuh manager, and Wazuh agents.

.. toctree::
   :maxdepth: 1

   requirements
   deploying-wazuh
   roles/index
   reference