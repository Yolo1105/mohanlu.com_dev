import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface LoadingProps {
  onLoadingComplete?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onLoadingComplete }) => {
  const [terminalText, setTerminalText] = useState('');
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showStars, setShowStars] = useState(true);
  const [icons, setIcons] = useState<
    { src: string; left: number; top: number; rotation: number }[]
  >([]);

  useEffect(() => {
    // List of available SVGs (you can dynamically fetch from a backend if needed)
    const availableIcons = [
      '/icons/aarch64/aarch64-plain.svg',
      '/icons/akka/akka-plain.svg',
      '/icons/android/android-plain.svg',
      '/icons/androidstudio/androidstudio-plain.svg',
      '/icons/angular/angular-plain.svg',
      '/icons/angularjs/angularjs-plain.svg',
      '/icons/angularmaterial/angularmaterial-plain.svg',
      '/icons/ansible/ansible-plain.svg',
      '/icons/antdesign/antdesign-plain.svg',
      '/icons/apache/apache-plain.svg',
      '/icons/apacheairflow/apacheairflow-plain.svg',
      '/icons/apl/apl-plain.svg',
      '/icons/appwrite/appwrite-plain.svg',
      '/icons/archlinux/archlinux-plain.svg',
      '/icons/arduino/arduino-plain.svg',
      '/icons/argocd/argocd-plain.svg',
      '/icons/astro/astro-plain.svg',
      '/icons/axios/axios-plain.svg',
      '/icons/azure/azure-plain.svg',
      '/icons/azuredevops/azuredevops-plain.svg',
      '/icons/azuresqldatabase/azuresqldatabase-plain.svg',
      '/icons/babel/babel-plain.svg',
      '/icons/backbonejs/backbonejs-plain.svg',
      '/icons/bash/bash-plain.svg',
      '/icons/beats/beats-plain.svg',
      '/icons/bootstrap/bootstrap-plain.svg',
      '/icons/bower/bower-plain.svg',
      '/icons/browserstack/browserstack-plain.svg',
      '/icons/bulma/bulma-plain.svg',
      '/icons/bun/bun-plain.svg',
      '/icons/c/c-plain.svg',
      '/icons/cairo/cairo-plain.svg',
      '/icons/cakephp/cakephp-plain.svg',
      '/icons/capacitor/capacitor-plain.svg',
      '/icons/cassandra/cassandra-plain.svg',
      '/icons/centos/centos-plain.svg',
      '/icons/ceylon/ceylon-plain.svg',
      '/icons/chrome/chrome-plain.svg',
      '/icons/circleci/circleci-plain.svg',
      '/icons/clarity/clarity-plain.svg',
      '/icons/clion/clion-plain.svg',
      '/icons/clojurescript/clojurescript-plain.svg',
      '/icons/cloudflare/cloudflare-plain.svg',
      '/icons/cloudflareworkers/cloudflareworkers-plain.svg',
      '/icons/cmake/cmake-plain.svg',
      '/icons/codecov/codecov-plain.svg',
      '/icons/codeigniter/codeigniter-plain.svg',
      '/icons/confluence/confluence-plain.svg',
      '/icons/cosmosdb/cosmosdb-plain.svg',
      '/icons/couchdb/couchdb-plain.svg',
      '/icons/cplusplus/cplusplus-plain.svg',
      '/icons/csharp/csharp-plain.svg',
      '/icons/css3/css3-plain.svg',
      '/icons/cucumber/cucumber-plain.svg',
      '/icons/cypressio/cypressio-plain.svg',
      '/icons/d3js/d3js-plain.svg',
      '/icons/dart/dart-plain.svg',
      '/icons/datagrip/datagrip-plain.svg',
      '/icons/dataspell/dataspell-plain.svg',
      '/icons/dbeaver/dbeaver-plain.svg',
      '/icons/debian/debian-plain.svg',
      '/icons/devicon/devicon-plain.svg',
      '/icons/discordjs/discordjs-plain.svg',
      '/icons/django/django-plain.svg',
      '/icons/djangorest/djangorest-plain.svg',
      '/icons/docker/docker-plain.svg',
      '/icons/doctrine/doctrine-plain.svg',
      '/icons/dot-net/dot-net-plain.svg',
      '/icons/dotnetcore/dotnetcore-plain.svg',
      '/icons/eclipse/eclipse-plain.svg',
      '/icons/elasticsearch/elasticsearch-plain.svg',
      '/icons/eleventy/eleventy-plain.svg',
      '/icons/elixir/elixir-plain.svg',
      '/icons/elm/elm-plain.svg',
      '/icons/embeddedc/embeddedc-plain.svg',
      '/icons/ember/ember-plain.svg',
      '/icons/envoy/envoy-plain.svg',
      '/icons/erlang/erlang-plain.svg',
      '/icons/eslint/eslint-plain.svg',
      '/icons/fastapi/fastapi-plain.svg',
      '/icons/fastify/fastify-plain.svg',
      '/icons/fedora/fedora-plain.svg',
      '/icons/figma/figma-plain.svg',
      '/icons/firebase/firebase-plain.svg',
      '/icons/flutter/flutter-plain.svg',
      '/icons/foundation/foundation-plain.svg',
      '/icons/fsharp/fsharp-plain.svg',
      '/icons/gazebo/gazebo-plain.svg',
      '/icons/gcc/gcc-plain.svg',
      '/icons/gentoo/gentoo-plain.svg',
      '/icons/git/git-plain.svg',
      '/icons/githubactions/githubactions-plain.svg',
      '/icons/gitlab/gitlab-plain.svg',
      '/icons/gitpod/gitpod-plain.svg',
      '/icons/go/go-plain.svg',
      '/icons/godot/godot-plain.svg',
      '/icons/goland/goland-plain.svg',
      '/icons/googlecloud/googlecloud-plain.svg',
      '/icons/grafana/grafana-plain.svg',
      '/icons/graphql/graphql-plain.svg',
      '/icons/groovy/groovy-plain.svg',
      '/icons/grpc/grpc-plain.svg',
      '/icons/hadoop/hadoop-plain.svg',
      '/icons/hardhat/hardhat-plain.svg',
      '/icons/haskell/haskell-plain.svg',
      '/icons/heroku/heroku-plain.svg',
      '/icons/hibernate/hibernate-plain.svg',
      '/icons/homebrew/homebrew-plain.svg',
      '/icons/html5/html5-plain.svg',
      '/icons/hugo/hugo-plain.svg',
      '/icons/insomnia/insomnia-plain.svg',
      '/icons/intellij/intellij-plain.svg',
      '/icons/java/java-plain.svg',
      '/icons/javascript/javascript-plain.svg',
      '/icons/jekyll/jekyll-plain.svg',
      '/icons/jenkins/jenkins-plain.svg',
      '/icons/jest/jest-plain.svg',
      '/icons/jira/jira-plain.svg',
      '/icons/jquery/jquery-plain.svg',
      '/icons/json/json-plain.svg',
      '/icons/julia/julia-plain.svg',
      '/icons/junit/junit-plain.svg',
      '/icons/jupyter/jupyter-plain.svg',
      '/icons/keras/keras-plain.svg',
      '/icons/kibana/kibana-plain.svg',
      '/icons/kotlin/kotlin-plain.svg',
      '/icons/ktor/ktor-plain.svg',
      '/icons/kubernetes/kubernetes-plain.svg',
      '/icons/linux/linux-plain.svg',
      '/icons/llvm/llvm-plain.svg',
      '/icons/lodash/lodash-plain.svg',
      '/icons/logstash/logstash-plain.svg',
      '/icons/lua/lua-plain.svg',
      '/icons/materialui/materialui-plain.svg',
      '/icons/matlab/matlab-plain.svg',
      '/icons/matplotlib/matplotlib-plain.svg',
      '/icons/maven/maven-plain.svg',
      '/icons/mongodb/mongodb-plain.svg',
      '/icons/nano/nano-plain.svg',
      '/icons/neo4j/neo4j-plain.svg',
      '/icons/neovim/neovim-plain.svg',
      '/icons/netlify/netlify-plain.svg',
      '/icons/networkx/networkx-plain.svg',
      '/icons/nextjs/nextjs-plain.svg',
      '/icons/nodejs/nodejs-plain.svg',
      '/icons/numpy/numpy-plain.svg',
      '/icons/nuxtjs/nuxtjs-plain.svg',
      '/icons/oauth/oauth-plain.svg',
      '/icons/objectivec/objectivec-plain.svg',
      '/icons/opencv/opencv-plain.svg',
      '/icons/opengl/opengl-plain.svg',
      '/icons/pandas/pandas-plain.svg',
      '/icons/php/php-plain.svg',
      '/icons/postgresql/postgresql-plain.svg',
      '/icons/postman/postman-plain.svg',
      '/icons/powershell/powershell-plain.svg',
      '/icons/pytest/pytest-plain.svg',
      '/icons/python/python-plain.svg',
      '/icons/r/r-plain.svg',
      '/icons/reactrouter/reactrouter-plain.svg',
      '/icons/redis/redis-plain.svg',
      '/icons/rollup/rollup-plain.svg',
      '/icons/ruby/ruby-plain.svg',
      '/icons/rust/rust-plain.svg',
      '/icons/scikitlearn/scikitlearn-plain.svg',
      '/icons/svelte/svelte-plain.svg',
      '/icons/swift/swift-plain.svg',
      '/icons/tensorflow/tensorflow-plain.svg',
      '/icons/terraform/terraform-plain.svg',
      '/icons/typescript/typescript-plain.svg',
      '/icons/ubuntu/ubuntu-plain.svg',
      '/icons/vuejs/vuejs-plain.svg',
      '/icons/webpack/webpack-plain.svg',
      '/icons/xcode/xcode-plain.svg',
      '/icons/yaml/yaml-plain.svg',
    ];

    const generateIcons = () => {
      return availableIcons.map((src) => ({
        src,
        left: Math.random() * 100, // Random X position in vw
        top: Math.random() * 100, // Random Y position in vh
        rotation: Math.random() * 360, // Random rotation start angle
      }));
    };

    setIcons(generateIcons());

    // Generate random star shadows
    const generateStarShadows = (n: number) => {
      return Array.from(
        { length: n },
        () =>
          `${Math.floor(Math.random() * 2000)}px ${Math.floor(
            Math.random() * 2000,
          )}px #FFF`,
      ).join(', ');
    };

    // Set CSS variables for star shadows
    document.documentElement.style.setProperty(
      '--shadows-small',
      generateStarShadows(700),
    );
    document.documentElement.style.setProperty(
      '--shadows-medium',
      generateStarShadows(200),
    );
    document.documentElement.style.setProperty(
      '--shadows-big',
      generateStarShadows(100),
    );

    // Create star elements
    const createStarElements = () => {
      const starsContainer = document.createElement('div');
      starsContainer.id = 'stars-container';
      starsContainer.innerHTML = `
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      `;
      document.body.insertBefore(starsContainer, document.body.firstChild);
    };

    createStarElements();

    const output = [
      'CPU0 microcode updated early to revision 0x1b, date = 2014-05-29',
      'Initializing cgroup subsys cpuset',
      'Initializing cgroup subsys cpu',
      'Initializing cgroup subsys cpuacct',
      'Command line: BOOT_IMAGE=/vmlinuz-3.19.0-21-generic.efi.signed root=UUID=14ac372e-6980-4fe8-b247-fae92d54b0c5 ro quiet splash acpi_enforce_resources=lax intel_pstate=enable rcutree.rcu_idle_gp_delay=1 nouveau.runpm=0 vt.handoff=7',
      'KERNEL supported cpus:',
      '  Intel GenuineIntel',
      '  AMD AuthenticAMD',
      '  Centaur CentaurHauls',
      'Bluetooth: RFCOMM ver 1.11',
      'iwlwifi 0000:03:00.0: L1 Enabled - LTR Disabled',
      'iwlwifi 0000:03:00.0: Radio type=0x2-0x0-0x0',
      'iwlwifi 0000:03:00.0: L1 Enabled - LTR Disabled',
      'iwlwifi 0000:03:00.0: Radio type=0x2-0x0-0x0',
      'wlan0: authenticate with 00:90:cc:ea:f4:16',
      'wlan0: send auth to 00:90:cc:ea:f4:16 (try 1/3)',
      'wlan0: authenticated',
      'iwlwifi 0000:03:00.0 wlan0: disabling HT/VHT due to WEP/TKIP use',
      'iwlwifi 0000:03:00.0 wlan0: disabling HT as WMM/QoS is not supported by the AP',
      'iwlwifi 0000:03:00.0 wlan0: disabling VHT as WMM/QoS is not supported by the AP',
      'wlan0: associate with 00:90:cc:ea:f4:16 (try 1/3)',
      'wlan0: RX AssocResp from 00:90:cc:ea:f4:16 (capab=0x431 status=0 aid=3)',
      'wlan0: associated',
      'vboxdrv: Found 8 processor cores.',
      'vboxdrv: fAsync=0 offMin=0x165 offMax=0x24ab',
      "vboxdrv: TSC mode is 'synchronous', kernel timer mode is 'normal'.",
      'vboxdrv: Successfully loaded version 4.3.26_Ubuntu (interface 0x001a000a).',
      'vboxpci: IOMMU not found (not registered)',
      'ip_tables: (C) 2000-2006 Netfilter Core Team',
      'ip6_tables: (C) 2000-2006 Netfilter Core Team',
      'Ebtables v2.0 registered',
      'bridge: automatic filtering via arp/ip/ip6tables has been deprecated. Update your scripts to load br_netfilter if you need this.',
      'device virbr0-nic entered promiscuous mode',
      'nf_conntrack version 0.5.0 (16384 buckets, 65536 max)',
      'virbr0: port 1(virbr0-nic) entered listening state',
      'virbr0: port 1(virbr0-nic) entered listening state',
      'virbr0: port 1(virbr0-nic) entered disabled state',
      'Initialising...',
      '',
    ];

    // Typing effect
    const text = '/mohan@dev:~$ ssh mohan_lu.com';
    let i = 0;

    const randomDelays = [50, 100, 70, 200, 50, 150, 80, 120];

    const runner = () => {
      if (i < text.length) {
        setTerminalText((prev) => prev + text.charAt(i));

        const nextDelay =
          randomDelays[Math.floor(Math.random() * randomDelays.length)];
        i++;
        setTimeout(runner, nextDelay);
      } else {
        // Pause for 2.5 seconds after "mohanlu"
        setTimeout(() => {
          setOutputLines(['']);
          processOutput();
        }, 1000);
      }
    };

    const processOutput = () => {
      let j = 0;

      const showOutput = () => {
        if (j < output.length) {
          const wrappedLines = wrapText(output[j], 60);
          setOutputLines((prev) => [...prev, ...wrappedLines]);

          j++;
          setTimeout(showOutput, Math.random() * 300 + 100);
        } else {
          setIsComplete(true);
          setTimeout(() => onLoadingComplete?.(), 100);
        }
      };

      showOutput();
    };

    runner();

    return () => {
      setTerminalText('');
      setOutputLines([]);
    };
  }, [onLoadingComplete]);

  // Function to wrap text
  const wrapText = (text: string, maxLength: number): string[] => {
    const lines: string[] = [];
    while (text.length > maxLength) {
      const breakIndex = text.lastIndexOf(' ', maxLength);
      const line =
        breakIndex !== -1
          ? text.slice(0, breakIndex)
          : text.slice(0, maxLength);
      lines.push(line);
      text = text.slice(line.length).trim();
    }
    lines.push(text);
    return lines;
  };

  return (
    <div
      className={`loading-container ${isComplete ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '95%',
        zIndex: showStars ? 1000 : -1,
        backgroundColor: 'black',
        transition: 'opacity 0.5s ease',
        opacity: showStars ? 1 : 0,
        overflow: 'hidden',
      }}
    >
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* Floating Icons */}
      {icons.map((icon, index) => (
        <Image
          key={index}
          src={icon.src}
          alt={`icon-${index}`}
          className="floating-icon"
          style={{
            left: `${icon.left}vw`,
            top: `${icon.top}vh`,
            transform: `rotate(${icon.rotation}deg)`,
          }}
        />
      ))}

      <div className="term">
        {terminalText}
        {outputLines.map((line, index) => (
          <div key={index} className="output-line">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
