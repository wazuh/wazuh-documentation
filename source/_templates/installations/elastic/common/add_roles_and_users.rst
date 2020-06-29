.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/roles.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/roles_mapping.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/internal_users.yml

The commands above add the following Wazuh Kibana's users:

- ``wazuh_user`` is created for those users that only need read access to the Wazuh Kibana plugin.

- ``wazuh_admin`` is the user recommended for those users that need administrative privileges.

Apart from the extra users, there are three extra roles added. These roles are in charge of giving the right permissions to the users:

- ``wazuh_ui`` gives enough privileges to ``kibanaserver`` user to operate with the Wazuh’s indexes. This user is one of the Open Distro for Elasticsearch `default users <https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/users-roles/>`_ and its purpose is to perform tasks such as making cluster-wide searches, indexing monitoring or writing in indices.

- ``wazuh_ui_user`` provides ``wazuh_user`` ability to read the Wazuh’s indexes.

- ``wazuh_ui_admin`` allows ``wazuh_admin`` to perform, reading, writing, management and indexing task on the Wazuh indexes.

These users and roles are designed to be used along the Wazuh Kibana plugin and they are protected so they cannot be modified from the Kibana’s interface. To modify them or add new users or roles, the ``securityadmin`` script will have to be executed. To learn more about this process, visit the `Open Distro documentation <https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/users-roles/>`_.

.. End of include file
