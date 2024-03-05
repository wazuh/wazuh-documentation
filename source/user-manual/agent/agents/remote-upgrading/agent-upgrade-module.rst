.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the agent upgrade module of Wazuh, responsible for carrying out the entire agent upgrade process remotely. 
  
.. _agent-upgrade-module:

Agent upgrade module
====================

The agent upgrade module is responsible for carrying out the entire agent upgrade process remotely:

- On the manager side, it validates, downloads, and/or sends the WPK files to the agents.
- On the agent side, it processes the received commands and sends a notification to the manager after an upgrade process has been accomplished.

The following is a description of how the agent upgrade module works.


Upgrade request [API/CLI]
-------------------------

The agent upgrade module will receive the upgrade requests from a socket located at:

.. code-block:: none

    {WAZUH_DIR}/queue/tasks/upgrade

The module expects 3 parameters:

+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+
| Option          | Suboption  | Values                                 | Description                                                       |
+=================+============+========================================+===================================================================+
| **origin**      | **module** | api (only value allowed)               | Emiter of the request                                             |
+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+
| **command**     |            | upgrade, upgrade_custom                | Specifies the command to be executed                              |
+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+
| **parameters**  | **agents** | Array of int values (id of the agents) | Specifies the list of agents where the command will be applied    |
+-----------------+------------+----------------------------------------+-------------------------------------------------------------------+

1.  **Upgrade parameters**: Command to upgrade agents from a repository.

    +-----------------+-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
    | Option          | Suboption         | Values        | Required | Default                      | Description                                                                      |
    +=================+===================+===============+==========+==============================+==================================================================================+
    | **parameters**  | **wpk_repo**      | string        | no       | ``<wpk_repo>`` configuration | Parameter to override the default WPK repository set by configuration            |
    |                 +-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
    |                 | **version**       | vX.Y.Z        | no       | Last available version       | Overrides the version of the package that will be downloaded from the repository |
    |                 +-------------------+---------------+----------+------------------------------+----------------------------------------------------------------------------------+
    |                 | **use_http**      | true, false   | no       | false                        | Whether retrieve the WPK file over http or https                                 |
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

2. **Upgrade custom parameters**: Command to upgrade agents from a local WPK file.

    .. note:: In case of having a multi-node Wazuh cluster, the custom WPK file has to exist on all nodes in the specified path.

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

The task manager is the one that informs the result of an upgrade task. It will receive the upgrade result requests from a socket located at:

.. code-block:: none

    {WAZUH_DIR}/queue/tasks/task

.. note:: In case of having a multi-node Wazuh cluster, the task manager only runs on the master node. This request should always go to the master node.

The module expects 3 parameters:

+-----------------+------------+----------------------------------------------+-------------------------------------------------------------------+
| Option          | Suboption  | Values                                       | Description                                                       |
+=================+============+==============================================+===================================================================+
| **origin**      | **module** | api (only value allowed)                     | Emiter of the request                                             |
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

+-----------------+--------------------------------------------+----------------------------------------------------------+
| Option          | Values                                     | Description                                              |
+=================+============================================+==========================================================+
| **error**       | int value                                  | Error code: 0 when success, a positive number when error |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **data**        | array                                      | Array with the responses for each agent                  |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **message**     | string                                     | String associated to the error code                      |
+-----------------+--------------------------------------------+----------------------------------------------------------+

The information for each agent will be the following:

+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| Option          | Values                                                          | Description                                              |
+=================+=================================================================+==========================================================+
| **error**       | int value                                                       | Error code: 0 when success, a positive number when error |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **message**     | string                                                          | String associated with the error code                    |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **node**        | string                                                          | Name of the node that executed the task retrieved        |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **module**      | upgrade_module                                                  | Emiter of the task retrieved                             |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **command**     | upgrade, upgrade_custom                                         | Command executed by the task retrieved                   |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **agent**       | int value (id of the agent)                                     | Id of the agent where the task retrieved was executed    |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **task_id**     | int value (id of the task)                                      | Id of the task retrieved                                 |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **create_time** | timestamp                                                       | Creation time of the task retrieved (UTC)                |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **update_time** | timestamp                                                       | Last update time of the task retrieved (UTC)             |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **status**      | In queue, Updating, Updated, Error, Cancelled, Timeout, Legacy  | Current status of the task retrieved                     |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+
| **error_msg**   | string                                                          | String associated to the status when the status is Error |
+-----------------+-----------------------------------------------------------------+----------------------------------------------------------+

.. note:: The legacy status is used to indicate that the upgrade is to an old version where the agent does not report the result of the task. The result of these tasks must be checked manually.

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
