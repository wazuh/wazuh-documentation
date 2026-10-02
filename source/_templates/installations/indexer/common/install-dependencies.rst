.. Copyright (C) 2015, Wazuh, Inc.

#. Run the following command to install the following packages if missing:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install -y debconf adduser procps diffutils iproute2 openssl

      .. group-tab:: Yum

         .. code-block:: console

            # yum install -y coreutils diffutils hostname iproute openssl procps-ng util-linux

      .. group-tab:: DNF

         .. code-block:: console

            # dnf install -y coreutils diffutils hostname iproute openssl procps-ng util-linux

.. End of include file
