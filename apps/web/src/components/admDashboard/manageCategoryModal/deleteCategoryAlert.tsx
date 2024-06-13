import { deleteCategory } from "@/app/action";
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
  import { PiTrashFill } from "react-icons/pi";
import { toast } from "sonner";
  
  
  export function DeleteCategoryAlert({id, getCategoryData}:{id:string, getCategoryData: () => void}) {

    const handleDelete = async () => {
        const data = await deleteCategory(id);
        if (data.status === "ok") {
            toast.success(data.message)
        } else if (data.status === "error") {
            toast.error(data.message)
        }
        getCategoryData();
      };
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <PiTrashFill className='flex text-red-500'/>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-96">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and the category will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {handleDelete()}}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  