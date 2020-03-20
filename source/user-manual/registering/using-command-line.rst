.. Copyright (C) 2019 Wazuh, Inc.

.. _using-command-line:

Registering agents using the Command Line (CLI)
===============================================

This method consists of registering the Wazuh agent manually with the Wazuh manager using ``manage_agents`` program, extracting the registration key and inserting it in the agent.

.. note:: Root/Administrator user privileges are necessary to execute all the commands described below.

Manager
^^^^^^^

1. On the CLI of the Wazuh manager host add the agent with ``manage_agents`` program providing new agent's name and IP address:

   .. code-block:: console

    # /var/ossec/bin/manage_agents -a <agent_IP> -n <agent_name>

2. Find the ``ID`` of the agent:

   .. code-block:: console

    # /var/ossec/bin/manage_agents -l | grep <agent_name>

   An example output of the command looks as follows:

   .. code-block:: none
           :class: output

           ID: 001, Name: agent_1, IP: any

3. Extract the agent's registration key using the agent's ID:

   .. code-block:: console

    # /var/ossec/bin/manage_agents -e <agent_id>

   An example output of the command looks as follows:

   .. code-block:: none
           :class: output

           Agent key information for '001' is:
           MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

   The ``key`` has to be imported to the agent to enable communication to the manager.

Agent
^^^^^

Choose the tab corresponding to the agent host operating system:

.. tabs::

  .. group-tab:: Linux/Unix host

   Open a session in your agent host as a ``root`` user.

   1. Import the registration key to the agent using ``manage_agents`` program:

    .. code-block:: console

     # /var/ossec/bin/manage_agents -i <key>

    An example output of the command should looks as follows:

    .. code-block:: none
            :class: output

            Agent information:
                ID:001
                Name:agent_1
                IP Address:any

            Confirm adding it?(y/n): y
            Added.

   2. Edit the agent's ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/linux/start_agent.rst



  .. group-tab:: Windows host

   Open a session in your agent host as an ``Administrator``.

    .. include:: ../../_templates/registrations/windows/installation_directory.rst

   1. Import the registration key to the agent using ``manage_agents`` program:

    .. code-block:: console

       # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i <key>

    The example output of the command should looks as follows:

    .. code-block:: none
            :class: output

            Agent information:
                ID:001
                Name:agent_1
                IP Address:any

            Confirm adding it?(y/n): y
            Added.

   2. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/windows/start_agent.rst



  .. group-tab:: MacOS X host

   Open a session in your agent host as a ``root`` user.

   1. Import the registration key to the agent using ``manage_agents`` program:

    .. code-block:: console

     # /Library/Ossec/bin/manage_agents -i <key>

    An example output of the command should looks as follows:

    .. code-block:: none
            :class: output

            Agent information:
    	         ID:001
    	         Name:agent_1
    	         IP Address:any

            Confirm adding it?(y/n): y
            Added.

   2. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/macosx/start_agent.rst
