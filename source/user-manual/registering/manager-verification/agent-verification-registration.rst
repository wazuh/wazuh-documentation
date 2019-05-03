.. Copyright (C) 2019 Wazuh, Inc.

.. _agent-verification-registration:

Agent verification using SSL
============================

To verify the Wazuh Agents using a SSL, it is needed to create a SSL certificate for the Wazuh Agents and sign it using the Certificate of Authority (CA) created in the previous section. This will allow the Wazuh Manager to verificate the Wazuh Agents while they are been registered.

  .. image:: ../../../images/manual/managing-agents/SSLregister2.png
    :align: center
    :width: 100%

.. _agent-verification-without-host-validation:

Enable Agent verification without host validation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this example, we are going to create a certificate for Wazuh Agents without specifying their hostname. This will allow us to share the certificate among all of our Wazuh Agents and use it. This will verify that the Wazuh Agents have a certificate signed by our CA, no matter where they're connecting from, refusing those agents where the certificate is not present.

1. Issue and sign a certificate for the agent. Note that we will not enter the *common name* field:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch
    # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial


2. Copy the CA (**.pem file**) to the ``/var/ossec/etc`` folder:

  .. code-block:: console

    # cp rootCA.pem /var/ossec/etc

3. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. You will need to modify the ``<auth><ssl_agent_ca>`` section by uncommenting it (remove the ``<!-`` and ``-->``) and by adding the path to the CA file.

  .. code-block:: xml

    <auth>
      ...
      <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
      ...
    </client>

4. Restart the Wazuh Manager: 

  a) For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

.. _agent-verification-with-host-validation:

Enable Agent verification with host validation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is an alternative method to the previous one. In this case, we will bind the agent's certificate to its IP address as seen by the manager.

1. Issue and sign a certificate for the agent, entering its hostname or IP address into the *common name* field. For example, if the agent's IP is ``192.168.1.3``:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=192.168.1.3'
    # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

2. Copy the CA (**.pem file**) to the ``/var/ossec/etc`` folder:

  .. code-block:: console

    # cp rootCA.pem /var/ossec/etc

3. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. You will need to modify the ``<auth><ssl_agent_ca>`` section by uncommenting it (remove the ``<!-`` and ``-->``) and by adding the path to the CA file. You also need to set the field ``<ssl_verify_host>`` to ``yes``:

  .. code-block:: xml

    <auth>
      ...
      <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
      <ssl_verify_host>no</ssl_verify_host>
      ...
    </client>

4. Restart the Wazuh Manager: 

  a) For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart


Wazuh Agents
^^^^^^^^^^^^

Once you have completed the Wazuh Manager section, you need to copy the newly created certificate (``.cert`` file) and its key (``.key`` file) to the agent. In this example, the certificate file is ``sslagent.cert`` and the key is ``sslagent.key``. After that, follow the steps to connect the Wazuh Agent to the manager:

.. toctree::
    :maxdepth: 2
    
    agents/linux-unix-agent-verification
    agents/windows-agent-verification
    agents/macos-agent-verification
