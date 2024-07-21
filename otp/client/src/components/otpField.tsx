import { useEffect, useRef, useState } from "react";


const OtpField = ({ length, onSubmit = () => { } }: { length: number, onSubmit: (otp: string) => void }) => {
    const [otp, setOtp] = useState(Array(length).fill(''))
    const inputRefs = useRef<HTMLInputElement[]>([])
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;
        //only take last digit.
        const newOtp = [...otp.slice(0, index), value.substring(value.length - 1), ...otp.slice(index + 1)]
        setOtp(newOtp)

        //submit Otp
        // here otp state will not be upated one as setOtp is asyncronous. we can use newOtp

        //it will not work as '' length is also 1.
        // if (newOtp.length === length) {
        //     onSubmit(newOtp.join(''))
        // }

        if (newOtp.every(digit => digit !== '')) {
            onSubmit(newOtp.join(''));
        }

        //move automatically to next input field if current field is filled.
        if (value && index < length - 1 && inputRefs.current[index + 1]) {

            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
            e.preventDefault();
        }
    }

    const handleClick = (index: number) => {
        //click anywhere inside input box,cursor will move at last.
        inputRefs.current[index].setSelectionRange(1, 1);
    }
    console.log(otp)
    return (
        <div>
            {otp?.map((it, index) => {
                return (
                    <span style={{ margin: '5px' }} key={index}>
                        <input
                            style={{ width: '2rem', height: '2rem', textAlign: 'center', fontSize: '1.2em' }}

                            ref={(input) => (

                                inputRefs.current[index] = input as HTMLInputElement
                            )}
                            type="text"
                            value={it}
                            onChange={e => handleChange(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            onClick={() => handleClick(index)}
                        />
                    </span>
                )
            })}
        </div>
    )
}

export default OtpField;