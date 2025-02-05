import { DatePickerWithRange } from '@/app/(dashboard)/admins/stocks/_components/datePicker';
import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker';
import { PiMagnifyingGlass } from 'react-icons/pi'

export default function SearchOrder({ placeholder = 'Search title...', data, date, setDate }: { placeholder?: string, data: string, date: DateRange | undefined, setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>> }) {
    const [query, setQuery] = useState(data);
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        let newUrl = '';

        if (query && query.length > 0) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'q',
                value: query
            });
        } else if (query.length === 0) {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['q']
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['q']
            });
        }
        router.push(newUrl, { scroll: false });
    }, [query, searchParams, router])



    return (

        <div className='flex items-center justify-start gap-4' >
            <div className='relative flex items-center justify-end w-full md:w-64 lg:w-80'>
                <Input
                    type="text"
                    placeholder={placeholder}
                    defaultValue={data}
                    onChange={(e) => setQuery(e.target.value)}
                    className='w-full' 
                />
                <label className='absolute right-2' htmlFor="search"><PiMagnifyingGlass size={`1.3rem`} /></label>
            </div>
            <DatePickerWithRange date={date} setDate={setDate} />
        </div >
    )
}
