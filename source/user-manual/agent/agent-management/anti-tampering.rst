.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The anti-tampering feature prevents unauthorized removal of the Wazuh agent from monitored endpoints. Learn more in this section of the documentation.

Anti-tampering
==============

The anti-tampering feature prevents unauthorized removal of the Wazuh agent from monitored endpoints. When you configure this feature, users must obtain validation from the Wazuh manager before uninstalling the Wazuh agent package.

.. note::

   The anti-tampering feature is supported only on Linux endpoints.

Enabling anti-tampering
-----------------------

There are two methods to enable anti-tampering on Wazuh agents:

-  **Using centralized configuration**: Apply the setting remotely from the Wazuh manager to multiple agents.
-  **Using local configuration**: Modify the Wazuh agent local configuration on a specific monitored endpoint.

Enabling anti-tampering via centralized configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the :doc:`centralized agent configuration </user-manual/reference/centralized-configuration>` method to remotely enable the anti-tampering feature on a group of agents. The agent configuration file for each agent group is located at ``/var/ossec/etc/shared/<AGENT_GROUP_NAME>/agent.conf`` on the Wazuh manager.

For example, add the following to the ``/var/ossec/etc/shared/default/agent.conf`` file on the Wazuh manager to enable anti-tampering for all Linux endpoints in the ``default`` group:

.. code-block:: xml

   <agent_config os="linux">
     <!-- Enables validation requirement to uninstall Wazuh agent package -->
     <anti_tampering>
       <package_uninstallation>yes</package_uninstallation>
     </anti_tampering>
   </agent_config>

Once the agent group configuration file is saved, the Wazuh manager will automatically distribute the updated configuration to all Linux agents in the default group.

Enabling anti-tampering via local configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the monitored endpoint to enable the Wazuh agent anti-tampering feature:

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

Uninstalling an agent with anti-tampering enabled
-------------------------------------------------

To remove a Wazuh agent with anti-tampering enabled, you must first :ref:`configure agent authentication <configuring_agent_authentication>`, and then proceed to :ref:`uninstall the agent <uninstalling_the_wazuh_agent>`.

.. _configuring_agent_authentication:

Configuring agent authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can authenticate the agent removal using any of the following methods:

#. :ref:`Temporary authentication token <temporary_authentication_token>` (recommended): More secure as it avoids storing the Wazuh server API username and password on the monitored endpoint.

#. :ref:`Stored Wazuh server API credentials <stored_wazuh_server_API_credentials>`: Requires storing the Wazuh server API username and password on the monitored endpoint.

.. _temporary_authentication_token:

Temporary authentication token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to generate an authentication token on a trusted administrator endpoint and then copy it to the monitored endpoint.

#. Run the following command on any Linux endpoint to generate a temporary authentication token. Replace ``<WAZUH_SERVER_API_USER>``, ``<WAZUH_SERVER_API_PASSWORD>``, and ``<WAZUH_SERVER_IP_ADDRESS>`` with your Wazuh server API username, password, and IP address respectively:

   .. code-block:: console

      # TOKEN=$(curl -u <WAZUH_SERVER_API_USER>:<WAZUH_SERVER_API_PASSWORD> -k -X POST "https://<WAZUH_SERVER_IP_ADDRESS>:55000/security/user/authenticate?raw=true")

#. View the generated authentication token:

   .. code-block:: console

      # echo $TOKEN

   Copy the token, as you will use it to authenticate when removing agents. You can reuse the same token for multiple agents.

#. Create the file ``/var/ossec/etc/uninstall_validation.env`` on the monitored endpoint you want to remove the Wazuh agent from and add the following content to it:

   .. code-block:: bash

      #!/bin/sh

      export VALIDATION_TOKEN="<AUTHENTICATION_TOKEN>"
      export VALIDATION_HOST="<WAZUH_SERVER_IP_ADDRESS>:55000"
      export VALIDATION_SSL_VERIFY="false"

   Replace ``<AUTHENTICATION_TOKEN>`` with the authentication token you generated earlier, and ``<WAZUH_SERVER_IP_ADDRESS>`` with the Wazuh server IP address.

You can now proceed to :ref:`uninstall the Wazuh  agent <uninstalling_the_wazuh_agent>`.

.. _stored_wazuh_server_API_credentials:

Stored Wazuh server API credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To authenticate the agent with this method, you need to add the Wazuh server API credentials directly to the monitored endpoint.

Create the file ``/var/ossec/etc/uninstall_validation.env`` on the monitored endpoint you want to remove the Wazuh agent from and add the following content to it:

.. code-block:: bash

   #!/bin/sh

   export VALIDATION_LOGIN="<WAZUH_SERVER_API_USER>:<WAZUH_SERVER_API_PASSWORD>"
   export VALIDATION_HOST="<WAZUH_SERVER_IP_ADDRESS>:55000"
   export VALIDATION_SSL_VERIFY="false"

Replace ``<WAZUH_SERVER_API_USER>`` and ``<WAZUH_SERVER_API_PASSWORD>`` with your Wazuh server API username and password respectively. Also, replace ``<WAZUH_SERVER_IP_ADDRESS>`` with the Wazuh server IP address.

You can now proceed to :ref:`uninstall the Wazuh  agent <uninstalling_the_wazuh_agent>`.

.. _uninstalling_the_wazuh_agent:

Uninstalling the Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the endpoint you want to remove the agent from:

#. Remove the Wazuh agent installation.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Run the following command If you want to remove all files completely.


         .. code-block:: console

            # apt-get remove --purge wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # yum remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Delete the ``/var/ossec/`` folder if you want to remove all files completely.

      .. group-tab:: DNF

         .. code-block:: console

            # dnf remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Delete the ``/var/ossec/`` folder if you want to remove all files completely.

      .. group-tab:: ZYpp

         .. code-block:: console

            # zypper remove wazuh-agent

         Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Delete the ``/var/ossec/`` folder if you want to remove all files completely.

#. Disable the Wazuh agent service.

   .. include:: /_templates/installations/wazuh/common/disable_wazuh_agent_service.rst

The Wazuh agent is now completely removed from your Linux endpoint.

Troubleshooting agent removal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you encounter issues while uninstalling the Wazuh agent, review the following common errors and their solutions.

Error: Validation host not provided
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The uninstallation process cannot proceed because the required validation host information is missing. This typically happens when the uninstallation validation environment file (``/var/ossec/etc/uninstall_validation.env``) is not set up.

Log output from failed removal of the Wazuh agent:

.. code-block:: none

   INFO: Uninstall configuration file not found, using environment variables.
   ERROR: Validation host not provided. Uninstallation cannot be continued.

To resolve this, ensure that the required environment file ``/var/ossec/etc/uninstall_validation.env`` is created and properly configured before attempting the removal.

Error: Uninstallation not authorized
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Wazuh server rejects the uninstallation request due to invalid API credentials.

Log output from failed removal of the Wazuh agent:

.. code-block:: none

   2025/02/20 13:23:32 wazuh-agentd: INFO: (9500): Starting user validation to uninstall the Wazuh agent package.
   2025/02/20 13:23:32 wazuh-agentd: ERROR: (4116): Unexpected status code in Wazuh agent package uninstallation request: 401

   ERROR: Uninstallation not authorized, aborting...

Verify that the correct API credentials are used in the environment file.
