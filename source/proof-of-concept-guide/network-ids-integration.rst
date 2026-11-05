.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh integrates with a network-based intrusion detection system to enhance threat detection by monitoring network traffic. Learn more about it in this PoC.

Network IDS integration
=======================

Wazuh integrates with a network-based intrusion detection system (NIDS) to enhance threat detection by monitoring and analyzing network traffic.

In this use case, you integrate Suricata with Wazuh. Suricata provides additional insights into your network's security with its network traffic inspection capabilities.

Infrastructure
--------------

+--------------+------------------------------------------------------------------------------------------------------------------------------------------------+
| Endpoint     | Description                                                                                                                                    |
+==============+================================================================================================================================================+
| Ubuntu 24.04 | This is the endpoint where you install Suricata. In this use case, Wazuh monitors and analyzes the network traffic generated on this endpoint. |
+--------------+------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Take the following steps to configure Suricata on the Ubuntu endpoint and send the generated logs to the Wazuh manager.

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Install Suricata on the Ubuntu endpoint. We tested this process with version 8.0.6:

   .. code-block:: console

      $ sudo add-apt-repository ppa:oisf/suricata-stable
      $ sudo apt-get update
      $ sudo apt-get install suricata -y

#. Download the Suricata ruleset:

   .. code-block:: console

      $ sudo suricata-update

#. Modify Suricata settings in the ``/etc/suricata/suricata.yaml`` file and set the following variables:

   .. code-block:: yaml

      HOME_NET: "<UBUNTU_IP>"
      EXTERNAL_NET: "any"

      default-rule-path: /var/lib/suricata/rules
      rule-files:
      - suricata.rules

      # Global stats configuration
      stats:
        enabled: yes

      # Linux high speed capture support
      af-packet:
        - interface: enp0s3

   ``interface`` represents the network interface you want to monitor. Replace the value with the interface name of the Ubuntu endpoint. For example, ``enp0s3``. Run the following command to find the interface name:

   .. code-block:: console

      $ ip -br link

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>
      enp0s3           UP             08:00:27:14:65:bd <BROADCAST,MULTICAST,UP,LOWER_UP>

#. Restart the Suricata service:

   .. code-block:: console

      $ sudo systemctl restart suricata

#. Add the following configuration to the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent. This allows the Wazuh agent to read the Suricata log file:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>json</log_format>
          <location>/var/log/suricata/eve.json</location>
        </localfile>
      </ossec_config>

#. Add the ``wazuh`` user to the ``suricata`` group to give the Wazuh agent read access to the ``/var/log/suricata`` directory:

   .. code-block:: console

      $ sudo usermod -aG suricata wazuh

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^

#. Navigate to **Ruleset management** > **Overview**.

#. Enter ``suricata`` in the search box and select the **suricata** integration.

#. Click the **suricata** integration name to open it, then click **Actions** and select **Enable**. Wait a few minutes before you generate test traffic.

   .. thumbnail:: /images/poc/network-ids-integration-enable.png
      :title: Enable the suricata integration
      :alt: Wazuh dashboard Ruleset management page for the suricata integration with the Actions menu open and Enable highlighted
      :align: center
      :width: 80%

Attack emulation
----------------

Wazuh automatically parses data from ``/var/log/suricata/eve.json`` and generates related findings on the Wazuh dashboard.

Run the command below on the Ubuntu endpoint to generate suspicious traffic:

.. code-block:: console

   $ curl -s http://1.1.1.1/

Visualize the findings
----------------------

You can visualize the findings in the Wazuh dashboard. Go to **Threat intelligence** > **Threat Hunting** > **Findings**, then filter for ``wazuh.integration.name: suricata``.

.. thumbnail:: /images/poc/network-ids-findings.png
   :title: Network IDS findings
   :alt: Wazuh dashboard Threat Hunting Findings tab filtered by wazuh.integration.name suricata, showing the Suricata finding
   :align: center
   :width: 80%

Click the magnifying glass icon to view the finding details, including the source and destination IP addresses.

.. thumbnail:: /images/poc/network-ids-findings-details.png
   :title: Network IDS finding details
   :alt: Wazuh dashboard document details panel for a Suricata finding showing the source and destination IP addresses
   :align: center
   :width: 80%
