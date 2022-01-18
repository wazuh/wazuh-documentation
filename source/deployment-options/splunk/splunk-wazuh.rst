.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_splunk:


Wazuh cluster installation
==========================

This document will go through the installation of the Wazuh manager and the Splunk forwarder.

.. note:: Root user privileges are required to run all the commands described below.

Prerequisites
-------------

Before installing the Wazuh server and the Splunk forwarder, some extra packages must be installed:

.. include:: ../../_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API, and the Splunk forwarder. The first step to set up Wazuh is adding the Wazuh's repository to the server, alternatively, all the available packages can be found :ref:`here <packages>`. 

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh manager package:

.. tabs::


    .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



    .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



    .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


Choose the corresponding tab to configure the installation as a single-node or multi-node clustes: 

.. tabs::

    .. group-tab:: Single-node cluster

        #. Enable and start the Wazuh manager service:

            .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

        #. Run the following command to check if the Wazuh manager is active: 

            .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst

            

    .. group-tab:: Multi-node cluster

        One server has to be chosen as a master, the rest will be workers. So, the section ``Wazuh server master node`` must be applied once, in the server chosen for this role. For all the other servers, the section ``Wazuh server worker node`` must be applied.


        **Wazuh server master node**

        #. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


        #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

            .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

        #. Run the following command to check if the Wazuh manager is active: 

            .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst

        **Wazuh server worker nodes**

        #. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


        #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

            .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

        #. Run the following command to check if the Wazuh manager is active: 

            .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst


.. _splunk_forwarder:

Install and configure Splunk Forwarder
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A Splunk Forwarder is required in order to send alerts to the indexer.

Depending on the type of architecture that you're installing, the Splunk Forwarder is configured differently.

.. warning::
  - On a **single-instance architecture**, the forwarder must point to the **Splunk Enterprise instance** where the Wazuh app was installed.
  - On a **multi-instance architecture**, the forwarder must point to the **search peers (or indexers)**.

1. Download Splunk Forwarder v|SPLUNK_LATEST| package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.

2. Install the Wazuh manager package:

.. tabs::


    .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/install_splunk.rst



    .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/install_splunk.rst



    .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/wazuh/zypp/install_splunk.rst

3. Ensure Splunk Forwarder v|SPLUNK_LATEST| is installed in ``/opt/splunkforwarder``.

Configuration process
---------------------

This section explains how to configure the Splunk Forwarder to send alerts to the Indexer component.

- ``props.conf`` : In order to consume data inputs, Splunk needs to specify what kind of format will handle.
- ``inputs.conf`` : The Splunk Forwarder needs this file to read data from an input. In this case, the Wazuh alerts file.

.. tabs::

    .. group-tab:: Single-node cluster

        **Configuring props**

        #. Download and insert the ``props.conf`` template:

            .. code-block:: console

                # curl -so /opt/splunkforwarder/etc/system/local/props.conf https://raw.githubusercontent.com/wazuh/wazuh-splunk/v|WAZUH_SPLUNK_LATEST|-|SPLUNK_LATEST|/setup/forwarder/props.conf

        #. Download and insert the ``inputs.conf`` template:

            .. code-block:: console

                # curl -so /opt/splunkforwarder/etc/system/local/inputs.conf https://raw.githubusercontent.com/wazuh/wazuh-splunk/v|WAZUH_SPLUNK_LATEST|-|SPLUNK_LATEST|/setup/forwarder/inputs.conf

        #. Set the Wazuh manager hostname:

            .. code-block:: console

                # sed -i "s:MANAGER_HOSTNAME:$(hostname):g" /opt/splunkforwarder/etc/system/local/inputs.conf

        **Set up data forwarding**

        #. Point Forwarder output to Wazuh's Splunk Indexer with the following command:

            .. code-block:: console

                # /opt/splunkforwarder/bin/splunk add forward-server <INDEXER_IP>:<INDEXER_PORT>

            - ``INDEXER_IP`` is the IP address of the Splunk Indexer.
            - ``INDEXER_PORT`` is the port of the Splunk Indexer. By default it's 9997.

        #. Restart Splunk Forwarder service:

            .. code-block:: console

                # /opt/splunkforwarder/bin/splunk restart

            .. warning::
                If you get an error message about the port ``8089`` already being in use, you can change it to use a different one.

            After installing the Splunk Forwarder, incoming data should appear in the designated Indexer.

        #. Optional. If you additionally want the Splunk Forwarder service to start at boot time, please execute the following command:

            .. code-block:: console

                # /opt/splunkforwarder/bin/splunk enable boot-start

            

    .. group-tab:: Multi-node cluster

        To configure forwarder instance in the cluster first install the `splunk forwarder. <https://www.splunk.com/en_us/download/universal-forwarder.html>`_

        Now, it is necessary to configure the 3 most important files in this instance:

        - **inputs.conf**: Reads alerts from **alerts.json**
        - **outputs.conf**: This file is for pointing events to certain indexers. It can be a single indexer or a cluster of indexers, in this last case, load balancing has to be configured on it.
        - **props.conf**: This file provides format and transforming fields of the data to be indexed.

        Starting with **inputs.conf**, create it and fill it with the next block:

        .. code-block:: console

            # touch /opt/splunkforwarder/etc/system/local/inputs.conf

        .. code-block:: xml

            [monitor:///var/ossec/logs/alerts/alerts.json]
            disabled = 0
            host = MANAGER_HOSTNAME
            index = wazuh
            sourcetype = wazuh

        Now, following with the **outputs.conf**:

        .. code-block:: console

            # touch /opt/splunkforwarder/etc/system/local/outputs.conf

        And paste this inside:

        .. code-block:: xml

            [indexer_discovery:cluster1]
            pass4SymmKey = changeme
            master_uri = https://<master_ip>:<port>

            [tcpout:cluster1_tcp]
            indexerDiscovery = cluster1

            [tcpout]
            defaultGroup = cluster1_tcp

        For the last one, the **props.conf**, follow the same procedure:

        .. code-block:: console

            # touch /opt/splunkforwarder/etc/system/local/props.conf

        .. code-block:: xml

            [wazuh]
            DATETIME_CONFIG =
            INDEXED_EXTRACTIONS = json
            KV_MODE = none
            NO_BINARY_CHECK = true
            category = Application
            disabled = false
            pulldown_type = true

        To save all the changes, restart splunk:

        .. code-block:: console

            # /opt/splunkforwarder/bin/splunk restart

.. To uninstall Wazuh and the Splunk forwarder, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_splunk>`.

