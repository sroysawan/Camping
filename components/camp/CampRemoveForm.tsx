'use client'
import { CardRemoveButton } from "../form/Buttons"
import { removeLandmarkAction } from "@/actions/action"
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"
  

const CampRemoveForm =  ({ landmarkId }: { landmarkId: string }) => {
    const pathName = usePathname()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { toast } = useToast();

    const handleConfirm = async () => {
        await removeLandmarkAction({ landmarkId, pathName })
        setIsDialogOpen(false) // ปิด Dialog หลังลบสำเร็จ
        toast({
            description: "Remove Landmark Success!!!"
        })
    }
    return (
   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
    <div>
        <CardRemoveButton />
    </div>
</DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure</DialogTitle>
                        <DialogDescription>
                            Do you really want to delete?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleConfirm}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

    )
}

export default CampRemoveForm
