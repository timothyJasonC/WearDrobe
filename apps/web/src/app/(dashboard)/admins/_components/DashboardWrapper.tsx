import React from "react"

export default function DashboardWrapper({ children } : { children: React.ReactNode }) {
    return (
        <div className="w-full p-4 sm:p-8 lg:px-10 lg:py-6 h-full">
            { children }
        </div>
    )
};

