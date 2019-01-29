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

    # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/3.x/splunkapp/v3.8.1_7.2.3.tar.gz

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

4. The app will redirect you to the *Settings* tab, where fill the form with your **Wazuh API credentials**. Use the URL and port from your Wazuh API server.

  By default, the API port is ``55000``. The default username and password is ``foo:bar``. It's possible to check the connection by pressing the **Check connection** button on each API entry. A successful message appears on the bottom right corner if the app can estabilish a connection.

  .. note::
    You can get more information about how to set up the credentials at :ref:`securing_api`.

  .. thumbnail:: ../images/splunk-app/app-setup.png
    :title: App initial configuration
    :align: center
    :width: 100%

Now that you've finished installing Splunk app for Wazuh, you can install and setup Splunk forwarders on the :ref:`Splunk forwarder section <splunk_forwarder>`.

Installing the Wazuh App in a Splunk cluster
--------------------------------------------

.. note::
  We can install the App in each search-head by hand, but if we have hundreds or even thousands of search-heads, it will be better to install it automatically.
  For this purpose, we are using the **deployer**, a machine that installs the App in every search-head at the same time and automatically.

After installing the App following the **Official installation guide** in our **deployer** machine, we follow this steps:

.. code-block:: console

  // Copy the app into the splunk cluster folder:
  # cp -r installation_path/SplunkAppForWazuh /opt/splunk/etc/shcluster/apps

  // Create the file that listens the outputs from the Wazuh API:
  # touch /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/outputs.conf

Then, fill the outputs.conf file wit the next lines:

.. code-block:: xml

  [indexer_discovery:cluster1]
  pass4SymmKey = changeme
  master_uri = https://<master_ip>:<management_port>

  [tcpout:cluster1_tcp]
  indexerDiscovery = cluster1

  [tcpout]
  defaultGroup = cluster1_tcp

.. note::
  We use indexerDiscovery to connect to peer nodes. Click `here <https://docs.splunk.com/Documentation/Splunk/7.1.3/Indexer/indexerdiscovery>`_ to check more info about indexerDiscovery.

.. note::
  <master_ip> references to the indexers master ip.

.. warning::
  The ``https`` is required by default and the default port is the 8089.

Apply the changes:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -target https://<NODE_IP>:<management_port> -auth <user>:<password>

Now, we should have the `/opt/splunk/etc/apps/SplunkAppForWazuh` in every **search head**.

Update the Wazuh App
--------------------

To update, we must delete the app from the deployer, and reinstall it by following the previous steps.

.. code-block:: console

  # rm -rf /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh

Then, we synchronize with the option -force and will be deleted from the search heads:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f
