Uninstalling the Wazuh Docker deployment
=========================================

Follow these steps to uninstall your Wazuh Docker deployment from your Docker host:

#. Navigate to the directory of your deployment model.

#. Stop the stack:

   .. code-block:: console

      # docker compose down

   This command stops all running containers and removes them, but preserves your data volumes and configuration files.

#. **Optional**: Delete persistent volumes.

   -  List all volumes first to confirm what you want to delete:

      .. code-block:: console

         # docker volume ls

   -  If you created custom volumes for logs, configuration, or data, remove them manually:

      .. code-block:: console

         # docker volume rm <VOLUME_ID>

   -  Replace ``<VOLUME_ID>`` with the volume name(s) you want to delete.

#. You can also perform steps 2 and 3 in a single command.

   .. warning::

      The **-v** flag will permanently delete all your Wazuh data, configurations, and logs. Use this only when you want to remove the deployment and start fresh completely.

   -  Run the following to stop the stack and immediately remove all associated volumes:

      .. code-block:: console

         # docker compose down -v
