.. Copyright (C) 2020 Wazuh, Inc.

.. _logtest_how_it_works:

How it works
============

Wazuh Logtest is a powerful feature for working with rules. This solution allows the testing and verification of rules and decoders before putting them into production.

Wazuh-Logtest is based on the use of unique sessions. Each session stores its own rules and decoders loaded.
There are three use cases to evaluate rules through Wazuh-Logtest:

#. `Use cases: Test log from Wazuh APP`_
#. `Use cases: Test log from Wazuh-Logtest Tool`_
#. `Use cases: Test log from RESTful API`_

.. note::

  For more information about rules and decoders, see the :ref:`Wazuh Ruleset <ruleset>`

Use cases: Test log from Wazuh APP
----------------------------------

.. warning::
    
    This section is a draft and should be completed when available on the Wazuh APP


1. First request for logtest
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Explanation: how to go to logtest

    .. code-block:: none
        
        Screenshot: How to go to logtest

How to do a request

    Data for request:

    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | Field        | Description                  | Example                                                                                  |
    +==============+==============================+==========================================================================================+
    | log_format   | Type of log, syslog or json  | syslog                                                                                   |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | event        | Log to be processed          | Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928 |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | location     | The origin of the log        | /var/log/syslog                                                                          |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | token        | Logtest Session id (optional)| empty                                                                                    |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+


The first time a processing request is sent it has no token, since there is no active session, then a processing log request is sent to Logtest in Analysisd.

    .. code-block:: none
        
        Screenshot: Response

RAW Response 

    .. code-block:: json
        :class: output

        {
            "error": 0,
            "data": {
                "token": "1074b877",
                "messages": [
                    "INFO: (7202): Session initialized with token '1074b877'"
                ],
                "output": {
                    "timestamp": "2020-09-28T13:21:28.583+0000",
                    "rule": {
                        "level": 5,
                        "description": "sshd: Attempt to login using a non-existent user",
                        "id": "5710",
                        "mitre": {
                            "id": [
                                "T1110"
                            ],
                            "tactic": [
                                "Credential Access"
                            ],
                            "technique": [
                                "Brute Force"
                            ]
                        },
                        "firedtimes": 1,
                        "mail": false,
                        "groups": [
                            "syslog",
                            "sshd",
                            "invalid_login",
                            "authentication_failed"
                        ],
                        "pci_dss": [
                            "10.2.4",
                            "10.2.5",
                            "10.6.1"
                        ],
                        "gpg13": [
                            "7.1"
                        ],
                        "gdpr": [
                            "IV_35.7.d",
                            "IV_32.2"
                        ],
                        "hipaa": [
                            "164.312.b"
                        ],
                        "nist_800_53": [
                            "AU.14",
                            "AC.7",
                            "AU.6"
                        ],
                        "tsc": [
                            "CC6.1",
                            "CC6.8",
                            "CC7.2",
                            "CC7.3"
                        ]
                    },
                    "agent": {
                        "id": "000",
                        "name": "30-u20-manager"
                    },
                    "manager": {
                        "name": "30-u20-manager"
                    },
                    "id": "1601299288.4260",
                    "full_log": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
                    "predecoder": {
                        "program_name": "sshd",
                        "timestamp": "Oct 15 21:07:00",
                        "hostname": "linux-agent"
                    },
                    "decoder": {
                        "parent": "sshd",
                        "name": "sshd"
                    },
                    "data": {
                        "srcip": "18.18.18.18",
                        "srcport": "48928",
                        "srcuser": "blimey"
                    },
                    "location": "/var/log/syslog"
                },
                "alert": true,
                "codemsg": 1
            }
        }



The messages field gives information that a session was initialized with the ``1074b877`` token. 
This token should be added to the next requests to keep the session, including its event history, rules and docoders loaded. 
If the token field is not added to the next query, a new session will be initialized, reloading the rules and decoders.

2. Repeat the request with the same session
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


The alert generated by the above processing is triggered by the rule with id 5710 of level 5.
If the session is preserved (adding the token field with the value of the token) and the same request is repeated 8 times, 
the alert generated is triggered by the rule with id 5712 of level 10.


