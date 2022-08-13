# How to insert empty nodes in the toctree

From https://github.com/wazuh/wazuh-documentation/pull/2202

## Use case

Wazuh Doc toctree does not include section headings in the toctree by default. To insert a new node, you need to create a new `.rst` file. However, sometimes is useful to have subsections grouped in the same view and also in the sidebar navigation.

Let's see an example:

`main_section.rst` contents looks like:

---
### Main title

Lorem ipsum dolor sit amet consectetur adipiscing elit consequat, varius praesent tristique id gravida est aptent, venenatis augue hendrerit natoque inceptos felis mi ullamcorper, erat ut nostra risus accumsan orci.

#### Section 1

Lorem ipsum dolor sit amet consectetur adipiscing elit consequat, varius praesent tristique id gravida est aptent, venenatis augue hendrerit natoque inceptos felis mi ullamcorper, erat ut nostra risus accumsan orci.

**Table of contents for section 1**

- [Section 1.1]()
- [Section 1.2]()
- [Section 1.3]()

---

And our desired toctree would be:

```
Main title
|  Section 1
|  |  Section 1.1
|  |  Section 1.2
|  |  Section 1.3
```

---

In the previous example, `Section 1` is an empty toctree node. Its contents are included in the `main_section.rst` file, so it doesn't have a content page of its own, but it is part of the Docs structure, and must show up in the toctree.

## How to achieve it

Empty nodes are `.rst` files that only include a toctree section. In the previous example, file `section_1.rst` would be:

```rst

.. _section-1:

Section 1
=========

.. toctree::

  section-1-1
  section-1-2
  section-1-3
```

While `main_section.rst` would be:

```rst
Main section
============

.. toctree::
  :hidden:

  section-1

Lorem ipsum dolor sit amet consectetur adipiscing elit consequat, 
varius praesent tristique id gravida est aptent, venenatis augue 
hendrerit natoque inceptos felis mi ullamcorper, erat ut nostra risus 
accumsan orci.

Section 1
---------

Lorem ipsum dolor sit amet consectetur adipiscing elit consequat, 
varius praesent tristique id gravida est aptent, venenatis augue 
hendrerit natoque inceptos felis mi ullamcorper, erat ut nostra risus 
accumsan orci.

.. topic:: Table of Contents

* :doc:`Section 1.1<section-1-1>`
* :doc:`Section 1.2<section-1-2>`
* :doc:`Section 1.3<section-1-3>`
```

Notice how the **Table of contents** is just a list of links, and not a real toctree. This way, `Section 1.1`, `Section 1.2` and `Section 1.3` are not interpreted as siblings of `Section 1`.

The main problem with this approach would be that, if the user clicks in the `Section 1` link on the sidebar, an empty page would be displayed. To avoid this, we use Javascript to prevent this link to redirect to its corresponding page.

Example: [https://documentation.wazuh.com/3.11/index.html](https://documentation.wazuh.com/3.11/index.html). If you try to click on the `User manual` link, it will only display its child nodes, without actually taking you to the `User manual` page.

Empty toctree nodes are listed in a Javascript array on `source/_static/js/style.js`, called `emptyTocNodes`. In this example, `section-1` should be added as an element of this array:

```javascript
const emptyTocNodes = [
  'some-file',
  'some-other-file',
  // ... more empty nodes
  'section-1'
]
```

This way, now both our `Main section` contents and out toctree behave the way intended, without changing the toctree configuration for the whole page.