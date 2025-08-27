.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Upgrading Wazuh agents on AIX endpoints
=======================================

Follow the steps to upgrade the Wazuh agent on AIX endpoints.  

#. Download the latest `AIX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_AIX|/aix/wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_. 

#. Stop the Wazuh agent:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control stop

#. Run the following command:

   .. code-block:: console

      # rpm -U wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm

#. Start the Wazuh agent:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control start

.. note::

   We removed the ``protocol`` configuration option. Agent-manager communication now uses TCP exclusively. Before upgrading to 5.0, ensure all agents are configured to use TCP by editing the agent ``/var/ossec/etc/ossec.conf`` file and removing any ``<protocol>`` blocks. See :doc:`/user-manual/reference/centralized-configuration` for instructions on remotely pushing settings to agents.
