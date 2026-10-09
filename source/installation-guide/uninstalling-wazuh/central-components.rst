.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall each Wazuh central component.

Uninstalling the Wazuh central components
=========================================

Uninstalling deletes the components' data and configuration, including indexed alerts and certificates, and asks no confirmation. It can also delete the root CA private key in ``/etc/wazuh/ca``, which you need to add nodes or renew certificates. Back up anything you want to keep first, ``/etc/wazuh/ca`` included.

You can remove the Wazuh central components in two ways. Use only one. The installation assistant removes every Wazuh central component on the host at once. The package manager removes one component at a time, as described in :ref:`Uninstall one component with the package manager <uninstall_one_component>`.

Uninstall all central components with the installation assistant
----------------------------------------------------------------

Follow these steps to uninstall the Wazuh central components with the installation assistant. Back up ``/etc/wazuh/ca`` first, as described at the start of this section.

#. If you no longer have the Wazuh installation assistant script, download it:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``-u`` or ``--uninstall`` as follows:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --uninstall

   This removes the Wazuh indexer, the Wazuh manager, and the Wazuh dashboard packages that are installed on the host, and their data. It leaves the ``wazuh-indexer`` user and group on every host that had the Wazuh indexer.

#. On every host that had the Wazuh indexer, remove its user and the Java performance data directory it leaves in ``/tmp``:

   .. code-block:: console

      # userdel wazuh-indexer
      # rm -rf /tmp/hsperfdata_wazuh-indexer

#. On a host with the Wazuh indexer and without the Wazuh dashboard, ``/etc/wazuh`` also remains. It can hold ``credentials.env`` and, on the host where you created the certificates (the first Wazuh indexer node, or the host where you ran ``--generate-config-files``), the root CA private key in ``ca/``. Once you have the backup described at the start of this section, remove the directory:

   .. code-block:: console

      # rm -rf /etc/wazuh

#. Confirm the removal:

   .. tabs::

      .. group-tab:: RPM-based systems

         .. code-block:: console

            # rpm -qa 'wazuh-*'

      .. group-tab:: Debian-based systems

         .. code-block:: console

            # dpkg -l 'wazuh-*'

   No Wazuh central component package is listed.

#. The ``wazuh-install-files.tar`` holds the passwords and every node's private key. Remove it along with ``/var/log/wazuh-install.log``, the assistant script, and the other generated files in your working directory:

   .. code-block:: console

      # rm -rf /var/log/wazuh-install.log ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh ./artifact_urls_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yaml ./wazuh-install-files.tar ./wazuh-install-packages

If you installed the components step by step, also remove the Wazuh repository as described in :ref:`Removing the Wazuh repository <uninstall_wazuh_repository>`.

.. _uninstall_one_component:

Uninstall one component with the package manager
------------------------------------------------

Remove the components in any order. Removing the last Wazuh central component on a host can delete the root CA private key in ``/etc/wazuh/ca``, which you need to add nodes or renew certificates. On the host that holds ``/etc/wazuh/ca/root-ca.key``, copy the directory to a safe place before you start:

.. code-block:: console

   # cp -a /etc/wazuh/ca <BACKUP_DIRECTORY>/

Replace ``<BACKUP_DIRECTORY>`` with a directory outside ``/etc/wazuh``, preferably on another host.

-  :ref:`Uninstalling the Wazuh dashboard <uninstall_dashboard>`
-  :ref:`Uninstalling the Wazuh manager <uninstall_server>`
-  :ref:`Uninstalling the Wazuh indexer <uninstall_indexer>`
-  :ref:`Removing the shared directory <uninstall_shared_directory>`
-  :ref:`Removing the Wazuh repository <uninstall_wazuh_repository>`

.. _uninstall_dashboard:

Uninstalling the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands to uninstall the Wazuh dashboard:

