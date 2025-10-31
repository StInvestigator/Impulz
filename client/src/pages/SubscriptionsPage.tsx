import React from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    Typography,
    CircularProgress
} from "@mui/material";
import { createSubscriptionSession } from "../store/reducers/action-creators/subscription.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import stripe from "../stripe.ts"
import keycloak from "../keycloak.ts";
import logoImg from "../assets/logo.svg"



type Plan = {
    id: string; // priceId that your backend/Stripe uses
    title: string;
    priceMonthly: string; // human readable
    features: string[];
    cta: string;
};


const PLANS: Plan[] = [
    {
        id: "price_1SMVQTGZTpt26MImI2NbtkPr",
        title: "Impulz Premium 1 Month",
        priceMonthly: "$4.99 / month",
        features: ["Premium status","Developers support"],
        cta: "Choose",
    },
    {
        id: "price_1SMVTbGZTpt26MImXH1GIzoX",
        title: "Impulz Premium 3 Months",
        priceMonthly: "$12.99 / 3 months",
        features: ["Premium status","Developers support"],
        cta: "Choose",
    },
    {
        id: "price_1SMVWMGZTpt26MImIdXWrnkq",
        title: "Impulz Premium 12 Months",
        priceMonthly: "$49.99 / 12 months",        
        features: ["Premium status","Developers support"],
        cta: "Choose",
    },
];


const SubscriptionCard: React.FC<{ plan: Plan; onChoose: (priceId: string) => void; loading?: boolean }> = ({ plan, onChoose, loading }) => {
    return (
        <Card variant="outlined" sx={{borderRadius: "10px", boxShadow: "0px 4px 4px 0px #00000040 inset;"}}>
            <CardContent>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography fontSize={"20px"} fontWeight={400}>
                        {plan.title} <br />
                        {plan.priceMonthly}
                    </Typography>
                    <Box component={"img"} width={28} height={28} src={logoImg}/>
                </Box>
                <List>
                    {plan.features.map((f) => (
                        <ListItem key={f} sx={{ padding: 0}}>
                            <Typography variant="mainRS">{f}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button variant="contained" onClick={() => onChoose(plan.id)} disabled={loading} sx={{background: "var(--orange-peel)", color: "var(--dark-purple)", padding: "8px 18px", fontWeight: 700, fontSize: "12px", boxShadow: "none", textTransform: "none"}}>
                    {loading ? <CircularProgress size={20} /> : plan.cta}
                </Button>
            </CardActions>
        </Card>
    );
};


const SubscriptionPageInner: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.subscribtion);


    const handleChoose = async (priceId: string) => {
        try {
            let resultAction
            if(keycloak.tokenParsed?.sub){
                resultAction = await dispatch(createSubscriptionSession({ priceId: priceId, userId: keycloak.tokenParsed.sub }));
            }
            else{
                keycloak.login()
            }
            // @ts-ignore
            const payload: string = resultAction.payload;
            if (!payload) {
                return;
            }


            if (!stripe) {
                alert("Stripe failed to load. Check REACT_APP_STRIPE_PUBLISHABLE_KEY.");
                return;
            }


            // redirect to checkout
            const { error: redirectError } = await stripe.redirectToCheckout({ sessionId: payload });
            if (redirectError) {
                console.error("Stripe redirect error:", redirectError.message);
                alert("Stripe redirect error: " + redirectError.message);
            }
        } catch (err: any) {
            console.error(err);
        }
    };


    return (
        <Box borderRadius={"10px"} sx={{width: "100%", background: "var(--dark-purple)", margin: 0, minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "70%" }}>
                <Box justifyContent="center">
                    <Typography variant="h1" color="white" sx={{ mb: 5 }}>
                        Impulz Premium
                    </Typography>

                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                        gap={4}
                    >
                        {PLANS.map((plan) => (
                            <SubscriptionCard
                            key={plan.id}
                            plan={plan}
                            onChoose={handleChoose}
                            loading={loading}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};


// Export a single default component wrapped with Provider so this file is drop-in friendly
export default function SubscriptionsPage() {
    return (
        <SubscriptionPageInner />
    );
}