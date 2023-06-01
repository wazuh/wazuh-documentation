.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Upgrading Wazuh agents on AIX systems
=====================================

Follow the steps to upgrade the Wazuh agent on AIX systems.  
  
#. Download the latest `AIX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_AIX|/aix/wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_. 

#. Run the following command:

   .. code-block:: console

      # rpm -U wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm



.. note::
   :class: not-long

   When upgrading agents from versions earlier than 4.x, make sure that the communication protocol is compatible. Up to that point, UDP was the default protocol and it was switched to TCP for later versions. Edit the agent configuration file ``ossec.conf`` to update the :ref:`protocol <server_protocol>` or make sure that your Wazuh manager accepts :ref:`both protocols<manager_protocol>`. 