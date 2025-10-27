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
        <Card sx={{ width: 360 }} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {plan.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ my: 1 }}>
                    {plan.priceMonthly}
                </Typography>
                <List>
                    {plan.features.map((f) => (
                        <ListItem key={f} sx={{ py: 0.5 }}>
                            <Typography variant="body2">{f}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button variant="contained" onClick={() => onChoose(plan.id)} disabled={loading}>
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
        <Container maxWidth="lg" sx={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%" }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid>
                        <Typography variant="h3" align="center" sx={{ mb: 3 }}>
                            Choose a subscription plan
                        </Typography>
                    </Grid>


                    <Grid>
                        <Grid container spacing={4} justifyContent="center">
                            {PLANS.map((plan) => (
                                <Grid key={plan.id}>
                                    <SubscriptionCard plan={plan} onChoose={handleChoose} loading={loading} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>


                    <Grid>
                        <Typography variant="body2" align="center">
                            You will be redirected to Stripe-hosted checkout to complete your subscription.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};


// Export a single default component wrapped with Provider so this file is drop-in friendly
export default function SubscriptionsPage() {
    return (
        <SubscriptionPageInner />
    );
}