.. Copyright (C) 2015, Wazuh, Inc.

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
      baseurl=https://packages.wazuh.com/6.x/yum/
      protect=1
      EOF 

#. Refresh the repository:

    .. code-block:: console
 
      # zypper refresh

      
.. End of include file
