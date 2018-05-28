.. Copyright (C) 2018 Wazuh, Inc.

.. _gdpr:

Using Wazuh for GDPR
========================

The European Union's **General Data Protection Regulation (GDPR)** has been drawn up to agree on data privacy legislation across Europe, with its main focus on providing data protection for all citizens in the European Union. 

To this end, it seeks to enhance the privacy of such data and to reform the way in which EU organizations approach data privacy. 

* Wazuh for GDPR White Paper `(PDF) <https://wazuh.com/resources/Wazuh_GDPR_White_Paper.pdf>`_

Introduction
------------

Wazuh takes advantage of its file integrity monitoring and access control capabilities coupled with a new tagging in Wazuh ruleset. Rules in compliance with a specific GDPR technical requirement have a tag describing it.

The syntax used for rule tagging is **gdpr_** followed by the chapter, article and, where appropriate, the section and paragraph to which the requirement belongs. (e.g. gdpr_II_5.1.f).

GDPR formal requirements content are out of the technical scope and therefore are not considered in this document. 

Contents
--------

The technical requirements that Wazuh supports can be found in the following chapters: 

.. toctree::
    :maxdepth: 1

    gdpr-II 
    gdpr-III
    gdpr-IV
