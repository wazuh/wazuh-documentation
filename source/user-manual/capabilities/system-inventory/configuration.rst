.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Syscollector configuration in this section of the Wazuh documentation.

Configuration
=============

The Wazuh system inventory requires both Wazuh agent and Wazuh manager configurations to collect, process, and store system inventory data.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Wazuh agent configuration
-------------------------

The Syscollector module is enabled by default on all endpoints where the Wazuh agent is installed. You can find the Syscollector configuration in the Wazuh agent configuration file at:

- ``/var/ossec/etc/ossec.conf`` for Linux endpoints.
- ``C:\Program Files (x86)\ossec-agent\ossec.conf`` for Windows endpoints.
- ``/Library/Ossec/ossec.conf`` for macOS endpoints.

You can also use the :doc:`centralized configuration </user-manual/reference/centralized-configuration>` file to make changes to the Syscollector module across multiple monitored endpoints that belong to the same agent group. For example, the ``default`` group uses the configuration file, which you can find at ``/var/ossec/etc/shared/default/agent.conf`` on the Wazuh server. Any setting done with the centralized configuration will take precedence over the local agent configuration.

The block below is the default Syscollector configuration present in the Wazuh agent configuration file:

.. code-block:: xml
   :emphasize-lines: 3-15,19

      <!-- System inventory -->
      <wodle name="syscollector">
        <disabled>no</disabled>
        <interval>1h</interval>
        <scan_on_start>yes</scan_on_start>
        <hardware>yes</hardware>
        <os>yes</os>
        <network>yes</network>
        <packages>yes</packages>
        <ports all="no">yes</ports>
        <processes>yes</processes>
        <users>yes</users>
        <groups>yes</groups>
        <services>yes</services>
        <browser_extensions>yes</browser_extensions>

        <!-- Database synchronization settings -->
        <synchronization>
          <max_eps>10</max_eps>
        </synchronization>
      </wodle>

Where:

- ``<disabled>`` specifies whether the Syscollector module is enabled or not. The default value is ``no``. The allowed values are ``yes`` and ``no``.

.. _interval_syscollector:

- ``<interval>`` specifies the time between system scans. The default value is 1 hour. The allowed value is a positive number that should contain a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days).
- ``<scan_on_start>`` initiates a system scan immediately after you restart the Wazuh service on the endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<hardware>`` option enables or disables the hardware information collection by Syscollector. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<os>`` option enables or disables the operating system scan. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<network>`` enables or disables the network scan. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<packages>`` enables or disables the scanning of packages, with a default value of ``yes``. The allowed values are ``yes`` and ``no``.
- ``<ports all="no">`` enables or disables the port scan. The default value is ``yes``. You can configure two allowed values is ``yes`` and ``no``. This option also accepts an additional parameter ``all``, with which you can restrict the scan to only listening ports using ``<ports all="no">``. If you want Syscollector to scan all ports, then you change the value to ``yes``.
- ``<processes>`` enables or disables the scanning for running processes on a monitored endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<users>`` enables or disables the scanning for user accounts on a monitored endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<groups>`` enables or disables the scanning for user account groups on a monitored endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<services>`` enables or disables the scanning for services. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<browser_extensions>`` enables or disables the scanning for browser extensions. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<max_eps>`` allows you to set the maximum event reporting throughput. The default value is 10, which signifies 10 events per second. The allowed value is an Integer number between 0 and 1000000.

In Windows systems, you can use the ``<hotfixes>`` option. Check :ref:`wodle_syscollector_hotfixes` for the details.

.. note::

   Restart the agent if you edited the local ``ossec.conf`` file to ensure the changes take effect. If you used centralized configuration, no manual restart is required because the agent reloads automatically after receiving the update.

Wazuh manager configuration
---------------------------

The Wazuh Inventory Harvester module on the Wazuh manager processes the collected system inventory data and forwards it to the Wazuh indexer using the :doc:`indexer connector </user-manual/reference/ossec-conf/indexer>` setting. The indexer connector setting is enabled by default in the ``/var/ossec/etc/ossec.conf`` file of the Wazuh manager.

