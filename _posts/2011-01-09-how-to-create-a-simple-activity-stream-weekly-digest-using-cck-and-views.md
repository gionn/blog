---
layout: post
title: !binary |-
  SG93IHRvIGNyZWF0ZSBhIHNpbXBsZSBBY3Rpdml0eSBTdHJlYW0gV2Vla2x5
  IERpZ2VzdCB1c2luZyBDQ0sgYW5kIFZpZXdz
created: 1294591157
comments: true
categories: !binary |-
  ZW5fdXMgc29mdHdhcmU=
---
I was researching for an easy method to publish as a single post my latest {month|week|day} activities on twitter aggregated by <a href="http://drupal.org/project/activitystream">Activity Stream</a>.
<!--break-->
This is how I did it:

<ul>
  <li>Create a view that list the activity stream items published in the last week;</li>
  <li>Create a new content type (ex: activitystreamdigest), add a node-reference cck field with unlimited values, checkboxes as widget type and the precedent view as nodes that can be referenced;</li>
  <li>Update your frontpage view to include this new type of content (or promote them to frontpage, as you use to deal with your contents)</li>
</ul>

Now, everytime I want to create an Activity Stream digest, I go for Create Content -> Activity Stream Digest, I select the items I want in my digest (throwing away unuseful tweets) and publish.
