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

  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const [currentTime, setCurrentTime] = useState('正在获取当前时间...');
  const [osInfo, setOsInfo] = useState('Detecting operating system...');
  const [browserInfo, setBrowserInfo] = useState(
    'Detecting browser information...',
  );
  const [ipAddress, setIpAddress] = useState('Loading IP address...');
  const [latency, setLatency] = useState('Calculating network latency...');
  const [greeting, setGreeting] = useState('加载中...');

  const init = React.useCallback(() => setHistory(banner()), [setHistory]); // Fixed dependency
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
            const sectionTitle = document.getElementById('section-title');
            if (sectionTitle) {
              sectionTitle.textContent = text.greeting;
            }

            // Initialize Dynamic Information
            const initializeInfo = () => {
              // Current Time
              let lastTime = null;
              const updateTime = () => {
                const currentTime = new Date().toLocaleString();
                if (currentTime !== lastTime) {
                  const currentTimeElement =
                    document.getElementById('currentTime');
                  if (currentTimeElement) {
                    currentTimeElement.innerHTML = `<span style="font-weight: bold;">${text.currentTime}</span> ${currentTime}`;
                  }
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

              const osInfoElement = document.getElementById('os-info');
              if (osInfoElement) {
                osInfoElement.innerHTML = `<span style="font-weight: bold;">${text.os}</span> ${deviceType} (${platform})`;
              }

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

              const browserInfoElement =
                document.getElementById('browser-info');
              if (browserInfoElement) {
                browserInfoElement.innerHTML = `<span style="font-weight: bold;">${text.browser}</span> ${browser}`;
              }

              // IP Address
              fetch('https://api.ipify.org?format=json')
                .then((response) => response.json())
                .then((data) => {
                  const ipAddressElement =
                    document.getElementById('ip-address');
                  if (ipAddressElement) {
                    ipAddressElement.innerHTML = `<span style="font-weight: bold;">${text.ip}</span> ${data.ip}`;
                  }
                })
                .catch(() => {
                  const ipAddressElement =
                    document.getElementById('ip-address');
                  if (ipAddressElement) {
                    ipAddressElement.innerHTML = `<span style="font-weight: bold;">${
                      text.ip
                    }</span> ${lang === 'zh' ? '无法获取' : 'Unable to fetch'}`;
                  }
                });

              // Latency
              const updateLatency = () => {
                const startTime = Date.now();
                fetch('https://www.google.com', { mode: 'no-cors' })
                  .then(() => {
                    const latency = Date.now() - startTime;
                    const latencyElement = document.getElementById('latency');
                    if (latencyElement) {
                      latencyElement.innerHTML = `<span style="font-weight: bold;">${text.latency}</span> ${latency}ms`;
                    }
                  })
                  .catch(() => {
                    const latencyElement = document.getElementById('latency');
                    if (latencyElement) {
                      latencyElement.innerHTML = `<span style="font-weight: bold;">${
                        text.latency
                      }</span> ${
                        lang === 'zh' ? '无法测量' : 'Unable to measure'
                      }`;
                    }
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
