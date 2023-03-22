.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on HP-UX systems in this section of our Installation Guide.

.. _wazuh_agent_package_hpux:

Installing Wazuh agents on HP-UX endpoints
==========================================

The installed agent runs on the endpoint you want to monitor and communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated channel.

.. note:: You need root user privileges to run all the commands described below.

#. To start the installation process, download the `HP-UX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/hp-ux/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_. 

#. Create the ``wazuh`` user and group.
   
   .. code-block:: console
   
       # groupadd wazuh
       # useradd -G wazuh wazuh
   
#. Uncompress the package in ``/``.

   .. code-block:: console
   
       # tar -xvf wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar


The installation process is now complete, and the Wazuh agent is successfully installed on your HP-UX endpoint. The next step is to register and configure the agent to communicate with the Wazuh server. To perform this action, see the :doc:`Linux/Unix agent enrollment via agent configuration </user-manual/agent-enrollment/via-agent-configuration/linux-endpoint>` section. To learn more about agent enrollment, visit :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>`.

Uninstall a Wazuh agent
-----------------------

To uninstall the agent, follow these steps: 

1. Stop the Wazuh agent service.

    .. code-block:: console

      # /var/ossec/bin/wazuh-control stop

2. Delete ``wazuh`` user and group:

    .. code-block:: console

        # groupdel wazuh
        # userdel wazuh

3. Remove Wazuh files.

    .. code-block:: console

      # rm -rf /var/ossec

The Wazuh agent is now completely removed from your HP-UX endpoint.