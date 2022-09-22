.. Copyright (C) 2015, Wazuh, Inc.

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

   .. group-tab:: APT

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

      #. Update the package information:

         .. code-block:: console

            # apt-get update


      
.. End of include file
