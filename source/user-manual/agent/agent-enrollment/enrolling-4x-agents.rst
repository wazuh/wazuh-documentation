.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to enroll Wazuh 4.x agents with a Wazuh 5.0 manager, including the ports they use, their configuration, and troubleshooting.

Enrolling Wazuh 4.x agents
==========================

Wazuh 5.0 managers accept Wazuh 4.x agents for compatibility. Wazuh 4.x agents enroll on 1515/TCP and connect to the Wazuh manager on 1514/TCP.

Some agent-side components are not fully supported until the agent is upgraded to Wazuh 5.0. This affects File Integrity Monitoring (FIM), Security Configuration Assessment (SCA), System Inventory, Active Response, and Vulnerability Detection.

We recommend upgrading Wazuh ``4.x`` agents to Wazuh ``5.0`` after enrollment to ensure full compatibility with Wazuh ``5.0`` functionality. For more information, see :ref:`Upgrade agents remotely <upgrade_agents_remotely>`.

Enroll through the agent configuration
--------------------------------------

Follow the steps in :doc:`Enrollment through agent configuration </user-manual/agent/agent-enrollment/enrollment-methods/via-agent-configuration/index>`, but set the Wazuh manager address and the optional enrollment parameters in the ``<client>`` section of the Wazuh agent configuration file.

On Linux/Unix endpoints, add the Wazuh manager IP address or fully qualified domain name (FQDN) to ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
         ...
       </server>
     </client>
   </ossec_config>

(Optional) Add enrollment parameters:

.. code-block:: xml
   :emphasize-lines: 5,6

   <ossec_config>
     <client>
       ...
       <enrollment>
         <agent_name>EXAMPLE_NAME</agent_name>
         <groups>GROUP1,GROUP2,GROUP3</groups>
         ...
       </enrollment>
     </client>
   </ossec_config>

On Windows endpoints, add the Wazuh manager IP address or FQDN to ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
         ...
       </server>
     </client>
   </ossec_config>

(Optional) Add enrollment parameters:

.. code-block:: xml
   :emphasize-lines: 5,6

   <ossec_config>
     <client>
       ...
       <enrollment>
         <agent_name>EXAMPLE_NAME</agent_name>
         <groups>GROUP1,GROUP2,GROUP3</groups>
         ...
       </enrollment>
     </client>
   </ossec_config>

On macOS endpoints, add the Wazuh manager IP address or FQDN to ``/Library/Ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
         ...
       </server>
     </client>
   </ossec_config>

(Optional) Add enrollment parameters:

.. code-block:: xml
   :emphasize-lines: 5,6

   <ossec_config>
     <client>
       ...
       <enrollment>
         <agent_name>EXAMPLE_NAME</agent_name>
         <groups>GROUP1,GROUP2,GROUP3</groups>
         ...
       </enrollment>
     </client>
   </ossec_config>

Import the client key
---------------------

After you import the client key as described in :doc:`Importing the client key to the Wazuh agent </user-manual/agent/agent-enrollment/enrollment-methods/via-manager-API/importing-the-key>`, add the Wazuh manager IP address or FQDN to the Wazuh agent configuration file. Replace ``<WAZUH_MANAGER_ADDRESS>`` with the Wazuh manager IP address or FQDN.

On Linux/Unix endpoints, add the following to ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 3

   <client>
     <server>
       <address><WAZUH_MANAGER_ADDRESS></address>
       ...
     </server>
   </client>

On Windows endpoints, add the following to ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 3

   <client>
     <server>
       <address><WAZUH_MANAGER_ADDRESS></address>
       ...
     </server>
   </client>

On macOS endpoints, add the following to ``/Library/Ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 3

   <client>
     <server>
       <address><WAZUH_MANAGER_ADDRESS></address>
       ...
     </server>
   </client>

Password authentication
-----------------------

Password authentication is used by Wazuh 4.x agents. Set the enrollment password as described in :doc:`Enroll Wazuh agents with password authentication </user-manual/agent/agent-enrollment/security-options/using-password-authentication>`, and add the Wazuh manager address in the ``<client>`` section of the Wazuh agent configuration file.

If the password file is not in the default location, set ``authorization_pass_path`` as that section shows. For Wazuh 4.x agents, use ``<client>`` instead of ``<agent>``.

On Linux/Unix endpoints, add the following to ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
         ...
       </server>
     </client>
   </ossec_config>

On Windows endpoints, add the following to ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
         ...
       </server>
     </client>
   </ossec_config>

On macOS endpoints, add the following to ``/Library/Ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
         ...
       </server>
     </client>
   </ossec_config>

Wazuh manager identity verification
-----------------------------------

Copy the root certificate authority ``rootCA.pem`` file to the endpoint, as described in :ref:`Wazuh manager identity verification with your own CA <manager-identity-validation>`. Then include the following in the Wazuh agent configuration file.

On Linux/Unix endpoints, include the following in ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4,7

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
       </server>
       <enrollment>
         <server_ca_path>/<PATH_TO>/rootCA.pem</server_ca_path>
       </enrollment>
     </client>
   </ossec_config>

On Windows endpoints, include the following in ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4,7

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
       </server>
       <enrollment>
         <server_ca_path>C:\<PATH_TO>\rootCA.pem</server_ca_path>
       </enrollment>
     </client>
   </ossec_config>

