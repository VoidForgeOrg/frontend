import {Card, CardContent, Typography} from "@mui/material";

const Welcome = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Welcome to the game!
                </Typography>
                <Typography>
                    This is a simple game where you can explore planets and gather resources.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Welcome