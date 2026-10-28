.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall each Wazuh central component.

Uninstalling the Wazuh central components
=========================================

Uninstalling deletes the components' data and configuration, including indexed alerts and certificates, and asks for no confirmation. It can also delete the root CA private keys in ``/etc/wazuh-manager/ca``, ``/etc/wazuh-indexer/ca``, and ``/etc/wazuh-dashboard/ca``, which you need to add nodes or renew certificates. The Wazuh agents trust the Wazuh manager CA. Back up anything you want to keep first, these directories included. After an assisted installation, the root CA key is also in the ``wazuh-ca`` directory beside the installation assistant, on the host where you ran ``--generate-config-files``. Uninstalling doesn't remove that directory.

You can remove the Wazuh central components in two ways. Use only one. The installation assistant removes every Wazuh central component on the host at once. The package manager removes one component at a time, as described in :ref:`Uninstall one component with the package manager <uninstall_one_component>`.

Uninstall all central components with the installation assistant
----------------------------------------------------------------

Follow these steps to uninstall the Wazuh central components with the installation assistant. Back up the CA directories first, as described at the start of this section.

#. If you no longer have the Wazuh installation assistant script, download it:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``-u`` or ``--uninstall`` as follows:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --uninstall

   This removes the Wazuh indexer, Wazuh manager, and Wazuh dashboard packages installed on the host, with their data. It also removes their configuration directories, ``/etc/wazuh-indexer``, ``/etc/wazuh-manager``, and ``/etc/wazuh-dashboard``, including ``local.env``, ``ca/``, ``certs/``, and ``export/``. It also removes the ``wazuh-indexer``, ``wazuh-manager``, and ``wazuh-dashboard`` users.

   On the host where you ran ``--generate-config-files``, the ``wazuh-ca`` directory beside the installation assistant remains. It holds the root CA private key and the passwords of all the Wazuh users. Remove it after the backup described at the start of this section, or if you won't add nodes or renew certificates:

   .. code-block:: console

      # rm -rf ./wazuh-ca

#. Confirm the removal:

   .. tabs::

      .. group-tab:: RPM-based systems

         .. code-block:: console

            # rpm -qa 'wazuh-*'

      .. group-tab:: Debian-based systems

         .. code-block:: console

            # dpkg -l 'wazuh-*'

   No Wazuh central component package is listed. On Debian-based systems, ``dpkg`` prints ``dpkg-query: no packages found matching wazuh-*`` and exits with status 1 when no package matches.

#. The ``wazuh-install-files.tar`` holds the passwords and every node's private key. Remove it along with ``/var/log/wazuh-install.log``, ``/var/log/wazuh-passwords-tool.log``, the assistant script, ``config.yml``, and the other generated files in your working directory:

   .. code-block:: console

      # rm -rf /var/log/wazuh-install.log /var/log/wazuh-passwords-tool.log ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh ./config.yml ./artifact_urls_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yaml ./wazuh-install-files.tar ./wazuh-install-packages

If you installed the components step by step, also remove the Wazuh repository as described in :ref:`Removing the Wazuh repository <uninstall_wazuh_repository>`.

.. _uninstall_one_component:

Uninstall one component with the package manager
------------------------------------------------

Remove the components in any order. Removing a component can delete the root CA private key it created, which you need to add nodes or renew certificates. The Wazuh agents trust the Wazuh manager CA. Before you start, copy the CA directory of each component on the host to a safe place:

.. code-block:: console

   # cp -a /etc/wazuh-manager/ca <BACKUP_DIRECTORY>/wazuh-manager-ca
   # cp -a /etc/wazuh-indexer/ca <BACKUP_DIRECTORY>/wazuh-indexer-ca
   # cp -a /etc/wazuh-dashboard/ca <BACKUP_DIRECTORY>/wazuh-dashboard-ca

