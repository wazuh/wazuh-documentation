.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the logs on the Wazuh manager and Wazuh agent when enrollment fails.

Troubleshooting
===============

We recommend checking the logs on the Wazuh manager and Wazuh agent for errors when a Wazuh agent fails to enroll. The location of the Wazuh manager log file is ``/var/wazuh-manager/logs/wazuh-manager.log``. The location of the Wazuh agent log file is dependent on the operating system:

================ =================================================
Operating system Wazuh agent log file
================ =================================================
Linux/Unix       ``/var/ossec/logs/ossec.log``
macOS            ``/Library/Ossec/logs/ossec.log``
Windows 64-bit   ``C:\Program Files (x86)\ossec-agent\ossec.log``
Windows 32-bit   ``C:\Program Files\ossec-agent\ossec.log``
================ =================================================

In the list below, you can access the different cases included in this troubleshooting section:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Verifying communication with the Wazuh manager
----------------------------------------------

In some scenarios, the Wazuh agent may be unable to enroll or establish a connection with the Wazuh manager because the necessary ports on the Wazuh manager are unreachable.

The default ports on the Wazuh manager depend on the agent version:

-  **Wazuh 5.0 agents**: 1517/TCP (HTTPS) - used for both enrollment and agent communication.
-  **Wazuh 4.x agents**: 1515/TCP for enrollment and 1514/TCP for agent communication.
-  55000/TCP only if you enroll agents through the Wazuh manager API, or for agents with anti-tampering that remove themselves. Wazuh 5.x agents enroll and connect on 1517/TCP.

On Linux and macOS systems (with netcat installed) open a terminal and run the following commands. Replace ``<WAZUH_MANAGER_ADDRESS>`` with your Wazuh manager IP address or fully qualified domain name (FQDN).

For a Wazuh 5.0 agent:

.. code-block:: console

   # nc -zv <WAZUH_MANAGER_ADDRESS> 1517

For a Wazuh 4.x agent:

.. code-block:: console

   # nc -zv <WAZUH_MANAGER_ADDRESS> 1514
   # nc -zv <WAZUH_MANAGER_ADDRESS> 1515
   # nc -zv <WAZUH_MANAGER_ADDRESS> 55000

If there is connectivity, the output should be a connection success message:

For a Wazuh 5.0 agent:

