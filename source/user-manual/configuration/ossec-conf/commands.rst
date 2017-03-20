.. _reference_ossec_commands:

command
========

.. topic:: XML section name

	.. code-block:: xml

		<command>

In a command configuration section, you define a command to be used by one or more active responses. It is possible to have as many commands as needed, but each one must be in their own separate <command> section.


+--------------------+----------------------+
| Options            | Allowed values       |
+====================+======================+
| `name`_            | Any string           |
+--------------------+----------------------+
| `executable`_      | Any file name        |
+--------------------+----------------------+
| `expect`_          | srcip, username, etc |
+--------------------+----------------------+
| `timeout_allowed`_ | yes, no              |
+--------------------+----------------------+


``name``
--------

This is a descriptive name that active responses will use to refer to this command.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	Any string

.. topic:: Use

	It is required.

``executable``
--------------

This must be a file (with the execute permission set) inside ``/var/ossec/active-response/bin``.
You don’t need to provide the path.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	Any file name

.. topic:: Use

	It is required.

``expect``
----------

This is a list of zero or more names of extracted fields that are to be passed as parameters to the command. If any of the listed fields were not extracted in a certain instance, those field values would be passed as a dash (``-``) instead of as no value at all. A good example is the the firewall-block command which expects the ``srcip`` field so it knows which IP to block.  Multiple expected field names are comma separated.

.. note::

   You can specify no fields by using ``<expect></expect>``.  That is the valid setting when no options need to be passed to the active-response command.

.. topic:: Default value

 	n/a

.. topic:: Allowed values

	Names of extracted fields, like **srcip** or **username**, separated by commas if there is more than one.

.. topic:: Use

	It is required.

``timeout_allowed``
-------------------

If yes, this indicates that the command is stateful, and will be called again in a certain length of time and instructed to undo its original acton.

.. topic:: Default value

    .. code-block:: xml

        <timeout_allowed>yes</timeout_allowed>

.. topic:: Allowed values

	The options accepted are **yes** and **no**.
