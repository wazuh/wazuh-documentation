.. _splunk_forwarder:

Splunk Forwarder Configuration
==============================

Requirements
------------

1. You need to :ref:`install <splunk_installation>` and setup a Splunk Universal Forwarder where the Wazuh's manager is installed.
2. An already installed :ref:`Wazuh Manager <installation>` with access to the API via HTTP (usually on port 55000).
3. User and password (credentials) for api basic authentication.
4. Set the :ref:`indexers <splunk_index>` to receiving data.

.. note:: Many of the commands described below need to be executed with root user privileges.

Setting up Splunk Forwarder
---------------------------

1. Go to ``$SPLUNK_HOME/etc/system/local``:

  .. note:: By default $SPLUNK_HOME = /opt/splunk/

  .. code-block:: console

    cd /opt/splunk

2. Edit the file *inputs.conf*:

  .. code-block:: console

    [monitor:///var/ossec/logs/alerts/alerts.json]
    disabled = 0
    host = wazuhmanager
    index = wazuh
    sourcetype = wazuh
  
  - host = wazuhmanager, hostname of Wazuh Manager.
  - index = wazuh, index by default to store alerts.
  - sourcetype = wazuh sourcetype by default to alerts received.

3. Edit the file and add the following stanza on *props.conf*. If it doesn't exist, create it:

  .. code-block:: console

    [wazuh]
    DATETIME_CONFIG = 
    INDEXED_EXTRACTIONS = json
    KV_MODE = none
    NO_BINARY_CHECK = true
    category = Application
    disabled = false
    pulldown_type = true

4. Point the output to the Wazuh's Indexer (or indexers):

  .. code-block:: console

    $SPLUNK_HOME/bin/splunk add forward-server <host name or ip address>:<listening port>

  - Host name or IP address IP address of Splunk Indexer.
  - Listening port By default on port 9997.
  - Remember that Splunk username/password are: admin/changeme by default.

  If you have multiple indexers, please set *outputs.conf* like this:

  .. code-block:: console

    [tcpout]
    defaultGroup=indexer1,indexer2

    [tcpout:indexer1]
    server=IP_FIRST_INDEXER:9997

    [tcpout:indexer2]
    server=IP_SECOND_INDEXER:9997
  
5. Restart Splunk service:

  .. code-block:: console

    $SPLUNK_HOME/bin/splunk restart