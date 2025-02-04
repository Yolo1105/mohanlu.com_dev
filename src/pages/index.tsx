import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import config from '../../config.json';
import Sidebar from '../components/Sidebar';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';
import { sumfetch } from '../utils/bin';

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
  const [sectionTitle, setSectionTitle] = useState('加载中...');
  const [systemInfo, setSystemInfo] = useState({
    currentTime: '正在获取当前时间...',
    osInfo: 'Detecting operating system...',
    browserInfo: 'Detecting browser information...',
    ipAddress: 'Loading IP address...',
    latency: 'Calculating network latency...',
  });

  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const init = React.useCallback(() => setHistory(banner()), [setHistory]);

  const initSystemInfo = React.useCallback(async () => {
    try {
      const result = await sumfetch([]);
      setSystemInfoHistory(result);
    } catch (error) {
      setSystemInfoHistory(['Error loading system information']);
    }
  }, []);

  useEffect(() => {
    init();
    initSystemInfo();
  }, [init, initSystemInfo]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history, inputRef]); // Added inputRef to dependencies

  useEffect(() => {
    const lang = navigator.language.includes('zh') ? 'zh' : 'en';

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 6) return lang === 'zh' ? '凌晨好！' : 'Good early morning!';
      if (hour < 12) return lang === 'zh' ? '早上好！' : 'Good morning!';
      if (hour < 14) return lang === 'zh' ? '中午好！' : 'Good noon!';
      if (hour < 18) return lang === 'zh' ? '下午好！' : 'Good afternoon!';
      if (hour < 22) return lang === 'zh' ? '晚上好！' : 'Good evening!';
      return lang === 'zh' ? '深夜好！' : 'Good night!';
    };

    setSectionTitle(getGreeting());

    const updateSystemInfo = () => {
      const currentTime = new Date().toLocaleString();
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

      const browser = userAgent.includes('Chrome')
        ? 'Google Chrome'
        : userAgent.includes('Firefox')
        ? 'Mozilla Firefox'
        : userAgent.includes('Safari') && !userAgent.includes('Chrome')
        ? 'Apple Safari'
        : lang === 'zh'
        ? '未知浏览器'
        : 'Unknown Browser';

      setSystemInfo((prev) => ({
        ...prev,
        currentTime,
        osInfo: `${deviceType} (${platform})`,
        browserInfo: browser,
      }));
    };

    const updateLatency = async () => {
      const startTime = Date.now();
      try {
        await fetch('https://www.google.com', { mode: 'no-cors' });
        const latency = Date.now() - startTime;
        setSystemInfo((prev) => ({
          ...prev,
          latency: `${latency}ms`,
        }));
      } catch {
        setSystemInfo((prev) => ({
          ...prev,
          latency: lang === 'zh' ? '无法测量' : 'Unable to measure',
        }));
      }
    };

    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setSystemInfo((prev) => ({
          ...prev,
          ipAddress: data.ip,
        }));
      } catch {
        setSystemInfo((prev) => ({
          ...prev,
          ipAddress: lang === 'zh' ? '无法获取' : 'Unable to fetch',
        }));
      }
    };

    updateSystemInfo();
    fetchIP();
    updateLatency();

    const timeInterval = setInterval(updateSystemInfo, 1000);
    const latencyInterval = setInterval(updateLatency, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(latencyInterval);
    };
  }, []);

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

      <div className="fixed inset-0 z-0">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <Sidebar />

      <div
        className="flex flex-grow overflow-hidden h-[calc(100vh-10rem)] mt-20"
        style={{
          marginLeft: '50px',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
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

        <div
          className="flex flex-col"
          style={{
            width: `calc(100% - 50px - ${dividerPosition}%)`,
          }}
        >
          <div className="h-1/2 p-4 border-2 block-right-1 overflow-y-auto">
            <div className="min-h-full bg-black p-1">
              <div className="flex flex-row items-stretch">
                <div className="flex flex-col gap-4 items-start">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="relative w-16 h-10">
                      <div className="absolute w-8 h-6 border border-white left-4 top-2" />
                      <div
                        className="absolute w-6 h-5 left-2 top-0"
                        style={{
                          backgroundColor: `rgb(${60 + index * 20}, ${
                            60 + index * 20
                          }, ${60 + index * 20})`,
                        }}
                      />
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

                <div className="flex-divider"></div>

                <div className="flex flex-col gap-4">
                  <h1 className="text-white font-bold text-4xl">
                    Welcome to my site!
                  </h1>
                  <span className="text-white text-sm">
                    Developer Profile: Mohan Lu
                  </span>
                  <span className="text-white text-sm">
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
            <h2 className="text-4xl font-bold mb-4 mt-2">{sectionTitle}</h2>

            <div className="flex">
              <div className="text-[rgba(255,255,255,0.5)] mr-4 text-right">
                {Array.from({ length: 13 }).map((_, index) => (
                  <p key={index} className="min-h-6">
                    {index + 1}
                  </p>
                ))}
                <p className="min-h-6"></p>
              </div>

              <div className="flex-grow">
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

                <p>
                  <span className="font-bold">当前时间是：</span>
                  <span>{systemInfo.currentTime}</span>
                </p>
                <p>
                  <span className="font-bold">操作系统：</span>
                  <span>{systemInfo.osInfo}</span>
                </p>
                <p>
                  <span className="font-bold">浏览器信息：</span>
                  <span>{systemInfo.browserInfo}</span>
                </p>
                <p>
                  <span className="font-bold">IP 地址：</span>
                  <span>{systemInfo.ipAddress}</span>
                </p>
                <p>
                  <span className="font-bold">网络延迟：</span>
                  <span>{systemInfo.latency}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
