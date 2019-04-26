.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

In this section, the registration process is described, and more specifically the different methods that users can use to register agents in the Wazuh manager.

+------------+-----------------------------------------------------------+
| Type       | Method                                                    |
+============+===========================================================+
| Not secure | :ref:`simple-registration-service`                        |
+------------+-----------------------------------------------------------+
| Secure     | :ref:`password-authorization-registration-service`        |
|            +-----------------------------------------------------------+
|            | Manager verification using SSL                            |
|            +-----------------------------------------------------------+
|            | Agent verification using SSL with host validation         |
|            +-----------------------------------------------------------+
|            | Agent verification using SSL  without host validation     |
+------------+-----------------------------------------------------------+


.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        registration-process
        using-command-line-linux
        using-command-line-macos
        using-command-line-windows
        using-command-line-unix
        use-registration-service
        simple-registration-method
        password-authorization-registration-service
        manager-verification/host-verification-registration
        restful-api-register

.. +------------+--------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
.. | Type       | Method                                                                                     | Description                                                                                                                 |
.. +============+============================================================================================+=============================================================================================================================+
.. | Not secure | :ref:`simple-registration-service`                                                         | The easiest method. There is no authentication or host verification.                                                        |
.. +------------+--------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
.. | Secure     | :ref:`password-authorization-registration-service`                                         | Allows agents to authenticate via a shared password. This method is easy but does not perform host validation.              |
.. |            +--------------------------------+-----------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
.. |            | `Host verification using SSL`_ | `Manager verification using SSL`_                         | The manager's certificate is signed by a CA that agents use to validate the server. This may include host checking.         |
.. |            |                                +---------------------------------+-------------------------+-----------------------------------------------------------------------------------------------------------------------------+
.. |            |                                | `Agent verification using SSL`_ | With host validation    | The same as above, but the manager verifies the agent's certificate and address. There should be one certificate per agent. |
.. |            |                                |                                 +-------------------------+-----------------------------------------------------------------------------------------------------------------------------+
.. |            |                                |                                 | Without host validation | The manager validates the agent by CA but not the host address. This method allows the use of a shared agent certificate.   |
.. +------------+--------------------------------+---------------------------------+-------------------------+-----------------------------------------------------------------------------------------------------------------------------+