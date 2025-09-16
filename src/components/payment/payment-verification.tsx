import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/lib";
import { useAuth } from "@/context/auth-context";

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const tx_ref = params.get("tx_ref");
    const courseId = params.get("course_id"); 
    
    if (status === "success" && tx_ref && user && courseId) {
      // Verify payment with Chapa
      fetch(`${import.meta.env.VITE_BACKEND_URL}/chapa/verify/${tx_ref}`, {
        headers: {
          Authorization: import.meta.env.VITE_CHAPA_SECRET_KEY,
        },
      })
        .then((res) => res.json())
        .then(async (result) => {
          console.log(result);
          if (result.status === "success") {
           console.log("heree")
          // await supabase
          //     .from("enrollments")
          //     .insert([{ user_id: user.id, course_id: courseId }]);

          //   if (!error) {
          //     navigate(`/courses/${courseId}?payment=success`);
          //   }
          }
        });
    }
  }, [location, user, navigate]);

  return <div>Processing payment...</div>;
};

export default PaymentCallback;