import React from "react"
import { SetupAccountDialog } from "../../_components/SetupAccountDialog";
import SetupUserAccountForm from "../_components/SetupUserAccountForm";

export default function Page() {
    
    return (
        <SetupAccountDialog className="absolute" title={"Just a few more steps.."} form={<SetupUserAccountForm />}  />
    )
};

