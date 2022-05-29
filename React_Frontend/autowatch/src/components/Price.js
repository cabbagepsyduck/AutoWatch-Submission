import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import api from "../api/recommenderapi"
import Alert from '@material-ui/lab/Alert';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "../styles/main.css"
import Loading from './Loading';
import sedan_image from '../images/sedan.jpg';
import hatchback_image from '../images/hatchback.jpg';
import wagon_image from '../images/wagon.jpg';



const useStyles = makeStyles({
    root: {
      maxWidth: 550,
    },
    table: {
        minWidth: 450,
    },
});


function Price() {


    const [formData, setFormData] = useState({
        horsepower: "",
        carwidth: "",
        category: "select",
        carbody: "select",
        enginetype: "select"

    })

    const [predictionData, setPredictionData] = useState({})

    const [loadingStatus, setLoadingStatus] = useState(false)

    const handleChange = (e, changeKey=undefined) => {
        // console.log(changeKey, e.target.value)
        let newData = {...formData}
        if(changeKey) {
            newData[changeKey] = e.target.value
        }
        else newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    const handleClick = async () => {

        setLoadingStatus(true)
        
        const request = new FormData()

        for(let key in formData) {
            request.append(key, formData[key])
        }

        const response = await api.post(
            "/predict_price",
            request
        )
        
        const responseData = response.data
        setPredictionData(responseData)
        setLoadingStatus(false)
    }
    const Categories = ['Medium Range', 'Premium Range']
    const Carbody = ['Hatchback', 'Sedan', 'Wagon']
    const Enginetype = ['Dual overhead cam engine (DOHC)', 'Overhead cam engine (OHC)', 'Overhead valve engine (OHV)']


    const handleBackClick = () => {
        setPredictionData({})
    }

    const classes = useStyles();

    const predictedPrice = predictionData.final_prediction


    if(predictionData.final_prediction) {


        const outputComponent = (
            <div className="output_container">
            <Card className={`${classes.root} output_container__card`}>
                {/* <CardActionArea> */}

                    {
                        {
                          'Sedan': <CardMedia
                                    component="img"
                                    height="225"
                                    image={sedan_image}/>,
                          'Hatchback': <CardMedia
                                    component="img"
                                    height="225"
                                    image={hatchback_image}/>,
                          'Wagon': <CardMedia
                                    component="img"
                                    height="225"
                                    image={wagon_image}/>
                        }[formData.carbody]
                    }
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <b>Recommendation : </b>{parseFloat(predictedPrice).toFixed(2)*1000 + "$"}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                    <ul>
                        <li>Power produced by engine in horspowers : {formData.horsepower}</li>
                        <li>Width of car (in m) : {formData.carwidth}</li>
                        <li>Category of car : {formData.category}</li>
                        <li>Car body type : {formData.carbody}</li>
                        <li>Engine Type : {formData.enginetype}</li>
                    </ul>  
                    </Typography>
                    <br/>
                    </CardContent>
                <CardActions>
                    <Button onClick={()=>handleBackClick()} className="back__button" variant="contained" size="small" color="primary">
                    Back to Prediction
                    </Button>
                </CardActions>
            </Card>
        </div>
        )

        return outputComponent
    }


    else if(loadingStatus) {

        return <Loading />

    }
    else
     return (
        <div className="form">
            <div className="form__form_group">

                {
                    predictionData.error && 
                    <Alert style={{marginTop:"20px"}} severity="error"> { predictionData.error } </Alert>
                }

                <center><div className="form__title">Price Recommender</div></center>
                <TextField onChange={(e) => handleChange(e)} value={formData.horsepower} className="form__text_field" id="horsepower" name="horsepower" variant="filled" label="Power produced by engine in horspowers" />
                <TextField onChange={(e) => handleChange(e)} value={formData.carwidth} className="form__text_field" id="carwidth" name="carwidth" variant="filled" label="Width of car" />
                <TextField
                    id="category"
                    name="category"
                    select
                    label="Category of car"
                    value={formData.category}
                    onChange={(e) => handleChange(e, "category")}
                    SelectProps={{
                        native: true,
                    }}
                    variant="filled"
                    className="form__text_field"
                    >
                    <option key={"select"} value={"select"}>
                    {"Select"}
                    </option>
                    {Categories.map((category) => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                    ))}
                </TextField>               
               

                <TextField
                    id="carbody"
                    name="carbody"
                    select
                    label="Car body type"
                    value={formData.carbody}
                    onChange={(e) => handleChange(e, "carbody")}
                    SelectProps={{
                        native: true,
                    }}
                    variant="filled"
                    className="form__text_field"
                    >
                    <option key={"select"} value={"select"}>
                    {"Select"}
                    </option>
                    {Carbody.map((carbody) => (
                        <option key={carbody} value={carbody}>
                        {carbody}
                        </option>
                    ))}
                </TextField>
                <TextField
                    id="enginetype"
                    name="enginetype"
                    select
                    label="Engine Type"
                    value={formData.enginetype}
                    onChange={(e) => handleChange(e, "enginetype")}
                    SelectProps={{
                        native: true,
                    }}
                    variant="filled"
                    className="form__text_field"
                    >
                    <option key={"select"} value={"select"}>
                    {"Select"}
                    </option>
                    {Enginetype.map((enginetype) => (
                        <option key={enginetype} value={enginetype}>
                        {enginetype}
                        </option>
                    ))}
                </TextField>

                <Button onClick={()=>handleClick()} className="form__button" color="primary" variant="contained">Predict Price</Button>
            </div>
        </div>
    )
}

export default Price