#. Remove the Wazuh dashboard installation:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # systemctl disable --now wazuh-dashboard
            # apt-get remove --purge wazuh-dashboard -y

      .. group-tab:: Yum

         .. code-block:: console

            # systemctl disable --now wazuh-dashboard
            # yum remove wazuh-dashboard -y
            # rm -rf /var/lib/wazuh-dashboard/
            # rm -rf /usr/share/wazuh-dashboard/
            # rm -rf /etc/wazuh-dashboard/

      .. group-tab:: DNF

         .. code-block:: console

            # systemctl disable --now wazuh-dashboard
            # dnf remove wazuh-dashboard -y
            # rm -rf /var/lib/wazuh-dashboard/
            # rm -rf /usr/share/wazuh-dashboard/
            # rm -rf /etc/wazuh-dashboard/

.. _uninstall_server:

Uninstalling the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands to uninstall the Wazuh manager:

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

Run the following commands to uninstall the Wazuh indexer:

#. Remove the Wazuh indexer installation:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # systemctl disable --now wazuh-indexer
            # apt-get remove --purge wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload
            # userdel wazuh-indexer
            # rm -rf /tmp/hsperfdata_wazuh-indexer

         ``dpkg`` may warn that some directories are not empty. The ``rm -rf`` command removes them.

      .. group-tab:: Yum

         .. code-block:: console

            # systemctl disable --now wazuh-indexer
            # yum remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload
            # userdel wazuh-indexer
            # rm -rf /tmp/hsperfdata_wazuh-indexer

      .. group-tab:: DNF

         .. code-block:: console

            # systemctl disable --now wazuh-indexer
            # dnf remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload
            # userdel wazuh-indexer
            # rm -rf /tmp/hsperfdata_wazuh-indexer

.. _uninstall_shared_directory:

Removing the shared directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh central components share the ``/etc/wazuh/`` directory. While they are installed, ``credentials.env`` holds the generated passwords and ``ca/`` holds the root CA and its private key. Removing a component's package takes its own passwords out of ``credentials.env``. What happens to the rest depends on the last component to leave the host. The Wazuh manager or the Wazuh dashboard, as the last one, deletes the whole directory, ``ca/root-ca.key`` included. The Wazuh indexer never deletes ``credentials.env``, so the directory remains. As the last one, it deletes the root CA files in ``ca/`` if no other component's password is left in ``credentials.env``. If you already removed ``credentials.env``, as :ref:`Securing your Wazuh installation <wazuh_dashboard_securing_installation>` recommends, it leaves ``ca/`` as it is.

On the host that holds ``ca/root-ca.key``, back up ``/etc/wazuh/ca`` before you uninstall the last Wazuh central component. You need the key to add nodes or renew certificates.

After you uninstall the last Wazuh central component on a host, check whether the directory remains with ``ls /etc/wazuh``. If it is still there, remove it:

.. code-block:: console

   # rm -rf /etc/wazuh

.. note::

   Don't run this command while a Wazuh central component is still installed on the host. Each component checks this directory every time it starts, and on the host where you created the certificates (the first Wazuh indexer node, or the host where you ran ``--generate-config-files``), ``/etc/wazuh/ca`` holds the root CA private key you need to add nodes or renew certificates.

.. _uninstall_wazuh_repository:

Removing the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you remove the last Wazuh central component from a host installed with the step-by-step method, and no Wazuh agent runs on it, remove the Wazuh repository, its key, and the cached packages:

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # rm -f /etc/apt/sources.list.d/wazuh.list /usr/share/keyrings/wazuh.gpg /usr/share/keyrings/wazuh.gpg~
         # apt-get clean
         # apt-get update

   .. group-tab:: Yum

      .. code-block:: console

         # rm -f /etc/yum.repos.d/wazuh.repo
         # rpm -e gpg-pubkey-29111145
         # yum clean all

   .. group-tab:: DNF

      .. code-block:: console

         # rm -f /etc/yum.repos.d/wazuh.repo
         # rpm -e gpg-pubkey-29111145
         # dnf clean all

After you remove every Wazuh central component from the host, check that none is left. On RPM-based systems, run ``rpm -qa 'wazuh-*'``. On Debian-based systems, run ``dpkg -l 'wazuh-*'``. No Wazuh central component package is listed.
