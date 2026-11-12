.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy the TLS certificates of the Wazuh manager nodes from one shared root CA, and how to recover a missing root CA.

Certificates deployment
=======================

Each Wazuh manager node presents its own TLS certificates to the Wazuh agents, to the Wazuh manager API clients, and to the Wazuh indexer. All nodes must use certificates from one root certificate authority (CA), so an agent trusts every node it reaches.

The cluster connection between nodes doesn't use these certificates. The shared cluster key protects it. The cluster doesn't replicate certificates either, so you provide them on every node.

Certificates on each node
-------------------------

Every node keeps its TLS files in ``/etc/wazuh-manager/certs/``. The following table lists the files a node uses with their default names.

+-------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------------------------+
| **File**                                                    | **Purpose**                                                                                  | **Issued by**                     |
+=============================================================+==============================================================================================+===================================+
| ``remoted.pem`` and ``remoted-key.pem``                     | Agent listener on port ``1517``. The enrollment service on port ``1515`` uses the same pair. | The root CA of the Wazuh manager. |
+-------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------------------------+
| ``apid.pem`` and ``apid-key.pem``                           | Wazuh manager API on port ``55000``.                                                         | The root CA of the Wazuh manager. |
+-------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------------------------+
| ``root-ca.pem``                                             | CA bundle that Wazuh agents trust. The agent listener serves it to the agents.               | The root CA of the Wazuh manager. |
+-------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------------------------+
| ``indexer-ca.pem``                                          | CA that the node trusts for the Wazuh indexer.                                               | The Wazuh indexer.                |
+-------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------------------------+
| ``indexer-connector.pem`` and ``indexer-connector-key.pem`` | Client certificate that the node presents to the Wazuh indexer.                              | The Wazuh indexer.                |
+-------------------------------------------------------------+----------------------------------------------------------------------------------------------+-----------------------------------+

Shared root CA
--------------

When the Wazuh manager package finds no CA and no certificates at installation, it creates its own CA and issues its own certificates. On a single node, no other step is needed. In a cluster, a node with its own CA presents certificates that agents trusting another node reject. To fix such a node, see :ref:`Fix a node that created its own CA <wazuh_manager_cluster_fix_a_node_that_created_its_own_ca>`.

We recommend that you provide the same root CA to every node before you install the Wazuh manager package on it. You can do it in one of the following ways:

-  **Staged CA**: Place the shared ``root-ca.pem`` and ``root-ca.key`` files in ``/etc/wazuh-manager/ca/`` on each node. The directory belongs to ``root`` with mode ``0700``. Both files belong to ``root``, with mode ``0644`` for ``root-ca.pem`` and ``0400`` for ``root-ca.key``. The package then issues the node certificates from that CA at installation. Don't copy the ``.wazuh-manager-bootstrap-ca`` file. It marks a CA that the node created itself, and the ``--clear`` option of :doc:`wazuh-manager-resolve-credentials </user-manual/reference/tools/wazuh-manager-resolve-credentials>` deletes a CA that carries it.
-  **Issued certificates**: Issue every node pair with the :doc:`wazuh-certs-tool.sh </user-manual/reference/installation-utilities/certs-tools>` script. Place the pairs in ``/etc/wazuh-manager/certs/`` and the CA certificate in ``/etc/wazuh-manager/ca/`` on each node. The package then uses these files instead of issuing its own.

Back up the certificates of each node together with its ``/etc/wazuh-manager/ca/`` and ``/etc/wazuh-manager/export/`` directories and its ``/etc/wazuh-manager/local.env`` file. The cluster doesn't restore them. Also back up the directory that holds ``root-ca.key``, because without it you must :ref:`replace the root CA <wazuh_manager_cluster_replace_a_lost_root_ca>`.

.. _wazuh_manager_cluster_subject_alternative_names:

Subject alternative names
-------------------------

A Wazuh agent checks that the agent listener certificate names the address it dials. Each node certificate must list every address the agents use to reach that node.

-  **Direct connections**: List the IP address or DNS name of the node.
-  **Load balancer that passes TLS through**: Also list the load balancer address in the certificate of every node. The agent completes the TLS handshake with whichever node answers.
-  **Load balancer that terminates TLS**: Give the load balancer its own certificate with its address, signed by the same root CA. Each node certificate lists the name that the load balancer dials.

The address of an enrollment token must also appear in the master node listener certificate. The master node refuses to mint a token for an address that its certificate doesn't name. On the master node, list every address that you pass to ``wazuh-manager-authd --create-enrollment-token --address``, including the worker node and load balancer addresses.

