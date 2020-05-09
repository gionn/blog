---
layout: post
title: How to release open-source java projects to Maven Central repository
tags:
 - howto
---

There is plenty of documentation once you find it, the hard part was to search for the right keywords to obtain it, so I am writing this post.

Uploading software to a central repository (so other developers can easily grab them with their own favorite build tool) for Java is not as straightforward as it with other technologies (like NPM, RubyGems, Packagist), mainly because Java sources needs to be built into artifacts.

In addition, upload capabilities to the Maven Central repository isn't public but it's allowed only to [few subjects](https://maven.apache.org/guides/mini/guide-central-repository-upload.html#Approved_Repository_Hosting).

One of them is the [Sonatype OSS Repository](http://nexus.sonatype.org/oss-repository-hosting.html) that provides support to the Open Source Software communities to host and upload their artifacts.

In short, requirements are:

* usage of an Open Source license;
* add a bunch of descriptive metadata to your pom.xml;
* provides javadoc, sources and gpg signature along with binary packages;

Everything is well documented here, read each step carefully:
http://central.sonatype.org/pages/ossrh-guide.html

You just need to open a ticket to request the authorization to upload artifact for a given groupId (choose one wisely, every project should be under it).
