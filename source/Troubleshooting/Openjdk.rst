.. Copyright (C) 2018 Wazuh, Inc.

.. _Openjdk:

Openjdk version not compatible
==============================

Currently jdk9+ does not work with logstash. You should uninstall no compatible versions of Openjdk and install openjdk version 8 instead.Check java version as described below:



  .. code-block:: console

    # java -version
   
In case the version shown is build >= 1.9,  it is required to uninstall the version and install version 1.8



.. note::
  It is recommended to restart wazuh manager and agent.
