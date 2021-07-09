.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Find out how to register Wazuh agents using the command line (CLI) in this section of the Wazuh documentation. 
  
.. _command-line-registration:

Registering the Wazuh agents using the command line (CLI)
=========================================================

This method consists on registering the Wazuh agent on the Wazuh manager using ``manage_agents`` utility by extracting the registration key from the Wazuh manager and inserting it manually in the Wazuh agent.

.. note:: Root/Administrator user privileges are necessary to execute all the commands described below.

The Wazuh agent's key extraction from the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the CLI of the Wazuh manager's host add the Wazuh agent with ``manage_agents`` utility providing new Wazuh agent's name and IP address:

     .. code-block:: console

       # /var/ossec/bin/manage_agents -a <agent_IP> -n <agent_name>

#. Find the ``ID`` of the Wazuh agent:

     .. code-block:: console

       # /var/ossec/bin/manage_agents -l | grep <agent_name>

     An example output of the command looks as follows:

     .. code-block:: none
             :class: output

             ID: 001, Name: agent_1, IP: any

#. Extract the Wazuh agent's registration key using the Wazuh agent's ID:

     .. code-block:: console

      # /var/ossec/bin/manage_agents -e <agent_id>

     An example output of the command looks as follows:

     .. code-block:: none
             :class: output

             Agent key information for '001' is:
             MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

     The ``key`` has to be imported to the Wazuh agent to enable communication to the Wazuh manager.

Key insertion to the Wazuh agent and enabling the communication with the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Choose the tab corresponding to the Wazuh agent's host operating system:

.. tabs::

  .. group-tab:: Linux/Unix host


    Open a terminal in your Wazuh agent's host as a ``root`` user.


    #. Import the registration key to the Wazuh agent using ``manage_agents`` utility:

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


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/var/ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/linux/restart_agent.rst



  .. group-tab:: Windows host


    Open a a Powershell or CMD session in your Wazuh agent's host as an ``Administrator``.

    .. include:: ../../_templates/windows/installation_directory.rst


    #. Import the registration key to the Wazuh agent using ``manage_agents`` utility:

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


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``C:\Program Files (x86)\ossec-agent\ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/windows/restart_agent.rst



  .. group-tab:: MacOS X host


    Open a terminal in your Wazuh agent's host as a ``root`` user.


    #. Import the registration key to the Wazuh agent using ``manage_agents`` utility:

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

    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/Library/Ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/macosx/restart_agent.rst
