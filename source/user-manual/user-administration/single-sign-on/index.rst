.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh can be integrated with several Identity Providers (IdP) to implement Single Sign-On (SSO). Learn more about it in this section of the Wazuh documentation.

Single Sign-On
==============

Wazuh supports the Security Assertion Markup Language (SAML) standard for Single Sign-On (SSO) in addition to the internal user database used for authentication. This allows organizations to use their existing Identity Providers (IdP) to manage access to the Wazuh platform.

This section describes how Wazuh can be integrated with several IdP to implement Single Sign-On (SSO) with administrator and read-only roles.

The guide assumes you already have a Wazuh indexer and a Wazuh dashboard installation. To learn more, see the :doc:`installation guide </installation-guide/index>`.

Required parameters
-------------------

The following parameters are required in the ``saml_auth_domain`` section of the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file on the Wazuh indexer:

-  ``idp.metadata_url``: URL to an XML file that contains metadata information about the application configured on the IdP side. It can be used instead of ``idp.metadata_file``.
-  ``idp.metadata_file``: XML file that contains the metadata information about the application configured on the IdP side. It can be used instead of ``idp.metadata_url``.
-  ``idp.entity_id``: Entity ID of the Identity Provider. This is a unique value assigned to an Identity Provider.
-  ``sp.entity_id``: Entity ID of the Service Provider. This is a unique value assigned to a Service Provider.
-  ``kibana_url``: URL to access the Wazuh dashboard. The setting keeps the Kibana name that the OpenSearch security plugin uses for it.
-  ``roles_key``: The attribute in the SAML assertion where the roles/groups are sent.
-  ``exchange_key``: The key that the Wazuh indexer uses to sign the token it issues after a successful SAML login. It must have at least 64 characters.

.. note::

   -  The group and role names used in this guide can be changed. They do not necessarily have to be the ones we used.
   -  OpenSearch and the SAML assertion are case-sensitive. The values in the IdP and in the SAML configuration of the Wazuh indexer must match exactly.
   -  It is recommended to clear the browser cache and cookies before the integration is carried out.
   -  The ``securityadmin`` script has to be executed with root privileges.
   -  Each IdP group maps to one backend role. To add another role, such as ``read-only``, create another group for it.
   -  You need an account with administrator privileges on the Wazuh dashboard.
   -  Each domain in the ``authc`` section of ``/etc/wazuh-indexer/opensearch-security/config.yml`` needs its own ``order`` value. The Wazuh indexer keeps one domain for each ``order`` value and ignores the others. If you already set up LDAP authentication with ``order: 1``, use ``order: 2`` in ``saml_auth_domain``.
   -  If two domains use the same ``order`` value, the ``securityadmin`` script still reports success, but single sign-on fails. **Log in with single sign-on** opens a **Single sign-on failed** page that reads ``The identity provider configuration was rejected by the indexer. Contact your administrator.``, and the Wazuh dashboard log shows ``Failed to get saml header`` with ``Authentication finally failed``. Set a different ``order`` value in ``saml_auth_domain`` and run the ``securityadmin`` script again.

      .. thumbnail:: /images/single-sign-on/single-sign-on-failed-page.png
         :title: Single sign-on failed page
         :alt: Single sign-on failed page with the message that the identity provider configuration was rejected by the indexer
         :align: center
         :width: 80%

Identity Providers
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
   authentik