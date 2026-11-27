# ReStructured Text rules

## Blocks/elements always have the same structure.

The generic structure of a block in ReStructured text has in its first line the name of the element and its arguments. On the second line, with extra indentation, are the block options. Finally, after a blank line, the content is written with the same level of indentation.

```
.. <name>:: <arguments>
  :<option>: <option values>

  content
```

:warning: Make sure to leave a blank space between the block name and the arguments list. This won't work: `.. <name>::<arguments>`

Here's an example:

```
.. figure:: ../images/test.png
  :width: 200pt

  content
```

## Paragraphs

A paragraph is a block of text that is separated by blank lines (one is enough). Paragraphs must line up at their left edge.

```
This is a paragraph. It's quite short.

This is another one.
This is still the same paragraph.

  This one will be interpreted as a quote block.
```

## Indentation

Indentation is used to indicate block quotes, definitions (in definition list items), and local nested content. Any text whose indentation is less than that of the current level (i.e., unindented text or "dedents") ends the current level of indentation, therefore ends the current block.

Since all indentation is significant, the level of indentation must be consistent.

```
.. code-block:: console

# yum install python-pip
```

Block content unindented will be interpreted as a separate paragraph. The output will be:

![photo6030809081100481230](https://user-images.githubusercontent.com/11634351/85839308-0df20480-b79b-11ea-9f93-38ca49eaccfa.jpg)

Note: put special attention to indentation when [inserting code-blocks inside lists](https://github.com/wazuh/wazuh-documentation/blob/master/guide/good-practices.md#code-blocks-inside-lists).

## Markup

Text markup has the following rules:

- It can't be nested.

```
**`This won't work`**
**This will work**
`This will work too`
```

- It can't have leading or trailing spaces.

```
* Leading spaces will break the code*
*This is better*
```

- Marked elements must be separated using a space or a new line.

```
*Too*`close`

*This* `works`

*This*
**works**
`too`
```
