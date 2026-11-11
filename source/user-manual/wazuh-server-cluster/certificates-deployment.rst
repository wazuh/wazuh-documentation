.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the nodes of a Wazuh manager cluster get their certificates from one CA, and how to stage your own certificates.

Certificates deployment
=======================

Each node of a Wazuh manager cluster uses the following certificates, in ``/etc/wazuh-manager/certs/``:

-  ``remoted.pem`` and ``remoted-key.pem``: the agent listener certificate, which Wazuh agents verify on ports 1517 and 1515.
-  ``apid.pem`` and ``apid-key.pem``: the Wazuh manager API certificate. Only the master node runs the Wazuh manager API.
-  ``root-ca.pem``: the CA bundle the node serves to the Wazuh agents.
-  ``indexer-ca.pem``, ``indexer-connector.pem`` and ``indexer-connector-key.pem``: the Wazuh indexer CA, and the client certificate this node presents to the Wazuh indexer. The Wazuh indexer CA issues this certificate for each node.

The cluster doesn't synchronize these files. Each node gets its own at installation.

One CA for every node
---------------------

The Wazuh manager package issues the agent listener and Wazuh manager API certificates from the Wazuh manager CA in ``/etc/wazuh-manager/ca/``. When that directory is empty, the package creates a new CA, which only that node uses. A Wazuh agent trusts one CA, so a node with a CA of its own presents a certificate that agents of the other nodes don't trust.

To give every node certificates from one CA, install the master node first. Then copy its ``/etc/wazuh-manager/ca/root-ca.pem`` and ``root-ca.key`` to each worker node before you install the package there, as described in :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>`.

The agent listener certificate of each node must include the addresses Wazuh agents use to reach it. Behind a load balancer, include the load balancer name or address too. Set them in ``WAZUH_MANAGER_REMOTED_CERT_SANS`` in ``/etc/wazuh-manager/local.env`` before you install the node. See :ref:`Subject alternative names <wazuh_manager_credentials_sans>`.

Check a node's agent listener certificate:

.. code-block:: console

   # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem
   # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

The first command prints ``/etc/wazuh-manager/certs/remoted.pem: OK``. The second lists the addresses in the certificate. Run them on every node, and compare the CA of each node:

.. code-block:: console

   # openssl x509 -in /etc/wazuh-manager/ca/root-ca.pem -noout -fingerprint -sha256

Every node must print the same fingerprint.

Recovering a node that created its own CA
-----------------------------------------

If a worker node was installed without the master node's CA, it created its own. Replace it with the master node's CA and issue the node's certificates again:

#. Stop the Wazuh manager on the worker node:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Remove the node's certificates, its CA bundle, and its CA, including the marker of the CA it created:

   .. code-block:: console

      # rm -f /etc/wazuh-manager/certs/remoted.pem /etc/wazuh-manager/certs/remoted-key.pem
      # rm -f /etc/wazuh-manager/certs/apid.pem /etc/wazuh-manager/certs/apid-key.pem
      # rm -f /etc/wazuh-manager/certs/root-ca.pem
      # rm -f /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/ca/root-ca.key /etc/wazuh-manager/ca/.wazuh-manager-bootstrap-ca

#. Place the master node's CA in ``/etc/wazuh-manager/ca/``, as described in :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>`, and issue the certificates again:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install

   The command also writes the CA bundle for the Wazuh agents, ``/etc/wazuh-manager/certs/root-ca.pem``, as a copy of the master node's CA.

#. If you changed the master node's bundle with ``wazuh-manager-certs``, for example during a CA rotation, get it on this node. Skip this step otherwise: the command refuses a bundle the master node never published:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs --from-master

#. Start the Wazuh manager:

   .. code-block:: console

      # systemctl start wazuh-manager

Using your own PKI
------------------

To use certificates from your own CA, stage them on every node instead:

-  The CA certificate as ``/etc/wazuh-manager/ca/root-ca.pem``. Add its key, ``root-ca.key``, only if you want the package to issue the node's certificates.
-  The agent listener and Wazuh manager API certificates and their keys in ``/etc/wazuh-manager/certs/``, with owner ``root:wazuh-manager`` and mode ``0640``.
-  The CA bundle for the Wazuh agents as ``/etc/wazuh-manager/certs/root-ca.pem``.

Stage the CA before you install the package, and the files in ``certs/`` after you install it and before the first start. See :doc:`Credentials and certificates </user-manual/manager/credentials>` for the requirements of each file.

To replace the CA of a running cluster, follow :ref:`Rotating the CA <wazuh_manager_certs>`.
