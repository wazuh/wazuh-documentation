.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh agent's registration process provides the user with an automated mechanism to enroll agents with minimal configuration steps.

:orphan:
  
.. _agent-enrollment:

Registration using the enrollment method
========================================

Wazuh includes a registration process that provides the user with an automated mechanism to enroll agents with minimal configuration steps. This feature is available for Wazuh 4.0.0 and later.

To register an agent using the enrollment method, a manager with a valid IP address needs to be configured first. The agent then checks for the registration key in the ``client.keys`` file, and when the file is empty, it automatically requests the key from the configured manager the agent is reporting to.

In the same way, if the communication with the manager gets lost, the agent requests a new key providing a hash of the current key. However, if the hash sent by the agent matches with one of the keys registered by the manager, authd rejects the request. This function allows the recovery of agents' communication even if the manager deletes, loses, corrupts, or replaces the agents' keys file.


How it works
------------

The agent detects the need for new keys if the ``client.keys`` file is empty during the startup, or if the communication with the manager fails the number of times defined in ``<client><server><max_retries>``, 5 by default. Each time this scenario is detected, the agent requests a new key from the manager using the configuration defined in ``ossec.conf``. 

By default, the agent runs the enrollment process with the settings below:

- Same server address configured for reporting in the ``<client><server><address>`` section
- Agent name extracted from the hostname of the operating system
- Agents are included in the default group
- Registration without password nor certificate validation

Additionally, every possible configuration available as options for ``agent-auth`` binary can be set in ``ossec.conf`` under the section ``<enrollment>``. Each time an agent enrolls, it uses this configuration to request the key.

When the agent already has a key but fails to communicate with the manager several times, it requests a new key appending a hash of the actual key in the registration message. In this way, Authd can verify if the agent already has a valid key to avoid generating a new one that replaces the first one unnecessarily. Although this new feature eliminates the need to register agents through agent-auth, this binary is preserved, allowing the user to use both registration mechanisms.



Typical configurations
----------------------

- *Agent name*: The name used to register with the manager can be configured and be different from the hostname of the operating system. For doing this, ``<enrollment><agent_name>`` needs to be edited with the desired name.
- *Centralized groups*: Agents belonging to one or more groups can be set in ``<enrollment><groups>`` using a comma-separated string with all the groups where the agent belongs.
- *Password validation*: By default, the agent tries to read the password for verification from ``WAZUH_PATH/etc/authd.pass`` on Unix systems and ``WAZUH_PATH/authd.pass`` on Windows systems. As these files do not exist out of the box, the registration runs without a password. Adding this file with a password string makes the agent use it for validation. Also, the path to this file can be modified in the ``<enrollment><authorization_pass_path>`` section.
- *Manager certificate validation*: If a valid file path is defined in ``<enrollment><server_ca_path>``, the agent can only accept a key returned by a trusted manager able to identify itself with certificates that match the one located on ``server_ca_path``.
- *Agent certificate validation*: If valid file paths are defined in ``<enrollment><agent_certificate_path>`` and ``<enrollment><agent_key_path>``, the agent identifies itself with the manager using the provided certificates.

To learn more about the registration options, check the `Enrollment reference section <https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/client.html#enrollment>`_.


Other configurations
--------------------

- *Disabled*: The enrollment method can be disabled by setting ``<enrollment><enabled>`` as ``no``. This prevents any registration through the Wazuh Agent, needing the use of ``agent-auth`` as in previous versions of Wazuh.
- *Delay after enrollment*: After successful enrollment, the agent waits before communicating with the manager to guarantee synchronization between all Wazuh modules and cluster nodes. The waiting time is set to 20 seconds by default and can be modified in ``<enrollment><delay_after_enrollment>``.
- *Use source IP*: The agent can request the manager to be registered using the IP address of the connection instead of being registered with the option ``any``. This can be done by setting ``<enrollment><use_source_ip>`` as ``yes``. This option isn’t compatible with ``agent_address``.
- *Agent address*: The agent can request the manager to be registered with a specified IP address by setting ``<enrollment><agent_address>`` to any desired address. This option isn’t compatible with ``use_source_ip``.



Enrollment configuration block example
--------------------------------------

