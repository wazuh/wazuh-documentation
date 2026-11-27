What is SCA
=================================

.. contents:: Table of Contents
   :depth: 10

One of the most certain ways to secure hosts is by reducing their vulnerability surface. That process is commonly
known as hardening, and configuration assessment is an effective way to determine opportunities where hosts could
have their attack surface reduced, and here is where SCA comes into play.

SCA performs scans in order to discover exposures or misconfigurations in monitored hosts. Those scans assess the
configuration of the hosts by means of policy files, that contains rules to be tested against the actual
configuration of host.
For example, SCA could assess whether it is necessary to change password related configuration, remove unnecessary
software, disable unnecessary services, or audit the TCP/IP stack configuration.

Policies for the SCA module are written in YAML. This format was chosen having in mind human readability,
which allows users to quickly understand and write their own policies or extend the existing ones to fit their needs.
Furthermore, Wazuh is distributed with a set of policies, most of them based on the CIS benchmarks, a well-established
standard for host hardening.

Overview of an SCA check
----------------------------------

Each check comprises some metadata information, a description of the purpose of the check, and its logical description
(fields **condition** and **rules**). On its metadata, it can contain an optional **compliance** field used to specify
if the check is relevant to any compliance specifications, and to which. Most of Wazuh policies, especially CIS policies,
already have their CIS and PCI-DSS controls mapped. See an :ref:`example<check_overview>` below.


.. code-block:: yaml
    :name: check_overview
    :caption: Check example

    - id: 3064
      title: "Ensure IPv6 default deny firewall policy"
      description: "A default deny all policy on connections ensures that any unconfigured network usage will be rejected."
      rationale: "With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage."
      remediation: "Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well."
      compliance:
        - cis: ["3.5.2.1"]
        - cis_csc: ["9.4"]
      condition: all
      rules:
        - 'c:ip6tables -L -> r:^Chain INPUT && r:policy DROP'
        - 'c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP'
        - 'c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP'

Interpreting SCA scan results
----------------------------------

SCA scan results appear as :ref:`alerts<alert_example>` whenever a particular check changes its status between scans.
Moreover, Wazuh agents only send those events necessary to keep the global status of the scan updated, avoiding
potential event flooding.

.. code-block:: none
    :name: alert_example
    :caption: Alert example
    :class: output

    ** Alert 1568287462.156390: mail  - sca,gdpr_IV_35.7.d
    2019 Sep 12 13:24:22 (debian9-56) 10.0.0.56->sca
    Rule: 19007 (level 7) -> 'CIS benchmark for Debian/Linux 9 L1: Ensure IPv6 default deny firewall policy'
    {"type":"check","id":1802673953,"policy":"CIS benchmark for Debian/Linux 9 L1","policy_id":"cis_debian9_L1","check":{"id":3064,"title":"Ensure IPv6 default deny firewall policy","description":"A default deny all policy on connections ensures that any unconfigured network usage will be rejected.","rationale":"With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage.","remediation":"Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well.","compliance":{"cis":"3.5.2.1","cis_csc":"9.4"},"rules":["c:ip6tables -L -> r:^Chain INPUT && r:policy DROP","c:ip6tables -L -> r:^Chain FORWARD && r:policy DROP","c:ip6tables -L -> r:^Chain OUTPUT && r:policy DROP"],"command":"ip6tables -L","result":"failed"}}
    sca.type: check
    sca.scan_id: 1802673953
    sca.policy: CIS benchmark for Debian/Linux 9 L1
    sca.check.id: 3064
    sca.check.title: Ensure IPv6 default deny firewall policy
    sca.check.description: A default deny all policy on connections ensures that any unconfigured network usage will be rejected.
    sca.check.rationale: With a default accept policy the firewall will accept any packet that is not configured to be denied. It is easier to white list acceptable usage than to black list unacceptable usage.
    sca.check.remediation: Run the following commands to implement a default DROP policy: # ip6tables -P INPUT DROP # ip6tables -P OUTPUT DROP # ip6tables -P FORWARD DROP. Notes: Changing firewall settings while connected over network can result in being locked out of the system. Remediation will only affect the active system firewall, be sure to configure the default policy in your firewall management to apply on boot as well.
    sca.check.compliance.cis: 3.5.2.1
    sca.check.compliance.cis_csc: 9.4
    sca.check.command: ["ip6tables -L"]
    sca.check.result: failed


Scan results summaries are then shown on the Wazuh App, within the **SCA** tab **for a particular agent**:

.. thumbnail:: ../../../images/sca/sca_agent_overview.png
    :title: SCA summary
    :align: center
    :width: 100%

In addition, each result can be expanded to display additional information.

.. thumbnail:: ../../../images/sca/sca_agent_check_result.png
    :title: SCA check list
    :align: center
    :width: 100%
