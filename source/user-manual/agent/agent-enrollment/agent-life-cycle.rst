.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent lifecycle includes the Installation and enrollment, Agent connection states, and Removal stages. Learn more in this section of the documentation.

Wazuh agent life cycle
======================

The Wazuh agent lifecycle refers to the various stages a Wazuh agent goes through from its initial installation on an endpoint to its removal from the Wazuh platform. It includes the following stages:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Installation and enrollment
---------------------------

The first step involves installing the Wazuh agent on the endpoint to be monitored. Once the Wazuh agent is installed, it must be enrolled in the Wazuh manager to establish communication. Refer to :doc:`Wazuh agent enrollment <index>`.

Agent connection states
-----------------------

After successful enrollment, the Wazuh manager stores information about the Wazuh agent and its connection status until it is deleted by a user.

In this phase, there are four different connection states that a Wazuh agent may be in at any given time, as shown in the image below:

.. thumbnail:: /images/manual/agent/agent-connection-states.png
  :title: Agent connections tates
  :alt: Agent connections tates
  :align: center
  :width: 80%

-  **Never connected**: The Wazuh agent has been enrolled but has not yet connected to the Wazuh manager.
-  **Pending**: The authentication process has not been completed because the Wazuh manager received a request for connection from the Wazuh agent but has not received anything else. The Wazuh agent will be in this state one time in its life cycle after each startup. If the Wazuh agent persists in this state, it may indicate a connectivity issue.
-  **Active**: The Wazuh agent has successfully connected and can now communicate with the Wazuh manager.
-  **Disconnected**: The Wazuh manager will consider the agent disconnected if it does not receive any ``keep alive`` messages within :ref:`agents_disconnection_time <reference_agents_disconnection_time>` (the default time is ``10m``).

Removal
-------

The life cycle of the Wazuh agent comes to an end when it is removed from the Wazuh manager. This can be done through the :ref:`Wazuh server API <>` or :ref:`command line <>`. 