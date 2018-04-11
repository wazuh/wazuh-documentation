.. _splunk_installation:

Splunk installation
===================

Splunk Enterprise installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download any desired Splunk Enterprise package from `here <https://www.splunk.com/en_us/download/partners/splunk-enterprise.html>`_.
Then install it with the following command depends on your operating system:

a) For RPM based distributions: 

.. code-block:: console

  # yum install splunk-enterprise-package.rpm 

b) For Debian/Ubuntu distributions:

.. code-block:: console

  # dpkg --install splunk-enterprise-package.deb

When the installation was done, ensure that Splunk is already installed in:

.. code-block:: console

      # /opt/splunk/


Splunk Forwarder installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can download any desired Splunk Forwarder package from `the official website <https://www.splunk.com/en_us/download/universal-forwarder.html>`_.  
Then process to install it with the following command depending on your operating system:

a) For RPM based distributions: 

.. code-block:: console

  # yum install splunkforwarder-package.rpm 

b) For Debian/Ubuntu distributions:

.. code-block:: console

  # dpkg --install splunkforwarder-package.deb

When the installation was done, ensure that Splunk is already installed in:

.. code-block:: console

      # /opt/splunkforwarder/

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