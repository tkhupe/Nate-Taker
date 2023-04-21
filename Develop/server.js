const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
