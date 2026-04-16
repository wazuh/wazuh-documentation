.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR (The General Data Protection Regulation of the European Union). 
  
Using Wazuh for GDPR compliance
===============================

The European Union's General Data Protection Regulation (GDPR) was created to establish a harmonized data privacy framework across Europe. Its primary focus is protecting the data of European Union citizens. The regulation aims to improve user data privacy and reform the way European Union organizations approach it.

Wazuh assists with GDPR compliance by performing log collection, file integrity monitoring, configuration assessment, intrusion detection, real-time alerting, and automated threat response.

Wazuh includes default rules and decoders for detecting various attacks, system errors, security misconfigurations, and policy violations. By default, these rules are mapped to the associated GDPR requirements. It’s possible to map your custom rules to one or more GDPR requirements by adding the compliance identifier in the ``<group>`` tag of the rule. The syntax for mapping a rule to a GDPR requirement is ``gdpr_`` followed by the chapter, the article, and, if applicable, the section and paragraph to which the requirement applies. For example, ``gdpr_II_5.1.f``. Refer to the :ref:`ruleset section <rules_group>` for more information.

The `Wazuh for GDPR white paper (PDF) <https://wazuh.com/resources/Wazuh_GDPR_White_Paper.pdf>`__ guide explains how Wazuh modules assist with GDPR compliance. This document doesn’t cover the GDPR formal requirements because it’s outside of its technical scope.

You can find technical requirements that Wazuh supports in the following sections:

.. toctree::
   :maxdepth: 1

   gdpr-II
   gdpr-III
   gdpr-IV
