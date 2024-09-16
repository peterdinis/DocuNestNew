"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import { FC } from 'react';

interface AppPaginationProps {
    currentPage: number;
    totalPages: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

const AppPagination: FC<AppPaginationProps> = ({
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
}) => {
    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationPrevious
                    onClick={onPreviousPage}
                    disabled={currentPage === 1}
                />
                <PaginationItem>
                    <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
                </PaginationItem>
                {totalPages > 3 && <PaginationEllipsis />}
                <PaginationItem>
                    <PaginationLink isActive={currentPage === totalPages}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
                <PaginationNext
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                />
            </PaginationContent>
        </Pagination>
    );
};

export default AppPagination;