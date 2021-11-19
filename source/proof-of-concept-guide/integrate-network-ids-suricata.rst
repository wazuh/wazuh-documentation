.. _poc_ids_integration_suricata:

Network IDS integration - Suricata
==================================

Suricata is a network-based intrusion detection system (NIDS) that can detect threats by monitoring network traffic. This solution is capable of generating JSON logs of NIDS events and provides additional insight into your security with its network traffic inspection capabilities.

In this scenario you will need:

* CentOS Linux 8 with Wazuh agent installed

To see an example use case of a NIDS integration with Wazuh, go to the `Catch suspicious network traffic <learning_wazuh_suricata>`_ section of the documentation.


Configuration
-------------

Configure your environment as follows to test the POC.

#. Install Suricata (with version 5.0.4) on the CentOS 8 monitored endpoint. This requires EPEL repository that depends on your operating system version.

    .. code-block:: XML

        yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
        yum -y install suricata-5.0.7

#. Download and extract Emerging rules.

    .. code-block:: console

        cd /tmp/
        curl -LO https://rules.emergingthreats.net/open/suricata-5.0.7/emerging.rules.tar.gz
        tar -xvzf emerging.rules.tar.gz && mv rules/*.rules /etc/suricata/rules/
        chown suricata:suricata /etc/suricata/rules/*.rules
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

#. Configure the Wazuh agent to read Suricata logs file. The following settings need to be added to the ``/var/ossec/etc/ossec.conf`` file of the monitored CentOS 8 endpoint.

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

#. No action is required. Wazuh automatically parses data from ``/var/log/suricata/eve.json`` and generates related alerts.

Query the alerts
----------------

At the Kibana menu go to the Discover option, from there you will be able to add filters and search-related alerts using the following filter:

- ``rule.groups:*suricata*``

.. thumbnail:: ../images/poc/Network_IDS_integration.png
          :title: Network IDS integration - Suricata
          :align: center
          :wrap_image: No

Troubleshooting
---------------

* In case of getting errors concerning network interface in suricata log file /var/log/suricata/suricata.log. Don't forget to check the name of your network interface and configure accordingly, here ``/etc/sysconfig/suricata`` and here ``/etc/suricata/suricata.yaml``.