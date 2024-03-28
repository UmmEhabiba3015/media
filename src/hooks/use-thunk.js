import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

function useThunk (thunk) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg))
        .unwrap()
        .catch((err)=> setError(err))
        .finally(()=> setIsLoading(false))
    }, [dispatch, thunk]);

    return [runThunk, isLoading, error];
}
export default useThunk;