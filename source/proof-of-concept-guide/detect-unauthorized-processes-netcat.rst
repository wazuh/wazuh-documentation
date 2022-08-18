
.. meta::
  :description: This PoC shows how Wazuh is capable of detecting if Netcat is running on a monitored host. Learn more about this in this section of the documentation.

.. _poc_detect_unauthorized_process_netcat:

Detecting unauthorized processes
================================

Netcat is a computer networking utility that functions as a back-end tool that allows for port scanning and port listening. This PoC shows how Wazuh is capable of detecting if Netcat is running on a monitored host.

Check our documentation to learn more about the :ref:`command monitoring <manual_command_monitoring>` capabilities of Wazuh.

Configuration
-------------

Configure your environment as follows to test the PoC.

#. Add the following configuration block under the ``<localfile>`` section of the ``/var/ossec/etc/ossec.conf`` file at the monitored Ubuntu 20 endpoint. This periodically gets a list of running processes.

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

#. Install Netcat and required dependencies on the Ubuntu 20 endpoint.

    .. code-block:: console

        # apt install ncat nmap -y

#. Add following rules to ``/var/ossec/etc/rules/local_rules.xml`` at the Wazuh manager.

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

#. Restart the Wazuh manager to load the changes.

    .. code-block:: console

        # systemctl restart wazuh-manager

Steps to generate alerts
------------------------

#. Log into the monitored Ubuntu 20 system and run ``nc -l 8000`` for 30 seconds.

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

- ``rule.id:(533 OR 100051)``

.. thumbnail:: ../images/poc/Detecting-unauthorized-processes.png
          :title: Detecting unauthorized processes - Netcat
          :align: center
          :wrap_image: No
