.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==============================


AIX agent can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create user and group OSSEC:

.. code-block:: console

    # mkgroup ossec
    # useradd -G ossec ossec

Unzip the package in ``/``:

* Installing in AIX 5.3

.. code-block:: console

    # tar -xvf wazuh-agent_v3.1.0-aix5.3.tar.gz -C /


* Installing in AIX 7

.. code-block:: console

    # tar -xvf wazuh-agent_v3.1.0-aix7.1.tar.gz -C /

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
