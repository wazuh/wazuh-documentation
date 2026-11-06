.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the Wazuh Common Schema (WCS) state indices: file integrity monitoring, system inventory, Security Configuration Assessment, and vulnerabilities.

.. _reference_wcs_state_index_fields:

State index fields
==================

State indices store the latest known state of each monitored endpoint. Wazuh agent modules report the state, and the Wazuh manager keeps the indices in sync. Each index has its own module in the `stateful folder <https://github.com/wazuh/wazuh-indexer-plugins/tree/|WCS_REF|/wcs/stateful>`__, with a ``fields.csv`` file that lists its fields.

WCS uses the same field names in events and in the state indices. Each page shows how to detect a change with a rule on the event field, then check the current state with a query on the same field.

.. toctree::
   :maxdepth: 1

   state-fim
   state-inventory
   state-sca
   state-vulnerabilities
