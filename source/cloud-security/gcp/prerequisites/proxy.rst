.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure a proxy for the Wazuh agent to reach Google Cloud in this section of the documentation.

Configuring a proxy
===================

If the Wazuh agent reaches Google Cloud through a proxy, set the ``https_proxy`` environment variable for the Wazuh agent service. Use the lowercase name, because the Pub/Sub client uses gRPC, which doesn't read ``HTTPS_PROXY``. Create the ``/etc/systemd/system/wazuh-agent.service.d/proxy.conf`` file with the following content, replacing ``<PROXY_ADDRESS>`` and ``<PROXY_PORT>`` with your proxy values:

.. code-block:: ini
   :emphasize-lines: 3

   [Service]

   Environment="https_proxy=http://<PROXY_ADDRESS>:<PROXY_PORT>"

Then run ``systemctl daemon-reload`` and ``systemctl restart wazuh-agent`` to apply the change. The variable applies to every module of the Wazuh agent.
