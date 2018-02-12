import { Router } from 'express';
import axios from 'axios';

import { defaultResponseModel } from './../../../../utils/response';

export default({ db }) => {
  let api = Router();

  const CircularJson = require('circular-json');

  ////////////////////////////////////////////////////////////
  //                       GET '/'                          //
  ////////////////////////////////////////////////////////////

  api.get('/w', (req, res) => {


    const apiUrl = 'https://api.darksky.net/forecast/' + "de59a4e908bcf93e49df5a1761431480/37.338208,-121.886329";

    console.log(apiUrl);

    axios.get('https://api.darksky.net/forecast/de59a4e908bcf93e49df5a1761431480/37.338208,-121.886329')
      .then(weather => {
        res.status(200).send(defaultResponseModel(true, 'Got Weather', {Weather: weather.data}))
      })
      .catch(err => {
        res.status(404).send(defaultResponseModel(false, 'Weather failed to get: ' + err))
      })
  });

  api.post('/w', (req, res) => {


    const apiUrl = 'https://api.darksky.net/forecast/' + "de59a4e908bcf93e49df5a1761431480/" + req.body.latitude + "," + req.body.longitude;

    console.log(apiUrl);

    axios.get(apiUrl)
      .then(weather => {
        res.status(200).send(defaultResponseModel(true, 'Got Weather', {Weather: weather.data}))
      })
      .catch(err => {
        res.status(404).send(defaultResponseModel(false, 'Weather failed to get: ' + err))
      })
  });
  
  return api;

}