When the package issues the agent listener certificate, it discovers the node names and addresses. To set the list yourself, define ``WAZUH_MANAGER_REMOTED_CERT_SANS`` in ``/etc/wazuh-manager/local.env`` before installation. The file must belong to ``root`` with no group or other permissions, such as mode ``0600``. The Wazuh manager refuses to start when ``local.env`` is unsafe:

.. code-block:: console

   # [ -d /etc/wazuh-manager ] || install -d -m 0750 -o root -g root /etc/wazuh-manager
   # install -m 0600 -o root -g root /dev/null /etc/wazuh-manager/local.env
   # echo "WAZUH_MANAGER_REMOTED_CERT_SANS='DNS:<AGENT_FACING_NAME>,DNS:<NODE_NAME>,IP:<NODE_IP_ADDRESS>'" >> /etc/wazuh-manager/local.env

Run these commands before you install the Wazuh manager package. The package reads the list only at installation. Before installation, if ``/etc/wazuh-manager/local.env`` already exists, run only the echo command.

Replace ``<AGENT_FACING_NAME>`` with the load balancer name, ``<NODE_NAME>`` with the name of the node, and ``<NODE_IP_ADDRESS>`` with the IP address of the node. An explicit list replaces the discovered addresses, so include the names and addresses of the node itself. The package always adds ``localhost``, ``127.0.0.1``, and ``::1``.

To change the list later, first check whether ``/etc/wazuh-manager/ca/`` on the node holds ``root-ca.key``. The resolver can issue a new pair only on a node that holds the key, such as the all-in-one master node or a node added with the step-by-step variant.

If the node holds ``root-ca.key``, run these commands to replace the list and issue the new pair:

.. code-block:: console

   # [ -f /etc/wazuh-manager/local.env ] || install -m 0600 -o root -g root /dev/null /etc/wazuh-manager/local.env
   # rm -f /etc/wazuh-manager/certs/remoted.pem /etc/wazuh-manager/certs/remoted-key.pem
   # sed -i '/^WAZUH_MANAGER_REMOTED_CERT_SANS=/d' /etc/wazuh-manager/local.env
   # echo "WAZUH_MANAGER_REMOTED_CERT_SANS='DNS:<AGENT_FACING_NAME>,DNS:<NODE_NAME>,IP:<NODE_IP_ADDRESS>'" >> /etc/wazuh-manager/local.env
   # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install
   # systemctl restart wazuh-manager

An all-in-one node installed with the installation assistant has no ``local.env`` file, so the first command creates it with mode ``0600``. The Wazuh manager rejects a ``local.env`` file that sets a name twice, so the ``sed`` command removes the old list first. The resolver exits with status 0 even when it can't issue the pair. If its output has a line that starts with ``MISSING``, the node has no pair and the Wazuh manager doesn't start.

If the node doesn't hold ``root-ca.key``, don't delete the pair. On the endpoint that holds ``root-ca.key``, issue a new pair as in :ref:`Generate the Wazuh manager certificates <wazuh_manager_cluster_generate_the_wazuh_manager_certificates>`, with the node in ``config.yml`` and ``--agent-san`` for any extra address, such as the load balancer address. Copy ``<NODE_NAME>-remoted.pem`` and ``<NODE_NAME>-remoted-key.pem`` to the node, and install them:

.. code-block:: console

   # install -m 0640 -o root -g wazuh-manager <NODE_NAME>-remoted.pem /etc/wazuh-manager/certs/remoted.pem
   # install -m 0640 -o root -g wazuh-manager <NODE_NAME>-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
   # systemctl restart wazuh-manager

Replace ``<NODE_NAME>`` with the name of the node in ``config.yml``.

Options of the wazuh-certs-tool.sh script
-----------------------------------------

The ``wazuh-certs-tool.sh`` script issues the certificates of every Wazuh central component from the ``config.yml`` file in the directory of the script. It writes them to the ``wazuh-certificates/`` directory beside the script. The Wazuh indexer package installs the script as ``/usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh``, with a ``config.yml`` template beside it. It creates three pairs for each Wazuh manager node in that file. They serve the agent listener, the Wazuh manager API, and the connection to the Wazuh indexer.

The script reads the root CA from its CA directory, or from the directory in the ``WAZUH_CA_DIR`` variable. It never copies the CA private key to the output directory. The script must run as ``root``.

The following table lists the options that control the Wazuh manager certificates.

