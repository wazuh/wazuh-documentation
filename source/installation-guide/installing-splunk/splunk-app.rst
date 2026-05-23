.. Copyright (C) 2019 Wazuh, Inc.

.. _splunk_app:

Install the Wazuh app for Splunk
================================

.. thumbnail:: ../../images/splunk-app/splunk-app.png
  :title: Splunk app - Overview > Security events tab
  :align: center
  :width: 90%

The Wazuh app for Splunk offers a UI to visualize the Wazuh alerts and the Wazuh API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

Installation
------------

#. Download the latest Wazuh app for Splunk:

    .. code-block:: console

      # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/3.x/splunkapp/wazuhapp-splunk-|WAZUH_LATEST|_|SPLUNK_LATEST|.tar.gz

#. Install the Wazuh app for Splunk:

    a. CLI mode:

      .. code-block:: console

        # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz

      .. code-block:: console

        # /opt/splunk/bin/splunk restart

    b. Web GUI:

      .. code-block:: none

        Apps -> Manage apps -> Install app from file

#. Open Splunk in your desired browser and click on the Wazuh app icon:

    .. image:: ../../images/splunk-app/app-icon.png
      :align: center

#. You will be redirected to the *Settings* tab to fill the form with the ``Wazuh API credentials``. Use the URL and port from your Wazuh API server.

    By default, the Wazuh API port is ``55000``. The default username and password is ``foo:bar``. It is possible to check the connection by pressing the *Check connection* button on each Wazuh API entry. A successful message appears on the bottom right corner if the connection is established.

    .. note::
      You can get more information about how to set up the credentials at :ref:`securing_api`.

    .. thumbnail:: ../../images/splunk-app/app-setup.png
      :title: App initial configuration
      :align: center
      :width: 100%

    If you want to add the ``Wazuh API credentials`` more quickly (for instance, for deployment purposes) you can execute the following command:

    .. code-block:: console

      # curl -X POST "http://<SPLUNK_IP>:<SPLUNK_PORT>/en-US/custom/SplunkAppForWazuh/manager/add_api?url=<WAZUH_API_URL>&portapi=<WAZUH_API_PORT>&userapi=<WAZUH_API_USERNAME>&passapi=<WAZUH_API_PASSWORD>"

    Note the following:

    - ``<SPLUNK_IP>`` is the ``hostname or IP address`` of the Splunk instance where the Wazuh app for Splunk was installed.

    - ``<SPLUNK_PORT>`` is the ``port`` of the Splunk instance where the Wazuh app for Splunk was installed. By default, it is 8000.

    - ``<WAZUH_API_URL>``, ``<WAZUH_API_PORT>``, ``<WAZUH_API_USERNAME>`` and ``<WAZUH_API_PASSWORD>`` represent the ``Wazuh API credentials`` to be stored on the Wazuh app for Splunk. Keep in mind that the Wazuh API URL must include ``http://`` or ``https://``, depending on the current configuration.


When the Wazuh app for Splunk is installed, the next step consists on installing and configuring :ref:`Splunk forwarder <splunk_forwarder>`.

Installing the Wazuh app for Splunk in a Splunk cluster
-------------------------------------------------------

.. note::
  We can install the Wazuh app for Splunk in each search-head manually, but in case of having hundreds or even thousands of search-heads, it is more convenient to install it automatically.
  For this purpose, the ``deployer`` will be used, a machine that installs the Wazuh app for Splunk in every search-head at the same time and automatically.

Install the Wazuh app for Splunk on the ``deployer`` machine and follow the steps:

#. Copy the Wazuh app for Splunk into the Splunk cluster folder:

    .. code-block:: console

      # cp -r installation_path/SplunkAppForWazuh /opt/splunk/etc/shcluster/apps

#. Create the file that listens the outputs from the Wazuh API:

    .. code-block:: console

      # touch /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/outputs.conf

#. Fill the ``outputs.conf`` file with the next lines:

    .. code-block:: xml

      [indexer_discovery:cluster1]
      pass4SymmKey = changeme
      master_uri = https://<master_ip>:<management_port>

      [tcpout:cluster1_tcp]
      indexerDiscovery = cluster1

      [tcpout]
      defaultGroup = cluster1_tcp

    .. note::
      The ``indexerDiscovery`` attribute is used for setting the connection to peer nodes. More information about the ``indexerDiscovery`` attribute can be found `here <https://docs.splunk.com/Documentation/Splunk/7.1.3/Indexer/indexerdiscovery>`_.

    .. note::
      ``<master_ip>`` references to the indexers master ip.

    .. warning::
      The ``https`` is required by default and the default port is 8089.

#. Apply the changes:

    .. code-block:: console

      # /opt/splunk/bin/splunk apply shcluster-bundle -target https://<NODE_IP>:<management_port> -auth <user>:<password>

Now, we should have the ``/opt/splunk/etc/apps/SplunkAppForWazuh`` in every ``search head``.

Update the Wazuh app for Splunk
-------------------------------

#. To perform the update, the Wazuh app for Splunk must be deleted from the deployer and reinstalled by following the previous steps:

    .. code-block:: console

      # rm -rf /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh

#. Then, synchronized with the option ``-force`` and will be deleted from the search heads:

    .. code-block:: console

      # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f
