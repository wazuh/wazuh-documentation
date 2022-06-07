.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_credentials:

Authentication options
======================

You need to provide access credentials to the Wazuh Azure module so it can successfully connect to Azure.

There are different ways to configure the Azure authentication:

- `Using an authentication file`_
- `Inserting the credentials into the configuration`_

Using an authentication file
----------------------------

It is possible to store the credentials in a **file** for authentication as long as the file's content follows the `field = value` format explained below.

The fields expected to be present in the credentials file will change depending on the type of service or activity to be monitored:

**Microsoft Graph or Log Analytics:**

.. code-block:: none

  application_id = 317...764
  application_key = wUj...9cj

**Storage:**

.. code-block:: none

  account_name = exampleaccountname
  account_key = wr+...jOQ

Take a look at the :doc:`azure-logs wodle </user-manual/reference/ossec-conf/wodle-azure-logs>` section from ``ossec.conf`` reference page for more information about these parameters.


Inserting the credentials into the configuration
------------------------------------------------
Another available option to set up credentials is writing them right into the Wazuh configuration file (``/var/ossec/etc/ossec.conf``), inside of the ``graph``, ``<log_analytics>`` or ``storage`` blocks on the module configuration.


The tags to use are different depending on the type of service or activity to be monitored:

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
        <account_key>w22...91x</account_key>
    </storage>


Take a look at the :doc:`azure-logs wodle </user-manual/reference/ossec-conf/wodle-azure-logs>` entry from the ``ossec.conf`` reference page for more information about the parameters.