.. meta::
   :description: New agents in Wazuh are automatically assigned to a default group called "default" if they are not specifically placed in another group. Learn more in this documentation section.

Enrolling agents
================

Enrolling agents is the process of connecting your endpoints (servers, workstations, or cloud instances) to your Wazuh Cloud environment. Once enrolled, Wazuh agents begin forwarding security telemetry such as logs, vulnerabilities, and configuration data.

Deploying agent
---------------

To start using Wazuh, you need to install a Wazuh agent on your endpoint and enroll it in your environment.

Follow these steps to deploy an agent:

#. Log into the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Agents management** and select **Summary**.
#. Click **Deploy new agent**.
#. Follow the steps outlined on the **Deploy new agent** page.

.. thumbnail:: /images/cloud-service/enroll-an-agent.gif
   :title: Enrolling an agent
   :alt: Enrolling an agent
   :align: center
   :width: 80%

Verifying agent enrollment
---------------------------

Once installed, the agent automatically attempts to connect to Wazuh Cloud. Verify the enrollment by following the below steps:

#. Log into the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Agents management** and select **Summary**.
#. The list of agents are displayed on the **Summary** page.

.. thumbnail:: /images/cloud-service/verifying-agent-enrollment.gif
   :title: Verifying agent enrollment
   :alt: Verifying agent enrollment
   :align: center
   :width: 80%

Creating agent groups
---------------------

Agent groups in Wazuh are used to organize and manage agents by grouping them based on criteria such as role, location, or system type. This allows for centralized management and tailored configuration, enabling you to apply rules, policies, and settings efficiently. New agents are automatically assigned to a default group called "**default**" if they are not placed in another group. Use the default group for basic monitoring first, then assign agents to more appropriate groups as needed.

To manage devices within your environment more efficiently, you can create groups and assign agents to these groups at the point of enrollment. Follow these steps to create groups on your dashboard:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰**, expand **Agents management** and select **Groups**.
#. Click **Add new group** on the upper right corner on the **Groups** page.
#. Specify the group name and click **Save new group**.

.. thumbnail:: /images/cloud-service/create-agent-group.gif
   :title: Create agent group
   :alt: Create agent group
   :align: center
   :width: 80%
