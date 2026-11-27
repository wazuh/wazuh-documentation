.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the NIST SP 800-171 System and Communications Protection requirement 3.13.6 with an SCA use case.

System and Communications Protection (3.13)
===========================================

3.13.6 Deny network communications traffic by default
-----------------------------------------------------

Requirement 3.13.6 states, "Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception)."

Wazuh helps meet requirement 3.13.6 with the SCA module, which checks that the host firewall of your endpoints is enabled.

Use case: Enabling the host firewall on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find and fix the failed CIS Ubuntu Linux 24.04 LTS Benchmark check 35622, **Ensure ufw service is enabled.**, on an Ubuntu 24.04 endpoint. When you enable UFW, it denies incoming connections by default and allows only the connections that you permit.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Endpoint security** > **Configuration Assessment**.

#. Click **Explore agent**, select the Ubuntu endpoint, and switch to the **Inventory** tab.

#. In **Check**, search for and select **Ensure ufw service is enabled.** The **check.result** column shows **Failed** while UFW is inactive.

   .. thumbnail:: /images/compliance/nist-800-171/sca-ufw-check-failed.png
      :title: Failed UFW check
      :alt: Failed UFW check
      :align: center
      :width: 80%

#. Click the inspect icon of the check to open its details, including the rationale and the remediation. The ``check.compliance.nist_800_171`` field shows 3.1.20, 3.4.7, 3.13.1, and 3.13.6.

   .. thumbnail:: /images/compliance/nist-800-171/sca-ufw-check-details.png
      :title: UFW check details
      :alt: UFW check details
      :align: center
      :width: 80%

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following commands on the Ubuntu endpoint to allow SSH connections and enable UFW:

   .. code-block:: console

      $ sudo ufw allow 22/tcp
      $ sudo systemctl unmask ufw.service
      $ sudo systemctl --now enable ufw.service
      $ sudo ufw --force enable

   Allow SSH before you enable UFW. Otherwise, enabling UFW can close your SSH session.

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
~~~~~~~~~~~~~~~

#. In **Configuration Assessment**, switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Wazuh SCA check passed - Ensure ufw service is enabled."

   The finding shows that check 35622 now passes.

   .. thumbnail:: /images/compliance/nist-800-171/sca-ufw-check-passed.png
      :title: Passed UFW check
      :alt: Passed UFW check
      :align: center
      :width: 80%
