.. Copyright (C) 2015, Wazuh, Inc.

#. Install the GPG key:
    .. note::
    
    The use of apt-key(8) is DEPRECATED from Debian 12 (bookworm)
    
    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH -o /etc/apt/trusted.gpg.d/wazuh.asc && chmod 644 /etc/apt/trusted.gpg.d/wazuh.asc

#. Add the repository:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. note::

   For Debian 7, 8, and Ubuntu 14 systems import the GCP key and add the Wazuh repository (steps 1 and 2) using the following commands.

   .. code-block:: console

      # apt-get install gnupg apt-transport-https
      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -
      # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

.. End of include file
