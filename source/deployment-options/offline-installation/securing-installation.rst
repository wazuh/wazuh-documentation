.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check the Wazuh accounts and change the Wazuh passwords after installing the Wazuh central components offline.

Securing your Wazuh installation
================================

You have now installed and configured all the Wazuh central components. Each component stores the passwords it needs in its own keystore or database, and nothing reads ``/etc/wazuh/credentials.env`` after the installation.

#. Check that the accounts work. When ``curl`` asks for a password, enter the value of the key given for each account. On the Wazuh indexer, the users are ``admin`` (``WAZUH_INDEXER_ADMIN_PASSWORD``), ``kibanaserver`` (``WAZUH_INDEXER_KIBANASERVER_PASSWORD``), and ``wazuh-manager`` (``WAZUH_INDEXER_MANAGER_PASSWORD``):

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200/_cluster/health?pretty
      # curl -k -u kibanaserver https://<WAZUH_INDEXER_ADDRESS>:9200/_plugins/_security/authinfo?pretty
      # curl -k -u wazuh-manager https://<WAZUH_INDEXER_ADDRESS>:9200/_plugins/_security/authinfo?pretty

   On the Wazuh manager API of the master node, the users are ``wazuh`` (``WAZUH_MANAGER_API_PASSWORD``) and ``wazuh-wui`` (``WAZUH_MANAGER_WUI_PASSWORD``). Each command prints a token:

   .. code-block:: console

      # curl -k -u wazuh -X POST "https://<WAZUH_MASTER_ADDRESS>:55000/security/user/authenticate?raw=true"
      # curl -k -u wazuh-wui -X POST "https://<WAZUH_MASTER_ADDRESS>:55000/security/user/authenticate?raw=true"

#. Securely store the five passwords. The ``credentials.env`` file in ``wazuh-install-files.tar`` holds all of them. In an all-in-one installation, which creates no ``wazuh-install-files.tar``, the passwords are in ``/etc/wazuh/credentials.env`` on that host.

#. Remove the credentials file and the installation files from every node. Run these commands in the directory where you copied the installation files: from any other directory, ``rm -f`` removes only ``/etc/wazuh/credentials.env`` and leaves the installation files in place, without reporting an error. Once you have stored the passwords, also remove ``/etc/wazuh/credentials.env`` from the system where you ran ``-g``:

   .. code-block:: console

      # rm -f /etc/wazuh/credentials.env ./wazuh-install-files.tar ./wazuh-offline.tar.gz
      # rm -rf ./wazuh-install-files ./wazuh-offline

#. Only the host where you ran ``-g``, or the host of an assisted all-in-one installation, holds the root CA private key, in ``/etc/wazuh/ca``: keep its backup. On every other installed node, ``/etc/wazuh/ca`` must hold only ``root-ca.pem``:

   .. code-block:: console

      # ls -A /etc/wazuh/ca

Changing passwords with the Wazuh passwords tool
------------------------------------------------

Use the Wazuh passwords tool to change a password. The Wazuh indexer package installs it at ``/usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh``, so you don't need to download it.

When you run the tool on a node, it does the following on that node only:

-  It changes the password.
-  It saves a generated password in ``/etc/wazuh/credentials.env``. If you removed this file in step 3 of Securing your Wazuh installation, the tool creates it again. A password you set with ``-p`` is saved only if the file already exists, so write it down.
-  It stores the new password in the keystore of each component on that node that uses the user: the Wazuh manager for ``wazuh-manager``, and the Wazuh dashboard for ``kibanaserver`` and ``wazuh-wui``. It restarts the Wazuh dashboard when it changes the dashboard keystore.
-  It restarts the Wazuh manager only if that node is the master node. On a worker node, it reports that the ``wazuh-manager`` service is not running and that ``The restart is pending``. The service is running, but it keeps using the previous password, can't write to the Wazuh indexer, and drops the events it receives until you restart it.

On the other nodes, you update the keystores yourself, as the following sections describe.

.. _offline_installation_change_indexer_password:

Changing the password for a Wazuh indexer user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer users are ``admin``, ``kibanaserver``, and ``wazuh-manager``.

