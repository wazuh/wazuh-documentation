.. _wazuh_server_rpm:

Install Wazuh manager and API (rpm)
====================================

Adding Wazuh repositories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the Wazuh repositories to your system. Also, it is possible to download the :ref:`required package <packages>`.

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
Install the Wazuh manager::

	yum install wazuh-manager

Installing API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**1.** NodeJS >= 4.6.1 is required in order to run the API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend to add the official repositories::

	curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

**2.** Install the Wazuh API. It will update NodeJS if it is required::

	yum install wazuh-api

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
        
        yum install scl-utils

        # Choose option:
            # Enable RHSCL (option 1)
            yum-config-manager --enable rhel-server-rhscl-6-rpms

            # Enable RHSCL manually (option 2)
            nano /etc/yum.repos.d/redhat-rhui.repo
            # In section [rhui-REGION-rhel-server-rhscl], change enabled from 0 to 1
                [rhui-REGION-rhel-server-rhscl]
                name=Red Hat Enterprise Linux Server 6 RHSCL (RPMs)
                # ...
                enabled=1

        yum install python27

Next steps
----------

Once you've installed the Wazuh manager, you may want to :ref:`Install Filebeat <filebeat_rpm>`.
