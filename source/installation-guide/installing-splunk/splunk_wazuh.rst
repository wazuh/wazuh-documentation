.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_wazuh:

Splunk app for Wazuh
====================

Wazuh app for Splunk offers an UI to visualize Wazuh alerts and API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.


Installation
------------

1. Download the latest stable version from the Splunk app for Wazuh `repository <https://github.com/wazuh/wazuh-splunk/releases/>`_.

2. Install the Wazuh app for Splunk in your indexer or in every search head in your environment (if you have clustered indexers).

  - CLI mode:

    .. code-block:: console

      $SPLUNK_HOME/bin/splunk install app SplunkAppForWazuh.tgz

  - Web GUI:

    .. code-block:: console

      Apps -> Manage apps -> install app from file

3. This app creates a new index named **wazuh**.

4. Open Splunk on your desired browser.

5. Click on the Wazuh app icon and navigate to Configuration -> API

6. Fill in the input fields with the following information:

  - API ip: Wazuh API ip.
  - API port: Wazuh API port, usually 55000.
  - Api user: Wazuh API username.
  - Api password: Wazuh API password.
