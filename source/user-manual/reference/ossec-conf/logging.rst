.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_logging:

logging
=======

.. topic:: XML section name

    .. code-block:: xml

      <logging>
      </logging>

This section shows how to configure the format of internal log file.

This file format, will depend on this option, being .log the default (``/var/ossec/logs/ossec.log``)

Options
-------

- `log_format`_

log_format
^^^^^^^^^^

Specifies the log format between JSON output (.json) or plain text (.log). It also can be set to output both formats at the same time, when both are formats are entered, separated by a comma.

+--------------------+----------------+
| **Default value**  | plain          |
+--------------------+----------------+
| **Allowed values** | - plain        |
|                    | - json         |
|                    | - plain, json  |
+--------------------+----------------+

Default configuration
---------------------

.. code-block:: xml

    <!-- Choose between plain or json format (or both) for internal logs -->
    <logging>
      <log_format>plain</log_format>
    </logging>
