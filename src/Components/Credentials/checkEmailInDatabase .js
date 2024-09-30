export const checkEmailInDatabase = async (email) => {
    const response = await fetch(`https://e-commerce-server-alpha.vercel.app/users/check-email?email=${email}`);
    if (!response.ok) {
        throw new Error('Error checking email');
    }
    const data = await response.json();
    return data.exists; // Adjust this according to your backend response structure
};
