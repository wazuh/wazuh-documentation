.. _reference_ossec_logging:


logging
=======

.. topic:: XML section name

	.. code-block:: xml

		<logging>

This section allows to configure internal logs.

Options
-------

- `log_format`_


log_format
^^^^^^^^^^^

Specifies the log format between JSON output (.json) or plain text (.log). It also can be established both formats at the same time separated by comma.

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
