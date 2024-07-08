import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteCartItem } from "@/lib/cart";
import { setCart } from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getUserClientSide } from "@/lib/utils";
import { PiTrashFill } from "react-icons/pi";
import { toast } from "sonner"

type deleteItemProps = {
    orderItemId: string
}

export function DeleteOrderItemAlert({ orderItemId }: deleteItemProps) {
    const dispatch = useAppDispatch();
    const dataToast = "Your item has been deleted from your cart"
    const handleDelete = async () => {
        const userData = await getUserClientSide()
        const updatedCart = await deleteCartItem(orderItemId, userData.id)
        if (updatedCart.message === 'cart deleted') {
            dispatch(setCart(null))
            toast.success(dataToast);
        } else {
            dispatch(setCart(updatedCart))
            toast.success(dataToast);
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <PiTrashFill className='flex text-red-500 absolute right-2 hover:cursor-pointer' />
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
                    <AlertDialogAction onClick={() => { handleDelete() }}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
