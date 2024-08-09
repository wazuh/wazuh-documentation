.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: With this option, the Wazuh agent is automatically enrolled. Learn more in this section of the documentation.

Enrollment via agent configuration
==================================

With this option, the Wazuh agent is automatically enrolled after you have configured the Wazuh manager IP address or FQDN (Fully Qualified Domain Name). When using :doc:`additional security options <../../security-options/index>`, you might need to configure other settings.

You can configure the Wazuh manager IP address or FQDN (Fully Qualified Domain Name) in one of two ways on the Wazuh agent:

-  Using environment variables during the Wazuh agent installation process. The guide to this process can be found :doc:`here </installation-guide/wazuh-agent/index>`.
-  Manually configuring the Wazuh manager IP address or FQDN (Fully Qualified Domain Name) in the Wazuh agent configuration file.

Enrollment with additional security options involves the use of passwords for enrollment authorization or certificates for identity validation of the Wazuh agent and Wazuh manager. See the :doc:`additional security options <../../security-options/index>` section for guidance on enrolling a Wazuh agent to a Wazuh manager with additional security options enabled.

The steps below show how to enroll the Wazuh agent for different operating systems:

.. toctree::
   :maxdepth: 1

   linux-endpoint
   windows-endpoint
   macos-endpoint
