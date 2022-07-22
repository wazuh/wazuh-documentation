
.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Ugrading Wazuh agents on Linux systems
======================================

Select your package manager and follow the instructions to upgrade the Wazuh agent. 

.. tabs::

  .. group-tab:: Yum

    #. Import the GPG key:

       .. code-block:: console

        # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

    #. Add the repository:

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

    #. Clean the YUM cache:

       .. code-block:: console

         # yum clean all


    #. Upgrade the Wazuh agent to the latest version:

       .. code-block:: console

          # yum upgrade wazuh-agent


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo


  .. group-tab:: APT

    #. Install the GPG key:

       .. code-block:: console

         # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

    #. Add the repository:

       .. code-block:: console

         # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list


    #. Upgrade the Wazuh agent to the latest version:

        .. code-block:: console

          # apt-get update
          # apt-get install wazuh-agent


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager. Skip this step if the package is set to a ``hold`` state:

        .. code-block:: console

          # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
          # apt-get update


  .. group-tab:: ZYpp

    #. Import the GPG key:

       .. code-block:: console

         # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

    #. Add the repository:

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

    #. Refresh the repository:

       .. code-block:: console

         # zypper refresh


    #. Upgrade the Wazuh agent to the latest version:

        .. code-block:: console

          # zypper update wazuh-agent


    #. It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or an older version than the Wazuh manager:

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

.. note::

   Once the Wazuh agent is upgraded, if it still uses UDP, which was the default protocol for versions prior to Wazuh 4.x, it must be changed to TCP in the ``ossec.conf`` file:
   
   .. code-block:: console
     :emphasize-lines: 6
   
     <ossec_config>
       <client>
         <server>
           <address>172.16.1.17</address>
           <port>1514</port>
           <protocol>udp</protocol>
         </server>         