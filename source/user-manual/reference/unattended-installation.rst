.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to automate a Wazuh installation from source by predefining the installer variables in the preloaded-vars.conf file, and check the supported variables.

.. _unattended-installation:

Unattended installation
=======================

The unattended installation saves time when installing Wazuh from source with the ``install.sh`` script. Instead of answering the installer prompts, you predefine the installation variables in the ``preloaded-vars.conf`` file, located in the ``etc/`` directory of the source tree, and ``install.sh`` reads it at startup. Uncomment the lines for the variables you want to automate and set their values. A variable that is not set takes its default value where one exists; otherwise the installer still asks for it.

To run an unattended installation, edit ``etc/preloaded-vars.conf`` in the extracted source directory and then run the installer from that directory:

.. code-block:: console

   # sudo ./install.sh

-  :ref:`Global <unattended_installation_global>`
-  :ref:`Agent <unattended_installation_agent>`
-  :ref:`Manager <unattended_installation_manager>`
-  :ref:`Manager remote listeners (WAZUH_REMOTE\_\*) <unattended_installation_remote_listeners>`

.. _unattended_installation_global:

Global
------

The following variables apply to agent installations only and have no effect on a manager installation: USER_ENABLE_ACTIVE_RESPONSE, USER_ENABLE_SYSCHECK, USER_ENABLE_ROOTCHECK, USER_ENABLE_SYSCOLLECTOR, USER_ENABLE_SCA and USER_CA_STORE.

+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| Variable                        | Description                                                      | Default                      | Allowed values                           |
+=================================+==================================================================+==============================+==========================================+
| ``USER_LANGUAGE``               | Language of the installer messages and prompts. An invalid value | en                           | en, br, cn, de, el, es, fr, hu, it, jp,  |
|                                 | falls back to English. The yes/no answers in the other variables |                              | nl, pl, ru, sr, tr                       |
|                                 | must be given in the same language (for example s and n for es;  |                              |                                          |
|                                 | y is rejected).                                                  |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_INSTALL_TYPE``           | Role of the Wazuh instance being installed.                      | Not set (the installer asks) | agent, manager                           |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_DIR``                    | Location where Wazuh is installed.                               | /var/wazuh-manager for a     | Any absolute path                        |
|                                 |                                                                  | manager; /var/ossec for an   |                                          |
|                                 |                                                                  | agent                        |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_DELETE_DIR``             | If set to y, an existing installation directory is removed       | Not set (the installer asks) | y, n                                     |
|                                 | before installing. If it is not set and the directory exists,    |                              |                                          |
|                                 | the installer asks, and the prompt defaults to n (the existing   |                              |                                          |
|                                 | files are kept and the installer continues over them).           |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_ENABLE_ACTIVE_RESPONSE`` | If set to n, Active Response is disabled (disabled is set to yes | y                            | y, n                                     |
|                                 | in the active-response section of ossec.conf).                   |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_ENABLE_SYSCHECK``        | Enables or disables the File integrity monitoring module         | y (agent installations only) | y, n                                     |
|                                 | (syscheck). If set to n, disabled is set to yes in the syscheck  |                              |                                          |
|                                 | section of ossec.conf.                                           |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_ENABLE_ROOTCHECK``       | Enables or disables rootcheck. If set to n, disabled is set to   | y (agent installations only) | y, n                                     |
|                                 | yes in the rootcheck section of ossec.conf.                      |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_ENABLE_SYSCOLLECTOR``    | Enables or disables the Syscollector module. If set to n, the    | y (agent installations only) | y, n                                     |
|                                 | syscollector section is omitted from ossec.conf.                 |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_ENABLE_SCA``             | Enables or disables the Security configuration assessment        | y (agent installations only) | y, n                                     |
|                                 | module. If set to n, the sca section is omitted from ossec.conf. |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_UPDATE``                 | If set to y, an existing installation is updated. If set to n,   | Not set (the installer asks) | y, n                                     |
|                                 | the installer exits without modifying the current installation.  |                              |                                          |
|                                 | Ignored when USER_CLEANINSTALL is y. The installer finds an      |                              |                                          |
|                                 | existing installation through its registered service, so this    |                              |                                          |
|                                 | variable has no effect on an installation that was made with     |                              |                                          |
|                                 | USER_REGISTER_SERVICE="n".                                       |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_CLEANINSTALL``           | If set to y, forces a clean installation. If the target          | n                            | y, n                                     |
|                                 | directory already exists, USER_DELETE_DIR must be set to y or n: |                              |                                          |
|                                 | with n the installer stops with "Refusing overlay installation", |                              |                                          |
|                                 | and if it is not set the installer stops with an invalid-value   |                              |                                          |
|                                 | error.                                                           |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_BINARYINSTALL``          | If set, the installer does not compile the code and installs the | Not set (the installer asks) | Any non-empty value, for example y       |
|                                 | prebuilt artifacts already present in the source tree instead.   |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_REGISTER_SERVICE``       | If set to n, the installer does not touch the boot integration   | y                            | y, n                                     |
|                                 | (systemd unit or init script) and does not start anything at the |                              |                                          |
|                                 | end of the installation. Use it for throwaway installations into |                              |                                          |
|                                 | a sandbox directory; start Wazuh manually with the control       |                              |                                          |
|                                 | script in the installation directory (bin/wazuh-manager-control  |                              |                                          |
|                                 | for a manager, bin/wazuh-control for an agent).                  |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_TAKEOVER_SERVICE``       | By default, if an existing service definition already registers  | n                            | y, n                                     |
|                                 | a different installation directory, the installer completes the  |                              |                                          |
|                                 | installation, leaves the service definition unchanged and prints |                              |                                          |
|                                 | a warning. If set to y, the service is repointed to USER_DIR.    |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_RESOLVE_CREDENTIALS``    | If set to n, the installer does not resolve any credential: no   | y                            | y, n                                     |
|                                 | Server API password is seeded, no indexer credential is stored   |                              |                                          |
|                                 | and no TLS certificate is issued, so the manager does not start  |                              |                                          |
|                                 | until they are provisioned manually. Use it when the             |                              |                                          |
|                                 | installation stages a tree that is copied elsewhere, such as a   |                              |                                          |
|                                 | package build or a container image layer, so that generated      |                              |                                          |
|                                 | credentials are not identical on every host. With the default,   |                              |                                          |
|                                 | the installer issues the certificates and the Server API         |                              |                                          |
|                                 | password at installation time.                                   |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``USER_CA_STORE``               | Custom location of the certificates used to verify incoming WPK  | n                            | n, or the path to an X509 certificate or |
|                                 | packages for remote upgrades. The location is added as an extra  |                              | to a directory containing certificates   |
|                                 | ca_store entry next to the built-in etc/wpk_root.pem, which is   |                              |                                          |
|                                 | always kept.                                                     |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+
| ``OPTIMIZE_CPYTHON``            | Enables all Python optimizations when building the CPython       | Not set (no optimizations)   | y                                        |
|                                 | interpreter. This can take a while.                              |                              |                                          |
+---------------------------------+------------------------------------------------------------------+------------------------------+------------------------------------------+

