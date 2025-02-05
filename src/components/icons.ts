const availableIcons: string[] = [
    "/icons/aarch64/aarch64-plain.svg",
    "/icons/akka/akka-plain.svg",
    "/icons/android/android-plain.svg",
    "/icons/androidstudio/androidstudio-plain.svg",
    "/icons/angular/angular-plain.svg",
    "/icons/angularjs/angularjs-plain.svg",
    "/icons/angularmaterial/angularmaterial-plain.svg",
    "/icons/ansible/ansible-plain.svg",
    "/icons/antdesign/antdesign-plain.svg",
    "/icons/apache/apache-plain.svg",
    "/icons/apacheairflow/apacheairflow-plain.svg",
    "/icons/apl/apl-plain.svg",
    "/icons/appwrite/appwrite-plain.svg",
    "/icons/archlinux/archlinux-plain.svg",
    "/icons/arduino/arduino-plain.svg",
    "/icons/argocd/argocd-plain.svg",
    "/icons/astro/astro-plain.svg",
    "/icons/axios/axios-plain.svg",
    "/icons/azure/azure-plain.svg",
    "/icons/azuredevops/azuredevops-plain.svg",
    "/icons/azuresqldatabase/azuresqldatabase-plain.svg",
    "/icons/babel/babel-plain.svg",
    "/icons/backbonejs/backbonejs-plain.svg",
    "/icons/bash/bash-plain.svg",
    "/icons/beats/beats-plain.svg",
    "/icons/bootstrap/bootstrap-plain.svg",
    "/icons/bower/bower-plain.svg",
    "/icons/browserstack/browserstack-plain.svg",
    "/icons/bulma/bulma-plain.svg",
    "/icons/bun/bun-plain.svg",
    "/icons/c/c-plain.svg",
    "/icons/cairo/cairo-plain.svg",
    "/icons/cakephp/cakephp-plain.svg",
    "/icons/capacitor/capacitor-plain.svg",
    "/icons/cassandra/cassandra-plain.svg",
    "/icons/centos/centos-plain.svg",
    "/icons/ceylon/ceylon-plain.svg",
    "/icons/chrome/chrome-plain.svg",
    "/icons/circleci/circleci-plain.svg",
    "/icons/clarity/clarity-plain.svg",
    "/icons/clion/clion-plain.svg",
    "/icons/clojurescript/clojurescript-plain.svg",
    "/icons/cloudflare/cloudflare-plain.svg",
    "/icons/cloudflareworkers/cloudflareworkers-plain.svg",
    "/icons/cmake/cmake-plain.svg",
    "/icons/codecov/codecov-plain.svg",
    "/icons/codeigniter/codeigniter-plain.svg",
    "/icons/confluence/confluence-plain.svg",
    "/icons/cosmosdb/cosmosdb-plain.svg",
    "/icons/couchdb/couchdb-plain.svg",
    "/icons/cplusplus/cplusplus-plain.svg",
    "/icons/csharp/csharp-plain.svg",
    "/icons/css3/css3-plain.svg",
    "/icons/cucumber/cucumber-plain.svg",
    "/icons/cypressio/cypressio-plain.svg",
    "/icons/d3js/d3js-plain.svg",
    "/icons/dart/dart-plain.svg",
    "/icons/datagrip/datagrip-plain.svg",
    "/icons/dataspell/dataspell-plain.svg",
    "/icons/dbeaver/dbeaver-plain.svg",
    "/icons/debian/debian-plain.svg",
    "/icons/devicon/devicon-plain.svg",
    "/icons/discordjs/discordjs-plain.svg",
    "/icons/django/django-plain.svg",
    "/icons/djangorest/djangorest-plain.svg",
    "/icons/docker/docker-plain.svg",
    "/icons/doctrine/doctrine-plain.svg",
    "/icons/dot-net/dot-net-plain.svg",
    "/icons/dotnetcore/dotnetcore-plain.svg",
    "/icons/eclipse/eclipse-plain.svg",
    "/icons/elasticsearch/elasticsearch-plain.svg",
    "/icons/eleventy/eleventy-plain.svg",
    "/icons/elixir/elixir-plain.svg",
    "/icons/elm/elm-plain.svg",
    "/icons/embeddedc/embeddedc-plain.svg",
    "/icons/ember/ember-plain.svg",
    "/icons/envoy/envoy-plain.svg",
    "/icons/erlang/erlang-plain.svg",
    "/icons/eslint/eslint-plain.svg",
    "/icons/fastapi/fastapi-plain.svg",
    "/icons/fastify/fastify-plain.svg",
    "/icons/fedora/fedora-plain.svg",
    "/icons/figma/figma-plain.svg",
    "/icons/firebase/firebase-plain.svg",
    "/icons/flutter/flutter-plain.svg",
    "/icons/foundation/foundation-plain.svg",
    "/icons/fsharp/fsharp-plain.svg",
    "/icons/gazebo/gazebo-plain.svg",
    "/icons/gcc/gcc-plain.svg",
    "/icons/gentoo/gentoo-plain.svg",
    "/icons/git/git-plain.svg",
    "/icons/githubactions/githubactions-plain.svg",
    "/icons/gitlab/gitlab-plain.svg",
    "/icons/gitpod/gitpod-plain.svg",
    "/icons/go/go-plain.svg",
    "/icons/godot/godot-plain.svg",
    "/icons/goland/goland-plain.svg",
    "/icons/googlecloud/googlecloud-plain.svg",
    "/icons/grafana/grafana-plain.svg",
    "/icons/graphql/graphql-plain.svg",
    "/icons/groovy/groovy-plain.svg",
    "/icons/grpc/grpc-plain.svg",
    "/icons/hadoop/hadoop-plain.svg",
    "/icons/hardhat/hardhat-plain.svg",
    "/icons/haskell/haskell-plain.svg",
    "/icons/heroku/heroku-plain.svg",
    "/icons/hibernate/hibernate-plain.svg",
    "/icons/homebrew/homebrew-plain.svg",
    "/icons/html5/html5-plain.svg",
    "/icons/hugo/hugo-plain.svg",
    "/icons/insomnia/insomnia-plain.svg",
    "/icons/intellij/intellij-plain.svg",
    "/icons/java/java-plain.svg",
    "/icons/javascript/javascript-plain.svg",
    "/icons/jekyll/jekyll-plain.svg",
    "/icons/jenkins/jenkins-plain.svg",
    "/icons/jest/jest-plain.svg",
    "/icons/jira/jira-plain.svg",
    "/icons/jquery/jquery-plain.svg",
    "/icons/json/json-plain.svg",
    "/icons/julia/julia-plain.svg",
    "/icons/junit/junit-plain.svg",
    "/icons/jupyter/jupyter-plain.svg",
    "/icons/keras/keras-plain.svg",
    "/icons/kibana/kibana-plain.svg",
    "/icons/kotlin/kotlin-plain.svg",
    "/icons/ktor/ktor-plain.svg",
    "/icons/kubernetes/kubernetes-plain.svg",
    "/icons/linux/linux-plain.svg",
    "/icons/llvm/llvm-plain.svg",
    "/icons/logstash/logstash-plain.svg",
    "/icons/lua/lua-plain.svg",
    "/icons/materialui/materialui-plain.svg",
    "/icons/matlab/matlab-plain.svg",
    "/icons/matplotlib/matplotlib-plain.svg",
    "/icons/maven/maven-plain.svg",
    "/icons/mongodb/mongodb-plain.svg"
  ];
  
  export default availableIcons;
  