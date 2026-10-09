.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh components using Ansible playbooks and roles.

Deployment with Ansible
=======================

Ansible is an open-source automation platform that deploys and manages infrastructure. It comes with playbooks, a descriptive language based on YAML, that makes it easy to create and describe automation jobs. Also, Ansible communicates with hosts using secure communication channels such as SSH or WinRM over HTTPS making it very secure. See `Ansible overview <https://www.redhat.com/en/ansible-collaborative/how-ansible-works>`__ for more information.

This installation guide shows how to use Ansible to deploy a Wazuh environment that includes the Wazuh indexer, Wazuh manager, Wazuh dashboard, and Wazuh agents.

.. toctree::
   :maxdepth: 1

   guide/requirements
   guide/index
   roles/index
   reference