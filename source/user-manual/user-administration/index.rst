.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to manage user passwords, create internal users, integrate Wazuh with Identity Providers (IdPs) to implement Single Sign-On (SSO), and configure LDAP integration.

User administration
===================

Learn how to manage user passwords, create internal users, integrate Wazuh with Identity Providers (IdPs) to implement Single Sign-On (SSO), and configure LDAP integration.

In the password management section, you can find instructions on how to use the Wazuh passwords tool to change the passwords of both the Wazuh indexer and the Wazuh server API users.

The RBAC section provides instructions for creating Wazuh indexer users, also known as internal users, assigning them different roles, and mapping them to the Wazuh server API. Find out how to create an admin user, a read-only user, a custom user, and a user with permission to read and manage only a group of agents.

In the single sign-on section, you can find instructions on how to integrate Wazuh with different Identity Providers to implement Single Sign-On. Find instructions for Okta, Microsoft Entra ID, PingOne, Google, Jumpcloud, OneLogin, and Keycloak.

In the Active Directory and LDAP integration section, you can find instructions on how to integrate Wazuh with Active Directory/LDAP to authenticate and authorize users.

.. toctree::
   :maxdepth: 3

   password-management
   rbac
   single-sign-on/index
   ldap

