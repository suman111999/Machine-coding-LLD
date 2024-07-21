import MobileNumber from "../components/mobileNumber";
import OtpField from "../components/otpField";

const Login = () => {

    const otpSubmit = async (otp: string) => {

    }
    return (
        <div>
            <MobileNumber />
            <OtpField length={4} onSubmit={otpSubmit} />
        </div>
    )
}

export default Login;