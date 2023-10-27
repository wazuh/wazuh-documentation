
.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Upgrading Wazuh agents on Linux systems
=======================================

Select your package manager and follow the instructions to upgrade the Wazuh agent locally. If you want to perform a remote upgrade, check the :doc:`Remote agent upgrade </user-manual/agents/remote-upgrading/upgrading-agent>` section to learn more. 

.. note:: You need root user privileges to run all the commands described below.

.. tabs::

  .. group-tab:: Yum

    #. Import the GPG key.

       .. code-block:: console

        # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

    #. Add the Wazuh repository. 

       .. code-block:: console

         # cat > /etc/yum.repos.d/wazuh.repo << EOF
         [wazuh]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=EL-\$releasever - Wazuh
         baseurl=https://packages.wazuh.com/4.x/yum/
         protect=1
         EOF

    #. Clean the YUM cache.

       .. code-block:: console

         # yum clean all


    #. Upgrade the Wazuh agent to the latest version.

       .. code-block:: console

          # yum upgrade wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager.

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo


  .. group-tab:: APT

    #. Install the GPG key.

       .. code-block:: console

         # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

    #. Add the Wazuh repository.

       .. code-block:: console

         # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list


    #. Upgrade the Wazuh agent to the latest version.

       .. code-block:: console

          # apt-get update
          # apt-get install wazuh-agent|WAZUH_AGENT_DEB_PKG_INSTALL|


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager. Skip this step if the package is set to a ``hold`` state.

        .. code-block:: console

          # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
          # apt-get update

    .. note::

       For Debian 7, 8, and Ubuntu 14 systems import the GCP key and add the Wazuh repository (steps 1 and 2) using the following commands.

       .. code-block:: console

          # apt-get install gnupg apt-transport-https
          # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -
          # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list


  .. group-tab:: ZYpp

    #. Import the GPG key.

       .. code-block:: console

         # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

    #. Add the Wazuh repository. 

       .. code-block:: console

         # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
         [wazuh]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=EL-$releasever - Wazuh
         baseurl=https://packages.wazuh.com/4.x/yum/
         protect=1
         EOF

    #. Refresh the repository. 

       .. code-block:: console

         # zypper refresh


    #. Upgrade the Wazuh agent to the latest version.

       .. code-block:: console

          # zypper update wazuh-agent|WAZUH_AGENT_ZYPP_PKG_INSTALL|


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager. 

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo


  .. group-tab:: APK

    #. Install the GPG key.

       .. code-block:: console

         # wget -O /etc/apk/keys/alpine-devel@wazuh.com-633d7457.rsa.pub https://packages.wazuh.com/key/alpine-devel//%40wazuh.com-633d7457.rsa.pub

    #. Add the Wazuh repository.

       .. code-block:: console

         # echo "https://packages.wazuh.com/4.x/alpine/v3.12/main" >> /etc/apk/repositories


    #. Upgrade the Wazuh agent to the latest version.
        
       .. code-block:: console

          # apk update
          # apk add wazuh-agent|WAZUH_AGENT_APK_PKG_INSTALL|


    #. It is recommended to disable the Wazuh repository to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager.

       .. code-block:: console

          # sed -i "s|^https://packages.wazuh.com|#https://packages.wazuh.com|g" /etc/apk/repositories   


.. note::
   :class: not-long

   When upgrading agents from versions earlier than 4.x, make sure that the communication protocol is compatible. Up to that point, UDP was the default protocol and it was switched to TCP for later versions. Edit the agent configuration file ``ossec.conf`` to update the :ref:`protocol <server_protocol>` or make sure that your Wazuh manager accepts :ref:`both protocols<manager_protocol>`.         
