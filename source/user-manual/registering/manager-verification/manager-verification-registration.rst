.. Copyright (C) 2019 Wazuh, Inc.

.. _manager-verification-registration:

Manager verification using SSL
==============================

To verify the manager using SSL, it is needed to create a SSL certificate for the Wazuh manager and sign it using the Certificate of Authority (CA) created in the previous section. This will allow the agents to verificate the Wazuh manager while they are been registered.

  .. thumbnail:: ../../../images/manual/managing-agents/SSLregister1.png
    :align: center

In this example, we are going to create a certificate for a Wazuh manager, whose IP address is ``192.168.1.2``.

Wazuh manager
^^^^^^^^^^^^^

Follow these steps in the Wazuh server:

1. Create a configuration file and name it ``req.conf``. You can enter the hostname or the IP address of the Wazuh server where the agents are going to be registered. In this case, the Wazuh server IP is ``192.168.1.2``. The content of the configuration file could be as follows:

  .. code-block:: pkgconfig

    [req]
    distinguished_name = req_distinguished_name
    req_extensions = req_ext
    prompt = no
    [req_distinguished_name]
    C = US
    CN = 192.168.1.2
    [req_ext]
    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = wazuh
    DNS.2 = wazuh.com

  .. note:: The ``subjectAltName`` extension is optional but necessary to allow the registration of Wazuh agents with a SAN certificate. In this case, the Wazuh server DNS are ``wazuh`` and ``wazuh.com``.

2. Issue and sign a certificate for the manager:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -config req.conf
    # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial -extfile req.conf -extensions req_ext

  .. note:: The ``-extfile`` and ``-extensions`` options are required to copy the subject and the extensions from ``sslmanager.csr`` to ``sslmanager.cert``. This will allow the registration of Wazuh agents with a SAN certificate.

3. Copy the newly created certificate and its key to the ``/var/ossec/etc`` folder:

  .. code-block:: console

    # cp sslmanager.cert sslmanager.key /var/ossec/etc

4. Restart the Wazuh manager:

  a) For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

Wazuh agents
^^^^^^^^^^^^

Once you have completed the Wazuh manager section, you need to copy the CA file (``.pem``) to the agent. In this example, the CA file is ``rootCA.pem``. After that, follow the steps to connect the Wazuh agent to the manager:

.. toctree::
    :maxdepth: 2

    agents/linux-unix-manager-verification
    agents/windows-manager-verification
    agents/macos-manager-verification
