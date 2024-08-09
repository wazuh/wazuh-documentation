.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-logcollector.state file can be helpful to identify and measure if Wazuh is collecting and sending logs consistently. Learn more about it here.

.. _wazuh_logcollector_state_file:

wazuh-logcollector.state
========================

The statistics file for **wazuh-logcollector** is located at ``/var/ossec/var/run/wazuh-logcollector.state``.

It can be helpful to identify and measure if Wazuh is collecting and sending logs consistently.

By default, this file is updated every 60 seconds. This interval can be changed by modifying the ``logcollector.state_interval`` value from the :ref:`internal configuration <reference_internal_options>` file.

Below there is an example of the file content:

.. code-block:: json
    :class: output

    {
    "global": {
        "start": "2021-01-27 12:07:29",
        "end": "2021-01-27 12:09:29",
        "files": [
        {
            "location": "df -P",
            "events": 9,
            "bytes": 893,
            "targets": []
        },
        {
            "location": "/var/log/secure",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "/var/log/messages",
            "events": 5,
            "bytes": 292,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "/var/ossec/logs/active-responses.log",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "last -n 20",
            "events": 1,
            "bytes": 1529,
            "targets": []
        },
        {
            "location": "netstat listening ports",
            "events": 1,
            "bytes": 212,
            "targets": []
        },
        {
            "location": "/var/log/audit/audit.log",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "/var/log/maillog",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            },
            {
                "name": "custom_socket",
                "drops": 0
            }
            ]
        }
        ]
    },
    "interval": {
        "start": "2021-01-27 12:08:29",
        "end": "2021-01-27 12:09:29",
        "files": [
        {
            "location": "df -P",
            "events": 0,
            "bytes": 0,
            "targets": []
        },
        {
            "location": "/var/log/secure",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "/var/log/messages",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "/var/ossec/logs/active-responses.log",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "last -n 20",
            "events": 0,
            "bytes": 0,
            "targets": []
        },
        {
            "location": "netstat listening ports",
            "events": 0,
            "bytes": 0,
            "targets": []
        },
        {
            "location": "/var/log/audit/audit.log",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            }
            ]
        },
        {
            "location": "/var/log/maillog",
            "events": 0,
            "bytes": 0,
            "targets": [
            {
                "name": "agent",
                "drops": 0
            },
            {
                "name": "custom_socket",
                "drops": 0
            }
            ]
        }
        ]
    }
    }
