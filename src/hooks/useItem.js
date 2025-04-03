import { useState, useEffect } from "react";

const useItem = () => {
    const [cartitem, setCartitem] = useState(null);
    const [itm, setItm] = useState({});


    useEffect(() => {
        const getitm = async () => {
            try {
                const docRef = doc(db, "user", email);
                const querySnapshot = await getDoc(docRef);
                setItm(querySnapshot.data())
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getitm();
    }, []);

    setCartitem(Object.keys(itm).length);

    return [cartitem];
};

export default useItem;