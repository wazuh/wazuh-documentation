.. _wazuh_server_rpm:

Install Wazuh manager (rpm)
===============================

The rpm package is suitable for installation on Red Hat, Centos and other RPM-based systems.

1. First we'll install the Wazuh repository. Run the following command depending on your operating system:

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

2. Install the Wazuh Manager::

	yum install wazuh-manager

3. NodeJS >= 4.6.1 is required in order to run the API. If you do not have installed NodeJS or your version is older than 4.6.1, we recommend to add the official repositories::

	curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

4. Finally, install the Wazuh API. It will update NodeJS if it is required::

	yum install wazuh-api

Next steps
----------

Once you've installed the Wazuh manager, you may want to :ref:`Install Filebeat <filebeat_rpm>`.
