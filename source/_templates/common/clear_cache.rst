.. Copyright (C) 2021 Wazuh, Inc.

.. tabs::

  .. group-tab:: Chromium browser

    1. **Open the browser DevTools:** press F12.

    2. **Go to the network tab:** check the ``Disable cache`` option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable_cache_chromium.png
        :title: Disable cache Chromium
        :align: left
        :width: 100%

  .. group-tab:: Firefox browser

    1. **Open the browser DevTools:** press F12.

    2. **Go to the network tab:** check the ``Disable cache`` option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable_cache_firefox.png
        :title: Disable cache Firefox
        :align: left
        :width: 100%

  .. group-tab:: Safari browser

    1. **Enable the develop tools**: 
      
      #. Select the ``Safari`` menu, then choose ``Preferences``.
    
      #. Select the ``Advanced`` tab and check the ``Show Develop menu in menu bar`` option.

      #. Close the Preferences window.

      #. If you don’t have the Menu Bar enabled, select the settings gear, then choose ``Show Menu Bar``.

    2. **Open the web inspector:** open the ``Develop`` menu, then choose ``Show Web Inspector``.

    3. **Go to the network tab:** check the ``Ignore cache when loading resources`` option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable_cache_safari.png
        :title: Disable cache Safari
        :align: left
        :width: 100%


After following these steps, refresh the page. Now you can close the ``browser DevTools``.

.. End of include file
