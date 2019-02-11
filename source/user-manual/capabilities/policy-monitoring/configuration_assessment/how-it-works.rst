.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

Summary
-------

The *configuration assessment* module has these four main objectives:

- Parsing the YAML check files and performing the policy scans.
- Finding differences between the results of consecutive scans.
- Storing the new results at the databases.
- Alert generation.

The checking files can contain rules for verifying that a process is running, a file exists, or if a file contains a specific pattern.
In addition, there is a main block that specifies the requirements needed to pass the tests.


Database
--------

Agents send the new information that is not already saved at the manager's database. This information gathered by the module is stored each time a scan is run generating a new descriptive alert about this change. If the manager detects that the agent did not send all the information, it will ask the agent to send the missing data again, making databases more consistent and reliable.


Policy files
------------

The policy files have been renovated and translated to YAML, all starting from the updated CIS benchmarks for each operating system. This files
are parsed by the new module to JSON and sent to the manager in case they have any difference.
This files count with a policy introduction, the requirements needed to run the checks and lastly, the checks. Below is an example of JSON event.


.. code-block:: json

    {
        "configuration_assessment":{
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
    2019 Feb 06 11:18:06 misi->configuration_assessment
    Rule: 19004 (level 3) -> 'Check with id 1029 for profile CIS benchmark for Debian/Linux passed'
    {"type":"check","id":1530676965,"profile":"CIS benchmark for Debian/Linux","check":{"id":1029,"title":"Ensure HTTP Proxy Server is not enabled","cis_control":"2.2.13","description":"Squid is a standard proxy server used in many distributions and environments.","rationale":"If there is no need for a proxy server, it is recommended that the squid proxy be deleted to reduce the potential attack surface.","remediation":"Run the following command to disable squid: # systemctl disable squid","compliance":{"cis":9,"pci_dss":"2.2.2"},"file":"","result":"passed"}}
    configuration_assessment.type: check
    configuration_assessment.scan_id: 1530676965
    configuration_assessment.policy: CIS benchmark for Debian/Linux
    configuration_assessment.check.id: 1029
    configuration_assessment.check.title: Ensure HTTP Proxy Server is not enabled
    configuration_assessment.check.cis_control: 2.2.13
    configuration_assessment.check.description: Squid is a standard proxy server used in many distributions and environments.
    configuration_assessment.check.rationale: If there is no need for a proxy server, it is recommended that the squid proxy be deleted to reduce the potential attack surface.
    configuration_assessment.check.remediation: Run the following command to disable squid: # systemctl disable squid
    configuration_assessment.check.compliance.cis: 9
    configuration_assessment.check.compliance.pci_dss: 2.2.2
    configuration_assessment.check.result: passed
