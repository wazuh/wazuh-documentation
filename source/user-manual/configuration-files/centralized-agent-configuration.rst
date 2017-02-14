.. _reference_agent_conf:

Centralized agent configuration
================================

Introduction
^^^^^^^^^^^^^^

Agents can be configured remotely by using the ``agent.conf`` file. Wazuh allow centralized configuration for the following capabilities:

- :ref:`File Integrity monitoring <manual_file_integrity>` (**syscheck**)
- :ref:`Rootkit detection <manual_anomalies_detection>` (**rootcheck**)
- :ref:`Log analysis <manual_log_analysis>`

After you configure the file on the manager, this will push the configuration to the agents. It can take a while for it to complete the push action to all the agents. If you restart the manager the file will be pushed much faster.

agent.conf
^^^^^^^^^^^^^^^
.. topic:: XML section name

	.. code-block:: xml

		<agent_config>
		    ...
		</agent_config>

The agent.conf is only valid on server installations.

The ``agent.conf`` exists in ``/var/ossec/etc/shared``.
It should be readable by the ossec user.

+------------+---------------------+
| Options    | Allowed values      |
+============+=====================+
| `name`_    | Any  agent name     |
+------------+---------------------+
| `os`_      | Any OS family       |
+------------+---------------------+
| `profile`_ | Any defined profile |
+------------+---------------------+


``name``
--------

This option allows you to assign the block to one particular agent.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any agent name

.. topic:: Example

	.. code-block:: xml

		<agent_config name=”agent01”>


``os``
------

This option allows you to assign the block to an operating system.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any OS family

.. topic:: Example

	.. code-block:: xml

		<agent_config os="Linux">


``profile``
-----------

This option allows you to assign a profile name to a block; so any agent configured to use the defined profile may use the block.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any defined profile

.. topic:: Example

	.. code-block:: xml

		<agent_config profile="UnixHost">
