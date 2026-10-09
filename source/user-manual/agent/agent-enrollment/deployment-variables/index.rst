.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Deployment variables configure the Wazuh agent while its package is installed. Learn which variables the Wazuh agent packages read and how to pass them on Linux, Windows, and macOS.

Deployment variables
====================

Deployment variables configure the Wazuh agent while its package is installed. The enrollment token (``WAZUH_ENROLLMENT_TOKEN``) is the only variable that registers the Wazuh agent with the Wazuh manager. It carries the Wazuh manager address, the enrollment credential, and the pin of the certificate authority (CA) that the Wazuh agent trusts. The other variables set Wazuh agent options in the ``ossec.conf`` file.

The Wazuh agent packages for Linux, macOS, and Windows read the same variables. They are applied only during installation. Select your operating system to see how to pass them:

.. toctree::
   :maxdepth: 1

   Linux <deployment-variables-linux>
   Windows <deployment-variables-windows>
   macOS <deployment-variables-macos>
   installing-without-token

+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+
| Variable                      | Description                                                                           | Default                              |
+===============================+=======================================================================================+======================================+
| ``WAZUH_ENROLLMENT_TOKEN``    | The enrollment token created on the Wazuh manager with ``wazuh-manager-authd          | None. Without a token, the Wazuh     |
|                               | --create-enrollment-token``. The installer sets the Wazuh manager address from        | agent is installed but not enrolled. |
|                               | the token. On its first start, the Wazuh agent installs the CA as its trust           |                                      |
|                               | anchor, enrolls, and deletes the token. See the :doc:`Wazuh manager identity          |                                      |
|                               | verification                                                                          |                                      |
|                               | </user-manual/agent/agent-enrollment/security-options/manager-identity-verification>` |                                      |
|                               | section.                                                                              |                                      |
+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+
| ``WAZUH_AGENT_NAME``          | Sets the Wazuh agent name (``<enrollment><agent_name>``).                             | The hostname of the endpoint         |
+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+
| ``WAZUH_AGENT_GROUP``         | Assigns the Wazuh agent to one or more groups at enrollment, separated by commas      | ``default``                          |
|                               | (``<enrollment><groups>``).                                                           |                                      |
+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+
| ``WAZUH_SSL_VERIFICATION``    | Sets how the Wazuh agent verifies the Wazuh manager certificate                       | Not set. Token installations use     |
|                               | (``<ssl><verification_mode>``). Accepted values, in lowercase: ``full``,              | ``full``.                            |
|                               | ``certificate``, ``system``, ``none``. An invalid value is recorded in                |                                      |
|                               | ``ossec.log`` and ignored. A token installation already uses ``full``, so you         |                                      |
|                               | only need this variable to use ``system`` or to configure verification manually.      |                                      |
+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+
| ``WAZUH_KEEP_ALIVE_INTERVAL`` | Sets the interval, in seconds, between keep-alive messages to the Wazuh manager       | ``10``                               |
|                               | (``<notify_time>``).                                                                  |                                      |
+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+
| ``ENROLLMENT_DELAY``          | Sets the time, in seconds, the Wazuh agent waits after enrolling before               | ``20``                               |
|                               | connecting (``<delay_after_enrollment>``). The minimum value is ``1``. The            |                                      |
|                               | installer accepts ``0``, but the Wazuh agent then fails to start.                     |                                      |
+-------------------------------+---------------------------------------------------------------------------------------+--------------------------------------+

.. note::

   Create the token with the address the Wazuh agents use to reach the Wazuh manager. See the :doc:`Wazuh manager identity verification </user-manual/agent/agent-enrollment/security-options/manager-identity-verification>` section for how to create tokens and for the ``--embed-ca`` option.
