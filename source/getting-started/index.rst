.. Copyright (C) 2020 Wazuh, Inc.

.. _getting_started:

Getting started
===============

.. meta::
  :description: Get started with the Wazuh components and learn how each one is involved.

Wazuh is a threat detection, integrity monitoring, incident response and regulatory compliance platform. It is capable of protecting workloads across on-premise, virtualized, containerized and cloud-based environments. Wazuh project is completely free open source, and currently used by thousands of organizations around the world, from small businesses to large enterprises.

Wazuh platform is composed of two tightly integrated technologies: our easily deployed lightweight agent, and our centralized and intelligent analysis engine, also known as the Wazuh server. Besides, Wazuh has been fully integrated with the Elastic Stack, providing a search engine and data visualization tool that allows users to navigate through their security alerts.

Wazuh agent runs on most operating systems, including Linux, Windows, macOS, Solaris, AIX and others. It is installed on endpoints, such as laptops, desktops, servers, cloud instances or virtual machines, and provides detection and prevention capabilities, while also collects and streams data to the Wazuh server, where security analysis takes place.

Our centralized components, the Wazuh server and Elastic Stack, have been designed to scale, supporting cluster configurations and providing high-availability and load balancing. These two technologies continually collect, process, analyze, correlate and normalize data received from the agents or from integrations with external sources such as network devices, cloud applications or external APIs.

.. topic:: Table of Contents

 This document provides an overview of the Wazuh platform components and architecture, and a brief description of some of the most common use cases of the solution.

.. toctree::
   :maxdepth: 1

   introduction
   components
   architecture
   use-cases
