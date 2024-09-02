.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the anti_tampering configuration.

.. _reference_ossec_anti_tampering:

anti_tampering
==============

.. topic:: XML section name

   .. code-block:: xml

      <anti_tampering>
      </anti_tampering>

The anti-tampering configuration is used to prevent uninstallation of the Linux agent package without manager validation.

Options
-------

- `package_uninstallation`_

package_uninstallation
^^^^^^^^^^^^^^^^^^^^^^

Enables or disables the validation requirement for a certain user to uninstall the Wazuh agent package.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

Configuration example
---------------------

.. code-block:: xml

   <!-- Enables need of validation to uninstall Wazuh-agent package -->
   <anti_tampering>
     <package_uninstallation>yes</package_uninstallation>
   </anti_tampering>

Provide API connection data
---------------------------

+----------------------------------------+-------------------------------------------------------------+-------------------------------------------------------------------+
| Environment variables                  | Description                                                 | Required/Optional                                                 |
+========================================+=============================================================+===================================================================+
| VALIDATION_TOKEN                       | Token needed to make a manager API request.                 | Optional - At least VALIDATION_TOKEN or VALIDATION_LOGIN needed.  |
+----------------------------------------+-------------------------------------------------------------+-------------------------------------------------------------------+
| VALIDATION_LOGIN                       | API username and password to generate a TOKEN.              | Optional - At least VALIDATION_TOKEN or VALIDATION_LOGIN needed.  |
|                                        | Format: ``user:pass``                                       |                                                                   |
+----------------------------------------+-------------------------------------------------------------+-------------------------------------------------------------------+
| VALIDATION_SSL_VERIFY                  | Enable SSL verification with the API Certificate.           | Optional - By default its true.                                   |
|                                        | Format: ``true`` or ``false``                               |                                                                   |
+----------------------------------------+-------------------------------------------------------------+-------------------------------------------------------------------+
| VALIDATION_HOST                        | Host and port where the manager API is installed.           | Required                                                          |
|                                        | Format: ``host:port``                                       |                                                                   |
+----------------------------------------+-------------------------------------------------------------+-------------------------------------------------------------------+

We can create a file (``/$(WAZUH_DIR)/etc/uninstall_validation.env``), which will be used to export those environment variables. For example:

.. code-block:: bash

   #!/bin/sh

   export VALIDATION_LOGIN="wazuh:wazuh"
   export VALIDATION_HOST="192.168.0.3:55000"
   export VALIDATION_SSL_VERIFY="false"
