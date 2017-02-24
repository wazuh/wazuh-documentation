.. _configuring_agentless:

Configuring agentless
======================

Connection
^^^^^^^^^^

First of all, once you have installed OSSEC, in your server; it needs to enable agentless monitoring:

.. code-block:: console

  /var/ossec/bin/ossec-control enable agentless


In order to connect our server with the host using SSH authentication, we should use the script: ``register_host.sh``, located in: /var/ossec/agentless/
This script has two options: ``list``  and ``add``.

Using the ``list`` option, we will get all the available host already added.

.. code-block:: console

  /var/ossec/agentless/register_host.sh list

The option ``add`` is used to connect the host to the server. If instead of a password, you want to use a public key authentication, you have to use: ``NOPASS`` as
the password when you are adding the new host. For Cisco devices such as routers or firewalls for example, you should add the parameter: ``enablepass`` to enable the password.

.. code-block:: console

  /var/ossec/agentless/register_host.sh add root@example_adress.com example_password [enablepass]

If you want to use a public key authentication you can use the below command:

.. code-block:: console

  sudo -u ossec ssh-keygen

Once it is created, you have to copy the public key in the remote host.

Configuring ossec.conf
^^^^^^^^^^^^^^^^^^^^^^

After add our hosts in the system, we need to configure the server to monitor them. There are more configuration details, about how configure ossec.conf, in the :ref:`agentless <reference_ossec_agentless>` section.

There are 4  different agentless types.

ssh_integrity_check_bsd
~~~~~~~~~~~~~~~~~~~~~~~~~~~

With this option you give a list of directories in where OSSEC will do the integrity checking of the remote host.

ssh_integrity_check_linux
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As with ssh_integrity_check_bsd, in this option, you give a list of directories in where OSSEC will do the integrity checking of the remote host.

ssh_generic_diff
~~~~~~~~~~~~~~~~~~~~

When you use it, you give a set of commands to run on the remote host in order to alert if the output of their execution, changes.

ssh_pixconfig_diff
~~~~~~~~~~~~~~~~~~~~~~

This option will alert when a Cisco PIX or router configuration changes.

An example of ssh_generic_diff could be:

.. code-block:: xml

  <agentless>
    <type>ssh_generic_diff</type>
    <frequency>86400</frequency>
    <host>root@example_adress.com</host>
    <state>periodic_diff</state>
    <arguments>ls -la /bin; cat /etc/sbin</arguments>
  </agentless>

.. note::

  To use ``su`` in a command as an argument, you have to set: ``use_su`` before the hostname. In the example before will be: host>use_su root@example_adress.com</host>

Checking the setup
^^^^^^^^^^^^^^^^^^

Finally we should ensure that we have installed in our server the expect library which is necessary.

After installing expect library we should restart OSSEC and
in the /var/ossec/logs/ossec.log we could see:

.. code-block:: xml

  ossec-agentlessd: INFO: Test passed for 'ssh_integrity_check_linux'.

And also, when OSSEC connect with the remote host, we could see:

.. code-block:: xml

  ossec-agentlessd: INFO: ssh_integrity_check_linux: root@example_adress.com: Starting.
  ossec-agentlessd: INFO: ssh_integrity_check_linux: root@example_adress.com: Finished.
