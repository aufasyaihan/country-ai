import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface PaginationProps {
    setSearchParams: (params: { page: string }) => void;
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ setSearchParams, currentPage, totalPages}) => {
    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };
    return (
        <div className="flex justify-between items-center mt-4 gap-2">
            <p className="px-4 py-2 text-sm ">
                Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
                <button
                    className="p-2 bg-slate-900 hover:bg-slate-800 rounded-md disabled:opacity-50 cursor-pointer"
                    onClick={() =>
                        handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    <IoChevronBackOutline className="text-white" />
                </button>
                <button
                    className="p-2 bg-slate-900 hover:bg-slate-800 rounded-md disabled:opacity-50 cursor-pointer"
                    onClick={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    <IoChevronForwardOutline className="text-white" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
