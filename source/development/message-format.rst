.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This section contains instructions to describe the Standard OSSEC message format Wazuh accepts and sends between its components.

.. _message-format:

.. highlight:: none

Standard Wazuh message format
==============================

This section describes the message format that Wazuh accepts and sends between its components:

- **Input logs:** These are *strings* ingested by the Wazuh Logcollector module from log files, Windows events, program outputs, etc.

- **Standard Wazuh events:** These are data sent locally between Wazuh components, usually to the Wazuh agent daemon or the Analysis daemon in the Wazuh manager.

- **Secure messages:** These are data delivered remotely between the Agent daemon and the Remote daemon.

Input logs
----------

Input logs are the raw messages that the Wazuh Logcollector module gathers from different sources, such as log files, Windows events, or program outputs. These logs follow the standard Syslog format or a custom format defined by the application or system generating them. In a case where the log is in a custom format, the message header is parsed by a pre-decoder.

Below is an example of a Syslog message:

::

    Sept  9 16:06:16 localhost salute: Hello world.

When logs are in Syslog format, the pre-decoder processes and interprets the message header, extracting essential information like timestamps, hostnames, and severity levels before further analysis. In the case of the message above, the following fields are extracted:

- Date: ``Sep  9 16:06:26``

- Host name: ``localhost``

- Program name: ``salute``

- Log: ``Hello world.``

If the message is not in Syslog format, the entire log entry is treated as plain text. The strings contained in the log can then be further processed by decoders, which can be either XML-based decoders or plugin decoders. This is to extract and structure relevant information from the log for analysis.

Standard Wazuh event
--------------------

Wazuh events are messages exchanged between Wazuh components on the same endpoint. One of such is the sending of events from the Remote daemon to the Analysis daemon. This communication uses the local datagram socket located at ``/var/ossec/queue/sockets/queue``. Examples include:

- Log events sent from the Wazuh Logcollector module to the Wazuh agent daemon.

- File integrity monitoring events sent from the Wazuh File Integrity Monitoring (FIM) module to the Wazuh Agent daemon.

- Configuration  assessment events sent from the Wazuh Security Configuration Assessment (SCA) module to the Wazuh Agent daemon.

The format of these events is as follows:

::

    <Queue>:<Location>:<Message>

Where:

- **Queue** - is a ``1-byte`` character and represents the event type. It defines the decoding mode for the Analysis daemon. The most common queue types are:

  - ``1`` - Local file log, including Syslog messages, Windows event logs, outputs from commands, custom logs, and integrations.

  - ``2`` - Remote Syslog messages, received by the Syslog server at the Remote daemon.

  - ``4`` - Secure messages. They are events from the Remote daemon to the Analysis daemon that contain a standard Wazuh message plus the source agent ID.

  - ``5`` - Dbsync events. Internal communication of the rsync library, messages for database synchronization between the Wazuh manager and Wazuh agents.

  - ``8`` - Syscheck events. The Wazuh Analysis daemon parses it using the Syscheck decoder.

  - ``9`` - Rootcheck events. The Wazuh Analysis daemon parses it using the Rootcheck decoder.

  - ``f`` - Windows events. Events from Windows endpoints collected through the Wazuh agent.

  - ``p`` - Security Configuration Assessment (SCA) events. SCA events collected by the SCA module from the Wazuh agents.

  - ``d`` - System inventory events. System inventory events collected by the Syscollector module from the Wazuh agents.

  - ``u`` - Upgraded forwarder notification.  When an agent is updated via WPK, it notifies the Wazuh manager via this special queue so that the manager knows when the Wazuh agent has finished updating.

- **Location** - is the log source, typically the path to the file where the log was collected.

- **Message** - is the content of the log.

Example:

.. code-block:: none
    :class: output

    1:/var/log/syslog:Nov  9 16:06:26 localhost salute: Hello world.

Secure message format
---------------------

Secure messages are messages sent through a network between a Wazuh agent (Agent daemon) and the Wazuh manager (Analysis daemon). These messages are:

- Encrypted.
- Compressed.
- Randomized.
- Numerated.

Step by step procedure for the secure message format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This sub-section outlines the step-by-step procedure for securing messages sent from the Wazuh agent to the Wazuh manager over a network. We show the use of block, hash, compressed data, padding, encrypted data, and payload to secure messages.

Block
+++++

The *block* is the result of joining a header and the input event:

::

    <Block> = <Random> <Global counter> ":" <Local counter> ":" <Event>

Where:

- **Random** - 5-byte 0-padded random unsigned integer.

+---------+----------+
| Size    | 5 digits |
+---------+----------+
| Padding | 0-padded |
+---------+----------+

- **Global counter** - Most significant part of the message counter.

+---------+-----------+
| Size    | 10 digits |
+---------+-----------+
| Padding | 0-padded  |
+---------+-----------+

- **Local counter** - Least significant part of the message counter.

