import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ISubmitButton {
    action:() => void
    title:string
    cta?:string 
    message:string
    icon?: ReactNode
    hidden?: boolean
}
  
  export function SubmitAlert({action, title, icon, cta, message, hidden}:ISubmitButton) {

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className={hidden ? 'hidden' : ''}>
            {icon}
            <Button type="button" className={cta? "block" : "hidden"}>{cta}</Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-96">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => {action()}}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  