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

To guarantee the manager is available to communicate before enrolling, every time the agent requests a key will previously ping the manager to confirm it’s working. This ping isn’t encrypted, which guarantees the response from the manager even without keys.

Although this new feature eliminates the need to register agents through agent-auth, this binary is conserved, giving the user the possibility to use both registration mechanisms.


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