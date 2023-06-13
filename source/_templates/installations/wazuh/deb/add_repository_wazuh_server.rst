.. Copyright (C) 2015, Wazuh, Inc.

#. Install the necessary packages for the installation.

    .. code-block:: console

      # apt-get install curl apt-transport-https lsb-release gnupg

#. Install the GPG key.
    .. note::
    
    Note: apt-key(8) is now DEPRECATED on Debian 12. 
    
    .. code-block:: console

      # # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH -o /etc/apt/trusted.gpg.d/wazuh.asc && chmod 644 /etc/apt/trusted.gpg.d/wazuh.asc

#. Add the repository.

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information.

    .. code-block:: console

      # apt-get update

.. End of include file
