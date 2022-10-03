.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section describes how Wazuh can be integrated with several Identity Providers (IdP) to implement Single Sign-On (SSO). 

.. _single-sign-on:

Single sign-on
==============

This section describes how Wazuh can be integrated with several Identity Providers (IdP) to implement Single Sign-On (SSO).

The guide assumes you already have a Wazuh indexer installation. Instructions to install the Wazuh indexer can be found in our :doc:`documentation </index>`.

Required parameters
-------------------

The following parameters are required to make the configurations on the Wazuh dashboard instance:

- ``idp.metadata_url``: URL to an XML file that contains metadata information about the application configured on the IdP side. It can be used instead of idp.metadata_file.
- ``idp.metadata_file``: XML File that contains the metadata information about the application configured on the IdP side. It can be used instead of idp.metadata_url.
- ``idp.entity_id``: Entity ID of the Identity Provider.
- ``sp.entity_id``: Entity ID of the Service Provider.
- ``kibana_url``: URL to access Wazuh dashboard.
- ``roles_key``: The attribute in the SAML assertion where the roles/groups are sent.
- ``exchange_key``: The key that will be used to sign the assertions. It must have at least 32 characters.
  
 .. note::
    - The group and role names used in this guide can be changed, they do not necessarily have to be the ones we used.
    - OpenSearch and the SAML assertion are case sensitive. Therefore the values on the IDP and in the SAML configuration of the Wazuh indexer have to be exactly the same.
    - It is recommended to clear the browser cache and cookies before the integration is carried out.
    - The ``securityadmin`` script has to be executed with root user privileges
    - Administrator permissions are being assigned in this integration. The :doc:`RBAC guide </user-manual/wazuh-dashboard/rbac>` can be used to configure any other necessary roles based on the user requirements.
    - Each group that is generated in the IDPs can only be used as one  ``backend_role``. In a case where other roles such as ``read-only`` are needed, a new group will have to be created for this purpose.


.. topic:: Identity Providers

    .. toctree::
        :maxdepth: 1

        okta
        
