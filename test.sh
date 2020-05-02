#!/bin/bash -e
bundle exec jekyll build
bundle exec htmlproofer ./_site --check-html --empty_alt_ignore --allow_hash_href --assume_extension
