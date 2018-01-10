.. _upgrading-agent:

Upgrading agent
=================


We will describe the upgrade procedure using a use case.
In this use case we will upgrade an agent remotely using two different ways: using the command line and using the API.

Using the command line
--------------------------

To upgrade agents using the command line we will use the :doc:`agent_upgrade <../../reference/tools/agent_upgrade>` tool.


1. We will list all outdated agents using the *'-l'* parameter:

    .. code-block:: console

        # agent_upgrade -l

        ID    Name                               Version
        002   VM_Debian9                         Wazuh v3.0.0
        003   VM_Debian8                         Wazuh v3.0.0
        009   VM_WinServ2016                     Wazuh v3.0.0

        Total outdated agents: 3

2. We will upgrade the agent 002. So, we will use the *'-a'* parameter and the agent ID:

    .. code-block:: console

        # agent_upgrade -a 002

        Sending WPK: [=========================] 100%
        Upgrade procedure started... Please wait.
        Agent upgraded: Wazuh v3.0.0 -> Wazuh v3.1.0


3. Once we receive the last confirmation message, the agent is restarted and we can check the new agent version:

    .. code-block:: console

        # /var/ossec/bin/agent_control -i 002

        Wazuh agent_control. Agent information:
           Agent ID:   002
           Agent Name: VM_Debian9
           IP address: any/any
           Status:     Active

           Operating system:    Linux debian 4.9.0-3-amd64 #1 SMP Debian 4.9.30-2+deb9u2 (2017-06-26) x86_64 [Debian GNU/Linux|debian: 9 (stretch)]
           Client version:      Wazuh v3.1.0 / ab73af41699f13fdd81903b5f23d8d00
           Shared file hash:    89b437dc6c9e962be3fe9eb6a65cc027
           Last keep alive:     Mon Jul 31 10:43:04 2017

           Syscheck last started  at: Mon Jul 31 10:38:39 2017
           Rootcheck last started at: Fri Jul 28 18:17:59 2017


Using the RESTful API
----------------------

1.  We will list all outdated agents:

    .. code-block:: console

        # curl -u foo:bar -X GET -k "http://127.0.0.1:55000/agents/outdated?pretty"

        {
          "error": 0,
          "data": {
             "totalItems": 3,
             "items": [
                {
                   "version": "Wazuh v3.0.0",
                   "id": "002",
                   "name": "VM_Debian9"
                },
                {
                   "version": "Wazuh v3.0.0",
                   "id": "003",
                   "name": "VM_Debian8"
                },
                {
                   "version": "Wazuh v3.0.0",
                   "id": "009",
                   "name": "VM_WinServ2016"
               }
             ]
          }
        }


2. We will upgrade the agent 002:

    .. code-block:: console

        # curl -u foo:bar -X PUT -k "http://127.0.0.1:55000/agents/002/upgrade?pretty"

        {
           "error": 0,
           "data": "Upgrade procedure started"
        }


3. Check the upgrade result:

    .. code-block:: console

        # curl -u foo:bar -X GET -k "http://127.0.0.1:55000/agents/002/upgrade_result?pretty"

        {
           "error": 0,
           "data": "Agent upgraded successfully"
        }


4. Check new agent version:

    .. code-block:: console

        # curl -u foo:bar -X GET -k "http://127.0.0.1:55000/agents/002?pretty"

        {
           "error": 0,
           "data": {
              "status": "Active",
              "configSum": "ab73af41699f13fdd81903b5f23d8d00",
              "group": "default",
              "name": "VM_Debian9",
              "mergedSum": "89b437dc6c9e962be3fe9eb6a65cc027",
              "ip": "any",
              "dateAdd": "2017-07-28 15:23:06",
              "version": "Wazuh v3.1.0",
              "lastKeepAlive": "2017-07-31 10:43:04",
              "os": {
                 "major": "9",
                 "name": "Debian GNU/Linux",
                 "platform": "debian",
                 "uname": "Linux debian 4.9.0-3-amd64 #1 SMP Debian 4.9.30-2+deb9u2 (2017-06-26) x86_64",
                 "version": "9",
                 "codename": "stretch",
                 "arch": "x86_64"
              },
              "id": "002"
           }
        }
