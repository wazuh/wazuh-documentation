.. _reference_internal_options:

Internal options
===================

Advanced configuration features are located within the */var/ossec/etc/internal_options.conf* file.

It will be overwritten during an upgrade, you must use */var/ossec/etc/local_internal_options.conf* in case you want modify any feature.

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
