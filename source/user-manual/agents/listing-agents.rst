.. _listing-agents:

Listing agents
=================

There are 3 ways to list the registered agents in a manager:

#. `Using Wazuh app`_
#. `Using the RESTful API`_
#. `Using the command line`_

Using Wazuh app
--------------------------------
Access to the Wazuh app and go to the *Agents* tab:

.. thumbnail:: ../../images/manual/managing-agents/listing-agents-app.png
    :title: Listing agents from Wazuh app
    :align: center
    :width: 100%

Using the RESTful API
--------------------------------

The request :ref:`GET /agents <request_list>` return the list of available agents.

::

    curl -u foo:bar -k http://127.0.0.1:55000/agents?pretty

.. code-block:: json

    {
       "error": 0,
       "data": {
          "totalItems": 15,
          "items": [
             {
                "status": "Active",
                "ip": "127.0.0.1",
                "id": "000",
                "name": "vpc-ossec-manager"
             },
             {
                "status": "Active",
                "ip": "10.0.0.121",
                "id": "003",
                "name": "vpc-agent-debian"
             },
             {
                "status": "Active",
                "ip": "10.0.0.126",
                "id": "005",
                "name": "vpc-agent-ubuntu-public"
             },
             {
                "status": "Active",
                "ip": "10.0.0.124",
                "id": "006",
                "name": "vpc-agent-windows"
             },
            {
                "...": "..."
            }
          ]
       }
    }

Using the command line
--------------------------------------------

A list of the available agents can be called with the binary file */var/ossec/bin/agent_control*:

.. code-block:: console

    $ /var/ossec/bin/agent_control -l
    Wazuh agent_control. List of available agents:
       ID: 000, Name: vpc-ossec-manager (server), IP: 127.0.0.1, Active/Local
       ID: 1040, Name: ip-10-0-0-76, IP: 10.0.0.76, Active
       ID: 003, Name: vpc-agent-debian, IP: 10.0.0.121, Active
       ID: 005, Name: vpc-agent-ubuntu-public, IP: 10.0.0.126, Active
       ID: 006, Name: vpc-agent-windows, IP: 10.0.0.124, Active
       ID: 1024, Name: ip-10-0-0-252, IP: 10.0.0.252, Never connected
       ID: 1028, Name: vpc-debian-it, IP: any, Never connected
       ID: 1030, Name: diamorphine-POC, IP: 10.0.0.59, Active
       ID: 015, Name: vpc-agent-centos, IP: 10.0.0.123, Active
       ID: 1031, Name: WIN-UENN0U6R5SF, IP: 10.0.0.124, Never connected
       ID: 1032, Name: vpc-agent-ubuntu, IP: 10.0.0.122, Active
       ID: 1033, Name: vpc-agent-debian8, IP: 10.0.0.128, Active
       ID: 1034, Name: vpc-agent-redhat, IP: 10.0.0.127, Active
       ID: 1035, Name: vpc-agent-centos7, IP: 10.0.0.101, Never connected
       ID: 1041, Name: vpc-agent-centos-public, IP: 10.0.0.125, Active

    List of agentless devices:
