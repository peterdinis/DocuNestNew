"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { FC, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
  } from '@/components/ui/pagination';

const DashboardActivities: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src="/placeholder.svg?height=36&width=36"
                                alt="Avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="text-sm font-medium">
                                John Doe updated the project status
                            </p>
                            <p className="text-sm text-muted-foreground">
                                2 hours ago
                            </p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src="/placeholder.svg?height=36&width=36"
                                alt="Avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="text-sm font-medium">
                                John Doe updated the project status
                            </p>
                            <p className="text-sm text-muted-foreground">
                                2 hours ago
                            </p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src="/placeholder.svg?height=36&width=36"
                                alt="Avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="text-sm font-medium">
                                John Doe updated the project status
                            </p>
                            <p className="text-sm text-muted-foreground">
                                2 hours ago
                            </p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src="/placeholder.svg?height=36&width=36"
                                alt="Avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="text-sm font-medium">
                                John Doe updated the project status
                            </p>
                            <p className="text-sm text-muted-foreground">
                                2 hours ago
                            </p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src="/placeholder.svg?height=36&width=36"
                                alt="Avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="text-sm font-medium">
                                John Doe updated the project status
                            </p>
                            <p className="text-sm text-muted-foreground">
                                2 hours ago
                            </p>
                        </div>
                    </li>
                </ul>
            </CardContent>
            <Pagination className="mt-6">
            <PaginationContent>
                <PaginationPrevious
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                />
                <PaginationItem>
                    <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
                </PaginationItem>
                {totalPages > 3 && (
                    <PaginationEllipsis />
                )}
                <PaginationItem>
                    <PaginationLink isActive={currentPage === totalPages}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
                <PaginationNext
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                />
            </PaginationContent>
        </Pagination>
        </Card>
    </>
    );
};

export default DashboardActivities;
