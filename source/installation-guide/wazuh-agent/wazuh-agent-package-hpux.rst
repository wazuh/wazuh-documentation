.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on HP-UX systems in this section of our Installation Guide.

Deploying Wazuh agents on HP-UX endpoints
=========================================

The installed agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

.. note:: You need root user privileges to run all the commands described below.

#. To start the installation process, download the `HP-UX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/hp-ux/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar.gz>`_.

#. Create the ``wazuh`` user and group.

   .. code-block:: console

       # groupadd wazuh
       # useradd -G wazuh wazuh

#. Decompress the package in ``/``.

   .. code-block:: console

       # gzip -d wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar.gz
       # tar -xvf wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar

#. Edit the ``/var/ossec/etc/ossec.conf`` file and replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address of the Wazuh manager:

   .. code-block:: xml
      :emphasize-lines: 3

      <client>
        <server>
          <address><WAZUH_MANAGER_IP_ADDRESS></address>
        </server>
      </client>

   To learn more about this enrollment method, see the :doc:`Linux/Unix agent enrollment via agent configuration </user-manual/agent/agent-enrollment/enrollment-methods/via-agent-configuration/linux-endpoint>` section.

#. Start the Wazuh agent to complete the installation process:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control start

The installation process is now complete and the Wazuh agent is now successfully running on your HP-UX endpoint.
