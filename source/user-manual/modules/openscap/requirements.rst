.. _requirements:


Requirements
========================

This wodle is executed on the agent, so each one must meet the following requirements:


Wazuh HIDS
--------------
Wodles are part of *OSSEC Wazuh fork*, so install it following these `instructions <ToDo_Link>`_.


OpenScap
--------------
In order to perform SCAP evaluations we need the scanner. As we mentioned above, we use OpenSCAP. You can install it on RedHat or CentOS versions 6 and 7 with this command: ::

  yum install openscap-scanner


Python 2.6+
--------------
Python is a core part of this wodle. Currently all Linux distributions come with python, so it should not be an inconvenience.
