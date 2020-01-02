import React from 'react';

const Container = props => {
  const { children } = props;

  return (
    <div className="h-screen p-4 flex items-center justify-center">
      <div className="flex flex-col bg-white p-10  shadow">
        {/* header */}
        <header>
          <h1 className="text-center mb-6">SandBox</h1>
        </header>

        {/* app sample goes in here */}
        <main className="mb-16">{children}</main>

        {/* footer */}
        <footer className="text-sm mt-auto border-t pt-3 border-gray-100 text-gray-400 text-center">
          <ul>
            <li>Github</li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Container;
