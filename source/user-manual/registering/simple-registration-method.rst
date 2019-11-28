.. Copyright (C) 2019 Wazuh, Inc.

.. _simple-registration-service:

Using the simple registration service
=====================================

This is the easiest method to register agents. It doesn’t require any kind of authorization or host verification. If the ``OpenSSL`` package is installed before installing the manager, the package will create the certificate and key needed to run the authentication process called ``ossec-authd``. This certificate and key can be found on the manager in ``/var/ossec/etc/sslmanager.cert`` and
``/var/ossec/etc/sslmanager.key``.

The ``ossec-authd`` service is used to obtain a unique key, one per each agent, which allows to authenticate with the Wazuh communication service and to encrypt traffic. The communication is done over TLS protocol.
The ``agent-auth`` program is the client application used along with ``ossec-authd`` to automatically add agent to the manager.

Registering the Agents
^^^^^^^^^^^^^^^^^^^^^^

    .. toctree::
        :maxdepth: 1

        linux-unix-simple-registration
        windows-simple-registration
        macos-simple-registration
