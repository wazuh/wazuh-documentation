.. Copyright (C) 2019 Wazuh, Inc.

.. _upgrading_same_major:

Upgrade from the same major version 
===================================

Use these instructions if you are upgrading your Wazuh installation within the same major version. For example, from 3.8.2 to 3.9.3.

Upgrade the Wazuh manager and Wazuh API
---------------------------------------

a) Upgrade on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-manager wazuh-api

b) Upgrade on Debian/Ubuntu:

.. code-block:: console

    # apt-get update 
    # apt-get install wazuh-manager wazuh-api
    
c) Upgrade on OpenSUSE:

.. code-block:: console

    # zypper update wazuh-manager wazuh-api


Upgrade the Wazuh agent
-----------------------

a) Upgrade the Wazuh agent on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-agent

b) Upgrade the Wazuh agent on Debian/Ubuntu:

.. code-block:: console

    # apt-get update 
    # apt-get install wazuh-agent
    
c) Upgrade the Wazuh agent on OpenSUSE:

.. code-block:: console

    # zypper update wazuh-agent
