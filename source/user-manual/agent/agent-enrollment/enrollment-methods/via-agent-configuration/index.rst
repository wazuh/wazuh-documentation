.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: With this option, the Wazuh agent enrolls automatically after you configure the Wazuh manager IP address or FQDN. Learn more in this section of the documentation.

Enrollment through agent configuration
======================================

With this method, you edit the Wazuh agent configuration file so that the Wazuh agent enrolls automatically when it starts. The Wazuh agent needs:

-  The Wazuh manager IP address or fully qualified domain name (FQDN), set in the Wazuh agent configuration file.
-  The enrollment password, stored in the ``authd.pass`` file of the Wazuh agent. Password authentication is enabled on the Wazuh manager by default, so the Wazuh manager rejects enrollment requests that don't include the password.

To also verify the identity of the Wazuh manager, configure the certificate authority (CA) that signs the Wazuh manager certificate. Otherwise, the Wazuh agent connects with TLS verification disabled.

.. note::

   We recommend enrolling Wazuh 5.0 agents with an enrollment token instead. The token carries the Wazuh manager address, the enrollment credential, and the CA, so you don't need to edit the Wazuh agent configuration file. See the :doc:`Wazuh manager identity verification </user-manual/agent/agent-enrollment/security-options/manager-identity-verification>` and :doc:`Deployment variables </user-manual/agent/agent-enrollment/deployment-variables/index>` sections.

The following sections show how to enroll the Wazuh agent on different operating systems:

.. toctree::
   :maxdepth: 1

   linux-endpoint
   windows-endpoint
   macos-endpoint
