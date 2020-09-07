.. Copyright (C) 2020 Wazuh, Inc.

.. _agent-upgrade-module:

Agent upgrade module
====================

The agent upgrade module is responsible for carrying out the entire agent upgrade process remotely:

- On the manager side, it validates, downloads and/or sends the WPK files to the agents.
- On the agent side, it processes the received commands and sends a notification to the manager after an upgrade process has been accomplished.

The following is a description of how the agent upgrade module works.


Upgrade request [API/CLI]
-------------------------

The agent upgrade module will receive the upgrade requests from a socket located at:

.. code-block:: none

    {WAZUH_DIR}/queue/tasks/upgrade

The module expects 3 parameters:

+-------------+----------------------------------------------+-------------------------------------------------------------------+
| Option      | Values                                       | Description                                                       |
+=============+==============================================+===================================================================+
| **command** | upgrade, upgrade_custom                      | Specifies the command to be executed                              |
+-------------+----------------------------------------------+-------------------------------------------------------------------+
| **agents**  | Array of int values (id of the agents)       | Specifies the list of agents where the command will be applied    |
+-------------+----------------------------------------------+-------------------------------------------------------------------+
| **params**  | List of parameters for the specified command | List of parameters containing information required by the command |
+-------------+----------------------------------------------+-------------------------------------------------------------------+

1.  **Upgrade parameters**: Command to upgrade agents from a repository.

    +-------------------+--------+----------+------------------------------+----------------------------------------------------------------------------------+
    | Option            | Values | Required | Default                      | Description                                                                      |
    +===================+========+==========+==============================+==================================================================================+
    | **wpk_repo**      | string | no       | ``<wpk_repo>`` configuration | Parameter to override the default WPK repository set by configuration            |
    +-------------------+--------+----------+------------------------------+----------------------------------------------------------------------------------+
    | **version**       | vX.Y.Z | no       | Last available version       | Overrides the version of the package that will be downloaded from the repository |
    +-------------------+--------+----------+------------------------------+----------------------------------------------------------------------------------+
    | **use_http**      | 0, 1   | no       | 0                            | Wheter retrieve the WPK file over http or https                                  |
    +-------------------+--------+----------+------------------------------+----------------------------------------------------------------------------------+
    | **force_upgrade** | 0, 1   | no       | 0                            | Forces the agents to upgrade, ignoring version validations                       |
    +-------------------+--------+----------+------------------------------+----------------------------------------------------------------------------------+

    Example message:

    .. code-block:: json
        :class: output

        {
            "command": "upgrade",
            "agents": [5,6],
            "params": {
                "wpk_repo": "packages.wazuh.com/wpk/",
                "version": "v4.0.0",
                "use_http": 0,
                "force_upgrade": 0
            }
        }

2. **Upgrade custom parameters**: Command to upgrade agents from a local WPK file.

    .. note:: In case of having a multi-node Wazuh cluster, the custom WPK file has to exist on all nodes in the specified path.

    +---------------+--------+----------+-----------------------------------------------------+----------------------------------------+
    | Option        | Values | Required | Default                                             | Description                            |
    +===============+========+==========+=====================================================+========================================+
    | **file_path** | string | yes      |                                                     | Path to the WPK file that will be sent |
    +---------------+--------+----------+-----------------------------------------------------+----------------------------------------+
    | **installer** | string | no       | ``upgrade.sh`` in Linux, ``upgrade.bat`` in Windows | Override the default installer script  |
    +---------------+--------+----------+-----------------------------------------------------+----------------------------------------+

    Example message:

    .. code-block:: json
        :class: output

        {
            "command": "upgrade_custom",
            "agents": [20,23],
            "params": {
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

The module expects an array of requests with 3 parameters each one:

+-------------+-----------------------------+-------------------------------------------------------+
| Option      | Values                      | Description                                           |
+=============+=============================+=======================================================+
| **module**  | api (only value allowed)    | Emmiter of the request                                |
+-------------+-----------------------------+-------------------------------------------------------+
| **command** | upgrade_result              | Command to execute on the task manager                |
+-------------+-----------------------------+-------------------------------------------------------+
| **agent**   | int value (id of the agent) | Specifies the agent where the command will be applied |
+-------------+-----------------------------+-------------------------------------------------------+

Example message:

.. code-block:: json
    :class: output

    [{
        "module": "api",
        "command": "upgrade_result",
        "agent": 5
    },{
        "module": "api",
        "command": "upgrade_result",
        "agent": 10
    }]

The response will contain all the information related to the upgrade task stored in the tasks DB:

+-----------------+--------------------------------------------+----------------------------------------------------------+
| Option          | Values                                     | Description                                              |
+=================+============================================+==========================================================+
| **error**       | int value                                  | Error code: 0 when success, a positive number when error |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **data**        | string                                     | String associated to the error code                      |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **module**      | upgrade_module                             | Emmiter of the task retrieved                            |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **command**     | upgrade, upgrade_custom                    | Command executed by the task retrieved                   |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **agent**       | int value (id of the agent)                | Id of the agent where the task retrieved was executed    |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **task_id**     | int value (id of the task)                 | Id of the task retrieved                                 |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **create_time** | timestamp                                  | Creation time of the task retrieved (UTC)                |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **update_time** | timestamp                                  | Last update time of the task retrieved (UTC)             |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **status**      | Updating, Updated, Error, Timeout, Legacy  | Current status of the task retrieved                     |
+-----------------+--------------------------------------------+----------------------------------------------------------+
| **error_msg**   | string                                     | String associated to the status when the status is Error |
+-----------------+--------------------------------------------+----------------------------------------------------------+

.. note:: The legacy status is used to indicate that the upgrade is to an old version where the agent does not report the result of the task. The result of these tasks must be checked manually.

Example response:

.. code-block:: json
    :class: output

    [{
        "error": 0,
        "data": "Success",
        "module": "upgrade_module",
        "command": "upgrade",
        "agent": 5,
        "task_id": 15,
        "create_time": "2020/08/11 00:05:18",
        "update_time": "0",
        "status": "Updating"
    },{
        "error": 0,
        "data": "Success",
        "module": "upgrade_module",
        "command": "upgrade",
        "agent": 10,
        "task_id": 16,
        "create_time": "2020/08/11 00:05:30",
        "update_time": "2020/08/11 00:05:52",
        "status": "Error",
        "error_msg": "SHA1 verification error"
    }]
