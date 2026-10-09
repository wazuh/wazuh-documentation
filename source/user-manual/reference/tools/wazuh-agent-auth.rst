.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The wazuh-agent-auth tool enrolls a Wazuh agent with an enrollment token, enrolls it again, or refreshes its trust anchor and Wazuh manager address.

.. _wazuh_agent_auth:

wazuh-agent-auth
================

The ``wazuh-agent-auth`` tool enrolls a Wazuh agent with the Wazuh manager using an enrollment token. You can also use it to enroll an agent again, to point an agent at a Wazuh manager that rotated its certificate authority (CA) or changed its address, and to decode a token.

The tool is located at ``/var/ossec/bin/wazuh-agent-auth`` on Linux and macOS Wazuh agents.

The tool reads the token from a file or from standard input, never from the command line, because a command line is visible to other processes and is saved in the shell history. The tool never modifies or deletes the token file.

.. note::
   Stop the Wazuh agent before you run this tool, and start it again afterwards. The tool refuses to run while ``wazuh-agentd`` is running, and the Wazuh agent loads its identity only at startup.

The agent name, groups, and address registered during enrollment come from the ``<enrollment>`` block of ``/var/ossec/etc/ossec.conf``. This way, any later re-enrollment by the agent itself registers the same values.

Options
-------

+---------------------+-------------------------------------------------------------------------------------------+
| Option              | Description                                                                               |
+=====================+===========================================================================================+
| --token-file <path> | Reads the enrollment token from ``<path>``. Use ``-`` to read it from standard input.     |
+---------------------+-------------------------------------------------------------------------------------------+
| --force-enroll      | Enrolls an agent that already has a key. The agent is registered again and receives a new |
|                     | agent ID. Without this option, the tool refuses to enroll an agent that has a key in      |
|                     | ``/var/ossec/etc/client.keys``, even if the agent was removed from the Wazuh manager.     |
+---------------------+-------------------------------------------------------------------------------------------+
| --certs-only        | Installs the Wazuh manager CA certificate as the agent trust anchor, and updates the      |
|                     | configured Wazuh manager address when the token names a different one. The agent          |
|                     | registration and ID are left unchanged.                                                   |
+---------------------+-------------------------------------------------------------------------------------------+
| --show-token        | Decodes the token and prints what it carries. Nothing is written.                         |
+---------------------+-------------------------------------------------------------------------------------------+
| -n, --dry-run       | Reports what would change. Contacts nothing and writes nothing.                           |
+---------------------+-------------------------------------------------------------------------------------------+
| -d                  | Runs the tool in debug mode. Repeat the option to increase the debug level.               |
+---------------------+-------------------------------------------------------------------------------------------+
| -h, --help          | Displays the help message and exits.                                                      |
+---------------------+-------------------------------------------------------------------------------------------+

Exit codes
----------

+------+----------------------------+
| Code | Meaning                    |
+======+============================+
| 0    | Done.                      |
+------+----------------------------+
| 1    | Could not run.             |
+------+----------------------------+
| 2    | Token rejected.            |
+------+----------------------------+
| 3    | CA not established.        |
+------+----------------------------+
| 4    | Enrollment refused.        |
+------+----------------------------+
| 5    | Not committed.             |
+------+----------------------------+
| 6    | Configuration not updated. |
+------+----------------------------+

Examples
--------

Decode a token:

.. code-block:: console

   # /var/ossec/bin/wazuh-agent-auth --show-token < /root/token

The command output looks similar to this:

.. code-block:: none
   :class: output

   ver: 1
   adr: 10.0.0.10
   pin: 3e06f0c72777d43ac0c9dfe6adab8f134397959c15b04b6eb65818f69df4aaea
   credential: present

Enroll the Wazuh agent:

.. code-block:: console

   # systemctl stop wazuh-agent
   # /var/ossec/bin/wazuh-agent-auth --token-file /root/token
   # systemctl start wazuh-agent

The command output looks similar to this:

.. code-block:: none
   :class: output

   enrolled id=001 name=ubuntu-agent manager=10.0.0.10:1517
   Trust anchor installed at etc/certs/root-ca.pem.
   etc/ossec.conf now points <manager><endpoint> at '10.0.0.10'.

Check what enrolling an already enrolled agent again would change, without contacting the Wazuh manager:

.. code-block:: console

   # /var/ossec/bin/wazuh-agent-auth --token-file /root/token --force-enroll --dry-run

The command output looks similar to this:

.. code-block:: none
   :class: output

   would enroll with manager=10.0.0.10
   would REPLACE the registration id=001 with a new one
   would REPLACE the trust anchor at etc/certs/root-ca.pem
   nothing was contacted and nothing was written.

Refresh the trust anchor after the Wazuh manager rotated its CA, without enrolling again:

.. code-block:: console

   # systemctl stop wazuh-agent
   # /var/ossec/bin/wazuh-agent-auth --token-file /root/token --certs-only
   # systemctl start wazuh-agent
