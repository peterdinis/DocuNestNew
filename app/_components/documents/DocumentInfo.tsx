"use client";

import useUpdateWorkspaceDocument from "@/app/_hooks/workspace-documents/useUpdateWorkspaceDocument";
import useWorkspaceDocumentDetail from "@/app/_hooks/workspace-documents/useWorkspaceDocumentDetail";
import { ConfettiButton } from "@/components/ui/confetti-button";
import { Input } from "@/components/ui/input";
import { saveAs } from "file-saver";
// @ts-expect-error: This import may not have TypeScript definitions available.
import htmlDocx from "html-docx-js/dist/html-docx";
import htmlToPdfmake from "html-to-pdfmake";
import { useParams } from "next/navigation";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { type FC, useEffect, useState } from "react";
import Loading from "../shared/Loading";
import QuillEditor from "../workspaces/documents/QuillEditor";
import DocToolbar from "./DocToolbar";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DocumentInfo: FC = () => {
	const { id } = useParams<{ id: string }>();
	const [isEditMode, setIsEditMode] = useState(false);
	const [name, setName] = useState("");
	const [content, setContent] = useState("");

	const { data, isLoading, isError, error } = useWorkspaceDocumentDetail({
		id,
	});
	const { mutate: updateDocument } = useUpdateWorkspaceDocument({ id }); // Use the update hook

	useEffect(() => {
		if (data) {
			setName(data.name);
			setContent(data.content);
		}
	}, [data]);

	const handleEditToggle = () => {
		setIsEditMode(!isEditMode);
	};

	const handleSave = () => {
		if (isEditMode) {
			// Call the update mutation
			updateDocument({ name, content });
			setIsEditMode(false); // Exit edit mode after saving
		}
	};

	const handleDownload = () => {
		const tempElement = document.createElement("div");
		tempElement.innerHTML = content;

		const plainTextContent =
			tempElement.textContent || tempElement.innerText || "";

		const blob = new Blob([plainTextContent], {
			type: "text/plain;charset=utf-8",
		});

		saveAs(blob, `${name}.txt`);
	};

	const handleExportPDF = () => {
		const pdfContent = htmlToPdfmake(content);
		const documentDefinition = { content: pdfContent };
		pdfMake.createPdf(documentDefinition).download(`${name}.pdf`);
	};

	const handleDocxDownload = () => {
		const converted = htmlDocx.asBlob(content);
		saveAs(converted, `${name}.docx`);
	};

	if (isLoading) return <Loading />;

	if (isError) {
		const errorMessage = (error as Error)?.message || "Something went wrong.";
		return <p className="text-xl font-bold text-red-700">{errorMessage}</p>;
	}

	return (
		<>
			<h2 className="mt-5 flex justify-center align-top text-3xl dark:text-blue-50">
				Document Info
			</h2>
			<DocToolbar
				isEditMode={isEditMode}
				handleEditToggle={handleEditToggle}
				handleDownload={handleDownload}
				handleExportPDF={handleExportPDF}
				handleDocxDownload={handleDocxDownload}
				documentId={id}
			/>

			<div className="ml-4 mt-4">
				<form onSubmit={(e) => e.preventDefault()}>
					<Input
						value={name}
						disabled={!isEditMode}
						onChange={(e) => setName(e.target.value)}
					/>
					{isEditMode && (
						<ConfettiButton
							variant={"default"}
							className="mt-4"
							onClick={handleSave} // Call handleSave on click
						>
							Save document
						</ConfettiButton>
					)}
					<div className="mt-4">
						<QuillEditor
							value={content}
							readOnly={!isEditMode}
							onChange={setContent}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default DocumentInfo;
