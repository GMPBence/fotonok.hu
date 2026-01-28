import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Button from "../components/Button"
import Input from "../components/Input"
import { useBilling } from "../context/LoadingContext"
import { useNavigate } from "react-router-dom"

const BillingPage = (props) => {
    const [selectedOption, setSelectedOption] = useState("recipt2")
    const {isReceiptNeeded, setIsReceiptNeeded} = useBilling(false);
    const {billingData, setBillingData} = useBilling();
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [email, setEmail] = useState("");
    const [taxNumber, setTaxNumber] = useState("");

    const navigate = useNavigate();

    const handleSave = (type) => {
        console.log(type)
        if (type === "recipt1") {
            setIsReceiptNeeded(false)
            setBillingData({ email: email })
            navigate("/payment?id=" + window.location.search.split("=")[1])
        }
        else {
            setIsReceiptNeeded(true)
            setBillingData({ last_name: lastName, first_name: firstName, country: country, city: city, street: street, postal_code: postalCode, email: email, tax_number: taxNumber })
            navigate("/payment?id=" + window.location.search.split("=")[1])
        }
    }

    const handleRadioChange = (value) => {
        setSelectedOption(value)
    }

    return <div className="flex flex-col min-h-screen justify-between gap-3 w-full overflow-x-hidden">
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
                    onChange={handleRadioChange} 
                />

                {selectedOption === "recipt1" && <div className="w-full max-w-102.5 flex flex-col gap-5 mt-5">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} color="light" type="Email" />
                    <Button onClick={() => handleSave(selectedOption)} type="save" text="Mentés" />
                </div>}
                {selectedOption === "recipt2" && <div className="w-full max-w-102.5 flex flex-col gap-3">
                    <h2 className="text-center font-extrabold my-5">Figyelem! Számla esetén vásárlás után 5 munkanapon belül a számla a megadott email címre kiküldésre kerül!</h2>
                    <div className="sm:grid flex flex-col sm:grid-cols-2 gap-3 sm:gap-x-4 sm:gap-y-3">
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} color="light" type="Vezetéknév" />
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} color="light" type="Keresztnév" />
                        <Input value={country} onChange={(e) => setCountry(e.target.value)} color="light" type="Ország" />
                        <Input value={city} onChange={(e) => setCity(e.target.value)} color="light" type="Város" />
                        <Input value={street} onChange={(e) => setStreet(e.target.value)} color="light" type="Utca, házszám" />
                        <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} color="light" type="Irányítószám" />
                    </div>
                    <Input value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} color="light" type="Adószám (opcionális)" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} color="light" type="Email" />
                    <Button onClick={() => handleSave(selectedOption)} type="save" text="Mentés" />
                </div>}
            </div>
        </div>
        <Footer />
    </div>
}
export default BillingPage