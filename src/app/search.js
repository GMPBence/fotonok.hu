import Fuse from "fuse.js";

const plans = [
    {
        title: "Teszt",
        summary: ["Teszt", "Teszt2"],
        description: "Teszt teszt 67",
        price: 490
    },
    {
        title: "Meno csomag",
        summary: ["komoly", "Pro"],
        description: "Haladó buszsoforoknek",
        price: 1490
    }
];

const fuse = new Fuse(plans, {
    keys: [
        { name: "title", weight: 0.5 },
        { name: "description", weight: 0.3 },
        { name: "summary", weight: 0.2 }
    ],
    threshold: 0.4, 
});

const result = fuse.search("tesz");
console.log(result.map(r => r.item));

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