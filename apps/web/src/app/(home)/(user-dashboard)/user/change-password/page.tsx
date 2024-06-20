import React from 'react';
import Wrapper from '../../_components/Wrapper';
import AlertDialogResetPass from '@/app/(home)/(user-dashboard)/user/change-password/_components/AlertDialogResetPass';

export default function Page() {

    return (
        <Wrapper title={"Change Password"} className={"flex flex-col gap-10"}>
            <div className="flex flex-col gap-2 items-start">
                <p className="text-black/60 text-xs">*You can reset your password once for each request</p>
                <AlertDialogResetPass confirmText={'Make Request'} cancelText={'Cancel'} />
            </div>
        </Wrapper>
    );
}
