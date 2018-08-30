.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_forwarder:

Splunk Forwarder configuration
==============================

This section explains how to configure the Splunk Forwarder to send alerts to the Indexer component.

- **inputs.conf** : The Forwarder needs this file to read data from an input.

- **props.conf** : In order to consume data inputs, Splunk needs to specify what kind of format will handle.

Set up data collection
----------------------

Configuring props
^^^^^^^^^^^^^^^^^

1. Download and insert the ``props.conf`` template:

  .. code-block:: console

    # curl -so /opt/splunkforwarder/etc/system/local/props.conf https://raw.githubusercontent.com/wazuh/wazuh/3.6/extensions/splunk/props.conf

Configuring inputs
^^^^^^^^^^^^^^^^^^

1. Download and insert the ``inputs.conf`` template:

   .. code-block:: console

    # curl -so /opt/splunkforwarder/etc/system/local/inputs.conf https://raw.githubusercontent.com/wazuh/wazuh/3.6/extensions/splunk/inputs.conf

2. Set the Wazuh manager hostname:

  .. code-block:: console

    # sed -i "s:MANAGER_HOSTNAME:$(hostname):g" /opt/splunkforwarder/etc/system/local/inputs.conf


Set up data forwarding
----------------------

1. Point Forwarder output to Wazuh's Indexer with the following command:

  .. image:: ../images/splunk-app/simple-distributed-arch.png
    :align: center

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk add forward-server <INDEXER_IP>:<INDEXER_PORT>

  - ``INDEXER_IP``: Splunk Indexer location.
  - ``INDEXER_PORT``: by default on port 9997.

2. Restart Splunk Forwarder service:

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk restart

After installing the Splunk Forwarder, incoming data should appear in the designated Indexer.

3. Optional. If you additionally want the Splunk Forwarder service to start at boot time, please execute the following command:

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk enable boot-start
