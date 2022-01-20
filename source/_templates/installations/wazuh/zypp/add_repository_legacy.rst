.. Copyright (C) 2022 Wazuh, Inc.

#. Install the certificates deployment dependencies:

    .. code-block:: console

      # zypper install zip unzip tar

#. Import the GPG key:

    .. code-block:: console

      # rpm --import http://packages.wazuh.com/key/GPG-KEY-WAZUH-5

#. Add the repository:

    .. code-block:: console

      # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
      [wazuh_repo]
      gpgcheck=1
      gpgkey=http://packages.wazuh.com/key/GPG-KEY-WAZUH-5
      enabled=1
      name=Wazuh repository
      baseurl=http://packages.wazuh.com/4.x/yum5/$basearch/
      protect=1
      EOF

.. End of include file
