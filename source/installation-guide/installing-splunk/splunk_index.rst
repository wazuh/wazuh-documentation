.. _splunk_index:

Splunk Indexer Setup
====================

Setup Receiving data
--------------------

.. note:: Many of the commands described below need to be executed with root user privileges.

1. Specify the TCP port you want the receiver to listen on (the listening port, also known as the receiving port). For example, if you enter "9997," the receiver listens for connections from forwarders on port 9997. You can specify any unused port. You can use a tool like netstat to determine what ports are available on your system. Make sure the port you select is not in use by splunkweb or splunkd.

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

2. After this Splunk software starts listening for incoming data on the port you specified.
