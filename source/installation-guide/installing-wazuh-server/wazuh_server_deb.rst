.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_server_deb:

Install Wazuh server with DEB packages
======================================

For Debian/Ubuntu platforms, installing the Wazuh server components entails the installation of the relevant packages after adding the repositories.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first step to setting up Wazuh is to add the Wazuh repository to your server. If you want to download the wazuh-manager package directly, or check the compatible versions, click :ref:`here <packages>`.

1. To perform this procedure, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on your system. If they are not already present, install them using the commands below:

  .. code-block:: console

    # apt-get update
    # apt-get install curl apt-transport-https lsb-release

  If the ``/usr/bin/python`` file doesn't exist (like in **Ubuntu 16.04 LTS or later**), create a symlink to Python (2.7 or newer) with the following command:

  .. code-block:: console

    # if [ ! -f /usr/bin/python ]; then ln -s /usr/bin/python3 /usr/bin/python; fi

2. Install the GPG key:

  .. code-block:: console

    # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Add the repository:

  .. code-block:: console

    # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

4. Update the package information:

  .. code-block:: console

    # apt-get update

Installing the Wazuh Manager
----------------------------

On your terminal, install the Wazuh manager:

  .. code-block:: console

    # apt-get install wazuh-manager

Once the process is completed, you can check the service status with:

  a) For Systemd:

  .. code-block:: console

    # systemctl status wazuh-manager

  b) For SysV Init:

  .. code-block:: console

    # service wazuh-manager status

Installing the Wazuh API
------------------------

1. NodeJS >= 4.6.1 is required in order to run the Wazuh API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend that you add the official NodeJS repository like this:

  .. code-block:: console

    # curl -sL https://deb.nodesource.com/setup_8.x | bash -

  .. note::

      If you are using **Ubuntu 12.04 (Precise)** or **Debian 7 (Wheezy)** you must install NodeJS 6 using the command below: ``# curl -sL https://deb.nodesource.com/setup_6.x | bash -``

  and then, install NodeJS:

  .. code-block:: console

    # apt-get install nodejs

2. Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories in most Linux distributions.

   To determine if the python version on your system is lower than 2.7, you can run the following:

  .. code-block:: console

    # python --version

   It is possible to set a custom Python path for the API in ``/var/ossec/api/configuration/config.js``, in case the stock version of Python in your distro is too old:

  .. code-block:: javascript

    config.python = [
        // Default installation
        {
            bin: "python",
            lib: ""
        },
        // Package 'python27' for CentOS 6
        {
            bin: "/opt/rh/python27/root/usr/bin/python",
            lib: "/opt/rh/python27/root/usr/lib64"
        }
    ];

3. Install the Wazuh API. It will update NodeJS if it is required:

  .. code-block:: console

    # apt-get install wazuh-api

4. Once the process is complete, you can check the service status with:

  a) For Systemd:

  .. code-block:: console

    # systemctl status wazuh-api

  b) For SysV Init:

  .. code-block:: console

    # service wazuh-api status

.. note::
    Now that the Wazuh API is installed, check out the section :ref:`securing_api` to set up some additional settings.

5. (Optional) Disable the Wazuh updates:

  It is recommended that the Wazuh repository be disabled in order to prevent accidental upgrades. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # apt-get update

  Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "wazuh-manager hold" | sudo dpkg --set-selections
    # echo "wazuh-api hold" | sudo dpkg --set-selections

.. _wazuh_server_deb_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to the Logstash service on the Elastic Stack server(s).

.. warning::
    In a single-host architecture (where Wazuh server and Elastic Stack are installed in the same system), the installation of Filebeat is not needed since Logstash will be able to read the event/alert data directly from the local filesystem without the assistance of a forwarder.

The DEB package is suitable for Debian, Ubuntu, and other Debian-based systems.

1. Install the GPG keys from Elastic and then the Elastic repository:

  .. code-block:: console

    # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
    # echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-6.x.list
    # apt-get update

2. Install Filebeat:

  .. code-block:: console

    # apt-get install filebeat=6.6.1

3. Download the Filebeat config file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Logstash:

  .. code-block:: console

    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.8/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elastic Stack server. For example:

  .. code-block:: yaml

    output:
      logstash:
        hosts: ["ELASTIC_SERVER_IP:5000"]

5. Enable and start the Filebeat service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

  b) For SysV Init:

  .. code-block:: console

    # update-rc.d filebeat defaults 95 10
    # service filebeat start

6. (Optional) Disable the Elasticsearch updates:

  It is recommended that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the App. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-6.x.list
    # apt-get update

  Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "filebeat hold" | sudo dpkg --set-selections

Next steps
----------

Once you have installed the manager, API and Filebeat (only needed for distributed architectures), you are ready to install :ref:`Elastic Stack <installation_elastic>`.
