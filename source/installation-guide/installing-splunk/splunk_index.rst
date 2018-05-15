.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_index:

Splunk Indexer setup
====================

.. note:: Many of the commands described below need to be executed with root user privileges.

Setup receiving data
--------------------

.. note:: By default, ``$SPLUNK_HOME = /opt/splunk``

The app provides an already configured port listening for forwarded data at 9997,but it's possible to change this value to Tany TCP port you want the receiver to listen to, any unused port can be chosen.

You can use a tool like ``netstat`` to determine what ports are available on your system. Make sure the port you select is not in use by *splunkweb* or *splunkd*.

a) CLI mode:

  1. Edit the ``$SPLUNK_HOME/etc/apps/SplunkAppForWazuh/default/inputs.conf`` file:

    .. code-block:: console

      [splunktcp://<CUSTOM_PORT>]
      connection_host = ip

  2. Restart Splunk:

    .. code-block:: console

      # $SPLUNK_HOME/bin/splunk restart

.. note:: The default listening port is ``9997``

b) GUI mode:

  1. On the Splunk web interface, click on ``Settings > Forwarding and receiving``
  2. At ``Configure receiving``, click on ``+ Add new`` or edit the existing one.

After configuring the indexer, we can continue with the next step and setting up the :ref:`Splunk Forwarder <splunk_forwarder>`.
