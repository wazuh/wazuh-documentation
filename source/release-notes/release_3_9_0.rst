.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_0:

3.9.0 Release Notes
===================

In this section, we're listing the starred improvements and fixes in Wazuh 3.9.0. A complete list of changes is provided in the `change log <https://github.com/wazuh/wazuh/blob/v3.9.0/CHANGELOG.md>`_.

Wazuh Core improvements
------------------------

    The Wazuh core has received a few improvements since the last version:

        * **One of the most important changes,is the addition of a new module to perform ``Configuration Assessment`` scans.**

            This new module, in combination with the older three other modules, improves the way Wazuh monitorizes the policies. From now on, the ``Configuration Assessment`` module translates the files into YAML, thus allowing the extraction of more interesting fields, being all the information obtained by this module and by the scans stored in databases to be compared with the information from other scans.

            To know more about this module, lets add an example that runs a scan the 15th of every month:

                .. code-block:: xml

                    <configuration_assessment>
                        <enabled>yes</enabled>
                        <scan_on_start>yes</scan_on_start>
                        <scan_day>29</scan_day>
                        <skip_nfs>yes</skip_nfs>

                        <policies>
                            <policy>cis_debian_linux_rcl.yml</policy>
                        </policies>
                    </configuration_assessment>

            The events gnerated by this module are shown in **Kibana** this way:



        * **Added support in Syscollector for network and open ports inventory on Windows XP.**
            
            Now, `Syscollector` supports ``<network>`` and ``<ports>`` on legacy *Windows XP* and *Windows Server 2003*.

        * ``Syscollector`` **data is now decoded into dynamic fields, so we can define rules based on events from Syscollector**
            
            Using ``syscollector`` as the value in ``<decoded_as>`` field on a decoder, alerts will be shown in Kibana as ``syscollector`` fields *(data.type.value)*

            .. thumbnail:: ../images/release-notes/3.9.0/syscollector.png
                :title: Syscollector events filtered in Kibana.
                :align: center
                :width: 70%

        * **New option in File Integrity Monitoring to enable the** `health check` **for** ``<whodata>``.
            
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

        * **The** ``who-data`` **option works from now on** ``Fedora 29`` **because both have added Audit 3.0 (beta) support.** 


        * **Now** ``Syscollector`` **gets bonded interfaces' MAC.**


        * **To finish with the changes in the Wazuh core, mention the list of little bugs and errors that the team has fixed, which can be checked in the** `Wazuh core CHANGELOG. <https://github.com/wazuh/wazuh/blob/master/CHANGELOG.md>`_


Wazuh Ruleset improvements
---------------------------

    In this release, the Ruleset has only added three differences since the last version:

        * **Added** `Sysmon` **rules to new Windows eventchannel format.**

            The anomalies on event **ID 1** of ``Sysmon`` can be detected now thanks to this new rules!!

        * **Added ruleset for the Configuration Assessment module.**
        
            The team has added a full directories structure with many new rules related with the ``Configuration Assessment`` module. They have also added policy files in YAML, new decoders, etc.

Wazuh API
---------

    The Wazuh API has received multiple additions that allow the users to make different calls to automatize different tasks.

        * **Now, the** ``Wazuh API`` **can make calls to edit the Wazuh configuration files as** ``ossec.conf``, **and to edit rules lists and decoders files.**

            This results in a place where all the configuration is done, avoiding bouncing between files to change a single word.
    
        * **Also, added calls to restart manager nodes in the cluster, to get CDB lists, and even get configuration assessment policies and checks.**

        Examples of this are:

            Making calls to *get CDB lists*:

            .. code-block:: bash

                # curl -u foo:bar -k -X GET "CDB list address"

            Making calls to *restart* manager nodes in the cluster and *validate* configuration:

            .. code-block:: bash

                # curl -u foo:bar -k -X PUT "https://127.0.0.1:55000/manager/restart?pretty"
