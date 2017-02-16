
.. _ossec-control:

ossec-control
=============

It is a script to start, stop, configure, or check on the status of OSSEC processes.
ossc-control can enable or disable client-syslog, database logging, agentless configurations, and debug mode.

+------------+---------------------------------------------+
| Options    | Descriptions                                |
+============+=============================================+
| `start`_   | Start the OSSEC processes                   |
+------------+---------------------------------------------+
| `stop`_    | Stop the OSSEC processes                    |
+------------+---------------------------------------------+
| `restart`_ | Restart the OSSEC processes                 |
+------------+---------------------------------------------+
| `reload`_  | Restart all OSSEC processes                 |
+------------+---------------------------------------------+
| `status`_  | Determine which OSSEC processes are running |
+------------+---------------------------------------------+
| `enable`_  | Enable OSSEC functionality                  |
+------------+---------------------------------------------+
| `disable`_ | Disable OSSEC functionality                 |
+------------+---------------------------------------------+

``start``
---------

Start the OSSEC processes.


``stop``
--------

Stop the OSSEC processes.

``restart``
-----------

Restart the OSSEC processes.


``reload``
----------

Restart all OSSEC processes except ossec-execd. This allows an agent to reload without losing active response status.

.. note::

   This is only available on an OSSEC agent.

``status``
----------

Determine which OSSEC processes are running.


``enable``
----------

Enable OSSEC functionality.

.. topic:: Allowed options

  database
    Enable the ossec-dbd daemon for logging to a database.

    Supported installations
      Server and local

    .. note::
        Database support must be compiled in at install time.

  client-syslog
    Enable ossec-csyslogd for logging to remote syslog.

    Supported installations
      Server and local

  agentless
    Enable ossec-agentlessd for running commands on systems without OSSEC agents.

    Supported installations
      Server and local

  debug
    Run all OSSEC daemons in debug mode.


``disable``
-----------

Disable OSSEC functionality.

.. topic:: Allowed options

  database
    Disable the ossec-dbd daemon for logging to a database.

    Supported installations
      Server and local

    .. note::
        Database support must be compiled in at install time.

  client-syslog
    Disable ossec-csyslogd for logging to remote syslog.

    Supported installations
      Server and local

  agentless
    Disable ossec-agentlessd for running commands on systems without OSSEC agents.

    Supported installations
      Server and local

  debug
    Turn off debug mode.
