import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteCartItem } from "@/lib/cart";
import { setCart } from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { PiTrashFill } from "react-icons/pi";
import { useToast } from "../ui/use-toast";

type deleteItemProps = {
    orderItemId: string
}

export function DeleteOrderItemAlert({ orderItemId }: deleteItemProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast()
    const dataToast = {
        title: "Delete item success",
        description: "Your item has been deleted from your cart",
        className: "bg-[#ffd6ba] rounded-xl"
    }
    const handleDelete = async () => {
        const updatedCart = await deleteCartItem(orderItemId, 'user_01')
        if (updatedCart.message === 'cart deleted') {
            dispatch(setCart(null))
            toast(dataToast);
        } else {
            dispatch(setCart(updatedCart))
            toast(dataToast);
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
