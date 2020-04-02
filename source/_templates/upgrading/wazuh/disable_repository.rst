.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::
  
  .. group-tab:: Yum

    .. console
    
        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  .. group-tab:: APT

    .. console
    
        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
        # apt-get update

  .. group-tab:: ZYpp

    .. console
    
        # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo


.. End of include file
