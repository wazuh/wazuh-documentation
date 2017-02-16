
.. _ossec-authd:

ossec-authd
===========

The ossec-authd daemon will automatically add an agent to an OSSEC manager and provide the key to the agent.
The agent-auth application is the client application used with ossec-authd.
ossec-authd will create an agent with an ip address of any instead of using its actual IP.

.. warning::

    By default there is no authentication or authorization involved in this transaction, so it is recommended that
    this daemon only be run when a new agent is being added.


+---------------------------+--------------------------------------+
| Options                   | Descriptions                         |
+===========================+======================================+
| `-D <#authd-directory>`__ | Chroot to a directory                |
+---------------------------+--------------------------------------+
| `-d <#authd-debug>`__     | Run in debug mode                    |
+---------------------------+--------------------------------------+
| `-g`_                     | Run as a group                       |
+---------------------------+--------------------------------------+
| `-h`_                     | Display the help message             |
+---------------------------+--------------------------------------+
| `-i`_                     | Add agents using an IP               |
+---------------------------+--------------------------------------+
| `-k`_                     | Full path to the server key          |
+---------------------------+--------------------------------------+
| `-p`_                     | Listen on port                       |
+---------------------------+--------------------------------------+
| `-t`_                     | Test the configuration               |
+---------------------------+--------------------------------------+
| `-V <#authd-version>`__   | Version and license information      |
+---------------------------+--------------------------------------+
| `-v <#authd-ca>`__        | Full path to the CA certificate used |
+---------------------------+--------------------------------------+
| `-x`_                     | Full path to the server certificate  |
+---------------------------+--------------------------------------+

.. _authd-directory:

``-D``
------

Chroot to <dir>.

.. topic:: Arguments

  -D <dir>



.. _authd-debug:

``-d``
------

Execute ossec-agentlessd in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.


``-g``
------

Run as group.

.. topic:: Arguments

  -g <group>

``-h``
------

Display a help message.

``-i``
------

Add agents with a specific IP address.

``-k``
------

Full path to the server key.

.. topic:: Arguments

  -k <path>


``-p``
------

Listen on port.

.. topic:: Arguments

  -p <port>

.. topic:: Default

  1515

``-t``
------

Test the configuration.


.. _authd-version:

``-V``
------

Display OSSEC Version and license information.


.. _authd-ca:

``-v``
------

Full path to the CA certificate used to verify the clients.

.. topic:: Arguments

  -v <path>



``-x``
------

Full path to the server certificate.

.. topic:: Arguments

  -x <path>
