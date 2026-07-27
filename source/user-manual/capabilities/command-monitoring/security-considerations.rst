.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Review best practices to reduce the risk of privilege escalation, data exposure, and unauthorized changes when using Wazuh command monitoring.

Security considerations
=========================

Monitored commands run with the privileges of the Wazuh agent, so every configured command is trusted code. The practices below reduce the risk of privilege escalation, data exposure, and unauthorized changes.

Protect script files and directories
--------------------------------------

-  Store custom scripts in directories that only the root user or an administrator can modify.
-  Remove write permissions for unprivileged users from each script and from every parent directory. A script that an unprivileged user can edit becomes a privilege escalation path.

Verify script integrity
-------------------------

The Command module compares the hash of the executed file against the values you configure and ignores the output when they don't match.

-  Set the ``verify_md5``, ``verify_sha1``, and ``verify_sha256`` options for every script the Command module runs.
-  Verification covers only the first argument of the ``command`` option. Make the script the first argument. Otherwise, the check validates the interpreter instead of the script.
-  Recompute the hashes every time you update a script.
-  Keep the ``skip_verification`` option set to ``no``.

Control remote command execution
------------------------------------

Remote command execution is disabled on the Wazuh agents for security reasons.

-  Enable ``wazuh_command.remote_commands`` only on the endpoints that need it.
-  Anyone with write access to the shared ``agent.conf`` file can run commands on every endpoint in the Wazuh agent group. Restrict access to the Wazuh manager and its configuration accordingly.
-  Disable remote command execution when you no longer need it.

Choose safe commands
----------------------

-  Use read-only commands that report state. A command that modifies the system turns a monitoring task into an administrative action.
-  Use fixed command strings. Building a command from untrusted input, such as file contents or user-supplied data, exposes the endpoint to command injection.
-  Filter the output at the source with utilities such as ``grep`` or ``awk`` to keep events small and relevant.

Limit sensitive data in command output
------------------------------------------

Wazuh stores command output in indices on the Wazuh indexer. Choose commands that report only the data you need, and exclude output that contains credentials, tokens, or personal data. Everything the command prints becomes part of the stored events.
