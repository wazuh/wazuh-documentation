.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_index:

Splunk Indexer setup
====================

.. note:: Many of the commands described below need to be executed with root user privileges.

Setup receiving data
--------------------

.. note:: By default, ``$SPLUNK_HOME = /opt/splunk``

Specify the TCP port you want the receiver to listen to (the listening port, also known as the receiving port). You can specify any unused port.

You can use a tool like ``netstat`` to determine what ports are available on your system. Make sure the port you select is not in use by *splunkweb* or *splunkd*.

a) CLI mode:

  1. Add a new receiving configuration opening the ``$SPLUNK_HOME/etc/apps/launcher/local/inputs.conf`` file, and adding the following lines:

    .. code-block:: console

      [splunktcp://<CUSTOM_PORT>]
      connection_host = ip

  2. Restart Splunk:

    .. code-block:: console

      # $SPLUNK_HOME/bin/splunk restart

.. note:: The default Splunk port is ``9997``

b) GUI mode:

  1. On the Splunk web interface, click on ``Settings > Forwarding and receiving``
  2. At ``Configure receiving``, click on ``+ Add new``
  3. Set the desired port.

After configuring the indexer, we can continue with the next step and setting up the :ref:`Splunk Forwarder <splunk_forwarder>`.
