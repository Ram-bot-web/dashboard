import React, { Suspense, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy load components
const Sidebar = React.lazy(() => import("./components/Sidebar"));
const Header = React.lazy(() => import("./components/Header"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Suspense
          fallback={
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </Suspense>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Suspense
            fallback={
              <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 mb-4 ml-3"></div>
            }
          >
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          </Suspense>

          <main className="flex-1 overflow-auto">
            <Suspense
              fallback={
                <div className="ml-3">
                  <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
                  <div>
                    <div
                      role="status"
                      className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
                    >
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    <div
                      role="status"
                      className="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
                    >
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                      <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      <div className="flex items-baseline mt-4">
                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                        <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                        <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div
                      role="status"
                      className="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
                    >
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                      <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      <div className="flex items-baseline mt-4">
                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                        <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                        <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              }
            >
              <Dashboard />
            </Suspense>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
