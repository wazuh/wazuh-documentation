.. _openscap_module:


OpenSCAP
========

The **OpenSCAP wodle** is an integration of `OpenSCAP <https://www.open-scap.org/>`_ with *Wazuh HIDS* that provides the ability to perform configuration and vulnerability scans of an agent. It is primarily used for:

 - Verifying **security compliance**:  OpenSCAP policies define the requirements that all systems in an organization must meet in order to be in line with applicable *security policies* and/or *security benchmarks*.

 - Performing **vulnerability assessments**: OpenSCAP identifies and classifies vulnerabilities in a system.

 - Performing **specialized assessments**: OpenSCAP can perform specific custom system checks (i.e., checking for suspicious file names and suspicious file locations.)


.. toctree::
  :maxdepth: 2

  how-it-works
  oscap-configuration
  oscap-faq
