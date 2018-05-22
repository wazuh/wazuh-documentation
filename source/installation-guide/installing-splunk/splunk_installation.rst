.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_installation:

Splunk installation
===================

This document will guide you through the simple distributed architecture installation process according to the :ref:`previous page <installation_splunk>` schema, where an Indexer instance receives Wazuh alerts from a Forwarder machine.

.. note:: Many of the commands described below need to be executed with root user privileges.

Splunk Indexer installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This component will work receiving the data flow streamed by a Forwarder and store it in a Splunk index.


1. Download Splunk v7.1.0 package from `its official website <https://www.splunk.com/en_us/download/partners/splunk-enterprise.html>`_. 

  .. note:: As Splunk is not open source software it requires to get a license for working with it, so an enterprise license may be purchased and also a free trial license can be adquired.

2. Install the already downloaded Splunk v1.7.0 package:

  a) For RPM based distributions:

  .. code-block:: console

    # yum install splunk-enterprise-package.rpm

  b) For Debian/Ubuntu distributions:

  .. code-block:: console

    # dpkg --install splunk-enterprise-package.deb

3. Ensure Splunk v7.1.0 is already installed in ``/opt/splunk`` and start the service:

  .. code-block:: console

    # /opt/splunk/bin/splunk start

4. Optional. If you additionally want Splunk service to start at boot time, please execute the following command:

  .. code-block:: console

    # /opt/splunk/bin/splunk enable boot-start

Splunk Forwarder installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A Forwarder component is required in order to send alerts to the Indexer, so this instance will have to be installed where the Wazuh manager is.

1. Download Splunk Forwarder v7.1.0 package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.


2. Proceed to install it with the following command depending on your operating system:

  a) For RPM based distributions:

  .. code-block:: console

    # yum install splunkforwarder-package.rpm

  b) For Debian/Ubuntu distributions:

  .. code-block:: console

    # dpkg --install splunkforwarder-package.deb

3. Ensure Splunk Forwarder v7.1.0 is already installed in ``/opt/splunkforwarder``.

Useful Splunk CLI commands can be found in the `Splunk official documentation <http://docs.splunk.com/Documentation/Splunk/7.1.0/Admin/CLIadmincommands>`_ .

Now that you've finished installing Splunk, you can proceed with the :ref:`Splunk app for Wazuh <splunk_wazuh>` installation.