On macOS endpoints, include the following in ``/Library/Ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4,7

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
       </server>
       <enrollment>
         <server_ca_path>/<PATH_TO>/rootCA.pem</server_ca_path>
       </enrollment>
     </client>
   </ossec_config>

Wazuh agent identity verification
---------------------------------

``<ssl_agent_ca>`` applies only to Wazuh 4.x agents, which enroll on port 1515. On the Wazuh manager, uncomment the ``<auth><ssl_agent_ca>`` section of ``/etc/wazuh-manager/wazuh-manager.conf`` and specify the path to the ``rootCA.pem`` file:

.. code-block:: xml
   :emphasize-lines: 3

   <auth>
      ...
      <ssl_agent_ca>/etc/wazuh-manager/rootCA.pem</ssl_agent_ca>
   </auth>

For Wazuh agent verification with host validation, also add ``<ssl_verify_host>yes</ssl_verify_host>`` to the ``<auth>`` section.

Wazuh 4.x agents can have their IP address in the SAN or as the common name.

Copy the signed certificate and key to the endpoint, as described in :doc:`Wazuh agent identity verification </user-manual/agent/agent-enrollment/security-options/agent-identity-verification>`. Then include the following in the Wazuh agent configuration file.

On Linux/Unix endpoints, include the following in ``/var/ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4,7,8

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
       </server>
       <enrollment>
         <agent_certificate_path>/var/ossec/etc/sslagent.cert</agent_certificate_path>
         <agent_key_path>/var/ossec/etc/sslagent.key</agent_key_path>
       </enrollment>

     </client>
   </ossec_config>

On Windows endpoints, include the following in ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4,7,8

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
       </server>
       <enrollment>
         <agent_certificate_path>C:\<PATH_TO>\sslagent.cert</agent_certificate_path>
         <agent_key_path>C:\<PATH_TO>\sslagent.key</agent_key_path>
       </enrollment>

     </client>
   </ossec_config>

On macOS endpoints, include the following in ``/Library/Ossec/etc/ossec.conf``:

.. code-block:: xml
   :emphasize-lines: 4,7,8

   <ossec_config>
     <client>
       <server>
         <address><WAZUH_MANAGER_ADDRESS></address>
       </server>
       <enrollment>
         <agent_certificate_path>/<PATH_TO>/sslagent.cert</agent_certificate_path>
         <agent_key_path>/<PATH_TO>/sslagent.key</agent_key_path>
       </enrollment>

     </client>
   </ossec_config>

Troubleshooting Wazuh 4.x agents
--------------------------------

Verifying communication with the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 4.x agents use 1515/TCP for enrollment and 1514/TCP for agent communication. On Linux and macOS systems (with netcat installed), run the following commands. Replace ``<WAZUH_MANAGER_ADDRESS>`` with your Wazuh manager IP address or FQDN.

.. code-block:: console

   # nc -zv <WAZUH_MANAGER_ADDRESS> 1514
   # nc -zv <WAZUH_MANAGER_ADDRESS> 1515

If there is connectivity, the output should be a connection success message:

.. code-block:: none
   :class: output

   Connection to <WAZUH_MANAGER_ADDRESS> 1514 port [tcp/*] succeeded!
   Connection to <WAZUH_MANAGER_ADDRESS> 1515 port [tcp/*] succeeded!

On Windows, open a PowerShell terminal and run the following commands:

.. code-block:: pwsh-session

   > (new-object Net.Sockets.TcpClient).Connect("<WAZUH_MANAGER_ADDRESS>", 1514)
   > (new-object Net.Sockets.TcpClient).Connect("<WAZUH_MANAGER_ADDRESS>", 1515)

If there is connectivity, there is no output.

Authentication error
^^^^^^^^^^^^^^^^^^^^

**Location**: Wazuh manager log file at ``/var/wazuh-manager/logs/wazuh-manager.log``.

**Error log**:

.. code-block:: none
   :class: output

   2026/10/04 22:44:48 wazuh-manager-remoted: WARNING: (1404): Authentication error. Wrong key or corrupt payload. Message received from agent '007' at 'any'.

For the resolution, see :ref:`Authentication error <enrollment_authentication_error>`.

Invalid agent name for enrollment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Wazuh manager log**:

.. code-block:: none
   :class: output

   2026/10/27 22:41:23 wazuh-manager-authd: WARNING: Duplicate name '<AGENT_NAME>', rejecting enrollment. Agent '<ID>' can't be replaced since it is not disconnected.

For the resolution, see :ref:`Invalid agent name for enrollment <enrollment_invalid_agent_name>`. To set a unique agent name, use the ``<client><enrollment><agent_name>`` section of the Wazuh agent ``ossec.conf`` file.

Unable to read CA certificate file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Resolution**: Ensure the certificate authority file is in the location specified in the ``<server_ca_path>`` section of the Wazuh agent configuration file (``ossec.conf``).

Upgrade Wazuh 4.x agents
------------------------

Upgrade Wazuh 4.x agents as described in :doc:`Upgrading the Wazuh agent </user-manual/agent/agent-management/remote-upgrading/upgrading-agent>`. A Wazuh agent earlier than 5.0 receives the task from the Wazuh manager at a fixed interval, every 15 minutes by default, so its upgrade can start up to 15 minutes after you request it. For a Wazuh agent earlier than 5.0, ``/var/wazuh-manager/logs/wazuh-manager.log`` shows a ``legacy_task_delivery`` line when the Wazuh manager delivers the task.
