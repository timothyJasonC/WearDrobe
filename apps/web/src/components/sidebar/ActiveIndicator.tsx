import React from "react"
import { ToolTip } from "../Tooltip"

export default function ActiveIndicator({ isActive, activeText, nonActiveText }: { isActive: boolean, activeText: string, nonActiveText: string }) {
    return (
        <ToolTip className='' content={`${ isActive ? activeText : nonActiveText }`} >
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
        </ToolTip>
    )
};

