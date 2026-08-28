.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how the Wazuh manager distributes centralized configuration settings to Wazuh agents through agent.conf files, and how to create, validate, and apply them.

.. _reference_centralized_configuration:

Centralized configuration for Wazuh agents
=============================================

Introduction
------------

Centralized configuration allows the Wazuh manager to distribute shared configuration settings to Wazuh agents using ``agent.conf`` files.

Each ``agent.conf`` file is associated with an :doc:`agent group </user-manual/agent/agent-management/grouping-agents>`. The Wazuh manager distributes the configuration to all agents assigned to that group.

The shared configuration supplements the local ``/var/ossec/etc/ossec.conf`` file on each Wazuh agent. Depending on the configuration option, centralized settings can override or extend the local configuration.

.. note::
   Check the :doc:`group agents </user-manual/agent/agent-management/grouping-agents>` documentation to learn how to add groups and assign agents to them.

Location of the agent.conf file
----------------------------------

Centralized configuration files are stored in the ``/var/wazuh-manager/etc/shared/`` directory on the Wazuh manager. Each agent group has its own subdirectory containing an ``agent.conf`` file.

.. code-block:: none

   /var/wazuh-manager/etc/shared/<GROUP_NAME>/agent.conf

The following example shows the directory structure:

.. code-block:: none
   :class: output

   /var/wazuh-manager/etc/shared/
   ├── agent-template.conf
   ├── default
   │   └── agent.conf
   ├── linux
   │   └── agent.conf
   ├── webservers
   │   └── agent.conf
   └── windows
       └── agent.conf

The default group is named ``default``. All agents belong to the ``default`` group unless explicitly assigned to another group.

agent.conf structure
----------------------

The ``agent.conf`` file uses the ``<agent_config>`` XML element to define the configuration distributed to Wazuh agents.

Each ``<agent_config>`` block contains one or more supported configuration sections. You can define multiple ``<agent_config>`` blocks in the same file to apply different configurations based on agent attributes.

.. code-block:: xml

   <agent_config>
     <localfile>
       <location>/var/log/syslog</location>
       <log_format>syslog</log_format>
     </localfile>
   </agent_config>

Options
^^^^^^^^

The ``<agent_config>`` element supports attributes that control which agents receive the enclosed configuration. You can use one or more attributes in the same ``<agent_config>`` block.

When multiple attributes are specified, an agent must satisfy all of them for the configuration to be applied. If no attributes are specified, the configuration applies to every agent assigned to the group.

The supported attributes are:

- `name`_
- `os`_
- `profile`_

name
~~~~~

Applies the configuration only to agents with the specified name.

**Allowed values**: Any regular expression that matches the agent name.

**Example**

.. code-block:: xml

   <agent_config name="web-server-01">
     <localfile>
       <location>/var/log/nginx/access.log</location>
       <log_format>syslog</log_format>
     </localfile>
   </agent_config>

os
~~~

Applies the configuration only to agents running operating systems that match the specified pattern.

The os attribute supports simple regular expressions.

**Allowed values**: Any regular expression that matches the agent OS information.

**Example**

.. code-block:: xml

   <agent_config os="Linux">
     <localfile>
       <location>/var/log/auth.log</location>
       <log_format>syslog</log_format>
     </localfile>
   </agent_config>
   <agent_config os="Windows">
     <localfile>
       <location>Security</location>
       <log_format>eventchannel</log_format>
     </localfile>
   </agent_config>

profile
~~~~~~~~

Applies the configuration only to agents that belong to the specified configuration profile.

Configuration profiles are defined locally on the agent using the ``profile`` option in the ``<client>`` section of the ``/var/ossec/etc/ossec.conf`` file on the Wazuh agent.

**Allowed values**: Any regular expression that matches the agent profile.

**Example**

.. code-block:: xml

   <agent_config profile="database-servers">
     <localfile>
       <location>/var/log/mysql/error.log</location>
       <log_format>syslog</log_format>
     </localfile>
   </agent_config>

