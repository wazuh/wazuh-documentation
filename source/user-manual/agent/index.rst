.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent is a multi-platform component of the Wazuh solution and runs on the endpoints you want to monitor. Learn more in this section of the documentation.

Wazuh agent
===========

The Wazuh agent is a multi-platform component that can be installed on endpoints such as Linux, Windows and macOS systems. It collects security data from the endpoints and sends it to the Wazuh manager through an encrypted and authenticated channel. The Wazuh agent provides capabilities such as log data collection, file integrity monitoring, security configuration assessment, system inventory, vulnerability detection, and incident response to enhance endpoint security.

After you install the Wazuh agent on an endpoint, enroll it with the Wazuh manager. Enrollment authorizes the Wazuh agent to communicate securely with the Wazuh manager. This guide explains the available enrollment methods, the Wazuh agent life cycle, and common management tasks.

The Wazuh agent enrollment section explains the Wazuh agent life cycle, how agent enrollment works, and how to troubleshoot enrollment issues. The Wazuh agent connection section explains different methods to verify the connection status between a Wazuh agent and the Wazuh manager.

The Wazuh agent management section explains how to perform administrative tasks such as upgrading the Wazuh agent, checking agent-manager communication, and querying the Wazuh agent configuration.

.. topic:: Contents

   .. toctree::
      :maxdepth: 3

      agent-enrollment/index
      agent-management/agent-connection
      agent-management/agent-administration
