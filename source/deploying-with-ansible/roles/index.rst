.. Copyright (C) 2020 Wazuh, Inc.

.. _ansible_wazuh_roles:

Roles
======

You can use these roles to deploy Elastic Stack components, Open Distro for Elasticsearch, Wazuh API, Wazuh Manager and Wazuh Agents, first clone our `GitHub repository <https://github.com/wazuh/wazuh-ansible>`_ directly to your Ansible roles folder:

  .. code-block:: yaml

    $ cd /etc/ansible/roles
    $ git clone https://github.com/wazuh/wazuh-ansible.git .

Below we explain briefly how to use these roles, please check out `Ansible Playbooks <http://docs.ansible.com/ansible/playbooks.html>`_ for more information.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        wazuh-manager
        wazuh-filebeat
        wazuh-filebeat-oss
        wazuh-elasticsearch
        wazuh-opendistro-elasticsearch
        wazuh-opendistro-kibana
        wazuh-kibana
        wazuh-agent