+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Option**                                | **Effect**                                                                                                                                                     |
+===========================================+================================================================================================================================================================+
| ``-A``, ``--all``                         | Creates the certificates for every node in ``config.yml`` and the admin certificates. Creates a root CA when the CA directory has none.                        |
+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-wm``, ``--wazuh-manager-certificates`` | Creates the Wazuh manager certificates only.                                                                                                                   |
+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-as``, ``--agent-san <ip|dns>``         | Adds an address to the agent listener certificate of every Wazuh manager node. Use it for a load balancer that passes TLS through. Requires ``-A`` or ``-wm``. |
+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-lb``, ``--load-balancer-certificates`` | Creates certificates for the ``load_balancer`` entries of ``config.yml``. Use it for a load balancer that terminates TLS.                                      |
+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-ap, --api-san <ip|dns>``               | Adds an address to the Wazuh manager API certificate of every Wazuh manager node. Requires ``-A`` or ``-wm``.                                                  |
+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-ca, --root-ca-certificates``           | Creates a root CA in the CA directory when the directory has none.                                                                                             |
+-------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _wazuh_manager_cluster_generate_the_wazuh_manager_certificates:

Generate the Wazuh manager certificates
---------------------------------------

When you issue all node certificates from one place, every node stays under the same root CA. Generate them before you install the Wazuh manager package on a new node.

If the master node of a step-by-step deployment holds ``root-ca.key`` in ``/etc/wazuh-manager/ca``, the Wazuh manager certificates come from that CA instead. For those deployments, follow :ref:`Add a Wazuh manager node to distributed deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_distributed_deployments>`.

Check these prerequisites before you start:

-  The ``/usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh`` script, which the Wazuh indexer package installs
-  Root privileges on the endpoint that holds the root CA
-  The root CA files of your deployment in the CA directory of the script

On an endpoint without the Wazuh indexer, download the certificates tool and its ``config.yml`` template to a working directory instead:

.. code-block:: console

   # mkdir -p ~/certs-tool
   # curl -fsSo ~/certs-tool/wazuh-certs-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
   # curl -fsSo ~/certs-tool/config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yml

The downloaded ``config.yml`` has the same placeholder entries as the packaged file. In the following steps, use ``~/certs-tool/config.yml``, ``~/certs-tool/wazuh-certs-tool.sh``, and ``~/certs-tool/wazuh-certificates/`` in place of the ``/usr/share/wazuh-indexer/tools/`` paths.

Complete these steps on the endpoint that holds the root CA, then on each Wazuh manager node. To find that endpoint, see :ref:`Find the root CA of the deployment <wazuh_manager_cluster_find_the_root_ca_of_the_deployment>`.

#. In the ``/usr/share/wazuh-indexer/tools/config.yml`` file, list every Wazuh manager node in the manager section and remove every placeholder address:

   .. code-block:: yaml

      nodes:
        manager:
          - name: master
            ip: "<MASTER_NODE_IP>"
            node_type: master
          - name: worker
            ip: "<WORKER_NODE_IP>"
            node_type: worker

   Where:

      -  ``name`` is a unique node name. The script uses it to name the certificate files.
      -  ``ip`` is the IP address of the node. Replace ``<MASTER_NODE_IP>`` and ``<WORKER_NODE_IP>`` with the IP address of each node. To add a DNS name, list it in a ``dns`` field of the node.
      -  ``node_type`` is ``master`` for one node and ``worker`` for the rest.

   The indexer and dashboard sections of the packaged file hold placeholder addresses, such as ``<indexer-node-ip>``. Remove those sections, or replace the placeholders with the addresses of your nodes. The script checks every node in the file and stops at the first placeholder.

#. Run the script with the CA directory of your deployment:

   .. code-block:: console

      # WAZUH_CA_DIR=<CA_DIRECTORY> bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -wm

   -  Replace ``<CA_DIRECTORY>`` with the absolute path of the directory that holds ``root-ca.pem`` and ``root-ca.key``, such as ``/root/wazuh-ca``. The script rejects a relative path. Add ``--agent-san <AGENT_FACING_ADDRESS>`` when the agents reach the nodes through a load balancer that passes TLS through.

   If you downloaded the tool, run that copy instead. It reads ``~/certs-tool/config.yml`` and writes the certificates to ``~/certs-tool/wazuh-certificates/``:

   .. code-block:: console

      # WAZUH_CA_DIR=<CA_DIRECTORY> bash ~/certs-tool/wazuh-certs-tool.sh -wm

#. Copy ``root-ca.pem`` and the files of each node from the ``/usr/share/wazuh-indexer/tools/wazuh-certificates/`` directory to that node, before you install the Wazuh manager package on it.

   -  Each node needs ``<NODE_NAME>-remoted.pem``, ``<NODE_NAME>-remoted-key.pem``, ``<NODE_NAME>-apid.pem``, ``<NODE_NAME>-apid-key.pem``, ``<NODE_NAME>.pem``, and ``<NODE_NAME>-key.pem``. ``<NODE_NAME>`` is the ``name`` value of the node in ``config.yml``.
   -  After you copy the files, remove the ``/usr/share/wazuh-indexer/tools/wazuh-certificates/`` directory. It holds the private keys of every node, and the script stops on its next run while the directory exists.

