.. Copyright (C) 2020 Wazuh, Inc.

#. Import the GPG key:

    .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository:

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

.. End of include file
