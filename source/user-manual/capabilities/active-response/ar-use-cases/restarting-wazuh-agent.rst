.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to restart the Wazuh agent to apply configuration changes using active response in this use case.

Restarting the Wazuh agent with active response
===============================================

You can use the ``restart-wazuh`` active response script to restart the Wazuh agent on a monitored endpoint. In this use case, we configure it to restart the Wazuh agent whenever the ``/var/ossec/etc/ossec.conf`` configuration file changes.

Infrastructure
--------------

================ ===========
Endpoint         Description
================ ===========
**Ubuntu 22.04** We save changes to the Wazuh agent configuration file on this endpoint to trigger an active response.
================ ===========

Wazuh server
------------

#. Open the Wazuh server ``/var/ossec/etc/ossec.conf`` file and verify that a ``<command>`` block called ``restart-wazuh`` with the following configuration is present within the ``<ossec_config>`` block:

   .. code-block::

      <command>
        <name>restart-wazuh</name>
        <executable>restart-wazuh</executable>
      </command>

   The ``<command>`` block contains information about the action to be executed on the Wazuh agent:

   -  ``<name>``: Sets a name for the command. In this case, ``restart-wazuh``.
   -  ``<executable>``: Specifies the active response script or executable that must run after a trigger. In this case, it’s the ``restart-wazuh`` executable.
   -  ``<timeout_allowed>``: Allows a timeout after a period of time. This tag is set to no here, which represents a stateless active response.

#. Add the ``<active-response>`` block below to the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <ossec_config>
        <active-response>
          <command>restart-wazuh</command>
          <location>local</location>
          <rules_id>100009</rules_id>
        </active-response>
      </ossec_config>

   -  ``<command>``: Specifies the command to configure. This is the command name ``restart-wazuh`` defined in the previous step.
   -  ``<location>``: Specifies where the command executes. Using the ``local`` value here means that the command executes on the monitored endpoint where the trigger event occurs.
   -  ``<rules_id>``: The active response module executes the command if rule ID ``100009`` fires.

#. Add the rules below to the Wazuh server ``/var/ossec/etc/rules/local_rules.xml`` configuration file:

   .. code-block:: xml

      <group name="restart,">
        <rule id="100009" level="5">
          <if_sid>550</if_sid>
          <match>ossec.conf</match>
          <description>Changes made to the agent configuration file - $(file)</description>
        </rule>
      </group>

   This rule detects changes in the Wazuh agent configuration file.

#. Restart the Wazuh manager service to apply changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Ubuntu endpoint
---------------

#. Edit the ``/var/ossec/etc/ossec.conf`` file and add the following configuration to the ``<syscheck>`` section:

   .. code-block:: xml

      <directories realtime="yes">/var/ossec/etc/ossec.conf</directories>

   This monitors the Wazuh agent configuration file for any changes.

#. Restart the Wazuh agent service to apply changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent
   
Test the configuration
----------------------

#. Add the following block in the ``<syscheck>`` block of the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file and save it:

   .. code-block:: xml

      <directories realtime="yes">/root</directories>

   This addition allows monitoring file changes in the ``/root`` directory of the monitored endpoint. You don’t need to actually add or modify files. It’s just to test the configuration.

   .. warning::

      Incorrect modifications to the Wazuh agent configuration file might cause the service to crash. It’s important to thoroughly review any changes before implementing them in a production environment.

Visualize the alerts
--------------------

You can visualize the alert data on the Wazuh dashboard.

.. thumbnail:: /images/manual/active-response/ar-alert-fired2.png
   :title: Active response alert: The Wazuh agent was restarted
   :alt: Active response alert: The Wazuh agent was restarted
   :align: center
   :width: 80%
