.. Copyright (C) 2018 Wazuh, Inc.

.. _manager_ruleset_section:

Ruleset
=======

Here you'll see all related to the Wazuh ruleset. It includes rules and decoders.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset.png
  :align: center
  :width: 100%

Changing between rules and decoders
-----------------------------------

By default you'll see the rules. To see the decoders click on the decoders button. To come back to rules click 
on the rules button.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset-1.png
  :align: center
  :width: 20%

Filter rules using the search bar
---------------------------------

The search bar you'll find at the top of the ruleset provides you a powerful searching tool. It accepts some Lucene like queries.
It gives you suggestions while you are typing and allows you to switch between rules quickly.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset-search.png
  :align: center
  :width: 100%

Lucene like syntax queries using the search bar
------------------------------------------

You could use the next queries to filter your rules:

.. code-block:: console

    group: syslog
    level: 7
    pci: 10.6.1
    gdpr: IV_35.7.d

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset-filters.png
  :align: center
  :width: 100%

Multiple filters could be added, see above screenshot.

Rule detail
-----------

Once you click specific rule, it will appear a new detail view for that rule.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset-detail.png
  :align: center
  :width: 100%

Clickable elements will apply a filter to continue searching rules.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset-detail-2.png
  :align: center
  :width: 100%

At the bottom you'll see related rules to the selected rule to quickly switch between them.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-ruleset-detail-3.png
  :align: center
  :width: 100%

Filter decoders using the search bar
---------------------------------

The search bar you'll find at the top of the decoders list provides you a powerful searching tool.
It gives you suggestions while you are typing and allows you to switch between rules quickly. 

.. thumbnail:: ../../../../images/kibana-app/manager/decoders-1.png
  :align: center
  :width: 100%

Filter decoders by its nature
-----------------------------

Since decoders could be parents or child from a parent decoder the Wazuh App provides a selector to filter decoders by its nature.

.. thumbnail:: ../../../../images/kibana-app/manager/decoders-2.png
  :align: center
  :width: 20%

Decoder detail
--------------

Once you select a specific decoder, you'll see a detail view with the details of the selected decoder.

.. thumbnail:: ../../../../images/kibana-app/manager/decoders-3.png
  :align: center
  :width: 100%