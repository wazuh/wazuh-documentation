.. _poc_ids_integration_suricata:

Network IDS integration - Suricata
==================================

Suricata is a NIDS solution that can detect threats by monitoring the network traffic. This intrusion detection system is capable of generating JSON logs of NIDS events and provides additional insight into your security with its network traffic inspection capabilities.

To see an example use case of a NIDS integration with Wazuh, go to the `Catch suspicious network traffic <learning_wazuh_suricata>`_ section.


Configuration
-------------

Configure your environment as follows to test the POC.

On Linux RHEL monitored endpoint:

#. Install Suricata on the RHEL 7 monitored endpoint from the EPEL repository. Take into account that Suricata was tested using 5.0.4 and that the EPEL repository depends on your operating system version:

    .. code-block:: XML

        yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
        yum -y install suricata-5.0.4

#. Download and extract Emerging rules.

    .. code-block:: console

        cd /tmp/
        curl -LO https://rules.emergingthreats.net/open/suricata-5.0.4/emerging.rules.tar.gz
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

#. Configure the Wazuh agent to read Suricata logs file. The following settings need to be added to the ``/var/ossec/etc/ossec.conf`` file of the monitored RHEL 7 endpoint.

    .. code-block:: XML

        <localfile>
            <log_format>syslog</log_format>
            <location>/var/log/suricata/eve.json</location>
        </localfile>

#. Restart the Wazuh agent to apply the changes. 

    .. code-block:: console

        systemctl restart wazuh-agent


Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. No action is required. Wazuh automatically parses data from ``/var/log/suricata/eve.json`` and generates related alerts.

Querying the alerts
-------------------

Related alerts can be found with:

- ``rule.groups:*suricata*``

Affected endpoint
^^^^^^^^^^^^^^^^^

- Linux RHEL 7