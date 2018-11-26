.. Copyright (C) 2018 Wazuh, Inc.

.. _key-polling:

Key polling
===========

.. versionadded:: 3.8.0

Wazuh module that allows to fetch keys stored on an external database.

- `How it works`_
- `Input`_
- `Output`_
- `Example Script`_

How it works
------------
This module allows to retrieve the agent information from an external database, like MySQL or any database engine, for registering it to the ``client.keys`` file.

To do so you need to make a script in any language that can connect to your database engine and retrieve it. It's necesary to have the ``ossec-authd`` daemon running.

Below you can see the flow diagram:

.. thumbnail:: ../../images/manual/key-polling-flow.png
    :title: Key polling module flow diagram
    :align: center
    :width: 100%

Input
-----

The key polling module will call the script with the following parameters, depending on the polling type:

- Poll agent by ID 
- Poll agent by IP 

When polling by ID, the manager will retrieve the agent key by querying its ID, so the input parameters that the script will receive are for example:

::

    ./agent_key_pull.py id 001


When polling by IP address, the manager will retrieve the agent key by querying its IP address, so the input parameters that the script will receive are for example:

::

    ./agent_key_pull.py ip 192.168.1.100


Output
------
The output of your script must be a JSON object in the standard output.

On success example:

.. code-block:: console

    {
        "error": 0,
        "data": {
            "id": "001",
            "name": "my_agent",
            "ip": "192.168.1.100",
            "key": "ac575526e8bbcddf6654e5aa0a39fa60a0020e5d34ed1370916368bdaf5f0c71"
        }
    }

error
    Error identificator number.

    +--------------------+---------------+
    | Allowed characters | Digits only   |
    +--------------------+---------------+
    | Allowed size       | 1 digit       |
    +--------------------+---------------+
    | Unique value       | Yes, must be 0|
    +--------------------+---------------+

data
    Data in json format with the following fields.

    +--------------------+-------------------+
    | Allowed fields     | id, name, ip, key |
    +--------------------+-------------------+

id
    Agent identificator number.

    +--------------------+---------------+
    | Allowed characters | Digits only   |
    +--------------------+---------------+
    | Allowed size       | 3 to 8 digits |
    +--------------------+---------------+
    | Unique value       | Yes           |
    +--------------------+---------------+

name
    Agent name.

    +--------------------+--------------------------------------------------+
    | Allowed characters | Alphanumeric characters, ``-``, ``_`` and ``.``  |
    +--------------------+--------------------------------------------------+
    | Allowed size       | Up to 128 bytes                                  |
    +--------------------+--------------------------------------------------+
    | Unique value       | Yes                                              |
    +--------------------+--------------------------------------------------+

address
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

key
    String that will take part in the external message encryption.

    +--------------------+----------------------+
    | Allowed characters | Printable characters |
    +--------------------+----------------------+
    | Allowed size       | Up to 128 bytes      |
    +--------------------+----------------------+
    | Unique value       | No                   |
    +--------------------+----------------------+

On error example:

.. code-block:: console

    {
        "error": 1,
        "message": "Your error message"
    }

error
    Error identificator number.

    +--------------------+---------------+
    | Allowed characters | Digits only   |
    +--------------------+---------------+
    | Unique value       | Yes           |
    +--------------------+---------------+

message
    String that will show the message error.

    +--------------------+----------------------+
    | Allowed characters | Printable characters |
    +--------------------+----------------------+
    | Unique value       | No                   |
    +--------------------+----------------------+

Example Script
--------------

The python script bellow shows an example of an agent key retrieval from a MySQL database.



