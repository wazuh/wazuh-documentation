.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh rules are used by the Wazuh manager to detect specific patterns or behaviors within log messages and generate alerts or responses accordingly. learn more in this section of the documentation.

Rules
=====

Wazuh rules are a set of conditions written in XML format that define how log data should be interpreted. These rules are used by the Wazuh manager to detect specific patterns or behaviors within log messages and generate alerts or responses accordingly. They play a crucial role in threat detection, as they allow the system to identify potential security incidents based on predefined criteria. 

Each rule typically consists of elements such as ``<rule>``, ``<description>``, ``<group>`` and ``<field>``, among others. In which, the ``<description>`` element provides a clear explanation of the rule's purpose and functionality. Within the ``<group>`` element, rules are categorized based on their relevance or priority and the ``<field>`` element specifies the log data fields to be evaluated for matching conditions. Overall, the rules syntax in Wazuh facilitates the precise definition of criteria for detecting specific patterns or behaviors in log messages, contributing to effective threat detection and response mechanisms. For more information, take a look at the :doc:`rule syntax <../ruleset-xml-syntax/rules>` documentation.

Additionally, each rule is assigned an ID and a level. The rule's level determines the severity of the alert triggered when the rule conditions are met. Levels range from 0 (ignored) to 16 (severe attack), with each level indicating a different level of security relevance. For detailed information, refer to the :doc:`rules classification <rules-classification>` section.

.. toctree::
   :maxdepth: 1

   default
   custom
   rules-classification
