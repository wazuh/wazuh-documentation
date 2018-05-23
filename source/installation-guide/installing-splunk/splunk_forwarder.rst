.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_forwarder:

Splunk Forwarder configuration
==============================

This section will explain what kind of configuration files the Splunk Forwarder instance needs to work properly and send Wazuh alerts to the Indexer component.

- **inputs.conf** : This configuration file is needed by the forwarder for reading data from an input.

- **props.conf** : For consuming data inputs, Splunk needs to specify what kind of format will be handled.

Set up data collection
----------------------

Configuring inputs
^^^^^^^^^^^^^^^^^^

1. Download and insert the ``props.conf`` template:

  .. code-block:: console

    # curl -so /opt/splunkforwarder/etc/system/local/props.conf https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/splunk/props.conf

Configuring props
^^^^^^^^^^^^^^^^^

1. Download the ``inputs.conf`` template:

   .. code-block:: console

    # curl -so /opt/splunkforwarder/etc/system/local/inputs.conf https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/splunk/inputs.conf

2. And set the Wazuh manager hostname into it:

  .. code-block:: console

    # sed -i "s:MANAGER_HOSTNAME:$(hostname):g" /opt/splunkforwarder/etc/system/local/inputs.conf


Set up data forwarding
----------------------

1. Now the forwarder needs to send the data flow to a remote indexer, so point the output to the Wazuh's Indexer with the following command depending on your architecture:

  .. image:: ../../images/splunk-app/simple-distributed-arch.png
    :align: center

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk add forward-server <INDEXER_IP>:<INDEXER_PORT>

  - ``INDEXER_IP``: Splunk Indexer location.
  - ``INDEXER_PORT``: by default on port 9997.
  - Remember that the default Splunk username/password are ``admin/changeme``

2. Restart Splunk Forwarder service:

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk restart

After installing the Splunk Forwarder, incoming data should appear in the designated Indexer.
