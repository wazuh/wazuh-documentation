.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check the Wazuh accounts and change the Wazuh passwords after installing the Wazuh central components offline.

Securing your Wazuh installation
================================

You have now installed and configured all the Wazuh central components. Each package keeps the passwords it uses in its ``local.env`` file. The Wazuh indexer and the Wazuh manager master node also publish their users' passwords in ``export/credentials.env``. All these files are readable by root only.

#. Check that the accounts work. When ``curl`` asks for a password, enter the value of the key given for each account. On the Wazuh indexer, the users are ``admin`` (``WAZUH_INDEXER_ADMIN_PASSWORD``), ``kibanaserver`` (``WAZUH_INDEXER_KIBANASERVER_PASSWORD``), and ``wazuh-manager`` (``WAZUH_INDEXER_MANAGER_PASSWORD``), in ``/etc/wazuh-indexer/export/credentials.env`` of a Wazuh indexer node:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cluster/health?pretty
      # curl -k -u kibanaserver https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_plugins/_security/authinfo?pretty
      # curl -k -u wazuh-manager https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_plugins/_security/authinfo?pretty

   On the Wazuh manager API of the master node, the users are ``wazuh`` (``WAZUH_MANAGER_API_PASSWORD``) and ``wazuh-internal-client`` (``WAZUH_MANAGER_WUI_PASSWORD``), in ``/etc/wazuh-manager/export/credentials.env`` of the master node. Each command prints a token:

   .. code-block:: console

      # curl -k -u wazuh -X POST "https://<WAZUH_MASTER_IP_ADDRESS>:55000/security/user/authenticate?raw=true"
      # curl -k -u wazuh-internal-client -X POST "https://<WAZUH_MASTER_IP_ADDRESS>:55000/security/user/authenticate?raw=true"

#. Store the five passwords securely, for example, in your password manager. The ``credentials.env`` file in ``wazuh-install-files.tar`` holds all of them. In an all-in-one installation, which creates no ``wazuh-install-files.tar``, they are in ``/etc/wazuh-indexer/export/credentials.env`` and ``/etc/wazuh-manager/export/credentials.env``.

#. Remove the installation files from every node. Run this command in the directory where you copied them:

   .. code-block:: console

      # rm -rf ./wazuh-install-files ./wazuh-install-files.tar ./wazuh-offline ./wazuh-offline.tar.gz

   Don't remove the ``local.env`` and ``export/credentials.env`` files of the packages. Each package reads its passwords from its ``local.env``, and the Wazuh passwords tool updates both. Don't give other users read access to them.

#. Only the system where you ran ``-g`` holds the root CA private key, in its ``wazuh-ca`` directory. Keep a backup of that directory, and remove it from that system when you no longer need to add nodes or renew certificates there. In a distributed deployment, ``/etc/wazuh-indexer/ca`` and ``/etc/wazuh-manager/ca`` on the installed nodes must not hold ``root-ca.key``. An all-in-one deployment has no ``wazuh-ca`` directory. Each package created its own root CA and keeps its ``root-ca.key`` in ``/etc/wazuh-indexer/ca``, ``/etc/wazuh-manager/ca``, and ``/etc/wazuh-dashboard/ca``. Back up these three directories instead:

   .. code-block:: console

      # ls -A /etc/wazuh-indexer/ca /etc/wazuh-manager/ca 2>/dev/null

Changing passwords with the Wazuh passwords tool
------------------------------------------------

The Wazuh indexer package installs the Wazuh passwords tool at ``/usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh``. When you run it on a node, it does the following on that node only:

-  It changes the password and saves it in every credential file on the node that holds the key. These are the ``export/credentials.env`` file of the package that owns the user and the ``local.env`` file of each package that uses it. It prints ``The new password of user <USER> was saved as <KEY> in: <FILES>``, and never prints the password itself.
-  It stores the new password in the keystore of each component on that node that uses the user, and restarts that component. That's the Wazuh manager for ``wazuh-manager``, and the Wazuh dashboard for ``kibanaserver`` and ``wazuh-internal-client``.
-  It stops with an error when no credential file on the node can hold a generated password. Use ``-p`` to set your own password then.

The password needs 12 to 64 characters from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``. It needs at least one uppercase letter, one lowercase letter, one digit, and one symbol. On the other nodes, you update the keystores yourself, as the following sections describe.

.. _offline_installation_change_indexer_password:

Changing the password for a Wazuh indexer user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer users are ``admin``, ``kibanaserver``, and ``wazuh-manager``.

