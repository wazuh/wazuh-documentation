.. Copyright (C) 2020 Wazuh, Inc.

#. Add NodeJS repository:

    .. code-block:: console

      # curl -sL https://deb.nodesource.com/setup_8.x | bash -

    .. note::

        If you are using **Debian 7 (Wheezy)** you must install NodeJS 6 using the command below:

        .. code-block:: console

          # curl -sL https://deb.nodesource.com/setup_6.x | bash -

#. Install NodeJS:

    .. code-block:: console

      # apt-get install nodejs

#. Install the Wazuh API. It will update NodeJS if necessary:

    .. code-block:: console

      # apt-get install wazuh-api


.. End of include file
