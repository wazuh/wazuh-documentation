.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_wazuh:

Splunk app for Wazuh
====================

Wazuh app for Splunk offers an UI to visualize Wazuh alerts and API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.


Installation
------------

1. Download the latest stable version from the Splunk app for Wazuh `repository <https://github.com/wazuh/wazuh-splunk/releases/>`_.

.. warning::

  The app currently provides an ``indexes.conf`` and an ``inputs.conf`` file which both create an index named 'wazuh' and listen for forwarded data on port 9997 on the machine where it's already installed. In the case of having an Indexer cluster, first delete `/SplunkAppForWazuh/default/indexes.conf` and `/SplunkAppForWazuh/default/inputs.conf` files, install the app on the Search Head machine and configure a 'wazuh' index following the `Splunk official docs <http://docs.splunk.com/Documentation/Splunk/7.1.0/Indexer/useforwarders>`_ .

2. Install the Wazuh app for Splunk.

  - CLI mode:

    .. code-block:: console

      $SPLUNK_HOME/bin/splunk install app SplunkAppForWazuh.tgz
      $SPLUNK_HOME/bin/splunk restart

  - Web GUI:

    .. code-block:: console

      Apps -> Manage apps -> install app from file

3. Open Splunk on your desired browser.

4. Click on the Wazuh app icon and navigate to Configuration -> API

5. Fill in the input fields with the following information:

  - URL: Wazuh API url (http(s)://<IP>).
  - Port: Wazuh API port, usually 55000.
  - User: Wazuh API credential username.
  - Password: Wazuh API credential password.

.. thumbnail:: ../../images/splunk-app/general.png
  :title: Splunk app overview general tab
  :align: center
  :width: 100%

Now that you've finished installing Splunk app for Wazuh, you can setup indexers following :ref:`the next page <splunk_index>`.