.. Copyright (C) 2019 Wazuh, Inc.

.. _manager-verification-registration:

Manager verification using SSL
==============================

To verify the manager using a SSL, it is needed to create a SSL certificate for the Wazuh Manager and sign it using the Certificate of Authority (CA) created in the previous section. This will allow the agents to verificate the Wazuh Manager while they are been registered.

  .. image:: ../../../images/manual/managing-agents/SSLregister1.png
    :align: center
    :width: 100%

In this example, we are going to create a certificate for a Wazuh Manager, whose IP address is ``192.168.1.2``. 

Wazuh Manager
^^^^^^^^^^^^^

Follow these stes in the Wazuh Manager:

1. Issue and sign a certificate for the manager. You can enter the hostname or the IP address of the Wazuh Manager where the agents are going to be registerd. In this case, the Wazuh Manager IP is ``192.168.1.2``:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -subj '/C=US/CN=192.168.1.2'
    # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial

2. Copy the newly created certificate and its key to the ``/var/ossec/etc`` folder:

  .. code-block:: console

    # cp sslmanager.cert sslmanager.key /var/ossec/etc
    # /var/ossec/bin/ossec-authd

3. Restart the Wazuh Manager: 

  a) For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

Wazuh Agents
^^^^^^^^^^^^

Once you have completed the Wazuh Manager section, you need to copy the CA file (``.pem``) to the agent. In this example, the CA file is ``rootCA.pem``. After that, follow the steps to connect the Wazuh Agent to the manager:

.. toctree::
    :maxdepth: 2
    
    agents/linux-unix-manager-verification
    agents/windows-manager-verification
    agents/macos-manager-verification
