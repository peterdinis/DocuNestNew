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
import type { FC } from "react";
import Header from "../../shared/Header";

const UploadDocumentToWorkspaceModal: FC = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button size="icon" variant="outline">
					<Plus className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Upload new document" />
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default UploadDocumentToWorkspaceModal;
