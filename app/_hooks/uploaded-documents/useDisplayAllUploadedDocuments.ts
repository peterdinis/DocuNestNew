"use client";

import { allUploadedDocuments } from "@/app/_store/queries/uploadDocumentQueries";
import { useQuery } from "@tanstack/react-query";

const useDisplayAllUploadedDocuments = () => {
	return useQuery({
		queryKey: ["uploadedDocuments"],
		queryFn: async () => {
			return await allUploadedDocuments();
		},
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useDisplayAllUploadedDocuments;
