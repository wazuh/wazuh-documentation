.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to prevent uninstallation of the Linux Wazuh agent package without Wazuh manager validation.

anti_tampering
==============

.. topic:: XML section name

   .. code-block:: xml

      <anti_tampering>
      </anti_tampering>

You can configure anti-tampering to prevent uninstallation of the Wazuh agent package on Linux without manager validation.

Options
-------

-  `package_uninstallation`_

package_uninstallation
^^^^^^^^^^^^^^^^^^^^^^

Enables or disables the validation requirement for a user to uninstall the Wazuh agent package.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

Configuration example
---------------------

.. code-block:: xml

   <!-- Enables validation requirement to uninstall Wazuh agent package -->
   <anti_tampering>
     <package_uninstallation>yes</package_uninstallation>
   </anti_tampering>

Wazuh server API connection data
--------------------------------

+---------------------------+---------------------------------------------------------+----------------------------------------------------------------------+
| Environment variables     | Description                                             | Required/Optional                                                    |
+===========================+=========================================================+======================================================================+
| VALIDATION_TOKEN          | Token to make a Wazuh server API request.               | Either ``VALIDATION_TOKEN`` or ``VALIDATION_LOGIN`` is required.     |
+---------------------------+---------------------------------------------------------+----------------------------------------------------------------------+
| VALIDATION_LOGIN          | Wazuh server API username and password to generate a    | Either ``VALIDATION_TOKEN`` or ``VALIDATION_LOGIN`` is required.     |
|                           | token. Format: ``<USER>:<PASSWORD>``                    |                                                                      |
+---------------------------+---------------------------------------------------------+----------------------------------------------------------------------+
| VALIDATION_SSL_VERIFY     | Enable SSL verification with the Wazuh server API       | Optional - ``true`` by default.                                      |
|                           | certificate. Format: ``true``, ``false``                |                                                                      |
+---------------------------+---------------------------------------------------------+----------------------------------------------------------------------+
| VALIDATION_HOST           | Host and port where the Wazuh server API is installed.  | Required                                                             |
|                           | Format: ``<HOST>:<PORT>``                               |                                                                      |
+---------------------------+---------------------------------------------------------+----------------------------------------------------------------------+

You can create a file such as ``/$(WAZUH_DIR)/etc/uninstall_validation.env`` to export the environment variables. For example:

.. code-block:: bash

   #!/bin/sh

   export VALIDATION_LOGIN="wazuh:wazuh"
   export VALIDATION_HOST="192.168.0.3:55000"
   export VALIDATION_SSL_VERIFY="false"
