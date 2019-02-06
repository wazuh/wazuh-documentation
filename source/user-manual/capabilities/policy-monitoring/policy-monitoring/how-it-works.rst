.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

The *policy monitoring* module collects the check results and send the new ones to the manager, where they are stored at the agent
databases and match the rules, which causes alert triggering. This checks can consist of verifying that a file exists, a process is running or 
the content of a file contains a pattern.

Database
--------

Agents send the new information that is not already saved at the manager's database. This information gathered by the module is stored each time a scan is run generating a new descriptive alert about this change. If the manager detects that the agent did not send all the information, it will ask the agent to send it again, making databases more consistent and reliable.


Policy files
------------

The policy files have been renovated and translated to YAML all starting from the updated CIS benchmarks for each operating system. This files
are parsed by the new module to JSON and sent to the manager in case they have any difference.
This files count with a policy introduction, the requirements needed to run the checks and lastly, the checks. Below is an example of JSON event.


.. code-block:: json

    {
        "pm":{
            "type":"check",
            "scan_id":"1530676965",
            "policy":"CIS benchmark for Debian/Linux",
            "check":{
                "id":"1029",
                "title":"Ensure HTTP Proxy Server is not enabled",
                "cis_control":"2.2.13",
                "description":"Squid is a standard proxy server used in many distributions and environments.",
                "rationale":"If there is no need for a proxy server, it is recommended that the squid proxy be deleted to reduce the potential attack surface.",
                "remediation":"Run the following command to disable squid: # systemctl disable squid",
                "compliance":{
                "cis":"9",
                "pci_dss":"2.2.2"
                },
                "result":"passed"
            }
        }
    }

This would be the alert generated:


.. code-block:: none

    ** Alert 1549448286.614806: - ossec,
    2019 Feb 06 11:18:06 misi->policy-monitoring
    Rule: 19004 (level 3) -> 'Check with id 1029 for profile CIS benchmark for Debian/Linux passed'
    {"type":"check","id":1530676965,"profile":"CIS benchmark for Debian/Linux","check":{"id":1029,"title":"Ensure HTTP Proxy Server is not enabled","cis_control":"2.2.13","description":"Squid is a standard proxy server used in many distributions and environments.","rationale":"If there is no need for a proxy server, it is recommended that the squid proxy be deleted to reduce the potential attack surface.","remediation":"Run the following command to disable squid: # systemctl disable squid","compliance":{"cis":9,"pci_dss":"2.2.2"},"file":"","result":"passed"}}
    pm.type: check
    pm.scan_id: 1530676965
    pm.policy: CIS benchmark for Debian/Linux
    pm.check.id: 1029
    pm.check.title: Ensure HTTP Proxy Server is not enabled
    pm.check.cis_control: 2.2.13
    pm.check.description: Squid is a standard proxy server used in many distributions and environments.
    pm.check.rationale: If there is no need for a proxy server, it is recommended that the squid proxy be deleted to reduce the potential attack surface.
    pm.check.remediation: Run the following command to disable squid: # systemctl disable squid
    pm.check.compliance.cis: 9
    pm.check.compliance.pci_dss: 2.2.2
    pm.check.result: passed

