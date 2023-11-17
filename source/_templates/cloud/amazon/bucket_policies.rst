.. Copyright (C) 2022 Wazuh, Inc.

.. include:: /_templates/cloud/amazon/read_only_policy_description.rst

.. code-block:: json

    {
	"Version": "2012-10-17",
	"Statement": [
	    {
		"Sid": "VisualEditor0",
		"Effect": "Allow",
		"Action": [
		    "s3:GetObject",
		    "s3:ListBucket"
		],
		"Resource": [
		    "arn:aws:s3:::<bucket-name>/*",
		    "arn:aws:s3:::<bucket-name>"
		]
	    }
	]
    }

.. include:: /_templates/cloud/amazon/delete_policy_description.rst

.. code-block:: json

   {
	"Version": "2012-10-17",
	"Statement": [
	    {
		"Sid": "VisualEditor0",
		"Effect": "Allow",
		"Action": [
		    "s3:GetObject",
		    "s3:ListBucket",
		    "s3:DeleteObject"
		],
		"Resource": [
		    "arn:aws:s3:::<bucket-name>/*",
		    "arn:aws:s3:::<bucket-name>"
		]
	    }
	]
    }

.. note:: ``<bucket-name>`` is a placeholder, replace it with the name of the bucket where you want to fetch the logs from.

.. End of include file
