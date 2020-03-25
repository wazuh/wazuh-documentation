.. Copyright (C) 2019 Wazuh, Inc.

.. _registering-agents-troubleshooting:

Registering agents - Troubleshooting
====================================

.. meta::
  :description: Registering Wazuh agents - Troubleshooting


Agent registers successfully but disappears after another agent is being registered.
------------------------------------------------------------------------------------

By default, the manager attaches an agent to the visible IP of the agent. If the manager or the agents are, for example, behind a NAT, the agent should be registered with IP Address ``any``, which works as ``0.0.0.0/0``.

1. To set up this behavior for a single registration:

   Add the agent's IP Address as ``any`` to the registration command.

   An example :ref:`Simple Registration Service <simple-registration-service>` command template could look as follows:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m <manager_IP> -I any


2. To set up this behavior for all subsequent registrations:

   In the manager's configuration ``/var/ossec/etc/ossec.conf`` file set the ``<use_source_ip>`` to ``no``:

   .. code-block:: xml

    <ossec_config>
      ...
      <auth>
        ...
        <use_source_ip>no</use_source_ip>
        ...
      </auth>
      ...
    </ossec_config>

   Restart the manager for the changes to take effect:

   .. code-block:: console

    # systemctl restart wazuh-manager

   .. note::
    Specifying the agent's IP address in the registration command manually overwrites this setting.

 If the registered machines have the same hostname, the agent name has to be specified manually.
 In that case, an example :ref:`Simple Registration Service <simple-registration-service>` command template could look as follows:

   .. code-block:: console

    # /var/ossec/bin/agent-auth -m <manager_IP> -I any -A <agent_name>
