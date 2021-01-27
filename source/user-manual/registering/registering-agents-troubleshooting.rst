.. Copyright (C) 2020 Wazuh, Inc.

.. _registering-agents-troubleshooting:

Registering Wazuh agents - Troubleshooting
==========================================

.. meta::
  :description: Registering Wazuh agents - Troubleshooting


The Wazuh agent registers successfully but disappears after another Wazuh agent is being registered
---------------------------------------------------------------------------------------------------

By default, the Wazuh manager attaches the Wazuh agent to the visible IP of the Wazuh agent. If the Wazuh manager or the Wazuh agents are, for example, behind a NAT, the Wazuh agent should be registered with IP address ``any``, which works as ``0.0.0.0/0``.


#. To set up this behavior for a single registration:

   Add the Wazuh agent's IP address as ``any`` to the registration command.

   For example, the :ref:`simple registration service <simple-registration-service>` command could look as follows:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m <manager_IP> -I any

   If the ``-I`` option is set to ``any`` and the Wazuh agents' hosts have the same hostname, the Wazuh agent name has to be specified manually. Otherwise, the newly registered agent will overwite the previous one.

   In that case, the simple registration service command could look as follows:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m <manager_IP> -I any -A <agent_name>


#. To set up this behavior for all subsequent registrations:

   In the Wazuh manager's configuration ``/var/ossec/etc/ossec.conf`` file, set the :ref:`use_source_ip <auth_use_source_ip>` to ``no``:

   .. code-block:: xml

    <wazuh_config>
      ...
      <auth>
        ...
        <use_source_ip>no</use_source_ip>
        ...
      </auth>
      ...
    </wazuh_config>

   Restart the wazuh manager:

   .. include:: ../../_templates/common/restart_manager.rst

   After that, the simple registration service command does not need the ``-I`` option and the Wazuh agent's IP address will be automatically set to ``any``:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m <manager_IP>

   Providing the Wazuh agent's IP address in the registration command overwrites ``use_source_ip`` option.
