
.. _agent-auth:

agent-auth
=============

The agent-auth program is the client application used with :ref:`ossec-authd` to automatically add agents to an Wazuh manager.

.. warning::

    By default there is no authentication or authorization involved in this transaction, so it is recommended that
    this daemon only be run when a new agent is being added.


+--------------------------+--------------------------------------+
| Options                  | Descriptions                         |
+==========================+======================================+
| `-A`_                    | Agent name to be used                |
+--------------------------+--------------------------------------+
| `-D <#auth-directory>`__ | Directory where Wazuh is installed   |
+--------------------------+--------------------------------------+
| `-d <#auth-debug>`__     | Run in debug mode                    |
+--------------------------+--------------------------------------+
| `-g`_                    | Run as a group                       |
+--------------------------+--------------------------------------+
| `-h`_                    | Display the help message             |
+--------------------------+--------------------------------------+
| `-k`_                    | Full path to the agent key           |
+--------------------------+--------------------------------------+
| `-m`_                    | IP address of the manager            |
+--------------------------+--------------------------------------+
| `-p`_                    | Port where is running on             |
+--------------------------+--------------------------------------+
| `-V <#auth-version>`__   | Version and license information      |
+--------------------------+--------------------------------------+
| `-v <#auth-ca>`__        | Full path to the CA certificate used |
+--------------------------+--------------------------------------+
| `-x`_                    | Full path to the agent certificate   |
+--------------------------+--------------------------------------+


``-A``
------

Agent name to be used.

.. topic:: Arguments

  -A ``<agent_name>``

.. topic:: Default

  hostname

.. _auth-directory:

``-D``
------

Directory where OSSEC is installed.

.. topic:: Default

  ``/var/ossec``

.. _auth-debug:

``-d``
------

Execute agent-auth in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-g``
------

Run as ``<group>``.

.. topic:: Arguments

  -g ``<group>``

``-h``
------

Display the help message

``-k``
------

Full path to the agent key.

.. topic:: Arguments

  -k ``<path>``

``-m``
------

IP address of the manager.

.. topic:: Arguments

  -m ``<manager_ip>``


``-p``
------

Port ossec-authd is running on.

.. topic:: Arguments

  -p ``<port>``

.. topic:: Default

  1515

.. _auth-version:

``-V``
------

Display OSSEC Version and license information.

.. _auth-ca:

``-v``
------

Full path to the CA certificate used to verify the server.

.. topic:: Arguments

  -v ``<path>``

``-x``
------

Full path to the agent certificate.

.. topic:: Arguments

  -x ``<path>``
