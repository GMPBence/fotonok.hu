import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useBilling } from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BillingPage = (props) => {
    const [selectedOption, setSelectedOption] = useState("recipt2");
    const { isReceiptNeeded, setIsReceiptNeeded, billingData, setBillingData } = useBilling();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: billingData?.email || "",
        last_name: billingData?.last_name || "",
        first_name: billingData?.first_name || "",
        country: billingData?.country || "",
        city: billingData?.city || "",
        street: billingData?.street || "",
        postal_code: billingData?.postal_code || "",
        tax_number: billingData?.tax_number || "",
        phone: billingData?.phone || ""
    });

    const handleChange = (field, value) => {
        if (field === "phone"){
            if (value.startsWith('+')) {
                value = '+' + value.slice(1).replace(/\D/g,'');
            } else {
                value = value.replace(/\D/g,'');
            }

            if(value.startsWith("+") && value.length > 12) {
                value = value.slice(0, 12);
            } else if(!value.startsWith("+") && value.length > 11) {
                value = value.slice(0, 11);
            }

        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (selectedOption === "recipt1") {
        setIsReceiptNeeded(false);
        setBillingData({ email: formData.email });
        } else {
        setIsReceiptNeeded(true);
        if (!formData.last_name || !formData.first_name || !formData.country || !formData.city || !formData.street || !formData.postal_code || !formData.email) {
            Swal.fire({
            icon: "error",
            title: "Hiba",
            text: "Kérjük, töltse ki a kötelező mezőket!",
            confirmButtonText: "Rendben"
            });
            return;
        }
        setBillingData({
            last_name: formData.last_name,
            first_name: formData.first_name,
            country: formData.country,
            city: formData.city,
            street: formData.street,
            postal_code: formData.postal_code,
            email: formData.email,
            tax_number: formData.tax_number,
            phone: formData.phone
        });
        }
        console.log(billingData);
        console.log(formData.city, formData.country, formData.email, formData.first_name, formData.last_name, formData.postal_code, formData.street, formData.tax_number);
        navigate("/payment?id=" + new URLSearchParams(window.location.search).get("id"));
    };

    const handleBack = () => {
        const id = new URLSearchParams(window.location.search).get("id");
        navigate(`/payment?id=${id}`);
    };

    return (
        <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden relative">
        <Navbar authenticated={props.authenticated} />
        
        <button 
            onClick={handleBack} 
            className="fixed top-25 left-5 p-3 bg-primary text-white hover:bg-primaryHover rounded-full transition-all cursor-pointer z-50 shadow-lg"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        </button>

        <div className="flex flex-col justify-center flex-1 items-center gap-7 px-2 pt-30">
            <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-center">Számlázás</h1>
            <div className="bg-highlight h-1 mt-1 rounded-2xl w-[50%]"></div>
            </div>

            <div className="flex flex-col w-full items-center">
            <Button
                type="billing"
                name="recipt"
                id1="recipt1"
                id2="recipt2"
                label1="Nyugta"
                label2="Számla"
                onChange={setSelectedOption}
            />

            {selectedOption === "recipt1" && (
                <div className="w-full max-w-102.5 flex flex-col gap-5 mt-5">
                <Input  value={formData.email} onChange={e => handleChange("email", e.target.value)} color="light" type="Email" />
                <Button onClick={handleSave} type="save" text="Mentés" />
                </div>
            )}

            {selectedOption === "recipt2" && (
                <div className="w-full max-w-102.5 flex flex-col gap-3">
                <h2 className="text-center font-extrabold my-5">
                    Figyelem! Számla esetén vásárlás után 5 munkanapon belül a számla a megadott email címre kiküldésre kerül!
                </h2>

                <div className="sm:grid flex flex-col sm:grid-cols-2 gap-3 sm:gap-x-4 sm:gap-y-3">
                    <Input value={formData.last_name} onChange={e => handleChange("last_name", e.target.value)} color="light" type="Vezetéknév" />
                    <Input value={formData.first_name} onChange={e => handleChange("first_name", e.target.value)} color="light" type="Keresztnév" />
                    <Input value={formData.country} onChange={e => handleChange("country", e.target.value)} color="light" type="Ország" />
                    <Input value={formData.city} onChange={e => handleChange("city", e.target.value)} color="light" type="Város" />
                    <Input value={formData.street} onChange={e => handleChange("street", e.target.value)} color="light" type="Utca, házszám" />
                    <Input value={formData.postal_code} onChange={e => handleChange("postal_code", e.target.value)} color="light" type="Irányítószám" />
                </div>

                <Input value={formData.tax_number} onChange={e => handleChange("tax_number", e.target.value)} color="light" type="Adószám (opcionális)" />
                <Input value={formData.email} onChange={e => handleChange("email", e.target.value)} color="light" type="Email" />
                <Input value={formData.phone} onChange={e => handleChange("phone", e.target.value)} color="light" type="Telefonszám" />
                <Button onClick={handleSave} type="save" text="Mentés" />
                </div>
            )}
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default BillingPage;
