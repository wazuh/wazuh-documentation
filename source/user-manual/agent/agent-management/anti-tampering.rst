.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The anti-tampering feature prevents unauthorized removal of the Wazuh agent from monitored endpoints. Learn more in this section of the documentation.

Anti-tampering
==============

Anti-tampering prevents unauthorized users from uninstalling the Wazuh agent from Linux endpoints. When anti-tampering is enabled, the endpoint must validate the uninstall request with the Wazuh manager before the package manager removes the Wazuh agent.

.. note::

   Anti-tampering is supported only on Linux endpoints.

Enable anti-tampering
---------------------

There are two methods to enable anti-tampering on Wazuh agents:

-  **Centralized configuration**: Enable anti-tampering remotely from the Wazuh manager for multiple agents.
-  **Local configuration**: Enable anti-tampering directly on a monitored Linux endpoint from the Wazuh agent local configuration.

Enable anti-tampering via centralized configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use centralized agent configuration to enable anti-tampering on multiple agents. The agent configuration file for each agent group is located at ``/etc/wazuh-manager/shared/<AGENT_GROUP_NAME>/agent.conf`` on the Wazuh manager.

For example, add the following to the ``/etc/wazuh-manager/shared/default/agent.conf`` file on the Wazuh manager to enable anti-tampering for all Linux endpoints in the ``default`` group:

.. code-block:: xml

   <agent_config os="linux">
     <!-- Enables validation requirement to uninstall Wazuh agent package -->
     <anti_tampering>
       <package_uninstallation>yes</package_uninstallation>
     </anti_tampering>
   </agent_config>

Once the agent group configuration file is saved, the Wazuh manager will automatically distribute the updated configuration to all Linux agents in the ``default`` group.

Enable anti-tampering via local configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the monitored Linux endpoint to enable the Wazuh agent anti-tampering feature:

#. Append the following configuration block to the Wazuh agent ``/var/ossec/etc/ossec.conf`` file to enable anti-tampering:

   .. code-block:: xml

      <ossec_config>
        <!-- Enables validation requirement to uninstall Wazuh agent package -->
        <anti_tampering>
          <package_uninstallation>yes</package_uninstallation>
        </anti_tampering>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

After completing these steps, the anti-tampering feature will be active.

.. _uninstalling_an_agent_with_anti_tampering_enabled:

Uninstall the Wazuh agent with anti-tampering enabled
-----------------------------------------------------

To remove a Wazuh agent with anti-tampering enabled, first :ref:`configure agent authentication <configuring_agent_authentication>`, then :ref:`uninstall the agent <uninstalling_the_wazuh_agent>`.

.. _configuring_agent_authentication:

Configure agent authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can authenticate the agent removal using any of the following methods:

#. :ref:`Temporary authentication token <temporary_authentication_token>` (recommended): More secure as it avoids storing the Wazuh manager API username and password on the monitored endpoint.
#. :ref:`Stored Wazuh manager API credentials <stored_wazuh_server_API_credentials>`: Requires storing the Wazuh manager API username and password on the monitored endpoint.

After the Quickstart, and after an offline all-in-one installation with the installation assistant, the Wazuh manager API listens only on ``127.0.0.1`` and ``::1``, so the Wazuh agent can't reach it. Before you uninstall with validation, set ``host`` in ``/var/wazuh-manager/api/configuration/api.yaml`` on the Wazuh manager master node to an address the Wazuh agents can reach, for example ``host: ['0.0.0.0', '::']``, and run ``systemctl restart wazuh-manager``. Allow port 55000/TCP only from trusted endpoints.

The uninstall reads ``/var/ossec/etc/uninstall_validation.env`` only if it is a regular file, not a link, owned by ``root``, and only ``root`` can write it. Otherwise it logs the following line and uses the ``VALIDATION_*`` environment variables instead. Both methods below set the owner and permissions after creating the file.

.. code-block:: none
   :class: output

   WARNING: /var/ossec/etc/uninstall_validation.env is not a regular file owned by root and writable only by it; ignoring it and using environment variables.

With ``VALIDATION_SSL_VERIFY="true"``, or when the variable isn't set, the Wazuh agent checks the Wazuh manager API certificate against the system trust store of the endpoint before it sends the token or the credentials. ``VALIDATION_HOST`` must use a name or IP address in the Wazuh manager API certificate. To add the Wazuh manager CA to that store, copy ``/etc/wazuh-manager/export/ca.pem`` from the Wazuh manager master node to the endpoint, then run the commands for its distribution:

-  Debian-based endpoints:

   .. code-block:: console

      # cp ca.pem /usr/local/share/ca-certificates/wazuh-manager-ca.crt
      # update-ca-certificates

-  Red Hat-based endpoints:

   .. code-block:: console

      # cp ca.pem /etc/pki/ca-trust/source/anchors/wazuh-manager-ca.pem
      # update-ca-trust

-  SUSE endpoints:

   .. code-block:: console

      # cp ca.pem /etc/pki/trust/anchors/wazuh-manager-ca.pem
      # update-ca-certificates

.. warning::

   ``VALIDATION_SSL_VERIFY="false"`` skips the check, so the token or the credentials go to any host that answers at ``VALIDATION_HOST``. Use it only for tests.

.. _temporary_authentication_token:

Temporary authentication token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to generate an authentication token on a trusted administrator endpoint and then copy it to the monitored endpoint.

