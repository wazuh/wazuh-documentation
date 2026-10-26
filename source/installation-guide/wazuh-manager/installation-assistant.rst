.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh manager using the assisted installation method. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

Installing the Wazuh manager using the assisted installation method
===================================================================

Install the Wazuh manager as a single-node or multi-node cluster on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

You need root user privileges to run all the commands described below.

Wazuh manager cluster installation
----------------------------------

.. note::

   You need root user privileges to run all the commands described below.

#. Download the Wazuh installation assistant. Skip this step if the Wazuh installation assistant is already in your working directory:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-manager`` followed by the node name to install the Wazuh manager. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``manager``:

   .. note::

      Make sure that a copy of ``wazuh-install-files.tar``, created in :ref:`Initial configuration <wazuh_indexer_assisted_initial_configuration>` of the Wazuh indexer assisted installation, is in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-manager manager -id -d pre-release

   The assistant places this node's passwords in ``/etc/wazuh-manager/local.env`` and its certificates in ``/etc/wazuh-manager/certs``. It also places the root CA certificate, without its private key, in ``/etc/wazuh-manager/ca``.

   To check which addresses agents can use to reach this node, run:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

   The output lists them, for example ``IP Address:<WAZUH_MANAGER_ADDRESS>, DNS:manager``. Make sure that every address your agents connect to is in this list.

   If an address is missing, issue the agent listener certificates again on the host where you ran ``--generate-config-files``. That host keeps the root CA in the ``wazuh-ca`` directory and ``config.yml`` beside the installation assistant. Download the certificates tool to the same directory and run it with ``-wm``. Pass every address your agents use, not only the missing one, because the certificate holds only the ``-as`` values of that run:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # rm -rf wazuh-certificates
      # bash wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -wm -as <ADDRESS> -as <OTHER_ADDRESS>

   The tool issues new certificates for every Wazuh manager node in ``config.yml``, signs them with the root CA in ``wazuh-ca``, and writes them to ``wazuh-certificates/``. It stops if that directory exists, so the first command removes it. You only need the agent listener pair. Copy ``<MANAGER_NODE_NAME>-remoted.pem`` and ``<MANAGER_NODE_NAME>-remoted-key.pem`` to each Wazuh manager node, replacing ``<MANAGER_NODE_NAME>`` with its name in ``config.yml``. Then, on that node, run:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager <MANAGER_NODE_NAME>-remoted.pem /etc/wazuh-manager/certs/remoted.pem
      # install -m 0640 -o root -g wazuh-manager <MANAGER_NODE_NAME>-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
      # systemctl restart wazuh-manager
      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

   The last command lists the new address. When every node has its new pair, remove the ``wazuh-certificates`` directory and the copied files: they hold private keys.

Your Wazuh manager is now successfully installed.

To check the Wazuh server API, run these commands on the master node. The API runs only on the master node. The first command prints the password of the ``wazuh`` API user, and the second asks for it:

.. code-block:: console

   # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' /etc/wazuh-manager/export/credentials.env
   # curl -k -u wazuh -X POST "https://localhost:55000/security/user/authenticate?raw=true"

The output is a token.

Testing the Wazuh manager cluster
---------------------------------

On the master node, run the following command. The output lists every node of the cluster:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

The command output looks similar to this:

.. code-block:: none
   :class: output

   NAME       TYPE    VERSION  ADDRESS
   manager    master  5.0.0    <WAZUH_MASTER_ADDRESS>
   manager-2  worker  5.0.0    <WAZUH_WORKER_ADDRESS>

With a single Wazuh manager, the output lists one node, ``node01``, with the address ``127.0.0.1``.

Disable Wazuh updates
---------------------

The installation assistant installs the Wazuh packages from downloaded files and doesn't add a Wazuh package repository, so there is no repository to disable.

Next steps
----------

-  If you want a Wazuh manager single-node cluster, everything is set, and you can proceed directly with :doc:`Installing the Wazuh dashboard <../wazuh-dashboard/installation-assistant>` using the assisted installation method.

-  If you want a Wazuh manager multi-node cluster, repeat this process on every Wazuh manager node, replacing ``manager`` with that node's name in ``config.yml``, for example ``manager-2``. Install the master node first.
