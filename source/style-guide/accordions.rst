.. _accordions:

=============================
Accordions
=============================

Upgrade the Wazuh Kibana plugin
-------------------------------

.. rst-class:: accordion-section

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

Another accordion
-------------------------------

.. raw:: html

  <div class="accordion-section">

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id eros vitae mi volutpat tincidunt vel sit amet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tincidunt nisl at tellus mattis ultrices. Aenean faucibus mi et ex lacinia imperdiet. 

.. raw:: html

  </div>
  
Accordions inside tabs
-------------------------------

.. tabs::

  .. group-tab:: Accordion

    .. rubric:: This is how accordions looks inside tabs
      :class: h3
    
    .. rst-class:: accordion-section

      #. Remove the old Wazuh Kibana plugin:

         .. code-block:: console


          # cd /usr/share/kibana/
          # sudo -u kibana bin/kibana-plugin remove wazuh


      #. Install the new Wazuh Kibana plugin. Replace the Kibana version if necessary:

          .. code-block:: console

            # cd /usr/share/kibana/
            # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip
            
    This line should be out of the accordion

  .. group-tab:: Another tab


    This is another tab




.. tabs::

  .. group-tab:: Wazuh manager

    .. container:: accordion
    
      .. rubric:: wazuhT.fc
        :class: accordion-title
      
      .. container:: accordion-section

        .. code-block:: console

         /var/ossec/active-response                  gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/active-response/bin(/.*)?        gen_context(system_u:object_r:wazuh_exec_t,s0)
         /var/ossec/agentless(/.*)?                  gen_context(system_u:object_r:wazuh_exec_t,s0)
         /var/ossec/api                              gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/api/configuration(/.*)?          gen_context(system_u:object_r:wazuh_etc_t,s0)
         /var/ossec/api/scripts(/.*)?                gen_context(system_u:object_r:wazuh_exec_t,s0)
         /var/ossec/backup(/.*)?                     gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/bin(/.*)?                        gen_context(system_u:object_r:wazuh_exec_t,s0)
         /var/ossec/etc(/.*)?                        gen_context(system_u:object_r:wazuh_etc_t,s0)
         /var/ossec/framework(/.*)?                  gen_context(system_u:object_r:wazuh_exec_t,s0)
         /var/ossec/integrations(/.*)?               gen_context(system_u:object_r:wazuh_exec_t,s0)
         /var/ossec/lib(/.*)?                        gen_context(system_u:object_r:wazuh_lib_t,s0)
         /var/ossec/logs(/.*)?                       gen_context(system_u:object_r:wazuh_log_t,s0)
         /var/ossec/queue(/.*)?                      gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/ruleset(/.*)?                    gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/stats(/.*)?                      gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/tmp(/.*)?                        gen_context(system_u:object_r:wazuh_tmp_t,s0)
         /var/ossec/var(/.*)?                        gen_context(system_u:object_r:wazuh_var_t,s0)
         /var/ossec/wodles(/.*)?                     gen_context(system_u:object_r:wazuh_exec_t,s0)
    
    .. 
    .. rubric:: wazuhT.fe
      :class: h3
    ..
    .. rst-class:: accordion-section          
      
    ..   test



  .. group-tab:: Wazuh agent



      This is another tab