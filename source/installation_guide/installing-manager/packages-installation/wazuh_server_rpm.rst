.. _wazuh_server_rpm:

Install Wazuh manager and API (rpm)
====================================

Adding Wazuh repositories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First thing we need to do is to add the Wazuh repositories to your system. Also, if you prefer download the package directly, it is possible to download the :ref:`required package <packages>`.

**1.** Run the following command depending on your operating system:

    a) For CentOS::

        cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=CentOS-$releasever - Wazuh
        baseurl=https://packages.wazuh.com/yum/el/$releasever/$basearch
        protect=1
        EOF

    b) For RHEL::

        cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=RHEL-$releasever - Wazuh
        baseurl=https://packages.wazuh.com/yum/rhel/$releasever/$basearch
        protect=1
        EOF

    c) For Fedora::

        cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        name=Fedora-$releasever - Wazuh
        enabled=1
        baseurl=https://packages.wazuh.com/yum/fc/$releasever/$basearch
        protect=1
        EOF

Installing manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
On your terminal, install the Wazuh manager::

	yum install wazuh-manager

Once the process is completed, you can check the state with

	a) For Systemd::

			systemctl status wazuh-manager

	b) For SysV Init::

			service wazuh-manager status

Installing API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**1.** NodeJS >= 4.6.1 is required in order to run the API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend to add the official repositories::

	curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

And then, install nodejs::

  	yum install nodejs

**2.** Install the Wazuh API. It will update NodeJS if it is required::

	yum install wazuh-api

Once the process is completed, you can check the state with

  	a) For Systemd::

  			systemctl status wazuh-api

  	b) For SysV Init::

  			service wazuh-api status

**3.** Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories in the most of Linux distributions.

It is possible to set the path of Python in the API configuration at */var/ossec/api/configuration/config.js*::

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

For CentOS 6 and Redhat 6, you can install the package *python27*, that installs Python 2.7 at */opt/rh/python27*:

    a) For CentOS 6::

        yum install -y centos-release-SCL
        yum install -y python27

    b) For RHEL 6::

        yum install python27

        # You may need enable the repository:
        #   yum-config-manager --enable REPOSITORY_NAME

        #   Examples:
        #   yum-config-manager --enable rhui-REGION-rhel-server-rhscl
        #   yum-config-manager --enable rhel-server-rhscl-6-rpms

Next steps
----------

Once you've installed the Wazuh manager, you need to :ref:`install Filebeat <filebeat_rpm>`.
