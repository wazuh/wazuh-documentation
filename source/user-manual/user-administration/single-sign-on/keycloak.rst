.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Keycloak is an open source identity and access management tool. Learn more about it and the administrator role in this section of the Wazuh documentation.

Keycloak
========

`Keycloak <https://www.keycloak.org/>`__ is an open source identity and access management tool. It provides user federation, strong authentication, user management, and fine-grained authorization for modern applications and services. In this guide, we integrate the Keycloak IdP to authenticate users into the Wazuh platform.

Learn how to create administrator and read-only roles on Keycloak and map them with Wazuh in the sections below.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Setup Keycloak single sign-on with administrator role
------------------------------------------------------

Follow these steps to integrate Keycloak IdP with Wazuh for single sign-on and grant administrator role to the authenticated Keycloak users on the Wazuh platform:

#. :ref:`configuration_keycloak_admin`
#. :ref:`indexer_configuration_keycloak_admin`
#. :ref:`dashboard_configuration_keycloak_admin`

.. _configuration_keycloak_admin:

Keycloak Configuration
^^^^^^^^^^^^^^^^^^^^^^

#. Create a new realm. Log in to the Keycloak admin console, click on **Manage** **realms** > **Create realm**. Input a name in the **Realm name** field; in our case, this is named ``Wazuh``. Click on **Create** to apply this configuration.

   .. thumbnail:: /images/single-sign-on/keycloak/01-create-a-new-realm.png
      :title: Create a new realm
      :align: center
      :width: 80%

