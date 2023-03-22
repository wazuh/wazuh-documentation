.. Copyright (C) 2015, Wazuh, Inc.

#. Import the RSA key:

   .. code-block:: console

      # wget -O /etc/apk/keys/alpine-devel@wazuh.com-633d7457.rsa.pub https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub

#. Add the repository:

   .. code-block:: console

      # echo "https://packages.wazuh.com/4.x/alpine/v3.12/main" >> /etc/apk/repositories

#. Update the metadata information:

   .. code-block:: console

      # apk update
      
.. End of include file
