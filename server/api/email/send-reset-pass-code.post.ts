import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const resend = new Resend(runtime.RESEND_API_KEY);
  const code = Math.floor(100000 + Math.random() * 900000);

  try {
    const data = await resend.emails.send({
      from: "Tushar <forgot-password@forgot-password.tusharwani.com>",
      to: ["reachtusharwani@gmail.com"],
      subject: "Reset Password Code",
      html: `<p>Reset Password Code: <b>${code}</b></p>`,
    });
    console.log("runtime.RESEND_API_KEY", runtime.RESEND_API_KEY);
    console.log("code", code);
    console.log("data", data);
    setResponseStatus(event, 200);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (e) {
    console.error("Error sending email:", e);
    return {
      success: false,
      message: "Error sending email",
    };
  }
});
