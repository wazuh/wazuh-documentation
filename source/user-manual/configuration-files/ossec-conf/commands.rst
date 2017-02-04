.. _reference_ossec_commands:

Commands
========

.. topic:: XML section name

	.. code-block:: xml

		<command>

In the commands configuration you create new commands to be used as responses. It is possible to have  as many commands as it is need but each one should be inside their own ``<command>`` element.

+--------------------+-----------------+
| Options            | Allowed values  |
+====================+=================+
| `name`_            | Any string      |
+--------------------+-----------------+
| `executable`_      | Any file name   |
+--------------------+-----------------+
| `expect`_          | srcip, username |
+--------------------+-----------------+
| `timeout_allowed`_ | yes, no         |
+--------------------+-----------------+


``name``
--------

Used to link the command to the response.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	Any string

.. topic:: Use

	It is required.

``executable``
--------------

It must be a file (with exec permissions) inside ``/var/ossec/active-response/bin``.
You don’t need to provide the whole path.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	Any file name

.. topic:: Use

	It is required.

``expect``
----------

The arguments this command is expecting. If a field is not within the ``expect`` option (srcip and username) it will be
passed as a dash (``-``) instead of the actual value. For instance, if ``srcip`` is required for an active-response script to work it must
be inside of an ``expect`` option.

.. note::

   It is not reqiured to populate it. ``<expect></expect>``, is valid if no options need to be passed to the active-response script.

.. topic:: Default value

 	n/a

.. topic:: Allowed values

	The options are: srcip, username

.. topic:: Use

	It is required.

``timeout_allowed``
-------------------

Specifies if this command supports a timeout.

.. topic:: Default value

    .. code-block:: xml

        <timeout_allowed>yes</timeout_allowed>

.. topic:: Allowed values

	The options accepted are: yes, no
