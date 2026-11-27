.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC Risk Assessment (RA) requirements, with use cases for prioritizing and tracking the remediation of vulnerabilities.

Risk Assessment (RA)
====================

RA.L2-3.11.2 Vulnerability Scan
-------------------------------

RA.L2-3.11.2 requires you to scan for vulnerabilities in your systems and applications periodically and when new vulnerabilities that affect them are identified.

Scanning only helps if you can act on the results, starting with the critical vulnerabilities that a patch fixes.

Wazuh helps meet RA.L2-3.11.2 with the Vulnerability Detection module. It correlates the software inventory of each endpoint with the vulnerability content of Wazuh Cyber Threat Intelligence (CTI) and updates the results when the inventory or the vulnerability content changes.

Use case: Prioritizing critical vulnerabilities that have a fix
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find the critical vulnerabilities of an Ubuntu endpoint that a package upgrade fixes.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Vulnerability Detection**.

#. Click **Explore agent** and select the Ubuntu endpoint. The **Dashboard** tab shows the vulnerabilities by severity, the top vulnerable packages, and the most common vulnerability scores.

   .. thumbnail:: /images/compliance/cmmc/vulnerability-detection-dashboard.png
      :title: Vulnerability Detection dashboard
      :alt: Vulnerability Detection dashboard
      :align: center
      :width: 80%

#. Switch to the **Inventory** tab. In **Severity**, select **Critical**.

#. Check the ``vulnerability.scanner.condition`` column. A condition such as ``Fixed in 157.0`` means that a fixed version exists, so upgrading the package removes the vulnerability.

   .. thumbnail:: /images/compliance/cmmc/vulnerability-detection-inventory.png
      :title: Critical vulnerabilities in the inventory
      :alt: Critical vulnerabilities in the inventory
      :align: center
      :width: 80%

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Upgrade the vulnerable package on the endpoint. For example, for a Debian package:

   .. code-block:: console
      :emphasize-lines: 2

      $ sudo apt-get update
      $ sudo apt-get install --only-upgrade <PACKAGE_NAME>

   Replace ``<PACKAGE_NAME>`` with the name of the vulnerable package. After the next inventory scan, Wazuh generates a ``Wazuh VD - Vulnerability <CVE_ID> remediated`` finding for each vulnerability that the upgrade resolves. To see these findings, follow the RA.L2-3.11.3 use case.

RA.L2-3.11.3 Vulnerability Remediation
--------------------------------------

RA.L2-3.11.3 requires you to remediate vulnerabilities in accordance with risk assessments.

Remediation must be visible, so that you can show assessors which vulnerabilities you fixed and when.

Wazuh helps meet RA.L2-3.11.3 by generating a finding when a vulnerability is remediated.

Use case: Tracking the remediation of vulnerabilities
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh records each vulnerability that you remediate. You remove an old Linux kernel from an Ubuntu 24.04 endpoint. Ubuntu keeps the previous kernel after a kernel upgrade, and its vulnerabilities stay on the endpoint until you remove it.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Check the running kernel and the installed kernel packages on the Ubuntu endpoint:

   .. code-block:: console

      $ uname -r
      $ dpkg -l 'linux-image-*' | grep ^ii

   Don't remove the kernel that ``uname -r`` shows. If the endpoint has only one kernel, remove another vulnerable package that you don't need instead. The **Inventory** tab of **Vulnerability Detection** lists the vulnerable packages.

#. Remove the packages of the old kernel:

   .. code-block:: console

      $ sudo apt-get purge -y linux-image-<OLD_KERNEL_VERSION> linux-modules-<OLD_KERNEL_VERSION> linux-headers-<OLD_KERNEL_VERSION>

   Replace ``<OLD_KERNEL_VERSION>`` with the version of the old kernel, for example ``7.0.0-42-generic``.

#. Restart the Wazuh agent to run a new inventory scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

   Wazuh can take a few minutes to mark the vulnerabilities of the removed packages as remediated.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰), go to **Threat intelligence** > **Vulnerability Detection**, click **Explore agent**, and select the Ubuntu endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:*remediated* and package.name:linux-image-<OLD_KERNEL_VERSION>

   Wazuh generates a ``Wazuh VD - Vulnerability <CVE_ID> remediated`` finding for each vulnerability of the removed package. If you removed another package, use its name in the query.

   .. thumbnail:: /images/compliance/cmmc/remediated-vulnerability-findings.png
      :title: Remediated vulnerability findings
      :alt: Remediated vulnerability findings
      :align: center
      :width: 80%

#. Expand a finding and scroll down to the ``wazuh.rule.compliance.cmmc`` field. The finding maps to AU.L2-3.3.1, CA.L2-3.12.1, RA.L2-3.11.1, RA.L2-3.11.3, and SI.L2-3.14.1.

   .. thumbnail:: /images/compliance/cmmc/remediated-vulnerability-cmmc.png
      :title: CMMC requirements of a remediated vulnerability finding
      :alt: CMMC requirements of a remediated vulnerability finding
      :align: center
      :width: 80%