Run only the lines for the components installed on the host. The keys that matter most are on the Wazuh manager master node and the first Wazuh indexer node. To reinstall later with the same certificates and passwords, also copy the ``certs`` and ``export`` directories and the ``local.env`` file of each component. Replace ``<BACKUP_DIRECTORY>`` with a directory outside ``/etc``, preferably on another host.

-  :ref:`Uninstalling the Wazuh dashboard <uninstall_dashboard>`
-  :ref:`Uninstalling the Wazuh manager <uninstall_server>`
-  :ref:`Uninstalling the Wazuh indexer <uninstall_indexer>`
-  :ref:`Checking for leftover directories <uninstall_leftover_directories>`
-  :ref:`Removing the Wazuh repository <uninstall_wazuh_repository>`

.. _uninstall_dashboard:

Uninstalling the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands to stop the Wazuh dashboard, remove its package, and delete its files:

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
            # rm -f /etc/default/wazuh-dashboard.rpmsave

      .. group-tab:: DNF

         .. code-block:: console

            # systemctl disable --now wazuh-dashboard
            # dnf remove wazuh-dashboard -y
            # rm -rf /var/lib/wazuh-dashboard/
            # rm -rf /usr/share/wazuh-dashboard/
            # rm -rf /etc/wazuh-dashboard/
            # rm -f /etc/default/wazuh-dashboard.rpmsave

.. _uninstall_server:

Uninstalling the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands to stop the Wazuh manager, remove its package, and delete its directories, including the CA private key:

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
            # rm -rf /var/wazuh-manager/ /etc/wazuh-manager/

      .. group-tab:: DNF

         .. code-block:: console

            # systemctl disable --now wazuh-manager
            # dnf remove wazuh-manager -y
            # rm -rf /var/wazuh-manager/ /etc/wazuh-manager/

.. _uninstall_indexer:

Uninstalling the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands to stop the Wazuh indexer, remove its package, and delete its data, logs, and configuration. To keep the configuration and data for a reinstall on a DEB system, run ``apt-get remove wazuh-indexer -y`` instead.

#. Remove the Wazuh indexer installation:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # systemctl disable --now wazuh-indexer
            # apt-get remove --purge wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload

         ``dpkg`` may warn that some directories are not empty. The ``rm -rf`` command removes them.

      .. group-tab:: Yum

         .. code-block:: console

            # systemctl disable --now wazuh-indexer
            # yum remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload

      .. group-tab:: DNF

         .. code-block:: console

            # systemctl disable --now wazuh-indexer
            # dnf remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/ /usr/share/wazuh-indexer/ /etc/wazuh-indexer/ /var/log/wazuh-indexer/
            # rm -rf /etc/systemd/system/wazuh-indexer.service.d/
            # systemctl daemon-reload

To confirm, run ``dpkg -l 'wazuh-*'`` (DEB) or ``rpm -qa 'wazuh-*'`` (RPM). The output lists no Wazuh central component package.

.. _uninstall_leftover_directories:

Checking for leftover directories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh central components don't share a directory. Each one keeps its configuration, certificates, and passwords in its own directory: ``/etc/wazuh-indexer``, ``/etc/wazuh-manager``, or ``/etc/wazuh-dashboard``. A package removal can leave that directory behind, as the uninstall steps of each component describe. After you uninstall the last Wazuh central component on a host, check which of these directories remain:

.. code-block:: console

   # ls -d /etc/wazuh-indexer /etc/wazuh-manager /etc/wazuh-dashboard

The command prints ``No such file or directory`` for each directory that is gone. If one is still there, back up its ``ca`` directory if you need it, then remove it:

.. code-block:: console

   # rm -rf /etc/wazuh-<COMPONENT>

Replace ``<COMPONENT>`` with indexer, manager, or dashboard.

.. note::

   Don't run this command while a Wazuh central component is still installed on the host.

.. _uninstall_wazuh_repository:

Removing the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you removed the last Wazuh central component from a step-by-step host and no Wazuh agent runs on it, remove the Wazuh repository. Also remove its key and the cached packages:

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