The indexer connector may be missing if the Wazuh manager is using an old configuration file or if vulnerability detection was disabled during installation. In such cases,  follow the steps below to add the indexer connector setting.

#. Add the indexer connector configuration block below to the ``/var/ossec/etc/ossec.conf`` file on the Wazuh manager:

   .. code-block:: xml

      <indexer>
        <enabled>yes</enabled>
        <hosts>
          <host>https://0.0.0.0:9200</host>
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/filebeat/certs/root-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
          <key>/etc/filebeat/certs/filebeat-key.pem</key>
        </ssl>
      </indexer>

   Ensure:

   -  The ``<hosts>`` section contains the IP address or hostname of your Wazuh indexer node. You can find this value in the Filebeat configuration file at ``/etc/filebeat/filebeat.yml``.
   -  The ``<ca>``, ``<certificate>``, and ``<key>`` names match the files located in ``/etc/filebeat/certs/``.

#. If you are running a Wazuh indexer cluster infrastructure, add a ``<hosts>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

   .. code-block:: xml

      <hosts>
        <host>https://10.0.0.1:9200</host>
        <host>https://10.0.0.2:9200</host>
      </hosts>

   The Wazuh server will prioritize reporting to the first Wazuh indexer node in the list and switch to the next available node if the first one becomes unavailable.

#. Save the Wazuh indexer username and password into the Wazuh manager keystore using the :doc:`Wazuh-keystore </user-manual/reference/tools/wazuh-keystore>` tool:

   .. code-block:: console

      # echo '<WAZUH_INDEXER_USERNAME>' | /var/ossec/bin/wazuh-keystore -f indexer -k username
      # echo '<WAZUH_INDEXER_PASSWORD>' | /var/ossec/bin/wazuh-keystore -f indexer -k password

   If you have forgotten your Wazuh indexer password, refer to the :doc:`password management </user-manual/user-administration/password-management>` guide to reset it.

#. Run the command below to verify the connection to the Wazuh indexer using the curl command from the Wazuh server. Enter the Wazuh indexer password when prompted:

   .. code-block:: console

      # curl --cacert <ROOT_CA> --cert <CERTIFICATE_PEM> --key <CERTIFICATE_KEY> -u <WAZUH_INDEXER_USER> -XGET https://<INDEXER_IP_ADDRESS>:9200/_cluster/health

   Where:

   -  ``<ROOT_CA>``, ``<CERTIFICATE_PEM>``, ``<CERTIFICATE_KEY>``: Certificate paths.
   -  ``<USER>`` and ``<PASS>``: Admin username of the Wazuh indexer.
   -  ``<WAZUH_INDEXER_IP_ADDRESS>``: IP address of the Wazuh indexer.

   If this command fails, the vulnerability detector module won't be able to connect to the Wazuh indexer.

   To check if the issue is related to certificates, bypass certificate verification using the -k option. Enter the Wazuh indexer password when prompted:

   .. code-block:: console

      # curl -k -u <WAZUH_INDEXER_USERNAME> -XGET https://<INDEXER_IP_ADDRESS>:9200/_cluster/health

   A successful connection returns a result similar to the following:

   .. code-block:: none
      :class: output

      {
          "cluster_name": "opensearch",
          "status": "green",
          "timed_out": false,
          "number_of_nodes": 1,
          "number_of_data_nodes": 1,
          "discovered_master": true,
          "discovered_cluster_manager": true,
          "active_primary_shards": 9,
          "active_shards": 9,
          "relocating_shards": 0,
          "initializing_shards": 0,
          "unassigned_shards": 0,
          "delayed_unassigned_shards": 0,
          "number_of_pending_tasks": 0,
          "number_of_in_flight_fetch": 0,
          "task_max_waiting_in_queue_millis": 0,
          "active_shards_percent_as_number": 100.0
      }

#. Restart the Wazuh manager to apply the configuration:

   .. code-block:: console

      # sudo systemctl restart wazuh-manager
