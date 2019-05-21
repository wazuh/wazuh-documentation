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
  
    # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH
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

  .. code-block:: console

    # yum install wazuh-manager

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

  .. code-block:: console

    # yum install nodejs

2. Install the Wazuh API. It will update NodeJS if it is required:

  .. code-block:: console

    # yum install wazuh-api

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

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

.. note::

  From Fedora v22 to v25, it's required to install ``dkms`` package (``yum install dkms``).

.. _wazuh_server_rpm_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

The RPM package is suitable for installation on Red Hat, CentOS and other modern RPM-based systems.

1. Install the Elastic repository and its GPG key:

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

2. Install Filebeat:

  .. code-block:: console

    # yum install filebeat-7.1.0

3. Download the Filebeat configuration file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Elasticsearch:

  .. code-block:: console

    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v3.9.1/extensions/filebeat/7.x/filebeat.yml
    # chmod go+r /etc/filebeat/filebeat.yml

4. Download the alerts template for Elasticsearch:

  .. code-block:: console

    # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.9.1/extensions/elasticsearch/7.x/wazuh-template.json
    # chmod go+r /etc/filebeat/wazuh-template.json

5. Edit the file ``/etc/filebeat/filebeat.yml`` and add the list of Elasticsearch nodes to connect to. For example:

  .. code-block:: yaml

    output.elasticsearch:
      hosts: ['http://10.0.0.2:9200', 'http://10.0.0.3:9200']
      indices:
        - index: 'wazuh-alerts-3.x-%{+yyyy.MM.dd}'

6. Enable and start the Filebeat service:

  * For Systemd:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable filebeat.service
      # systemctl start filebeat.service

  * For SysV Init:

    .. code-block:: console

      # chkconfig --add filebeat
      # service filebeat start

Next steps
----------

Once you have installed the manager, API and Filebeat, you are ready to install :ref:`Elastic Stack <installation_elastic>`.
