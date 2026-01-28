import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Button from "../components/Button"
import Input from "../components/Input"

const BillingPage = (props) => {
    const [selectedOption, setSelectedOption] = useState("recipt1")

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
                    <Input color="light" type="Email" />
                    <Button type="save" text="Mentés" />
                </div>}
                {selectedOption === "recipt2" && <div className="w-full max-w-102.5 flex flex-col gap-3">
                    <h2 className="text-center font-extrabold my-5">Figyelem! Számla esetén vásárlás után 5 munkanapon belül a számla a megadott email címre kiküldésre kerül!</h2>
                    <div className="sm:grid flex flex-col sm:grid-cols-2 gap-3 sm:gap-x-4 sm:gap-y-3">
                        <Input color="light" type="Vezetéknév" />
                        <Input color="light" type="Keresztnév" />
                        <Input color="light" type="Ország" />
                        <Input color="light" type="Város" />
                        <Input color="light" type="Utca, házszám" />
                        <Input color="light" type="Irányítószám" />
                    </div>
                    <Input color="light" type="Adószám (opcionális)" />
                    <Input color="light" type="Email" />
                    <Button type="save" text="Mentés" />
                </div>}
            </div>
        </div>
        <Footer />
    </div>
}
export default BillingPage