+---------+----------+
| Size    | 4 digits |
+---------+----------+
| Padding | 0-padded |
+---------+----------+

- **Event** - Is the input message.

Hash
++++

The hash is the 32-byte MD5 digest:

::

    <Hash> = MD5(<Block>)

Compressed data
+++++++++++++++

This object is the result of compressing the *hash* and the *block* (appended) through the *DEFLATE* algorithm, using *``zlib``*:

::

    <CData> = Compress(<Hash> <Block>)

Padding
+++++++

The compressed data is a byte array that must:

1. Have a size multiple of 8.
2. Start with one or more ``!``.

So the ``<Padding>`` object is a string of 1 to 8 ``!`` symbols, so that the array resulting from appending both ``<Padding>`` and ``<CData>`` has a size multiple of 8.

::

    <Padding> = 1..8 "!"
    Length(<Padding> <CData>) = 0 (mod 8)

Encrypted data
++++++++++++++

The padded data is encrypted using AES:

::

    <Encrypted> = AES(<Padding> <CData>)

The initialization vector and the encryption key are described in the `Encryption system`_.

.. note::

   The default encryption method is AES, although Blowfish is available as an alternative encryption method.

Payload
+++++++

The payload is the final message that will be sent to the peer (secure manager or agent). It starts with ``:`` if and only if the agent entry allows more than one host (address ``any`` or netmask different from 32), the agent ID between two ``!`` symbols:

::

    <Payload> =
        ":" <Encrypted>,                    if <Netmask> = 32
        "!" <Agent ID> "!:" <Encrypted>,    otherwise

Complete encryption formula
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Below, we show the encryption formula used in the secure message format, using blowfish and AES encryption.

For agents with restricted address:

    a) Blowfish encryption

    .. code-block:: console

        ":" Blowfish(<!-padding> Gzip(MD5(<Random> <Global> ":" <Local> ":" <Event>) <Random> <Global> ":" <Local> ":" <Event>))

    b) AES encryption

    .. code-block:: console

        "#AES:" Aes(<!-padding> Gzip(MD5(<Random> <Global> ":" <Local> ":" <Event>) <Random> <Global> ":" <Local> ":" <Event>))

For agents with unrestricted address (address ``any`` or netmask different from 32):

    a) Blowfish encryption

    .. code-block:: console

        "!" <ID> "!:" Blowfish(<!-padding> Gzip(MD5(<Random> <Global> ":" <Local> ":" <Event>) <Random> <Global> ":" <Local> ":" <Event>))

    b) AES encryption

    .. code-block:: console

        "!" <ID> "!#AES:" Aes(<!-padding> Gzip(MD5(<Random> <Global> ":" <Local> ":" <Event>) <Random> <Global> ":" <Local> ":" <Event>))

This is the encryption flow chart:

.. thumbnail:: ../images/development/encryption-flow.png
    :title: OSSEC message encryption flow chart
    :align: center
    :width: 60%

Network protocol
~~~~~~~~~~~~~~~~

The procedure to send a payload via network depends on the connection protocol. Below, we show the network protocols:

**UDP protocol**

    The datagram is the payload itself::

        Send(<Payload>)

**TCP protocol**

    Messages are not delimited by the network, so the payload size must be prefixed to the payload::

        Send(<Size> <Payload>)

    The ``Size`` has the following format:

    +------------+---------------+
    | Size       | 4 bytes       |
    +------------+---------------+
    | Sign       | Unsigned      |
    +------------+---------------+
    | Endianness | Little-endian |
    +------------+---------------+

Encryption system
~~~~~~~~~~~~~~~~~

The encryption system uses a constant initialization vector and an encryption key, as shown below:

**Initialization vector**

    8-byte hexadecimal array for Blowfish method::

        <IV> = FE DC BA 98 76 54 32 10

    8-byte hexadecimal array for AES method::

        <IV> = FE DC BA 09 87 65 43 21

**Encryption key**

    They key is built by appending and cutting hexadecimal strings depending on some agent attributes (see :ref:`client-keys`)::

        <Key> = MD5(<Pass>) MD5(MD5(<Name>) MD5(<ID>))[0:15]

.. note::

   The second MD5 hash is cut to its first 15 bytes (from 0 to 14th).

Example:

::

    <ID> = 003
    <Name> = myagent
    <Pass> = 2801fb64625a4ca5523395d8ab7370dbed275a227688542493c6577c3d9fdf2c

    MD5(<Pass>) = 7c07f68ea8494b2f8b9fea297119350d
    MD5(<Name>) = 370ca80d72402c8a4dbafa5b6888e2c5
    MD5(<ID>) = e88a49bccde359f0cabb40db83ba6080
    MD5(MD5(<Name>) MD5(<ID>))[0:15] = 78708afa69c1c76
    <Key> = 7c07f68ea8494b2f8b9fea297119350d78708afa69c1c76
