.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh lets you control who can access the platform and what they can do. Learn how to manage passwords, create internal users with RBAC, enable single sign-on (SSO), and integrate with Active Directory or LDAP.

User administration
===================

Wazuh lets you control who can access the platform and what they can do. This guide covers four areas of user administration: managing passwords, creating internal users with role-based access control (RBAC), enabling single sign-on (SSO) through an identity provider (IdP), and integrating with Active Directory or LDAP.

Password management uses the Wazuh passwords tool to change the passwords of Wazuh indexer users and Wazuh server API users.

RBAC explains how to create Wazuh indexer users, also known as internal users, assign them roles, and map them to the Wazuh server API. You can create an admin user, a read-only user, or a custom user.

Single sign-on connects Wazuh to your existing identity provider so users authenticate once to gain access. This guide includes instructions for Okta, Microsoft Entra ID, PingOne, Google Workspace, JumpCloud, OneLogin, Keycloak, and authentik.

Active Directory and LDAP integration authenticates and authorizes users against your directory service.

.. toctree::
   :maxdepth: 3

   password-management
   rbac
   single-sign-on/index
   ldap
