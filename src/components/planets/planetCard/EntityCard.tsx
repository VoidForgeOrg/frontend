import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import planetImage from "./planet.jpg";
import {Entity} from "../../../clients/universe";

type EntityCardProps = {
    entity: Entity;
    solarSystemName: string;
    segmentName: string;
}

const EntityCard = (props: EntityCardProps) => {
    return (
        <Card sx={{width: 245}}>
            <CardActionArea>
                <CardMedia
                    sx={{height: 140}}
                    image={planetImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.entity.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Segment: {props.segmentName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Solar System: {props.solarSystemName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EntityCard
