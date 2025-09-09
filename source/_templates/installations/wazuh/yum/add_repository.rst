.. Copyright (C) 2015, Wazuh, Inc.

#. Import the GPG key:

   .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository:

   -  For RHEL-compatible systems version 8 and earlier, use the following command:

      .. code-block:: console

         # cat > /etc/yum.repos.d/wazuh.repo << EOF
         [wazuh]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=EL-\$releasever - Wazuh
         baseurl=https://packages.wazuh.com/6.x/yum/
         protect=1
         EOF

   -  For RHEL-compatible systems version 9 and later, use the following command:

      .. code-block:: console

         # cat > /etc/yum.repos.d/wazuh.repo << EOF
         [wazuh]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=EL-\$releasever - Wazuh
         baseurl=https://packages.wazuh.com/6.x/yum/
         priority=1
         EOF

.. End of include file
