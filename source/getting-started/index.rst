.. Copyright (C) 2018 Wazuh, Inc.

.. _getting_started:

Getting started
===============

.. meta::
  :description: Get started with the Wazuh components and learn how each one is involved.

Wazuh is a security detection, visibility, and compliance open source project. It was born as a fork of OSSEC HIDS, and later was integrated with Elastic Stack and OpenSCAP, evolving into a more comprehensive solution. Below is a brief description of these tools and what they do:

.. image:: ../images/getting_started/wazuh_graphic_poc.png
   :align: center
   :width: 100%

.. topic:: OSSEC HIDS

 `OSSEC HIDS <http://ossec.github.io>`_ is a Host-based Intrusion Detection System (HIDS) used for security detection, visibility, and compliance monitoring. It's based on a multi-platform agent that forwards system data (e.g log messages, file hashes, and detected anomalies) to a central manager, where it is further analyzed and processed, resulting in security alerts. Agents convey event data to the central manager for analysis via a secure and authenticated channel.

 Additionally, OSSEC HIDS provide a centralized syslog server and an agentless configuration monitoring system that provide security insight into the events and changes on agentless devices such as firewalls, switches, routers, access points, network appliances, etc.

.. topic:: OpenSCAP

 `OpenSCAP <https://www.open-scap.org>`_ is an `OVAL <https://oval.mitre.org/>`_ (Open Vulnerability Assessment Language) and `XCCDF <https://scap.nist.gov/specifications/xccdf/>`_ (Extensible Configuration Checklist Description Format) interpreter used to check system configurations and to detect vulnerable applications.

 It's a well-known tool designed to check the security compliance and hardening of systems using industry standard security baselines for enterprise environments.

.. topic:: Elastic Stack

 `Elastic Stack <https://www.elastic.co>`_ is a software suite (Filebeat, Logstash, Elasticsearch, Kibana) used to collect, parse, index, store, search, and present log data. It provides a web front-end that gives a high-level dashboard view of events that allows for advanced analytics and data mining deep into your store of event data.

.. topic:: Table of Contents

 This document will help you understand Wazuh's components and architecture, and will show you some common use cases.

.. toctree::
   :maxdepth: 2

   components
   architecture
   use-cases
