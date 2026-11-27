.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the NIST SP 800-171 Risk Assessment requirements 3.11.2 and 3.11.3 with Vulnerability Detection use cases.

Risk Assessment (3.11)
======================

3.11.2 Scan for vulnerabilities
-------------------------------

Requirement 3.11.2 states, "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities affecting those systems and applications are identified."

Wazuh helps meet requirement 3.11.2 with the Vulnerability Detection module. It correlates each endpoint's software inventory with Wazuh CTI vulnerability content. It updates the results when the inventory or the vulnerability content changes.

Use case: Prioritizing critical vulnerabilities that have a fix
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find the critical vulnerabilities of an Ubuntu endpoint that a package upgrade fixes.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Vulnerability Detection**.

#. Click **Explore agent** and select the Ubuntu endpoint. The **Dashboard** tab shows the vulnerabilities by severity, the top vulnerable packages, and the most common vulnerability scores.

   .. thumbnail:: /images/compliance/nist-800-171/vulnerability-detection-dashboard.png
      :title: Vulnerability Detection dashboard
      :alt: Vulnerability Detection dashboard
      :align: center
      :width: 80%

#. Switch to the **Inventory** tab. In **Severity**, select **Critical**.

#. Check the ``vulnerability.scanner.condition`` column. A condition such as ``Fixed in 157.0`` means that a fixed version exists, so upgrading the package removes the vulnerability.

   .. thumbnail:: /images/compliance/nist-800-171/critical-vulnerabilities-fixed-condition.png
      :title: Critical vulnerabilities with a fixed version
      :alt: Critical vulnerabilities with a fixed version
      :align: center
      :width: 80%

3.11.3 Remediate vulnerabilities
--------------------------------

Requirement 3.11.3 states, "Remediate vulnerabilities in accordance with risk assessments."

Wazuh helps meet requirement 3.11.3 by generating a finding when a vulnerability is remediated.

Use case: Tracking the remediation of vulnerabilities
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh records each vulnerability that you remediate. You remove an old Linux kernel from an Ubuntu 24.04 endpoint. Ubuntu keeps the previous kernel after a kernel upgrade, and its vulnerabilities stay on the endpoint until you remove it.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Check the running kernel and the installed kernel packages on the Ubuntu endpoint:

   .. code-block:: console

      $ uname -r
      $ dpkg -l 'linux-image-*' | grep ^ii

   Don't remove the kernel that ``uname -r`` shows. If the endpoint has only one kernel, remove another vulnerable package that you don't need instead. The Inventory tab of Vulnerability Detection lists the vulnerable packages.

#. Remove the packages of the old kernel:

   .. code-block:: console

      $ sudo apt-get purge -y linux-image-<OLD_KERNEL_VERSION> linux-modules-<OLD_KERNEL_VERSION> linux-headers-<OLD_KERNEL_VERSION>

   Replace ``<OLD_KERNEL_VERSION>`` with the version of the old kernel, for example ``7.0.0-42-generic``.

#. Restart the Wazuh agent to run a new inventory scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

   The remediated findings can take a few minutes to appear.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰), go to **Threat intelligence** > **Vulnerability Detection**, click **Explore agent**, and select the Ubuntu endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:*remediated* and package.name:linux-image-<OLD_KERNEL_VERSION>

   Wazuh generates a ``Wazuh VD - Vulnerability <CVE_ID> remediated`` finding for each vulnerability of the removed package. If you removed another package, use its name in the query.

   .. thumbnail:: /images/compliance/nist-800-171/vulnerability-remediated-findings.png
      :title: Remediated vulnerability findings
      :alt: Remediated vulnerability findings
      :align: center
      :width: 80%

#. Expand a finding and scroll down to the ``wazuh.rule.compliance.nist_800_171`` field. The finding maps to 3.11.3 and 3.14.4.

   .. thumbnail:: /images/compliance/nist-800-171/vulnerability-remediated-nist-800-171-mapping.png
      :title: NIST 800-171 mapping of the remediated finding
      :alt: NIST 800-171 mapping of the remediated finding
      :align: center
      :width: 80%
