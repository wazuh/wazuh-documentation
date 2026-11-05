.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema (WCS) event fields, grouped by field set: the wazuh, threat, and process field sets, and all other ECS and WCS field sets.

.. _reference_wcs_event_fields:

Event fields
============

Event fields describe the normalized events that Wazuh stores in the ``wazuh-events-v5-<CATEGORY>`` data streams. The tables come from the `fields.csv <|WCS_FIELDS_PAGE_URL|>`__ file of the main WCS module, grouped by field set.

Each field set starts with a one-sentence description of the field set. ECS field sets use their short description from `ECS 9.1.0 <https://github.com/elastic/ecs/tree/v9.1.0/schemas>`__. The field sets that WCS adds use the following descriptions:

-  ``wazuh``: Fields Wazuh adds to describe how it collected and processed the event.
-  ``check``: The results of Security Configuration Assessment (SCA) checks, including the condition, the result, the rationale, and the remediation.
-  ``policy``: The SCA policies that group the checks.
-  ``compliance``: The compliance requirements an event relates to.
-  ``mitre``: The MITRE ATT&CK tactics, techniques, and subtechniques an event relates to.

The three largest field sets, ``wazuh``, ``threat``, and ``process``, have their own pages. The other field sets share two pages in alphabetical order.

Field sets
----------

.. wcs-field-tables:: stateless/events/main
   :summary:

.. toctree::
   :maxdepth: 1

   wazuh-field-set
   threat-field-set
   process-field-set
   other-field-sets-a-m
   other-field-sets-n-z
