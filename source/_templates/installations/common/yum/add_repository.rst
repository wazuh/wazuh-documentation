.. Copyright (C) 2022 Wazuh, Inc.

#. Install the necessary packages for the installation.

    .. code-block:: console

      # yum install -y curl

    ..
      # yum install -y curl libcap

#. Import the GPG key.

    .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository.

    .. code-block:: console

      # cat > /etc/yum.repos.d/wazuh.repo << EOF
      [wazuh]
      gpgcheck=1
      gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
      enabled=1
      name=EL-\$releasever - Wazuh
      baseurl=https://packages-dev.wazuh.com/pre-release/yum/
      protect=1 
      EOF 
      
.. End of include file
