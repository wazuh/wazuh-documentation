.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_rpm:

Install Wazuh agent with RPM packages
=====================================

The RPM package is suitable for installation on Red Hat, CentOS and other RPM-based systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first step to installing the Wazuh agent is to add the Wazuh repository to your server.  Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.

Set up the repository by running the following commands according to your distribution:

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


CentOS 5/RHEL 5
^^^^^^^^^^^^^^^

  .. code-block:: console

    # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=http://packages.wazuh.com/key/GPG-KEY-WAZUH-5
    enabled=1
    name=Wazuh repository
    baseurl=http://packages.wazuh.com/3.x/yum/5/$basearch/
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

SUSE 11
^^^^^^^

  .. code-block:: console

    # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH-5
    # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=http://packages.wazuh.com/key/GPG-KEY-WAZUH-5
    enabled=1
    name=Wazuh repository
    baseurl=http://packages.wazuh.com/3.x/yum/5/$basearch/
    protect=1
    EOF


Installing Wazuh agent
----------------------

1. On your terminal, install the Wazuh agent. You can choose only installation or an installation with a registration / configuration included:

  a) Only installation:

     * Using the ``yum`` package manager:
   
       .. code-block:: console
   
         # yum install wazuh-agent
   
     * Using the ``zypper`` package manager:
   
       .. code-block:: console
   
         # zypper install wazuh-agent
         
     .. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.

  b) Installation with a registration / configuration included:

    You can automate the agent registration and configuration using environment variables. 

    .. code-block:: console

      # WAZUH_MANAGER_IP="192.168.1.2" yum install wazuh-agent 

    .. note:: See the following document for additional registering and configuration options: :doc:`Automated registering and configuration variables <automated_reg-config_variables>`.      


2. (Optional) Disable the Wazuh repository:

  It is recommended that the Wazuh repository be disabled in order to prevent accidental upgrades. To do this, use the following command:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

