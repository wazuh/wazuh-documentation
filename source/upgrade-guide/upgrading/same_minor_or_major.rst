.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_same_minor_or_major:

Upgrade from the same minor or major version
============================================

The instructions below are for upgrading the Wazuh installation within the same minor version (for example, 3.9.0 to 3.9.5)
or within the same major version (for example, from 3.8.2 to |WAZUH_LATEST|).

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
