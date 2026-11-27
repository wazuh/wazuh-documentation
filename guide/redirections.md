# Release protocol regarding documentation redirections

This document has been created to ensure the proper maintenance of the wazuh-documentation repository and its different branches and versions for every release.

The way the versioning is working in the documentation now is not dynamic, so in case a page has been added, renamed, moved to a different location or removed, we will need to update the file called `source/_static/js/redirects.js`.

:warning: Never rename, move, add or delete a page unless these changes occur in a new minor or major version that’s being released. 

## Added new pages

An `.rst` file is considered a new page when meeting at least one of the following conditions:

- A new `.rst` file is added with new content in the new version.
- An `.rst` file has been renamed in the new version.
- An `.rst` file has been moved to a different location in the new version.

Any of these scenarios mean that we need to modify the `source/_static/js/redirects.js` file to add the new changes. 

Inside this file, there is an array called `newUrls` where we will add the new page URL. This array is divided into different versions, so first we will need to search the version we’re adding the page in, or create it in case it doesn’t exist yet. 

For instance, to indicate that there’s a new page in version **3.11** we would just add a new line:

```javascript
/* Pages added in 3.11 */

newUrls['3.11'] = [
  '/amazon/services/supported-services/index.html',
  '/amazon/services/prerequisites/considerations.html',
  '/amazon/services/prerequisites/credentials.html',
  '/new-page/new-page/index.html',
];
```

## Deleted pages

Just like adding a new page, we will also need to indicate which ones have been deleted. To do this we will add the deleted page’s URL in the corresponding `removedUrls` array. We only have to add the URL in the version where that page no longer exists.

For instance, in **3.6** this page doesn’t exist anymore:

```javascript
removedUrls['3.6'] = [
  '/user-manual/reference/ossec-conf/wodle-cloudtrail.html',
];
```

## Redirections

When a `.rst` file has been moved or renamed in a new version, we need to reflect this change in the array named redirections.

This array’s structure is different from the previous ones. Each redirection is an object with 3 attributes:

```javascript
redirections.push(
    {
      'target': ['3.6=>3.7', '3.7=>3.6'],
      '3.6': '/deploying-with-ansible/consider.html',
      '3.7': '/deploying-with-ansible/installation-guide.html',
    },
);
```

In the first one, (`target`) we’re telling it how to behave. We have three choices:

1. From an older version to a newer version:

```javascript
['3.6=>3.7']
```

2. From the newer version to an older version:

```javascript
['3.7=>3.6']
```

3. Bidirectional, from older to newer and vice versa:

```javascript
['3.6=>3.7', '3.7=>3.6']
```

The second and third lines (`3.6` and `3.7`) indicate the page’s URLs depending on the version.

In the previous example, we can see that in version **3.6** the page has the URL `/deploying-with-ansible/consider.html` but in the **3.7** version this file will be renamed and it will be `/deploying-with-ansible/installation-guide.html`

It’s worth nothing to remind that, while most redirections are bidirectional, not all of them need to be. Sometimes many new pages are redirected to the same old page (or the other way around), so redirections need to be specified individually.

We’re currently working on simplifying and improving this workflow, so it can become easier over time.

## Examples

### Changing the URL of a docu page

In this example, we have a page called `page-new` which was renamed in version **3.10**. In previous versions, this page was called `page-old`.

#### Step 1

Add the new page in `source/_static/js/redirects.js` to its corresponding array `newUrls['3.10']`:

```javascript
/* Pages added in 3.10 */

newUrls['3.10'] = [
  '/amazon/services/supported-services/index.html',
  '/amazon/services/prerequisites/considerations.html',
  '/amazon/services/prerequisites/credentials.html',
  '/path/to/page-new.html',
];
```

#### Step 2

Add a new redirection object to the `redirections` array:

```javascript
redirections.push(
    {
      'target': ['3.9=>3.10', '3.10=>3.9'],
      '3.9': '/path/to/page-old.html',
      '3.10': '/path/to/page-new.html',
    }, 
);
```

### Deleting a docu page in a new version

In this example, we have a page called `page-deprecated` up to version **3.7**, but in **3.8** it doesn't exist anymore.

Add the `page-deprecated.html` URL to the **3.8** `removedUrls` array:

```javascript
removedUrls['3.8'] = [
  '/amazon/use-cases/index.html',
  '/amazon/use-cases/ec2.html',
  ...,
  '/path/to/page-deprecated.html',
];
```

This way, in the version selector, all versions from **3.8** will be disabled when visiting `page-deprecated.html`, preventing 404 errors and bad user experience.

### Adding a docu page in a new version

In this example, we add a new section (called `page-new.html`) to the documentation starting on version **3.10**. 

Add the new page URL to the `newUrls['3.10']` array.

```javascript
/* Pages added in 3.10 */

newUrls['3.10'] = [
  '/release-notes/release_3_10_0.html',
  '/release-notes/release_3_10_1.html',
  '/release-notes/release_3_10_2.html',
  ...
  'path/to/page-new.html'
];
```

This way, when visiting `page-new.html`, all the previous versions will be disabled in the version selector, preventing 404 errors.

### Dividing a documentation page into multiple pages

In this example, we have a docu page in version **3.9** called `page-section.html`. From **3.10**, we'll be dividing it into several pages: an index page, called `page-section/index.html`, and some sections, called: `page-section/part1.html` and `page-section/part2.html`.

#### Step 1

Add all new pages to the `newUrls['3.10']` array:

```javascript
/* Pages added in 3.10 */

newUrls['3.10'] = [
  '/release-notes/release_3_10_0.html',
  '/release-notes/release_3_10_1.html',
  '/release-notes/release_3_10_2.html',
  ...
  '/path/to/page-section/index.html',
  '/path/to/page-section/part1.html',
  '/path/to/page-section/part2.html',
];
```

#### Step 2

Set redirections from **3.9** to **3.10**. In this case, `page-section.html` from **3.9** will be redirected to `page-section/index.html` from **3.10** (and also the other way around), so this will be a bidirectional redirect (as seen in the first example):

```javascript
redirections.push(
    {
      'target': ['3.9=>3.10', '3.10=>3.9'],
      '3.9': '/path/to/page-section.html',
      '3.10': '/path/to/page-section/index.html',
    }
);
```

#### Step 3

Set redirections from **3.10** to **3.9**. Both subsections `page-section/part1.html` and `page-section/part2.html` from **3.10** will be redirected to `page-section.html` from **3.9** when using the version selector. So the new redirections in the `redirections` array will be unidirectional:

```javascript
redirections.push(
    {
      'target': ['3.10=>3.9'],
      '3.9': '/path/to/page-section.html',
      '3.10': '/path/to/page-section/part1.html',
    }
);

redirections.push(
    {
      'target': ['3.10=>3.9'],
      '3.9': '/path/to/page-section.html',
      '3.10': '/path/to/page-section/part2.html',
    }
);
```