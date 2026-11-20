.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review the invoices issued to your Wazuh Console organization, check their payment status, and download them as PDF files.

.. _cloud_billing_invoices:

Invoices
========

The **Invoices** page lists every invoice issued to your organization for Wazuh Cloud environments and Wazuh CTI feed subscriptions. This page describes the information it shows and how to download an invoice.

You need the Editor role to open this page.

Viewing your invoices
---------------------

#. In the sidebar, under **Billing**, select **Invoices**.

The page shows the following columns:

+------------+------------------------------------------------------------------------------+
| Column     | Description                                                                  |
+============+==============================================================================+
| **Number** | The invoice number.                                                          |
+------------+------------------------------------------------------------------------------+
| **Status** | The payment status of the invoice. See `Invoice statuses`_.                  |
+------------+------------------------------------------------------------------------------+
| **Issued** | The date the invoice was issued.                                             |
+------------+------------------------------------------------------------------------------+
| **Due**    | The date the invoice must be paid by.                                        |
+------------+------------------------------------------------------------------------------+
| **Total**  | The total amount of the invoice.                                             |
+------------+------------------------------------------------------------------------------+
| **Period** | The service period that the invoice covers.                                  |
+------------+------------------------------------------------------------------------------+

Click the **Number**, **Total**, or **Period** column header to sort the list by that column.

Invoice statuses
^^^^^^^^^^^^^^^^

+----------------------+----------------------------------------------------------------------+
| Status               | Description                                                          |
+======================+======================================================================+
| **Draft**            | The invoice is being prepared and isn't final yet.                   |
+----------------------+----------------------------------------------------------------------+
| **Awaiting payment** | The invoice is issued and waiting to be paid.                        |
+----------------------+----------------------------------------------------------------------+
| **Overdue**          | The invoice is waiting to be paid, and its due date has passed.      |
+----------------------+----------------------------------------------------------------------+
| **Paid**             | The invoice is paid.                                                 |
+----------------------+----------------------------------------------------------------------+
| **Written off**      | The invoice is considered uncollectible.                             |
+----------------------+----------------------------------------------------------------------+
| **Voided**           | The invoice is canceled and isn't payable.                           |
+----------------------+----------------------------------------------------------------------+

To pay an overdue amount, see :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.

Downloading an invoice
----------------------

#. In the sidebar, under **Billing**, select **Invoices**.
#. Find the invoice and click the download icon (**Download PDF**) in its row.

Your browser downloads the invoice as a PDF file. The download icon appears only for invoices that have a PDF file available.
