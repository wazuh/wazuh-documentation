.. _poc_ids_integration_suricata:

Network IDS integration - Suricata
==================================

Suricata is a NIDS solution that can detect threats by monitoring the network traffic. An example use case can be found at the following document: `Catch suspicious network traffic <https://documentation.wazuh.com/current/learning-wazuh/suricata.html>`_.

Configuration
-------------

On Linux RHEL monitored endpoint:

- Install Suricata (tested with version 5.0.4). It requires EPEL repository (be aware that this repository depends on your operating system version):

    .. code-block:: XML

        yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
        yum -y install suricata-5.0.4

- Download and extract Emerging rules:

    .. code-block:: XML

        cd /tmp/
        curl -LO https://rules.emergingthreats.net/open/suricata-5.0.4/emerging.rules.tar.gz
        tar -xvzf emerging.rules.tar.gz && mv rules/*.rules /etc/suricata/rules/
        chown suricata:suricata /etc/suricata/rules/*.rules
        chmod 640 /etc/suricata/rules/*.rules

- Modify Suricata settings at ``/etc/suricata/suricata.yaml``

    .. code-block:: XML

        EXTERNAL_NET: "any"

    .. code-block:: XML

        default-rule-path: /etc/suricata/rules
        rule-files:
        - "*.rules"

- Start Suricata

    .. code-block:: console

        systemctl enable suricata
        systemctl daemon-reload
        systemctl start suricata

- Configure the Wazuh agent to read Suricata alerts file. The following settings need to be added to ``/var/ossec/etc/ossec.conf file``:

    .. code-block:: XML

        <localfile>
            <log_format>syslog</log_format>
            <location>/var/log/suricata/eve.json</location>
        </localfile>

- Apply changes to Wazuh agent

    .. code-block:: console

        systemctl restart wazuh-agent


Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Wazuh will automatically parse data from /var/log/suricata/eve.json and generate related alerts

Alerts
^^^^^^

- ``rule.groups:*suricata*``

Affected endpoint
^^^^^^^^^^^^^^^^^

- Linux RHEL