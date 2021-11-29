.. _step_cards:

=============================
Step cards
=============================

.. rst-class:: step-card

Next steps - 1
--------------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the Wazuh agent section.

.. rst-class:: step-card

Next steps - 2
--------------

You can now proceed with the Wazuh server installation. To do so, choose the cluster mode.

- Wazuh single-node cluster
- Wazuh multi-node cluster

.. rst-class:: step-card

Next steps - 3
--------------

The Wazuh manager is now successfully upgraded. To check if your version of Elastic Stack is compatible with the new Wazuh version, check our compatibility matrix. 

- To upgrade Elastic Stack, follow the instructions in the Upgrading Elasticsearch, Kibana and Filebeat section.
- If you are going to keep the same version of Elastic Stack, unfold the next section and follow the instructions to replace the Wazuh Kibana plugin.  

Upgrade the Wazuh Kibana plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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


This is a random accordion
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: accordion-section

This is a random paragraph
