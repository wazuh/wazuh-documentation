.. _openscap_module:


OpenSCAP
========

The **OpenSCAP wodle** is an integration of `OpenSCAP <https://www.open-scap.org/>`_ with *Wazuh HIDS* that provides the ability to perform configuration and vulnerability scans of an agent. It is primarily used for:

 - Verifying **security compliance**:  OpenSCAP policies define the requirements that all systems in an organization must meet in order to be in line with applicable *security policies* and/or *security benchmarks*.

 - Performing **vulnerability assessments**: OpenSCAP identifies and classifies vulnerabilities in a system.

 - Performing **specialized assessments**: OpenSCAP can perform specific custom system checks (i.e., checking for suspicious file names and suspicious file locations.)

.. topic:: Documentation sections

   .. toctree::
      :maxdepth: 1

      oscap-settings
      oscap-examples
      oscap-faq


Brief introduction to SCAP
--------------------------

 The `Security Content Automation Protocol (SCAP) <https://scap.nist.gov/>`_ is a specification for expressing and manipulating security data in standardized ways. SCAP jointly uses several specifications in order to automate continuous monitoring, vulnerability management, and reporting on results of security compliance scans.

 Components of the security compliance evaluation process:

  - **SCAP scanner**: This is an application that reads a SCAP policy and checks whether or not the system is compliant with it. There are many `tools <https://nvd.nist.gov/scapproducts.cfm>`_ to scan your systems against SCAP policies. This wodle is an integration with the NIST-certified scanner called **OpenSCAP**.

  - **Security policies (SCAP content)**: These determine how a system must be set up and what to check for. These policies contain machine-readable descriptions of the rules which your system will be required to follow.

  - **Profiles**: Each security policy can contain multiple profiles, which provide sets of rules and values in line with a specific security baseline. You can think of a profile as a particular subset of rules within the policy; the profile determines which rules defined in the policy will be actually used and what values will be used during the evaluation.

  - **Evaluation (scan)**: This is the process performed by the OpenSCAP scanner on an agent according to a specific security policy and profile.  It usually takes only a few minutes, depending on the number of rules selected in the profile.

These are the Security Policy includes by default on Wazuh:

+----------+---------+------------------------+----------------+-----+-------------------------+
| SO       | Version | File Name              | Main Profile   | PCI | Vulnerability assessment|
+==========+=========+========================+================+=====+=========================+
| CentOS   | 6       | ssg-centos-6-ds.xml    | Server         |  Y  | N                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| CentOS   | 7       | ssg-centos-7-ds.xml    | Common         |  Y  | N                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| RedHat   | 6       | ssg-rhel-6-ds.xml      | Server         |  Y  | Y                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| RedHat   | 7       | ssg-rhel-7-ds.xml      | Common         |  Y  | Y                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| Debian   | 8       | ssg-debian-8-ds.xml    | Common         |  N  | v 6,7,8.2 y 9           |
+----------+---------+------------------------+----------------+-----+-------------------------+
| Ubuntu   | xenial  | ssg-ubuntu-1604-ds.xml | Common         |  N  | N                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| Ubuntu   | trusty  | cve-debian-oval.xml    | N/A            |  N  | N                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| Ubuntu   | precise | cve-debian-oval.xml    | N/A            |  N  | N                       |
+----------+---------+------------------------+----------------+-----+-------------------------+
| Fedora   | 24      | ssg-fedora-ds.xml      | Common         |  N  | N                       |
+----------+---------+------------------------+----------------+-----+-------------------------+

Requirements
--------------------------

This wodle is executed on the agent, so each agent must meet the following requirements:

Wazuh HIDS
  Wodles are part of *OSSEC Wazuh fork*, so install it following the :ref:`Installation guide <installation>`.


OpenSCAP
  In order to perform SCAP evaluations, we need the scanner. As we mentioned above, we use OpenSCAP. You can install it on Red Hat or CentOS versions 6 or 7 with this command: ::

    yum install openscap-scanner


Python 2.6+
  Python is a core part of this wodle. Currently all Linux distributions come with python, so it should not be an inconvenience.

How it works
--------------------------

.. thumbnail:: ../../../images/manual/policy-compliance/openscap-flow.png
  :title: OpenSCAP
  :align: center
  :width: 100%
