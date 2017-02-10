.. _reference_ossec_rootcheck:


Rootcheck
=========

.. topic:: XML section name

	.. code-block:: xml

		<rootcheck>

Configuration related to policy monitoring and anomalies detection.

+-----------------------+---------------------------------------------+
| Options               | Allowed values                              |
+=======================+=============================================+
| `base_directory`_     | Path to a directory                         |
+-----------------------+---------------------------------------------+
| `rootkit_files`_      | A file with the rootkit files signatures    |
+-----------------------+---------------------------------------------+
| `rootkit_trojans`_    | A file with the trojans signatures          |
+-----------------------+---------------------------------------------+
| `windows_audit`_      | n/a                                         |
+-----------------------+---------------------------------------------+
| `system_audit`_       | n/a                                         |
+-----------------------+---------------------------------------------+
| `windows_apps`_       | n/a                                         |
+-----------------------+---------------------------------------------+
| `windows_malware`_    | n/a                                         |
+-----------------------+---------------------------------------------+
| `scanall`_            | yes, no                                     |
+-----------------------+---------------------------------------------+
| `frequency`_          | A positive number (seconds)                 |
+-----------------------+---------------------------------------------+
| `disabled`_           | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_dev`_          | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_files`_        | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_if`_           | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_pids`_         | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_policy`_       | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_ports`_        | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_sys`_          | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_trojans`_      | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_unixaudit`_    | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_winapps`_      | yes, no                                     |
+-----------------------+---------------------------------------------+
| `check_winapps`_      | 1, 0                                        |
+-----------------------+---------------------------------------------+
| `check_winmalware`_   | yes, no                                     |
+-----------------------+---------------------------------------------+
| `skip_nfs`_           | yes, no                                     |
+-----------------------+---------------------------------------------+



``base_directory``
------------------

The base directory that will be appended to the following options:

rootkit_files
rootkit_trojans
windows_malware
windows_audit
windows_apps
systems_audit


.. topic:: Default value

	.. code-block:: xml

		<base_directory>/var/ossec</base_directory>

.. topic:: Allowed values

  Path to a directory

.. _reference_ossec_rootcheck_rootkit_files:

``rootkit_files``
-----------------

This option can be used to change the location of the rootkit files database


.. topic:: Default value

	.. code-block:: xml

		<rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>

.. topic:: Allowed values

  A file with the rootkit files signatures

.. _reference_ossec_rootcheck_rootkit_trojans:

``rootkit_trojans``
-------------------

This option can be used to change the location of the rootkit trojans database

.. topic:: Default value

	.. code-block:: xml

		<rootkit_files>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_files>

.. topic:: Allowed values

  A file with the trojans signatures

``windows_audit``
-----------------

.. _reference_ossec_rootcheck_audit:

``system_audit``
----------------

``windows_apps``
----------------

``windows_malware``
-------------------

``scanall``
-----------

Tells rootcheck to scan the whole system (may lead to some false positives).

.. topic:: Default value

	.. code-block:: xml

		<scanall>no</scanall>

.. topic:: Allowed values

  The options are: yes or no

.. _reference_ossec_rootcheck_frequency:

``frequency``
-------------

Frequency that the rootcheck is going to be executed (in seconds).

.. topic:: Default value

	.. code-block:: xml

		<frequency>36000</frequency>

.. topic:: Allowed values

  A positive number, time in seconds

``disabled``
------------

Disables the execution of rootcheck.


.. topic:: Default value

	.. code-block:: xml

		<disabled>no</disabled>

.. topic:: Allowed values

  The options are: yes or no

``check_dev``
-------------

Enable or disable the checking of dev

.. topic:: Default value

	.. code-block:: xml

		<check_dev>yes</check_dev>

.. topic:: Allowed values

  The options are: yes or no

``check_files``
---------------

Enable or disable the checking of files

.. topic:: Default value

	.. code-block:: xml

		<check_files>yes</check_files>

.. topic:: Allowed values

  The options are: yes or no

``check_if``
------------

Enable or disable the checking of if

.. topic:: Default value

	.. code-block:: xml

		<check_if>yes</check_if>

.. topic:: Allowed values

  The options are: yes or no

``check_pids``
--------------

Enable or disable the checking of pids

.. topic:: Default value

	.. code-block:: xml

		<check_pids>yes</check_pids>

.. topic:: Allowed values

  The options are: yes or no

``check_policy``
----------------

Enable or disable the checking of policy

.. topic:: Default value

	.. code-block:: xml

		<check_policy>yes</check_policy>

.. topic:: Allowed values

  The options are: yes or no

``check_ports``
---------------

Enable or disable the checking of network ports

.. topic:: Default value

	.. code-block:: xml

		<check_ports>yes</check_ports>

.. topic:: Allowed values

  The options are: yes or no

``check_sys``
-------------

Enable or disable the checking of sys

.. topic:: Default value

	.. code-block:: xml

		<check_sys>yes</check_sys>

.. topic:: Allowed values

  The options are: yes or no

``check_trojans``
-----------------

Enable or disable the checking of trojans

.. topic:: Default value

	.. code-block:: xml

		<check_trojans>yes</check_trojans>

.. topic:: Allowed values

  The options are: yes or no

``check_unixaudit``
-------------------

Enable or disable the checking of unixaudit

.. topic:: Default value

	.. code-block:: xml

		<check_unixaudit>yes</check_unixaudit>

.. topic:: Allowed values

  The options are: yes or no

``check_winapps``
-----------------

Enable or disable the checking of winapps

.. topic:: Default value

	.. code-block:: xml

		<check_winapps>yes</check_winapps>

.. topic:: Allowed values

  The options are: yes or no

``check_winaudit``
------------------

Enable or disable the checking of winaudit

.. topic:: Default value

	.. code-block:: xml

		<check_winapps>1</check_winapps>

.. topic:: Allowed values

  The options are: 0 or 1

``check_winmalware``
--------------------

Enable or disable the checking of Windows malware.

.. topic:: Default value

	.. code-block:: xml

		<check_winmalware>yes</check_winmalware>

.. topic:: Allowed values

  The options are: yes or no

``skip_nfs``
------------

Specifies if rootcheck should scan network mounted filesystems. Works on Linux and FreeBSD.
Currently skip_nfs will abort checks running against CIFS or NFS mounts.

.. topic:: Default value

	.. code-block:: xml

		<skip_nfs>no</skip_nfs>

.. topic:: Allowed values

 The options are: yes or no
