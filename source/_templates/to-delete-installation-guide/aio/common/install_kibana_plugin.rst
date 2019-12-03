.. Copyright (C) 2019 Wazuh, Inc.

a) Install from URL:

.. code-block:: console

  # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.10.2_7.4.2.zip

b) Install from the local file:

.. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/wazuhapp-3.10.2_7.4.2.zip

.. note:: The `path` should have *read* permissions for *others*. E.g: The directory `/tmp/` will accomplish this.

The Wazuh Kibana plugin must be configured to point to the master’s API.

.. End of include file
