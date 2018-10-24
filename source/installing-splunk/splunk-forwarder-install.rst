.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_forwarder_install:

Install the Splunk Forwarder
============================

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
