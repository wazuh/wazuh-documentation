.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: OneLogin is a cloud-based identity and access management provider. Learn more about it and the administrator role in this section of the Wazuh documentation.

OneLogin
========

`OneLogin <https://www.onelogin.com>`__ is a cloud-based identity and access management provider that provides a unified access management platform to enterprise-level businesses and organizations. In this guide, we integrate the OneLogin SSO to authenticate users into the Wazuh platform.

Learn how to create administrator and read-only roles on OneLogin and map them with Wazuh in the sections below.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Setup OneLogin single sign-on with administrator role
-----------------------------------------------------

Follow these steps to integrate OneLogin  IdP with Wazuh for single sign-on and grant administrator role to the authenticated OneLogin users on the Wazuh platform:

#. :ref:`configuration_onelogin_admin`
#. :ref:`indexer_configuration_onelogin_admin`
#. :ref:`dashboard_configuration_onelogin_admin`

.. _configuration_onelogin_admin:

OneLogin Configuration
^^^^^^^^^^^^^^^^^^^^^^

#. Create an account in OneLogin. Request a free trial if you don't have a paid license.
#. Add the OneLogin extension to your browser.
#. Create a new user.

   #. Log in to **OneLogin** web console, and select **Administration** > **Users** > **New User**.

      .. thumbnail:: /images/single-sign-on/onelogin/01-log-in-to-onelogin-web-console.png
         :title: Log in to OneLogin web console
         :align: center
         :width: 80%


.. _indexer_configuration_onelogin_admin:

Wazuh indexer configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^


.. _dashboard_configuration_onelogin_admin:

Wazuh dashboard configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Setup OneLogin single sign-on with read-only role
-------------------------------------------------
