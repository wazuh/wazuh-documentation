.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall each Wazuh central component.

Uninstalling the Wazuh central components
=========================================

Follow these steps to uninstall the Wazuh central components using the Wazuh installation assistant.

#. Download the Wazuh installation assistant:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh

#. Run the Wazuh installation assistant with the option ``-u`` or ``--uninstall`` as follows:

   .. code-block:: console

      # bash wazuh-install.sh --uninstall

This will remove the Wazuh indexer, the Wazuh server, and the Wazuh dashboard.

Uninstalling Wazuh components
-----------------------------

Choose from the options below to uninstall a Wazuh component.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. _uninstall_dashboard:

Uninstalling the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the step below to uninstall the Wazuh dashboard using your package manager.

#. Remove the Wazuh dashboard installation.

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

Uninstalling the Wazuh server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to uninstall the Wazuh manager and filebeat using your package manager.

#. Remove the Wazuh manager installation.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get remove --purge wazuh-manager -y

      .. group-tab:: Yum

         .. code-block:: console

            # yum remove wazuh-manager -y
            # rm -rf /var/ossec/

      .. group-tab:: DNF

         .. code-block:: console

            # dnf remove wazuh-manager -y
            # rm -rf /var/ossec/

#. Remove the Filebeat installation.

   .. tabs::

      .. group-tab:: APT

         .. code:: console

            # apt-get remove --purge filebeat -y

      .. group-tab:: Yum

         .. code:: console

            # yum remove filebeat -y
            # rm -rf /var/lib/filebeat/
            # rm -rf /usr/share/filebeat/
            # rm -rf /etc/filebeat/

      .. group-tab:: DNF

         .. code:: console

            # dnf remove filebeat -y
            # rm -rf /var/lib/filebeat/
            # rm -rf /usr/share/filebeat/
            # rm -rf /etc/filebeat/

.. _uninstall_indexer:

Uninstalling the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the step below to uninstall the Wazuh indexer using your package manager.

#. Remove the Wazuh indexer installation.

   .. tabs::

      .. group-tab:: APT

         .. code:: console

            # apt-get remove --purge wazuh-indexer -y

      .. group-tab:: Yum

         .. code:: console

            # yum remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/
            # rm -rf /usr/share/wazuh-indexer/
            # rm -rf /etc/wazuh-indexer/

      .. group-tab:: DNF

         .. code:: console

            # dnf remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/
            # rm -rf /usr/share/wazuh-indexer/
            # rm -rf /etc/wazuh-indexer/