#. Install the files on the node, in the directory that holds them:

   .. code-block:: console

      # [ -d /etc/wazuh-manager ] || install -d -m 0750 -o root -g root /etc/wazuh-manager
      # [ -d /etc/wazuh-manager/certs ] || install -d -m 0750 -o root -g root /etc/wazuh-manager/certs
      # install -d -m 0700 -o root -g root /etc/wazuh-manager/ca
      # install -m 0644 root-ca.pem /etc/wazuh-manager/ca/root-ca.pem
      # install -m 0640 root-ca.pem /etc/wazuh-manager/certs/root-ca.pem
      # install -m 0640 root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 <NODE_NAME>.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 <NODE_NAME>-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem
      # install -m 0640 <NODE_NAME>-remoted.pem /etc/wazuh-manager/certs/remoted.pem
      # install -m 0640 <NODE_NAME>-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
      # install -m 0640 <NODE_NAME>-apid.pem /etc/wazuh-manager/certs/apid.pem
      # install -m 0640 <NODE_NAME>-apid-key.pem /etc/wazuh-manager/certs/apid-key.pem

   -  The ``indexer-ca.pem`` line applies when the same root CA signed the Wazuh indexer certificates. At installation, the package sets ``/etc/wazuh-manager/`` to owner ``root:wazuh-manager`` and mode ``0770``. On RPM-based systems, its credential check runs before the certificate files you placed have the ``wazuh-manager`` group, and it reports them as ``UNSAFE``. After the installation, set their owner and mode and run ``wazuh-manager-resolve-credentials --upgrade``, as described in :ref:`Add a Wazuh manager node to distributed deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_distributed_deployments>`.

   The Wazuh manager also needs the Wazuh indexer password ``WAZUH_INDEXER_MANAGER_PASSWORD`` in ``/etc/wazuh-manager/local.env``. Place it with the Wazuh manager API passwords before you install the package, as described in :ref:`Add a Wazuh manager node to distributed deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_distributed_deployments>`. Without it, the Wazuh manager doesn't start, and its journal shows ``MISSING WAZUH_INDEXER_MANAGER_PASSWORD``.

#. Check that the agent listener certificate of each node names the addresses the agents dial:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

#. Check that the agent listener certificate chains to the root CA on the node:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem

   -  The output ends in ``OK``.

For the complete procedure to add a node with these files, see :ref:`Adding Wazuh manager nodes <wazuh_manager_cluster_adding_wazuh_manager_nodes>`.

.. _wazuh_manager_cluster_missing_root_ca:

Missing root CA
---------------

Every node certificate on this page comes from the root CA of the deployment, which needs both ``root-ca.pem`` and its private key ``root-ca.key``. The key usually stays on one endpoint, so first find that endpoint. If no endpoint holds the key, replace the root CA without breaking agent trust.

+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| **Situation**                                                                                                                   | **Section**                                                                                          |
+=================================================================================================================================+======================================================================================================+
| The certificates tool stops with ``There is no valid root CA in …`` or ``The root CA in … has no private key (root-ca.key) …``. | :ref:`Find the root CA of the deployment <wazuh_manager_cluster_find_the_root_ca_of_the_deployment>` |
+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| A new node was installed without the root CA and created its own CA.                                                            | :ref:`Fix a node that created its own CA <wazuh_manager_cluster_fix_a_node_that_created_its_own_ca>` |
+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------+
| No endpoint holds ``root-ca.key``.                                                                                              | :ref:`Replace a lost root CA <wazuh_manager_cluster_replace_a_lost_root_ca>`                         |
+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------+

.. _wazuh_manager_cluster_find_the_root_ca_of_the_deployment:

Find the root CA of the deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The certificates tool signs only with a CA directory that holds both files. If a Wazuh manager node holds ``root-ca.pem`` without its key, the tool fails there. Run it where the key is, so the new certificates chain to the CA your agents already trust.

The following table lists where ``root-ca.key`` stays after each installation method.

