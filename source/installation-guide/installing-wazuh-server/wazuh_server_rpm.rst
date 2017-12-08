.. _wazuh_server_rpm:

Install Wazuh server with RPM packages
======================================

For CentOS/RHEL/Fedora platforms, installing Wazuh server components just entails installing the relevant packages after adding the appropriate repositories.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first thing you need is to add the Wazuh repository to your server. If you want to download the wazuh-manager package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.

To set up the repository, run this command:

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

For CentOS-5 and RHEL-5:

    .. code-block:: console

        # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=http://packages.wazuh.com/key/GPG-KEY-WAZUH-5
        enabled=1
        name=Wazuh repository
        baseurl=http://packages.wazuh.com/3.x/yum/5/
        protect=1
        EOF

Installing the Wazuh Manager
------------------------

The next step is to install the Wazuh Manager on your system:

  .. code-block:: console

	 # yum install wazuh-manager

Once the process is completed, you can check the service status with:

    a) For Systemd:

    .. code-block:: console

      # systemctl status wazuh-manager

    b) For SysV Init:

    .. code-block:: console

      # service wazuh-manager status

Installing the Wazuh API
--------------------

1. NodeJS >= 4.6.1 is required in order to run the Wazuh API. If you do not have NodeJS installed, or your version is older than 4.6.1, we recommend that you add the official NodeJS repository like this:

  .. code-block:: console

	 # curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

  and then, install nodejs:

  .. code-block:: console

	 # yum install nodejs

2. Python >= 2.7 is required in order to run the Wazuh API. It is installed by default or included in the official repositories in most Linux distributions.

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

  CentOS 6 and Red Hat 6 come with Python 2.6, you can install Python 2.7 in parallel, thus maintaining the older version:

  a) For CentOS 6:

  .. code-block:: console

    # yum install -y centos-release-scl
    # yum install -y python27

  b) For RHEL 6:

  .. code-block:: console

    # yum install python27

    # You may need to first enable a repository in order to get python27, with a command like this:
    #   yum-config-manager --enable rhui-REGION-rhel-server-rhscl
    #   yum-config-manager --enable rhel-server-rhscl-6-rpms

.. note::

  Follow this step if your python version is lower than 2.7. You can check this running ``python --version``.

3. Install the Wazuh API. It will update NodeJS if it is required:

  .. code-block:: console

	 # yum install wazuh-api

4. Once the process is completed, you can check the service status with:

  a) For Systemd:

  .. code-block:: console

	 # systemctl status wazuh-api

  b) For SysV Init:

  .. code-block:: console

	 # service wazuh-api status



.. _wazuh_server_rpm_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that will securely forward the alerts and archived events to the Logstash service on the Elastic Stack server(s).

.. warning::
    In a single-host architecture (where Wazuh server and Elastic Stack are installed in the same system), you may entirely skip installing Filebeat, since Logstash will be able to read the event/alert data directly from the local filesystem without the assistance of a forwarder.

The RPM package is suitable for installation on Red Hat, CentOS and other modern RPM-based systems.

1. Install the GPG keys from Elastic and then the Elastic repository:

  .. code-block:: console

    # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

    # cat > /etc/yum.repos.d/elastic.repo << EOF
    [elasticsearch-6.x]
    name=Elasticsearch repository for 6.x packages
    baseurl=https://artifacts.elastic.co/packages/6.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=1
    autorefresh=1
    type=rpm-md
    EOF

2. Install Filebeat:

  .. code-block:: console

	 # yum install filebeat-6.1.1

3. Download the Filebeat config file from the Wazuh repository, which is preconfigured to forward Wazuh alerts to Logstash:

  .. code-block:: console

	 # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``ELASTIC_SERVER_IP``  with the IP address or the hostname of the Elastic Stack server. For example:

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

  	# chkconfig --add filebeat
  	# service filebeat start

Next steps
----------

Once you have installed the manager, API and Filebeat (only needed for distributed architectures), you are ready to :ref:`install Elastic Stack <installation_elastic>`.
