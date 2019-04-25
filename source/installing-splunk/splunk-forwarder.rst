.. Copyright (C) 2019 Wazuh, Inc.

.. _splunk_forwarder:

Install and configure Splunk Forwarder
======================================

A Splunk Forwarder is required in order to send alerts to the indexer. This component will be installed on the **Wazuh manager instance**.

Depending on the type of architecture that you're installing, the Splunk Forwarder is configured differently.

.. warning::
  - On a **single-instance architecture**, the forwarder must point to the **Splunk Enterprise instance** where the Wazuh app was installed.
  - On a **multi-instance architecture**, the forwarder must point to the **search peers (or indexers)**.

Installation process
--------------------

1. Download Splunk Forwarder v7.2.5 package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.

2. Install it with the following commands depending on your operating system:

  a) For **RPM based** distributions:

  .. code-block:: console

    # yum install splunkforwarder-package.rpm

  b) For **DEB based** distributions:

  .. code-block:: console

    # dpkg --install splunkforwarder-package.deb

3. Ensure Splunk Forwarder v7.2.5 is installed in ``/opt/splunkforwarder``.

Configuration process
---------------------

This section explains how to configure the Splunk Forwarder to send alerts to the Indexer component.

- ``props.conf`` : In order to consume data inputs, Splunk needs to specify what kind of format will handle.
- ``inputs.conf`` : The Splunk Forwarder needs this file to read data from an input. In this case, the Wazuh alerts file.

Set up data collection
^^^^^^^^^^^^^^^^^^^^^^

Configuring props
+++++++++++++++++

1. Download and insert the ``props.conf`` template:

  .. code-block:: console

    # curl -so /opt/splunkforwarder/etc/system/local/props.conf https://raw.githubusercontent.com/wazuh/wazuh/3.8/extensions/splunk/props.conf

Configuring inputs
++++++++++++++++++

1. Download and insert the ``inputs.conf`` template:

  .. code-block:: console

    # curl -so /opt/splunkforwarder/etc/system/local/inputs.conf https://raw.githubusercontent.com/wazuh/wazuh/3.8/extensions/splunk/inputs.conf

2. Set the Wazuh manager hostname:

  .. code-block:: console

    # sed -i "s:MANAGER_HOSTNAME:$(hostname):g" /opt/splunkforwarder/etc/system/local/inputs.conf

Set up data forwarding
^^^^^^^^^^^^^^^^^^^^^^

1. Point Forwarder output to Wazuh's Splunk Indexer with the following command:

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk add forward-server <INDEXER_IP>:<INDEXER_PORT>

  - ``INDEXER_IP`` is the IP address of the Splunk Indexer.
  - ``INDEXER_PORT`` is the port of the Splunk Indexer. By default it's 9997.

2. Restart Splunk Forwarder service:

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk restart

  .. warning::
    If you get an error message about the port ``8089`` already being in use, you can change it to use a different one.

After installing the Splunk Forwarder, incoming data should appear in the designated Indexer.

3. Optional. If you additionally want the Splunk Forwarder service to start at boot time, please execute the following command:

  .. code-block:: console

    # /opt/splunkforwarder/bin/splunk enable boot-start
