.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

The Wazuh agent registration process enables agent-manager communication, which requires a pre-shared key available on both sides. This key is used to establish an encrypted and authenticated communication channel by using `AES algorithm <https://wazuh.com/blog/benefits-of-using-aes-in-our-communications/>`_, allowing the manager to receive data collected by the agent.

.. note::

    If the agent was deployed using :ref:`Deployment variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`, the registration process is different and described in their corresponding sections of the documentation.
    If the Wazuh runs in the cluster mode, please refer to the :ref:`Configuring a cluster section <load_balancer>` to get more information about the registration process in the cluster.

.. _simple-registration-service:

Registering agent using Simple Registration Service
---------------------------------------------------

To register the agent, choose the tab corresponding to the agent host operating system:

.. tabs::

 .. group-tab:: Linux/Unix host

   Open a session in the Linux/Unix agent host as a ``root`` user.

   1. Run the ``agent-auth`` program, using the manager’s IP address:

    .. include:: ../../_templates/registrations/common/set_agent_name.rst

    .. code-block:: console

     # /var/ossec/bin/agent-auth -m <manager_IP>

   2. Edit the agent's  ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/linux/start_agent.rst


   The agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: Windows host

   Open a Powershell or CMD session in the agent host as an ``Administrator``.

    .. include:: ../../_templates/registrations/windows/installation_directory.rst

   1. Run the ``agent-auth.exe`` program, using the manager's IP address:

    .. include:: ../../_templates/registrations/common/set_agent_name.rst

    .. code-block:: console

     # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

   2. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent.

    .. include:: ../../_templates/registrations/windows/start_agent.rst



 .. group-tab:: MacOS X host

  Open a session in the MacOS X agent host as a ``root`` user.

  1. Run the ``agent-auth`` program, using the manager’s IP address:

   .. include:: ../../_templates/registrations/common/set_agent_name.rst

   .. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <manager_IP>

  2. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

   .. include:: ../../_templates/registrations/common/client_server_section.rst

  3. Start the agent:

   .. include:: ../../_templates/registrations/macosx/start_agent.rst

  The agent registration can be adjusted by using different :ref:`agent-auth` options.


The above method is the simplest way of registering the agent. There are also available :ref:`other registration methods <other_registration_methods>`.

To learn more about the agent registration process, please read the :ref:`registering agents - additional information <registering_agent_theory>`.

In case of problems during the registration, several solutions can be found on :ref:`registering agents' troubleshooting <registering-agents-troubleshooting>`.

.. toctree::
    :maxdepth: 2
    :hidden:

    other-registration-methods
    registering-agents-theory
    registering-agents-troubleshooting
