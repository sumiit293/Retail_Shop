import { useEffect } from "react"
import axios from 'axios'





const MaxProducts = () => {
    return (
        useEffect(() => {

            let category = localStorage.getItem("category").toString();
            let query = localStorage.getItem("searchInput");
            if (category === "All") {

                console.log(category);
                axios.get(`api/product/totalProduct/category/ALL`)
                    .then((res) => {
                        console.log(res.data);
                        localStorage.setItem("maxProduct", res.data)
                    })
                    .catch((error) => console.log(error));

            } else if (category === "custom") {

                console.log(category);
                axios.get(`api/product/length/search/${query}`)
                    .then((res) => { console.log(res.data); localStorage.setItem("maxProduct", res.data) })
                    .catch((error) => console.log(error));

            } else {
                console.log(category);
                axios.get(`api/product/totalProduct/category/from/${category}`)
                    .then((res) => { console.log("Total items available in " + category + res.data); localStorage.setItem("maxProduct", res.data) })
                    .catch((error) => console.log(error));
            }

            return () => {
                return console.log("cleared function called");
            };
        }, [])
    )
}

export default MaxProducts
