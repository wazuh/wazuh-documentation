.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to create a set of custom visualizations and dashboards using Kibana in this section of the Wazuh documentation.

.. _kibana_custom_dashboard:

Create a custom dashboard
=========================

This section describes the process of creating a set of custom visualizations using Kibana and how to add them into a dashboard to create a custom dashboard.


Creating Visualization
----------------------

Go to the **Visualize** tab.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/visualize-tab.png
   :align: center
   :width: 100%

Click on **Create new visualization**.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/create-new-visualization.png
   :align: center
   :width: 100%


And select a visualization type among the ones available. As an example,
we will be taking the **Horizontal Bar** chart, but it is essentially
the same for other types of visualization.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/select-visualization-type.png
   :align: center
   :width: 100%


Next step will be selecting the index that will be used as a data source.
We can work with any index that we created previously, but generally, we
will be working with **wazuh-alerts-\***.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/choose-a-source.png
   :align: center

At this point, a graph will be generated. You can select a lapse of time
to display the information related to that period. Click on the
following dropdown menu, define it and then update your
changes.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/select-lapse-time.png
   :align: center
   :width: 100%

This chart can be configured to match your preferences. You can organize
your data using **Metrics** and **Buckets**.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/metrics-and-buckets.png
   :align: center
   :width: 100%

**Metrics** section has options in order to quantify the data: Count,
average, sum, max/min, etc.

**Buckets** are aggregations of data that are sorted according to your
search criteria.

For this example, we will leave the Y-Axis as default (*count*) and we
will modify the Buckets (*X-Axis*) to sort them according to the level
of the rules that have been triggered.

To do so we will have to click on **X-Axis**:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/bucket-x-axis.png
   :align: center

Select the **Terms** option in the **Select an aggregation** menu:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/bucket-select-an-aggregation-terms.png
   :align: center

Now you will be able to select a **Field** to sort by (*e.g.
rule.level*):

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/bucket-term-field.png
   :align: center

And, eventually, you will need to apply the changes to visualize
them:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/bucket-apply-changes.png
   :align: center

Now you will be able to see a chart like this:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/horizontal-example-chart.png
   :align: center
   :width: 100%

Saving a Visualization
----------------------

Once we have created a customized visualization, as we did in the
previous section, we can save it by clicking on **Save**.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/save-visualization.png
   :align: center
   :width: 100%

After that, set a name for it and confirm.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/confirm-save-visualization.png
   :align: center

Creating a Custom Dashboard
---------------------------

In order to create a customized dashboard we can reuse a saved
visualization in the **Dashboard** section:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/dashboard-tab.png
   :align: center
   :width: 100%

Just have to click on **Create a new dashboard**:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/create-new-dashboard.png
   :align: center

And then click on **Add**.\

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/add-visualization-to-dashboard.png
   :align: center
   :width: 100%

Now you can select a visualization to add among the ones you have saved.
We will choose the bar chart that we created previously and then click
on **Create new visualization**:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/select-panels-to-add.png
   :align: center

You will be able to see the visualization added to the
dashboard:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/panel-was-properly-added.png
   :align: center
   :width: 100%

You can keep adding visualizations to the dashboard following the same
process so that it fits your preferences.

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/complex-dashboard.png
   :align: center
   :width: 100%

Once you have finished editing your dashboard you will need to save it
by clicking **Save.**

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/save-dashboard.png
   :align: center
   :width: 100%

Set its name, description and save it:

.. thumbnail:: ../../../images/kibana-app/custom-dashboard/confirm-save-dashboard.png
   :align: center