RAW RESPONSE:

    .. code-block:: json
        :class: output

            {
                "error": 0,
                "data": {
                    "token": "1074b877",
                    "output": {
                        "timestamp": "2020-09-28T15:13:09.028+0000",
                        "rule": {
                            "level": 10,
                            "description": "sshd: brute force trying to get access to the system.",
                            "id": "5712",
                            "mitre": {
                                "id": [
                                    "T1110"
                                ],
                                "tactic": [
                                    "Credential Access"
                                ],
                                "technique": [
                                    "Brute Force"
                                ]
                            },
                            "frequency": 8,
                            "firedtimes": 1,
                            "mail": false,
                            "groups": [
                                "syslog",
                                "sshd",
                                "authentication_failures"
                            ],
                            "pci_dss": [
                                "11.4",
                                "10.2.4",
                                "10.2.5"
                            ],
                            "gdpr": [
                                "IV_35.7.d",
                                "IV_32.2"
                            ],
                            "hipaa": [
                                "164.312.b"
                            ],
                            "nist_800_53": [
                                "SI.4",
                                "AU.14",
                                "AC.7"
                            ],
                            "tsc": [
                                "CC6.1",
                                "CC6.8",
                                "CC7.2",
                                "CC7.3"
                            ]
                        },
                        "agent": {
                            "id": "000",
                            "name": "30-u20-manager"
                        },
                        "manager": {
                            "name": "30-u20-manager"
                        },
                        "id": "1601305989.4260",
                        "previous_output": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928\nOct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
                        "full_log": "Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
                        "predecoder": {
                            "program_name": "sshd",
                            "timestamp": "Oct 15 21:07:00",
                            "hostname": "linux-agent"
                        },
                        "decoder": {
                            "parent": "sshd",
                            "name": "sshd"
                        },
                        "data": {
                            "srcip": "18.18.18.18",
                            "srcport": "48928",
                            "srcuser": "blimey"
                        },
                        "location": "/var/log/syslog"
                    },
                    "alert": true,
                    "codemsg": 0
                }
            }

3. Close session
^^^^^^^^^^^^^^^^

Once the session is not used, it is possible to close the session to release the history of events, rules and decoders loaded. 

Use cases: Test log from Wazuh-Logtest Tool
-------------------------------------------


First request for logtest
^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh-Logtest tool is backward compatible with ossec-logtest and hides the handling of sessions from the user. 
The first time a processing request is sent, a session is initialized that will be used during the entire execution of the tool.


Run the tool ``/var/ossec/bin/wazuh-logtest`` and paste the following log:

    .. code-block:: none

        Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928


The output of Wazuh-logtest from the above record is as follows:

    .. code-block:: none
        :class: output

            **Phase 1: Completed pre-decoding.
                    full event: 'Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928'
                    timestamp: 'Oct 15 21:07:00'
                    hostname: 'linux-agent'
                    program_name: 'sshd'

            **Phase 2: Completed decoding.
                    name: 'sshd'
                    parent: 'sshd'
                    srcip: '18.18.18.18'
                    srcport: '48928'
                    srcuser: 'blimey'

            **Phase 3: Completed filtering (rules).
                    id: '5710'
                    level: '5'
                    description: 'sshd: Attempt to login using a non-existent user'
                    groups: '['syslog', 'sshd', 'invalid_login', 'authentication_failed']'
                    firedtimes: '1'
                    gdpr: '['IV_35.7.d', 'IV_32.2']'
                    gpg13: '['7.1']'
                    hipaa: '['164.312.b']'
                    mail: 'False'
                    mitre: '{'id': ['T1110'], 'tactic': ['Credential Access'], 'technique': ['Brute Force']}'
                    nist_800_53: '['AU.14', 'AC.7', 'AU.6']'
                    pci_dss: '['10.2.4', '10.2.5', '10.6.1']'
                    tsc: '['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3']'
            **Alert to be generated.

As in Wazuh-APP Logtest this indicates that rule 5710 level 5 matches and an alert is generated.
If the log is pasted 8 times, in the filtering phase (rules) the 'firedtime' counter will increase until it reaches 7. 
Then rule 5712 matches level 10 is triggered by the frequency of rule 5710 and an alert is generated:

    .. code-block:: none
        :class: output

        **Phase 1: Completed pre-decoding.
                full event: 'Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928'
                timestamp: 'Oct 15 21:07:00'
                hostname: 'linux-agent'
                program_name: 'sshd'

        **Phase 2: Completed decoding.
                name: 'sshd'
                parent: 'sshd'
                srcip: '18.18.18.18'
                srcport: '48928'
                srcuser: 'blimey'

        **Phase 3: Completed filtering (rules).
                id: '5712'
                level: '10'
                description: 'sshd: brute force trying to get access to the system.'
                groups: '['syslog', 'sshd', 'authentication_failures']'
                firedtimes: '1'
                frequency: '8'
                gdpr: '['IV_35.7.d', 'IV_32.2']'
                hipaa: '['164.312.b']'
                mail: 'False'
                mitre: '{'id': ['T1110'], 'tactic': ['Credential Access'], 'technique': ['Brute Force']}'
                nist_800_53: '['SI.4', 'AU.14', 'AC.7']'
                pci_dss: '['11.4', '10.2.4', '10.2.5']'
                tsc: '['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3']'
        **Alert to be generated.

Use cases: Test log from RESTful API
------------------------------------

How to do a request

    Data for request:

    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | Field        | Description                  | Example                                                                                  |
    +==============+==============================+==========================================================================================+
    | log_format   | Type of log, syslog or json  | syslog                                                                                   |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | event        | Log to be processed          | Oct 15 21:07:00 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928 |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | location     | The origin of the log        | /var/log/syslog                                                                          |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    | token        | Logtest Session id (optional)| empty                                                                                    |
    +--------------+------------------------------+------------------------------------------------------------------------------------------+
    
.. warning::
    
    This section is a draft and should be completed when available RESTful API