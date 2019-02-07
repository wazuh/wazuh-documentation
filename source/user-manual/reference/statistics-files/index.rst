.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_statistics_files:

Statistics files
================

The **statistics files** are documents that are automatically created when agents connect to a manager. They show information about the connection between the instances, like the number of events, number of TCP connections, etc.

Currently, Wazuh provides three statistical files:
  * ``ossec-agentd-state`` -> Available only in the agents and shows mumber of generated events, last connection, status, etc.
  * ``ossec-remoted-state`` -> Available only in the manager and shows information about the ``remoted`` daemon.
  * ``ossec-analysisd-state`` -> Available only in the manager, shows information about the ``Analysisd`` daemon, displaying real time data.

.. topic:: Contents

  .. toctree::
      :maxdepth: 1

      ossec-agentd-state
      ossec-remoted-state
      ossec-analysisd-state
