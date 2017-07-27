.. _wazuh_agent_rpm:

Install Wazuh agent with RPM packages
=====================================

The RPM package is suitable for installation on Red Hat, CentOS and other RPM-based systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first thing you need is to add the Wazuh repository to your server. Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

Run the following command that corresponds to your specific Linux distribution:

  a) For CentOS:

     .. code-block:: bash

         $ cat > /etc/yum.repos.d/wazuh.repo <<\EOF
         [wazuh_repo]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=CentOS-$releasever - Wazuh
         baseurl=https://packages.wazuh.com/yum/el/$releasever/$basearch
         protect=1
         EOF

  b) For RHEL:

     .. code-block:: bash

         $ cat > /etc/yum.repos.d/wazuh.repo <<\EOF
         [wazuh_repo]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=RHEL-$releasever - Wazuh
         baseurl=https://packages.wazuh.com/yum/rhel/$releasever/$basearch
         protect=1
         EOF

  c) For Fedora:

     .. code-block:: bash

         $ cat > /etc/yum.repos.d/wazuh.repo <<\EOF
         [wazuh_repo]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         name=Fedora-$releasever - Wazuh
         enabled=1
         baseurl=https://packages.wazuh.com/yum/fc/$releasever/$basearch
         protect=1
         EOF

  d) For Amazon Linux:

     .. code-block:: bash

        $ cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        name=Amazon Linux - Wazuh
        enabled=1
        baseurl=https://packages.wazuh.com/yum/el/7/$basearch
        protect=1
        EOF

Installing Wazuh agent
----------------------

On your terminal, install the Wazuh agent:

  .. code-block:: bash

	 $ yum install wazuh-agent

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
