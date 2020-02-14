.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-register:

Registering agents using the Wazuh API
======================================

Wazuh API allows registering the Wazuh agent by running a single request from any host. This request returns agent's registration key, which must be manually added to the agent using ``manage_agents`` program.

Registering the Agents
^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
    :maxdepth: 2

    Linux and Unix host<api/api-register-linux-unix>
    Windows host<api/api-register-windows>
    MacOS X host<api/api-register-macos>