#. Run the following command on any Linux endpoint to generate a temporary authentication token. Replace ``<WAZUH_MANAGER_API_USER>``, ``<WAZUH_MANAGER_API_PASSWORD>``, and ``<WAZUH_MANAGER_ADDRESS>`` with your Wazuh manager API username, password, and IP address or FQDN, respectively:

   .. code-block:: console

      # TOKEN=$(curl -u <WAZUH_MANAGER_API_USER>:<WAZUH_MANAGER_API_PASSWORD> -k -X POST "https://<WAZUH_MANAGER_ADDRESS>:55000/security/user/authenticate?raw=true")

#. View the generated authentication token:

   .. code-block:: console

      # echo $TOKEN

   Copy the token, as you will use it to authenticate when removing agents. You can reuse the same token for multiple agents until it expires, 900 seconds (15 minutes) after you generate it by default. Generate it right before you uninstall the Wazuh agents.

#. Create the file ``/var/ossec/etc/uninstall_validation.env`` on the monitored endpoint you want to remove the Wazuh agent from and add the following content to it:

   .. code-block:: bash

      #!/bin/sh

      export VALIDATION_TOKEN="<AUTHENTICATION_TOKEN>"
      export VALIDATION_HOST="<WAZUH_MANAGER_ADDRESS>:55000"
      export VALIDATION_SSL_VERIFY="true"

   Replace ``<AUTHENTICATION_TOKEN>`` with the authentication token you generated earlier, and ``<WAZUH_MANAGER_ADDRESS>`` with the Wazuh manager IP address or FQDN.

#. Make ``root`` the owner and the only user who can write the file:

   .. code-block:: console

      # chown root:root /var/ossec/etc/uninstall_validation.env
      # chmod 600 /var/ossec/etc/uninstall_validation.env

You can now proceed to :ref:`uninstall the Wazuh agent <uninstalling_the_wazuh_agent>`.

.. _stored_wazuh_server_API_credentials:

Stored Wazuh manager API credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To authenticate the agent with this method, you need to add the Wazuh manager API credentials directly to the monitored endpoint.

Create the file ``/var/ossec/etc/uninstall_validation.env`` on the monitored endpoint you want to remove the Wazuh agent from and add the following content to it:

.. code-block:: bash

   #!/bin/sh

   export VALIDATION_LOGIN="<WAZUH_MANAGER_API_USER>:<WAZUH_MANAGER_API_PASSWORD>"
   export VALIDATION_HOST="<WAZUH_MANAGER_ADDRESS>:55000"
   export VALIDATION_SSL_VERIFY="true"

Replace ``<WAZUH_MANAGER_API_USER>`` and ``<WAZUH_MANAGER_API_PASSWORD>`` with your Wazuh manager API username and password, respectively. Also, replace ``<WAZUH_MANAGER_ADDRESS>`` with the Wazuh manager IP address or FQDN.

Then make ``root`` the owner and the only user who can write the file:

.. code-block:: console

   # chown root:root /var/ossec/etc/uninstall_validation.env
   # chmod 600 /var/ossec/etc/uninstall_validation.env

You can now proceed to :ref:`uninstall the Wazuh agent <uninstalling_the_wazuh_agent>`.

.. _uninstalling_the_wazuh_agent:

Uninstall the Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the endpoint you want to remove the agent from:

#. Disable the Wazuh agent service.

   .. include:: /_templates/installations/wazuh/common/disable_wazuh_agent_service.rst

#. Remove the Wazuh agent installation.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Run the following command to remove all files.

         .. code-block:: console

            # apt-get remove --purge wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # yum remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Delete the ``/var/ossec/`` folder to remove all files completely.

      .. group-tab:: DNF

         .. code-block:: console

            # dnf remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Delete the ``/var/ossec/`` folder to remove all files completely.

      .. group-tab:: ZYpp

         .. code-block:: console

            # zypper remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Delete the ``/var/ossec/`` folder to remove all files completely.

   After removing the package, delete the validation file, as it contains the Wazuh manager API token or credentials:

   .. code-block:: console

      # rm -f /var/ossec/etc/uninstall_validation.env

The Wazuh agent is now completely removed from your Linux endpoint.

Troubleshooting agent removal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you encounter issues while uninstalling the Wazuh agent, review the following common errors and their solutions.

Error: Validation host not provided
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The uninstallation process cannot proceed because the required validation host information is missing. This typically occurs when the uninstallation validation environment file (``/var/ossec/etc/uninstall_validation.env``) is not set up, or when the uninstall ignores it.

Log output from failed removal of the Wazuh agent:

.. code-block:: none

   INFO: Uninstall configuration file not found, using environment variables.
   ERROR: Validation host not provided. Uninstallation cannot be continued.

To resolve this, ensure that the required environment file ``/var/ossec/etc/uninstall_validation.env`` is created and properly configured before attempting the removal.

If the log shows the following line instead of the ``INFO`` line, the file exists but the uninstall ignored it:

.. code-block:: none

   WARNING: /var/ossec/etc/uninstall_validation.env is not a regular file owned by root and writable only by it; ignoring it and using environment variables.

Replace a link with the file itself, and make ``root`` the owner and the only user who can write it:

.. code-block:: console

   # chown root:root /var/ossec/etc/uninstall_validation.env
   # chmod 600 /var/ossec/etc/uninstall_validation.env

Error: Uninstallation not authorized
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Wazuh manager rejects the uninstallation request due to invalid API credentials.

Log output from failed removal of the Wazuh agent:

.. code-block:: none

   2026/06/26 14:27:18 wazuh-agentd: ERROR: (4116): Unexpected status code in Wazuh agent package uninstallation request: 401
   ERROR: Uninstallation not authorized, aborting...

Verify that the correct API credentials are used in the environment file.
