
.. _ossec-control:

ossec-control
=============

The ossec-control script is used to start, stop, configure, or check on the status of Wazuh processes.  This script can enable or disable client-syslog, database logging, agentless configurations, integration with slack and pagerduty, and debug mode.

+------------+---------------------------------------------+
| Options    | Descriptions                                |
+============+=============================================+
| `start`_   | Start the Wazuh processes                   |
+------------+---------------------------------------------+
| `stop`_    | Stop the Wazuh processes                    |
+------------+---------------------------------------------+
| `restart`_ | Restart the Wazuh processes                 |
+------------+---------------------------------------------+
| `reload`_  | Restart all Wazuh processes                 |
+------------+---------------------------------------------+
| `status`_  | Determine which Wazuh processes are running |
+------------+---------------------------------------------+
| `enable`_  | Enable Wazuh functionality                  |
+------------+---------------------------------------------+
| `disable`_ | Disable Wazuh functionality                 |
+------------+---------------------------------------------+

``start``
---------

Start the Wazuh processes.


``stop``
--------

Stop the Wazuh processes.

``restart``
-----------

Restart the Wazuh processes.


``reload``
----------

Restart all Wazuh processes except ossec-execd. This allows an agent to reload without losing active response status.

.. note::

   This is only available on a Wazuh agent.

``status``
----------

Determine which Wazuh processes are running.


``enable``
----------

Enable Wazuh functionality.

.. topic:: Allowed options

  database
    Enable the ossec-dbd daemon for logging to a database.

    Supported installations
      Server and local

    .. note::
        Database support must be compiled in during initial installation.

  client-syslog
    Enable ossec-csyslogd for logging to remote syslog.

    Supported installations
      Server and local

  agentless
    Enable ossec-agentlessd for running commands on systems without Wazuh agents.

    Supported installations
      Server and local

  integrator
    Enable integrator for connection to external APIs and alerting tools such as Slack and PagerDuty.

    Supported installations
      Server

  debug
    Run all Wazuh daemons in debug mode.


``disable``
-----------

Disable Wazuh functionality.

.. topic:: Allowed options

  database
    Disable the ossec-dbd daemon for logging to a database.

    Supported installations
      Server and local

    .. note::
        Database support must be compiled in during initial installation.

  client-syslog
    Disable ossec-csyslogd for logging to remote syslog.

    Supported installations
      Server and local

  agentless
    Disable ossec-agentlessd for running commands on systems without Wazuh agents.

    Supported installations
      Server and local

  integrator
    Disable integrator for connection to external APIs and alerting tools such as Slack and PagerDuty.

    Supported installations
      Server

  debug
    Turn off debug mode.
