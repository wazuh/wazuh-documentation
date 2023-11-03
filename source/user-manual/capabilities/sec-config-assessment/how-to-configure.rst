
.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section of our documentation to learn more about how to configure Configuration Assessment in Wazuh.

How to configure Configuration assessment
====================

Wazuh agents include the appropriate policies for their particular operating system during installation. For the full list of officially supported policy files, see the table :ref:`available_sca_policies`. These policies are included with the Wazuh server installation so that they can be easily enabled.

For a detailed description of the various configuration parameters of SCA, please check the :ref:`SCA reference <reference_sec_config_assessment>`.


Enabling and disabling policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the Wazuh agent runs scans for every policy (``.yaml`` or ``.yml`` files) present in their ruleset folder:

- Linux and Unix-based agents: ``/var/ossec/ruleset/sca``.
- Windows agents: ``C:\Program Files (x86)\ossec-agent\ruleset\sca``.
- macOS agents: ``/Library/Ossec/ruleset/sca``.

.. warning::
    The contents of the aforementioned default ruleset folders are neither kept across installations nor updates. Place them under an alternative folder if you wish to modify or add new policies.

To enable a policy file outside the Wazuh agent installation folder, add the policy file path to the ``<sca>`` block in the Wazuh agent configuration file. An example is shown below:

.. code-block:: xml

    <sca>
      <policies>
        <policy><FULLPATH_TO_CUSTOM_SCA_POLICY_FILE></policy>
      </policies>
    </sca>

You can also specify a relative path to the Wazuh installation directory:

.. code-block:: xml

    <sca>
      <policies>
        <policy>etc/shared/<CUSTOM_SCA_POLICY_FILE></policy>
      </policies>
    </sca>

There are two ways to disable policies on the Wazuh agent. The simplest one is renaming the policy file by adding ``.disabled`` (or anything different from ``.yaml`` or ``.yml``) after their YAML extension. 

The second is to disable them from the Wazuh agent ``ossec.conf`` file by adding a line such as the following to the ``<policy>`` section of the SCA module:

.. code-block:: xml

    <sca>
      <policies>
        <policy enabled="no">etc/shared/<POLICY_FILE_TO_DISABLE></policy>
      </policies>
    </sca>

.. _share_policy_files_and_configuration_with_the_Wazuh_agents:

How to share policy files and configuration with the Wazuh agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>` section, the Wazuh manager can push files and configurations to connected Wazuh agents.

You can enable this feature to push policy files to the Wazuh agents in defined groups. By default, every Wazuh agent belongs to the ``default`` group, which is used here as an example:

#. On the Wazuh agent, edit the ``local_internal_options.conf`` file to allow the execution of commands in SCA policies sent from the Wazuh server:

     .. code-block:: console

        # echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf


    .. note::
        By enabling remote command execution, the Wazuh server gains the ability to execute commands on the monitored endpoint. Remote commands are disabled by default as a security measure, which helps reduce the attack surface in case the Wazuh server is compromised.

        You do not need to enable remote commands if you add the policy files to each agent without using the Wazuh server to push them. For example, you can manually create the policy file directly on the monitored endpoint, or use ``scp`` to copy the policy file to the monitored endpoint.    

#. On the Wazuh server, place a new policy file in the ``/var/ossec/etc/shared/default`` folder and change its ownership. Replace ``<NEW_POLICY_FILE>`` with your policy name. 

     .. code-block:: console
        
        # chown wazuh:wazuh /var/ossec/etc/shared/default/<NEW_POLICY_FILE>


#. Add the following configuration block to the Wazuh server ``/var/ossec/etc/shared/default/agent.conf`` file to configure the new policy file in the Wazuh agent:


     .. code-block:: xml
        :emphasize-lines: 5

        <agent_config>
          <!-- Shared agent configuration here -->
          <sca>
            <policies>
                <policy>etc/shared/<NEW_POLICY_FILE></policy>
            </policies>
          </sca>
        </agent_config>

   All files remotely pushed from the Wazuh server are saved in the ``/<WAZUH_HOME_DIRECTORY>/etc/shared/`` directory on the agent endpoints regardless of the group they belong to. We specify the relative file path of the policy in the configuration because the full file path could differ depending on the operating system of the monitored endpoint.

The new ``<sca>`` block in the Wazuh server ``/var/ossec/etc/shared/default/agent.conf`` file is merged with the ``<sca>`` block on the Wazuh agent side, and the new configuration is added.
