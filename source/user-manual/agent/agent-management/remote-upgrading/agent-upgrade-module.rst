.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The agent upgrade module is responsible for remotely carrying out the agent upgrade process. Learn more in this section of the documentation.

Agent upgrade module
====================

The agent upgrade module is responsible for remotely carrying out the agent upgrade process.

-  On the Wazuh manager side, it validates, downloads, and/or sends the WPK files to the Wazuh agents.
-  On the Wazuh agent side, it processes the received commands and notifies the Wazuh manager after an upgrade process has been accomplished.

The following is a description of how the agent upgrade module works.

Upgrade request [API/CLI]
-------------------------

The agent upgrade module will receive the upgrade requests from a socket located at:

.. code-block:: none

   {WAZUH_DIR}/queue/tasks/upgrade

The module expects three parameters:

+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+
| Option          | Suboption  | Values                                 | Description                                                       |
+=================+============+========================================+===================================================================+
| **origin**      | **module** | API (only value allowed)               | Emitter of the request                                            |
+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+
| **command**     |            | upgrade, upgrade_custom                | Specifies the command to be executed                              |
+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+
| **parameters**  | **agents** | Array of int values (id of the agents) | Specifies the list of agents where the command will be applied    |
+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+

#. **Upgrade parameters**: Command to upgrade agents from a repository.

   +-----------------+-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
   | Option          | Suboption         | Values        | Required | Default                      | Description                                                                      |
   +=================+===================+===============+==========+==============================+==================================================================================+
   | **parameters**  | **wpk_repo**      | string        | no       | ``<wpk_repo>`` configuration | Parameter to override the default WPK repository set by configuration            |
   |                 +-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
   |                 | **version**       | vX.Y.Z        | no       | Last available version       | Overrides the version of the package that will be downloaded from the repository |
   |                 +-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
   |                 | **use_http**      | true, false   | no       | false                        | Whether retrieve the WPK file over HTTP or HTTPS                                 |
   |                 +-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
   |                 | **force_upgrade** | true, false   | no       | false                        | Forces the agents to upgrade, ignoring version validations                       |
   +-----------------+-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+

   Example message:

   .. code-block:: json
      :class: output

      {
          "origin": {
              "module": "api"
          },
          "command": "upgrade",
          "parameters": {
              "agents": [5,6],
              "wpk_repo": "packages.wazuh.com/wpk/",
              "version": "v4.2.1",
              "use_http": false,
              "force_upgrade": false
          }
      }

#. **Upgrade custom parameters**: Command to upgrade agents from a local WPK file.

   .. note::

      In a multi-node Wazuh cluster setup, the custom WPK file must exist on all Wazuh manager nodes in the specified path. Ensure the directory path remains consistent across all cluster manager nodes to deploy the custom WPK file and its contents properly.

   +-----------------+---------------+--------+----------+---------------------------------------------------------------+----------------------------------------+
   | Option          | Suboption     | Values | Required | Default                                                       | Description                            |
   +=================+===============+========+==========+===============================================================+========================================+
   | **parameters**  | **file_path** | string | yes      |                                                               | Path to the WPK file to be sent        |
   |                 +---------------+--------+----------+---------------------------------------------------------------+----------------------------------------+
   |                 | **installer** | string | no       | ``upgrade.sh`` in Linux and macOS, ``upgrade.bat`` in Windows | Overrides the default installer script |
   +-----------------+---------------+--------+----------+---------------------------------------------------------------+----------------------------------------+

   Example message:

   .. code-block:: json
      :class: output

      {
          "origin": {
              "module": "api"
          },
          "command": "upgrade_custom",
          "parameters": {
              "agents": [20,23],
              "file_path": "/home/user/agent.wpk",
              "installer": "custom-upgrade-script.sh"
          }
      }

Upgrade result request [API/CLI]
--------------------------------

The task manager informs the result of an upgrade task. It will receive the upgrade result requests from a socket located at:

