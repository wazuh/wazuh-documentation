.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn the directory structure and filename format that Wazuh Cloud uses to store archive data in AWS S3.

.. _cloud_archive_data_filename_format:

Filename format
===============

Wazuh Cloud stores archive data files in a directory structure that indicates the date and time each file was delivered. This page describes the path and filename format so you can locate and process the files.

.. TODO: Confirm with engineering the archive data path and filename format for 5.0 environments. The bucket and prefix wazuh-cloud-cold-<REGION>/<CLOUD_ID> are confirmed in code; the category, subcategory, and filename layout below are carried over from 4.x.

The path follows this format:

``wazuh-cloud-cold-<REGION>/<CLOUD_ID>/<CATEGORY>[/<SUBCATEGORY>]/<YEAR>/<MONTH>/<DAY>``

Each file has the following name:

``<CLOUD_ID>_<CATEGORY>[_<SUBCATEGORY>]_<YYYYMMDDTHHmm>_<UniqueString>.<FORMAT>``

The following table describes each field.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   -  -  Field
      -  Description
   -  -  ``<REGION>``
      -  The region where the environment is located, for example, ``us-east-1``.
   -  -  ``<CLOUD_ID>``
      -  The Cloud ID of the environment.
   -  -  ``<CATEGORY>``
      -  The category of the file. The value is ``output``.
   -  -  ``<SUBCATEGORY>``
      -  Used only by the ``output`` category. The value is ``alerts`` or ``archives``.
   -  -  ``<YEAR>``
      -  The year when the file was delivered.
   -  -  ``<MONTH>``
      -  The month when the file was delivered.
   -  -  ``<DAY>``
      -  The day when the file was delivered.
   -  -  ``<YYYYMMDDTHHmm>``
      -  The year, month, day, hour, and minute when the file was delivered. Hours are in 24-hour format and in UTC. A file delivered at a specific time can contain records written at any point before that time.
   -  -  ``<UniqueString>``
      -  A 16-character string that prevents files from being overwritten. It has no meaning, and log processing software should ignore it.
   -  -  ``<FORMAT>``
      -  The encoding of the file. The value is ``json.gz`` for output files, which are JSON text files compressed with gzip, and ``tar.gz`` for configuration files.

For example, the following file contains alerts of the environment ``0123456789ab`` delivered on April 19, 2024, at 20:50 UTC:

``wazuh-cloud-cold-us-east-1/0123456789ab/output/alerts/2024/04/19/0123456789ab_output_alerts_20240419T2050_VqaWCpX9oPfDkRpD.json.gz``
