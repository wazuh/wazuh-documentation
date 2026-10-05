.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall each Wazuh central component.

Uninstalling the Wazuh central components
=========================================

Follow these steps to uninstall the Wazuh central components using the Wazuh installation assistant.

#. Download the Wazuh installation assistant:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``-u`` or ``--uninstall`` as follows:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --uninstall

This will remove the Wazuh indexer, the Wazuh manager, and the Wazuh dashboard.

Uninstalling Wazuh components
-----------------------------

Choose from the options below to uninstall a Wazuh component.

-  :ref:`Uninstalling the Wazuh dashboard <uninstall_dashboard>`
-  :ref:`Uninstalling the Wazuh manager <uninstall_server>`
-  :ref:`Uninstalling the Wazuh indexer <uninstall_indexer>`

.. _uninstall_dashboard:

Uninstalling the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the step below to uninstall the Wazuh dashboard using your package manager.

#. Remove the Wazuh dashboard installation:

   .. tabs::

      .. group-tab:: APT

         .. code:: console

            # apt-get remove --purge wazuh-dashboard -y

      .. group-tab:: Yum

         .. code:: console

            # yum remove wazuh-dashboard -y
            # rm -rf /var/lib/wazuh-dashboard/
            # rm -rf /usr/share/wazuh-dashboard/
            # rm -rf /etc/wazuh-dashboard/

      .. group-tab:: DNF

         .. code:: console

            # dnf remove wazuh-dashboard -y
            # rm -rf /var/lib/wazuh-dashboard/
            # rm -rf /usr/share/wazuh-dashboard/
            # rm -rf /etc/wazuh-dashboard/

.. _uninstall_server:

Uninstalling the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to uninstall the Wazuh manager using your package manager.

#. Remove the Wazuh manager installation:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # systemctl disable --now wazuh-manager
            # apt-get remove --purge wazuh-manager -y
            # rm -rf /var/wazuh-manager/

      .. group-tab:: Yum

         .. code-block:: console

            # systemctl disable --now wazuh-manager
            # yum remove wazuh-manager -y
            # rm -rf /var/wazuh-manager/

      .. group-tab:: DNF

         .. code-block:: console

            # systemctl disable --now wazuh-manager
            # dnf remove wazuh-manager -y
            # rm -rf /var/wazuh-manager/

.. _uninstall_indexer:

Uninstalling the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to uninstall the Wazuh indexer using your package manager.

#. Remove the Wazuh indexer installation:

   .. tabs::

      .. group-tab:: APT

         .. code:: console

            # apt-get remove --purge wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload
            # userdel wazuh-indexer

      .. group-tab:: Yum

         .. code:: console

            # yum remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload
            # userdel wazuh-indexer

      .. group-tab:: DNF

         .. code:: console

            # dnf remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload
            # userdel wazuh-indexer

Removing the shared directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh central components share the ``/etc/wazuh/`` directory. While they are installed, ``credentials.env`` holds the generated passwords and ``ca/`` holds the root CA and its private key. Purging a component removes only its own entries, and purging the Wazuh indexer never removes ``credentials.env``, so the directory can remain after the last component is gone.

After you uninstall the last Wazuh central component on a host, remove the directory:

.. code-block:: console

   # rm -rf /etc/wazuh

.. note::

   Don't run this command while a Wazuh central component is still installed on the host. Each component reads this directory every time it starts.
