.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::

  .. group-tab:: Chromium browser

    #. Open the web browser and press F12 to access the **DevTools” pane.


    #. Click the **Network** tab and then check the ``Disable cache`` option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable_cache_chromium.png
        :title: Disable cache Chromium
        :align: left
        :width: 100%

  .. group-tab:: Firefox browser

    #. Open your browser and press F12 to access the **DevTools” pane.


    #. Click the **Network** tab and then check the ``Disable cache`` option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable_cache_firefox.png
        :title: Disable cache Firefox
        :align: left
        :width: 100%

  .. group-tab:: Safari browser

    #. Enable the **develop** tools: 
      
      #. Select the ``Safari`` menu, then choose ``Preferences``.
    
      #. Select the ``Advanced`` tab and check the ``Show Develop menu in menu bar`` option.

      #. Close the Preferences window.

      #. If you don’t have the Menu Bar enabled, select the settings gear, then choose ``Show Menu Bar``.

    #. Open the **web inspector**: open the ``Develop`` menu, then choose ``Show Web Inspector``.

    #. Go to the **network** tab: check the ``Ignore cache when loading resources`` option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable_cache_safari.png
        :title: Disable cache Safari
        :align: left
        :width: 100%


After following these steps, refresh the page. Now you can close the ``browser DevTools``.

.. End of include file
