.. Copyright (C) 2015, Wazuh, Inc.

.. _custom-wpk-creation:

Custom WPK packages creation
============================

.. _create-wpk-key:

Get an X509 certificate and CA
------------------------------

To create a WPK package it is required to have an X509 certificate and CA if you already have it jump to the next :ref:`section <build-wpk-package>`, if you don't, follow these steps:

Create root CA

.. code-block:: console

  # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout wpk_root.key -out wpk_root.pem -batch

Create a certificate and key

.. code-block:: console

  # openssl req -new -nodes -newkey rsa:2048 -keyout wpkcert.key -out wpkcert.csr -subj '/C=US/ST=CA/O=Wazuh'

Set the location as follows:

 - ``/C=US`` is the country.
 - ``/ST=CA`` is the state.
 - ``/O=Wazuh`` is the organization's name.

Sign this certificate with the root CA

.. code-block:: console

  # openssl x509 -req -days 365 -in wpkcert.csr -CA wpk_root.pem -CAkey wpk_root.key -out wpkcert.pem -CAcreateserial


.. _build-wpk-package:

Build the WPK package
---------------------

There are two different ways of creating a WPK, you can do it manually or you can use our automated method using docker:

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        /development/packaging/generate-wpk-package
        generate-wpk-package-manually
