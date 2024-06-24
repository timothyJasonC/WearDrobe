export function SetupAccountDialog({ title, className, form, optionalText }: { title: string, className: string, form: any, optionalText?: string }) {
    return (
        <div className={`${ className }`}>
            <div className="z-[1] relative max-lg:border-2 max-lg:border-black/15 rounded-xl p-4 bg-white">
            <div className="mb-8">
                <h3 className="font-semibold text-xl">{ title }</h3>
                { optionalText && <span className="text-black/60">{ optionalText }</span> }
            </div>
                { form }
            </div>
        </div>
    )
}
  