#. Run the tool on any Wazuh indexer node. Replace ``<USER>`` with the user. The tool generates a random password.

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh -u <USER>

   To set your own password, add the ``-p`` option. The tool asks for the password twice and doesn't show it. The password needs 12 to 64 characters from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, with at least one uppercase letter, one lowercase letter, one digit, and one symbol.

#. If the tool generated the password, or ``/etc/wazuh/credentials.env`` existed when you set it with ``-p``, run the following command on the same node to show the new password. Replace ``<KEY>`` with the key of the user from the following table. The other nodes and ``wazuh-install-files.tar`` keep the previous value.

   .. code-block:: console

      # grep -m 1 '^<KEY>=' /etc/wazuh/credentials.env

   +-------------------+-----------------------------------------+----------------------------------+
   | User              | Key                                     | Nodes to update                  |
   +===================+=========================================+==================================+
   | ``admin``         | ``WAZUH_INDEXER_ADMIN_PASSWORD``        | None                             |
   +-------------------+-----------------------------------------+----------------------------------+
   | ``kibanaserver``  | ``WAZUH_INDEXER_KIBANASERVER_PASSWORD`` | Every other Wazuh dashboard node |
   +-------------------+-----------------------------------------+----------------------------------+
   | ``wazuh-manager`` | ``WAZUH_INDEXER_MANAGER_PASSWORD``      | Every other Wazuh manager node   |
   +-------------------+-----------------------------------------+----------------------------------+

#. After changing the ``wazuh-manager`` password, run the following commands on every other Wazuh manager node, master or worker. If you have only one Wazuh manager node, skip this step. On the node where you ran the tool, the tool already updated the keystore. If that node is the master, the tool also restarted the Wazuh manager. If it's a worker, run only ``systemctl restart wazuh-manager`` on that node. Replace ``<WAZUH_INDEXER_MANAGER_PASSWORD>`` with the new password.

   .. code-block:: console

      # echo 'wazuh-manager' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k username
      # echo '<WAZUH_INDEXER_MANAGER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password
      # systemctl restart wazuh-manager

   Until you run these commands on a Wazuh manager node, it cannot write to the Wazuh indexer and drops the events it receives. Run them on every other Wazuh manager node right after the tool.

#. After you change the ``kibanaserver`` password, run the following commands on every other Wazuh dashboard node. The tool already updated and restarted the Wazuh dashboard on its own host. Replace ``<WAZUH_INDEXER_KIBANASERVER_PASSWORD>`` with the new password.

   .. code-block:: console

      # echo '<WAZUH_INDEXER_KIBANASERVER_PASSWORD>' | runuser -u wazuh-dashboard -- /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore add opensearch.password --stdin --force
      # systemctl restart wazuh-dashboard

Changing the password for a Wazuh manager API user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager API users are ``wazuh`` and ``wazuh-wui``. Change their passwords on the master node, which runs the Wazuh manager API. Only the Wazuh indexer package installs the Wazuh passwords tool. If the master node doesn't run a Wazuh indexer, copy ``/usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh`` from a Wazuh indexer node to the master node, and use the path of the copy.

#. Run the tool on the master node. Replace ``<USER>`` with ``wazuh`` or ``wazuh-wui``. The ``-p`` option works as it does for the Wazuh indexer users.

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh -u <USER>

#. If the tool generated the password, or ``/etc/wazuh/credentials.env`` existed when you set it with ``-p``, run the following command on the master node to show the new password. Replace ``<KEY>`` with ``WAZUH_MANAGER_API_PASSWORD`` for ``wazuh`` or ``WAZUH_MANAGER_WUI_PASSWORD`` for ``wazuh-wui``.

   .. code-block:: console

      # grep -m 1 '^<KEY>=' /etc/wazuh/credentials.env

#. After you change the ``wazuh-wui`` password, run the following commands on every Wazuh dashboard node that doesn't share a host with the master node. The tool updates a Wazuh dashboard on its own host. Replace ``<WAZUH_MANAGER_WUI_PASSWORD>`` with the new password.

   .. code-block:: console

      # echo '<WAZUH_MANAGER_WUI_PASSWORD>' | runuser -u wazuh-dashboard -- /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore add wazuh_core.hosts.default.password --stdin --force
      # systemctl restart wazuh-dashboard

After you store a new password, remove ``/etc/wazuh/credentials.env`` again from the node where you ran the tool.
