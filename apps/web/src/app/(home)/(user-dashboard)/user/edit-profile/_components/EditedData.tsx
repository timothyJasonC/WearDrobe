import React from "react"
import { PiArrowRight } from "react-icons/pi"

export default function EditedData({ data, newData, labelText }:{ data: any, newData: any, labelText:string }) {
    return (
        <>
            { data != newData ?
                <div className="flex items-center justify-between flex-wrap">
                    <div className="font-semibold">{ labelText }:</div>
                    <div className="flex items-center lg:min-w-[32rem] gap-2 lg:gap-4 flex-wrap"><span>&nbsp;{ data }&nbsp;</span><PiArrowRight /><span>&nbsp;{ newData }</span></div>
                </div>
            :
                <></>
            }
        </>
    )
};

