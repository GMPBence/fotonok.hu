import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useBilling } from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";

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
        tax_number: billingData?.tax_number || ""
    });

    const handleChange = (field, value) => {
        console.log(field, value);
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (selectedOption === "recipt1") {
        setIsReceiptNeeded(false);
        setBillingData({ email: formData.email });
        } else {
        setIsReceiptNeeded(true);
        setBillingData({
            last_name: formData.last_name,
            first_name: formData.first_name,
            country: formData.country,
            city: formData.city,
            street: formData.street,
            postal_code: formData.postal_code,
            email: formData.email,
            tax_number: formData.tax_number
        });
        }
        console.log(billingData);
        console.log(formData.city, formData.country, formData.email, formData.first_name, formData.last_name, formData.postal_code, formData.street, formData.tax_number);
        navigate("/payment?id=" + new URLSearchParams(window.location.search).get("id"));
    };

    return (
        <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden">
        <Navbar authenticated={props.authenticated} />
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
