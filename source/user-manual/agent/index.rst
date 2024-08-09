.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent is a multi-platform component of the Wazuh solution and runs on the endpoints you want to monitor. Learn more in this section of the documentation.

Wazuh agent
===========

The Wazuh agent is a multi-platform component of the Wazuh solution and runs on the endpoints you want to monitor. It communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated channel. The Wazuh agent provides capabilities such as log data collection, file integrity monitoring, threat detection, security configuration assessment, system inventory, vulnerability detection, and incident response to enhance your endpoint security.

After installing the Wazuh agent on an endpoint, you need to enroll the Wazuh agent in the Wazuh manager. This guide provides instructions on how to enroll the Wazuh agent, the different enrollment methods, and the management of the Wazuh agent.

The Wazuh agent enrollment section describes the stages a Wazuh agent can go through and the process of enrolling Wazuh agents in a Wazuh manager. You can also find troubleshooting steps for commonly encountered issues during enrollment.

In the Wazuh agent management section, you can find instructions on how to manage the Wazuh agent. These instructions cover administrative tasks such as upgrading the Wazuh agent, verifying connection to the Wazuh manager, and querying the Wazuh agent configuration.

.. topic:: Contents

   .. toctree::
      :maxdepth: 3

      agent-enrollment/index
      agent-management/index
