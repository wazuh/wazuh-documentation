.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_0:

3.9.0 Release Notes
===================

In this section, we're listing the starred improvements and fixes in Wazuh 3.9.0. A complete list of changes is provided in the `change log <https://github.com/wazuh/wazuh/blob/v3.9.0/CHANGELOG.md>`_.

Wazuh Core improvements
------------------------

    The Wazuh core has received a few improvements since the last version:

        * **Added support in Syscollector for network and open ports inventory on Windows XP.**
            
            Now, ``Syscollector`` supports ``<network>`` and ``<ports>`` on legacy **Windows XP** and **Windows Server 2003**.

        * ``Syscollector`` **data is now decoded into dynamic fields, so we can define rules based on events from Syscollector**
            
            Using ``syscollector`` as the value in ``<decoded_as>`` field on a decoder, alerts will be shown in Kibana as ``syscollector`` fields *(data.type.value)*

        * **New option in File Integrity Monitoring to enable the** ``health check`` **for** ``<whodata>``.
            
            .. code-block:: bash
                
                # /var/ossec/etc/ossec.conf
                
                <syscheck>
                    <whodata>
                        <startup_healthcheck>yes</startup_healthcheck>
                    </whodata>
                </syscheck>

        * **If** ``ossec-remoted`` **wasn't properly configured, it exited without logging any message. Now it does!:**
            
            .. code-block:: bash
            
                "Remoted connection is not configured... Exiting."

        * **Now** ``agent_auth`` **daemon warns users when it receives extra input arguments.**
            
            .. code-block:: bash

                $ ./agent-auth -m 192.168.1.1 -i 192.168.1.2
                2019/02/05 07:00:08 agent-auth: WARNING: Extra arguments detected. They will be ignored.
                2019/02/05 07:00:08 agent-auth: INFO: Started (pid: 7252).

        * **The** ``who-data`` **option works from now on ``Fedora 29`` because both have added Audit 3.0 (beta) support.** 


        * **Now** ``Syscollector`` **gets bonded interfaces' MAC.**


        * **To finish with the changes in the Wazuh core, mention the list of little bugs and errors that the team has fixed, which can be checked in the** `Wazuh core CHANGELOG. <https://github.com/wazuh/wazuh/blob/master/CHANGELOG.md>`_


Wazuh Ruleset improvements
---------------------------

    In this release, the Ruleset has only added three differences since the last version:

        * Added Sysmon rules to new Windows eventchannel format.
            The anomalies on event **ID 1** of ``Sysmon`` can be detected now thanks to this new rules!!

        * Added ruleset for the Configuration Assessment module.
            The team has added a full directories structure with many new rules related with the ``Configuration Assessment`` modules. They have also added policy files in YAML, new decoders, etc.

Wazuh API
---------

    The Wazuh API has received multiple additions that allow the Kibana App make new calls and automatize everything easier.

        * **Now, the** ``Wazuh API`` **can make calls to edit the Wazuh configuration files as** ``ossec.conf``, **rules lists and decoders.**
    
        * **Also, makes calls to restart manager nodes in the cluster, to get CDB lists, and even get configuration assessment policies and checks.**

        Examples of this are:

            Making calls to *get CDB lists*:

            .. code-block:: bash

                # curl -u foo:bar -k -X GET "CDB list address"

            Making calls to *restart* manager nodes in the cluster and *validate* configuration:

            .. code-block:: bash

                # curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/restart?pretty"


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
