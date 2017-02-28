.. _reference_internal_options:

Internal options
===================

The main configuration is located in the *ossec.conf* file, however some internal configuration features are located in the ``/var/ossec/etc/internal_options.conf`` file.

Generally, this file is reserved for debugging issues and for troubleshooting.

.. warning::
    Any error in this file may cause your installation to malfunction or fail to run.

.. warning::
    This file will be overwritten during upgrades.  In order to maintain custom changes, you must use the ``/var/ossec/etc/local_internal_options.conf`` file.

.. topic:: Sections

	.. toctree::
		:maxdepth: 1

		agent
		analysisd
		dbd
		logcollector
		maild
		monitord
		remoted
		syscheck
		wazuh_database
		wazuh_modules
		windows
