.. _reference_ossec_agentless:

Agentless
=========

.. topic:: XML section name

	.. code-block:: xml

		<agentless>

Agentless monitoring allows you to run integrity checking on systems without an agent installed.

+--------------+----------------------------------------------------------------+
| Options      | Allowed values                                                 |
+==============+================================================================+
| `type`_      | type of agentless device to check                              |
+--------------+----------------------------------------------------------------+
| `frequency`_ | A positive number (seconds)                                    |
+--------------+----------------------------------------------------------------+
| `host`_      | Any username and host in the format: user@hostname             |
+--------------+----------------------------------------------------------------+
| `state`_     | periodic or periodic_diff                                      |
+--------------+----------------------------------------------------------------+
| `arguments`_ | One or more filenames or directories                           |
+--------------+----------------------------------------------------------------+

``type``
------------

There are several possible types of agentless devices that can be checked, including:

* ssh_integrity_check_bsd
* ssh_integrity_check_linux
* ssh_generic_diff
* ssh_pixconfig_diff

The first two types require a list of directories in <arguments>.  Wazuh will file integrity scan the files in those directories and alert if they have changed.  With **ssh_generic_diff** you supply an <arguments> value that consists of a set of commands to run.  Their output is then processed, looking for changes or rule matches.  Lastly, the **ssh_pixconfig_diff** type is specifically for checking if the config of a Cisco PIX/router changes.  It takes no <arguments> value.


``frequency``
-------------

This controls the number of seconds between each check of the agentless device.


.. topic:: Default value

    n/a

.. topic:: Allowed values

	An integer in seconds


``host``
--------

This defines the username and the name of the agentless host.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	Any username and host (user@hostname)


``state``
---------

This determines whether the check type is periodic or periodic_diff.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	periodic
		The output from each agentless check is analyzed with the Wazuh ruleset as if it were a monitored log.  For example, you might query a firewall for failover state and expect an alert if the output contains a string indicating a failover has occurred. 
	periodic_diff
		The output from each agentless check is compared to the output of the previous run, and changes are alerted on, similar to file integrity monitoring.  For example, you might dump the config of a router and expect to be alerted if the config has changed since the last check.

``arguments``
-------------

This defines the arguments passed to the agentless check

.. topic:: Default value

    n/a

.. topic:: Allowed values

	This is a space-delimited list of files or directories to be monitored.
