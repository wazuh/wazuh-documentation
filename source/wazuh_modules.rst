.. _wazuh_modules:

Wazuh Modules
==================================

.. topic:: Introduction

    What is a ``wodle``?

    A ``wodle`` is a play on words of "wazuh" and "module". We have created an entire new daemon, called ``wazuh-modulesd``, which will be in charge of lots of different Wazuh modules. The Wodles tool makes it possible to build new modules outside of OSSEC core.
    So far we have created and implemented the following wodles:

.. toctree::
   :maxdepth: 2

   modules/openscap/openscap
   modules/database

- :ref:`OpenSCAP Integration <openscap_module>`.
- :ref:`Database Synchronization Module <database_module>`.
