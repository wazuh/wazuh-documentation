
.. _ossec-authd:

ossec-authd
===========

The ossec-authd daemon will automatically add an agent to a Wazuh manager and provide the key to the agent. The :ref:`agent-auth` application is the client application used with ``ossec-authd``.
``ossec-authd`` will create an agent with an ip address of any instead of using its actual IP.

.. warning::

    By default there is no authentication or authorization involved in this transaction, so it is recommended that
    this daemon only be run when a new agent is being added.


+----------------------------+-------------------------------------------------------------------------------+
| Options                    | Descriptions                                                                  |
+============================+===============================================================================+
| :ref:`-D <authd-directory>`| Chroot to a directory                                                         |
+----------------------------+-------------------------------------------------------------------------------+
| :ref:`-d <authd-debug>`    | Run in debug mode                                                             |
+----------------------------+-------------------------------------------------------------------------------+
| `-f`_                      | Remove old agents with the same IP if they were not connected since <seconds>.|
+----------------------------+-------------------------------------------------------------------------------+
| `-g`_                      | Run as a group                                                                |
+----------------------------+-------------------------------------------------------------------------------+
| `-h`_                      | Display the help message                                                      |
+----------------------------+-------------------------------------------------------------------------------+
| `-i`_                      | Register agent with client's IP instead of *any*.                             |
+----------------------------+-------------------------------------------------------------------------------+
| `-k`_                      | Full path to the server key                                                   |
+----------------------------+-------------------------------------------------------------------------------+
| :ref:`-P <authd-password>` | Enable shared password authentication.                                        |
+----------------------------+-------------------------------------------------------------------------------+
| :ref:`-p <authd-port>`     | Listen on port                                                                |
+----------------------------+-------------------------------------------------------------------------------+
| `-t`_                      | Test the configuration                                                        |
+----------------------------+-------------------------------------------------------------------------------+
| :ref:`-V <authd-version>`  | Version and license information                                               |
+----------------------------+-------------------------------------------------------------------------------+
| :ref:`-v <authd-ca>`       | Full path to the CA certificate used                                          |
+----------------------------+-------------------------------------------------------------------------------+
| `-x`_                      | Full path to the server certificate                                           |
+----------------------------+-------------------------------------------------------------------------------+

.. _authd-directory:

``-D``
------

Chroot to ``<dir>``.

.. topic:: Arguments

  ``-D <dir>``



.. _authd-debug:

``-d``
------

Execute ``ossec-agentlessd`` in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.

``-f``
------

Remove old agents with the same IP if they were not connected since ``<seconds>``. It has only sense along with option ``-i``.

Option ``-f`` forces the insertion on IP collision, this means that if OSSEC
finds another agent with the same IP, but it has not connected since a
specified time, that agent will be deleted automatically and the new agent will
be added. To force insertion always (regardless of the time of the last agent
connection), use ``-f 0``.

.. topic:: Arguments

  ``-f <seconds>``

``-g``
------

Run as group.

.. topic:: Arguments

  ``-g <group>``

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

  ``-k <path>``

.. _authd-password:

``-P``
------

Enable shared password authentication.

.. _authd-port:

``-p``
------

Listen on port.

.. topic:: Arguments

  ``-p <port>``

.. topic:: Default

  1515

``-t``
------

Test the configuration.


.. _authd-version:

-V
------

Display OSSEC Version and license information.


.. _authd-ca:

-v
------

Full path to the CA certificate used to verify the clients.

.. topic:: Arguments

  ``-v <path>``



``-x``
------

Full path to the server certificate.

.. topic:: Arguments

  ``-x <path>``
