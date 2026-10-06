.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh can be integrated with several Identity Providers (IdP) to implement Single Sign-On (SSO). Learn how to setup SSO with administrator role in this section of the Wazuh documentation.

Setup single sign-on with administrator role
============================================

This section describes how Wazuh can be integrated with several IdP to implement Single Sign-On (SSO) with an administrator role.

The guide assumes you already have a Wazuh indexer and a Wazuh dashboard installation. To learn more, see the :doc:`installation guide </installation-guide/index>`.

Required parameters
-------------------

The following parameters are required to make the configurations on the Wazuh dashboard instance:

-  ``idp.metadata_url``: URL to an XML file that contains metadata information about the application configured on the IdP side. It can be used instead of ``idp.metadata_file``.
-  ``idp.metadata_file``: XML File that contains the metadata information about the application configured on the IdP side. It can be used instead of ``idp.metadata_url``.
-  ``idp.entity_id``: Entity ID of the Identity Provider. This is a unique value assigned to an Identity Provider.
-  ``sp.entity_id``: Entity ID of the Service Provider. This is a unique value assigned to a Service Provider.
-  ``kibana_url``: URL to access the Wazuh dashboard.
-  ``roles_key``: The attribute in the SAML assertion where the roles/groups are sent.
-  ``exchange_key``: The key that will be used to sign the assertions. It must have at least 64 characters.

.. note::

   -  The group and role names used in this guide can be changed. They do not necessarily have to be the ones we used.
   -  OpenSearch and the SAML assertion are case sensitive. Therefore the values on the IDP and in the SAML configuration of the Wazuh indexer have to be exactly the same.
   -  It is recommended to clear the browser cache and cookies before the integration is carried out.
   -  The ``securityadmin`` script has to be executed with root user privileges
   -  Administrator permissions are being assigned in this integration. The :doc:`../read-only/index` guide can be used to configure a read-only role based on the user requirements.
   -  Each group that is generated in the IDPs can only be used as one  ``backend_role``. In a case where other roles such as ``read-only`` are needed, a new group will have to be created for this purpose.
   -  You need an account with administrator privileges on the Wazuh dashboard.

Identity providers
------------------

.. toctree::
   :maxdepth: 1

   okta
   microsoft-entra-id
   pingone
   google
   jumpcloud
   onelogin
   keycloak