.. code-block:: none
   :class: output

   Connection to <WAZUH_MANAGER_ADDRESS> 1517 port [tcp/*] succeeded!

For a Wazuh 4.x agent:

.. code-block:: none
   :class: output

   Connection to <WAZUH_MANAGER_ADDRESS> 1514 port [tcp/*] succeeded!
   Connection to <WAZUH_MANAGER_ADDRESS> 1515 port [tcp/*] succeeded!
   Connection to <WAZUH_MANAGER_ADDRESS> 55000 port [tcp/*] succeeded!

On Windows, open a PowerShell terminal and run the following commands:

For a Wazuh 5.0 agent:

.. code-block:: pwsh-session

   > (new-object Net.Sockets.TcpClient).Connect("<WAZUH_MANAGER_ADDRESS>", 1517)

For a Wazuh 4.x agent:

.. code-block:: pwsh-session

   > (new-object Net.Sockets.TcpClient).Connect("<WAZUH_MANAGER_ADDRESS>", 1514)
   > (new-object Net.Sockets.TcpClient).Connect("<WAZUH_MANAGER_ADDRESS>", 1515)
   > (new-object Net.Sockets.TcpClient).Connect("<WAZUH_MANAGER_ADDRESS>", 55000)

If there is connectivity, there is no output. Otherwise, an error is shown:

.. code-block:: none
   :class: output

   A connection attempt failed because the connected party did not properly respond after a period of time (...)

.. note::

   If ports appear reachable at the network level but the connection still fails, check whether the manager's remoted listener is bound to the loopback interface only. Both ``<remote><https><bind_addr>`` (1517) and ``<remote><legacy><local_ip>`` (1514) in ``wazuh-manager.conf`` default to ``0.0.0.0``, which accepts connections from any host. If either one is set to ``127.0.0.1``, the listener rejects connections from any other host. Set them to ``0.0.0.0`` to accept remote agents.

Authentication error
--------------------

The ``client.keys`` file stores the data used to authenticate the Wazuh agent and the Wazuh manager. The Wazuh agent may be unable to authenticate with the Wazuh manager if the ``client.keys`` on the Wazuh manager and the Wazuh agent are different.

**Location**: Wazuh manager log file at ``/var/wazuh-manager/logs/wazuh-manager.log``.

**Error log**:

.. code-block:: none
   :class: output

   2026/10/04 22:44:48 wazuh-manager-remoted: WARNING: (1404): Authentication error. Wrong key or corrupt payload. Message received from agent '007' at 'any'.

This log applies to Wazuh 4.x agents. For Wazuh 5.0 agents, the Wazuh manager logs nothing. Check the Wazuh agent log instead:

.. code-block:: none
   :class: output

   2026/10/27 22:38:31 wazuh-agentd:https-client: ERROR: https_client: the manager refused this request's credential (401, invalid_signature); keeping the current identity and retrying.

**Resolution**: Ensure that the client key on the Wazuh agent matches the key in the Wazuh manager ``client.keys`` file. You can find the ``client.keys`` key file at the following locations:

============= ====================================================
Endpoint      Location
============= ====================================================
Wazuh manager ``/etc/wazuh-manager/client.keys``
Linux/Unix    ``/var/ossec/etc/client.keys``
macOS         ``/Library/Ossec/etc/client.keys``
Windows       ``"C:\Program Files (x86)\ossec-agent\client.keys"``
============= ====================================================

Also, verify that each agent has a unique client key stored in the Wazuh manager ``/etc/wazuh-manager/client.keys`` file. Duplicate keys can arise if you previously deleted agents with the highest IDs or copied the ``client.keys`` file between agents.

Invalid agent name for enrollment
---------------------------------

Each Wazuh agent must have a unique name before successfully enrolling in the Wazuh manager. If you do not specify a Wazuh agent name during the deployment process, Wazuh will use the endpoint's hostname. If two or more endpoints have the same hostname, the Wazuh agent enrollment will not be successful.

**Location:** Wazuh agent log file

Refer to the table in the :doc:`Troubleshooting <troubleshooting>` section for the Wazuh agent log file location.

**Error log**:

.. code-block:: none
   :class: output

   2026/10/27 22:41:24 wazuh-agentd: ERROR: Enrollment rejected by the manager: duplicate agent. Duplicate name

**Wazuh manager log** (Wazuh 4.x agents only; for Wazuh 5.0 agents, the Wazuh manager logs nothing):

.. code-block:: none
   :class: output

   2026/10/27 22:41:23 wazuh-manager-authd: WARNING: Duplicate name '<AGENT_NAME>', rejecting enrollment. Agent '<ID>' can't be replaced since it is not disconnected.

**Resolution**: Ensure the Wazuh agent hostname is unique and does not match an already enrolled agent. Alternatively, specify a unique agent name in the ``<agent><enrollment><agent_name>`` section (Wazuh 5.0 agents) or ``<client><enrollment><agent_name>`` section (Wazuh 4.x agents) of the Wazuh agent ``ossec.conf`` file. You can find the ``ossec.conf`` file at the following locations:

-  Linux/Unix endpoints - ``/var/ossec/etc/ossec.conf``
-  macOS endpoint - ``/Library/Ossec/etc/ossec.conf``
-  Windows endpoints - ``C:\Program Files (x86)\ossec-agent\ossec.conf``

.. code-block:: xml
   :emphasize-lines: 4

   <agent>
        ...
        <enrollment>
            <agent_name>EXAMPLE_NAME</agent_name>
            ...
        </enrollment>
    </agent>

.. _agent_enrollment_token_refused_san:
.. _enrollment_token_refused_address_not_in_certificate_san:

Enrollment token refused: address not in certificate SAN
--------------------------------------------------------

The Wazuh manager creates an enrollment token only for an address that is a subject alternative name (SAN) of its agent listener certificate, ``/etc/wazuh-manager/certs/remoted.pem``. Wazuh agents verify the Wazuh manager against these names, so a token for any other address would fail when the Wazuh agent connects. This happens when the address is, for example, a public or NAT address, a load balancer, a DNS name that isn't in the certificate, or an IP address that changed after the certificate was issued.

**Location**: the output of the command, the Wazuh manager API response, or the Wazuh dashboard notification that creates the token.

**Error log**:

The ``wazuh-manager-authd --create-enrollment-token`` command:

.. code-block:: none
   :class: output

   ERROR 9025: Enrollment token refused: address not in certificate SAN

The Wazuh manager API, ``POST /agents/enrollment-tokens``: error ``1768``, "Enrollment token refused", with the detail ``address not in certificate SAN``.

The Wazuh dashboard:

.. code-block:: none
   :class: output

   API error: ERR_BAD_REQUEST - Enrollment token refused: address not in certificate SAN

**Resolution**: List the addresses that the certificate allows. On the Wazuh manager master node, run:

.. code-block:: console

   # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

Or query the Wazuh manager API with ``GET /cluster/<NODE_ID>/daemons/remoted/tls`` and read ``listener.sans`` in the response.

Create the token for an address in that list. A DNS name must match a DNS entry, and an IP address must match an IP Address entry. If the IP address of the Wazuh manager can change, use a DNS name.

If the Wazuh agents must use an address that isn't in the list, issue the agent listener certificate again with that address. List every address the Wazuh agents use in the same run, because the new certificate replaces the old one. See :ref:`Agent connection address <wazuh_manager_agent_connection_address>` for the installation guide methods, :ref:`Reissue the Wazuh manager certificates <vm_reissue_manager_certificates>` for the virtual machine, the ``--agent-san`` option in :doc:`Wazuh Docker deployment </deployment-options/docker/wazuh-container>` and :doc:`Kubernetes deployment </deployment-options/deploying-with-kubernetes/kubernetes-deployment>`, and the ``extra_ips`` option in :ref:`Deployment with Ansible <ansible_agent_token>`. Then create the token again.

Unable to read CA certificate file
----------------------------------

The Wazuh agent may not be able to authenticate with the Wazuh manager if the root certificate authority is missing on either the Wazuh manager or the Wazuh agent. This applies when additional security options such as :doc:`Wazuh manager identity verification <security-options/manager-identity-verification>` and :doc:`Wazuh agent identity verification <security-options/agent-identity-verification>` are used.

**Location**: Wazuh manager log file at ``/var/wazuh-manager/logs/wazuh-manager.log``.

**Error log**:

.. code-block:: none

   wazuh-manager-control: ERROR: (1244): Invalid configuration at '/auth/ssl_agent_ca': file not found: /etc/wazuh-manager/rootCA.pem (issued by the credential resolver at installation, or provisioned externally, e.g. with wazuh-certs-tool).

The same error names ``/remote/https/ca`` when the file set in ``<remote><https><ca>`` is missing. In both cases, the Wazuh manager doesn't start.

**Resolution**: Ensure the certificate authority file exists at the path set in ``<auth><ssl_agent_ca>`` and ``<remote><https><ca>`` in the Wazuh manager ``/etc/wazuh-manager/wazuh-manager.conf`` file, then restart the Wazuh manager.

**Location**: Wazuh agent log file

Refer to the table in the :doc:`Troubleshooting <troubleshooting>` section for the Wazuh agent log file location.

**Error log**:

.. code-block:: none

   2026/10/01 23:52:50 wazuh-agentd: ERROR: (4118): <ssl><verification_mode> is not 'none' but <certificate_authorities> is missing or unreadable: '/var/ossec/etc/rootCA.pem'.
   2026/10/01 23:52:50 wazuh-agentd: ERROR: (1215): No client configured. Exiting.

**Resolution**:

-  Wazuh 5.0 agents: Ensure the certificate authority file exists and is readable at the path set in ``<ssl><certificate_authorities>`` in the Wazuh agent configuration file (``ossec.conf``). If ``<certificate_authorities>`` is not set, the Wazuh agent uses the trust anchor ``etc/certs/root-ca.pem`` in its installation directory, which is installed when the Wazuh agent enrolls with an enrollment token.
-  Wazuh 4.x agents: Ensure the certificate authority file is in the location specified in the ``<server_ca_path>`` section of the Wazuh agent configuration file (``ossec.conf``).

You can find the ``ossec.conf`` file at the following locations:

-  Linux/Unix endpoints - ``/var/ossec/etc/ossec.conf``
-  macOS endpoint - ``/Library/Ossec/etc/ossec.conf``
-  Windows endpoints - ``C:\Program Files (x86)\ossec-agent\ossec.conf``

The Wazuh agent can't verify the Wazuh manager certificate
-----------------------------------------------------------

The Wazuh agent doesn't connect if the CA it trusts didn't sign the Wazuh manager certificate, for example after you replace the Wazuh manager certificate.

**Location**: Wazuh agent log file

Refer to the table in the :doc:`Troubleshooting <troubleshooting>` section for the Wazuh agent log file location.

**Error log**:

.. code-block:: none

   wazuh-agentd:https-client: WARNING: Could not verify the manager's certificate at 'https://<WAZUH_MANAGER_ADDRESS>:1517/wazuh-manager/control': (60) SSL peer certificate or SSH remote key was not OK: SSL certificate OpenSSL verify result: unable to get local issuer certificate (20)

**Resolution**: Set ``<ssl><certificate_authorities>`` in the Wazuh agent configuration file (``ossec.conf``) to the CA that signs the Wazuh manager certificate, or add that CA to the Wazuh manager CA bundle with ``wazuh-manager-certs add`` so that it's published to the Wazuh agents.

Unable to read the client certificate or key
--------------------------------------------

The Wazuh agent doesn't start if :doc:`Wazuh agent identity verification <security-options/agent-identity-verification>` is configured and the client certificate or key file is missing or unreadable.

**Location**: Wazuh agent log file

Refer to the table in the :doc:`Troubleshooting <troubleshooting>` section for the Wazuh agent log file location.

**Error log**:

.. code-block:: none

   2026/10/04 20:32:35 wazuh-agentd:https-client: ERROR: Config rejected: client certificate or key is not readable.
   2026/10/04 20:32:35 wazuh-agentd: ERROR: https_client: failed to start (configuration rejected).
   2026/10/04 20:32:35 wazuh-agentd: CRITICAL: https_client: startup failed. Exiting.

**Resolution**: Ensure that the files set in ``<ssl><certificate>`` and ``<ssl><key>`` in the Wazuh agent configuration file (``ossec.conf``) exist and are readable by the Wazuh agent. Set ``<certificate>`` and ``<key>`` together. If only one is set, the Wazuh agent logs ``Config rejected: client certificate and key must be set together.`` You can find the ``ossec.conf`` file at the following locations:

-  Linux/Unix endpoints - ``/var/ossec/etc/ossec.conf``
-  macOS endpoint - ``/Library/Ossec/etc/ossec.conf``
-  Windows endpoints - ``C:\Program Files (x86)\ossec-agent\ossec.conf``

Invalid password
----------------

If you enable :doc:`password authentication <security-options/using-password-authentication>` for agent enrollment, the Wazuh agent may not be able to authenticate with the Wazuh manager if there's an invalid or missing password.

**Location**: Wazuh agent log file

Refer to the table in the :doc:`Troubleshooting <troubleshooting>` section for the Wazuh agent log file location.

**Error log** (wrong password):

.. code-block:: none
   :class: output

   2026/10/27 22:40:14 wazuh-agentd: ERROR: Enrollment rejected by the manager: the credential's signature was refused: Invalid client authentication. This will keep failing until the credential is corrected on the manager; the agent is keeping the one it has and retrying.

**Error log** (no password file):

.. code-block:: none
   :class: output

   2026/10/27 22:40:47 wazuh-agentd: INFO: No authentication password provided
   2026/10/27 22:40:47 wazuh-agentd: INFO: Enrollment rejected by the manager: invalid_request: Invalid client authentication. Retrying.

**Resolution**:

#. Ensure the same password is used by the Wazuh manager and the Wazuh agent
#. Ensure that the ``authd.pass`` password file is in the ``/etc/wazuh-manager/`` directory of the Wazuh manager and that the ``wazuh-manager`` group can read it: ``640`` with ``root:wazuh-manager`` if you created it, or ``660`` with ``wazuh-manager:wazuh-manager`` if the Wazuh manager generated it.
#. If password authentication is not needed, it should be disabled in the ``<auth>`` section of the Wazuh manager ``/etc/wazuh-manager/wazuh-manager.conf`` file.
