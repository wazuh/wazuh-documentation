.. meta::
   :description: New agents in Wazuh are automatically assigned to a default group called "default" if they are not specifically placed in another group. Learn more in this documentation section.

Enroll agents
=============

Agent groups in Wazuh are used to organize and manage agents by grouping them based on specific criteria such as their role, location, or type of system. This allows for centralized management and tailored configuration, enabling users to apply specific rules, policies, and settings to different groups efficiently. New agents in Wazuh are automatically assigned to a default group called "default" if they are not specifically placed in another group. This default group acts as a general category, providing basic monitoring and security configurations for agents until they can be assigned to more appropriate groups based on their specific needs. Check out the `Create agents groups`_ section to learn how to create customized groups to suit your environment.

Create agents groups
--------------------

To manage devices within your environment more efficiently, you can create groups and assign agents to these groups at the point of enrollment.

Follow these steps to create groups on your dashboard:

#. Log in to the Wazuh dashboard.
#. Click the upper-left menu icon **☰** and expand **Agents management** then select **Endpoint Groups**.
#. Click **Add new group** on the upper right corner on the **Endpoint Groups** page.
#. Specify the group name and click **Save new group**.

.. thumbnail:: /images/cloud-service/create-agent-group.gif
   :title: Create agent group
   :alt: Create agent group
   :align: center
   :width: 80%

Deploy agent
------------

To start using Wazuh, you need to install a Wazuh agent on your endpoint and enroll it in your environment.

Follow these steps to enroll an agent:

#. Log into the Wazuh dashboard.

#. Click the upper-left Wazuh icon and then **Agents**.

#. Click **Deploy new agent**.

#. Follow the steps described on the Deploy a new agent page.

.. note::

   Wazuh agents use TCP to communicate with your environment.

.. thumbnail:: /images/cloud-service/enroll-an-agent.gif
   :title: Enroll an agent
   :alt: Enroll an agent
   :align: center
   :width: 80%

If you have any questions about the Wazuh Cloud, see the :doc:`Cloud service FAQ <starting-faq>`.
