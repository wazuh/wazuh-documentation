.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR (The General Data Protection Regulation of the European Union). 
  
.. _gdpr:

Using Wazuh for GDPR
====================

The **General Data Protection Regulation** of the European Union (GDPR) has been drawn up in order to agree on data privacy legislation throughout Europe, focusing mainly on the protection of the data of all citizens of the European Union.

For that purpose, this regulation seeks to improve the privacy of such data and reform the way in which European Union organizations approach data privacy.

* Wazuh for GDPR White Paper `(PDF) <https://wazuh.com/resources/Wazuh_GDPR_White_Paper.pdf>`_

Introduction
------------

Wazuh uses its file integrity control and access control capabilities, along with a new tagging in the Wazuh ruleset. Rules that meet a specific GDPR technical requirement of the GDPR have a label that identifies them.

The syntax used for rule tagging is **gdpr_** followed by the chapter, the article and, if applicable, the section and paragraph to which the requirement belongs. (e.g. gdpr_II_5.1.f).

GDPR formal requirements content is outside the technical scope and, therefore, is not covered in this document.

Contents
--------

The technical requirements that Wazuh supports can be found in the following chapters:

.. toctree::
    :maxdepth: 1

    gdpr-II
    gdpr-III
    gdpr-IV
