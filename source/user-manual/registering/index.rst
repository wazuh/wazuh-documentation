.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

In this section, the registration process is described, and more specifically the different methods that users can use to register agents in the Wazuh manager.

+----------------+---------------------------------------------------------------+
| Type           | Method                                                        |
+================+===============================================================+
| Manual method  | :ref:`using-command-line`                                     |
+----------------+---------------------------------------------------------------+
| Semi automatic | :ref:`restful-api-register`                                   |
+----------------+---------------------------------------------------------------+
|                | :ref:`simple-registration-service`                            |
|                +---------------------------------------------------------------+
| Automatic      | :ref:`password-authorization-registration-service`            |
|                +---------------------------------------------------------------+
|                | :ref:`manager-verification-registration`                      |
|                +---------------------------------------------------------------+
|                | :ref:`agent-verification-with-host-validation`                |
|                +---------------------------------------------------------------+
|                | :ref:`agent-verification-without-host-validation`             |
+----------------+---------------------------------------------------------------+

.. toctree::
    :maxdepth: 2
    :hidden:
    
    registration-process
    using-command-line
    use-registration-service
    simple-registration-method
    password-authorization-registration-service
    manager-verification/host-verification-registration
    restful-api-register