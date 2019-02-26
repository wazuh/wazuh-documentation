.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

The **statistics files** are documents that show realtime information about the Wazuh environment, like the events processed, messages received, state of the TCP connections, etc.

Currently, Wazuh provides three statistical files:
  * ``ossec-agentd-state`` -> Available only in the agents and shows mumber of generated events, last connection, status, etc.
  * ``ossec-remoted-state`` -> Available only in the manager and shows information about the `Remoted daemon. <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-remoted.html>`_
  * ``ossec-analysisd-state`` -> Available only in the manager, shows information about the `Analysisd daemon <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-analysisd.html>`_, displaying real time data.

.. note::
  To check the contain of this files in realtime, users can execute order ``# watch -n 1 "cat /var/ossec/var/run/ossec-analysisd.state"``. 
.. topic:: Contents

  .. toctree::
      :maxdepth: 1

      ossec-agentd-state
      ossec-remoted-state
      ossec-analysisd-state
