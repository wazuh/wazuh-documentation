.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/elasticsearch/roles/roles.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/elasticsearch/roles/roles_mapping.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3074_installation_guide_new_structure/resources/open-distro/elasticsearch/roles/internal_users.yml

The commands above add the following Wazuh users in Kibana: 

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_user                          | Is created for those users that only need read access to the Wazuh Kibana plugin.                                                                                                                                                                                                        |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_admin                         | Is the user recommended for those users that need administrative privileges.                                                                                                                                                                                                             |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Two extra roles are added, these roles are in charge of giving the right permissions to the users:

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui_user                       | This role provides ``wazuh_user`` permissions to read the Wazuh’s indices.                                                                                                                                                                                                               | 
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui_admin                      | This role allows ``wazuh_admin`` to perform reading, writing, management and, indexing tasks on the Wazuh indices.                                                                                                                                                                       |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

These users and roles are designed to operate along with the Wazuh Kibana plugin and they are protected so they cannot be modified from the Kibana’s interface. To modify them or add new users or roles, the ``securityadmin`` script has to be run.

.. End of include file
