
.. _update-ruleset.py:

update-ruleset.sh
=================

The update-ruleset.sh program updates decoders, rules and rootchecks.

+---------------------+----------------------------+
| Options             | Descriptions               |
+=====================+============================+
| `-r <#restart>`__   | Restart Wazuh              |
+---------------------+----------------------------+
| `-R <#norestart>`__ | Do not restart Wazuh       |
+---------------------+----------------------------+
| `-b`_               | Restore backup             |
+---------------------+----------------------------+
| `-h`_               | Display help message       |
+---------------------+----------------------------+
| `-f`_               | Force to update            |
+---------------------+----------------------------+
| `-o`_               | Set Wazuh path             |
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

Restart Wazuh when needed.

.. _norestart:

``-R``
------

Do not restart Wazuh.


``-b``
------

Restore the last backup.


``-h``
------

Display the help message.

``-f``
------

Force Wazuh to update the ruleset.


``-o``
------

Set Wazuh path.

.. topic:: Default

  /var/ossec


``-s``
------

Select ruleset source path (instead of downloading it).


``-j``
------

JSON output. This option must be used in conjunction with the '-s' or '-S' options.

``-d``
------

Run in debug mode.
