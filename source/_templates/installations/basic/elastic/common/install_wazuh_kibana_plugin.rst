.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::


    .. tab:: Install from URL


      .. code-block:: console

        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.4.2_7.17.9-1.zip



    .. tab:: Install from the local file


      .. code-block:: console

        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/wazuh_kibana-4.4.2_7.17.9-1.zip



.. note:: The `path` must have *read* permissions for *others*. E.g: The directory `/tmp/` will accomplish this.

.. End of install_wazuh_kibana_plugin.rst
