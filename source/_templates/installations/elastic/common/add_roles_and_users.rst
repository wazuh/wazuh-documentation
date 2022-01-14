.. Copyright (C) 2022 Wazuh, Inc.

.. code-block:: console

  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/roles/roles.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/roles/roles_mapping.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://packages.wazuh.com/resources/4.2/open-distro/elasticsearch/roles/internal_users.yml

Wazuh users added in Kibana by running the commands above: 

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_user                          | It is created for users who need read-only access to the Wazuh Kibana plugin.                                                                                                                                                                                                            |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_admin                         | It is recommended for users who need administrative privileges.                                                                                                                                                                                                                          |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Wazuh additional roles added in Kibana to give the appropriate permissions to users:

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui_user                       | It provides ``wazuh_user`` with permissions to read the Wazuh indices.                                                                                                                                                                                                                   | 
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| wazuh_ui_admin                      | It allows ``wazuh_admin`` to perform reading, writing, management, and indexing tasks on the Wazuh indices.                                                                                                                                                                              |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

These users and roles are designed to operate along with the Wazuh Kibana plugin, but they are protected and cannot be modified from the Kibana interface. To modify them or add new users or roles, the ``securityadmin`` script has to be run.

.. End of include file