+--------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Deployment**                                                                                                                       | **Directory of root-ca.key**                                                                                                                                                                                                 |
+======================================================================================================================================+==============================================================================================================================================================================================================================+
| Distributed, installed with the :doc:`installation assistant </user-manual/reference/installation-utilities/installation-assistant>` | The ``wazuh-ca`` directory next to ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh``, on the endpoint where you ran ``--generate-config-files``. If ``WAZUH_CA_DIR`` was set, the directory it names.                                           |
+--------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Distributed, installed step by step                                                                                                  | ``/etc/wazuh-indexer/ca`` on the first Wazuh indexer node. If ``/etc/wazuh-manager/ca`` on the master node also holds ``root-ca.key``, that directory holds the CA of the agent listener and Wazuh manager API certificates. |
+--------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| All-in-one                                                                                                                           | ``/etc/wazuh-manager/ca`` on the all-in-one endpoint. The Wazuh manager package created this CA.                                                                                                                             |
+--------------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Complete the first step on a Wazuh manager node and the rest on the endpoint that holds the key.

#. Print the fingerprint of the root CA that the Wazuh manager node trusts:

   .. code-block:: console

      # openssl x509 -noout -fingerprint -sha256 -in /etc/wazuh-manager/ca/root-ca.pem

#. Print the fingerprint of the candidate CA, and check that its key is beside it:

   .. code-block:: console

      # openssl x509 -noout -fingerprint -sha256 -in "<CA_DIRECTORY>/root-ca.pem"
      # ls -l "<CA_DIRECTORY>/root-ca.key"

   Replace ``<CA_DIRECTORY>`` with a directory from the table. The fingerprint must match the output of step 1.

#. **Optional**: If you run the certificates tool on another endpoint, copy both files there into a directory that only root can read:

   .. code-block:: console

      # install -d -m 0700 -o root -g root /root/wazuh-ca
      # install -m 0644 -o root -g root root-ca.pem /root/wazuh-ca/root-ca.pem
      # install -m 0400 -o root -g root root-ca.key /root/wazuh-ca/root-ca.key

   Run these commands in the directory that holds the copied files, and delete those files afterwards. Anyone who holds ``root-ca.key`` can issue certificates that your deployment trusts.

#. Issue the certificates as in steps 1 to 5 of :ref:`Issue the certificates for the new node <wazuh_manager_cluster_issue_the_certificates_for_the_new_node>`, with ``CA_DIR`` set to the root CA directory.

   The tool checks that ``root-ca.key`` matches ``root-ca.pem`` before it signs anything.

#. If you copied the root CA in step 3, remove the copy:

   .. code-block:: console

      # rm -rf /root/wazuh-ca

.. _wazuh_manager_cluster_fix_a_node_that_created_its_own_ca:

Fix a node that created its own CA
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When the Wazuh manager package finds no CA and no certificates at installation, it creates a CA for the node. The cluster connection doesn't use these certificates, so the node can still join the cluster. However, Wazuh agents that trust the root CA of the deployment reject its certificates. Replace its credentials before agents connect to it.

The installation output names the CA that the package created, for example ``resolve-credentials: CA CN=wazuh-manager-<NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US: minted``. The package doesn't create a CA in these other cases. It reports them instead:

-  **Node certificates without the CA**: The installation reports ``MISSING /etc/wazuh-manager/ca/root-ca.pem: stage the CA that issued the pairs``. Place ``root-ca.pem`` of the deployment in ``/etc/wazuh-manager/ca/``.
-  **CA certificate without its key, and no node certificates**: The installation prints ``The CA in /etc/wazuh-manager/ca has no key, so no server certificate could be issued.`` Issue the node certificates where ``root-ca.key`` is. Then place them in ``/etc/wazuh-manager/certs/`` and start the Wazuh manager.

Check these prerequisites before you start:

-  A recently added node that serves no Wazuh agents yet, because the procedure also removes its Wazuh manager API database and keystore
-  The passwords of the deployment in ``/etc/wazuh-manager/local.env``, as the procedure for your deployment places them
-  The files of the deployment for this node, as the installation task of your procedure stages them

Complete these steps on the new node.

#. Check that the node created its own CA:

   .. code-block:: console

      # ls -a /etc/wazuh-manager/ca/

   The listing includes ``.wazuh-manager-bootstrap-ca``. This marker means that the node created the CA in that directory.

#. Stop the Wazuh manager:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Remove the credentials that the package created:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --clear -H /var/wazuh-manager

   The command removes the CA that the node created, its agent listener and Wazuh manager API pairs, and ``/etc/wazuh-manager/certs/root-ca.pem``. It also removes the Wazuh manager API database and the keystore contents. It keeps ``local.env`` and the Wazuh indexer files you placed. The output ends with ``resolve-credentials: cleared; the next --install resolves from nothing``.

