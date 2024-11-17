"use client";

import { useToast } from "@/app/_hooks/shared/use-toast";
import { UploadDropzone } from "@/app/_utils/uploadthing";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { type FC, useState } from "react";

const UploadedDocumentModal: FC = () => {
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				<Button variant={"ghost"} onClick={() => setIsOpen(true)}>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Document</DialogTitle>
					<DialogDescription>
						<UploadDropzone
							endpoint="fileUploader"
							onClientUploadComplete={() => {
								toast({
									title: "Document was uploaded",
									duration: 2000,
									className: "bg-green-800 text-white font-bold text-xl",
								});
								setIsOpen(false); // Close modal on upload success
							}}
							onUploadError={(error: Error) => {
								toast({
									title: `ERROR! ${error.message}`,
									duration: 2000,
									className: "bg-red-800 text-white font-bold text-xl",
								});
							}}
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default UploadedDocumentModal;
