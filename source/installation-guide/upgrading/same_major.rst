.. Copyright (C) 2019 Wazuh, Inc.

.. _upgrading_same_major:

Upgrade from the same major version 
===================================

Use these instructions if you are upgrading your Wazuh installation within the same major version. For example, from 3.8.2 to 3.9.0.

Upgrade the Wazuh manager
-------------------------

a) Upgrade the Wazuh server on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-manager

b) Upgrade the Wazuh server on Debian/Ubuntu:

.. code-block:: console

    # apt-get update 
    # apt-get install wazuh-manager

Upgrade the Wazuh API
---------------------

a) Upgrade the Wazuh API on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-api

b) Upgrade the Wazuh API on Debian/Ubuntu:

.. code-block:: console

    # apt-get update 
    # apt-get install wazuh-api


Upgrade the Wazuh agent
-----------------------

a) Upgrade the Wazuh agent on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-agent

b) Upgrade the Wazuh agent on Debian/Ubuntu:

.. code-block:: console

    # apt-get update 
    # apt-get install wazuh-agent
