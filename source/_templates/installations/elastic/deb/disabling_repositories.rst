.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
  # apt-get update

Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

.. code-block:: console

  # echo "elasticsearch hold" | sudo dpkg --set-selections
  # echo "kibana hold" | sudo dpkg --set-selections


.. End of include file
