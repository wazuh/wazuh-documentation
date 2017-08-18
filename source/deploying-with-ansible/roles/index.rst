.. _ansible_wazuh_roles:

Roles
======

You can use this roles to deploy Elastic Stack components, Wazuh API, Wazuh Manager and Agents, first clone our `GitHub repository <https://github.com/wazuh/wazuh-ansible>`_ directly to your ansible roles folder: ::

  $ cd /etc/ansible/roles
  $ git clone https://github.com/wazuh/wazuh-ansible.git .

Next we explain briefly how use this roles, please checkout `Ansible Playbooks <http://docs.ansible.com/ansible/playbooks.html>`_ for more information.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        wazuh-manager
        wazuh-filebeat
        wazuh-elasticsearch
        wazuh-kibana
        wazuh-logstash
        wazuh-agent
