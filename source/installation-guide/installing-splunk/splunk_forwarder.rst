.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_forwarder:

Splunk Forwarder configuration
==============================

Requirements
------------

1. An already installed :ref:`Wazuh Manager <installation>` with access to the Wazuh API via HTTP (usually on port 55000).
2. :ref:`Install <splunk_installation>` a Splunk Universal Forwarder in the Wazuh manager instance.
3. User and password (credentials) for API basic authentication.
4. Set the :ref:`indexers <splunk_index>` to receiving data.

Setting up Splunk Forwarder
---------------------------

.. note:: By default, ``$SPLUNK_FORWARDER_HOME = /opt/splunkforwarder``

1. Edit the ``$SPLUNK_FORWARDER_HOME/etc/system/local/inputs.conf`` file and add the following. If it doesn't exist, create it:

  .. code-block:: console

    [monitor:///var/ossec/logs/alerts/alerts.json]
    disabled = 0
    host = wazuhmanager
    index = wazuh
    sourcetype = wazuh

  - host = wazuhmanager, Wazuh Manager hostname.
  - index = wazuh, default index name where alerts will be stored.
  - sourcetype = wazuh, default sourcetype for alerts.

2. Edit the ``$SPLUNK_FORWARDER_HOME/etc/system/local/props.conf`` file and add the following. If it doesn't exist, create it:

  .. code-block:: console

    [wazuh]
    DATETIME_CONFIG =
    INDEXED_EXTRACTIONS = json
    KV_MODE = none
    NO_BINARY_CHECK = true
    category = Application
    disabled = false
    pulldown_type = true

  .. note:: If you're using a **single-host architecture**, before continuing, you must change the Splunk Forwarder internal port. You can easily change it just by restarting the Splunk Forwarder by using ``$SPLUNK_FORWARDER_HOME/bin/splunk restart``, and it will automatically prompt you to change the internal port.

3. Point the output to the Wazuh's Indexer (or indexers):

  .. code-block:: console

    $SPLUNK_FORWARDER_HOME/bin/splunk add forward-server <INDEXER_IP>:<INDEXER_PORT>

  - ``INDEXER_IP``: Splunk Indexer location.
  - ``INDEXER_PORT``: by default on port 9997.
  - Remember that the default Splunk username/password are ``admin/changeme``

  .. image:: ../../images/splunk-app/simple-distributed-arch.png
    :align: center


  If you have multiple indexers, please set the ``$SPLUNK_FORWARDER_HOME/etc/system/local/outputs.conf`` file like this:

  .. code-block:: console

    [tcpout]
    defaultGroup=indexer1,indexer2

    [tcpout:indexer1]
    server=IP_FIRST_INDEXER:9997

    [tcpout:indexer2]
    server=IP_SECOND_INDEXER:9997

  .. image:: ../../images/splunk-app/distributed-arch.png
    :align: center

4. Restart Splunk Forwarder service:

  .. code-block:: console

    $SPLUNK_FORWARDER_HOME/bin/splunk restart

After installing the Splunk Forwarder, incoming data should appear in the designated Indexer.
