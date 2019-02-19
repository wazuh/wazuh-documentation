.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_0:

3.9.0 Release Notes
===================

In this section, all the new Wazuh Improvements and Fixes added in 3.9 version are going to be listed:

Wazuh Core improvements
------------------------

    The Wazuh core has received a few improvements since last version:

    Added new funcionalities:
        * Collect network and port inventory for older Windows versions.
            Now, the network and port inventory are supported in the agents with ``Syscollector`` in the ``XP`` and ``Server 2003`` Windows versions.
        * Wazuh now includes inventory fields as ``dynamic fields in events`` to use them in the rules.
            Added the ability to use the Syscollector imformation to trigger alerts and to show that information in the description of the alerts.
            Using ``syscollector`` as the value in ``<decoded_as>`` field on a decoder, alerts will be shown in Kibana as ``syscollector`` fields *(data.type.value)*

            .. code-block:: xml

                <rule id="100001" level="5">
                    <if_sid>221</if_sid>
                    <decoded_as>syscollector</decoded_as>
                    <field name="netinfo.iface.name">eth0</field>
                    <description>eth0 interface enabled. IP: $(netinfo.iface.ipv4.address)</description>
                </rule>

            There, users can filter the events as ``syscollector`` filters.

        * Now the ``who-data health-check`` is optional thanks to the new startup_healthcheck option.

            .. code-block:: bash

                <syscheck>
                    <whodata>
                        <audit_healthcheck_enabled>no</audit_healthcheck_enabled>
                    </whodata>
                    ...
                </syscheck>
    
    Some changes to improve the internal workings of Wazuh:
        * The start-up logging messages have been improved.
        * Now ``agent_auth`` daemon warns users when it receives extra input arguments.

            .. code-block:: bash

                $ ./agent-auth -m 192.168.1.1 -i 192.168.1.2
                2019/02/05 07:00:08 agent-auth: WARNING: Extra arguments detected. They will be ignored.
                2019/02/05 07:00:08 agent-auth: INFO: Started (pid: 7252).

        * Now ``who-data`` works on **Fedora 29**!
        * Now ``Syscollector`` gets bonded interfaces' MAC.

    And of course, a long list of fixes:
        * Fixed defects reported by Cppcheck. 
        * Fixed errors in ``Syscollector`` for Windows versions older than `Vista`.
        * Many other fixes users may read in the `Wazuh core CHANGELOG. <https://github.com/wazuh/wazuh/blob/master/CHANGELOG.md>`_


Wazuh Ruleset improvements
---------------------------

    In this version, the Ruleset only has added three differences since last version:
        * Added Sysmon rules to new Windows eventchannel format.


        .. code-block:: xml

            Many rules like this one |
                                     V

            <rule id="184665" level="0">
                <if_sid>18100</if_sid>
                <match>Microsoft-Windows-Sysmon/Operational: INFORMATION(1)</match>
                <description>Sysmon - Event 1</description>
                <group>sysmon_event1,</group>
            </rule>

        * Added ruleset for the Configuration Assessment module.
        * And added policy files in YAML format for the Configuration Assessment module.

Wazuh kibana app
-----------------

    The Wazuh APP for Kibana, now supports **Wazuh v3.9.0**, and has added a long list of new configuration options to make the use of the app more user-friendly, as:
        * Allow to edit the master and worker configuration *(very useful)*.
        * Edit local rules, decoders and CDB lists *(even more useful)*.
        * Restart master, workers and agents nodes.
        * Small additions to make it easier to set things up!!

    Also, the app has changed many things to fix errors and to look cooler (And to be more efficient and work better, of course):
        * Escape XML special characters.
        * Using full height for all containers when possible.
        * New design for agent header view.
        * Not fetching data the very first time the Dev Tools are opened.
        * And so on... All the improvements in the app are listed in the `app CHANGELOG. <https://github.com/wazuh/wazuh-kibana-app/blob/master/CHANGELOG.md>`_
