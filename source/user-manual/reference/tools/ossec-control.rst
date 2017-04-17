
.. _ossec-control:

ossec-control
=============

The ossec-control script is used to start, stop, configure, or check on the status of Wazuh processes.  This script can enable or disable client-syslog, database logging, agentless configurations, integration with slack and pagerduty, and debug mode.

+-------------+---------------------------------------------------------------------------------------------------------+
| **start**   | Start the Wazuh processes.                                                                              |
+-------------+---------------------------------------------------------------------------------------------------------+
| **stop**    | Stop the Wazuh processes.                                                                               |
+-------------+---------------------------------------------------------------------------------------------------------+
| **restart** | Restart the Wazuh processes.                                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **reload**  | Restart all Wazuh processes except ossec-execd.                                                         |
|             |                                                                                                         |
|             | This allows an agent to reload without losing active response status.                                   |
|             |                                                                                                         |
|             | This is only available on a Wazuh agent.                                                                |
+-------------+---------------------------------------------------------------------------------------------------------+
| **status**  | Determine which Wazuh processes are running.                                                            |
+-------------+---------------------------------------------------------------------------------------------------------+
| **enable**  | List available agents.                                                                                  |
+             +-----------------+---------------+-----------------------------------------------------------------------+
|             | Allowed options | database      | Enable the ossec-dbd daemon for logging to a database.                |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | Server and local                                                      |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | client-syslog | Enable ossec-csyslogd for logging to remote syslog.                   |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | Server and local                                                      |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | agentless     | Enable ossec-agentlessd for running commands on systems               |
|             |                 |               |                                                                       |
|             |                 |               | without Wazuh agents.                                                 |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | Server and local                                                      |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | integrator    | Enable integrator for connection to external APIs and alerting tools  |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | Server                                                                |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | debug         | Run all Wazuh daemons in debug mode.                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+
| **disable** | Disable Wazuh functionality.                                                                            |
+             +-----------------+---------------+-----------------------------------------------------------------------+
|             | Allowed options | database      | Disable the ossec-dbd daemon for logging to a database.               |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | server and local                                                      |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | client-syslog | Disable ossec-csyslogd for logging to remote syslog.                  |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | server and local                                                      |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | agentless     | Disable ossec-agentlessd for running commands on systems              |
|             |                 |               |                                                                       |
|             |                 |               | without Wazuh agents.                                                 |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | server and local                                                      |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | integrator    | Disable integrator for connection to external APIs and alerting tools |
+             +                 +               +-----------------------------------------------------------------------+
|             |                 |               | server                                                                |
+             +                 +---------------+-----------------------------------------------------------------------+
|             |                 | debug         | Turn off debug mode.                                                  |
+-------------+-----------------+---------------+-----------------------------------------------------------------------+

.. note::
    To use the database option, Database support must be compiled in during initial installation.
