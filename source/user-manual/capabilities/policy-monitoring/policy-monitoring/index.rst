.. Copyright (C) 2019 Wazuh, Inc.

.. _policy_monitoring_introduction:

Policy monitoring
=================

Wazuh has improved its policy monitoring process with a new module. The policy files are now updated and translated to YAML with more interesting fields, this files are parsed by this new module and then the scans are run, in each of them, the new information gathered is stored at a queriable database where differences between consecutive scans are made, this makes possible generating an alert for every check that has changed its result. Also, an stadistical alert that summaries the checking process is generated in every scan. 

.. toctree::
   :maxdepth: 2

   how-it-works
   use-case