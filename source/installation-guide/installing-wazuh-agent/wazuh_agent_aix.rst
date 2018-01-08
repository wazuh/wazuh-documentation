.. _wazuh_agent_aix_53:

Install Wazuh agent on AIX 5.3
==============================


AIX agent can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create user and group OSSEC:

.. code-block:: bash

    useradd ossec
    mkgroup ossec

Unzip the package in ``/``:

.. code-block:: bash

    tar -xvf wazuh-agent_v3.1.0-aix5.3.tar.gz -C /

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
