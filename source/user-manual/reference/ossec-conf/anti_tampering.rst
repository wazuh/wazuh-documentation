.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the anti_tampering configurations.

.. _reference_ossec_anti_tampering:

anti_tampering
==============

.. topic:: XML section name

   .. code-block:: xml

      <anti_tampering>
      </anti_tampering>

Anti tampering configuration is used to prevent Linux agent package uninstallation without validation from manager.

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

In order to perform the complete validation, we need to set certain environment variables to provide data:
   - ``VALIDATION_TOKEN``: Token needed to make a manager API request. It's optional (At least one from among VALIDATION_TOKEN and VALIDATION_LOGIN).
   - ``VALIDATION_LOGIN``: API login to generate a TOKEN (user:pass). It's optional (At least one from among VALIDATION_TOKEN and VALIDATION_LOGIN).
   - ``VALIDATION_SSL_VERIFY``: Enable SSL verification with the API Certificate. It's optional (If not provided, by default its true).
   - ``VALIDATION_HOST``: Host and port where the manager API is installed (host:port). It's required.

We can create a file (``/$(WAZUH_DIR)/etc/uninstall_validation.env``), which will be used to export those environment variables. For example:

.. code-block:: bash

   #!/bin/sh

   export VALIDATION_LOGIN="wazuh:wazuh"
   export VALIDATION_HOST="192.168.0.3:55000"
   export VALIDATION_SSL_VERIFY="false"