.. _unattended_installation_agent:

Agent
-----

+-------------------------------+------------------------------------------------------------+------------------------------+---------------------------------------+
| Variable                      | Description                                                | Default                      | Allowed values                        |
+===============================+============================================================+==============================+=======================================+
| ``USER_AGENT_MANAGER_IP``     | IP address of the Wazuh manager. Use only one of           | Not set (the installer asks) | A valid IP address                    |
|                               | USER_AGENT_MANAGER_IP and USER_AGENT_MANAGER_NAME.         |                              |                                       |
+-------------------------------+------------------------------------------------------------+------------------------------+---------------------------------------+
| ``USER_AGENT_MANAGER_NAME``   | Hostname of the Wazuh manager. Use only one of             | Not set (the installer asks) | A valid hostname                      |
|                               | USER_AGENT_MANAGER_IP and USER_AGENT_MANAGER_NAME.         |                              |                                       |
+-------------------------------+------------------------------------------------------------+------------------------------+---------------------------------------+
| ``USER_AGENT_CONFIG_PROFILE`` | Name of the agent configuration profile, used to apply the | Not set                      | Any string, for example LinuxDBServer |
|                               | matching agent.conf profiles to this agent.                |                              |                                       |
+-------------------------------+------------------------------------------------------------+------------------------------+---------------------------------------+

Example:

.. code-block:: ini

   USER_LANGUAGE="en"
   USER_INSTALL_TYPE="agent"
   USER_DIR="/var/ossec"
   USER_ENABLE_SYSCHECK="y"
   USER_ENABLE_ROOTCHECK="y"
   USER_ENABLE_SYSCOLLECTOR="y"
   USER_ENABLE_SCA="y"
   USER_ENABLE_ACTIVE_RESPONSE="y"
   USER_AGENT_MANAGER_IP="10.0.0.2"

.. _unattended_installation_manager:

Manager
-------

