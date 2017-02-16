
.. _ossec-reportd:

ossec-reportd
==============

``ossec-reportd`` is a program to create reports from Wazuh alerts.
``ossec-reportd`` accepts alerts on ``stdin``, and outputs a report on ``stderr``.

.. note::
  Since ``ossec-reportd`` outputs to ``stderr`` some utilities like ``less`` will not work if you do not redirect the output.
  End the ossec-reportd with ``2>&1`` to redirect ``stderr`` to ``stdout``. ``more`` or ``less`` can be easily used after the stderr redirect.

+-----------------------------+----------------------------------------+
| Options                     | Descriptions                           |
+=============================+========================================+
| `-D <#reportd-directory>`__ | Chroot to a directory                  |
+-----------------------------+----------------------------------------+
| `-d <#reportd-debug>`__     | Run in debug mode                      |
+-----------------------------+----------------------------------------+
| `-f`_                       | Filter the results                     |
+-----------------------------+----------------------------------------+
| `-h`_                       | Display the help message               |
+-----------------------------+----------------------------------------+
| `-n`_                       | Create a description for the report    |
+-----------------------------+----------------------------------------+
| `-r`_                       | Show related entries                   |
+-----------------------------+----------------------------------------+
| `-s`_                       | Show the alerts related to the summary |
+-----------------------------+----------------------------------------+
| `-V`_                       | Version and license information        |
+-----------------------------+----------------------------------------+

.. _reportd-directory:

``-D``
------

Chroot to <dir>.

.. topic:: Arguments

  -D <dir>


.. _reportd-debug:

``-d``
------

Execute ossec-reportd in debug mode. This option can be used multiple times to increase the verbosity of the debug messages.


``-f``
------

Filter the results.

.. topic:: Arguments

  -f <filter> <value>

.. topic:: Allowed filters

  group, rule, level, location, user, srcip, filename.


``-h``
------

Display the help message


``-n``
------

Create a description for the report.

.. topic:: Arguments

  -n <string>

``-r``
------

Show related entries.

.. topic:: Arguments

   -r <filter> <value>


``-s``
------

Show the alerts related to the summary.


``-V``
------

Display OSSEC Version and license information.
