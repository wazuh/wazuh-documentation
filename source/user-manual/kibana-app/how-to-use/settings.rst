.. Copyright (C) 2018 Wazuh, Inc.

.. _settings:

Settings
========

The very first time you open the Wazuh APP it will advice you about need a Wazuh API in order to work properly.
You'll be redirected to this section inmediately and a form as the shown bellow will appear to be filled by yourself.

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

You could need to add extra Wazuh API entries cause you could be using more than one Wazuh API.
Just click on `Add new API` and fill the form which will appear.

.. thumbnail:: ../../../images/kibana-app/settings/settings-7.png
    :title: settings-7
    :align: center
    :width: 15%


Extensions
----------

You could have some tabs from Overview and from specific agent views you don't want see. The reason could be different depending on your usage.
You could not want to see PCI tab since it's not relevant for you, just disable it.

.. thumbnail:: ../../../images/kibana-app/settings/settings-3.png
    :title: settings-3
    :align: center
    :width: 100%

The default values you are seeing come from the `config.yml` file of your deployment. Any new Wazuh API added using the form from this section will have 
the default values from that file. Once added, you can change them here. In the above example, we have disabled PCI tab.

You'll be able to change it whenever you want to do it. 

Pattern
-------

Since Kibana uses index patterns to fetch indices from Elasticsearch, the Wazuh APP needs to have a selected index pattern always. By default you'll have 
`wazuh-alerts-3.x-*` which matches all Elasticsearch indices we are creating by default. Of course you could have a different environment, custom indices, etc. then you 
could need a different index pattern. 

.. thumbnail:: ../../../images/kibana-app/settings/settings-4.png
    :title: settings-4
    :align: center
    :width: 100%

Additionally you'll be always able to change it from the top right corner of the Wazuh App, at the main menu bar.

.. thumbnail:: ../../../images/kibana-app/settings/settings-5.png
    :title: settings-5
    :align: center
    :width: 20%

About
-----

Information about the technologies being used, and which is your current environment.

.. thumbnail:: ../../../images/kibana-app/settings/settings-6.png
    :title: settings-6
    :align: center
    :width: 100%