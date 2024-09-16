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
    onPageChange: (page: number) => void;
}

const AppPagination: FC<AppPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <Pagination className='mt-6'>
            <PaginationContent>
                <PaginationPrevious
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                />
                <PaginationItem>
                    <PaginationLink
                        isActive={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
                {totalPages > 3 && <PaginationEllipsis />}
                <PaginationItem>
                    <PaginationLink
                        isActive={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
                <PaginationNext
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                />
            </PaginationContent>
        </Pagination>
    );
};

export default AppPagination;
