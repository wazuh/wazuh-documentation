.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr:

Using Wazuh for GDPR
========================

The European Union's **General Data Protection Regulation (GDPR)** has been drawn up to agree on data privacy legislation across Europe, with the main aim of providing data protection for all citizens of the European Union. To this end, it seeks to enhance the privacy of such data and also to reform the way in which EU organizations approach data privacy. The GDPR replaces the Data Protection Directive 95/46/EC and was finally approved by the EU Parliament on 14 April 2016 with an implementation date set for 25 May 2018.

* Wazuh for GDPR White Paper `(PDF) <http://ossec.wazuh.com/ruleset/GDPR_Guide.xlsx>`_
* Wazuh for GDPR Guide `(PDF) <http://ossec.wazuh.com/ruleset/GDPR_Guide.xlsx>`_ `(Excel) <http://ossec.wazuh.com/ruleset/GDPR_Guide.xlsx>`_

Introduction
------------

Wazuh supports GDPR compliance by file integrity monitoring, temporary access restrictions, permanent data deletion, policy monitoring, data protection in the processing, audit logs, access management, security breach notices, risk evaluation and security monitoring. With this guide, we can show you how these capabilities provide help for GDPR compliance.

One of the ways in which Wazuh supports the GDPR is through its Ruleset, where it applies the following tagging to those rules that help compliance of the standard:

**Tagging:** The syntax used for rule tagging is **gdpr_** followed by the chapter, article and, where appropriate, the section and paragraph to which the requirement belongs.  (e.g. gdpr_II_5.1.f).

The formal requirements in the content of some chapters of the GDPR are out of the technical scope and therefore are not considered in this document. These chapters are: Chapters I,V,VI,VII,VIII,IX,X,XI.


.. toctree::
    :maxdepth: 1
    :hidden:

    gdpr-II 
    gdpr-III
    gdpr-IV

Contents
--------

* GDPR I
* :ref:`GDPR II <gdpr_II>`
* :ref:`GDPR III <gdpr_III>`
* :ref:`GDPR IV <gdpr_IV>`
* GDPR V
* GDPR VI
* GDPR VII
* GDPR VIII
* GDPR IX
* GDPR X
* GDPR XI
