.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Tool where sensitive configuration data can be securely stored, including any information that the Wazuh manager daemons/tools need for their work.

.. _wazuh-keystore:

wazuh-keystore
==============

The wazuh-keystore increases the security of sensitive information, storing in it any information that the Wazuh manager requires for its correct operation.

wazuh-keystore options
----------------------

+------------------------+---------------------------------------------------------+
| **-h**                 | Display the help message.                               |
+------------------------+---------------------------------------------------------+
| **-f <FAMILY>**        | Specifies the target column family for the insertion.   |
+------------------------+---------------------------------------------------------+
| **-k <KEY>**           | Specifies the key for the key-value pair.               |
+------------------------+---------------------------------------------------------+
| **-v <VALUE>**         | Specifies the value associated with the key.            |
+------------------------+---------------------------------------------------------+
| **-vp <VALUE>**        | Specifies the path to a single line file with the value.|
+------------------------+---------------------------------------------------------+

Only one of the options **-v** or **-vp** can be used at a time.
If none of them are present, the tool will read the value from the standard input.

If **-vp** is used, the file must contain a single line with the value.


Example
-------
* Set indexer's username and password:

.. code-block:: console

    # echo 'admin' | /var/ossec/bin/wazuh-keystore -f indexer -k username
    # echo 'admin' | /var/ossec/bin/wazuh-keystore -f indexer -k password


* Alternate ways to set values:

.. code-block:: console

    # /var/ossec/bin/wazuh-keystore -f indexer -k username -v admin
    # /var/ossec/bin/wazuh-keystore -f indexer -k password -vp /file/with/password
