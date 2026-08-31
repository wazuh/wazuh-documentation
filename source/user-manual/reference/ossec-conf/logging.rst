.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the logging configuration section of ossec.conf, which configures the Wazuh agent's internal logging behavior.

.. _reference_ossec_agent_logging:

logging
=======

.. topic:: XML section name

   .. code-block:: xml

      <logging>
      </logging>

The ``<logging>`` section configures the Wazuh agent's internal logging behavior, including the log format and verbosity level.

Options
-------

- `log_format`_

log_format
^^^^^^^^^^

Specifies the log format between JSON output (``.json``) or plain text (``.log``). It also can be set to output both formats at the same time, when both formats are entered, separated by a comma.

Depending on the given format, the output file will be ``/var/ossec/logs/ossec.log``, ``/var/ossec/logs/ossec.json`` or both of them.

+----------------------+-----------------+
| **Default value**    | plain           |
+----------------------+-----------------+
| **Allowed values**   | - plain         |
|                      | - json          |
|                      | - plain, json   |
+----------------------+-----------------+

Default configuration
------------------------

.. code-block:: xml

   <!-- Choose between plain or json format (or both) for internal log file -->
   <logging>
     <log_format>plain</log_format>
   </logging>