.. code-block:: none

   {WAZUH_DIR}/queue/tasks/task

The module expects three parameters:

+-----------------+------------+----------------------------------------------+-------------------------------------------------------------------+
| Option          | Suboption  | Values                                       | Description                                                       |
+=================+============+==============================================+===================================================================+
| **origin**      | **module** | API (only value allowed)                     | Emitter of the request                                            |
+-----------------+------------+----------------------------------------------+-------------------------------------------------------------------+
| **command**     |            | upgrade, upgrade_custom                      | Specifies the command to be executed                              |
+-----------------+------------+----------------------------------------------+-------------------------------------------------------------------+
| **parameters**  | **agents** | Array of int values (id of the agents)       | Specifies the list of agents where the command will be applied    |
+-----------------+------------+----------------------------------------------+-------------------------------------------------------------------+

Example message:

.. code-block:: json
   :class: output

   {
       "origin": {
           "module": "api"
       },
       "command": "upgrade_result",
       "parameters": {
           "agents": [5,10]
       }
   }

The response will contain all the information related to the upgrade task stored in the tasks DB:

+-----------------+-------------------+------------------------------------------------------------------------+
| Option          | Values            | Description                                                            |
+=================+===================+========================================================================+
| **error**       | int value         | Error code: 0 when successful, a positive number when there's an error |
+-----------------+-------------------+------------------------------------------------------------------------+
| **data**        | array             | Array with the responses for each agent                                |
+-----------------+-------------------+------------------------------------------------------------------------+
| **message**     | string            | String associated to the error code                                    |
+-----------------+-------------------+------------------------------------------------------------------------+

The information for each agent will be the following:

+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| Option          | Values                                                          | Description                                                            |
+=================+=================================================================+========================================================================+
| **error**       | int value                                                       | Error code: 0 when successful, a positive number when there's an error |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **message**     | string                                                          | String associated with the error code                                  |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **node**        | string                                                          | Name of the node that executed the task retrieved                      |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **module**      | upgrade_module                                                  | Initiator of the task retrieved                                        |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **command**     | upgrade, upgrade_custom                                         | Command executed by the task retrieved                                 |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **agent**       | int value (id of the agent)                                     | Id of the agent where the task retrieved was executed                  |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **task_id**     | int value (id of the task)                                      | Id of the task retrieved                                               |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **create_time** | timestamp                                                       | Creation time of the task retrieved (UTC)                              |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **update_time** | timestamp                                                       | Last update time of the task retrieved (UTC)                           |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **status**      | In queue, Updating, Updated, Error, Cancelled, Timeout, Legacy  | The current status of the task retrieved                               |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| **error_msg**   | string                                                          | String associated to the status when the status is Error               |
+-----------------+-----------------------------------------------------------------+------------------------------------------------------------------------+

.. note::

   The legacy status is used to indicate that the upgrade is to an old version where the agent does not report the result of the task. The result of these tasks must be checked manually.

Example response:

.. code-block:: json
   :class: output

   {
   	"error": 0,
   	"data": [
       	{
           	"error": 0,
           	"message": "Success",
           	"node": "node01",
           	"module": "upgrade_module",
           	"command": "upgrade",
           	"agent": 5,
           	"task_id": 15,
           	"create_time": "2020/08/11 00:05:18",
           	"update_time": "0",
           	"status": "Updating"
       	},{
           	"error": 0,
           	"message": "Success",
           	"node": "node02",
           	"module": "upgrade_module",
           	"command": "upgrade",
           	"agent": 10,
           	"task_id": 16,
           	"create_time": "2020/08/11 00:05:30",
           	"update_time": "2020/08/11 00:05:52",
           	"status": "Error",
           	"error_msg": "SHA1 verification error"
       	}
   	],
   	"message": "Success"
   }

Refer to the :ref:`packages list <wazuh_agent_packages_list>` for a full list of the available agent packages.
