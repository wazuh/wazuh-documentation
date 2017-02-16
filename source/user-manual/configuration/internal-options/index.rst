.. _reference_internal_options:

Internal options
===================

The main configuration is located in *ossec.conf*. Although, some internal configuration features are located in ``/var/ossec/etc/internal_options.conf`` file.

Generally, this file is reserved for debugging issues and for troubleshooting you might be having.

.. warning::
    Any error in this file may cause your installation to not start or to malfunction.

.. warning::
    This file will be overwritten during an upgrade, you must use ``/var/ossec/etc/local_internal_options.conf`` in case you want to modify any feature.

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
