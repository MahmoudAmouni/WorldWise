import { useSearchParams } from "react-router-dom";

function useURLPosition() {
    const [searchParams] = useSearchParams();
    let lat = searchParams.get("lat");
    let lng = searchParams.get("lng");
return [lat,lng]
}

export default useURLPosition;