+-----------------------+-----------------------------------------------------------------+---------+----------------+
| Variable              | Description                                                     | Default | Allowed values |
+=======================+=================================================================+=========+================+
| ``USER_AUTO_START``   | If set to y, Wazuh is started at the end of the installation.   | n       | y, n           |
|                       | Used for manager installations only; agent installations ignore |         |                |
|                       | it.                                                             |         |                |
+-----------------------+-----------------------------------------------------------------+---------+----------------+
| ``USER_ENABLE_AUTHD`` | Enables or disables the agent enrollment (Auth) service.        | y       | y, n           |
+-----------------------+-----------------------------------------------------------------+---------+----------------+

.. note::

   By default, the installer issues the TLS certificates (``/etc/wazuh-manager/certs/remoted.pem``, ``remoted-key.pem``, ``root-ca.pem`` and the indexer connector pair) and generates the Server API password, which it saves in ``/etc/wazuh/credentials.env`` (readable by root only). The manager does not start until it also has an indexer credential: set WAZUH_INDEXER_MANAGER_PASSWORD in that file, or install wazuh-indexer on the same host first. To provide your own certificates, set USER_RESOLVE_CREDENTIALS="n" and place them in ``/etc/wazuh-manager/certs`` before starting the manager.

Example:

.. code-block:: ini

   USER_LANGUAGE="en"
   USER_INSTALL_TYPE="manager"
   USER_DIR="/var/wazuh-manager"
   USER_ENABLE_ACTIVE_RESPONSE="y"
   USER_ENABLE_AUTHD="y"
   USER_AUTO_START="y"
   USER_REGISTER_SERVICE="y"

.. _unattended_installation_remote_listeners:

Manager remote listeners (WAZUH_REMOTE\_\*)
-------------------------------------------

The WAZUH_REMOTE\_\* variables customize the remote block of the generated ``wazuh-manager.conf``. They apply to manager installations only. The same variables are honored by the DEB and RPM manager packages when they are exported at installation time. The installer validates them and stops with an error if a value is invalid, for example, a port outside 1-65535 or a certificate without its key.

The certificate, key, and CA paths must be absolute paths in ``/etc/wazuh-manager/certs``.

The options most often changed at installation time are:

+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| Variable                           | Description                                                      | Default                                  | Allowed values     |
+====================================+==================================================================+==========================================+====================+
| ``WAZUH_REMOTE_HTTPS_PORT``        | Port of the HTTPS listener used by 5.0 agents for enrollment and | 1517                                     | 1-65535            |
|                                    | communication.                                                   |                                          |                    |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| ``WAZUH_REMOTE_HTTPS_BIND_ADDR``   | Address the HTTPS listener binds to. 127.0.0.1 only accepts      | 0.0.0.0                                  | A valid IP address |
|                                    | local connections.                                               |                                          |                    |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| ``WAZUH_REMOTE_HTTPS_CERTIFICATE`` | Listener certificate, an absolute path in                        | /etc/wazuh-manager/certs/remoted.pem     | A path             |
|                                    | /etc/wazuh-manager/certs. When set, WAZUH_REMOTE_HTTPS_KEY is    |                                          |                    |
|                                    | also required.                                                   |                                          |                    |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| ``WAZUH_REMOTE_HTTPS_KEY``         | Listener private key, an absolute path in                        | /etc/wazuh-manager/certs/remoted-key.pem | A path             |
|                                    | /etc/wazuh-manager/certs. When set,                              |                                          |                    |
|                                    | WAZUH_REMOTE_HTTPS_CERTIFICATE is also required.                 |                                          |                    |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| ``WAZUH_REMOTE_LEGACY_ENABLED``    | Enables the legacy listener used by 4.x agents. Set it to no to  | yes                                      | yes, no            |
|                                    | disable that listener.                                           |                                          |                    |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| ``WAZUH_REMOTE_LEGACY_PORT``       | Port of the legacy listener.                                     | 1514                                     | 1-65535            |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+
| ``WAZUH_REMOTE_LEGACY_LOCAL_IP``   | Address the legacy listener binds to. 127.0.0.1 only accepts     | 0.0.0.0                                  | A valid IP address |
|                                    | local connections.                                               |                                          |                    |
+------------------------------------+------------------------------------------------------------------+------------------------------------------+--------------------+

Every other option of the remote block can be set the same way, using WAZUH_REMOTE\_ followed by the section (HTTPS\_, LEGACY\_ or AGENTS\_) and the option name in capitals. See the remote section of the Wazuh manager configuration reference for all the options.

.. note::

   To automate deployments from DEB, RPM, Windows (MSI), and macOS packages instead of building from source, use the deployment variables of each package type. See the Wazuh agent installation guide.
