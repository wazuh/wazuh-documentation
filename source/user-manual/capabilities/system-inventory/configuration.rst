.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Syscollector configuration in this section of the Wazuh documentation.

Configuration
=============

The Syscollector module requires both Wazuh agent and Wazuh manager configurations to collect, process, and store system inventory data.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Wazuh agent configuration
-------------------------

The Syscollector module is enabled by default on all endpoints where the Wazuh agent is installed. You can find the Syscollector configuration in the Wazuh agent configuration file at:

- ``/var/ossec/etc/ossec.conf`` for Linux endpoints.
- ``C:\Program Files (x86)\ossec-agent\ossec.conf`` for Windows endpoints.
- ``/Library/Ossec/etc/ossec.conf`` for macOS endpoints.

You can also use the centralized configuration file to make changes to the Wazuh Syscollector module across multiple monitored endpoints that belong to the same agent group. For example, the ``default`` group uses the configuration file, which you can find at ``/etc/wazuh-manager/shared/default/agent.conf`` on the Wazuh manager. Settings applied with the centralized configuration take precedence over the local Wazuh agent configuration.

The following block shows the default Syscollector configuration on a Wazuh agent:

.. code-block:: xml

      <!-- System inventory -->
      <wodle name="syscollector">
        <disabled>no</disabled>
        <interval>1h</interval>
        <scan_on_start>yes</scan_on_start>
        <hardware>yes</hardware>
        <os>yes</os>
        <network>yes</network>
        <packages>yes</packages>
        <ports all="yes">yes</ports>
        <processes>yes</processes>
        <users>yes</users>
        <groups>yes</groups>
        <services>yes</services>
        <browser_extensions>yes</browser_extensions>

        <!-- Database synchronization settings -->
        <synchronization>
          <enabled>yes</enabled>
          <interval>5m</interval>
          <max_eps>75</max_eps>
          <integrity_interval>24h</integrity_interval>
        </synchronization>
      </wodle>

Where:

- ``<disabled>`` specifies whether the Wazuh Syscollector module is enabled or not. The default value is ``no``. The allowed values are ``yes`` and ``no``.

.. _interval_syscollector:

- ``<interval>`` specifies the time between system scans. The default value is 1 hour. The allowed value is a positive number with a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days).
- ``<scan_on_start>`` specifies whether the module runs a scan immediately when the Wazuh agent service starts. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<hardware>`` enables or disables the hardware information collection. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<os>`` enables or disables the operating system scan. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<network>`` enables or disables the network scan. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<packages>`` enables or disables the scanning of packages, with a default value of ``yes``. The allowed values are ``yes`` and ``no``.
- ``<ports all="yes">`` enables or disables the port scan. The default value is ``yes``. The ``all`` attribute determines the scope of the scan. The default value of ``all`` is ``yes``, which scans all ports. Setting the value to ``no`` restricts the scan to listening ports only.
- ``<processes>`` enables or disables the scanning for running processes on a monitored endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<users>`` enables or disables the scanning for user accounts on a monitored endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<groups>`` enables or disables the scanning for user account groups on a monitored endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<services>`` enables or disables the scanning for services. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<browser_extensions>`` enables or disables the scanning for browser extensions. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<synchronization>`` contains the settings that control how the Wazuh agent synchronizes inventory data with the Wazuh manager.
- ``<enabled>`` specifies whether synchronization is active. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<interval>`` specifies the time between synchronization operations. The default value is 5 minutes.
- ``<max_eps>`` sets the maximum event reporting throughput. The default value is 75, which signifies 75 events per second. The allowed value is an integer between 0 and 1000000.
- ``<integrity_interval>`` specifies the time between full integrity checks of the synchronized inventory data. The default value is 24 hours.

On Windows endpoints, you can use the ``<hotfixes>`` option.

.. note::

   Restart the Wazuh agent after you change the configuration file to apply the changes. If you use centralized configuration, no manual restart is required because the Wazuh agent restarts automatically after receiving the update.

Wazuh manager configuration
---------------------------

The ``inventory_sync_server`` module on the Wazuh manager processes the collected system inventory data and forwards it to the Wazuh indexer using the :doc:`indexer connector </user-manual/manager/wazuh-indexer-connector>` setting. The indexer connector setting is present by default in the ``/etc/wazuh-manager/wazuh-manager.conf`` file of the Wazuh manager.

By default, the connector points to the localhost and uses the certificates in ``/etc/wazuh-manager/certs/`` on the Wazuh manager. This default works for an all-in-one deployment, where the Wazuh manager and the Wazuh indexer run on the same host. In a distributed deployment, where the indexer runs on separate nodes, you must update the connector configuration to point to your indexer nodes. Follow the steps below to update it.

#. Locate the indexer connector configuration block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file on the Wazuh manager. By default, it points to the local host:

   .. code-block:: xml

      <indexer>
        <hosts>
          <host>https://127.0.0.1:9200</host>
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
          <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
        </ssl>
      </indexer>

   For a distributed deployment, update the block to point to your Wazuh indexer nodes instead. Add a ``<host>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

   .. code-block:: xml
      :emphasize-lines: 2,3

      <hosts>
        <host>https://<WAZUH_INDEXER1_IP>:9200</host>
        <host>https://<WAZUH_INDEXER2_IP>:9200</host>
      </hosts>

   Ensure the Wazuh indexer CA and the Wazuh manager client certificate and key exist in ``/etc/wazuh-manager/certs/`` as ``indexer-ca.pem``, ``indexer-connector.pem``, and ``indexer-connector-key.pem``. If the Wazuh indexer runs on the same host, the Wazuh manager imports these files from ``/etc/wazuh-indexer/export/`` when it is installed and before every start.

   You can check the certificates and the configuration files of the Wazuh manager with the following command. It prints ``check: no problem found`` on success, and exits ``1`` on any problem:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check

#. Run the command below to verify the connection to the Wazuh indexer from the Wazuh manager. Enter the Wazuh indexer password when prompted:

   .. code-block:: console

      # curl -k -u <WAZUH_INDEXER_USERNAME> -XGET https://<INDEXER_IP_ADDRESS>:9200/_cluster/health?pretty

   Replace ``<INDEXER_IP_ADDRESS>`` with the address in the ``<host>`` entry of the ``<indexer>`` section.

   A successful connection returns a result similar to the following:

   .. code-block:: none
      :class: output

      {
        "cluster_name" : "wazuh-cluster",
        "status" : "green",
        "timed_out" : false,
        "number_of_nodes" : 1,
        "number_of_data_nodes" : 1,
        "discovered_master" : true,
        "discovered_cluster_manager" : true,
        "active_primary_shards" : 108,
        "active_shards" : 108,
        "relocating_shards" : 0,
        "initializing_shards" : 0,
        "unassigned_shards" : 0,
        "delayed_unassigned_shards" : 0,
        "number_of_pending_tasks" : 0,
        "number_of_in_flight_fetch" : 0,
        "task_max_waiting_in_queue_millis" : 0,
        "active_shards_percent_as_number" : 100.0
      }

   .. note::

      A ``green`` or ``yellow`` status means the connection works. A ``red`` status means some primary shards are unavailable, and the Wazuh manager stops sending data to that node until it recovers.

      The Wazuh manager stores the Wazuh indexer password in its keystore during installation. If your Wazuh indexer nodes use a different password, for example after you change it, update the keystore and then restart the Wazuh manager:

      .. code-block:: console

         # printf '%s' '<NEW_INDEXER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password

#. Restart the Wazuh manager to apply the configuration:

   .. code-block:: console

      # systemctl restart wazuh-manager
