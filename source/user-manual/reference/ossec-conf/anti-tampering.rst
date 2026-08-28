.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the anti_tampering configuration section of ossec.conf, which protects against unauthorized uninstallation of the Wazuh agent package on Linux.

.. _reference_ossec_anti_tampering:

anti_tampering
==============

.. topic:: XML section name

   .. code-block:: xml

      <anti_tampering>
      </anti_tampering>

The ``<anti_tampering>`` section configures protection against unauthorized uninstallation of the Wazuh agent package on Linux. When enabled, uninstalling the package requires validation through the Wazuh manager API.

Options
-------

- `package_uninstallation`_

package_uninstallation
^^^^^^^^^^^^^^^^^^^^^^^

Enables or disables the validation requirement for a user to uninstall the Wazuh agent package.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

Configuration example
-----------------------

.. code-block:: xml

   <!-- Enables validation requirement to uninstall Wazuh agent package -->
   <anti_tampering>
     <package_uninstallation>yes</package_uninstallation>
   </anti_tampering>

Wazuh manager API connection data
------------------------------------

When package uninstallation protection is enabled, provide the Wazuh manager API connection details through environment variables.

+-----------------------------+----------------------------------------------------------------------------------------------+--------------------------------------------------------------------+
| Environment variables       | Description                                                                                  | Required/Optional                                                  |
+=============================+==============================================================================================+====================================================================+
| ``VALIDATION_TOKEN``        | Authentication token used for the Wazuh manager API request.                                 | Either ``VALIDATION_TOKEN`` or ``VALIDATION_LOGIN`` is required.   |
+-----------------------------+----------------------------------------------------------------------------------------------+--------------------------------------------------------------------+
| ``VALIDATION_LOGIN``        | Wazuh manager API username and password to generate a token. Format: ``<USER>:<PASSWORD>``   | Either ``VALIDATION_TOKEN`` or ``VALIDATION_LOGIN`` is required.   |
+-----------------------------+----------------------------------------------------------------------------------------------+--------------------------------------------------------------------+
| ``VALIDATION_SSL_VERIFY``   | Enable SSL verification with the Wazuh manager API certificate. Format: ``true``, ``false``  | Optional - ``true`` by default.                                    |
+-----------------------------+----------------------------------------------------------------------------------------------+--------------------------------------------------------------------+
| ``VALIDATION_HOST``         | Host and port where the Wazuh manager API is installed. Format: ``<HOST>:<PORT>``            | Required                                                           |
+-----------------------------+----------------------------------------------------------------------------------------------+--------------------------------------------------------------------+

You can create a file such as ``/$(WAZUH_DIR)/etc/uninstall_validation.env`` to export the environment variables. For example:

.. code-block:: bash

   #!/bin/sh
   export VALIDATION_LOGIN="wazuh:wazuh"
   export VALIDATION_HOST="192.168.0.3:55000"
   export VALIDATION_SSL_VERIFY="false"

Alternatively, use an existing API token instead of username and password credentials:

.. code-block:: bash

   #!/bin/sh
   export VALIDATION_TOKEN="<API_TOKEN>"
   export VALIDATION_HOST="<WAZUH_MANAGER_IP>:55000"
   export VALIDATION_SSL_VERIFY="true"
