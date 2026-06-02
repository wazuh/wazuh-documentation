.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: With this option, the Wazuh agent enrolls automatically after you configure the Wazuh manager IP address or FQDN. Learn more in this section of the documentation.

Enrollment through agent configuration
======================================

With this method, the Wazuh agent enrolls automatically after you configure the Wazuh manager IP address or fully qualified domain name (FQDN). If you use additional security options, you must configure the required authentication or certificate settings.

You can configure the Wazuh manager IP address or FQDN on the Wazuh agent in one of two ways:

#. Using environment variables during the Wazuh agent installation. For more information, see the :doc:`installation guide </installation-guide/wazuh-agent/index>`.

#. Manually editing the Wazuh agent configuration file.

Enrollment with additional security options uses passwords for enrollment authorization or certificates to validate the identity of the Wazuh agent and Wazuh manager.

The following sections show how to enroll the Wazuh agent on different operating systems:

.. toctree::
   :maxdepth: 1

   linux-endpoint
   windows-endpoint
   macos-endpoint
