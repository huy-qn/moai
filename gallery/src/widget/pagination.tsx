import { Pagination } from "@moai/core/src";
import { useCallback, useState } from "react";

export const PaginationGallery = () => {
	const [page, setPage_] = useState(5);
	const setPage = useCallback((page): Promise<void> => {
		return new Promise((resolve, _reject) => {
			setPage_(page);
			window.setTimeout(() => resolve(), 1000);
		});
	}, []);

	return <Pagination value={page} setValue={setPage} max={10} min={1} />;
};
