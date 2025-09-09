.. Copyright (C) 2015, Wazuh, Inc.

#. Import the GPG key.

   .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Add the repository.

   .. code-block:: console

      # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/5.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

.. End of include file
