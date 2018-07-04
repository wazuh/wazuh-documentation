.. Copyright (C) 2018 Wazuh, Inc.

.. _settings:

Settings
========

The first time you open the Wazuh APP it will advice you about introducing a Wazuh API in order for it to work properly.
You'll be redirected to this section inmediately and a form as the shown bellow will appear.

.. thumbnail:: ../../../images/kibana-app/settings/settings-1.png
    :title: settings-1
    :align: center
    :width: 100%

Once done, you should see something like the next picture:

.. thumbnail:: ../../../images/kibana-app/settings/settings-2.png
    :title: settings-2
    :align: center
    :width: 100%

Edit an existing Wazuh API
--------------------------

Look at your desired Wazuh API and click on the pencil icon to edit it.

.. thumbnail:: ../../../images/kibana-app/settings/settings-8.png
    :title: settings-8
    :align: center
    :width: 15%

You'll see a form as the shown bellow, once done click on `Update API` button to save it.

.. thumbnail:: ../../../images/kibana-app/settings/settings-9.png
    :title: settings-9
    :align: center
    :width: 100%

Adding more than one Wazuh API
------------------------------

You can add extra Wazuh API entries.
Just click on `Add new API` and fill the form.

.. thumbnail:: ../../../images/kibana-app/settings/settings-7.png
    :title: settings-7
    :align: center
    :width: 15%


Extensions
----------

You can enable and disable specific tabs from Overview and a specific agent view. 
For example, you may not want to see the PCI tab since it's not relevant for you.

.. thumbnail:: ../../../images/kibana-app/settings/settings-3.png
    :title: settings-3
    :align: center
    :width: 100%

The default values for the extensions are configured in the `config.yml` file. 

Any new Wazuh API added using the form from this section will have the default values from that file. 

Once added, you can change them here. In the above example, we have disabled PCI tab.

Pattern
-------

You can select the index-pattern used by the Wazuh app in all of the different visualizations and discover tabs it uses.

By default it's `wazuh-alerts-3.x-*` which matches all Elasticsearch indices Wazuh creates using a default installation. 

.. thumbnail:: ../../../images/kibana-app/settings/settings-4.png
    :title: settings-4
    :align: center
    :width: 100%

Additionally you can change the index-pattern from the top right corner of the Wazuh App in the main menu bar.

.. thumbnail:: ../../../images/kibana-app/settings/settings-5.png
    :title: settings-5
    :align: center
    :width: 20%

About
-----

Information about Wazuh and Wazuh app version.

.. thumbnail:: ../../../images/kibana-app/settings/settings-6.png
    :title: settings-6
    :align: center
    :width: 100%
    