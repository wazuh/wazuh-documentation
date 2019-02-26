.. Copyright (C) 2019 Wazuh, Inc.

Security Configuration assessment
=================================

This section attempts to introduce how this module can help us to securize our systems.

- `The configuration assessment scope`_
- `How this module can help us`_
- `Available policies`_
- `Creating a SCA policy`_

The configuration assessment scope
----------------------------------

One of the most important points to avoid hosts to be compromised is to securing them by reducing thir surface of vulnerabilities. That process is commonly known
as hardening, and the configuration assessment is the most effective way to detect how to handle that hardening in our systems.

It consists on carrying out scans where policy files are used as template to discover the exposures or misconfiguration of the monitored host. To be more specific, 
changing default passwords, the removal of unnecessary software, unnecessary usernames or logins, and the disabling or removal of unnecessary services, for example. 
Those policies can be focused on a whole OS such as Debian, or Windows, or directly on a particular software like the SSH server.


How this module can help us
---------------------------

This module has been design to perform security configuration assessment on agents by providing the scan results ...

ToDo:

- CIS, PCI-DSS controls.
- How alerts appear.
- Information provided for each policy.

Available policies
------------------

ToDo:

- Why they are YAML files.
- Compatibility matrix of every available policy file.
- Where are the policies located in managers and agents and how push policies to agents.

Creating a Configuration Assessment policy
------------------------------------------

ToDo:

- Explain the structure policies have.
- Mandatory fields in new policies.
- How to add new policies.


