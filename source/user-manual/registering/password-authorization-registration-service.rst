.. Copyright (C) 2019 Wazuh, Inc.

.. _password-authorization-registration-service:

Using the registration service with password authorization
==========================================================

You can protect the manager from unauthorized registrations by using a password. Choose one by yourself, or let the registration service generate a random password. To register an agent using the registration service and a password, first follow the steps from the **Manager** section and then, follow the steps from the correspondig OS.

Manager
^^^^^^^

To allow this option, change the value to *yes* in the ``/var/ossec/etc/ossec.conf`` file:

    .. code-block:: xml

      <auth>
        ...
        <use_password>yes</use_password>
        ...
      </auth>

After changing the ``ossec.conf`` file, you can use a custom password or let the registration process to generate a random password:

  a) **Using a custom password**: create this file ``/var/ossec/etc/authd.pass`` and write in it your custom password. For example, if we want to use *TopSecret* as a password:

    .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass

  b) **Using a random password**: If no password is specified on ``/var/ossec/etc/authd.pass``, the registration service will create a random password. You can find the password in ``/var/ossec/logs/ossec.log``.

    .. code-block:: console

      # grep "Random password" /var/ossec/logs/ossec.log 
        2019/04/25 15:09:50 ossec-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 3027022fa85bb4c697dc0ed8274a4554


To enable this changes, you need to **restart** the Wazuh Manager:

  a) For Systemd:

    .. code-block:: console

      # systemctl start wazuh-agent

  b) For SysV Init:

    .. code-block:: console

      # service wazuh-agent start

.. note::
    In this example, the password to registering the Wazuh Agent is *TopSecret*.

Agents
^^^^^^

Now, follow the instructions to register the agent depending on the OS of the host:

.. toctree::
    :maxdepth: 2

    password/linux-unix-password-registration
    password/windows-password-registration
    password/macos-password-registration
