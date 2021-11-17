.. _poc_detect_unauthorized_process_netcat:

Detecting unauthorized processes - Netcat
=========================================

This POC shows how Wazuh is capable of detecting if Netcat is running on a monitored host.

You can learn more about the :ref:`command monitoring capability <manual_command_monitoring>` in the documentation.

Configuration
-------------

Configure your environment as follows to test the POC.

#. Add the following configuration block under the `<localfile>` section of the ``/var/ossec/etc/ossec.conf`` file at the monitored RHEL 7 endpoint. This is to periodically get a list of running processes.

    .. code-block:: XML

        <ossec_config>
            <localfile>
                <log_format>full_command</log_format>
                <alias>process list</alias>
                <command>ps -e -o pid,uname,command</command>
                <frequency>30</frequency>
            </localfile>
        </ossec_config>

#. Restart the Wazuh agent to load the changes.

    .. code-block:: console

        # systemctl restart wazuh-agent

#. Install Netcat and required dependencies on the RHEL 7 agent endpoint.

    .. code-block:: console

        # yum install nmap-ncat

#. Add following rules to ``/var/ossec/etc/rules/local_rules.xml`` at the Wazuh manager's endpoint.

    .. code-block:: XML

        <group name="ossec,">
            <rule id="100050" level="0">
                <if_sid>530</if_sid>
                <match>^ossec: output: 'process list'</match>
                <description>List of running processes.</description>
                <group>process_monitor,</group>
            </rule>
            <rule id="100051" level="7" ignore="900">
                <if_sid>100050</if_sid>
                <match>nc -l</match>
                <description>Netcat listening for incoming connections.</description>
                <group>process_monitor,</group>
            </rule>
        </group>

Steps to generate alerts
------------------------

#. Log in to the monitored RHEL 7 system and run ``nc -l 8000`` for 30 seconds.

Query the alerts
----------------

Related alerts can be found with:

- ``rule.id:(601 OR 100051)``

Affected endpoints
------------------

- CentOS 8 agent host
