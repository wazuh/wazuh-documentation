.. _client-keys:

Client keys file
================

The ``client.keys`` file stores the data used to authenticate secure agents.

Location
--------

UNIX systems
    Folder ``etc`` inside the installation directory.

Windows agents
    Installation directory.

File format
-----------

This file contains one line per each agent entry. In the case of agents, only one line is allowed, and this line must match exactly one entry in the ``client.keys`` file at manager, otherwise the agent will be rejected.

::

    <ID> <Name> <Address> <Password>

ID
    Agent identificator number.

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

Name
    Name of the agent.

    +--------------------+--------------------------------------------------+
    | Allowed characters | Alphanumeric characters, ``-``, ``_`` and ``.``  |
    +--------------------+--------------------------------------------------+
    | Allowed size       | Up to 128 bytes                                  |
    +--------------------+--------------------------------------------------+
    | Unique value       | Yes                                              |
    +--------------------+--------------------------------------------------+

Address
    Allowed source address range in CIDR format. If specified, the manager will only accept the agent if its source IP matches this address.

    +--------------------+----------------------------+
    | Format             | CIDR. Netmask is optional. |
    +--------------------+----------------------------+
    | Unique value       | Yes                        |
    +--------------------+----------------------------+
    | Reserved values    | None                       |
    +--------------------+----------------------------+
    | Aliases            | ``any`` = ``0.0.0.0/0``    |
    +--------------------+----------------------------+

Password
    String that will take part in the external message encryption.

    +--------------------+----------------------+
    | Allowed characters | Printable characters |
    +--------------------+----------------------+
    | Allowed size       | Up to 128 bytes      |
    +--------------------+----------------------+
    | Unique value       | No                   |
    +--------------------+----------------------+

Void entries
~~~~~~~~~~~~

Key entries can be invalidated so the related agent is considered removed: the line is discarded.

- Line starting with ``#`` or whitespace.
- Agent name starting with ``#`` or ``!``.

Examples
~~~~~~~~

::

    001 server1 any bb8a28997c6c3964eacb3d32308072f6661f567a41105b2b0b09f1a82331b937
    002 dbserver 10.0.1.2 363a99a6e9c9a8b6bb766d676453538e0cb20162f84b36472d99cfbef4928440
    003 data2 10.1.2.0/24 3d263f5cc513072fe6b63ab221d1facf132918235c97f19efd9446257d16ea4a
    004 !data3 any ed52060a133343dbc74474c19aaad8fb7dddd9a4b5965ebbe9edb2a73fd11a17
