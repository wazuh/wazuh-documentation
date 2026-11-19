.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Enroll Wazuh agents in your Wazuh Cloud environment from the Wazuh dashboard, verify the enrollment, and organize agents into groups.

.. _cloud_getting_started_enroll_agents:

Enrolling agents
================

Enrolling an agent connects an endpoint, such as a server, workstation, or cloud instance, to your Wazuh Cloud environment. Once enrolled, the Wazuh agent forwards security data such as logs, vulnerabilities, and configuration data. This page explains how to enroll agents from the Wazuh dashboard and organize them into groups.

.. note::

   On a trial, an agent must connect to the environment within 4 days of the start of the trial. Otherwise, the trial is cancelled and the environment is terminated. See :doc:`Starting a trial </cloud-service/getting-started/start-trial>`.

Requirements
------------

-  An active Wazuh Cloud environment. See :doc:`Accessing the Wazuh dashboard </cloud-service/getting-started/access-wazuh-wui>`.
-  An endpoint with a supported operating system. See the list of supported operating systems in :doc:`Agent enrollment requirements </user-manual/agent/agent-enrollment/requirements>`.
-  Outbound connectivity from the endpoint to your environment.

.. TODO: Confirm with engineering which ports Wazuh 5.0 agents use to reach a Wazuh Cloud environment (443, 1514, 1515, or 1517/TCP). Self-hosted 5.0 agents use 1517/TCP for enrollment and communication.

The endpoint must reach your environment on port 1517/TCP. Allow this outbound connection in your firewalls and proxies.

Deploying an agent
------------------

The **Deploy new agent** wizard in the Wazuh dashboard generates the enrollment token and the commands to install and enroll the agent.

#. Open the Wazuh dashboard of your environment and log in.
#. Click the upper-left menu icon **☰** and go to **Agents management** > **Summary**.
#. Click **Deploy new agent**.
#. Select the package for the operating system and architecture of your endpoint.
#. Enter the address of your environment as the server address. This is the host name of your environment URL, without ``https://``. For example, ``<CLOUD_ID>.cloud.wazuh.com``.
#. Click **Generate token**.
#. Copy the installation and start commands and run them on the endpoint, with administrator or root privileges.

.. TODO: Confirm with engineering the server address that Wazuh Cloud agents use (the environment host name <CLOUD_ID>.cloud.wazuh.com or a dedicated agent endpoint), and whether custom DNS names are valid enrollment addresses.

The agent installs, enrolls with the enrollment token, and starts sending data to your environment. To install agents from the command line or with deployment tools, see :doc:`Deploying Wazuh agents </installation-guide/wazuh-agent/index>`.

Verifying the enrollment
------------------------

#. In the Wazuh dashboard, click the upper-left menu icon **☰** and go to **Agents management** > **Summary**.
#. Check that the agent is listed with the **Active** status.

If the agent doesn't appear after a few minutes, check that the endpoint can reach your environment on the required port and that the agent service is running.

Grouping agents
---------------

Agent groups let you apply the same configuration to agents that share a role, location, or operating system. New agents belong to the ``default`` group unless you assign them to another group.

To create a group:

#. In the Wazuh dashboard, click the upper-left menu icon **☰** and go to **Agents management** > **Groups**.
#. Click **Add new group**.
#. Enter a name for the group and click **Save new group**.

To assign agents to groups and define the configuration of each group, see :doc:`Group agents </user-manual/agent/agent-management/grouping-agents>`.
