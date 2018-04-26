.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_forwarder:

Splunk Forwarder configuration
==============================

Requirements
------------

1. :ref:`Install <splunk_installation>` and setup a Splunk Universal Forwarder in the Wazuh manager instance.
2. An already installed :ref:`Wazuh Manager <installation>` with access to the Wazuh API via HTTP (usually on port 55000).
3. User and password (credentials) for API basic authentication.
4. Set the :ref:`indexers <splunk_index>` to receiving data.

.. note:: Many of the commands described below need to be executed with root user privileges.

Setting up Splunk Forwarder
---------------------------

.. note:: By default $SPLUNK_HOME = /opt/splunk/

1. Edit *$SPLUNK_HOME/etc/system/local/inputs.conf* file:

  .. code-block:: console

    [monitor:///var/ossec/logs/alerts/alerts.json]
    disabled = 0
    host = wazuhmanager
    index = wazuh
    sourcetype = wazuh

  - host = wazuhmanager, Wazuh Manager hostname.
  - index = wazuh, default index name where alerts will be stored.
  - sourcetype = wazuh, default sourcetype for alerts.

2. Edit *$SPLUNK_HOME/etc/system/local/props.conf* file and add the following. If it doesn't exist, create it:

  .. code-block:: console

    [wazuh]
    DATETIME_CONFIG =
    INDEXED_EXTRACTIONS = json
    KV_MODE = none
    NO_BINARY_CHECK = true
    category = Application
    disabled = false
    pulldown_type = true

3. Point the output to the Wazuh's Indexer (or indexers):

  .. code-block:: console

    $SPLUNK_HOME/bin/splunk add forward-server <host name or ip address>:<listening port>

  - Host name or ip address: Splunk Indexer location.
  - Listening port: by default on port 9997.
  - Remember that Splunk username/password are: admin/changeme by default.

  If you have multiple indexers, please set *$SPLUNK_HOME/etc/system/local/outputs.conf* like this:

  .. code-block:: console

    [tcpout]
    defaultGroup=indexer1,indexer2

    [tcpout:indexer1]
    server=IP_FIRST_INDEXER:9997

    [tcpout:indexer2]
    server=IP_SECOND_INDEXER:9997

4. Restart Splunk service:

  .. code-block:: console

    $SPLUNK_HOME/bin/splunk restart
