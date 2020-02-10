.. Copyright (C) 2019 Wazuh, Inc.

.. _password-authorization-registration-service:

Registering agents using registration service with password authorization
-------------------------------------------------------------------------

This registration method is similar to ``Simple registration service`` except that it allows additional protection of the manager from unauthorized registrations by using a password.

To register the agent follow the instructions in the **Manager** section and then select the corresponding section for the agent's operating system.

Manager
^^^^^^^

To enable password authorization, in ``/var/ossec/etc/ossec.conf`` file, in ``<auth><use_password>`` section, set the value to ``yes``.

   .. code-block:: xml

     <auth>
       ...
       <use_password>yes</use_password>
       ...
     </auth>

You can choose your password or let the registration service generate one for you.

.. note::
  In this example, the custom password to register the Wazuh agent is ``TopSecret``.

a) **Using a custom password**: create ``/var/ossec/etc/authd.pass`` file and save your custom password in it:

   .. code-block:: console

     # echo "TopSecret" > /var/ossec/etc/authd.pass

b) **Using a random password**: if no password is specified in ``/var/ossec/etc/authd.pass``, the registration service will create a random password. You can find the password in ``/var/ossec/logs/ossec.log`` by exectuting the following command:

   .. code-block:: console

     # grep "Random password" /var/ossec/logs/ossec.log
       2019/04/25 15:09:50 ossec-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 3027022fa85bb4c697dc0ed8274a4554


Restart the Wazuh manager for the changes to take effect:

a) For Systemd:

   .. code-block:: console

     # systemctl start wazuh-manager

b) For SysV Init:

   .. code-block:: console

     # service wazuh-manager start

Agents
^^^^^^

Now, follow the instructions to register the agent depending on the OS of the host:

.. toctree::
    :maxdepth: 1

    password/linux-unix-password-registration
    password/windows-password-registration
    password/macos-password-registration
