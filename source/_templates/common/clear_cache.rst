.. Copyright (C) 2022 Wazuh, Inc.

.. tabs::

  .. group-tab:: Chromium browser

    #. Open the web browser and press F12 to access the **DevTools** pane.

    #. Click the **Network** tab and then check the **Disable cache** option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable-cache-chromium.png
        :title: Disable cache Chromium
        :align: left
        :width: 100%

  .. group-tab:: Firefox browser

    #. Open your browser and press F12 to access the **DevTools**  pane.

    #. Click the **Network** tab and then check the **Disable cache** option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable-cache-firefox.png
        :title: Disable cache Firefox
        :align: left
        :width: 100%

  .. group-tab:: Safari browser

    #. To enable the **Develop** tools, follow these steps: 
      
      #. Go to the Safari settings gear icon and click **Preferences**.
    
      #. Click the **Advanced** tab to open the pane and check the **Show Develop menu in menu bar** option.

      #. Close the **Preferences** window.

      #. Check if the browser’s menu bar is enabled. If not, go to the Safari settings gear icon and click **Show Menu Bar**.

    #. Click the **Develop** tab on the menu bar and click **Show Web Inspector** to open the web inspector pane.

    #. Click the **Network** tab and then check the **Ignore cache when loading resources** option.

      .. thumbnail:: ../../images/kibana-app/troubleshooting/disable-cache-safari.png
        :title: Disable cache Safari
        :align: left
        :width: 100%


After following these steps, refresh the page and close the browser.

.. End of include file
