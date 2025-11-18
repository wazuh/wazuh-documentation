.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The client.keys file stores the data used to authenticate secure agents. For more information, check this section of the Wazuh documentation.

.. _client-keys:

Client keys file
================

The ``client.keys`` file stores the data used to authenticate and identify Wazuh agents. A record of the ``client.keys`` file is stored on the Wazuh server and the Wazuh agent endpoints.  The location depends on the operating system. The table below lists the default paths for each OS:

+---------------------+--------------------------------------------------------+
| Operating systems   | Location of the ``client.keys`` file                   |
+=====================+========================================================+
| Windows             | ``C:\Program Files (x86)\ossec-agent\client.keys``     |
+---------------------+--------------------------------------------------------+
| Linux/Unix          | ``/var/ossec/etc/client.keys``                         |
+---------------------+--------------------------------------------------------+
| macOS               | ``/Library/Ossec/etc/client.keys``                     |
+---------------------+--------------------------------------------------------+

File format
-----------

The Wazuh manager ``client.keys`` file contains one entry per agent. The Wazuh agent ``client.keys`` file has one line, which must match an entry on the Wazuh manager. If the lines don't match, the Wazuh manager rejects the Wazuh agent.

The ``client.keys`` file is formatted as described in the table below:

::

    <ID> <Name> <Address> <Password>

Where:

- **ID** - represents the Wazuh  agent identification number with the following considerations:

+--------------------+---------------+
| Allowed characters | Digits only   |
+--------------------+---------------+
| Allowed size       | 3 to 8 digits |
+--------------------+---------------+
| Padding            | 0-padded      |
+--------------------+---------------+
| Unique value       | Yes           |
+--------------------+---------------+
| Reserved values    | ID "000"      |
+--------------------+---------------+

- **Name**  - represents the name of the agent with the following considerations:

+--------------------+--------------------------------------------------+
| Allowed characters | Alphanumeric characters, ``-``, ``_`` and ``.``  |
+--------------------+--------------------------------------------------+
| Allowed size       | Up to 128 bytes                                  |
+--------------------+--------------------------------------------------+
| Unique value       | Yes                                              |
+--------------------+--------------------------------------------------+

- **Address** - represents the allowed source IP address range in CIDR format. If the IP address is explicitly provided, the Wazuh manager will only enroll the agent if the provided IP address matches the source IP address.

+--------------------+----------------------------+
| Format             | CIDR. Netmask is optional. |
+--------------------+----------------------------+
| Unique value       | Yes                        |
+--------------------+----------------------------+
| Reserved values    | None                       |
+--------------------+----------------------------+
| Aliases            | ``any`` = ``0.0.0.0/0``    |
+--------------------+----------------------------+

- **Password** - represents a base64 encoded string that is used for external message encryption.

+--------------------+----------------------+
| Allowed characters | Printable characters |
+--------------------+----------------------+
| Allowed size       | Up to 128 bytes      |
+--------------------+----------------------+
| Unique value       | No                   |
+--------------------+----------------------+

Void entries
~~~~~~~~~~~~

Key entries can be invalidated, causing the associated Wazuh agent to be considered as unenrolled. This can occur in the following cases:

- The entire line is deleted.
- The line begins with ``#`` or whitespace.
- The agent name starts with ``#`` or ``!``.

.. note::

   The Wazuh manager needs to be stopped before invalidating a key to ensure proper un-enrolling.

Examples
~~~~~~~~

Below is an example of the content of the ``client.keys`` file. The last agent ``004`` meets one of the conditions for a void entry because the agent name ``!data3`` starts with ``!``.

::

    001 server1 any bb8a28997c6c3964eacb3d32308072f6661f567a41105b2b0b09f1a82331b937
    002 dbserver 10.0.1.2 363a99a6e9c9a8b6bb766d676453538e0cb20162f84b36472d99cfbef4928440
    003 data2 10.1.2.0/24 3d263f5cc513072fe6b63ab221d1facf132918235c97f19efd9446257d16ea4a
    004 !data3 any ed52060a133343dbc74474c19aaad8fb7dddd9a4b5965ebbe9edb2a7
