.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about how to configure the Active Response capability in this section of the Wazuh documentation. 

How to configure Active Response
================================

The following steps describe how to configure the Active Response module to perform an action on a monitored endpoint.

Configuring the Wazuh server
----------------------------

#. Check the configuration of the ``<command>`` block in the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file. Add one if it doesn’t exist already.

   The ``<command>`` block sets the script to run in response to a trigger. When using :doc:`out-of-the-box active response <default-active-response-scripts>` scripts, the ``<command>`` blocks for them are present in the Wazuh server ``/var/ossec/etc/ossec.conf`` by default, and you don’t need to add them. But when using :doc:`custom active response <custom-active-response-scripts>` scripts, you need to add the required ``<command>`` blocks for them in between the ``<ossec_config>`` tags of the Wazuh server configuration file. For example:

   .. code-block:: xml

      <command>
        <name>host-deny</name>
        <executable>host-deny</executable>
        <timeout_allowed>yes</timeout_allowed>
      </command>

   Where:

   -  ``<name>``: Sets a name for the command. In this case, ``host-deny``.
   -  ``<executable>``: Specifies the active response script or executable that must run upon a trigger. You don't need to specify the file name extension unless you have multiple scripts sharing the same name. In this case, it’s the ``host-deny`` executable.
   -  ``<timeout_allowed>``: Allows a timeout after a period of time. Setting this value to ``yes`` reverts the action after a period of time. Check :ref:`stateful active response <stateful_active_response>` below for more details.

   Refer to the :doc:`command section </user-manual/reference/ossec-conf/commands>` for more information and options used to create a command.

#. Add an ``<active-response>`` block within the ``<ossec_config>`` tag in the same Wazuh server ``/var/ossec/etc/ossec.conf`` file. The ``<active-response>`` block defines when and where a command executes. For example, when an alert meets response criteria, such as a specific rule ID, alert level, or rule group. This configuration further defines if the command action specified in the previous step executes on the Wazuh agent, Wazuh server, or everywhere. For example:

   .. code-block:: xml

      <active-response>
        <command>host-deny</command>
        <location>local</location>
        <level>7</level>
        <timeout>600</timeout>
      </active-response>

   Where:

   -  ``<command>``: Specifies the command to configure. This is the command name defined in the previous step.
   -  ``<location>``: Specifies where the command must execute. The options are:

      -  ``local``: It runs the script on the monitored endpoint that generated the alert.
      -  ``server``: It runs the script on the Wazuh server.
      -  ``defined-agent``: It runs the script on a predefined agent. Use the ``<agent_id>`` tag to specify the ID of the Wazuh agent that must run the script regardless of where the event occurred. For example:

         .. code-block:: xml
            :emphasize-lines: 5, 6

            <ossec_config>
              <active-response>
                <disabled>no</disabled>
                <command>host-deny</command>
                <location>defined-agent</location>
                <agent_id>001</agent_id>
                <level>10</level>
                <timeout>180</timeout>
              </active-response> 
            </ossec_config>

      -  ``all``: Every Wazuh agent in the environment must run the script. Use this option with caution. Incorrect configuration can cause problems in your environment.

   -  ``<timeout>``: Specifies how long the active response action is effective, in seconds.

   Refer to the :doc:`Active Response </user-manual/reference/ossec-conf/active-response>` configuration section for more information on the supported options.

#. Restart the Wazuh manager to apply all the changes made:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Configuring the monitored endpoint
----------------------------------

Using out-of-the-box active response scripts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

No configuration is required. Check out the :doc:`Default active response scripts <default-active-response-scripts>` section for more information on out-of-the-box active response scripts.

Using custom active response scripts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Linux/Unix
~~~~~~~~~~

#. Add your custom active response script or executable to the ``/var/ossec/active-response/bin`` directory on Linux/Unix endpoints.

#. Change the script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /var/ossec/active-response/bin/<CUSTOM_SCRIPT>
      $ sudo chown root:wazuh /var/ossec/active-response/bin/<CUSTOM_SCRIPT>


macOS
~~~~~

#. Add your custom active response script or executable to the ``/Library/Ossec/active-response/bin`` directory on Linux/Unix endpoints.

#. Change the script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /Library/Ossec/active-response/bin/<CUSTOM_SCRIPT>
      $ sudo chown root:wazuh /Library/Ossec/active-response/bin/<CUSTOM_SCRIPT>


Windows
~~~~~~~

#. Add your custom active response script or executable to the ``C:\Program Files (x86)\ossec-agent\active-response\bin`` directory on Windows endpoints.

.. note::

   You can find the results of the execution of the active response scripts in the:

   -  ``/var/ossec/logs/active-responses.log`` file on Linux endpoints.
   -  ``/Library/Ossec/logs/active-responses.log`` file on macOS endpoints.
   -  ``C:\Program Files (x86)\ossec-agent\active-response\active-responses.log`` file on Windows endpoints.