Combining attributes
~~~~~~~~~~~~~~~~~~~~~~

You can combine multiple attributes to target a more specific set of agents.

The following example applies the configuration only to *Ubuntu* agents that use the *database* configuration profile:

.. code-block:: xml

   <agent_config os="Ubuntu" profile="database">
     <syscheck>
       <frequency>1800</frequency>
     </syscheck>
   </agent_config>

Configuration precedence
---------------------------

The Wazuh agent combines the centralized configuration received from the Wazuh manager with its local ``ossec.conf`` configuration.

When the same setting is defined in multiple places, the following precedence applies (highest to lowest):

#. ``agent.conf`` (centralized configuration from the Wazuh manager)
#. ``ossec.conf`` (local configuration on the agent)

If an agent belongs to multiple groups, the configurations from all groups are merged. In case of conflicts between groups, the configuration from the group with the lowest alphabetical order takes precedence.

Best practices
^^^^^^^^^^^^^^^

- Use temporary filenames (for example, ``agent.conf.tmp``) while editing configuration files.
- Validate configuration files before making them active.
- Use agent groups to organize shared configuration.
- Use attributes (``name``, ``os``, ``profile``) to target only the intended agents.

Centralized configuration process
-------------------------------------

Create the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Create or edit the configuration file in the group directory on the Wazuh manager.

   Use a temporary filename such as ``agent.conf.tmp`` during editing to prevent the Wazuh manager from distributing an incomplete or invalid configuration. For example, run these commands to create a configuration file for the ``default`` group.

   .. code-block:: console

      # touch /var/wazuh-manager/etc/shared/default/agent.conf.tmp
      # chown wazuh-manager:wazuh-manager /var/wazuh-manager/etc/shared/default/agent.conf.tmp
      # chmod 660 /var/wazuh-manager/etc/shared/default/agent.conf.tmp

2. Define one or more configuration blocks. Use filters such as name, os, and profile to target specific agents:

   .. code-block:: xml

      <agent_config name="agent_name">
        <localfile>
          <location>/var/log/my.log</location>
          <log_format>syslog</log_format>
        </localfile>
      </agent_config>
      <agent_config os="Linux">
        <localfile>
          <location>/var/log/linux.log</location>
          <log_format>syslog</log_format>
        </localfile>
      </agent_config>
      <agent_config profile="database">
        <localfile>
          <location>/var/log/database.log</location>
          <log_format>syslog</log_format>
        </localfile>
      </agent_config>

   .. note::
      The profile option uses values defined in the ``<config_profile>`` setting of the :doc:`client </user-manual/reference/ossec-conf/client>` configuration.

Validate the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

3. Verify the configuration using the :doc:`verify-agent-conf </user-manual/reference/tools/verify-agent-conf>` tool. Rename the file to make it active. For example:

   .. code-block:: console

      # /var/wazuh-manager/bin/verify-agent-conf /var/wazuh-manager/etc/shared/default/agent.conf.tmp

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      verify-agent-conf: OK

Apply the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^

4. Rename the file to make it active. For example:

   .. code-block:: console

      # mv /var/wazuh-manager/etc/shared/default/agent.conf.tmp /var/wazuh-manager/etc/shared/default/agent.conf

   The Wazuh manager will automatically detect the new configuration and distribute it to all Wazuh agents in the ``default`` group.

5. The Wazuh manager automatically detects the updated configuration and distributes it to agents in the group.

   A restart is not normally required. To trigger distribution sooner, restart the Wazuh manager. Refer to the :doc:`query the Wazuh agent configuration </user-manual/agent/agent-management/query-configuration>` documentation for more information on checking the synchronization status of a Wazuh agent.

   .. code-block:: console

      # systemctl restart wazuh-manager

   Connected agents receive the updated configuration automatically after the Wazuh manager detects the change.
