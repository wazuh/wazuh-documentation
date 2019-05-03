.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_server_rpm:

Install Wazuh server with RPM packages
======================================

For CentOS/RHEL/Fedora platforms, installing the Wazuh server components entails the installation of the relevant packages after adding the repositories.

.. note:: All the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first step to setting up Wazuh is to add the Wazuh repository to your server. If you want to download the wazuh-manager package directly, or check the compatible versions, click :ref:`here <packages>`.

To set up the repository, run this command:

CentOS 6/RHEL 6, CentOS 7/RHEL 7, Fedora 22 or greater, Amazon Linux and Oracle Linux
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. code-block:: console

    # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
    enabled=1
    name=Wazuh repository
    baseurl=https://packages.wazuh.com/3.x/yum/
    protect=1
    EOF


SUSE 12, OpenSUSE 42, OpenSUSE Leap and OpenSUSE Tumbleweed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. code-block:: console

    # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH
    # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
    enabled=1
    name=Wazuh repository
    baseurl=https://packages.wazuh.com/3.x/yum/
    protect=1
    EOF

Installing the Wazuh Manager
----------------------------

The next step is to install the Wazuh Manager on your system:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # yum install wazuh-manager

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # zypper install wazuh-manager

Once the process is complete, you can check the service status with:

    * For Systemd:

      .. code-block:: console

        # systemctl status wazuh-manager

    * For SysV Init:

      .. code-block:: console

        # service wazuh-manager status

Installing the Wazuh API
------------------------

1. NodeJS >= 4.6.1 is required in order to run the Wazuh API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend that you add the official NodeJS repository like this:

  .. code-block:: console

    # curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

  and then, install NodeJS:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # yum install nodejs

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # zypper install nodejs

2. Install the Wazuh API. It will update NodeJS if it is required:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # yum install wazuh-api

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # zypper install wazuh-api

3. Once the process is complete, you can check the service status with:

  * For Systemd:

    .. code-block:: console

      # systemctl status wazuh-api

  * For SysV Init:

    .. code-block:: console

      # service wazuh-api status

.. note::
    Now that the Wazuh API is installed, check out the section :ref:`securing_api` to set up some additional settings.

4. (Optional) Disable the Wazuh repository:

  It is recommended that the Wazuh repository be disabled in order to prevent accidental upgrades. To do this, use the following command:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

.. _wazuh_server_rpm_filebeat:

.. note::

  From Fedora v22 to v25, it's required to install ``dkms`` package (``yum install dkms``).

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to the Logstash service on the Elastic Stack server(s).

.. warning::
    In a single-host architecture (where Wazuh server and Elastic Stack are installed in the same system), the installation of Filebeat is not needed since Logstash will be able to read the event/alert data directly from the local filesystem without the assistance of a forwarder.

The RPM package is suitable for installation on Red Hat, CentOS and other modern RPM-based systems.

1. Install the GPG keys from Elastic and then the Elastic repository:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

      # cat > /etc/yum.repos.d/elastic.repo << EOF
      [elasticsearch-7.x]
      name=Elasticsearch repository for 7.x packages
      baseurl=https://artifacts.elastic.co/packages/7.x/yum
      gpgcheck=1
      gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
      enabled=1
      autorefresh=1
      type=rpm-md
      EOF

  * Using the ``zypper`` package manager

    .. code-block:: console

      # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

      # cat > /etc/zypp/repos.d/elastic.repo << EOF
      [elasticsearch-7.x]
      name=Elasticsearch repository for 7.x packages
      baseurl=https://artifacts.elastic.co/packages/7.x/yum
      gpgcheck=1
      gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
      enabled=1
      autorefresh=1
      type=rpm-md
      EOF


2. Install Filebeat:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # yum install filebeat-7.0.0

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # zypper install filebeat-7.0.0

3. Download the Filebeat configuration file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Logstash:

  .. code-block:: console

    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/filebeat/filebeat-7.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``ELASTIC_SERVER_IP``  with the IP address or the hostname of the Elastic Stack server. For example:

  .. code-block:: yaml

    output:
      logstash:
        hosts: ["ELASTIC_SERVER_IP:5000"]

5. Enable and start the Filebeat service:

  * For Systemd:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable filebeat.service
      # systemctl start filebeat.service

  * For SysV Init:

    .. code-block:: console

      # chkconfig --add filebeat
      # service filebeat start

6. (Optional) Disable the Elasticsearch repository:

  It is recommended that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the App. To do this, use the following command:

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

Next steps
----------

Once you have installed the manager, API and Filebeat (only needed for distributed architectures), you are ready to install :ref:`Elastic Stack <installation_elastic>`.