#. Place the files of the deployment, as the installation task of your procedure describes.

   -  **All-in-one**: :ref:`Install the new Wazuh manager node <wazuh_manager_cluster_install_the_new_wazuh_manager_node>`
   -  **Distributed**: :ref:`Install the new Wazuh manager node <wazuh_manager_cluster_install_the_new_wazuh_manager_node_2>`

   Give each file in ``/etc/wazuh-manager/certs/`` owner ``root:wazuh-manager`` and mode ``0640``. The ``wazuh-manager`` group exists now.

#. Run the credential resolver in installation mode:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install -H /var/wazuh-manager

   This mode issues the missing pairs from the CA when its key is present, and validates the files you placed.

#. Check the credentials:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check -H /var/wazuh-manager

   The output ends with ``check: no problem found``. In a distributed deployment, it ends with ``check: no problem found (1 warnings)`` instead. The warning reports the dashboard client pair, which the node can't issue without the CA key.

#. Check that the agent listener certificate chains to the root CA of the deployment:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/certs/remoted.pem

   The command prints ``/etc/wazuh-manager/certs/remoted.pem: OK``.

#. Configure the node as a worker and start it, as in :ref:`Configure the new node as a worker for all-in-one deployments <wazuh_manager_cluster_configure_the_new_node_as_a_worker>` or :ref:`for distributed deployments <wazuh_manager_cluster_configure_the_new_node_as_a_worker_2>`.

In an all-in-one deployment, remove ``/etc/wazuh-manager/ca/root-ca.key`` from the new node afterwards, as the :ref:`all-in-one procedure <wazuh_manager_cluster_add_a_wazuh_manager_node_to_all_in_one_deployments>` does.

.. _wazuh_manager_cluster_replace_a_lost_root_ca:

Replace a lost root CA
^^^^^^^^^^^^^^^^^^^^^^

Without ``root-ca.key``, you can't issue certificates for new nodes or renew existing ones. This procedure creates a new root CA and moves the deployment to it without disconnecting your Wazuh agents. It has three phases:

-  Trust both CAs, steps 1 to 6. Every component that verifies the Wazuh manager nodes learns to trust the new CA. The nodes keep their old certificates.
-  Switch the nodes, steps 7 to 10. Each node gets a certificate from the new CA. Agents trust both CAs, so they stay connected.
-  Remove the old CA, steps 11 to 14. Agents and nodes stop trusting the old CA, and you remove the leftover files and enrollment tokens.

Agents learn the new CA from the CA bundle, the list of CAs that the Wazuh manager nodes tell agents to trust. The master node publishes the bundle. Agents check for a new version on every keep-alive message and download it on their own.

The procedure replaces the CA of the agent listener and the Wazuh manager API. The Wazuh indexer client pair of each node comes from the Wazuh indexer CA, and it doesn't change.

Check these prerequisites before you start:

-  Root privileges on every Wazuh manager node, on the endpoint where you create the new root CA, and on each load balancer and Wazuh dashboard that connects to the nodes
-  The certificates tool in ``~/certs-tool`` on that endpoint, as in step 2 of :ref:`Issue the certificates for the new node <wazuh_manager_cluster_issue_the_certificates_for_the_new_node>`
-  A ``~/certs-tool/config.yml`` file that lists every Wazuh manager node, as in step 1 of :ref:`Generate the Wazuh manager certificates <wazuh_manager_cluster_generate_the_wazuh_manager_certificates>`. If a load balancer terminates TLS, the file lists it too.
-  Synchronized clocks on every node and on that endpoint, because the master node refuses a CA whose validity period starts later than its clock
-  Fewer than 6 certificates in the bundle of the master node, as ``/var/wazuh-manager/bin/wazuh-manager-certs inspect`` lists them. A bundle holds 6 certificates and 8191 bytes at most.

Complete each step on every host that it names before you start the next one.

#. On the endpoint for the new root CA, create the CA and the Wazuh manager certificates in one run:

   .. code-block:: console

      # cd ~/certs-tool
      # rm -rf wazuh-certificates
      # WAZUH_CA_DIR="<NEW_CA_DIRECTORY>" bash ~/certs-tool/wazuh-certs-tool.sh -ca -wm

   -  Replace ``<NEW_CA_DIRECTORY>`` with the absolute path of a new, empty directory, such as ``/root/wazuh-ca-new``. The tool creates it with mode ``0700``.
   -  Pass the same ``--agent-san`` and ``--api-san`` values that the current node certificates use. If a load balancer terminates TLS, also add ``-lb`` to issue its certificate from the new CA.
   -  The tool warns that certificates from the new CA don't chain to the root CA of any existing deployment. That is expected here, so continue.
   -  Back up ``<NEW_CA_DIRECTORY>`` in a safe place. It holds the new ``root-ca.key``.

