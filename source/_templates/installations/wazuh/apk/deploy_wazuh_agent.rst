.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # apk add wazuh-agent


.. note::

   After installing the Alpine Linux agent, you need to configure the agent manually, for example:

   .. code-block:: console

      # sed -i 's|MANAGER_IP|10.0.0.2|g' /var/ossec/etc/ossec.conf
  
   To customize your agent configuration, see the :doc:`Linux/Unix endpoint configuration </user-manual/agent-enrollment/via-agent-configuration/linux-endpoint>` page.

.. End of include file
