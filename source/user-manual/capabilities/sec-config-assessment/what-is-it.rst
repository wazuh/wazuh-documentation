What is SCA
===========

.. meta::
  :description: Learn more about the Security Configuration Assessment capability of Wazuh: what is SCA, overview of an SCA check, and how to interpret SCA scan results. 
  
One of the most certain ways to secure hosts is by reducing their vulnerability surface. That process is commonly
known as hardening, and configuration assessment is an effective way to determine opportunities where hosts could
have their attack surface reduced, and here is where SCA comes into play.

SCA performs scans to discover exposures or misconfigurations in monitored hosts. Those scans assess the configuration of the hosts using policy files that contain rules to be tested against the actual configuration of the host.

For example, SCA could assess whether it is necessary to change password related configuration, remove unnecessary
software, disable unnecessary services, or audit the TCP/IP stack configuration.

Policies for the SCA module are written in YAML. This format was chosen having in mind human readability,
which allows users to quickly understand and write their own policies or extend the existing ones to fit their needs.
Furthermore, Wazuh is distributed with a set of policies, most of them based on the CIS benchmarks, a well-established
standard for host hardening.

Overview of an SCA check
------------------------

Each check definition comprises:

-  Metadata information including a description of the purpose of the check.
-  A logical description with fields ``condition`` and ``rules``.

As part of the metadata, it can contain an optional ``compliance`` field used to specify if the check is relevant to any compliance specifications. Most Wazuh policies, especially CIS policies, already have their CIS and PCI-DSS controls mapped. In addition, NIST and TSC controls are mapped as well.

See below policy ``id 2094`` for Debian 9 operating systems as an example of a policy definition.

.. code-block:: YAML

  - id: 2094
    title: "Ensure IPv6 default deny firewall policy"
    description: "A default deny all policy on connections ensures that any unconfigured network usage will be rejected."
    rationale: "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage."
    remediation: "Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well."
    compliance:
      - cis: ["3.5.2.1"]
      - cis_csc: ["9.4"]
      - pci_dss: ["1.2.1"]
      - tsc: ["CC8.1"]
    condition: all
    rules:
      - 'c:ip6tables -L -> r:^Chain INPUT && r:policy DROP'
      - 'c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP'
      - 'c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP'

Interpreting SCA scan results
----------------------------------

SCA scan results appear as alerts whenever a particular check changes its status between scans. Moreover, Wazuh agents only send those events necessary to keep the global status of the scan updated, avoiding potential events flooding.

.. code-block:: JSON

   {
     "_index": "wazuh-alerts-4.x-env-1-2022.07.20",
     "_type": "_doc",
     "_id": "HdvxGoIBKYYCH-haGnqb",
     "_score": 1,
     "_source": {
       "cluster": {
         "node": "master",
         "name": "wazuh1"
       },
       "agent": {
         "ip": "10.0.1.127",
         "name": "Debian",
         "id": "001"
       },
       "manager": {
         "name": "wazuh-manager-master-0"
       },
       "data": {
         "sca": {
           "scan_id": "697507169",
           "check": {
             "result": "failed",
             "remediation": "Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well.",
             "compliance": {
               "pci_dss": "1.2.1",
               "tsc": "CC8.1",
               "cis_csc": "9.4",
               "cis": "3.5.2.1"
             },
             "description": "A default deny all policy on connections ensures that any unconfigured network usage will be rejected.",
             "id": "2094",
             "title": "Ensure IPv6 default deny firewall policy",
             "rationale": "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage.",
             "command": [
               "ip6tables -L"
             ]
           },
           "type": "check",
           "policy": "CIS Benchmark for Debian/Linux 9"
         }
       },
       "rule": {
         "firedtimes": 316,
         "mail": false,
         "level": 7,
         "pci_dss": [
           "2.2",
           "1.2.1"
         ],
         "tsc": [
           "CC7.1",
           "CC7.2",
           "CC8.1"
         ],
         "cis_csc": [
           "9.4"
         ],
         "description": "CIS Benchmark for Debian/Linux 9: Ensure IPv6 default deny firewall policy",
         "groups": [
           "sca"
         ],
         "id": "19007",
         "cis": [
           "3.5.2.1"
         ],
         "nist_800_53": [
           "CM.1"
         ],
         "gdpr": [
           "IV_35.7.d"
         ]
       },
       "decoder": {
         "name": "sca"
       },
       "input": {
         "type": "log"
       },
       "@timestamp": "2022-07-20T09:29:42.753Z",
       "location": "sca",
       "id": "1658309382.3406371",
       "timestamp": "2022-07-20T09:29:42.753+0000"
     },
     "fields": {
       "@timestamp": [
         "2022-07-20T09:29:42.753Z"
       ],
       "timestamp": [
         "2022-07-20T09:29:42.753Z"
       ]
     }
   }

Scan results summaries are then shown on the Wazuh dashboard, within the Security configuration assessment module.

.. thumbnail:: /images/sca/sca-agent-overview.png
    :title: SCA summary
    :align: center
    :width: 100%

In addition, each result can be expanded to display additional information.

.. thumbnail:: /images/sca/sca-agent-check-result.png
    :title: SCA check list
    :align: center
    :width: 100%
    