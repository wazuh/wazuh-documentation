.. _poc_ids_integration_suricata:

Network IDS integration - Suricata
==================================

Monitor logs of the Suricata NIDS solution to detect threats in network traffic.

An example use case can be found at :ref:`learning_wazuh_suricata`.

Configuration
-------------

#. Install Suricata in the RHEL 7 monitored endpoint from the EPEL repository.

    .. code-block:: console

        # yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
        # yum -y install suricata-5.0.4

#. Download and extract Emerging rules:

    .. code-block:: console

        # cd /tmp/
        # curl -LO https://rules.emergingthreats.net/open/suricata-5.0.4/emerging.rules.tar.gz
        # tar -xvzf emerging.rules.tar.gz && mv rules/*.rules /etc/suricata/rules/
        # chown suricata:suricata /etc/suricata/rules/*.rules
        # chmod 640 /etc/suricata/rules/*.rules

#. Modify Suricata settings at ``/etc/suricata/suricata.yaml``

    .. code-block:: YAML

        EXTERNAL_NET: "any"

    .. code-block:: YAML

        default-rule-path: /etc/suricata/rules
        rule-files:
        - "*.rules"

#. Start Suricata.

    .. code-block:: console

        # systemctl daemon-reload
        # systemctl enable suricata
        # systemctl start suricata

#. Configure the Wazuh agent to read Suricata logs file. The following settings need to be added to ``/var/ossec/etc/ossec.conf`` at the monitored RHEL 7 endpoint.

    .. code-block:: XML

        <localfile>
            <log_format>syslog</log_format>
            <location>/var/log/suricata/eve.json</location>
        </localfile>

#. Restart the Wazuh agent.

    .. code-block:: console

        # systemctl restart wazuh-agent


Steps to generate the alerts
----------------------------

No action required. Wazuh will automatically parse data from ``/var/log/suricata/eve.json`` and generate related alerts.

Alerts
------

Related alerts can be found with:

* ``rule.groups:*suricata*``

Affected endpoints
------------------

* RHEL 7 agent host