#. Copy these files from the ``~/certs-tool/wazuh-certificates/`` directory to the Wazuh manager nodes:

   **To every node:** ``root-ca.pem``, saved as ``/root/new-root-ca.pem``.

   **To each node:** its own ``<NODE_NAME>-remoted.pem``, ``<NODE_NAME>-remoted-key.pem``, ``<NODE_NAME>-apid.pem``, and ``<NODE_NAME>-apid-key.pem``, saved in ``/root/``.

   Don't copy ``<NODE_NAME>.pem`` and ``<NODE_NAME>-key.pem``. They are the Wazuh indexer client pair, and the Wazuh indexer doesn't trust the new CA.

#. On the master node, add the new CA to the CA bundle:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs add /root/new-root-ca.pem

   The command prints ``added 1 certificate(s); published generation <GENERATION>``. The bundle now holds both CAs, and the nodes still serve their old certificates.

#. On each worker node, download the bundle from the master node:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs --from-master

   -  The command prints ``installed <N> certificate(s) from https://<MASTER_ADDRESS>:1517/wazuh-manager/cacerts; published generation <GENERATION>``, with the generation from step 3.
   -  The tool connects to the first address in the ``<nodes>`` list of the ``<cluster>`` block. If the master node agent listener certificate doesn't name that address, add ``--master <MASTER_ADDRESS>``, an address that the certificate names.

#. Wait until every Wazuh agent trusts both CAs. On a Wazuh agent, count the CAs that it trusts:

   .. code-block:: console

      # grep -c "BEGIN CERTIFICATE" /var/ossec/etc/certs/root-ca.pem

   -  The count grows by one, for example from 1 to 2, when the agent has the new bundle.
   -  A disconnected agent gets the bundle when it reconnects. Wait at least as long as the longest time that a Wazuh agent stays disconnected. An agent that is still disconnected when its node switches in step 7 can't verify the new certificate.
   -  By default, each node serves 50 bundle downloads per second, so a large fleet needs some time.

#. Make the other components that verify the Wazuh manager nodes trust the new CA too. Keep the old CA in each file, because the nodes switch to the new CA one at a time. First, copy the new CA file from step 1 to each of these endpoints as ``/root/new-root-ca.pem``.

   **Wazuh agent with its own** **``<certificate_authorities>``** **file:** The agent doesn't receive the bundle. Append the new CA to the file that ``<certificate_authorities>`` names.

   **Wazuh dashboard:** Append the new CA to the CA file of each Wazuh dashboard, and restart it. The Wazuh dashboard reads this file only at start:

   .. code-block:: console

      # cat /root/new-root-ca.pem >> /etc/wazuh-dashboard/certs/manager-ca.pem
      # systemctl restart wazuh-dashboard

   **NGINX load balancer that terminates TLS:** Append the new CA to the file that ``proxy_ssl_trusted_certificate`` names, ``/etc/nginx/certs/root-ca.pem``:

   .. code-block:: console

      # cat /root/new-root-ca.pem >> /etc/nginx/certs/root-ca.pem
      # grep -c "BEGIN CERTIFICATE" /etc/nginx/certs/root-ca.pem
      # nginx -t && nginx -s reload

   **HAProxy load balancer that terminates TLS:** Append the new CA to the file that ``ca-file`` names, ``/etc/haproxy/certs/root-ca.pem``:

   .. code-block:: console

      # cat /root/new-root-ca.pem >> /etc/haproxy/certs/root-ca.pem
      # grep -c "BEGIN CERTIFICATE" /etc/haproxy/certs/root-ca.pem
      # haproxy -c -f /etc/haproxy/haproxy.cfg && systemctl reload haproxy

   Each ``grep`` command prints 2, one line for each CA. Don't edit ``nginx.conf`` or ``haproxy.cfg``, because they keep naming the same file.

#. On each Wazuh manager node, one node at a time, install the new CA and the node certificates, and restart the Wazuh manager:

   .. code-block:: console

      # install -m 0644 -o root -g root /root/new-root-ca.pem /etc/wazuh-manager/ca/root-ca.pem
      # rm -f /etc/wazuh-manager/ca/root-ca.key /etc/wazuh-manager/ca/.wazuh-manager-bootstrap-ca
      # install -m 0640 -o root -g wazuh-manager /root/<NODE_NAME>-remoted.pem /etc/wazuh-manager/certs/remoted.pem
      # install -m 0640 -o root -g wazuh-manager /root/<NODE_NAME>-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
      # install -m 0640 -o root -g wazuh-manager /root/<NODE_NAME>-apid.pem /etc/wazuh-manager/certs/apid.pem
      # install -m 0640 -o root -g wazuh-manager /root/<NODE_NAME>-apid-key.pem /etc/wazuh-manager/certs/apid-key.pem
      # /var/wazuh-manager/bin/wazuh-manager-control check && systemctl restart wazuh-manager

   -  Replace ``<NODE_NAME>`` with the ``name`` value of the node in ``config.yml``.
   -  The ``rm`` command removes ``root-ca.key`` and the ``.wazuh-manager-bootstrap-ca`` marker when the node kept them from a CA that it created itself. The Wazuh manager refuses to start when ``root-ca.key`` doesn't match the new ``root-ca.pem``.
   -  The ``check`` action validates the new files first, so a wrong file stops the command before the node goes down. Use ``restart``, not ``reload``, because the agent listener loads its certificate only at start.