#. Run the tool on any Wazuh indexer node. Replace ``<USER>`` with the user. With ``-p``, the tool asks for the password twice and doesn't show it. Without ``-p``, it generates a random password.

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh -u <USER> -p

#. Read the new password on the same node. Replace ``<KEY>`` with the key of the user from the following table. The other nodes and ``wazuh-install-files.tar`` keep the previous value.

   .. code-block:: console

      # grep '^<KEY>=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

   +-------------------+-----------------------------------------+----------------------------+
   | User              | Key                                     | Nodes to update            |
   +===================+=========================================+============================+
   | ``admin``         | ``WAZUH_INDEXER_ADMIN_PASSWORD``        | None                       |
   +-------------------+-----------------------------------------+----------------------------+
   | ``kibanaserver``  | ``WAZUH_INDEXER_KIBANASERVER_PASSWORD`` | Every Wazuh dashboard node |
   +-------------------+-----------------------------------------+----------------------------+
   | ``wazuh-manager`` | ``WAZUH_INDEXER_MANAGER_PASSWORD``      | Every Wazuh manager node   |
   +-------------------+-----------------------------------------+----------------------------+

#. After changing the ``wazuh-manager`` password, run these commands on each Wazuh manager node on a different host from the one where you ran the tool. Replace ``<WAZUH_INDEXER_MANAGER_PASSWORD>`` with the new password. Until you do, the node can't write to the Wazuh indexer and logs ``Unauthorized - Check indexer credentials``.

   .. code-block:: console

      # echo 'wazuh-manager' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k username
      # echo '<WAZUH_INDEXER_MANAGER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password
      # sed -i 's|^WAZUH_INDEXER_MANAGER_PASSWORD=.*|WAZUH_INDEXER_MANAGER_PASSWORD=<WAZUH_INDEXER_MANAGER_PASSWORD>|' /etc/wazuh-manager/local.env
      # systemctl restart wazuh-manager

#. After changing the ``kibanaserver`` password, run these commands on each Wazuh dashboard node on a different host from the one where you ran the tool. Replace ``<WAZUH_INDEXER_KIBANASERVER_PASSWORD>`` with the new password.

   .. code-block:: console

      # echo '<WAZUH_INDEXER_KIBANASERVER_PASSWORD>' | OSD_PATH_CONF=/etc/wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password
      # chown root:wazuh-dashboard /etc/wazuh-dashboard/opensearch_dashboards.keystore
      # chmod 640 /etc/wazuh-dashboard/opensearch_dashboards.keystore
      # sed -i 's|^WAZUH_INDEXER_KIBANASERVER_PASSWORD=.*|WAZUH_INDEXER_KIBANASERVER_PASSWORD=<WAZUH_INDEXER_KIBANASERVER_PASSWORD>|' /etc/wazuh-dashboard/local.env
      # systemctl restart wazuh-dashboard

Changing the password for a Wazuh manager API user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager API users are ``wazuh`` and ``wazuh-internal-client``. Their passwords live in the database of the master node, which runs the Wazuh manager API.

#. Run ``rbac_control`` on the master node. It asks for the new password of each user, and pressing Enter leaves one unchanged. It needs no Wazuh manager API credentials.

   .. code-block:: console

      # /var/wazuh-manager/bin/rbac_control change-password

   ``rbac_control`` doesn't update ``/etc/wazuh-manager/export/credentials.env``, which keeps the previous value. Edit the ``WAZUH_MANAGER_API_PASSWORD`` or ``WAZUH_MANAGER_WUI_PASSWORD`` key there. The cluster doesn't synchronize this database. After promoting another node to master, change the passwords again on it.

#. After changing the ``wazuh-internal-client`` password, run the following commands on every Wazuh dashboard node. Replace ``<WAZUH_MANAGER_WUI_PASSWORD>`` with the new password.

   .. code-block:: console

      # echo '<WAZUH_MANAGER_WUI_PASSWORD>' | OSD_PATH_CONF=/etc/wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin wazuh_core.hosts.default.password
      # chown root:wazuh-dashboard /etc/wazuh-dashboard/opensearch_dashboards.keystore
      # chmod 640 /etc/wazuh-dashboard/opensearch_dashboards.keystore
      # sed -i 's|^WAZUH_MANAGER_WUI_PASSWORD=.*|WAZUH_MANAGER_WUI_PASSWORD=<WAZUH_MANAGER_WUI_PASSWORD>|' /etc/wazuh-dashboard/local.env
      # systemctl restart wazuh-dashboard
