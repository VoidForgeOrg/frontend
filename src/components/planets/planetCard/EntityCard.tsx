import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import planetImage from "./planet.jpg";
import {Entity} from "../../../clients/universe";
import {useUniverseHelpers} from "../../../utils/universeHelpers.ts";

type EntityCardProps = {
    entity: Entity;
}

const EntityCard = (props: EntityCardProps) => {

    const universeHelpers = useUniverseHelpers();
    const {solarSystem, segment} = universeHelpers.getEntityLocation(props.entity);

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
                        Segment: {segment?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Solar System: {solarSystem?.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EntityCard
