.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Wazuh 4.0 registration process provides the user with an automated mechanism to enroll agents with minimal configuration steps.
  
.. _agent-enrollment:

Registration using the enrollment method
========================================

As part of Wazuh 4.0 release, the registration process was highly improved, providing the user with an automated mechanism to enroll agents with minimal configuration steps.

With this new improvement, an agent can be started as soon as a valid manager IP is set. The agent will check the key inexistence in ``client.keys`` file and will automatically request the key to the manager for which the agent was configured for reporting.

In the same way, if the communication with the manager gets lost, the agent will update its key by requesting a new one from the manager. This allows the recovery of agents’ communication even if the manager deletes, loses, corrupts, or replaces the agents’ keys file.


How it works
------------

The agent detects the need for new keys if ``client.keys`` file is empty during the startup, or if the communication with the manager failed the number of times defined in ``<client><server><max_retries>``, 5 by default.

Each time this scenario is detected, the agent will request a new key to the manager using the configuration defined in ``ossec.conf``. 

By default, out of the box, the agent will run the enrollment process with the settings below:

- Same server address configured for reporting in ``<client><server><address>`` section.
- Agent name extracted from the hostname of the OS.
- No belongship to groups.
- Registration without password nor certificate validation.

But every possible configuration available as options for ``agent-auth`` binary can be set in ``ossec.conf`` under the section ``<enrollment>``. And each time an agent enrolls will use this configuration to request the key.

When the agent already has a key but fails to communicate with the manager several times, requests a new key appending the hash of the actual key in the registration message. In this way, Authd can verify if the agent already has a valid key previously, to avoid unnecessarily generating a new one that will replace the first one.

Although this new feature eliminates the need to register agents through agent-auth, this binary is conserved, giving the user the possibility to use both registration mechanisms.



Typical configurations
----------------------

- ``Agent name``: The name used to register with the manager can be defined and different from the hostname of the OS. For doing this, ``<enrollment><agent_name>`` needs to be filled with the desired name.
- ``Centralized groups``: The belongship of the agent to one or mor e groups can be set in ``<enrollment><groups>``, using a comma-separated string with all the groups where the agent will belong.
- ``Password validation``: By default, the agent tries to read the password for verification from ``WAZUH_PATH/etc/authd.pass`` in Unix systems and ``WAZUH_PATH/authd.pass`` in Windows systems; as this file doesn’t exist out of the box, the registration runs without a password. Adding this file with a password string will make the agent use it for validation. Also, the path to this file can be modified on ``<enrollment><authorization_pass_path>`` section.
- ``Manager Certificate validation``: If a valid file path is defined in ``<enrollment><server_ca_path>``, the agent will only accept a key returned by a trusted manager able to identify itself with certificates that match the one located on ``server_ca_path``.
- ``Agent Certificate validation``: If valid file paths are defined in ``<enrollment><agent_certificate_path>`` and ``<enrollment><agent_key_path>`` the agent will identify itself with the manager using the provided certificates.
 
 

Other configurations
--------------------

- ``Disabled``: The enrollment method can be disabled setting ``<enrollment><enabled>`` as ``no``. This will prevent any registration through Wazuh Agent, needing the use of ``agent-auth`` as in previous versions of Wazuh.
- ``Delay after enrollment``: After successful enrollment, the agent will wait before trying to communicate with the manager to guarantee synchronization between all Wazuh modules and cluster nodes. The waiting time is set to 20 seconds by default and can be modified in ``<enrollment><delay_after_enrollment>``.
- ``Use source IP``: The agent can request the manager to be registered using the IP of the connection instead of being registered with the option ``any`` by setting ``<enrollment><use_source_ip>`` as ``yes``. This option isn’t compatible with ``agent_address``.
- ``Agent address``: The agent can request the manager to be registered with a specified IP by setting ``<enrollment><agent_address>`` to any desired address. This option isn’t compatible with ``use_source_ip``.



Enrollment configuration block example
--------------------------------------

.. code-block:: xml

 <enrollment>
  <enabled>yes</enabled>
  <agent_name>EXAMPLE_NAME</agent_name>
  <groups>GROUP1,GROUP2,GROUP3</groups>
  <use_source_ip>yes</use_source_ip>
  <authorization_pass_path>FILE_PATH</authorization_pass_path>
  <server_ca_path>FILE_PATH<server_ca_path>
  <agent_certificate_path>FILE_PATH<agent_certificate_path>
  <agent_key_path>FILE_PATH<agent_key_path>
  <delay_after_enrollment>15<delay_after_enrollment>
 </enrollment>

 
 
Use case example
----------------

Using variables allows us to fully automate the agent registration and configuration. To successfully start the agent and register it, it’s necessary to define at least the variable ``WAZUH_MANAGER``.
In the next example we will show how an Ubuntu Wazuh Agent can be configured, registered, and started in three minimal steps:


1. Add the Wazuh repository:

.. code-block:: xml

  curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -
    echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list
  apt-get update
  
 

2. Deploy Wazuh Agent with Manager IP defined:

.. code-block:: xml  

  WAZUH_MANAGER = "192.168.2.129" apt-get install wazuh-agent
  
 

3. Start Wazuh Agent:

.. code-block:: xml

  systemctl daemon-reload
    systemctl enable wazuh-agent
  systemctl start wazuh-agent

After following these steps we should see the below logs on ``ossec.log`` confirming the enrollment was successful.	

And ``client.keys`` should now contain the obtained key.

On the manager side, the agent should be found and appear at ``active`` status after a few seconds. Running the following command will show the new registered agent.
 
.. code-block:: xml

  curl -k -X GET "https://localhost:55000/agents?pretty=true&offset=1&limit=2&select=status%2Cid%2Cmanager%2Cname%2Cnode_name%2Cversion&status=active" -H "Authorization: Bearer $TOKEN"
 

Wazuh enrollment method highly reduces the burden of registering new agents with the manager. Jointly with deployment using variables, this set up can be performed in only three easy steps.

This new feature will reduce the setup cost of our users, bringing short setup times to have Wazuh ready and running in their environment.

Even more, this improvement provides a recovery mechanism that will eliminate the risk of blocking the monitoring of massive agents in case the client keys get lost.
