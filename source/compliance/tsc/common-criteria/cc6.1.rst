.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh meets the architecture, infrastructure, and security software aspects of the common criteria CC6.1 by providing several modules.

Common criteria 6.1
===================

The TSC *common criteria CC6.1* states that: *“The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives”*. This control is part of the security category of the TSC requirements. It requires the entity to maintain an inventory of its information assets. It also seeks to define the minimum requirements for the management of logical and physical access to the entity's information systems. These controls are implemented with user authentication, encryption, and asset inventory.

The TSC *CC6.1* is a key consideration when assessing the reliability of a system. It demonstrates that the required security precautions have been taken to maintain an entity's security.

The use case below shows how Wazuh assists in meeting this requirement.

Use case: Maintaining asset inventory on a Windows endpoint
-----------------------------------------------------------

Wazuh meets the architecture, infrastructure, and security software aspects of the *common criteria CC6.1* by providing several modules. One of these is the Syscollector module. In this use case, we show how to use the Wazuh Syscollector module to collect system information on a Windows 10 endpoint. You can use this module to monitor specific components, protocols, services, or applications running on an endpoint.

#. Open the Wazuh agent configuration file ``C:\Program Files (x86)\ossec-agent\ossec.conf`` and scroll to the ``syscollector`` block to verify that you have the same configuration below:

   .. code-block:: XML

      <!-- System inventory -->
       <wodle name="syscollector">
         <disabled>no</disabled>
         <interval>1h</interval>
         <scan_on_start>yes</scan_on_start>
         <hardware>yes</hardware>
         <os>yes</os>
         <network>yes</network>
         <packages>yes</packages>
         <ports all="no">yes</ports>
         <processes>yes</processes>
     
         <!-- Database synchronization settings -->
         <synchronization>
           <max_eps>10</max_eps>
         </synchronization>
       </wodle>

#. Navigate to **Agents** > **AGENT_NAME** > **Inventory data** on the Wazuh dashboard. Where **AGENT_NAME** is the monitored endpoint. You can see details about installed applications, network services, and used ports on the monitored endpoint.

   .. thumbnail:: /images/compliance/tsc/common-criteria/agent-inventory-data.png
      :title: Agent inventory data
      :alt: Agent inventory data
      :align: center
      :width: 80%
