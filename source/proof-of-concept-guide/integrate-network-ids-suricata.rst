.. meta::
  :description: Wazuh can be integrated with Suricata, a NIDS that can detect threats by monitoring network traffic. Learn more about this in this PoC.

.. _poc_ids_integration_suricata:

Network IDS integration
=======================

You can integrate Wazuh with Suricata, a network-based intrusion detection system (NIDS), to detect threats by monitoring network traffic. This solution can generate JSON logs of NIDS events and provide additional insight into your network's security with its network traffic inspection capabilities.

To see an example use case of a NIDS integration with Wazuh, go to the :ref:`Catch suspicious network traffic <learning_wazuh_suricata>` section of the documentation.


Configuration
-------------

Configure your environment as follows to test the PoC.

#. Install Suricata (tested with version 5.0.8) on the Ubuntu 20 monitored endpoint. This requires EPEL repository that depends on your operating system version. This process can take over 10 minutes.

    .. code-block:: XML

        add-apt-repository ppa:oisf/suricata-5.0
        apt-get update
        apt-get install suricata -y

#. Download and extract Emerging rules.

    .. code-block:: console

        cd /tmp/
        curl -LO https://rules.emergingthreats.net/open/suricata-5.0.8/emerging.rules.tar.gz
        tar -xvzf emerging.rules.tar.gz && mv rules/*.rules /etc/suricata/rules/
        chmod 640 /etc/suricata/rules/*.rules

#. Modify Suricata settings in the ``/etc/suricata/suricata.yaml`` file.

    .. code-block:: XML

        EXTERNAL_NET: "any"

    .. code-block:: XML

        default-rule-path: /etc/suricata/rules
        rule-files:
        - "*.rules"

#. Start Suricata.

    .. code-block:: console

        systemctl enable suricata
        systemctl daemon-reload
        systemctl start suricata

#. Configure the Wazuh agent to read Suricata logs file. The following settings need to be added to the ``/var/ossec/etc/ossec.conf`` file of the monitored Ubuntu 20 endpoint.

    .. code-block:: XML

        <localfile>
            <log_format>syslog</log_format>
            <location>/var/log/suricata/eve.json</location>
        </localfile>

#. Restart the Wazuh agent to apply the changes.

    .. code-block:: console

        systemctl restart wazuh-agent


Steps to generate the alerts
----------------------------

No action is required. Wazuh automatically parses data from ``/var/log/suricata/eve.json`` and generates related alerts. If desired, when rules are loaded and interface entered in promiscuous (sniffing mode), you can ping your manager to generate an alert from suricata.

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

- ``rule.groups:suricata``

.. thumbnail:: ../images/poc/Network-IDS-integration.png
          :title: Network IDS integration - Suricata
          :align: center
          :wrap_image: No

Troubleshooting
---------------

* Error concerning network interface in Suricata log file ``/var/log/suricata/suricata.log``.

To solve this issue, check the name of your network interface and configure it accordingly in the files ``/etc/sysconfig/suricata`` and ``/etc/suricata/suricata.yaml``.