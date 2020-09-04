.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/roles/roles.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/roles/roles_mapping.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/roles/internal_users.yml

The commands above add the following Wazuh Kibana's users:

- ``wazuh_user`` is created for those users that only need read access to the Wazuh Kibana plugin.

- ``wazuh_admin`` is the user recommended for those users that need administrative privileges.

Aside from the extra users, three extra roles are added. These roles are in charge of giving the right permissions to the users:

- ``wazuh_ui`` gives enough privileges to ``kibanaserver`` user to operate with the Wazuh’s indices. This user is one of the Open Distro for Elasticsearch default users and its purpose is to perform tasks such as making cluster-wide searches, indexing monitoring, or writing in indices.

- ``wazuh_ui_user`` provides ``wazuh_user`` permissions to read the Wazuh’s indices.

- ``wazuh_ui_admin`` allows ``wazuh_admin`` to perform reading, writing, management and, indexing tasks on the Wazuh indices.

These users and roles are designed to operate along with the Wazuh Kibana plugin and they are protected so they cannot be modified from the Kibana’s interface. To modify them or add new users or roles, the ``securityadmin`` script has to be run.

.. End of include file
