.. Copyright (C) 2015, Wazuh, Inc.

#. Install the following packages if missing.

      .. tabs::

          .. group-tab:: Yum

                  .. code-block:: console

                      # yum install libcap
                      # yum install -y libnss3.so xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc fontconfig freetype ipa-gothic-fonts

          .. group-tab:: APT

                  .. code-block:: console

                      # apt-get install debhelper tar curl libcap2-bin #debhelper version 9 or later

.. End of include file
