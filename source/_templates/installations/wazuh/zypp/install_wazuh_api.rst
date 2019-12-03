.. Copyright (C) 2019 Wazuh, Inc.

#. Add NodeJS repository:

    .. code-block:: console

      # curl -sL https://rpm.nodesource.com/setup_8.x | bash -

#. Install NodeJS:

    .. code-block:: console

      # zypper install nodejs

#. Install the Wazuh API. It will update NodeJS if necessary:

    .. code-block:: console

      # zypper install wazuh-api


.. End of include file
