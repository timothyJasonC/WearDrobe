import SetupUserAccountForm from "./SetupUserAccountForm";

  
  export function SetupAccountDialog({ title, form, className }: { title: string, form: any, className: string }) {
    return (
        <div className={`${ className }`}>
            <div className="border-2 border-black/20 rounded-xl p-4">
                <h3 className="font-semibold text-xl mb-8">{ title }</h3>
                <SetupUserAccountForm />
            </div>
        </div>
    )
  }
  