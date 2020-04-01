.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::


  .. group-tab:: Yum

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/elastic.repo



  .. group-tab:: APT

    .. code-block:: console

        # sed -i "s/#deb/deb/" /etc/apt/sources.list.d/elastic-7.x.list
        # apt-get update

  .. group-tab:: ZYpp

    .. code-block:: console

        # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/elastic.repo         


.. End of include file
