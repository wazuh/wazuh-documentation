
.. _ossec-authd:

ossec-authd
===========

The ossec-authd program will automatically add an agent to a Wazuh manager and provide the key to the agent. The :ref:`agent-auth` application is the client application used with ``ossec-authd``.  ``ossec-authd`` creates an agent with an ip address of "any" instead of using its actual IP.

.. warning::

    By default there is no authentication or authorization involved in this transaction, so it is recommended that this daemon only be run when a new agent is being added.


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

Run in debug mode. This option may be repeated to increase the verbosity of the debug messages.

``-f``
------

Remove old agents with the same IP if they were not connected since ``<seconds>``. This must be used in conjunction with option ``-i``.

Option ``-f`` forces the registration even if the requesting agent's IP address is already registered, in which case the old registration is deleted.  This can include a minimum threshold for time since last check-in by the to-be-deleted registration or the threshold can be set to 0 to always delete/replace. 

.. topic:: Arguments

  ``-f <seconds>``

``-g``
------

Run as a group.

.. topic:: Arguments

  ``-g <group>``

``-h``
------

Display the help message.

``-i``
------

Add agents with a specific IP address.

``-k``
------

Specifies the full path to the server key.

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

Display the version and license information.


.. _authd-ca:

-v
------

Specifies the full path to the CA certificate used to verify clients.

.. topic:: Arguments

  ``-v <path>``



``-x``
------

Specifies the full path to the server certificate.

.. topic:: Arguments

  ``-x <path>``