.. code-block:: xml
    :emphasize-lines: 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22    

    <client>
        <server>
        <address>192.168.119.131</address>
        <port>1514</port>
        <protocol>tcp</protocol>
        </server>
        <config-profile>ubuntu, ubuntu18, ubuntu18.04</config-profile>
        <notify_time>10</notify_time>
        <time-reconnect>60</time-reconnect>
        <auto_restart>yes</auto_restart>
        <crypto_method>aes</crypto_method>
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
    </client>
 
 
Use case example
----------------

In the following example, we show how an Ubuntu Wazuh agent can be installed, configured, and registered with some simple steps:

#. Install the Wazuh agent:

    .. code-block:: console  

          # apt-get install wazuh-agent|WAZUH_AGENT_DEB_PKG_INSTALL|


#. Edit ``/var/ossec/etc/ossec.conf`` to include the manager IP address and, optional, any desired enrollment configuration:

    .. code-block:: xml

      <client>
          <server>
          <address>192.168.119.131</address>
          <port>1514</port>
          <protocol>tcp</protocol>
          </server>
          <config-profile>ubuntu, ubuntu18, ubuntu18.04</config-profile>
          <notify_time>10</notify_time>
          <time-reconnect>60</time-reconnect>
          <auto_restart>yes</auto_restart>
          <crypto_method>aes</crypto_method>
          <enrollment>
          <agent_name>TEST_AGENT_1</agent_name>
          </enrollment>    
      </client>


#. Start the Wazuh agent:

    .. code-block:: console

          # systemctl daemon-reload
          # systemctl enable wazuh-agent
          # systemctl start wazuh-agent


After following these steps, we can see the below logs on ``/var/ossec/log/ossec.log`` confirming the enrollment was successful:

.. code-block:: none
        :class: output

        wazuh-agentd: INFO: (1410): Reading authentication keys file.
        wazuh-agentd: INFO: Using notify time: 10 and max time to reconnect: 60
        wazuh-agentd: INFO: Version detected -> Linux |ubuntu |5.3.0-28-generic |#30~18.04.1-Ubuntu SMP Fri Jan 17 06:14:09 UTC 2020 |x86_64 [Ubuntu|ubuntu: 18.04.4 LTS (Bionic Beaver)] - Wazuh v4.2.6
        wazuh-agentd: INFO: Started (pid: 8082).
        wazuh-agentd: INFO: Server IP Address: 192.168.119.131
        wazuh-agentd: INFO: Requesting a key from server: 192.168.119.131
        wazuh-agentd: INFO: No authentication password provided
        wazuh-agentd: INFO: Using agent name as: TEST_AGENT_1
        wazuh-agentd: INFO: Waiting for server reply
        wazuh-agentd: INFO: Valid key received
        wazuh-agentd: INFO: Waiting 20 seconds before server connection


And ``/var/ossec/etc/client.keys`` now contains the obtained key:

.. code-block:: console

    # 001 TEST_AGENT_1 any 5520ccc4fc68eba8d3e49337784e4853f4fce44e3778d22d51b1366e013cf4f3  


The agent can be found on the manager side and appears with ``active`` status after a few seconds. Running the following command shows the new registered agent. Change your Wazuh API credentials if necessary. 
 

.. code-block:: console

    # TOKEN=$(curl -u wazuh:wazuh -k -X POST "https://localhost:55000/security/user/authenticate?raw=true")
    # curl -k -X GET "https://localhost:55000/agents?pretty=true&offset=1&limit=2&select=status%2Cid%2Cmanager%2Cname%2Cnode_name%2Cversion&status=active" -H "Authorization: Bearer $TOKEN"

.. code-block:: none
        :class: output

        {
        "data": {
            "affected_items": [
                {
                    "name": "TEST_AGENT_1",
                    "status": "active",
                    "node_name": "node01",
                    "version": "Wazuh v4.2.6",
                    "manager": "ubuntu",
                    "id": "001"
                }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
        },
        "message": "All selected agents information was returned",
        "error": 0

Wazuh enrollment method highly reduces the burden of registering new agents with the manager. This new feature reduces the setup times for our users, allowing them to have Wazuh ready and running on their environment sooner. In addition, this improvement provides a recovery mechanism that eliminates the risk of blocking the monitoring of massive agents in case the client keys get lost.
