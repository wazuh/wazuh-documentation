.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about certificates deployment in this section of the Wazuh user manual.

Certificates deployment
=======================

SSL certificates are required to secure communication between Wazuh components and verify the identity of participating nodes. The Wazuh certificates tool is a utility that automates the generation of the SSL/TLS certificates required for a Wazuh deployment, including the root Certificate Authority (CA), node certificates, and administrative certificates. The :ref:`installation guide <installation_guide>` uses the Wazuh certificates tool to create certificates, but any certificate generation method, such as `OpenSSL <https://www.openssl.org/>`__, can be used.

Download the `Wazuh certificates tool <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh>`__ and save it as ``wazuh-certs-tool.sh`` in a working directory.

There are three kinds of certificates needed for the installation:

-  root-ca: This certificate is the one in charge of signing the rest of the certificates.

-  node: The node certificates are the ones needed for every Wazuh indexer node. They must include the node IP address.

-  admin: The admin certificate is a client certificate with special privileges needed for management and security-related tasks.

The node and admin certificates are created with the following additional information. The root CA has only the L, O, and OU values:

-  C: US

-  L: California

-  O: Wazuh

-  OU: Wazuh

-  CN: Name of the node


Save the ``config.yml`` template in the same directory as ``wazuh-certs-tool.sh``, because the tool reads config.yml from its own directory. Edit ``config.yml`` and replace the node names and IP values with the corresponding names and IP addresses to create the SSL certificates. The ``<indexer-node-ip>``, ``<wazuh-manager-ip>``, and ``<dashboard-node-ip>`` values can be either IP addresses or DNS names. The Wazuh ``config.yml`` template can be downloaded `here <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yml>`__.

.. code-block:: yaml
   :emphasize-lines: 5,7,9,16,19,22,28

   nodes:
     # Wazuh indexer nodes
     indexer:
       - name: node-1
         ip: "<indexer-node-ip>"
       #- name: node-2
       #  ip: "<indexer-node-ip>"
       #- name: node-3
       #  ip: "<indexer-node-ip>"

     # Wazuh manager nodes
     # If there is more than one Wazuh manager
     # node, each one must have a node_type
     manager:
       - name: wazuh-1
         ip: "<wazuh-manager-ip>"
       #  node_type: master
       #- name: wazuh-2
       #  ip: "<wazuh-manager-ip>"
       #  node_type: worker
       #- name: wazuh-3
       #  ip: "<wazuh-manager-ip>"
       #  node_type: worker

     # Wazuh dashboard nodes
     dashboard:
       - name: dashboard
         ip: "<dashboard-node-ip>"


Run the ``wazuh-certs-tool.sh`` script with the option ``-A`` to generate all the certificates after configuring the ``config.yml`` file.

    .. code-block:: console

        # bash wazuh-certs-tool.sh -A

After running the script, the directory ``wazuh-certificates`` will be created and will have the following content:

    .. code-block:: none

        wazuh-certificates/
        ├── admin-key.pem
        ├── admin.pem
        ├── dashboard-key.pem
        ├── dashboard.pem
        ├── node-1-key.pem
        ├── node-1.pem
        ├── root-ca.pem
        ├── wazuh-1-apid-key.pem
        ├── wazuh-1-apid.pem
        ├── wazuh-1-key.pem
        ├── wazuh-1-remoted-key.pem
        ├── wazuh-1-remoted.pem
        └── wazuh-1.pem

The script also creates a ``wazuh-ca`` directory next to it, with the root CA certificate and its key. Back up this directory: you need it to add nodes or renew certificates.

Additionally, this script allows the use of a pre-existing rootCA certificate. To use it, place ``root-ca.pem`` and ``root-ca.key`` in the ``wazuh-ca`` directory next to the script, then run the script with option ``-A``. The script reads the root CA from that directory, or from the directory set in ``WAZUH_CA_DIR``:

    .. code-block:: console

       # install -d -m 0700 -o root -g root wazuh-ca
       # install -m 0644 -o root -g root /path/to/root-ca.pem wazuh-ca/root-ca.pem
       # install -m 0400 -o root -g root /path/to/root-ca.key wazuh-ca/root-ca.key
       # bash wazuh-certs-tool.sh -A

After running the script, the directory wazuh-certificates will be created and will have the following content:

    .. code-block:: none

        wazuh-certificates/
        ├── admin-key.pem
        ├── admin.pem
        ├── dashboard-key.pem
        ├── dashboard.pem
        ├── node-1-key.pem
        ├── node-1.pem
        ├── root-ca.pem
        ├── wazuh-1-apid-key.pem
        ├── wazuh-1-apid.pem
        ├── wazuh-1-key.pem
        ├── wazuh-1-remoted-key.pem
        ├── wazuh-1-remoted.pem
        └── wazuh-1.pem

The Wazuh dashboard certificate
-------------------------------

The Wazuh dashboard does not need the Wazuh certificates tool. At installation, it creates its own certificate authority (CA) and issues the certificate it serves to browsers. The files are in ``/etc/wazuh-dashboard``:

-  ``ca/root-ca.pem`` and ``ca/root-ca.key``: the Wazuh dashboard CA. Only root can read this directory.
-  ``export/ca.pem``: a copy of the Wazuh dashboard CA certificate. Import it into your browsers to trust the Wazuh dashboard.
-  ``certs/dashboard.pem`` and ``certs/dashboard-key.pem``: the certificate and key that the Wazuh dashboard serves.
-  ``certs/indexer-ca.pem`` and ``certs/manager-ca.pem``: the CA certificates that the Wazuh dashboard uses to verify the Wazuh indexer and the Wazuh manager API.

Every file that the Wazuh dashboard reads must be owned by root, must not be writable by group or others, and must not be a symbolic link. The ``certs`` directory and its files belong to the ``wazuh-dashboard group``, with modes ``0750`` and ``0640``. Otherwise, the Wazuh dashboard does not start.

Issuing a new Wazuh dashboard certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The certificate includes the host name and the IP addresses of the host, plus ``localhost``, ``127.0.0.1``, and ``::1``. To set other names or addresses, add the following line to ``/etc/wazuh-dashboard/local.env``. The list replaces the host name and the IP addresses, so include every name and address in use. The certificate always keeps ``localhost``, ``127.0.0.1``, and ``::1``. If the file does not exist, create it owned by root with mode ``0600``.

.. code-block:: ini

   WAZUH_DASHBOARD_CERT_SANS=<DNS_NAME>,<IP_ADDRESS>

Replace ``<DNS_NAME>`` and ``<IP_ADDRESS>`` with the names and addresses that users reach the Wazuh dashboard at, separated by commas. Then remove the current certificate, issue a new one, and restart the Wazuh dashboard:

.. code-block:: console

   # rm /etc/wazuh-dashboard/certs/dashboard.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
   # /usr/share/wazuh-dashboard/bin/resolve-credentials --install
   # systemctl restart wazuh-dashboard

.. toctree::
   :maxdepth: 2

   configuring-third-party-certs/index