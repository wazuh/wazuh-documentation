.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the logging configuration section of wazuh-manager.conf, which configures the output format for Wazuh manager service logs.

.. _reference_wazuh_manager_conf_logging:

logging
=======

.. topic:: XML section name

   .. code-block:: xml

      <logging>
      </logging>

The ``<logging>`` section configures the output format for Wazuh manager service logs (``/var/wazuh-manager/logs/wazuh-manager.log``).

Options
-------

- `log_format`_

log_format
^^^^^^^^^^

Format used for Wazuh manager internal logs. Specify a single value or a comma-separated pair to enable both formats.

+----------------------+----------------+
| **Default value**    | plain          |
+----------------------+----------------+
| **Allowed values**   | - plain        |
|                      | - json         |
|                      | - plain,json   |
|                      | - json,plain   |
+----------------------+----------------+

The order of the values does not affect the output.

When both formats are enabled (``plain,json``), the Wazuh manager writes plain-text logs to ``/var/wazuh-manager/logs/wazuh-manager.log`` and JSON logs to ``/var/wazuh-manager/logs/wazuh-manager.json``.

Sample configuration
---------------------

Plain-text output only (default):

.. code-block:: xml

   <logging>
     <log_format>plain</log_format>
   </logging>

JSON output only:

.. code-block:: xml

   <logging>
     <log_format>json</log_format>
   </logging>

Both output formats:

.. code-block:: xml

   <logging>
     <log_format>plain,json</log_format>
   </logging>
