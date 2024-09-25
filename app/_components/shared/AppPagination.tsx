import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import { FC } from 'react';

interface AppPaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}

const AppPagination: FC<AppPaginationProps> = ({
    currentPage,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <Pagination className='mt-6'>
            <PaginationContent>
                <PaginationPrevious
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                />

                <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                <PaginationNext onClick={handleNext} disabled={false} />
            </PaginationContent>
        </Pagination>
    );
};

export default AppPagination;
