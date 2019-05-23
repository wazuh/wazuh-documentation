.. Copyright (C) 2019 Wazuh, Inc.

.. _connect_kibana_app:

Setting up the app
==================

The Wazuh app for Kibana lets you visualize and analyze Wazuh alerts stored in Elasticsearch. You can obtain statistics per agent, search alerts and filter using different visualizations. It integrates with the Wazuh API to retrieve information about manager and agents configuration, logs, ruleset, groups and much more.

To install the app, you can follow our Elastic Stack installation guides (for :ref:`RPM <install_kibana_app_rpm>` or :ref:`Debian <install_kibana_app_deb>` systems).

Follow these steps to register the Wazuh API with the Wazuh app in Kibana:

1. Open Kibana in your desired web browser. Then, from the left menu, click on the Wazuh app icon.
2. Open the *Settings* page with the gear icon on the top right corner (the first time you open the app, you’ll be automatically redirected to Settings). Fill in the required fields in the form and click *Save*.
3. Now, the app is ready to be used.

If you want to learn more about the app capabilities, go to the :ref:`kibana_features` section to see useful information about it.
