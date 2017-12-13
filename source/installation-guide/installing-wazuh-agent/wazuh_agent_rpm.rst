.. _wazuh_agent_rpm:

Install Wazuh agent with RPM packages
=====================================

The RPM package is suitable for installation on Red Hat, CentOS and other RPM-based systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first thing you need is to add the Wazuh repository to your server. If you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.

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
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=Wazuh repository
        baseurl=https://packages.wazuh.com/3.x/yum/5/
        protect=1
        EOF


Installing Wazuh agent
----------------------

On your terminal, install the Wazuh agent:

  .. code-block:: console

	 # yum install wazuh-agent

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
