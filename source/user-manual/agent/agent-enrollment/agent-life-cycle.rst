.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent life cycle includes the Installation and enrollment, Agent connection states, and Removal stages. Learn more in this section of the documentation.

Wazuh agent life cycle
======================

The Wazuh agent life cycle refers to the stages a Wazuh agent goes through from installation on an endpoint to removal from the Wazuh platform. It includes the following stages:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Installation and enrollment
---------------------------

The life cycle starts when you install the Wazuh agent on the endpoint that you want to monitor. After installation, enroll the Wazuh agent with the Wazuh manager to establish communication. For more information, see :doc:`Wazuh agent enrollment <index>`.

.. _agent-connection-states:

Agent connection states
-----------------------

After enrollment, the Wazuh manager stores information about the Wazuh agent and tracks its connection status until you remove the agent. A Wazuh agent can have one of the following connection states, as shown in the image below:

.. thumbnail:: /images/manual/agent/agent-connection-states.png
   :title: Agent connection states
   :alt: Agent connection states
   :align: center
   :width: 80%

-  **Never connected**: The Wazuh agent enrolled successfully but has not connected to the Wazuh manager.
-  **Pending**: The Wazuh manager received the initial connection request from the Wazuh agent, but the authentication process has not completed. The Wazuh agent enters this state once after each startup. If the Wazuh agent remains in this state, check for connectivity or authentication issues.
-  **Active**: The Wazuh agent connected successfully and can communicate with the Wazuh manager.
-  **Disconnected**: The Wazuh manager marks the Wazuh agent as disconnected when it does not receive keep alive messages within the ``agents_disconnection_time`` interval. The default value is ``10m``.

Removal
-------

The Wazuh agent life cycle ends when you remove the Wazuh agent from the Wazuh manager. You can remove a Wazuh agent through the :ref:`Wazuh dashboard <remove_agents_dashboard>` or the :ref:`Wazuh manager API <remove_agents_api>`.