.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Tool where sensitive configuration data can be securely stored, including any information that the Wazuh manager daemons/tools need for their work. 

.. _keystore-tool:

keystore-tool
=============

The keystore-tool increases the security of sensitive information, storing in it any information that the Wazuh manager requires for its correct operation.

keystore-tool options
---------------------

+------------------------+---------------------------------------------------------+
| **-h**                 | Display the help message.                               |
+------------------------+---------------------------------------------------------+
| **-f <FAMILY>**        | Specifies the target column family for the insertion.   |
+------------------------+---------------------------------------------------------+
| **-k <KEY>**           | Specifies the key for the key-value pair.               |
+------------------------+---------------------------------------------------------+
| **-v <VALUE>**         | Specifies the value associated with the key.            |
+------------------------+---------------------------------------------------------+

Example
-------
* Set indexer's username and password:

.. code-block:: console

    # /var/ossec/bin/wazuh-keystore -f indexer -k username -v admin
    # /var/ossec/bin/wazuh-keystore -f indexer -k password -v admin
