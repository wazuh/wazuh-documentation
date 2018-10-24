.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_basic:

Install Splunk in single-instance mode
======================================

This document will guide you through the installation process for a single-instance distributed architecture, recommended for testing and evaluation purposes, or also for small-medium sized environments.

.. note::
  Many of the commands described below need to be executed with root user privileges.

.. warning::
  This documentation will install Splunk using the single-instance deployment schema. If you want a more advanced installation, check out the :ref:`multi-instance <splunk_distributed>` deployment schema.

Install the Splunk Indexer
--------------------------

This component works receiving the data flow streamed by a forwarder and stores it in a Splunk index.

1. Download Splunk v7.2.0 package from `its official website <https://www.splunk.com/en_us/download/partners/splunk-enterprise.html>`_.

  .. note::
    Splunk is not open source software and it requires a registered user and license to work. You can also use a free trial license.

2. Install the Splunk v7.2.0 package:

  a) For RPM based distributions:

  .. code-block:: console

    # yum install splunk-enterprise-package.rpm

  b) For Debian/Ubuntu distributions:

  .. code-block:: console

    # dpkg --install splunk-enterprise-package.deb

3. Ensure Splunk v7.2.0 is installed in ``/opt/splunk`` and start the service:

  .. code-block:: console

    # /opt/splunk/bin/splunk start

  .. note::
    You will be prompted for a password for the ``admin`` user.

  After this step the Splunk Web service will be listening to port 8000. You can browse ``http://<your-instance-ip>:8000`` in order to access the Web GUI.

4. Optional. If you additionally want the Splunk service to start at boot time, please execute the following command:

  .. code-block:: console

    # /opt/splunk/bin/splunk enable boot-start

.. _splunk_basic_forwarder:

Install the Splunk Forwarder
----------------------------

A Forwarder is required in order to send alerts to the Indexer. This component will be installed in the **Wazuh manager instance**.

1. Download Splunk Forwarder v7.2.0 package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.

2. Install it with the following commands depending on your operating system:

  a) For **RPM based** distributions:

  .. code-block:: console

    # yum install splunkforwarder-package.rpm

  b) For **DEB based** distributions:

  .. code-block:: console

    # dpkg --install splunkforwarder-package.deb

3. Ensure Splunk Forwarder v7.2.0 is installed in ``/opt/splunkforwarder``.

You can find useful Splunk CLI commands in the `official documentation <http://docs.splunk.com/Documentation/Splunk/7.2.0/Admin/CLIadmincommands>`_ .

Now that you've finished installing Splunk on a single-instance mode, you can proceed with the next step and install the :ref:`Wazuh app for Splunk <splunk_wazuh>`.
