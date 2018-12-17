.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle-keypolling:

wodle name="key-polling"
==========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="key-polling">
		</wodle>

Configuration options of the key polling wodle.

Options
-------

- `enabled`_
- `timeout`_
- `exec_path`_
- `socket`_
- `threads`_
- `queue_size`_

+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `enabled`_           | yes, no                     |
+----------------------+-----------------------------+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+
| `exec_path`_         | Full path to executable     |
+----------------------+-----------------------------+
| `socket`_            | Full path to unix socket    |
+----------------------+-----------------------------+
| `threads`_           | A positive number           |
+----------------------+-----------------------------+
| `queue_size`_        | A positive number           |
+----------------------+-----------------------------+


enabled
^^^^^^^

Enable the key polling wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

timeout
^^^^^^^

Maximum time for waiting a response from the executable.

+--------------------+------------------------------+
| **Default value**  | 60                           |
+--------------------+------------------------------+
| **Allowed values** | A positive number in seconds |
+--------------------+------------------------------+

exec_path
^^^^^^^^^

Full path to the executable.

+--------------------+-----------------------------------+
| **Default value**  | none                              |
+--------------------+-----------------------------------+
| **Allowed values** | A string indicating the full path |
+--------------------+-----------------------------------+

socket
^^^^^^

Full path to the unix domain socket.

+--------------------+-----------------------------------------------------------+
| **Default value**  | none                                                      |
+--------------------+-----------------------------------------------------------+
| **Allowed values** | A string indicating the full path to a unix domain socket |
+--------------------+-----------------------------------------------------------+

threads
^^^^^^^

Number of threads for polling external keys.

+--------------------+------------------------------------------------------------+
| **Default value**  | 1                                                          |
+--------------------+------------------------------------------------------------+
| **Allowed values** | A positive number indicating the number of threads [1..32] |
+--------------------+------------------------------------------------------------+

queue_size
^^^^^^^^^^

Indicates the maximum size of the queue for polling external keys.

+--------------------+------------------------------------------------------------+
| **Default value**  | 1024                                                       |
+--------------------+------------------------------------------------------------+
| **Allowed values** | A positive number indicating the queue size [1024..220000] |
+--------------------+------------------------------------------------------------+

Example of configuration
------------------------

.. code-block:: xml

	<wodle name="key-polling">
		<enabled>yes</enabled>
		<timeout>60</timeout>
		<exec_path>/usr/bin/python /home/script.py</exec_path>
		<threads>1</threads>
		<queue_size>1024</queue_size>
  	</wodle>
