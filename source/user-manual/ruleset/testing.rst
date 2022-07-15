.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about how to test decoders and rules with Wazuh. The tool ossec-logtest allows you to test how an event is decoded and if an alert is generated.
    
.. _ruleset_testing:

Testing decoders and rules
==========================

The tool *wazuh-logtest* allows us to test how an event is decoded and if an alert is generated.

Run the tool */var/ossec/bin/wazuh-logtest* and paste the following log::

    Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516


.. code-block:: console

    $ /var/ossec/bin/wazuh-logtest

.. code-block:: none
    :class: output

    Type one log per line

    Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516

    **Phase 1: Completed pre-decoding.
            full event: 'Mar  8 22:39:13 ip-10-0-0-10 sshd[2742]: Accepted publickey for root from 73.189.131.56 port 57516'
            timestamp: 'Mar  8 22:39:13'
            hostname: 'ip-10-0-0-10'
            program_name: 'sshd'

    **Phase 2: Completed decoding.
            name: 'sshd'
            parent: 'sshd'
            dstuser: 'root'
            srcip: '73.189.131.56'

    **Phase 3: Completed filtering (rules).
            id: '5715'
            level: '3'
            description: 'sshd: authentication success.'
            groups: '['syslog', 'sshd', 'authentication_success']'
            firedtimes: '1'
            gdpr: '['IV_32.2']'
            gpg13: '['7.1', '7.2']'
            hipaa: '['164.312.b']'
            mail: 'False'
            mitre.id: '['T1078', 'T1021']'
            mitre.tactic: '['Defense Evasion', 'Initial Access', 'Persistence', 'Privilege Escalation', 'Lateral Movement']'
            mitre.technique: '['Valid Accounts', 'Remote Services']'
            nist_800_53: '['AU.14', 'AC.7']'
            pci_dss: '['10.2.5']'
            tsc: '['CC6.8', 'CC7.2', 'CC7.3']'
    **Alert to be generated.

.. warning::

    The decoder name shown in *Phase 2* will be the name of the parent decoder.
