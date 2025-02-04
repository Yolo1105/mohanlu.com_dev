import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import config from '../../config.json';
import Sidebar from '../components/Sidebar';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';
import { sumfetch } from '../utils/bin';
import Image from 'next/image';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const containerRef = React.useRef(null);
  const [dividerPosition, setDividerPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [systemInfoHistory, setSystemInfoHistory] = useState<string | string[]>(
    [],
  );
  const [floatingIcons, setFloatingIcons] = useState<
    {
      src: string;
      left: number;
      top: number;
      rotation: number;
      id: number;
    }[]
  >([]);

  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

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

  const init = React.useCallback(() => setHistory(banner()), []);
  const initSystemInfo = React.useCallback(async () => {
    try {
      // Pass an empty array as default arguments
      const result = await sumfetch([]);
      setSystemInfoHistory(result);
    } catch (error) {
      setSystemInfoHistory(['Error loading system information']);
    }
  }, []);

  useEffect(() => {
    init();
    initSystemInfo(); // Initialize system info block
  }, [init, initSystemInfo]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);

  useEffect(() => {
    const spawnIcons = () => {
      // Remove icons that have moved out of the screen
      setFloatingIcons((prevIcons) =>
        prevIcons.filter((icon) => {
          const iconElement = document.getElementById(
            `floating-icon-${icon.id}`,
          );
          return iconElement && iconElement.getBoundingClientRect().top > -100;
        }),
      );

      // Spawn new icons if there are few icons
      if (floatingIcons.length < 5) {
        const newIcon = {
          src: availableIcons[
            Math.floor(Math.random() * availableIcons.length)
          ],
          left: Math.random() * 100, // Spread across the full width
          top: 100, // Start from bottom of screen
          rotation: Math.random() * 360,
          id: Date.now(), // Unique identifier
        };
        setFloatingIcons((prevIcons) => [...prevIcons, newIcon]);
      }
    };

    // Spawn initial icons
    if (floatingIcons.length === 0) {
      for (let i = 0; i < 3; i++) {
        const newIcon = {
          src: availableIcons[
            Math.floor(Math.random() * availableIcons.length)
          ],
          left: Math.random() * 100,
          top: 100,
          rotation: Math.random() * 360,
          id: Date.now() + i,
        };
        setFloatingIcons((prevIcons) => [...prevIcons, newIcon]);
      }
    }

    // Spawn icons periodically
    const iconInterval = setInterval(spawnIcons, 2000);

    return () => clearInterval(iconInterval);
  }, [floatingIcons]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    });

    if (isDragging) {
      const newPosition =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setDividerPosition(Math.max(20, Math.min(80, newPosition)));
    }
  };

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Preserved original commented star background div */}
      <div className="fixed inset-0 z-0">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((icon, index) => (
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

      <Sidebar />

      <div
        className="flex flex-grow overflow-hidden h-[calc(100vh-10rem)] mt-20"
        style={{
          marginLeft: '50px', // Adjusted for sidebar width
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Left Half with Resizable Width */}
        <div
          className="p-4 border-2 block-left mr-2 ml-6"
          style={{
            width: `${dividerPosition}%`,
          }}
        >
          <div ref={containerRef} className="overflow-y-auto h-full">
            <History history={history} />
            <Input
              inputRef={inputRef}
              containerRef={containerRef}
              command={command}
              history={history}
              lastCommandIndex={lastCommandIndex}
              setCommand={setCommand}
              setHistory={setHistory}
              setLastCommandIndex={setLastCommandIndex}
              clearHistory={clearHistory}
            />
          </div>
        </div>

        {/* Right Half */}
        <div
          className="flex flex-col"
          style={{
            width: `calc(100% - 50px - ${dividerPosition}%)`,
          }}
        >
          {/* Right Top Block */}
          <div className="h-1/2 p-4 border-2 block-right-1 overflow-y-auto">
            <div className="min-h-full bg-black p-1">
              <div className="flex flex-row items-stretch">
                {/* Geometric Patterns */}
                <div className="flex flex-col gap-4 items-start">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="relative w-16 h-10">
                      {/* Background empty rectangle with white border */}
                      <div className="absolute w-8 h-6 border border-white left-4 top-2" />
                      {/* Left solid square */}
                      <div
                        className="absolute w-6 h-5 left-2 top-0"
                        style={{
                          backgroundColor: `rgb(${60 + index * 20}, ${
                            60 + index * 20
                          }, ${60 + index * 20})`,
                        }}
                      />
                      {/* Right solid square */}
                      <div
                        className="absolute w-6 h-5 right-2 top-5"
                        style={{
                          backgroundColor: `rgb(${40 + index * 20}, ${
                            40 + index * 20
                          }, ${40 + index * 20})`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Vertical Line */}
                <div className="flex-divider"></div>

                <div className="flex flex-col gap-4">
                  <h1 className="text-white font-bold text-4xl">
                    Welcome to my site!
                  </h1>
                  <span className="text-white text-sm">
                    Developer Profile: Mohan Lu
                  </span>
                  <span className="text-white text-sm ">
                    📧 CONTACT: ml7612@nyu.edu | +1 347-616-0606
                  </span>
                  <span className="text-white text-sm">
                    🔗 LinkedIn: https://www.linkedin.com/in/mohan-lu/
                  </span>
                  <span className="text-white text-sm">
                    📄 RESUME: Available upon request
                  </span>
                  <span className="text-white text-sm">
                    🐙 GitHub: https://github.com/Yolo1105
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bottom Half */}
          <div className="h-1/2 p-4 border-2 mt-2 block-right-2">
            <h2
              id="section-title"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                marginTop: '0.5rem',
              }}
            >
              加载中...
            </h2>

            {/* Dynamic Information Section */}
            <div className="flex">
              {/* Line Numbers */}
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginRight: '1rem',
                  textAlign: 'right',
                }}
              >
                {Array.from({ length: 13 }).map((_, index) => (
                  <p key={index} style={{ minHeight: '1.5rem' }}>
                    {index + 1}
                  </p>
                ))}
                <p style={{ minHeight: '1.5rem' }}></p>
              </div>

              {/* Main Information */}
              <div className="flex-grow">
                {/* Bash Header Section */}
                {[
                  '#!/bin/bash',
                  'echo "============================="',
                  'echo "🖥 SYSTEM INFO:"',
                  'echo "============================="',
                ].map((line, index) => (
                  <p key={index} className="extra-line">
                    {line}
                  </p>
                ))}

                <p id="currentTime">
                  <span style={{ fontWeight: 'bold' }}>当前时间是：</span>
                  <span>正在获取当前时间...</span>
                </p>
                <p id="os-info">
                  <span style={{ fontWeight: 'bold' }}>操作系统：</span>
                  <span>Detecting operating system...</span>
                </p>
                <p id="browser-info">
                  <span style={{ fontWeight: 'bold' }}>浏览器信息：</span>
                  <span>Detecting browser information...</span>
                </p>
                <p id="ip-address">
                  <span style={{ fontWeight: 'bold' }}>IP 地址：</span>
                  <span>Loading IP address...</span>
                </p>
                <p id="latency">
                  <span style={{ fontWeight: 'bold' }}>网络延迟：</span>
                  <span>Calculating network latency...</span>
                </p>
              </div>
            </div>
          </div>

          {/* React useEffect Hook to Handle Dynamic Updates */}
          {useEffect(() => {
            const lang = navigator.language.includes('zh') ? 'zh' : 'en';

            // 动态问候语
            const getGreeting = () => {
              const hour = new Date().getHours();
              if (hour < 6)
                return lang === 'zh' ? '凌晨好！' : 'Good early morning!';
              if (hour < 12)
                return lang === 'zh' ? '早上好！' : 'Good morning!';
              if (hour < 14) return lang === 'zh' ? '中午好！' : 'Good noon!';
              if (hour < 18)
                return lang === 'zh' ? '下午好！' : 'Good afternoon!';
              if (hour < 22)
                return lang === 'zh' ? '晚上好！' : 'Good evening!';
              return lang === 'zh' ? '深夜好！' : 'Good night!';
            };

            const text =
              lang === 'zh'
                ? {
                    greeting: `${getGreeting()}`,
                    currentTime: '当前时间是：',
                    os: '操作系统：',
                    browser: '浏览器信息：',
                    ip: 'IP 地址：',
                    latency: '网络延迟：',
                  }
                : {
                    greeting: `${getGreeting()}`,
                    currentTime: 'echo "🕒 Time: ......... ',
                    os: 'echo "💻 OS: ......... ',
                    browser: 'echo "🌍 Browser: ......... ',
                    ip: 'echo "📡 IP Address: ......... ',
                    latency: 'echo "📶 Network: ......... ',
                  };

            // Update Section Title
            document.getElementById('section-title')!.innerText = text.greeting;

            // Initialize Dynamic Information
            const initializeInfo = () => {
              // Current Time
              let lastTime = null;
              const updateTime = () => {
                const currentTime = new Date().toLocaleString();
                if (currentTime !== lastTime) {
                  document.getElementById(
                    'currentTime',
                  )!.innerHTML = `<span style="font-weight: bold;">${text.currentTime}</span> ${currentTime}"`;
                  lastTime = currentTime;
                }
              };
              updateTime();
              setInterval(updateTime, 1000);

              // Operating System (Merged with Device Info)
              const platform = navigator.platform;
              const userAgent = navigator.userAgent;

              let deviceType = lang === 'zh' ? '未知设备' : 'Unknown Device';
              if (/Windows/i.test(userAgent))
                deviceType = lang === 'zh' ? 'Windows 电脑' : 'Windows PC';
              else if (/Mac/i.test(userAgent))
                deviceType = lang === 'zh' ? 'Mac 电脑' : 'Mac PC';
              else if (/Linux/i.test(userAgent))
                deviceType = lang === 'zh' ? 'Linux 设备' : 'Linux Device';
              else if (/Android/i.test(userAgent))
                deviceType = lang === 'zh' ? 'Android 手机' : 'Android Phone';
              else if (/iPhone|iPad|iPod/i.test(userAgent))
                deviceType = lang === 'zh' ? 'iOS 设备' : 'iOS Device';

              document.getElementById(
                'os-info',
              )!.innerHTML = `<span style="font-weight: bold;">${text.os}</span> ${deviceType} (${platform})"`;

              // Browser Info
              const browser = userAgent.includes('Chrome')
                ? 'Google Chrome'
                : userAgent.includes('Firefox')
                ? 'Mozilla Firefox'
                : userAgent.includes('Safari') && !userAgent.includes('Chrome')
                ? 'Apple Safari'
                : lang === 'zh'
                ? '未知浏览器'
                : 'Unknown Browser';

              document.getElementById(
                'browser-info',
              )!.innerHTML = `<span style="font-weight: bold;">${text.browser}</span> ${browser}"`;

              // IP Address
              fetch('https://api.ipify.org?format=json')
                .then((response) => response.json())
                .then((data) => {
                  document.getElementById(
                    'ip-address',
                  )!.innerHTML = `<span style="font-weight: bold;">${text.ip}</span> ${data.ip}"`;
                })
                .catch(() => {
                  document.getElementById(
                    'ip-address',
                  )!.innerHTML = `<span style="font-weight: bold;">${
                    text.ip
                  }</span> ${lang === 'zh' ? '无法获取' : 'Unable to fetch'}`;
                });

              // Latency
              const updateLatency = () => {
                const startTime = Date.now();
                fetch('https://www.google.com', { mode: 'no-cors' })
                  .then(() => {
                    const latency = Date.now() - startTime;
                    document.getElementById(
                      'latency',
                    )!.innerHTML = `<span style="font-weight: bold;">${text.latency}</span> ${latency}ms"`;
                  })
                  .catch(() => {
                    document.getElementById(
                      'latency',
                    )!.innerHTML = `<span style="font-weight: bold;">${
                      text.latency
                    }</span> ${
                      lang === 'zh' ? '无法测量' : 'Unable to measure'
                    }`;
                  });
              };
              updateLatency();
              setInterval(updateLatency, 1000);
            };

            initializeInfo();
          }, [])}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
