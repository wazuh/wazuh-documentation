.. Copyright (C) 2019 Wazuh, Inc.

.. _simple-registration-service:

Using the simple registration service
=====================================

This is the easiest method to register agents. It doesn't require any kind of authorization or host verification. If the ``openssl`` package is installed before installing the wazuh-manager package, the package will create the certificate and key needed to run the authentication process: ``ossec-authd``.

.. topic:: Simple registration method in Wazuh Agents

    .. toctree::
        :maxdepth: 2
        
        linux-unix-simple-registration
        windows-simple-registration
        macos-simple-registration
      