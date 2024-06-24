import React from "react"
import { SetupAccountDialog } from "../../_components/SetupAccountDialog";
import SetupAdminAccountForm from "../_components/SetupAdminAccountForm";

export default function Page() {
    
    return (
        <SetupAccountDialog className="absolute" title={"Welcome new candidates!"} form={<SetupAdminAccountForm />} optionalText="Please fill in the data below to verify your account." />
    )
};

