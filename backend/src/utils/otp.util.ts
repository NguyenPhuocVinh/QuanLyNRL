export function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 5);
    return { otp, expiredAt };
}

