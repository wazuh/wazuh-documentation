.. _poc_detect_unauthorized_process_netcat:


Detecting unauthorized processes - Netcat
=========================================

Wazuh is capable of detecting if Netcat is running on a monitored host.

Configuration
-------------
On the monitored endpoint (Linux RHEL):

- Add ``<localfile>`` configuration block to periodically get a list of running processes. This can be done in the ``ossec.conf`` file.

    .. code-block:: XML

        <ossec_config>
            <localfile>
                <log_format>full_command</log_format>
                <alias>process list</alias>
                <command>ps -e -o pid,uname,command</command>
                <frequency>30</frequency>
            </localfile>
        </ossec_config>

- Restart the Wazuh agent to apply changes    

    .. code-block:: XML

        systemctl restart wazuh-agent

Install Netcat and required dependencies

    .. code-block:: XML

        yum install nmap-ncat

On Wazuh Manager:

- Add following rules to ``/var/ossec/etc/rules/local_rules.xml``:

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

Steps to Generate alerts
^^^^^^^^^^^^^^^^^^^^^^^^

- Log in to the RHEL system and run ``nc -l -p 8000`` (keep it running for 30 seconds)

Alerts
^^^^^^

- ``rule.id:(601 OR 100100)``

Affected endpoint
^^^^^^^^^^^^^^^^^

- Linux RHEL