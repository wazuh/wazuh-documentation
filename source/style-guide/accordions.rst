.. _accordions:

=============================
Accordions
=============================

Upgrade the Wazuh Kibana plugin
-------------------------------

.. raw:: html

  <div class="accordion-section">

#. Remove the old Wazuh Kibana plugin:

   .. code-block:: console


    # cd /usr/share/kibana/
    # sudo -u kibana bin/kibana-plugin remove wazuh


#. Install the new Wazuh Kibana plugin. Replace the Kibana version if necessary:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip



#. Restart Kibana:

   .. tabs::
   
     .. group-tab:: Systemd
    
      .. code-block:: console
    
       # systemctl restart kibana
    
     .. group-tab:: SysV init
    
      .. code-block:: console
    
       # service kibana restart
    
      
#. Clear the browser’s cache and cookies.

.. raw:: html

  </div>

Another accordion
-------------------------------

.. raw:: html

  <div class="accordion-section">

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id eros vitae mi volutpat tincidunt vel sit amet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tincidunt nisl at tellus mattis ultrices. Aenean faucibus mi et ex lacinia imperdiet. 

.. raw:: html

  </div>
