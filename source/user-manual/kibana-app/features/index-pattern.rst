.. Copyright (C) 2020 Wazuh, Inc.

.. _kibana_index_pattern:

Index pattern selector
======================


Index patterns can be managed in the Stack Management section on Kibana menu. To create a new index pattern follow the instructions below: 

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/stack_management.png
  :align: center
  :width: 100%

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/new_index_pattern.png
  :align: center
  :width: 100%

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/new_index_pattern_step1.png
  :align: center
  :width: 100%

Make sure to use ``timestamp`` as the *Time field* to properly order the alerts by creation date.

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/new_index_pattern_step2.png
  :align: center
  :width: 100%

Is more than one compatible index pattern to choose from, a index pattern selector becomes available on the Wazuh Kibana plugin menu:

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/index-pattern-selector.png
  :align: center
  :width: 100%