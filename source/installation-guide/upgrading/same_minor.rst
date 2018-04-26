.. Copyright (C) 2018 Wazuh, Inc.

.. _upgrading_same_minor:

Upgrade from the same minor version
===================================

Use these instructions if you are upgrading your Wazuh installation within the same minor version. For example, from 2.0.0 to 2.1.1.

Upgrade the Wazuh manager
-------------------------

a) Upgrade the Wazuh server on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-manager

b) Upgrade the Wazuh server on Debian/Ubuntu:

.. code-block:: console

    # apt-get update && sudo apt-get install --only-upgrade wazuh-manager

Upgrade the Wazuh agent
-----------------------

a) Upgrade the Wazuh agent on CentOS/RHEL/Fedora:

.. code-block:: console

    # yum upgrade wazuh-agent

b) Upgrade the Wazuh agent on Debian/Ubuntu:

.. code-block:: console

    # apt-get update && sudo apt-get install --only-upgrade wazuh-agent
