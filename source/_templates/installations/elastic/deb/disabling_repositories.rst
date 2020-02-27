.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
  # apt-get update

Alternatively, the package state can be set to ``hold``, which will stop updates (although it can still be upgraded manually using ``apt-get install``).

.. code-block:: console

  # echo "elasticsearch hold" | sudo dpkg --set-selections
  # echo "kibana hold" | sudo dpkg --set-selections


.. End of include file
