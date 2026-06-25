.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Filters are engine-level constructs that control how events are routed and processed within the Wazuh security analytics pipeline. Learn more in this section.

Filters
=======

Filters are engine-level constructs that control how events are routed and processed within the security analytics pipeline. Like rules, decoders, integrations, and KVDBs, they are a core content type managed by the Wazuh engine, though their use is optional. Defined in YAML, filters are stored in the ``wazuh-threatintel-filters`` index and passed directly to the Wazuh normalization engine, where they govern how events are routed or excluded before and after normalization.

There are two types of filters:

#. Pre-filter: Events in this phase are evaluated before decoding and are discarded immediately if they do not meet the filter conditions, avoiding unnecessary decoding. If the pre-filter is not configured, all events proceed to the decoding stage unconditionally.

#. Post-filter: Events in this phase are evaluated after enrichment or after decoding and can be discarded if they do not satisfy the post-filter conditions. If post-filter is not configured, all events are forwarded unconditionally.
