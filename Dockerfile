FROM timbru31/ruby-node:3.2

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

RUN bundle exec jekyll build
