.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_forwarder:

Splunk Forwarder configuration
==============================

This section will explain what kind of configuration files the Splunk Forwarder instance needs to work properly and send Wazuh alerts to the Indexer component.

- **inputs.conf** : This configuration file is needed by the forwarder for reading data from an input.

- **props.conf** : For consuming data inputs, Splunk needs to specify what kind of format will be handled.

.. note:: By default, ``$SPLUNK_FORWARDER_HOME = /opt/splunkforwarder``

Set up data collection
----------------------

Configuring inputs
^^^^^^^^^^^^^^^^^^

For forwarding the Wazuh logs that will be indexed afterwards, please edit the ``$SPLUNK_FORWARDER_HOME/etc/system/local/inputs.conf`` file and set it to read from `alerts.json` file. For that, add the following content. If the file doesn't exist, please create it:

.. code-block:: console

  [monitor:///var/ossec/logs/alerts/alerts.json]
  disabled = 0
  host = wazuhmanager
  index = wazuh
  sourcetype = wazuh

- host = wazuhmanager, Wazuh Manager hostname.
- index = wazuh, default index name where alerts will be stored.
- sourcetype = wazuh, default sourcetype for alerts.

Configuring props
^^^^^^^^^^^^^^^^^

1. Download the ``props.conf`` template:

  .. code-block:: console

    # curl -so /opt/splunk/etc/system/local/props.conf https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/splunk/props.conf

2. Download the ``inputs.conf`` template:

   .. code-block:: console

    # curl -so /opt/splunk/etc/system/local/inputs.conf https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/splunk/inputs.conf

  And set the Wazuh manager hostname into it:

 .. code-block:: console

    # sed -i "s:MANAGER_HOSTNAME:$(hostname):g" /opt/splunk/etc/system/local/inputs.conf

.. note:: Note that the commands above works for default ``$SPLUNK_FORWARDER_HOME``. If yours is changed, please modify the curl command to your custom location.


Set up data forwarding
----------------------

1. Now the forwarder needs to send the data flow to a remote indexer, so point the output to the Wazuh's Indexer with the following command depending on your architecture:

  .. image:: ../../images/splunk-app/simple-distributed-arch.png
    :align: center

  .. code-block:: console

    $SPLUNK_FORWARDER_HOME/bin/splunk add forward-server <INDEXER_IP>:<INDEXER_PORT>

  - ``INDEXER_IP``: Splunk Indexer location.
  - ``INDEXER_PORT``: by default on port 9997.
  - Remember that the default Splunk username/password are ``admin/changeme``

2. Restart Splunk Forwarder service:

  .. code-block:: console

    $SPLUNK_FORWARDER_HOME/bin/splunk restart

After installing the Splunk Forwarder, incoming data should appear in the designated Indexer.
