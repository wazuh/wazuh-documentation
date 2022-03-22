.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Import the GPG key.

    .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository.

    .. code-block:: console

      # echo -e '[wazuh_pre_release]\ngpgcheck=1\ngpgkey=https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/pre-release/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh_pre.repo
      
.. End of include file
