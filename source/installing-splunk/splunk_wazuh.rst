.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_wazuh:

Splunk app for Wazuh
====================

.. thumbnail:: ../images/splunk-app/general.png
  :title: Splunk app overview general tab
  :align: center
  :width: 85%

Wazuh app for Splunk offers an UI to visualize Wazuh alerts and Wazuh API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

Installation
------------

1. Download the latest Splunk app for Wazuh:

 .. code-block:: console

      curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/3.x/splunkapp/v3.7.0_7.2.0.tar.gz

2. Install the Splunk app for Wazuh:

  The app uses the ``/SplunkAppForWazuh/default/indexes.conf`` file to create an index named 'wazuh' and ``/SplunkAppForWazuh/default/inputs.conf`` file to listen to forwarded data on port 9997.

  a. CLI mode:

    .. code-block:: console

      # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz

    .. code-block:: console

      # /opt/splunk/bin/splunk restart

  b. Web GUI:

    .. code-block:: console

      Apps -> Manage apps -> Install app from file

3. Open Splunk in your desired browser and click on the Wazuh app icon:

  .. image:: ../images/splunk-app/appconf-0.png
    :align: center

4. The app will redirect you to the *Settings* tab, where you need to fill in the form with your **Wazuh API credentials**. Use the URL and port from your Wazuh API server.

  By default, the API port is ``55000``. The default username and password is ``foo:bar``.

  .. note::
    You can get more information about how to set up the credentials at :ref:`securing_api`.

  .. thumbnail:: ../images/splunk-app/appconf-1.png
    :align: center
    :title: IP Configuration
    :width: 100%

    You can check the connection by pressing 'Check connection' button on each API entry. A successful message appears in the right bottom corner:

  .. thumbnail:: ../images/splunk-app/appconf-2.png
    :align: center
    :title: Checking API connection
    :width: 100%

Now that you've finished installing Splunk app for Wazuh, you can setup forwarders following :ref:`the next page <splunk_forwarder>`.
