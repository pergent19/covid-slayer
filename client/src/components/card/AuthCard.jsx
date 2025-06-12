import React from "react";
const AuthCard = ({ title, children, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">{title}</h2>
        {children}
        {footer && <div className="text-center text-sm text-gray-500">{footer}</div>}
      </div>
    </div>
  );
};

export default AuthCard;
