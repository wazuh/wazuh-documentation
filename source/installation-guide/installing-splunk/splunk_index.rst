.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_index:

Splunk Indexer Setup
====================

Setup Receiving data
--------------------

.. note:: Many of the commands described below need to be executed with root user privileges.

1. Specify the TCP port you want the receiver to listen to (the listening port, also known as the receiving port). You can specify any unused port.

  You can use a tool like netstat to determine what ports are available on your system. Make sure the port you select is not in use by splunkweb or splunkd.

a) CLI mode:

  Add a new receiving configuration editing inputs.conf file, adding the following lines:

  .. code-block:: console

    [splunktcp://9997]
    connection_host = <forwarder ip>

b) GUI mode:

  .. code-block:: console

    1. Click Settings > Forwarding and receiving.
    2. At Configure receiving, click Add new.
    3. Set the chosen port
