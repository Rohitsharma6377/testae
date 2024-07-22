import { useEffect } from "react";

export function RouteAccessMap(){
    useEffect(()=>{

    }, [])

    const routeAccessMap = {
        admin: ['/admin'],
        seo: ['/admin/blog', '/admin/add-page', '/admin/update-page', '/admin/comments', '/admin/blogmeta', '/admin/author'],
        user: []
    };

    return routeAccessMap;
}