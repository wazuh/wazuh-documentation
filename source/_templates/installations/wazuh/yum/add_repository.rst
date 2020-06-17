.. Copyright (C) 2020 Wazuh, Inc.

#. Import the GPG key:

    .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository:

    .. code-block:: console

      # echo -e '[wazuh_trash]\ngpgcheck=1\ngpgkey=https://packages-dev.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-dev.wazuh.com/trash/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh_pre.repo

.. End of include file
