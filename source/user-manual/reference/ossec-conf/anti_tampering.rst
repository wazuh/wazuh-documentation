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

It will be necessary to have the API TOKEN or login data to make the request. To do this, we must store at least one of these values in the ``VALIDATION_TOKEN`` or ``VALIDATION_LOGIN`` environment variables.

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
