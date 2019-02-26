.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_app:

Install Wazuh app for Splunk
============================

.. thumbnail:: ../images/splunk-app/splunk-app.png
  :title: Splunk app - Overview > Security events tab
  :align: center
  :width: 90%

Wazuh app for Splunk offers a UI to visualize Wazuh alerts and Wazuh API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

Installation
------------

1. Download the latest Splunk app for Wazuh:

  .. code-block:: console

    # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/3.x/splunkapp/v3.8.2_7.2.4.tar.gz

2. Install the Splunk app for Wazuh:

  a. CLI mode:

    .. code-block:: console

      # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz

    .. code-block:: console

      # /opt/splunk/bin/splunk restart

  b. Web GUI:

    .. code-block:: none

      Apps -> Manage apps -> Install app from file

  The app includes the ``indexes.conf`` file to create Wazuh indexes and the ``inputs.conf`` file to listen to forwarded data on port 9997.

  .. warning::
    If you installed Splunk using the :ref:`distributed architecture <splunk_distributed>`, these two files are already configured on the **search peer** instances, and must be removed from the Wazuh app installation directory:

    .. code-block:: none

      # rm -rf /opt/splunk/etc/apps/SplunkAppForWazuh/default/indexes.conf
      # rm -rf /opt/splunk/etc/apps/SplunkAppForWazuh/default/inputs.conf
      # /opt/splunk/bin/splunk restart

3. Open Splunk in your desired browser and click on the Wazuh app icon:

  .. image:: ../images/splunk-app/app-icon.png
    :align: center

4. The app will redirect you to the *Settings* tab, where you need to fill in the form with your **Wazuh API credentials**. Use the URL and port from your Wazuh API server.

  By default, the API port is ``55000``. The default username and password is ``foo:bar``. It's possible to check the connection by pressing the **Check connection** button on each API entry. A successful message appears on the bottom right corner if the app can estabilish a connection.

  .. note::
    You can get more information about how to set up the credentials at :ref:`securing_api`.

  .. thumbnail:: ../images/splunk-app/app-setup.png
    :title: App initial configuration
    :align: center
    :width: 100%

Now that you've finished installing Splunk app for Wazuh, you can install and setup Splunk forwarders on the :ref:`next section <splunk_forwarder>`.
