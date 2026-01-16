
const sortPlans = (plans) => {
    return plans
        .sort((a, b) => b.created_at - a.created_at) 
        .sort((a, b) => (b.price != 0.00 ? 1 : 0) - (a.price != 0.00 ? 1 : 0)); 
};

export default sortPlans