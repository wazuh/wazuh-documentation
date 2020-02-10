.. Copyright (C) 2019 Wazuh, Inc.

.. _agent-verification-registration:

Registration with Agent verification
====================================

To verify the Wazuh agent using an SSL, we will create an SSL certificate for the agent and sign it using :ref:`Certificate of Authority (CA) <host-verification-registration>` created in the previous section. This will allow the manager to ensure that the correct agent is beeing connected during the registration service.

  .. image:: ../../../images/manual/managing-agents/SSLregister2.png
    :align: center
    :width: 100%

To register verified by SSL agent first complete the steps for the chosen verification method in a **Manager** section and then, follow the steps for the corresponding **Agent** host OS.

Manager
^^^^^^^

.. _agent-verification-without-host-validation:

Enable Agent verification without host validation
-------------------------------------------------

In this example, we will create a certificate for agents without specifying their hostname or IP address. This will allow us to share the same certificate among all selected agents. The signed certificate will verify the agent. Registration service for agents where the certificate is not present will be refused.

1. Issue and sign a certificate for the agent by executing the following commands in the location of CA files. Remember that we will not enter the ``common name`` field:

   .. code-block:: console

    # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch
    # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

2. Copy the CA (``.pem`` file) to the ``/var/ossec/etc`` folder:

   .. code-block:: console

    # cp rootCA.pem /var/ossec/etc

3. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. Uncomment the ``<auth><ssl_agent_ca>`` section and add the path to the ``CA`` file.

   .. code-block:: xml

    <auth>
      ...
      <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
      ...
    </client>

4. Restart the manager:

   a) For Systemd:

   .. code-block:: console

    # systemctl restart wazuh-manager

   b) For SysV Init:

   .. code-block:: console

    # service wazuh-manager restart

.. _agent-verification-with-host-validation:

Enable Agent verification with host validation
----------------------------------------------

This is an alternative method to the previous one. In this case, we will bind the agent's certificate to its IP address as seen by the manager.

1. Issue and sign a certificate for the agent by executing the following commands in the location of ``CA`` files. In the ``common name`` field replace ``<AGENT_IP>`` with the agent's hostname or IP address.

   .. code-block:: console

    # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=<AGENT_IP>'
    # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

2. Copy the CA (**.pem file**) to the ``/var/ossec/etc`` folder:

   .. code-block:: console

    # cp rootCA.pem /var/ossec/etc

3. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. Uncomment the ``<auth><ssl_agent_ca>`` section and add the path to the ``CA`` file. Set the field ``<ssl_verify_host>`` to ``yes``:

   .. code-block:: xml

    <auth>
      ...
      <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
      <ssl_verify_host>yes</ssl_verify_host>
      ...
    </client>

4. Restart the manager:

   a) For Systemd:

   .. code-block:: console

      # systemctl restart wazuh-manager

   b) For SysV Init:

   .. code-block:: console

      # service wazuh-manager restart

Agent
^^^^^

Once you have completed the manager section, you need to copy the newly created certificate (``.cert`` file) and its key (``.key`` file) to the agent. In this example, the certificate file is ``sslagent.cert`` and the key is ``sslagent.key``. After that, follow the steps to connect the agent to the manager:

.. toctree::
    :maxdepth: 5

    agents/linux-unix-agent-verification
    agents/windows-agent-verification
    agents/macos-agent-verification