#. After the master node restarts, update each Wazuh dashboard that runs on another endpoint. Copy ``/etc/wazuh-manager/export/ca.pem`` from the master node to the Wazuh dashboard as ``/root/manager-ca.pem``, and install it:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-dashboard /root/manager-ca.pem /etc/wazuh-dashboard/certs/manager-ca.pem
      # rm -f /root/manager-ca.pem
      # systemctl restart wazuh-dashboard

#. If a load balancer terminates TLS, replace its certificate with the new pair from step 1, and reload it. Copy ``lb.pem`` and ``lb-key.pem`` from step 1 to the load balancer, and run the commands for your load balancer in the directory that holds them. The commands overwrite the old certificate files.

   **NGINX:**

   .. code-block:: console

      # install -m 0644 lb.pem /etc/nginx/certs/lb.pem
      # install -m 0600 lb-key.pem /etc/nginx/certs/lb-key.pem
      # rm -f lb.pem lb-key.pem
      # nginx -t && nginx -s reload

   **HAProxy:** build ``lb-combined.pem`` again from the new pair:

   .. code-block:: console

      # cat lb.pem lb-key.pem > lb-combined.pem
      # install -m 0640 -o root -g haproxy lb-combined.pem /etc/haproxy/certs/lb-combined.pem
      # rm -f lb.pem lb-key.pem lb-combined.pem
      # haproxy -c -f /etc/haproxy/haproxy.cfg && systemctl reload haproxy

   If the load balancer entry in ``config.yml`` has another name, use that name instead of ``lb`` in the file names.

#. On each Wazuh manager node, check that it serves a certificate from the new CA:

   .. code-block:: console

      # openssl verify -CAfile /root/new-root-ca.pem /etc/wazuh-manager/certs/remoted.pem

   The command prints ``/etc/wazuh-manager/certs/remoted.pem: OK``.

#. On the master node, remove the old CA from the bundle.

   .. warning::

      Once agents download this bundle, they trust only the new CA. Finish steps 7 to 10 on every node and load balancer first. A node that still serves an old certificate answers ``503 ca_mismatch`` to agent bundle requests, and a load balancer with an old certificate fails TLS for every agent.

   Find the identity of the old CA:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs inspect

   The new CA shows ``signsLeaf: yes``, and the old CA shows ``signsLeaf: no``. Remove the old CA:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs remove "<OLD_CA_IDENTITY>"

   Replace ``<OLD_CA_IDENTITY>`` with the ``identity`` value of the CA that shows ``signsLeaf: no``, in the form ``x509-sha256:<HEX>``.

#. On each worker node, download the bundle again and validate it:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs --from-master
      # /var/wazuh-manager/bin/wazuh-manager-certs check

   The ``check`` command prints nothing when the bundle is valid. Agents download the new bundle on their own, and then trust only the new CA.

#. Remove the copied files. On each Wazuh manager node, run:

   .. code-block:: console

      # rm -f /root/new-root-ca.pem /root/<NODE_NAME>-remoted.pem /root/<NODE_NAME>-remoted-key.pem /root/<NODE_NAME>-apid.pem /root/<NODE_NAME>-apid-key.pem

   On each load balancer and Wazuh dashboard, also remove ``/root/new-root-ca.pem``. On the endpoint of the new root CA, remove the ``~/certs-tool/wazuh-certificates/`` directory, because it holds the private keys of every node.

#. Replace the enrollment tokens that you created before step 7. A token pins the CA that signed the master node certificate when you created it, so older tokens stop working. On the master node, create new tokens, then list and revoke the old ones:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address "<ADDRESS>"
      # /var/wazuh-manager/bin/wazuh-manager-authd --list-enrollment-tokens
      # /var/wazuh-manager/bin/wazuh-manager-authd --revoke-enrollment-token "<TOKEN_ID>"

Replace ``<ADDRESS>`` with the address that agents connect to, and ``<TOKEN_ID>`` with the value in the ``ID`` column for each old token.

