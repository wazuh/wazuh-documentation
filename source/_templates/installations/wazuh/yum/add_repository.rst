.. Copyright (C) 2020 Wazuh, Inc.

#. Import the GPG key:

    .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository:

    .. code-block:: console

      # cat > /etc/yum.repos.d/wazuh.repo << EOF
      [wazuh_trash]
      gpgcheck=1
      gpgkey=https://packages-dev.wazuh.com/key/GPG-KEY-WAZUH
      enabled=1
      name=EL-$releasever - Wazuh
      baseurl=https://packages-dev.wazuh.com/trash/yum/
      protect=1' | tee /etc/yum.repos.d/wazuh_pre.repo
      EOF 
      
.. End of include file
