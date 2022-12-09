.. Copyright (C) 2015, Wazuh, Inc.

#. Install the Wazuh agent:

   .. code-block:: console

      # apk add wazuh-agent

#. Edit the agent configuration to add the address of your Wazuh manager:

   .. code-block:: console

      # export WAZUH_MANAGER="10.0.0.2" && sed -i "s|MANAGER_IP|$WAZUH_MANAGER|g" /var/ossec/etc/ossec.conf
  
   For more customization options, like agent name or group, see the :doc:`Linux/Unix endpoint configuration </user-manual/agent-enrollment/via-agent-configuration/linux-endpoint>` page. For more security options, check the :doc:`Additional security options </user-manual/agent-enrollment/security-options/index>` section. 

   
.. End of include file
