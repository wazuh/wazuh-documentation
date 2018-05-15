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

Upon completion, ensure Splunk is already installed in ``/opt/splunk``

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

Upon completion, ensure Splunk is already installed in ``/opt/splunkforwarder``

Useful Splunk examples
^^^^^^^^^^^^^^^^^^^^^^

a) Start/stop/restart Splunk service:

  .. code-block:: console

    # /opt/splunk/bin/splunk start | stop | restart

b) Start Splunk service at boot time:

  .. code-block:: console

    # /opt/splunk/bin/splunk enable boot-start

c) Clean Splunk data from an index:

  .. code-block:: console

    # /opt/splunk/bin/splunk clean eventdata -index <index-name>

d) Clean data from all indexes:

  .. code-block:: console

    # /opt/splunk/bin/splunk clean eventdata

Now that you've finished installing Splunk Enterprise, you can change the index configuration :ref:`Splunk app for Wazuh <splunk_wazuh>`.
