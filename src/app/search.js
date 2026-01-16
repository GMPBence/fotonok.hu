import Fuse from "fuse.js";

const getPlansBySeacrh = (search, plans) => {
    const fuse = new Fuse(plans, {
        keys: [
            { name: "title", weight: 0.5 },
            { name: "description", weight: 0.3 },
            { name: "summary", weight: 0.2 }
        ],
        threshold: 0.4, 
    });
    return fuse.search(search);
};

export default getPlansBySeacrh;