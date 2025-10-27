import { loadStripe } from "@stripe/stripe-js";

// @ts-ignore
const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export default stripe