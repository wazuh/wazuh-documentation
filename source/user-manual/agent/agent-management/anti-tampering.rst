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

Use centralized agent configuration to enable anti-tampering on multiple agents. The agent configuration file for each agent group is located at ``/var/wazuh-manager/etc/shared/<AGENT_GROUP_NAME>/agent.conf`` on the Wazuh manager.

For example, add the following to the ``/var/wazuh-manager/etc/shared/default/agent.conf`` file on the Wazuh manager to enable anti-tampering for all Linux endpoints in the ``default`` group:

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
#. :ref:`Stored Wazuh server API credentials <stored_wazuh_server_API_credentials>`: Requires storing the Wazuh manager API username and password on the monitored endpoint.

.. _temporary_authentication_token:

Temporary authentication token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to generate an authentication token on a trusted administrator endpoint and then copy it to the monitored endpoint.

#. Run the following command on any Linux endpoint to generate a temporary authentication token. Replace ``<WAZUH_MANAGER_API_USER>``, ``<WAZUH_MANAGER_API_PASSWORD>``, and ``<WAZUH_MANAGER_IP_ADDRESS>`` with your Wazuh manager API username, password, and IP address, respectively:

   .. code-block:: console

      # TOKEN=$(curl -u <WAZUH_MANAGER_API_USER>:<WAZUH_MANAGER_API_PASSWORD> -k -X POST "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/user/authenticate?raw=true")

#. View the generated authentication token:

   .. code-block:: console

      # echo $TOKEN

   Copy the token, as you will use it to authenticate when removing agents. You can reuse the same token for multiple agents.

#. Create the file ``/var/ossec/etc/uninstall_validation.env`` on the monitored endpoint you want to remove the Wazuh agent from and add the following content to it:

   .. code-block:: bash

      #!/bin/sh

      export VALIDATION_TOKEN="<AUTHENTICATION_TOKEN>"
      export VALIDATION_HOST="<WAZUH_MANAGER_IP_ADDRESS>:55000"
      export VALIDATION_SSL_VERIFY="false"

   Replace ``<AUTHENTICATION_TOKEN>`` with the authentication token you generated earlier, and ``<WAZUH_MANAGER_IP_ADDRESS>`` with the Wazuh manager IP address.

You can now proceed to :ref:`uninstall the Wazuh  agent <uninstalling_the_wazuh_agent>`.

.. _stored_wazuh_server_API_credentials:

Stored Wazuh manager API credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To authenticate the agent with this method, you need to add the Wazuh manager API credentials directly to the monitored endpoint.

Create the file ``/var/ossec/etc/uninstall_validation.env`` on the monitored endpoint you want to remove the Wazuh agent from and add the following content to it:

.. code-block:: bash

   #!/bin/sh

   export VALIDATION_LOGIN="<WAZUH_MANAGER_API_USER>:<WAZUH_MANAGER_API_PASSWORD>"
   export VALIDATION_HOST="<WAZUH_MANAGER_IP_ADDRESS>:55000"
   export VALIDATION_SSL_VERIFY="false"

Replace ``<WAZUH_MANAGER_API_USER>`` and ``<WAZUH_MANAGER_API_PASSWORD>`` with your Wazuh manager API username and password, respectively. Also, replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the Wazuh manager IP address.

You can now proceed to :ref:`uninstall the Wazuh  agent <uninstalling_the_wazuh_agent>`.

.. _uninstalling_the_wazuh_agent:

Uninstall the Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the endpoint you want to remove the agent from:

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

#. Disable the Wazuh agent service.

   .. include:: /_templates/installations/wazuh/common/disable_wazuh_agent_service.rst

The Wazuh agent is now completely removed from your Linux endpoint.

Troubleshooting agent removal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you encounter issues while uninstalling the Wazuh agent, review the following common errors and their solutions.

Error: Validation host not provided
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The uninstallation process cannot proceed because the required validation host information is missing. This typically occurs when the uninstallation validation environment file (``/var/ossec/etc/uninstall_validation.env``) is not set up.

Log output from failed removal of the Wazuh agent:

.. code-block:: none

   INFO: Uninstall configuration file not found, using environment variables.
   ERROR: Validation host not provided. Uninstallation cannot be continued.

To resolve this, ensure that the required environment file ``/var/ossec/etc/uninstall_validation.env`` is created and properly configured before attempting the removal.

Error: Uninstallation not authorized
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Wazuh manager rejects the uninstallation request due to invalid API credentials.

Log output from failed removal of the Wazuh agent:

.. code-block:: none

   2026/06/26 14:27:18 wazuh-agentd: INFO: (8700): Starting user validation to uninstall the Wazuh agent package.
   2026/06/26 14:27:18 wazuh-agentd: ERROR: (5362): Unexpected status code in Wazuh agent package uninstallation request: 401

   ERROR: Uninstallation not authorized, aborting...

Verify that the correct API credentials are used in the environment file.
