.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_installation:

Splunk installation
===================

This document will guide you through the simple distributed architecture installation process according to the :ref:`previous page <installation_splunk>` schema.

.. note:: Many of the commands described below need to be executed with root user privileges.

Splunk Indexer installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This component works receiving the data flow streamed by a Forwarder and stores it in a Splunk index.

1. Download Splunk v7.1.0 package from `its official website <https://www.splunk.com/en_us/download/partners/splunk-enterprise.html>`_.

  .. note:: Splunk is not open source software and it requires a registered user and license to work. You can also use a free trial license.

2. Install the Splunk v7.1.0 package:

  a) For RPM based distributions:

  .. code-block:: console

    # yum install splunk-enterprise-package.rpm

  b) For Debian/Ubuntu distributions:

  .. code-block:: console

    # dpkg --install splunk-enterprise-package.deb

3. Ensure Splunk v7.1.0 is installed in ``/opt/splunk`` and start the service:

  .. code-block:: console

    # /opt/splunk/bin/splunk start

  .. note:: You will be prompted for a password for the 'admin' user.

  After this step the Splunk Web service will be listening to port 8000. You can browse http://<your-instance-ip>:8000 in order to access the Web GUI.

4. Optional. If you additionally want Splunk service to start at boot time, please execute the following command:

  .. code-block:: console

    # /opt/splunk/bin/splunk enable boot-start

Splunk Forwarder installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A Forwarder is required in order to send alerts to the Indexer. This component will be installed in the manager instance.

1. Download Splunk Forwarder v7.1.0 package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.

2. Install it with the following command depending on your operating system:

  a) For RPM based distributions:

  .. code-block:: console

    # yum install splunkforwarder-package.rpm

  b) For Debian/Ubuntu distributions:

  .. code-block:: console

    # dpkg --install splunkforwarder-package.deb

3. Ensure Splunk Forwarder v7.1.0 is installed in ``/opt/splunkforwarder``.

Useful Splunk CLI commands can be found in the `Splunk official documentation <http://docs.splunk.com/Documentation/Splunk/7.1.0/Admin/CLIadmincommands>`_ .

Now that you've finished installing Splunk, you can proceed with the :ref:`Splunk app for Wazuh <splunk_wazuh>` installation.
