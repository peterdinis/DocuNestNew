"use client";

import { useToast } from "@/app/_hooks/shared/use-toast";
import useCreateWorkspace from "@/app/_hooks/workspaces/useCreateWorkspace";
import type { WorkspaceFormData } from "@/app/_types/workspaceTypes";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { Plus } from "lucide-react";
import { type FC, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Header from "../shared/Header";
import Loading from "../shared/Loading";

const CreateNewWorkspaceModal: FC = () => {
	const [selectedEmoji, setSelectedEmoji] = useState<string>("😊");
	const [open, setOpen] = useState<boolean>(false);
	const { mutate: createWorkspace, isPending } = useCreateWorkspace();
	const form = useForm<WorkspaceFormData>();
	const { toast } = useToast();

	const onSubmit: SubmitHandler<WorkspaceFormData> = (data) => {
		createWorkspace(
			{
				name: data.name,
				description: data.description,
				workspaceEmoji: selectedEmoji,
			},
			{
				onSuccess: () => {
					form.reset();
					setOpen(false);
				},
				onError: (error: any) => {
					if (error.response?.status === 400) {
						toast({
							title: "Workspace creation failed",
							description: "A workspace with this name already exists.",
							duration: 2000,
						});
					} else {
						toast({
							title: "Error",
							description: "An unexpected error occurred.",
							duration: 2000,
						});
					}
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button variant={"link"} size="default">
					<Plus className="h-5 w-5 cursor-pointer text-gray-700 dark:text-white" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Create new workspace" />
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Workspace Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="Workspace Description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem>
							<FormLabel>Emoji</FormLabel>
							<EmojiPicker
								onEmojiClick={(emojiObject: EmojiClickData) =>
									setSelectedEmoji(emojiObject.emoji)
								}
							/>
							<FormDescription>Selected Emoji: {selectedEmoji}</FormDescription>
						</FormItem>

						<Button type="submit" disabled={isPending}>
							{isPending ? <Loading /> : "Create Workspace"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateNewWorkspaceModal;
