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

interface ICancelAlert {
  setOpen:(value: boolean) => void
  title: string
  cta: string
  message: string
}
  
  
  export function CancelAlert({setOpen, title, cta, message}:ICancelAlert) {

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div>
            <Button variant={'outline'} type="reset">{cta}</Button>
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
            <Button onClick={() => setOpen(false)}>Yes</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  