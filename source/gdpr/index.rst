.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr:

Using Wazuh for GDPR
========================

The European Union's **General Data Protection Regulation (GDPR)** has been drawn up to agree on data privacy legislation across Europe, with the main aim of providing data protection for all citizens of the European Union. To this end, it seeks to enhance the privacy of such data and also to reform the way in which EU organizations approach data privacy. The GDPR replaces the Data Protection Directive 95/46/EC and was finally approved by the EU Parliament on 14 April 2016 with an implementation date set for 25 May 2018.

* Wazuh for GDPR White Paper `(PDF) <http://ossec.wazuh.com/ruleset/GDPR_Guide.xlsx>`_
* Wazuh for GDPR Guide `(PDF) <http://ossec.wazuh.com/ruleset/GDPR_Guide.xlsx>`_ `(Excel) <http://ossec.wazuh.com/ruleset/GDPR_Guide.xlsx>`_

Introduction
------------

Wazuh has the capacity to support GDPR compliance, helping with most technical requirements. The personal data of subjects under the protection of the GDPR will be controlled with the file monitoring offered by Wazuh, as well as protected by the detection of anomalies and intrusions that Wazuh faces. It also has the ability to monitor compliance with security policies and provide various logs on events that occur in the environment where personal data is processed and stored. 


One of the ways in which Wazuh supports the GDPR is through its Ruleset, where it applies the following tagging to those rules that help compliance of the standard. The syntax used for rule tagging is **gdpr_** followed by the chapter, article and, where appropriate, the section and paragraph to which the requirement belongs.  (e.g. gdpr_II_5.1.f).


The formal requirements in the content of some chapters of the GDPR are out of the technical scope and therefore are not considered in this document. 


.. toctree::
    :maxdepth: 1
    :hidden:

    gdpr-II 
    gdpr-III
    gdpr-IV

Contents
--------

The technical requirements that Wazuh supports can be found in the following chapters: 

* :ref:`GDPR II, Principles <gdpr_II>`
* :ref:`GDPR III, Rights of the data subject <gdpr_III>`
* :ref:`GDPR IV, Controller and processor <gdpr_IV>`


