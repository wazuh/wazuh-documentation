.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_server:

Upgrading the Wazuh server
==========================

This section describes how to upgrade the Wazuh server, including the Wazuh manager and the Wazuh API, from the Wazuh 3.x to the Wazuh 3.y., which implies upgrading to the latest compatible version of Elastic Stack.

Upgrading the Wazuh manager and the Wazuh API
---------------------------------------------

.. tabs::

  .. group-tab:: YUM

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

    .. code-block:: console

        # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

    Upgrade the Wazuh manager and the Wazuh API to the latest version:

    .. code-block:: console

        # yum upgrade wazuh-manager wazuh-api

  .. group-tab:: APT

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages. This step is not necessary if the packages are set to the ``hold`` state and the repository is enabled:

    .. code-block:: console

      # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

    Upgrade the Wazuh manager and the Wazuh API to the latest version:

    .. code-block:: console

        # apt-get update
        # apt-get install wazuh-manager wazuh-api

  .. group-tab:: ZYpp

    If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo

    Upgrade the Wazuh manager and the Wazuh API to the latest version:

    .. code-block:: console

        # zypper update wazuh-manager wazuh-api


.. note::
  The installation of the updated packages will automatically ``restart the services`` for the Wazuh manager and the Wazuh API. The Wazuh manager's configuration file will be ``unmodified``, so the user will need to manually add the settings for the new capabilities. More information can be found in the :ref:`User manual <user_manual>`.

Next step
---------

The next step consists on :ref:`upgrading the Elastic Stack <upgrading_elastic_stack>`.
