'use client'
import { Button } from "@/components/ui/button"
import React from "react"
import { PiMicrosoftExcelLogo } from "react-icons/pi"

export default function ExcelButton({func}: { func: any }) {

    function handleDownload() {
        func()
    }

    return (
        <Button className="flex items-center gap-2 hover:bg-[#097742] bg-[#21a366]" onClick={handleDownload}><PiMicrosoftExcelLogo size={`1.2rem`}/> <span className="max-sm:hidden">Export to Excel</span></Button>
    )
};

