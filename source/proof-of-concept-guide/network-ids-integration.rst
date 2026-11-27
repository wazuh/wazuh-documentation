.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh integrates with a network-based intrusion detection system to enhance threat detection by monitoring network traffic. Learn more about it in this PoC.

Network IDS integration
=======================

Wazuh integrates with network intrusion detection systems (NIDS) to detect threats in network traffic. In this use case, you install `Suricata <https://suricata.io/>`__ on the Ubuntu endpoint, send its alerts to Wazuh, and generate suspicious traffic.

Endpoints
---------

+--------------+-----------------------------------------------------------------------------------------------+
| Endpoint     | Role                                                                                          |
+==============+===============================================================================================+
| Ubuntu 24.04 | Runs Suricata. Wazuh analyzes the Suricata alerts about the network traffic of this endpoint. |
+--------------+-----------------------------------------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Install Suricata. We tested this procedure with Suricata 8.0.8:

   .. code-block:: console

      $ sudo add-apt-repository -y ppa:oisf/suricata-stable
      $ sudo apt-get update
      $ sudo apt-get install suricata -y

#. Download the Suricata ruleset:

   .. code-block:: console

      $ sudo suricata-update

#. Find the name of the network interface:

   .. code-block:: console

      $ ip -br link

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>
      enp0s3           UP             08:00:27:14:65:bd <BROADCAST,MULTICAST,UP,LOWER_UP>

#. Edit ``/etc/suricata/suricata.yaml`` and set the following values under their parent keys. Replace ``<UBUNTU_IP>`` with the IP address of the Ubuntu endpoint and ``<INTERFACE>`` with the interface name from the previous step. Leave the other settings as they are:

   .. code-block:: yaml
      :emphasize-lines: 3, 7

      vars:
        address-groups:
          HOME_NET: "<UBUNTU_IP>"
          EXTERNAL_NET: "any"

      af-packet:
        - interface: <INTERFACE>

#. Restart the Suricata service:

   .. code-block:: console

      $ sudo systemctl restart suricata

#. Append the following configuration to ``/var/ossec/etc/ossec.conf`` so that the Wazuh agent reads the Suricata log file:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>json</log_format>
          <location>/var/log/suricata/eve.json</location>
        </localfile>
      </ossec_config>

#. Add the ``wazuh`` user to the ``suricata`` group, so that the Wazuh agent can read the ``/var/log/suricata`` directory:

   .. code-block:: console

      $ sudo usermod -aG suricata wazuh

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^

#. Go to **Ruleset management** > **Overview**.

#. Search for ``suricata`` and click the **suricata** integration name to open it.

#. Click **Actions** and select **Enable**.

   .. thumbnail:: /images/poc/network-ids-integration-enable.png
      :title: Enable the suricata integration
      :alt: Wazuh dashboard Ruleset management page of the suricata integration with the Enable option in the Actions menu
      :align: center
      :width: 80%

Wait about 5 minutes before you generate test traffic.

.. _poc_network_ids_verify_data_ingestion:

Verify data ingestion
---------------------

#. Check that Suricata loaded its rules. Without rules, Suricata raises no alerts, and a fresh install has no rules until ``suricata-update`` runs. The command prints a number greater than 0:

   .. code-block:: console

      $ sudo grep -c '^alert' /var/lib/suricata/rules/suricata.rules

#. Check that Suricata writes events:

   .. code-block:: console

      $ sudo tail -n 1 /var/log/suricata/eve.json

#. In the Wazuh dashboard, go to **Explore** > **Discover** and search for ``wazuh.integration.name: suricata`` in the last 15 minutes. You see Suricata events.

   .. thumbnail:: /images/poc/network-ids-discover.png
      :title: Suricata events in Discover
      :alt: Wazuh dashboard Discover page listing the events found with the wazuh.integration.name: suricata search
      :align: center
      :width: 80%

.. _poc_network_ids_attack_emulation:

Attack emulation
----------------

Wazuh reads the Suricata alerts from ``/var/log/suricata/eve.json`` and creates findings from them.

#. On the Ubuntu endpoint, send an HTTP request to an IP address with curl. Suricata flags this traffic as suspicious:

   .. code-block:: console

      $ curl -s http://1.1.1.1/

#. Check that Suricata raised an alert:

   .. code-block:: console

      $ sudo grep '"event_type":"alert"' /var/log/suricata/eve.json | tail -1

The output includes ``"signature":"ET HUNTING curl User-Agent to Dotted Quad"``.

View the findings
-----------------

You see the finding ``Suricata IDS alert triggered - uncategorized - ET HUNTING curl User-Agent to Dotted Quad``, from the Suricata integration rules.

#. In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting** > **Findings**.

#. Filter for ``wazuh.integration.name: suricata``. You see the finding, with level medium.

   .. thumbnail:: /images/poc/network-ids-findings.png
      :title: Network IDS findings
      :alt: Wazuh dashboard Threat Hunting Findings tab showing the Suricata IDS alert triggered finding for the Ubuntu 24.04 agent
      :align: center
      :width: 80%

#. Click the magnifying glass icon to see the finding details, including the source and destination IP addresses.

   .. thumbnail:: /images/poc/network-ids-findings-details.png
      :title: Network IDS finding details
      :alt: Document details of the Suricata IDS alert finding, including the source and destination IP addresses
      :align: center
      :width: 80%

Troubleshooting
---------------

+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------+
| Check                                   | How                                                                                                                   |
+=========================================+=======================================================================================================================+
| Suricata runs                           | ``systemctl is-active suricata`` prints ``active``.                                                                   |
+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------+
| Suricata has rules loaded               | The ``grep -c`` command from :ref:`Verify data ingestion <poc_network_ids_verify_data_ingestion>` prints more than 0. |
+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------+
| Suricata raised an alert                | The ``grep`` command from :ref:`Attack emulation <poc_network_ids_attack_emulation>` prints one line.                 |
+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------+
| The agent can read the log              | The ``wazuh`` user is in the ``suricata`` group: ``id wazuh``.                                                        |
+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------+
| The ``suricata`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.      |
+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------+
