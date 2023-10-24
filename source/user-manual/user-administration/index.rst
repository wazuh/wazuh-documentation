.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh is a comprehensive open source cybersecurity platform. Check out the user manual to find out how to configure and get the most out of the solution. 


User administration
===================

Learn how to change the user passwords, how to create new internal users and how to integrate Wazuh with different Identity Providers (IdP) to implement Single Sign-On (SSO). 

In the password management section, you can find instructions on how to use the Wazuh passwords tool to change the passwords of both the Wazuh indexer and the Wazuh manager API users. 

The RBAC section contains directions on how to create Wazuh indexer users, also known as internal users, assign them different roles and map them to the Wazuh manager API. Find out how to create an admin user, a read-only user, a custom user, and a user with permission to read and manage only a group of agents. 

In the single sign-on section, you can find instructions on how to integrate Wazuh with different Identity Providers to implement Single Sign-On. Find instructions for Okta, Azure Active Directory, PingOne, Google, Jumpcloud and OneLogin. 

    .. toctree::
        :maxdepth: 2

        password-management
        rbac
        single-sign-on/index
        ldap

