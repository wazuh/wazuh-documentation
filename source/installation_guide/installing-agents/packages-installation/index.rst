.. _installing_wazuh_agent:

Installation via packages
======================================

This guide describes the installation of Wazuh agents using packages.

.. warning::
	Some of the following command require to be run with **root privileges**. You may become *root* by executing one of the following command at the beginning of the session::

		$ su
		$ sudo -s

.. note::
	Some of the instructions below depend on your machine's init system. If you aren't sure about which init system you have, check it with the following command::

		$ ps -p 1

.. note::
	Before installing the components please configure your NTP to sync time.


Follow the next guides to install and configure Wazuh agent in your server:

Debian-based systems
-------------------------------------------------

.. toctree::
    :maxdepth: 1

    wazuh_agent_deb


RPM-based systems
-------------------------------------------------

.. toctree::
    :maxdepth: 1

    wazuh_agent_rpm
