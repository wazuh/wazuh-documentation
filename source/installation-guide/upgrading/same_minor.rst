.. _upgrading_same_minor:

Upgrade from the same minor version
=====================================

Use these instructions if you are upgrading your Wazuh installation within the same minor version. As an example, from 2.0.0 to 2.0.1.

Upgrade Wazuh manager
---------------------

a) Upgrade Wazuh server on CentOS/RHEL/Fedora:

.. code-block:: bash

    $ sudo yum upgrade wazuh-manager

b) Upgrade Wazuh server on Debian/Ubuntu:

.. code-block:: bash

    $ sudo apt-get update && sudo apt-get install --only-upgrade wazuh-manager

Upgrade Wazuh agent
---------------------

a) Upgrade Wazuh agent on CentOS/RHEL/Fedora:

.. code-block:: bash

    $ sudo yum upgrade wazuh-agent

b) Upgrade Wazuh agent on Debian/Ubuntu:

.. code-block:: bash

    $ sudo apt-get update && sudo apt-get install --only-upgrade wazuh-agent
