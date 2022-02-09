.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Check out our documentation to learn about registering Wazuh agents and the registration service with password authorization. 
  
.. _password-authorization-registration:

Registration service with password authorization
================================================

This method is similar to the :ref:`simple registration service <simple-registration-service>`, except that it provides protection from unauthorized registrations by requiring a password during the registration process.

Password protected registration is enabled in the Wazuh manager configuration. To protect a multi-node cluster from unauthorized agent registrations, password authorization must be enabled on every one of the Wazuh manager nodes. Doing this on every node prevents unauthorized registrations to the cluster through a node not properly configured.

When the configuration is complete, running the ``agent-auth`` utility providing the appropriate password will register the Wazuh agent. After the registration, the Wazuh agent has to be configured to indicate the destination where the collected security events will be sent.

Enabling the password authorization option and creating a registration password on the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


#. To enable password authorization amend the Wazuh manager's ``/var/ossec/etc/ossec.conf`` configuration file as shown below:

         .. code-block:: xml

           <auth>
             ...
             <use_password>yes</use_password>
             ...
           </auth>


#. Choose custom password or let the registration service generate one:

    .. tabs::

     .. group-tab:: Using a custom password


           Create the ``/var/ossec/etc/authd.pass`` file and save the custom password in it.

           In the command below, replace ``<custom_pasword>`` with the chosen password:

           .. code-block:: console

             # echo "<custom_password>" > /var/ossec/etc/authd.pass



     .. group-tab:: Using a random password


           If no password is specified in the ``/var/ossec/etc/authd.pass`` file, the registration service will create a random password. The password can be found in ``/var/ossec/logs/ossec.log`` by executing the following command:

           .. code-block:: console

             # grep "Random password" /var/ossec/logs/ossec.log

           .. code-block:: none
                   :class: output

                   2019/04/25 15:09:50 wazuh-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 3027022fa85bb4c697dc0ed8274a4554



#. Restart the Wazuh manager:

 .. include:: ../../_templates/common/restart_manager.rst



Registering the Wazuh agent and enabling the communication with the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Choose the tab corresponding to the Wazuh agent host operating system:

.. tabs::

 .. group-tab:: Linux/Unix host

   Open a terminal in the Linux/Unix Wazuh agent's host as a ``root`` user.


   #. Register the Wazuh agent using the password. It can be stored in a file or provided as a command-line argument:

       .. tabs::

        .. group-tab:: Using a stored password

         Write the password on ``/var/ossec/etc/authd.pass`` file and run the ``agent-auth`` utility using the Wazuh manager’s IP address:

         .. code-block:: console

          # echo "<custom_password>" > /var/ossec/etc/authd.pass
          # /var/ossec/bin/agent-auth -m <manager_IP>

         .. include:: ../../_templates/registrations/common/set_agent_name.rst



        .. group-tab:: Using a password as a command-line argument

         Run the ``agent-auth`` utility providing the Wazuh manager’s IP address together with the password followed by the ``-P`` flag:

         .. code-block:: console

          # /var/ossec/bin/agent-auth -m <manager_IP> -P "<custom_password>"

         .. include:: ../../_templates/registrations/common/set_agent_name.rst




   #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/var/ossec/etc/ossec.conf``.


         .. include:: ../../_templates/registrations/common/client_server_section.rst



   #. Restart the Wazuh agent:

    .. include:: ../../_templates/common/linux/restart_agent.rst

   The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: Windows host

   Open a Powershell or CMD session in the Wazuh agent's host as an ``Administrator``.

   .. include:: ../../_templates/windows/installation_directory.rst


   #. Register the Wazuh agent using the password. It can be stored in a file or provided as a command-line argument:

       .. tabs::

        .. group-tab:: Using a stored password

         Write the password on ``C:\Program Files (x86)\ossec-agent\authd.pass`` file and run the ``agent-auth`` utility using the Wazuh manager’s IP address:

         .. code-block:: none

          # echo <custom_password> > "C:\Program Files (x86)\ossec-agent\authd.pass"
          # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

         .. include:: ../../_templates/registrations/common/set_agent_name.rst

         The Wazuh agent assumes that the input file is in ``UTF-8`` encoding, without ``byte-order mark (BOM)``. If the file is created in an incorrect encoding it can be changed by opening the ``authd.pass`` file in a Notepad and Save As ``ANSI`` encoding.



        .. group-tab:: Using a password as a command-line argument

         Run the ``agent-auth`` utility, provide the Wazuh manager’s IP address together with the password following the ``-P`` flag:

         .. code-block:: none

           # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP> -P "<custom_password>"

         .. include:: ../../_templates/registrations/common/set_agent_name.rst




   #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``C:\Program Files (x86)\ossec-agent\ossec.conf``.


         .. include:: ../../_templates/registrations/common/client_server_section.rst


   #. Restart the Wazuh agent:

     .. include:: ../../_templates/common/windows/restart_agent.rst

   The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: MacOS X host

  Open a terminal in the Linux/Unix Wazuh agent's host as a ``root`` user.


  #. Register the Wazuh agent using the password. It can be stored in a file or provided as a command-line argument:

      .. tabs::

       .. group-tab:: Using a stored password

        Write the password on ``/Library/Ossec/etc/authd.pass`` file and run the ``agent-auth`` utility using the Wazuh manager’s IP address:

        .. code-block:: console

           # echo "<custom_password>" > /Library/Ossec/etc/authd.pass
           # /Library/Ossec/bin/agent-auth -m <manager_IP>

        .. include:: ../../_templates/registrations/common/set_agent_name.rst



       .. group-tab:: Using a password as a command-line argument

        Run the ``agent-auth`` utility, provide the Wazuh manager’s IP address together with the password following the ``-P`` flag:

        .. code-block:: console

          # /Library/Ossec/bin/agent-auth -m <manager_IP> -P "<custom_password>"

        .. include:: ../../_templates/registrations/common/set_agent_name.rst



  #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/Library/Ossec/etc/ossec.conf``.


         .. include:: ../../_templates/registrations/common/client_server_section.rst

  #. Restart the Wazuh agent:

    .. include:: ../../_templates/common/macosx/restart_agent.rst

  The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.
