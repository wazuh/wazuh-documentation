.. _reference_ossec_rules:


Ruleset
=======

.. topic:: XML section name

	.. code-block:: xml

		<ruleset>

Configuration for enable or disabled rules and decoders.

+----------------+------------------------------------------------+
| Options        | Allowed values                                 |
+================+================================================+
| `include`_     | Path and file name of rule to load             |
+----------------+------------------------------------------------+
| `rule`_        | Path and file name of rule to load             |
+----------------+------------------------------------------------+
| `rule_dir`_    | Path to a directory of rule files              |
+----------------+------------------------------------------------+
| `decoder`_     | Path and file name of decoder to load          |
+----------------+------------------------------------------------+
| `decoder_dir`_ | Path to a directoy of decoder files            |
+----------------+------------------------------------------------+
| `list`_        | Path to a list file to be loaded and compiled. |
+----------------+------------------------------------------------+

``include``
-----------

Load a single rule file.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Path and file name of rule to load example: rules/config.xml


``rule``
--------

Load a single rule file.

.. note::

    This is the same as include, but created to keep the syntax constant with
    other sections of the rules config.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Path and file name of rule to load example: rules/config.xml

``rule_dir``
------------

Load a directory of rules. The order of loaded files will be in alphebical order and will not load any files that have been loaded before.

.. topic:: Default value

	.. code-block:: xml

		<rule_dir>ruleset/rules</rule_dir>

.. topic:: Allowed values

	Path to a directory of rule files.

.. topic:: Attributes

	pattern
	   is a regex match string use to determine if a file needs to be loaded.


``decoder``
-----------


Load a single decoder file. The path should be relative to the install directory, typically ``/var/ossec``.

.. note::

	If no decoders are specified in ossec.conf the legacy ``etc/decoder.xml`` and
	``etc/local_decoder.xml`` are loaded

.. warning::

	If ``<decoder>`` or ``<decoder_dir>`` are used, the default decoder.xml will not be used. It must be specified explicitly.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Path and file name of decoder to load example: rules/decoder/decoder.xml

``decoder_dir``
---------------

Load a directory of decoders. The order of loaded files will be in alphebics order and will not load any files that have been loaded before.
The path should be relative to the install directory, typically ``/var/ossec``.

.. warning::

    If ``<decoder>`` or ``<decoder_dir>`` are used, the default decoder.xml will not be used. It must be specified explicitly.

.. topic:: Default value

	.. code-block:: xml

		<decoder_dir>ruleset/decoders</decoder_dir>

.. topic:: Allowed values

	Path to a directory of decoder files

.. topic:: Attributes

  pattern
    is a regex match string use to determine if a file needs to be loaded.

``list``
--------

Load a single cdb references for inclusion by other rules.

.. note::

    Due to the way cdb files are compiled using tmp files by the `ossec-makelists`
    program the file extension should not be include in this directive.  ossec's
    tools will correctly append the correct .cdb or .txt extension as needed.


.. topic:: Default value

	n/a

.. topic:: Allowed values

	Path to a list file to be loaded and compiled.

	.. code-block:: xml

		<rules>
		  <list>rules/lists/blocked_hosts</list>
		</rules>
