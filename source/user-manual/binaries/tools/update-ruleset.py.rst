
.. _update-ruleset.py:

update-ruleset.sh
=================

Update decoders, rules and rootchecks.

+---------------------+----------------------------+
| Options             | Descriptions               |
+=====================+============================+
| `-r <#restart>`__   | Restart OSSEC              |
+---------------------+----------------------------+
| `-R <#norestart>`__ | Do no restart OSSEC        |
+---------------------+----------------------------+
| `-b`_               | Restore backup             |
+---------------------+----------------------------+
| `-h`_               | Display the help message   |
+---------------------+----------------------------+
| `-f`_               | Force to update            |
+---------------------+----------------------------+
| `-o`_               | Set OSSEC path             |
+---------------------+----------------------------+
| `-s`_               | Select ruleset source path |
+---------------------+----------------------------+
| `-j`_               | JSON output                |
+---------------------+----------------------------+
| `-d`_               | Debug mode                 |
+---------------------+----------------------------+


.. _restart:

``-r``
------

Restart OSSEC when required.

.. _norestart:

``-R``
------

Do not restart OSSEC when required.


``-b``
------

Restore last backup.


``-h``
------

Display the help message.

``-f``
------

Force to update the ruleset.


``-o``
------

Set OSSEC path.

.. topic:: Default

  /var/ossec


``-s``
------

Select ruleset source path (instead of download it).


``-j``
------

JSON output. It should be used with '-s' or '-S' argument.

``-d``
------

Debug mode.
