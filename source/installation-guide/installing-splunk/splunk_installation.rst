.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_installation:

Splunk installation
===================

You can install Splunk and the Splunk Forwarder for RPM and DEB systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Splunk Enterprise installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download any desired Splunk Enterprise package from `it's official website <https://www.splunk.com/en_us/download/partners/splunk-enterprise.html>`_.
Then install it with the following command depending on your operating system:

a) For RPM based distributions:

.. code-block:: console

  # yum install splunk-enterprise-package.rpm

b) For Debian/Ubuntu distributions:

.. code-block:: console

  # dpkg --install splunk-enterprise-package.deb

Upon completion, ensure Splunk forwarder is already installed in ``/opt/splunk``

Splunk Forwarder installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can download any desired Splunk Forwarder package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.
Then proceed to install it with the following command depending on your operating system:

a) For RPM based distributions:

.. code-block:: console

  # yum install splunkforwarder-package.rpm

b) For Debian/Ubuntu distributions:

.. code-block:: console

  # dpkg --install splunkforwarder-package.deb

Upon completion, ensure Splunk is already installed in ``/opt/splunkforwarder``.

Additionally, useful Splunk CLI commands can be found in the `Splunk official documentation <http://docs.splunk.com/Documentation/Splunk/7.1.0/Admin/CLIadmincommands>`_ .

Now that you've finished installing Splunk Enterprise, you can proceed with the :ref:`Splunk app for Wazuh <splunk_wazuh>` installation.
