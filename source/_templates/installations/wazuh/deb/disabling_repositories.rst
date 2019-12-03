.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: console

  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic.list
  # apt-get update

Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

.. code-block:: console

  # echo "wazuh-manager hold" | sudo dpkg --set-selections
  # echo "wazuh-api hold" | sudo dpkg --set-selections
  # echo "filebeat hold" | sudo dpkg --set-selections

.. End of include file
