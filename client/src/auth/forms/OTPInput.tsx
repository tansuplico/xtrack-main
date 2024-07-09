import { useContext, useEffect, useState } from "react";
import { RecoveryContext } from "../AuthLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPInput = () => {
  const { email, otp } = useContext(RecoveryContext);
  const [timerCount, setTimerCount] = useState(60);
  const [OTPInput, setOTPInput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const resendOTP = () => {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => toast.success("A new OTP has been sent"))
      .then(() => setTimerCount(60))
      .catch(() => {
        toast.error("Failed to send OTP");
      });
  };

  const verifyOTP = () => {
    if (parseInt(OTPInput.join("")) === otp) {
      navigate("/reset");
      return;
    }
    toast.error("Incorrect code");
    return;
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount((prevCount) => {
        prevCount <= 1 && clearInterval(interval);
        if (prevCount <= 1) setDisable(false);
        if (prevCount <= 0) return prevCount;
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-[80%] sm:w-[50%] lg:w-[40%] xl:w-[30%] flex flex-col gap-10">
        <div className="text-center">
          <h1 className="text-[1.5rem] font-bold"> Email Verification </h1>
          <p> We have sent a code to your email {email} </p>
        </div>

        <div className="flex justify-center items-center gap-1 sm:gap-5 text-white ">
          <input
            type="type"
            maxLength={1}
            className="w-[4rem] h-[4rem] rounded-lg text-center bg-[#1A222B]"
            onChange={(e) =>
              setOTPInput([
                Number(e.target.value),
                OTPInput[1],
                OTPInput[2],
                OTPInput[3],
              ])
            }
          />

          <input
            type="text"
            maxLength={1}
            className="w-[4rem] h-[4rem] rounded-lg text-center bg-[#1A222B]"
            onChange={(e) =>
              setOTPInput([
                OTPInput[0],
                Number(e.target.value),
                OTPInput[2],
                OTPInput[3],
              ])
            }
          />

          <input
            type="text"
            maxLength={1}
            className="w-[4rem] h-[4rem] rounded-lg text-center bg-[#1A222B]"
            onChange={(e) =>
              setOTPInput([
                OTPInput[0],
                OTPInput[1],
                Number(e.target.value),
                OTPInput[3],
              ])
            }
          />

          <input
            type="text"
            maxLength={1}
            className="w-[4rem] h-[4rem] rounded-lg text-center bg-[#1A222B]"
            onChange={(e) =>
              setOTPInput([
                OTPInput[0],
                OTPInput[1],
                OTPInput[2],
                Number(e.target.value),
              ])
            }
          />
        </div>

        <div className="flex flex-col gap-5">
          <button
            className="bg-[#228B22] py-3 rounded-sm"
            onClick={() => verifyOTP()}
          >
            Verify Account
          </button>
          <div className="flex items-center text-center gap-2">
            <p>Didn't receive a code?</p>
            <a
              className={`${
                disable
                  ? "text-gray-500 cursor-default underline"
                  : "text-white cursor-pointer no-underline"
              } flex items-center`}
              onClick={() => resendOTP()}
            >
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
