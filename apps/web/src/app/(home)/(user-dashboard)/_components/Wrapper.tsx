import React from "react"

export default function Wrapper({ children, title, className }: { children: React.ReactNode, title: string, className: string }) {
    return (
        <div>
            <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-10">{ title }</h2>
            <div className={`${ className }`}>
                { children }
            </div>
        </div>
    )
};

