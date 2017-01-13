.. _introduction:


Brief introduction to SCAP
==========================================

The `Security Content Automation Protocol (SCAP) <https://scap.nist.gov/>`_ is a specification for expressing and manipulating security data in standardized ways. SCAP uses several individual specifications in concert, in order to automate continuous monitoring, vulnerability management, and security policy compliance evaluation reporting.

Process of security compliance evaluation:

 - **SCAP scanner**: It is an application that reads a SCAP policy and checks whether or not the system is compliant with it. There are many `tools <https://nvd.nist.gov/scapproducts.cfm>`_ to scan your systems. This wodle is an integration with the NIST-certified scanner: **OpenSCAP**.

 - **Security policies (SCAP content)**: They determine how a system must be set up and what to check for. These policies contain machine-readable descriptions of the rules which your system will be required to follow.

  - **Profiles**: Each security policy can contain multiple profiles, which provide sets of rules and values implemented according to a specific security baseline. You can think of a profile as a particular subset of rules within the policy; the profile determines which rules defined in the policy are selected (checked) and what values are used during the evaluation.

 - **Evaluation (scan)**: It is the process to evaluate a policy with a SCAP scanner. The process usually takes a few minutes, depending on the number of selected rules.
