import SetupUserAccountForm from "./SetupUserAccountForm";
  
export function SetupAccountDialog({ title, className }: { title: string, className: string }) {
    return (
        <div className={`${ className }`}>
            
            <div className=" max-lg:border-2 max-lg:border-black/15 rounded-xl p-4 bg-white">
                <h3 className="font-semibold text-xl mb-8">{ title }</h3>
                <SetupUserAccountForm />
            </div>
        </div>
    )
}
  