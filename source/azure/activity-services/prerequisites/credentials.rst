.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_credentials:

Authentication options
======================

In order to make the Wazuh Azure module work it will be necessary to provide access credentials so it can connect to Azure.

There are different ways to configure the Azure authentication:

- `Use an authentication file`_
- `Insert the credentials into the configuration`_

Use an authentication file
--------------------------

It is possible to store the credentials in a **file** for authentication as long as the file's content follow the `field = value` format explained below.

The fields expected to be present in the credentials file will change depending on the type of service or activity to be monitored:

**Microsoft Graph or Log Analytics:**

.. code-block:: none

  application_id = 317...764
  application_key = wUj...9cj

**Storage:**

.. code-block:: none

  account_name = exampleaccountname
  account_key = wr+...jOQ

Take a look to the :ref:`azure-logs<wodle_azure_logs>` section from ``ossec.conf`` reference page for more information about these parameters.


Insert the credentials into the configuration
---------------------------------------------
Another available option to set up credentials is writing them right into the Wazuh configuration file (``/var/ossec/etc/ossec.conf``), inside of the ``graph``, ``<log_analytics>`` or ``storage`` blocks on the module configuration.


The tags to used are different depending on the type of service or activity to be monitored:

**Microsoft Graph or Log Analytics:**

.. code-block:: none

    <graph>
        <application_id>8b7...c14</application_id>
        <application_key>w22...91x</application_key>
    </graph>

    <log_analytics>
        <application_id>8b7...c14</application_id>
        <application_key>w22...91x</application_key>
    </log_analytics>

**Storage:**

.. code-block:: none

    <storage>
        <account_name>exampleaccountname</account_name>
        <application_key>w22...91x</application_key>
    </storage>


Take a look to the :ref:`azure-logs<wodle_azure_logs>` section from ``ossec.conf`` reference page for more information about the parameters.